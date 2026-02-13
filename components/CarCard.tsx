
import React from 'react';
import { Car } from '../types';
import { calculateProfit, formatCurrency } from '../utils';
import { ShieldCheck, Zap, TrendingUp, Clock } from 'lucide-react';

interface CarCardProps {
  car: Car;
  exchangeRate: number;
  onAction: (car: Car) => void;
  onChat: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, exchangeRate, onAction, onChat }) => {
  const profit = calculateProfit(car, exchangeRate);

  return (
    <div className="glass-card rounded-2xl overflow-hidden group transition-all duration-500 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-black/50">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={car.image} 
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {profit.isHighYield && (
            <div className="flex items-center gap-1 bg-amber-400 text-black text-[10px] font-bold px-2 py-1 rounded-full animate-pulse-gold">
              <Zap size={12} fill="currentColor" />
              HIGH-YIELD DEAL
            </div>
          )}
          {car.isNorthAmerican && (
            <div className="flex items-center gap-1 bg-blue-500/80 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm">
              <ShieldCheck size={12} />
              NAFTA ELIGIBLE
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <h3 className="text-white font-bold text-xl">{car.make} {car.model}</h3>
            <p className="text-gray-400 text-sm">{car.year} • Toronto, ON</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-[10px] uppercase font-bold">List Price (CAD)</p>
            <p className="text-white font-mono">{formatCurrency(car.cadPrice, 'CAD')}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500">
              <TrendingUp size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Net Profit (USD)</span>
            </div>
            <p className="text-emerald-400 text-2xl font-black">
              {formatCurrency(profit.netProfit)}
            </p>
          </div>
          
          <div className="space-y-1 text-right">
            <div className="flex items-center gap-2 text-gray-500 justify-end">
              <Clock size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Speed to Sale</span>
            </div>
            <p className="text-white text-lg font-bold">
              {car.speedToSale} <span className="text-xs text-gray-400">Days</span>
            </p>
          </div>
        </div>

        {/* Detailed Breakdown Accordion-like display */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-2">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-400">USD Base Conversion</span>
            <span className="text-gray-300">{formatCurrency(profit.usdBasePrice)}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-400">USMCA Import Tax (25%)</span>
            <span className="text-rose-400">-{formatCurrency(profit.taxAmount)}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-400">Logistics & Fees</span>
            <span className="text-rose-400">-{formatCurrency(profit.fixedFees)}</span>
          </div>
          <div className="pt-2 border-t border-white/10 flex justify-between text-xs font-bold">
            <span className="text-white">Digital Trust ID</span>
            <span className="text-amber-400 font-mono">{car.historyId}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onAction(car)}
            className="flex-1 bg-white text-black font-bold py-3 rounded-xl transition-all hover:bg-amber-400 active:scale-95 text-sm uppercase tracking-widest"
          >
            Start Deal
          </button>
          <button 
            onClick={() => onChat(car)}
            className="w-12 h-12 flex items-center justify-center bg-slate-800 text-white rounded-xl transition-all hover:bg-slate-700 active:scale-95 border border-white/10"
            title="AI Assistant"
          >
            <Zap size={20} className="text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
