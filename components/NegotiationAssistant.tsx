import React, { useState, useEffect } from 'react';
import { X, Gavel, TrendingUp, CircleDollarSign, AlertTriangle, ShieldCheck, Zap, Info, Loader2, Snowflake, ThermometerSun } from 'lucide-react';
import { Car, ProfitBreakdown } from '../types';
import { getNegotiationStrategy } from '../geminiService';
import { formatCurrency } from '../utils';
import { WinterGrade } from './WinterGrade';

interface NegotiationAssistantProps {
  car: Car;
  profit: ProfitBreakdown;
  onClose: () => void;
  onDraftComplete?: (msg: string) => void;
}

export const NegotiationAssistant: React.FC<NegotiationAssistantProps> = ({ car, profit, onClose, onDraftComplete }) => {
  const [strategy, setStrategy] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftProgress, setDraftProgress] = useState(0);

  useEffect(() => {
    const fetchStrategy = async () => {
      setIsLoading(true);
      const data = await getNegotiationStrategy(car, profit);
      setStrategy(data);
      setIsLoading(false);
    };
    fetchStrategy();
  }, [car, profit]);

  const handleDraftAgreement = () => {
    setIsDrafting(true);
    setDraftProgress(0);
    const interval = setInterval(() => {
      setDraftProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDrafting(false);
            if (onDraftComplete) onDraftComplete(`USMCA-2026 Export Permit ready for ${car.make} ${car.model}.`);
          }, 800);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto">
      <div className="w-full max-w-5xl glass-card rounded-[4rem] border border-white/20 shadow-2xl relative flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Summary & Action */}
        <div className="w-full md:w-[40%] bg-slate-950 p-12 flex flex-col border-b md:border-b-0 md:border-r border-white/10">
          <button onClick={onClose} className="absolute top-8 left-8 text-gray-500 hover:text-white p-2">
            <X size={24} />
          </button>
          
          <div className="mt-12 mb-10">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center mb-6 shadow-xl shadow-amber-400/20">
              <Gavel size={32} className="text-black" />
            </div>
            <h2 className="text-white text-3xl font-black uppercase tracking-tighter leading-none">CUSMA Audit Desk</h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-3">Neural Export Modeling 2.4.x</p>
          </div>

          <div className="flex-grow space-y-8">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Net Projected Profit</p>
              <p className="text-emerald-400 text-4xl font-black tracking-tighter">{formatCurrency(profit.netProfit)}</p>
            </div>

            <WinterGrade car={car} profit={profit} />

            <div className="space-y-4">
               <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Compliance Calculations (LaTeX)</h4>
               <div className="space-y-2 font-mono-elite text-[11px]">
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5 mt-2 space-y-3">
                     <p className="text-gray-500 text-[8px] uppercase tracking-widest mb-1">Luxury Tax Logic (PDF 1.1)</p>
                     <p className="text-amber-400/80 italic text-[11px] leading-relaxed">
                        {/* Fix: Wrapped LaTeX-style strings in string literals to prevent JSX from interpreting curly braces as expressions */}
                        {"$L_T = \\max(0.10 \\times T_{pre}, 0.20 \\times (V_{usd} - 10^5))$"}
                     </p>
                     <p className="text-gray-500 text-[8px] uppercase tracking-widest mt-4 mb-1">CUSMA Midpoint Deduction (PDF 1.2)</p>
                     <p className="text-rose-400/80 italic text-[11px] leading-relaxed">
                        {/* Fix: Wrapped LaTeX-style strings in string literals to prevent JSX from interpreting curly braces as expressions */}
                        {"$W_G = P_{cad} \\times \\delta_{winter} \\text{ where } \\delta \\in [0.05, 0.08]$"}
                     </p>
                  </div>
               </div>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <button 
              onClick={handleDraftAgreement}
              disabled={isDrafting || isLoading}
              className="w-full py-6 bg-white text-black font-black uppercase tracking-widest rounded-3xl hover:bg-amber-400 transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isDrafting ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} fill="currentColor" />}
              {isDrafting ? `DRAFTING MANIFEST... ${draftProgress}%` : "GENERATE USMCA MANIFEST"}
            </button>
          </div>
        </div>

        {/* Right Side: AI Content */}
        <div className="flex-1 p-12 bg-slate-900/50 flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-amber-400 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Running Neural Market Recon...</p>
            </div>
          ) : strategy ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 shadow-xl">
                  <div className="flex items-center gap-2 text-blue-400 mb-4">
                    <CircleDollarSign size={18} />
                    <span className="text-[11px] font-black uppercase tracking-widest">Toronto Buy Desk</span>
                  </div>
                  <p className="text-white font-medium text-lg leading-relaxed">{strategy.buyPriceAdvice}</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 shadow-xl">
                  <div className="flex items-center gap-2 text-emerald-400 mb-4">
                    <TrendingUp size={18} />
                    <span className="text-[11px] font-black uppercase tracking-widest">US Sell Target</span>
                  </div>
                  <p className="text-white font-medium text-lg leading-relaxed">{strategy.sellPriceAdvice}</p>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 flex items-center gap-3">
                  <Zap size={16} className="text-amber-400 animate-pulse" /> Neural Negotiation Protocols
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {strategy.tactics.map((tactic: string, i: number) => (
                    <div key={i} className="flex items-start gap-6 p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white text-xs font-black flex-shrink-0 border border-white/5">
                        {i + 1}
                      </div>
                      <p className="text-gray-200 text-base font-medium leading-relaxed">{tactic}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-rose-500/10 border border-rose-500/20 rounded-[3rem] flex gap-6 items-center">
                <div className="p-4 bg-rose-500/20 rounded-2xl text-rose-500">
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <h4 className="text-rose-400 text-[10px] font-black uppercase tracking-widest mb-1">CBP/OMVIC Audit Alert</h4>
                  <p className="text-white text-base font-medium italic leading-snug">"{strategy.riskAlert}"</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
