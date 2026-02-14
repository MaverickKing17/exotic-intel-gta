
export interface BorderStatus {
  bridge: string;
  location: string;
  carWait: string;
  truckWait: string;
  status: 'OPTIMAL' | 'DELAYED' | 'CONGESTED';
  lastUpdated: string;
}

/**
 * Fetches real-time border wait times for key GTA-US corridors.
 * Simulated for the 100M SaaS UI demo with dynamic variance logic to mimic live API behavior.
 */
export const fetchBorderStatus = async (): Promise<BorderStatus[]> => {
  const now = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

  // Helper to determine status based on car wait time thresholds
  const getStatus = (wait: number): 'OPTIMAL' | 'DELAYED' | 'CONGESTED' => {
    if (wait < 25) return 'OPTIMAL';
    if (wait < 50) return 'DELAYED';
    return 'CONGESTED';
  };

  // Base crossing data for the GTA corridor
  const bridges = [
    { name: 'Peace Bridge', loc: 'Fort Erie, ON / Buffalo, NY', baseCar: 15, baseTruck: 28 },
    { name: 'Rainbow Bridge', loc: 'Niagara Falls, ON / NY', baseCar: 42, baseTruck: null },
    { name: 'Queenston-Lewiston', loc: 'Niagara-on-the-Lake, ON', baseCar: 20, baseTruck: 35 },
    { name: 'Ambassador Bridge', loc: 'Windsor, ON / Detroit, MI', baseCar: 58, baseTruck: 85 },
  ];

  // Map to BorderStatus with randomized "live" fluctuations
  return bridges.map(b => {
    // Generate slight fluctuations: +/- 8 mins for cars, +/- 12 mins for trucks
    const carFluctuation = Math.floor(Math.random() * 16) - 8;
    const truckFluctuation = Math.floor(Math.random() * 24) - 12;

    const carWaitVal = Math.max(2, b.baseCar + carFluctuation);
    const truckWaitVal = b.baseTruck !== null 
      ? Math.max(5, b.baseTruck + truckFluctuation) 
      : null;
    
    return {
      bridge: b.name,
      location: b.loc,
      carWait: `${carWaitVal} min`,
      truckWait: truckWaitVal !== null ? `${truckWaitVal} min` : 'N/A',
      status: getStatus(carWaitVal),
      lastUpdated: now
    };
  });
};
