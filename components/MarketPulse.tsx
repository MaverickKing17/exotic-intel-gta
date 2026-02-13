
import React from 'react';
import { Activity, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';

const SIGNALS = [
  { id: 1, type: 'ALERT', text: 'CAD/USD volatility spike: +1.2%', time: '2m ago', icon: Activity, color: 'text-amber-400' },
  { id: 2, type: 'TREND', text: '911 GT3 supply down 15% in GTA', time: '14m ago', icon: ArrowDownRight, color: 'text-rose-400' },
  { id: 3, type: 'DEAL', text: 'New F-150 Raptor R listed in Vaughan', time: '1h ago', icon: Zap, color: 'text-emerald-400' },
  { id: 4, type: 'MACRO', text: 'Port of Miami clearing delay cleared', time: '3h ago', icon: ArrowUpRight, color: 'text-blue-400' },
];

export const MarketPulse: React.FC = () => {
  return (
    <div className="glass-card rounded-[2rem] p-6 border-white/5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          Market Pulse
        </h3>
        <span className="text-gray-500 text-[10px] font-mono">LIVE / TORONTO</span>
      </div>

      <div className="space-y-6 flex-1">
        {SIGNALS.map((s) => (
          <div key={s.id} className="group cursor-default">
            <div className="flex justify-between items-start mb-1">
              <span className={`text-[9px] font-black uppercase tracking-widest ${s.color}`}>{s.type}</span>
              <span className="text-gray-600 text-[9px]">{s.time}</span>
            </div>
            <div className="flex gap-3">
              <div className={`p-2 rounded-lg bg-white/5 ${s.color} transition-colors group-hover:bg-white/10`}>
                <s.icon size={14} />
              </div>
              <p className="text-gray-300 text-xs font-medium leading-tight">
                {s.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <div className="bg-amber-400/10 rounded-xl p-4 border border-amber-400/20">
          <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-1">Arbitrage Rating</p>
          <div className="flex items-baseline gap-2">
            <span className="text-white text-2xl font-black italic">EXTREME</span>
            <span className="text-amber-400 text-sm font-bold">9.2/10</span>
          </div>
        </div>
      </div>
    </div>
  );
};
