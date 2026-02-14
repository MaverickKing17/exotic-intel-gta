
import { TOTAL_FIXED_FEES } from './constants';
import { Car, ProfitBreakdown } from './types';

/**
 * Lead Full-Stack Engineer / Trade Compliance Logic
 * Implements CUSMA Tariff Engine (2026 Forecast) and Storage-Verified valuation.
 */
export const calculateProfit = (car: Car, exchangeRate: number): ProfitBreakdown => {
  // 1. Storage-Verified Logic
  let winterDeduction = 0;
  let storagePremium = 0;
  let adjustedCadPrice = car.cadPrice;

  if (car.isWinterDriven) {
    // PDF: 5-8% valuation deduction. We use midpoint 6.5%.
    winterDeduction = car.cadPrice * 0.065;
    adjustedCadPrice -= winterDeduction;
  }

  if (car.hasHeatedStorage) {
    // PDF: +4% premium for documented heated storage.
    storagePremium = car.cadPrice * 0.04;
    adjustedCadPrice += storagePremium;
  }

  // 2. Base Conversion (2026 Forecast Exchange)
  const usdBasePrice = adjustedCadPrice * exchangeRate;
  
  // 3. CUSMA Tariff Engine
  // PDF: Checks first digit (1, 2, 4, 5). 1, 4, 5 = USA; 2 = Canada (CUSMA Zone)
  const vin = (car.vin || car.historyId || '').trim();
  const firstDigit = vin[0];
  const isCusmaZone = ['1', '2', '4', '5'].includes(firstDigit);
  
  let tariffAmount = 0;
  if (!isCusmaZone) {
    // Standard Tariff applied to non-CUSMA vehicles (e.g. European origin)
    // Applying a conservative 20% value delta for non-USMCA 2026 rules
    tariffAmount = usdBasePrice * 0.25;
  }

  // 4. US Luxury Tax (PDF: 10% of total vs 20% of value over $100k)
  const totalBeforeLuxuryTax = usdBasePrice + tariffAmount + TOTAL_FIXED_FEES;
  const luxuryTaxOptionA = totalBeforeLuxuryTax * 0.10;
  const luxuryTaxOptionB = totalBeforeLuxuryTax > 100000 
    ? (totalBeforeLuxuryTax - 100000) * 0.20 
    : 0;
  
  // We use the higher tax as per "vs" comparison logic in trade compliance
  const luxuryTaxAmount = Math.max(luxuryTaxOptionA, luxuryTaxOptionB);

  const totalCostUsd = totalBeforeLuxuryTax + luxuryTaxAmount;
  const netProfit = car.expectedUsResale - totalCostUsd;
  
  const isHighYield = netProfit > 25000;

  return {
    usdBasePrice,
    taxAmount: tariffAmount,
    luxuryTaxAmount,
    fixedFees: TOTAL_FIXED_FEES,
    totalCostUsd,
    netProfit,
    isHighYield,
    vinStatus: isCusmaZone ? 'CUSMA ELIGIBLE' : 'FOREIGN (TARIFF APPLIED)',
    winterDeduction,
    storagePremium
  };
};

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getMarketConfidence = (daysOnMarket: number, profit: number): number => {
  const profitScore = Math.min(profit / 500, 50); 
  const speedScore = Math.max(50 - daysOnMarket * 2, 0); 
  return Math.round(profitScore + speedScore);
};
