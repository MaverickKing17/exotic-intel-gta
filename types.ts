
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  cadPrice: number;
  vin?: string;
  isNorthAmerican: boolean;
  usPartPercentage: number;
  image: string;
  speedToSale: number;
  historyId: string;
  expectedUsResale: number;
  isLive?: boolean;
  // New Analytics Fields
  isWinterDriven?: boolean; 
  hasHeatedStorage?: boolean;
  locationDistrict?: 'VAUGHAN' | 'OAKVILLE' | 'MARKHAM' | 'DOWNTOWN' | 'MISSISSAUGA';
}

export interface ProfitBreakdown {
  usdBasePrice: number;
  taxAmount: number;
  luxuryTaxAmount: number;
  fixedFees: number;
  totalCostUsd: number;
  netProfit: number;
  isHighYield: boolean;
  vinStatus: 'CUSMA ELIGIBLE' | 'FOREIGN (TARIFF APPLIED)';
  winterDeduction: number;
  storagePremium: number;
}
