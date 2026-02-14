
import { TAX_RATE, TOTAL_FIXED_FEES } from './constants';
import { Car, ProfitBreakdown } from './types';

/**
 * Calculates high-fidelity profit modeling for the Toronto-US arbitrage corridor.
 * Now incorporates validated USMCA Regional Value Content (RVC) data.
 */
export const calculateProfit = (car: Car, exchangeRate: number): ProfitBreakdown => {
  const usdBasePrice = car.cadPrice * exchangeRate;
  
  // DATA INTEGRITY: Ensure usPartPercentage is a valid decimal between 0 and 1.
  // This prevents malformed upstream data from skewing duty calculations.
  const validatedUsPart = Math.max(0, Math.min(1, car.usPartPercentage ?? 0));
  
  // 2026 TARIFF LOGIC: VIN 1, 4, 5 = US Made (0% Duty)
  // Others are subjected to the 25% Duty on the non-US originating portion of value.
  const vin = car.vin || car.historyId;
  const isUsMade = ['1', '4', '5'].includes(vin[0]);
  
  let taxAmount = 0;
  let vinStatus: 'ZERO-TARIFF UNICORN' | 'FOREIGN (2026 RULE)' = 'FOREIGN (2026 RULE)';

  if (isUsMade) {
    taxAmount = 0;
    vinStatus = 'ZERO-TARIFF UNICORN';
  } else {
    // Duty is applied to the portion of the vehicle's value that is NOT US-originating.
    // We use (1 - validatedUsPart) to isolate the foreign value component.
    const foreignPortion = 1 - validatedUsPart;
    taxAmount = (usdBasePrice * foreignPortion) * TAX_RATE;
    vinStatus = 'FOREIGN (2026 RULE)';
  }

  const totalCostUsd = usdBasePrice + taxAmount + TOTAL_FIXED_FEES;
  const netProfit = car.expectedUsResale - totalCostUsd;
  
  const isHighYield = netProfit > 20000;

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
