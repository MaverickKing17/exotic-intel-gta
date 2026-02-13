
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  cadPrice: number;
  vin?: string;
  isNorthAmerican: boolean;
  usPartPercentage: number; // 0 to 1
  image: string;
  speedToSale: number; // estimated days
  historyId: string;
  expectedUsResale: number;
  isLive?: boolean;
}

export interface ProfitBreakdown {
  usdBasePrice: number;
  taxAmount: number;
  fixedFees: number;
  totalCostUsd: number;
  netProfit: number;
  isHighYield: boolean;
  vinStatus: 'ZERO-TARIFF UNICORN' | 'FOREIGN (2026 RULE)';
}
