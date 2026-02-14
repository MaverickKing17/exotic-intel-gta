
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.0';
import { Car } from './types';

/**
 * PDF Section 4: Supabase Integration
 * Schema for 'leads' table:
 * 
 * CREATE TABLE leads (
 *   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
 *   created_at timestamp with time zone DEFAULT now(),
 *   car_id text NOT NULL,
 *   car_name text NOT NULL,
 *   source text DEFAULT 'Alex-Neural-Recon',
 *   potential_profit numeric NOT NULL,
 *   qualified_at timestamp with time zone NOT NULL,
 *   status text DEFAULT 'QUALIFIED',
 *   vin text,
 *   user_id uuid REFERENCES auth.users(id)
 * );
 */

const SUPABASE_URL = 'https://cbdlwqohaqekmcpbxqlx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiZGx3cW9oYXFla21jcGJ4cWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzYwMTQsImV4cCI6MjA4NjQxMjAxNH0.mVTW6kNNFMLo1fuVpD02bJI0GTZA2UTdErv9DikiVc4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Pushes a qualified 'Alex' lead to the leads table for CRM processing.
 * Strictly implements PDF Section 4 requirements.
 */
export const submitAlexLead = async (car: Car, profit: number) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { 
          car_id: car.id, 
          car_name: `${car.year} ${car.make} ${car.model}`,
          source: 'Alex-Neural-Recon',
          potential_profit: profit,
          qualified_at: new Date().toISOString(),
          status: 'QUALIFIED',
          vin: car.vin || car.historyId
        }
      ]);
    
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Alex Lead Submission Error:', err);
    return false;
  }
};

export const fetchPorscheInventory = async (): Promise<Car[]> => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('id, make, model, year, price_cad, vin, image_url, demand_score, expected_us_resale')
      .eq('make', 'Porsche')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    return (data || []).map((item: any) => {
      const vinValue = (item.vin || '').trim().toUpperCase();
      const isNorthAmerican = /^[1-5]/.test(vinValue);

      return {
        id: item.id.toString(),
        make: item.make,
        model: item.model,
        year: item.year || 2024,
        cadPrice: item.price_cad || 0,
        vin: vinValue,
        isNorthAmerican: isNorthAmerican,
        usPartPercentage: isNorthAmerican ? 0.85 : 0.05,
        image: item.image_url || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
        speedToSale: item.demand_score || 10,
        historyId: `SUPA-${item.id}`,
        expectedUsResale: item.expected_us_resale || 0,
        isLive: true,
        isWinterDriven: Math.random() > 0.7,
        hasHeatedStorage: Math.random() > 0.4
      };
    });
  } catch (error) {
    console.error('Supabase Inventory Sync Failure:', error);
    return [];
  }
};
