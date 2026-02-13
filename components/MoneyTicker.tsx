
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
    <div className="w-full bg-[#0078d4] text-white h-[48px] flex items-center border-b border-white/20 sticky top-0 z-[250] font-sans select-none shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
      {/* Dynamic Hub & Rate (Left) - Microsoft Blue Theme */}
      <div className="px-6 flex items-center gap-8 border-r border-white/10 h-full bg-[#005a9e] z-20 shadow-[8px_0_12px_rgba(0,0,0,0.1)] relative">
        <div className="flex items-center gap-2">
          <span className="text-white/70 font-bold text-[9px] tracking-widest uppercase">FX Rate</span>
          <span className="text-white font-black tracking-tight text-[13px] drop-shadow-sm">
            CAD/USD {exchangeRate.toFixed(4)}
          </span>
        </div>
        <div className="flex items-center gap-2 border-l border-white/10 pl-8">
          <Globe size={14} className="text-white/80 animate-pulse" />
          <span className="text-white font-bold whitespace-nowrap uppercase tracking-tight text-[11px]">
            {location}
          </span>
        </div>
      </div>

      {/* High-Contrast Ticker Tape (Center) - Striking Blue */}
      <div className="flex-1 ticker-wrap h-full flex items-center bg-[#0078d4]">
        <div className="ticker-move h-full flex items-center">
          {fullList.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-12 border-r border-white/10 h-1/2 group">
              <span className="text-white font-bold whitespace-nowrap tracking-tight group-hover:text-amber-300 transition-colors uppercase text-[11px]">
                {item.label}
              </span>
              <div className="flex items-center gap-2 font-black">
                <span className={item.neutral ? 'text-white/90' : (item.up ? 'text-[#a7ff83]' : 'text-[#ff9d9d]')}>
                  {item.value}
                </span>
                <span className={item.neutral ? 'text-white/50' : (item.up ? 'text-[#a7ff83]' : 'text-[#ff9d9d]')}>
                  {item.sym}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Profit Metric (Right) - Power Blue Accents */}
      <div className="px-8 flex items-center gap-5 border-l border-white/10 h-full bg-[#005a9e] z-20 shadow-[-8px_0_12px_rgba(0,0,0,0.1)]">
        <Activity size={18} className="text-amber-400" />
        <div className="flex flex-col justify-center">
          <span className="text-white/60 text-[8px] font-black uppercase tracking-[0.2em] leading-none mb-1">
            Unlocked Arbitrage
          </span>
          <span className="text-white text-[15px] font-black tracking-tighter leading-none drop-shadow-md">
            {formatCurrency(totalProfit)} <span className="text-[10px] font-bold text-white/50">USD</span>
          </span>
        </div>
      </div>
    </div>
  );
};
