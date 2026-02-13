
import { TAX_RATE, TOTAL_FIXED_FEES } from './constants';
import { Car, ProfitBreakdown } from './types';

export const calculateProfit = (car: Car, exchangeRate: number): ProfitBreakdown => {
  const usdBasePrice = car.cadPrice * exchangeRate;
  
  // 2026 TARIFF LOGIC: VIN 1, 4, 5 = US Made (0% Duty)
  const vin = car.vin || car.historyId;
  const isUsMade = ['1', '4', '5'].includes(vin[0]);
  
  let taxAmount = 0;
  let vinStatus: 'ZERO-TARIFF UNICORN' | 'FOREIGN (2026 RULE)' = 'FOREIGN (2026 RULE)';

  if (isUsMade) {
    taxAmount = 0;
    vinStatus = 'ZERO-TARIFF UNICORN';
  } else {
    // 25% Duty on 85% Value for Foreign units
    taxAmount = (usdBasePrice * 0.85) * TAX_RATE;
    vinStatus = 'FOREIGN (2026 RULE)';
  }

  const totalCostUsd = usdBasePrice + taxAmount + TOTAL_FIXED_FEES;
  const netProfit = car.expectedUsResale - totalCostUsd;
  
  const isHighYield = netProfit > 20000; // Increased threshold for "High Yield" status in a 100M SaaS

  return {
    usdBasePrice,
    taxAmount,
    fixedFees: TOTAL_FIXED_FEES,
    totalCostUsd,
    netProfit,
    isHighYield,
    vinStatus
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
  // 100M Logic: High profit + low days on market = high confidence score
  const profitScore = Math.min(profit / 500, 50); // Max 50 points from profit
  const speedScore = Math.max(50 - daysOnMarket * 2, 0); // Max 50 points from speed
  return Math.round(profitScore + speedScore);
};
