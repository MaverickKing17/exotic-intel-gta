
import { TAX_RATE, TOTAL_FIXED_FEES } from './constants';
import { Car, ProfitBreakdown } from './types';

export const calculateProfit = (car: Car, exchangeRate: number): ProfitBreakdown => {
  const usdBasePrice = car.cadPrice * exchangeRate;
  
  let taxAmount = 0;
  if (car.isNorthAmerican) {
    // 25% tax on parts NOT from the US
    const nonUsPortion = 1 - car.usPartPercentage;
    taxAmount = usdBasePrice * TAX_RATE * nonUsPortion;
  } else {
    // 25% tax applies to the whole car
    taxAmount = usdBasePrice * TAX_RATE;
  }

  const totalCostUsd = usdBasePrice + taxAmount + TOTAL_FIXED_FEES;
  const netProfit = car.expectedUsResale - totalCostUsd;
  
  // 'Golden Deal' Flag: Any car where the tax is less than 10% of the price
  const isHighYield = (taxAmount / usdBasePrice) < 0.10;

  return {
    usdBasePrice,
    taxAmount,
    fixedFees: TOTAL_FIXED_FEES,
    totalCostUsd,
    netProfit,
    isHighYield
  };
};

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};
