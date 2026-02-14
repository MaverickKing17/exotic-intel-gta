
import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Info, Locate, Globe } from 'lucide-react';

const DISTRICTS = [
  { id: 'VAUGHAN', coords: [40, 20], profit: 32000, heat: 'bg-emerald-500', name: 'Vaughan Export Hub' },
  { id: 'OAKVILLE', coords: [20, 70], profit: 28500, heat: 'bg-emerald-400', name: 'Oakville Luxury Point' },
  { id: 'MARKHAM', coords: [70, 30], profit: 19200, heat: 'bg-amber-400', name: 'Markham Tech Corridor' },
  { id: 'DOWNTOWN', coords: [55, 65], profit: 12000, heat: 'bg-rose-400', name: 'Toronto Downtown' },
  { id: 'MISSISSAUGA', coords: [35, 55], profit: 24000, heat: 'bg-emerald-300', name: 'Mississauga West' }
];

export const ArbitrageHeatMap: React.FC = () => {
  const [activeDistrict, setActiveDistrict] = useState(DISTRICTS[0]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMapLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="glass-card rounded-[4rem] border-white/10 overflow-hidden flex flex-col h-full min-h-[500px] relative">
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20 backdrop-blur-md relative z-20">
        <div>
          <h3 className="text-white text-xl font-black uppercase tracking-tighter flex items-center gap-2">
            <Locate size={18} className="text-amber-400" /> GTA Arbitrage Heat Map
          </h3>
          <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.2em] mt-1">PDF Sec 3: MapTiler Profit Analytics Feed</p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
             <span className="text-[9px] text-white/50 font-black uppercase tracking-widest">High Yield</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8_#f43f5e]" />
             <span className="text-[9px] text-white/50 font-black uppercase tracking-widest">Low Delta</span>
           </div>
        </div>
      </div>

      <div className="flex-1 relative bg-[#0a0c10] overflow-hidden p-10 flex items-center justify-center">
        {!isMapLoaded && (
          <div className="absolute inset-0 z-30 bg-black/80 flex flex-col items-center justify-center space-y-4">
            <Globe className="animate-spin text-amber-400" size={32} />
            <span className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Loading MapTiler Vector Tiles...</span>
          </div>
        )}

        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        <div className="relative w-full h-[350px] max-w-xl">
           <svg viewBox="0 0 100 100" className="w-full h-full text-white/5 fill-current">
              <path d="M10,20 L30,10 L70,15 L90,40 L85,80 L50,90 L20,85 Z" className="stroke-white/10 stroke-[0.5] fill-white/[0.02]" />
           </svg>

           {DISTRICTS.map((d) => (
             <button
               key={d.id}
               onClick={() => setActiveDistrict(d)}
               className="absolute group transition-all duration-500 -translate-x-1/2 -translate-y-1/2"
               style={{ left: `${d.coords[0]}%`, top: `${d.coords[1]}%` }}
             >
               <div className={`w-6 h-6 rounded-full ${d.heat} shadow-[0_0_20px_currentColor] animate-pulse group-hover:scale-150 transition-transform relative`}>
                 <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30" />
               </div>
               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-white font-black uppercase tracking-widest z-50">
                 {d.name}
               </div>
             </button>
           ))}
        </div>

        <div className="absolute bottom-8 right-8 w-64 glass-card p-6 rounded-3xl border-white/10 animate-in slide-in-from-right duration-500">
           <div className="flex items-center gap-2 mb-4">
             <TrendingUp size={14} className="text-amber-400" />
             <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Node Intelligence</span>
           </div>
           <h4 className="text-white font-black text-lg mb-1 leading-none uppercase">{activeDistrict.name}</h4>
           <p className="text-emerald-400 text-2xl font-black mb-4">
             +${activeDistrict.profit.toLocaleString()} <span className="text-[10px] text-white/40">AVG. YIELD</span>
           </p>
           <div className="space-y-2">
              <div className="flex justify-between items-center text-[9px] font-black uppercase text-gray-500">
                <span>Inventory Node</span>
                <span className="text-white">Active</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full">
                 <div className="bg-amber-400 h-full w-[70%]" />
              </div>
           </div>
        </div>
      </div>

      <div className="p-4 bg-amber-400 text-black flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em]">
         <MapPin size={14} /> MapTiler API Integrated // GTA Cluster v4.12
      </div>
    </div>
  );
};
