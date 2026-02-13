
import React, { useState, useEffect } from 'react';
import { X, Gavel, TrendingUp, CircleDollarSign, AlertTriangle, ShieldCheck, Zap, Info } from 'lucide-react';
import { Car, ProfitBreakdown } from '../types';
import { getNegotiationStrategy } from '../geminiService';
import { formatCurrency } from '../utils';

interface NegotiationAssistantProps {
  car: Car;
  profit: ProfitBreakdown;
  onClose: () => void;
}

export const NegotiationAssistant: React.FC<NegotiationAssistantProps> = ({ car, profit, onClose }) => {
  const [strategy, setStrategy] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStrategy = async () => {
      setIsLoading(true);
      const data = await getNegotiationStrategy(car, profit);
      setStrategy(data);
      setIsLoading(false);
    };
    fetchStrategy();
  }, [car, profit]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto">
      <div className="w-full max-w-4xl glass-card rounded-[3rem] border border-white/20 shadow-2xl relative flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Summary & Action */}
        <div className="w-full md:w-1/3 bg-slate-950 p-10 flex flex-col border-b md:border-b-0 md:border-r border-white/10">
          <button onClick={onClose} className="md:hidden absolute top-6 right-6 text-gray-400 p-2">
            <X size={24} />
          </button>
          
          <div className="mb-10">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center mb-6 shadow-xl shadow-amber-400/20">
              <Gavel size={32} className="text-black" />
            </div>
            <h2 className="text-white text-3xl font-black uppercase tracking-tighter leading-none">Deal Master</h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">Neural Negotiation AI</p>
          </div>

          <div className="flex-grow space-y-6">
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Target Net Profit</p>
              <p className="text-emerald-400 text-3xl font-black">{formatCurrency(profit.netProfit)}</p>
            </div>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Export Duty (CBP)</p>
              <p className="text-rose-400 text-xl font-black">{formatCurrency(profit.taxAmount)}</p>
            </div>
          </div>

          <button 
            onClick={() => alert('Contract Generator: Initializing OMP-Standard Agreement...')}
            className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-amber-400 transition-all active:scale-95 shadow-2xl mt-8"
          >
            Draft Agreement
          </button>
        </div>

        {/* Right Side: AI Content */}
        <div className="flex-1 p-10 bg-slate-900/50">
          <button onClick={onClose} className="hidden md:block absolute top-10 right-10 text-gray-400 hover:text-white transition-colors p-2">
            <X size={24} />
          </button>

          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-amber-400 font-black uppercase tracking-[0.3em] text-xs animate-pulse">Analyzing GTA Market Delta...</p>
            </div>
          ) : strategy ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Pricing Advice */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <CircleDollarSign size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Buy Strategy (GTA)</span>
                  </div>
                  <p className="text-white font-medium text-sm leading-relaxed">{strategy.buyPriceAdvice}</p>
                </div>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <TrendingUp size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Sell Strategy (US)</span>
                  </div>
                  <p className="text-white font-medium text-sm leading-relaxed">{strategy.sellPriceAdvice}</p>
                </div>
              </div>

              {/* Tactics */}
              <div className="space-y-6">
                <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-2">
                  <Zap size={14} className="text-amber-400" /> Negotiation Tactics
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {strategy.tactics.map((tactic: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-gray-300 text-sm font-medium">{tactic}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks */}
              <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-[2rem] flex gap-4 items-center">
                <div className="p-3 bg-rose-500/20 rounded-xl text-rose-500">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h4 className="text-rose-400 text-xs font-black uppercase tracking-widest mb-1">Intelligence Risk Alert</h4>
                  <p className="text-white text-sm font-medium italic">"{strategy.riskAlert}"</p>
                </div>
              </div>

              {/* Verification Info */}
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">EIGTA-Neural v4.1 Verified</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold">
                  <Info size={14} />
                  <span>Based on {car.year} {car.make} current market index</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-rose-400 font-bold">Intelligence Engine Offline. Please contact the GTA Desk.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
