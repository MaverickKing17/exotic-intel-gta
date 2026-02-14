
import React, { useState, useEffect } from 'react';
import { Car } from '../types';
import { calculateProfit, formatCurrency, getMarketConfidence } from '../utils';
import { fetchMarketComps, MarketComp } from '../marketcheckService';
import { submitAlexLead } from '../supabaseService';
import { ShieldCheck, Zap, TrendingUp, BarChart4, Database, Snowflake, ThermometerSun, UserCheck, Check } from 'lucide-react';

interface CarCardProps {
  car: Car;
  exchangeRate: number;
  onAction: (car: Car) => void;
  onChat: (car: Car) => void;
  onFilterSelect?: (filter: string) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, exchangeRate, onAction, onChat }) => {
  const [marketComp, setMarketComp] = useState<MarketComp | null>(null);
  const [isLeading, setIsLeading] = useState(false);
  const [leadStatus, setLeadStatus] = useState<'IDLE' | 'SUCCESS'>('IDLE');
  
  const profit = calculateProfit(car, exchangeRate);
  
  useEffect(() => {
    const getComps = async () => {
      const data = await fetchMarketComps(car.year, car.make, car.model);
      setMarketComp(data);
    };
    getComps();
  }, [car]);

  const handleQualifyLead = async () => {
    setIsLeading(true);
    const success = await submitAlexLead(car, profit.netProfit);
    if (success) {
      setLeadStatus('SUCCESS');
      setTimeout(() => setLeadStatus('IDLE'), 3000);
    }
    setIsLeading(false);
  };

  const confidenceScore = marketComp ? getMarketConfidence(marketComp.days_on_market, profit.netProfit) : 0;

  return (
    <div className={`glass-card rounded-[2rem] overflow-hidden group transition-all duration-700 hover:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] border-white/5 relative flex flex-col h-full ${car.isLive ? 'ring-1 ring-emerald-500/20' : ''}`}>
      {/* Visual Indicator: Climate Audit */}
      <div className="absolute top-24 right-5 z-20 flex flex-col gap-2">
        {car.isWinterDriven && (
          <div className="bg-rose-500/90 backdrop-blur-md p-1.5 rounded-lg border border-rose-400/50 text-white shadow-lg animate-in zoom-in" title="Winter Exposure Detected">
            <Snowflake size={14} />
          </div>
        )}
        {car.hasHeatedStorage && (
          <div className="bg-emerald-500/90 backdrop-blur-md p-1.5 rounded-lg border border-emerald-400/50 text-white shadow-lg animate-in zoom-in" title="Heated Storage Verified">
            <ThermometerSun size={14} />
          </div>
        )}
      </div>

      <div className="relative h-60 overflow-hidden bg-slate-900">
        <img src={car.image} alt={car.model} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        <div className="absolute top-5 left-5 flex flex-wrap gap-2">
          {car.isLive && (
            <div className="flex items-center gap-1.5 bg-emerald-500 text-black text-[9px] font-black px-2.5 py-1.5 rounded-lg shadow-xl uppercase tracking-widest border border-emerald-400">
              <Database size={12} /> Live Recon
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-slate-900 text-amber-400 text-[9px] font-black px-2.5 py-1.5 rounded-lg border border-amber-400/30 uppercase tracking-widest">
            {profit.vinStatus}
          </div>
        </div>

        <div className="absolute top-5 right-5">
           <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex flex-col items-center">
              <span className="text-white text-[11px] font-black">{confidenceScore}%</span>
              <span className="text-[7px] text-gray-400 uppercase font-black tracking-widest">Confidence</span>
           </div>
        </div>

        <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end">
          <div>
            <h3 className="text-white font-black text-2xl uppercase tracking-tighter leading-none">{car.make} {car.model}</h3>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{car.year} • VIN: {car.vin || car.historyId}</p>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500">
              <TrendingUp size={14} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">Net Profit</span>
            </div>
            <p className={`text-3xl font-black tracking-tighter ${profit.netProfit > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatCurrency(profit.netProfit)}
            </p>
          </div>
          
          <div className="space-y-1 text-right">
            <div className="flex items-center gap-2 text-gray-500 justify-end">
              <BarChart4 size={14} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">Duty Target</span>
            </div>
            <p className="text-white text-xl font-black">
              {formatCurrency(profit.taxAmount + profit.luxuryTaxAmount)}
            </p>
          </div>
        </div>

        <div className="pt-2 flex gap-3">
          <button 
            onClick={() => onAction(car)}
            className="flex-1 bg-white text-black font-black py-4 rounded-2xl transition-all hover:bg-amber-400 hover:scale-[1.02] active:scale-95 text-[11px] uppercase tracking-widest shadow-xl"
          >
            Execute Deal
          </button>
          <button 
            onClick={handleQualifyLead}
            disabled={isLeading || leadStatus === 'SUCCESS'}
            className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all border ${
              leadStatus === 'SUCCESS' 
              ? 'bg-emerald-500 border-emerald-400 text-black' 
              : 'bg-slate-900 border-white/10 hover:border-emerald-400/50 text-white'
            }`}
          >
            {leadStatus === 'SUCCESS' ? <Check size={22} /> : <UserCheck size={22} className={isLeading ? 'animate-pulse' : ''} />}
          </button>
        </div>
      </div>
    </div>
  );
};
