
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
 * Simulated for the 100M SaaS UI demo, designed for direct CBP/CBSA API integration.
 */
export const fetchBorderStatus = async (): Promise<BorderStatus[]> => {
  // Real integration would fetch from: https://bwt.cbp.gov/api/v1/borderwait/port/090101
  // For the elite UI experience, we provide high-fidelity real-time simulation
  const now = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  
  return [
    {
      bridge: 'Peace Bridge',
      location: 'Fort Erie, ON / Buffalo, NY',
      carWait: '12 min',
      truckWait: '25 min',
      status: 'OPTIMAL',
      lastUpdated: now
    },
    {
      bridge: 'Rainbow Bridge',
      location: 'Niagara Falls, ON / NY',
      carWait: '45 min',
      truckWait: 'N/A', // No commercial traffic
      status: 'DELAYED',
      lastUpdated: now
    },
    {
      bridge: 'Queenston-Lewiston',
      location: 'Niagara-on-the-Lake, ON',
      carWait: '18 min',
      truckWait: '32 min',
      status: 'OPTIMAL',
      lastUpdated: now
    },
    {
      bridge: 'Ambassador Bridge',
      location: 'Windsor, ON / Detroit, MI',
      carWait: '55 min',
      truckWait: '82 min',
      status: 'CONGESTED',
      lastUpdated: now
    }
  ];
};
