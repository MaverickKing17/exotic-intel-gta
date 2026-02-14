
import React, { useState, useEffect } from 'react';
import { TrendingUp, Cpu, Activity, Zap, Search, ShieldCheck, Globe } from 'lucide-react';

const LOG_MESSAGES = [
  "Synchronizing MarketCheck US Listing Feed...",
  "Analyzing Toronto-Vaughan UVIP liquidity...",
  "Calibrating USMCA 2026 Duty coefficients...",
  "Scanning Porsche 911 GT3 secondary market velocity...",
  "Optimizing cross-border logistics transit nodes...",
  "Detecting CAD/USD exchange rate volatility...",
  "Neural Engine: Projecting 30-day arbitrage window...",
  "Validating US dealership inventory saturation..."
];

export const PredictiveModeler: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentLog, setCurrentLog] = useState(0);
  const [confidence, setConfidence] = useState(94.2);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isSimulating) {
      interval = setInterval(() => {
        setCurrentLog(prev => (prev + 1) % LOG_MESSAGES.length);
        setConfidence(prev => Math.min(99.9, Math.max(92, prev + (Math.random() - 0.5))));
        setProgress(prev => {
          if (prev >= 100) {
            setIsSimulating(false);
            return 100;
          }
          return prev + 2;
        });
      }, 150);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  const startSimulation = () => {
    setIsSimulating(true);
    setCurrentLog(0);
  };

  return (
    <div className="glass-card rounded-[5rem] border-white/5 relative overflow-hidden min-h-[600px] flex flex-col items-center justify-center p-12 group">
      
      {/* Neural Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.1),transparent_70%)]" />
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      {/* Main Visualization */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        
        {/* Animated Icon Hub */}
        <div className="relative mb-12">
          <div className={`w-32 h-32 rounded-[2.5rem] bg-amber-400/10 flex items-center justify-center text-amber-400 border border-amber-400/20 transition-all duration-1000 shadow-[0_0_50px_rgba(251,191,36,0.1)] ${isSimulating ? 'scale-110 rotate-[360deg] border-amber-400 shadow-amber-400/30' : 'group-hover:scale-110 group-hover:rotate-12'}`}>
            {isSimulating ? <Cpu size={56} className="animate-pulse" /> : <TrendingUp size={56} />}
          </div>
          {isSimulating && (
            <div className="absolute inset-0 rounded-[2.5rem] border-2 border-amber-400/50 animate-ping opacity-20" />
          )}
        </div>

        <h3 className="text-white text-5xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Predictive Profit Modeler
        </h3>
        
        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed font-medium mb-12">
          Our neural engine analyzes real-time US listing velocity vs Ontario-specific UVIP data to optimize your next 30-day arbitrage window.
        </p>

        {/* Live Simulation Matrix */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-black/40 border border-white/5 p-6 rounded-[2rem] backdrop-blur-md">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Neural Confidence</p>
            <p className="text-amber-400 text-3xl font-mono font-black">{confidence.toFixed(1)}%</p>
          </div>
          <div className="bg-black/40 border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden">
             <div className="absolute bottom-0 left-0 h-1 bg-amber-400 transition-all duration-300" style={{ width: `${progress}%` }} />
             <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Processing Phase</p>
             <p className="text-white text-lg font-black uppercase tracking-tight truncate">
               {isSimulating ? LOG_MESSAGES[currentLog] : 'System Standby'}
             </p>
          </div>
          <div className="bg-black/40 border border-white/5 p-6 rounded-[2rem] backdrop-blur-md">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Liquidity Delta</p>
            <p className="text-emerald-400 text-3xl font-mono font-black">+21.4%</p>
          </div>
        </div>

        {/* Interactive Growth Chart */}
        <div className="w-full h-32 bg-white/5 rounded-[2rem] border border-white/10 mb-12 relative overflow-hidden group/chart">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <path 
              d={isSimulating 
                ? "M0 100 Q 200 80, 400 90 T 800 40 T 1200 60 T 1600 20 L 1600 120 L 0 120 Z" 
                : "M0 80 Q 400 80, 800 80 T 1600 80 L 1600 120 L 0 120 Z"
              } 
              fill="rgba(251, 191, 36, 0.05)"
              stroke="rgba(251, 191, 36, 0.5)"
              strokeWidth="2"
              className="transition-all duration-[2000ms] ease-in-out"
            />
            {isSimulating && (
               <circle cx={`${progress}%`} cy="40" r="4" fill="#fbbf24" className="animate-pulse shadow-[0_0_10px_rgba(251,191,36,1)]" />
            )}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/chart:opacity-100 transition-opacity">
            <span className="text-[10px] text-amber-400 font-black uppercase tracking-[0.4em]">Projected Yield Curve</span>
          </div>
        </div>

        <button 
          onClick={startSimulation}
          disabled={isSimulating}
          className={`px-16 py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] transition-all flex items-center gap-4 active:scale-95 shadow-2xl ${
            isSimulating 
            ? 'bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed' 
            : 'bg-white text-black hover:bg-amber-400 hover:shadow-amber-400/20'
          }`}
        >
          {isSimulating ? (
            <>
              <Activity size={20} className="animate-spin" />
              Processing Signals...
            </>
          ) : (
            <>
              Execute Neural Analysis
              <Zap size={20} fill="currentColor" />
            </>
          )}
        </button>
      </div>

      {/* Floating Intel Tags */}
      <div className="absolute bottom-10 left-10 flex gap-6 opacity-30 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <Globe size={12} className="text-amber-400" />
          <span className="text-[8px] font-black text-white uppercase tracking-widest">Global Grounding</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={12} className="text-emerald-500" />
          <span className="text-[8px] font-black text-white uppercase tracking-widest">Verified Logic</span>
        </div>
      </div>
    </div>
  );
};
