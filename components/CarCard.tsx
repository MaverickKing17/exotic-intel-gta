
import React, { useState, useEffect } from 'react';
import { Car } from '../types';
import { calculateProfit, formatCurrency, getMarketConfidence } from '../utils';
import { fetchMarketComps, MarketComp } from '../marketcheckService';
import { ShieldCheck, Zap, TrendingUp, Clock, Database, BarChart4, AlertCircle } from 'lucide-react';

interface CarCardProps {
  car: Car;
  exchangeRate: number;
  onAction: (car: Car) => void;
  onChat: (car: Car) => void;
  onFilterSelect?: (filter: string) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, exchangeRate, onAction, onChat }) => {
  const [marketComp, setMarketComp] = useState<MarketComp | null>(null);
  const profit = calculateProfit(car, exchangeRate);
  
  useEffect(() => {
    // SaaS Power Feature: Live Recon for every listing
    const getComps = async () => {
      const data = await fetchMarketComps(car.year, car.make, car.model);
      setMarketComp(data);
    };
    getComps();
  }, [car]);

  const confidenceScore = marketComp ? getMarketConfidence(marketComp.days_on_market, profit.netProfit) : 0;

  return (
    <div className={`glass-card rounded-[2rem] overflow-hidden group transition-all duration-700 hover:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] border-white/5 relative flex flex-col h-full ${car.isLive ? 'ring-1 ring-emerald-500/20' : ''}`}>
      {/* Animated Heat Signal */}
      {profit.isHighYield && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-[60px] pointer-events-none group-hover:bg-amber-400/20 transition-all duration-1000" />
      )}

      {/* Image Section */}
      <div className="relative h-60 overflow-hidden bg-slate-900">
        <img 
          src={car.image} 
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        {/* Elite SaaS Badges */}
        <div className="absolute top-5 left-5 flex flex-wrap gap-2">
          {car.isLive && (
            <div className="flex items-center gap-1.5 bg-emerald-500 text-black text-[9px] font-black px-2.5 py-1.5 rounded-lg shadow-xl uppercase tracking-widest border border-emerald-400">
              <Database size={12} />
              Live Recon
            </div>
          )}
          {profit.vinStatus === 'ZERO-TARIFF UNICORN' && (
            <div className="flex items-center gap-1.5 bg-amber-400 text-black text-[9px] font-black px-2.5 py-1.5 rounded-lg shadow-xl animate-pulse uppercase tracking-widest">
              <Zap size={12} fill="currentColor" />
              Unicorn VIN
            </div>
          )}
        </div>

        {/* Confidence Indicator */}
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
          <div className="text-right">
            <p className="text-gray-500 text-[9px] uppercase font-black tracking-widest mb-1">GTA Value</p>
            <p className="text-white font-mono font-bold text-lg">{formatCurrency(car.cadPrice, 'CAD')}</p>
          </div>
        </div>
      </div>

      {/* SaaS Intel Section */}
      <div className="p-6 flex flex-col flex-grow space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500">
              <TrendingUp size={14} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">Net Arbitrage</span>
            </div>
            <p className={`text-3xl font-black tracking-tighter ${profit.netProfit > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatCurrency(profit.netProfit)}
            </p>
          </div>
          
          <div className="space-y-1 text-right">
            <div className="flex items-center gap-2 text-gray-500 justify-end">
              <BarChart4 size={14} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">US Market Comp</span>
            </div>
            <p className="text-white text-xl font-black">
              {marketComp ? formatCurrency(marketComp.average_price) : '--'}
            </p>
          </div>
        </div>

        {/* Data Matrix */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center">
            <p className="text-gray-500 text-[8px] font-black uppercase mb-1">US Inventory</p>
            <p className="text-white text-sm font-bold">{marketComp?.inventory_count || '--'}</p>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center">
            <p className="text-gray-500 text-[8px] font-black uppercase mb-1">Avg Turn</p>
            <p className="text-white text-sm font-bold">{marketComp?.days_on_market || '--'}d</p>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center">
            <p className="text-gray-500 text-[8px] font-black uppercase mb-1">2026 Duty</p>
            <p className={`text-xs font-black ${profit.taxAmount === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {profit.taxAmount === 0 ? '0%' : '21.2%'}
            </p>
          </div>
        </div>

        <div className="pt-2 flex gap-3">
          <button 
            onClick={() => onAction(car)}
            className="flex-1 bg-white text-black font-black py-4 rounded-2xl transition-all hover:bg-amber-400 hover:scale-[1.02] active:scale-95 text-[11px] uppercase tracking-widest shadow-xl shadow-white/5"
          >
            Initiate Deal
          </button>
          <button 
            onClick={() => onChat(car)}
            className="w-14 h-14 flex items-center justify-center bg-slate-900 text-white rounded-2xl transition-all hover:bg-slate-800 active:scale-95 border border-white/10 group-hover:border-amber-400/50"
          >
            <Zap size={22} className="text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
