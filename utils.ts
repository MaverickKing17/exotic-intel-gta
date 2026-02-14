
import { TOTAL_FIXED_FEES } from './constants';
import { Car, ProfitBreakdown } from './types';

/**
 * Lead Full-Stack Engineer / Trade Compliance Logic
 * Implements PDF-Spec CUSMA Tariff Engine and Storage-Verified valuation.
 * Logic strictly follows requirements from the 'Unseen Features' directive.
 */
export const calculateProfit = (car: Car, exchangeRate: number): ProfitBreakdown => {
  // 1. Storage-Verified Logic (PDF Section 2)
  // Deduction: 5-8% if driven Nov-March. Premium: +4% for heated storage.
  let winterDeduction = 0;
  let storagePremium = 0;
  let adjustedCadPrice = car.cadPrice;

  if (car.isWinterDriven) {
    // PDF: 5-8% deduction range. Using 7% as a high-confidence compliance midpoint.
    winterDeduction = car.cadPrice * 0.07;
    adjustedCadPrice -= winterDeduction;
  }

  if (car.hasHeatedStorage) {
    // PDF: +4% premium for documented heated storage.
    storagePremium = car.cadPrice * 0.04;
    adjustedCadPrice += storagePremium;
  }

  // 2. Base Conversion (2026 Forecast Exchange Rate as per PDF)
  const usdBasePrice = adjustedCadPrice * exchangeRate;
  
  // 3. Live CUSMA Tariff Engine (PDF Section 1)
  // Requirement: Check first digit (1, 2, 4, 5) for CUSMA origin.
  const vin = (car.vin || car.historyId || '').trim();
  const firstDigit = vin[0];
  const isCusmaZone = ['1', '2', '4', '5'].includes(firstDigit);
  
  let tariffAmount = 0;
  if (!isCusmaZone) {
    // Standard 2026 Non-USMCA Duty Rate (approx 25% for high-end exotics)
    tariffAmount = usdBasePrice * 0.25;
  }

  // 4. US Luxury Tax (PDF Section 1)
  // Requirement: 10% of total vs 20% of value over $100k.
  const totalBeforeLuxuryTax = usdBasePrice + tariffAmount + TOTAL_FIXED_FEES;
  
  // Logic: Max(10% of total, 20% of excess over $100k)
  const luxuryTaxOptionA = totalBeforeLuxuryTax * 0.10;
  const luxuryTaxOptionB = totalBeforeLuxuryTax > 100000 
    ? (totalBeforeLuxuryTax - 100000) * 0.20 
    : 0;
  
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
