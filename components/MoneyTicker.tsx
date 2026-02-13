
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
    <div className="w-full bg-[#1e222d] text-white h-[46px] flex items-center border-b border-white/20 sticky top-0 z-[250] font-mono-elite text-[12px] select-none shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      {/* Top Gloss Overlay */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />

      {/* Dynamic Hub & Rate (Left) - Enhanced Contrast */}
      <div className="px-6 flex items-center gap-8 border-r border-white/20 h-full bg-[#2b2f3a] z-20 shadow-[15px_0_20px_rgba(0,0,0,0.3)] relative">
        <div className="flex items-center gap-2">
          <span className="text-white/60 font-black text-[9px] tracking-[0.2em]">RATE:</span>
          <span className="text-[#00ff88] font-black tracking-tight drop-shadow-[0_0_8px_rgba(0,255,136,0.4)]">
            CAD/USD {exchangeRate.toFixed(4)}
          </span>
        </div>
        <div className="flex items-center gap-2 border-l border-white/10 pl-8">
          <Globe size={14} className="text-blue-400 animate-pulse" />
          <span className="text-blue-300 font-black whitespace-nowrap uppercase tracking-tighter text-[11px]">
            {location}
          </span>
        </div>
      </div>

      {/* High-Contrast Ticker Tape (Center) */}
      <div className="flex-1 ticker-wrap h-full flex items-center bg-[#1e222d]">
        <div className="ticker-move h-full flex items-center">
          {fullList.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-12 border-r border-white/10 h-1/2 group">
              <span className="text-white font-black whitespace-nowrap tracking-tight group-hover:text-amber-400 transition-colors uppercase">
                {item.label}
              </span>
              <div className="flex items-center gap-2 font-black">
                <span className={item.neutral ? 'text-blue-400' : (item.up ? 'text-[#00ff88]' : 'text-[#ff4d4d]')}>
                  {item.value}
                </span>
                <span className={item.neutral ? 'text-blue-400/50' : (item.up ? 'text-[#00ff88]' : 'text-[#ff4d4d]')}>
                  {item.sym}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Profit Metric (Right) - Elevated Visibility */}
      <div className="px-8 flex items-center gap-5 border-l border-white/20 h-full bg-[#2b2f3a] z-20 shadow-[-15px_0_20px_rgba(0,0,0,0.3)]">
        <Activity size={18} className="text-amber-400 animate-pulse" />
        <div className="flex flex-col justify-center">
          <span className="text-white/50 text-[8px] font-black uppercase tracking-[0.3em] leading-none mb-1">
            Total Profit
          </span>
          <span className="text-amber-400 text-base font-black tracking-tighter leading-none drop-shadow-[0_0_8px_rgba(251,184,0,0.3)]">
            {formatCurrency(totalProfit)} <span className="text-[10px] font-bold text-white/40">USD</span>
          </span>
        </div>
      </div>
    </div>
  );
};
