
export const EXCHANGE_RATE = 0.737;
export const FIXED_FEES = {
  PAPERWORK: 1200,
  SHIPPING: 1800,
  INSPECTION: 500,
};

export const TOTAL_FIXED_FEES = FIXED_FEES.PAPERWORK + FIXED_FEES.SHIPPING + FIXED_FEES.INSPECTION;

export const TAX_RATE = 0.25; // As per the 'Powerhouse Prompt' instructions

export const MOCK_CARS: any[] = [
  {
    id: '1',
    make: 'Ford',
    model: 'F-150 Raptor R',
    year: 2024,
    cadPrice: 145000,
    isNorthAmerican: true,
    usPartPercentage: 0.85,
    image: 'https://images.unsplash.com/photo-1590050772274-1232870425cc?auto=format&fit=crop&q=80&w=800',
    speedToSale: 4,
    historyId: 'EIGTA-7722-X',
    expectedUsResale: 145000
  },
  {
    id: '2',
    make: 'Porsche',
    model: '911 GT3',
    year: 2023,
    cadPrice: 285000,
    isNorthAmerican: false,
    usPartPercentage: 0,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
    speedToSale: 12,
    historyId: 'EIGTA-9221-P',
    expectedUsResale: 265000
  },
  {
    id: '3',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    cadPrice: 115000,
    isNorthAmerican: true,
    usPartPercentage: 0.95,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
    speedToSale: 7,
    historyId: 'EIGTA-3312-T',
    expectedUsResale: 110000
  },
  {
    id: '4',
    make: 'Lucid',
    model: 'Air Sapphire',
    year: 2024,
    cadPrice: 320000,
    isNorthAmerican: true,
    usPartPercentage: 0.90,
    image: 'https://images.unsplash.com/photo-1621360841013-c7683c659ec6?auto=format&fit=crop&q=80&w=800',
    speedToSale: 15,
    historyId: 'EIGTA-8821-L',
    expectedUsResale: 310000
  },
  {
    id: '5',
    make: 'Lamborghini',
    model: 'Huracan Tecnica',
    year: 2023,
    cadPrice: 395000,
    isNorthAmerican: false,
    usPartPercentage: 0,
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=800',
    speedToSale: 21,
    historyId: 'EIGTA-5542-L',
    expectedUsResale: 380000
  }
];
