
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.0';
import { Car } from './types';

const SUPABASE_URL = 'https://cbdlwqohaqekmcpbxqlx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiZGx3cW9oYXFla21jcGJ4cWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzYwMTQsImV4cCI6MjA4NjQxMjAxNH0.mVTW6kNNFMLo1fuVpD02bJI0GTZA2UTdErv9DikiVc4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const fetchPorscheInventory = async (): Promise<Car[]> => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('make', 'Porsche')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;

    // Map Supabase schema to our Car type
    return (data || []).map((item: any) => ({
      id: item.id.toString(),
      make: item.make,
      model: item.model,
      year: item.year || 2024,
      cadPrice: item.price_cad || 0,
      vin: item.vin || 'UNKNOWN',
      // Determine origin based on VIN logic for the type system
      isNorthAmerican: ['1', '4', '5'].includes(item.vin?.[0]),
      usPartPercentage: 0.85, 
      image: item.image_url || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      speedToSale: item.demand_score || 10,
      historyId: `SUPA-${item.id}`,
      expectedUsResale: item.expected_us_resale || 0,
      isLive: true // Flag for UI distinction
    }));
  } catch (error) {
    console.error('Supabase Fetch Error:', error);
    return [];
  }
};
