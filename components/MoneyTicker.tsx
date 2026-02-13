
import React from 'react';
import { formatCurrency } from '../utils';
import { TrendingUp, TrendingDown, MapPin, Activity, Globe } from 'lucide-react';

interface MoneyTickerProps {
  totalProfit: number;
  exchangeRate: number;
  location?: string;
}

export const MoneyTicker: React.FC<MoneyTickerProps> = ({ totalProfit, exchangeRate, location = "TORONTO HUB" }) => {
  const tickerItems = [
    { label: 'PORSCHE 911', value: '+2.41%', up: true, sym: '▲' },
    { label: 'CAD/USD', value: exchangeRate.toFixed(4), up: true, sym: '▲' },
    { label: 'USMCA INDEX', value: '114.2', up: true, sym: '▲' },
    { label: '911 GT3 RS', value: '$345,000', up: true, sym: '▲' },
    { label: 'DETROIT TRANSIT', value: 'NOMINAL', neutral: true, sym: '◆' },
    { label: 'MIAMI DEMAND', value: 'MAX-HEAT', up: true, sym: '▲' },
    { label: 'BTB EXOTIC', value: '-0.38%', up: false, sym: '▼' },
    { label: 'ARBITRAGE VOL', value: 'HIGH', up: true, sym: '▲' },
  ];

  // Repeat items for seamless scrolling
  const fullList = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="w-full bg-[#f8fafc] text-slate-900 h-[48px] flex items-center border-b border-slate-300 sticky top-0 z-[250] font-mono-elite text-[12px] select-none shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-400" />

      {/* Dynamic Hub & Rate (Left) - High Contrast Light Mode */}
      <div className="px-6 flex items-center gap-8 border-r border-slate-200 h-full bg-white z-20 shadow-[10px_0_15px_rgba(0,0,0,0.05)] relative">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-black text-[9px] tracking-[0.2em]">RATE:</span>
          <span className="text-emerald-600 font-black tracking-tight text-[13px]">
            CAD/USD {exchangeRate.toFixed(4)}
          </span>
        </div>
        <div className="flex items-center gap-2 border-l border-slate-100 pl-8">
          <Globe size={14} className="text-blue-600 animate-pulse" />
          <span className="text-blue-700 font-black whitespace-nowrap uppercase tracking-tighter text-[11px]">
            {location}
          </span>
        </div>
      </div>

      {/* High-Contrast Ticker Tape (Center) - High Visibility */}
      <div className="flex-1 ticker-wrap h-full flex items-center bg-[#f1f5f9]">
        <div className="ticker-move h-full flex items-center">
          {fullList.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-12 border-r border-slate-200 h-1/2 group">
              <span className="text-slate-800 font-black whitespace-nowrap tracking-tight group-hover:text-blue-600 transition-colors uppercase">
                {item.label}
              </span>
              <div className="flex items-center gap-2 font-black">
                <span className={item.neutral ? 'text-blue-600' : (item.up ? 'text-emerald-600' : 'text-rose-600')}>
                  {item.value}
                </span>
                <span className={item.neutral ? 'text-blue-400' : (item.up ? 'text-emerald-500' : 'text-rose-500')}>
                  {item.sym}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Profit Metric (Right) - Striking Summary */}
      <div className="px-8 flex items-center gap-5 border-l border-slate-200 h-full bg-white z-20 shadow-[-10px_0_15px_rgba(0,0,0,0.05)]">
        <Activity size={18} className="text-amber-500" />
        <div className="flex flex-col justify-center">
          <span className="text-slate-400 text-[8px] font-black uppercase tracking-[0.3em] leading-none mb-1">
            Unlocked Equity
          </span>
          <span className="text-slate-900 text-[15px] font-black tracking-tighter leading-none">
            {formatCurrency(totalProfit)} <span className="text-[10px] font-bold text-slate-400">USD</span>
          </span>
        </div>
      </div>
    </div>
  );
};
