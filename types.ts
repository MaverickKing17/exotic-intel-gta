
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  cadPrice: number;
  isNorthAmerican: boolean;
  usPartPercentage: number; // 0 to 1
  image: string;
  speedToSale: number; // estimated days
  historyId: string;
  expectedUsResale: number;
}

export interface ProfitBreakdown {
  usdBasePrice: number;
  taxAmount: number;
  fixedFees: number;
  totalCostUsd: number;
  netProfit: number;
  isHighYield: boolean;
}
