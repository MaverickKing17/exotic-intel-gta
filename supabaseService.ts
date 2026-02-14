
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.0';
import { Car } from './types';

const SUPABASE_URL = 'https://cbdlwqohaqekmcpbxqlx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiZGx3cW9oYXFla21jcGJ4cWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzYwMTQsImV4cCI6MjA4NjQxMjAxNH0.mVTW6kNNFMLo1fuVpD02bJI0GTZA2UTdErv9DikiVc4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Fetches the latest Porsche inventory from the private Supabase node.
 * Maps high-fidelity data including VIN and market-specific metadata.
 */
export const fetchPorscheInventory = async (): Promise<Car[]> => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('id, make, model, year, price_cad, vin, image_url, demand_score, expected_us_resale')
      .eq('make', 'Porsche')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    // Map Supabase schema to our elite Car interface with explicit VIN translation and USMCA derivation
    return (data || []).map((item: any) => {
      // Normalize VIN: Trim and ensure uppercase for standard formatting
      const vinValue = (item.vin || '').trim().toUpperCase();
      
      // USMCA Intelligence: VINs starting with 1, 2, 3, 4, or 5 indicate North American assembly
      // (1, 4, 5 = USA; 2 = Canada; 3 = Mexico). Essential for duty-free filtering.
      const isNorthAmerican = /^[1-5]/.test(vinValue);

      return {
        id: item.id.toString(),
        make: item.make,
        model: item.model,
        year: item.year || 2024,
        cadPrice: item.price_cad || 0,
        vin: vinValue,
        isNorthAmerican: isNorthAmerican,
        usPartPercentage: isNorthAmerican ? 0.85 : 0.05, // Estimated part value based on origin
        image: item.image_url || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
        speedToSale: item.demand_score || 10,
        historyId: `SUPA-${item.id}`,
        expectedUsResale: item.expected_us_resale || 0,
        isLive: true // UI distinction for real-time inventory from the node
      };
    });
  } catch (error) {
    console.error('Supabase Inventory Sync Failure:', error);
    return [];
  }
};
