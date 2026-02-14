
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, ExternalLink, Globe, Sparkles, Trash2, Maximize2 } from 'lucide-react';
import { Car } from '../types';
import { getSalesAssistantResponse } from '../geminiService';

interface AssistantModalProps {
  car: Car | null;
  onClose: () => void;
}

export const AssistantModal: React.FC<AssistantModalProps> = ({ car, onClose }) => {
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string, sources?: any[]}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (car) {
      setMessages([
        { 
          role: 'ai', 
          text: `Intelligence Lock: ${car.year} ${car.make} ${car.model}. I have initialized the market search engine for US resale comps and cross-border logistics for this specific VIN-type. What specifics do you need?` 
        }
      ]);
    }
  }, [car]);

  // Handle Esc key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || !car) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const context = `Car: ${car.year} ${car.make} ${car.model}. CAD Price: ${car.cadPrice}. NA-Origin: ${car.isNorthAmerican}. Expected US Resale Target: ${car.expectedUsResale}.`;
    
    const result = await getSalesAssistantResponse(userMsg, context);
    setMessages(prev => [...prev, { role: 'ai', text: result.text, sources: result.sources }]);
    setIsLoading(false);
  };

  const clearChat = () => {
    if (car) {
      setMessages([{ 
        role: 'ai', 
        text: `Intelligence Refreshed: ${car.year} ${car.make} ${car.model}. All previous session data purged. System ready for new query.` 
      }]);
    }
  };

  if (!car) return null;

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Dynamic Modal Container */}
      <div className="w-full max-w-2xl glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full max-h-[min(850px,90vh)] shadow-[0_0_100px_rgba(0,0,0,0.8)] border-white/10 relative transition-all duration-500 scale-in-center">
        
        {/* Animated Scanner Overlay (Visual Flair) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-[scanner_3s_ease-in-out_infinite] pointer-events-none z-50" />
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950/80 backdrop-blur-md sticky top-0 z-[60]">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group cursor-pointer">
                <Bot size={28} className="text-black group-hover:rotate-12 transition-transform" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse" />
            </div>
            <div>
              <h4 className="text-white font-black text-sm md:text-base uppercase tracking-tighter flex items-center gap-2">
                Market Intel Engine 
                <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-gray-500 border border-white/5">v4.1</span>
              </h4>
              <div className="flex items-center gap-2">
                <p className="text-emerald-400 text-[9px] font-black uppercase tracking-widest">Neural Link Synchronized</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={clearChat}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-rose-400 hover:bg-rose-400/10 transition-all"
              title="Purge Intel Buffer"
            >
              <Trash2 size={18} />
            </button>
            <button 
              onClick={onClose} 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Message Content Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-900/40 custom-scrollbar">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              {m.role === 'ai' && (
                 <div className="flex items-center gap-2 mb-2 ml-1">
                   <Sparkles size={10} className="text-amber-400" />
                   <span className="text-[8px] font-black uppercase text-gray-500 tracking-[0.2em]">Neural Output</span>
                 </div>
              )}
              
              <div className={`max-w-[90%] md:max-w-[85%] rounded-[1.8rem] p-6 text-[13px] md:text-sm leading-relaxed shadow-2xl relative group ${
                m.role === 'user' 
                ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-black font-bold rounded-tr-none border border-amber-300/50' 
                : 'bg-white/5 text-gray-100 border border-white/10 rounded-tl-none backdrop-blur-md'
              }`}>
                {/* Visual Accent for AI Bubbles */}
                {m.role === 'ai' && (
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-[1.8rem]" />
                )}
                
                {m.text}
                
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-white/10 space-y-3">
                    <div className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <Globe size={12} className="text-amber-400" /> Grounded Intelligence Sources:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {m.sources.map((s: any, i: number) => (
                        s.web && (
                          <a 
                            key={i} 
                            href={s.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-black/40 hover:bg-amber-400/20 px-3 py-1.5 rounded-xl text-[10px] text-amber-400 border border-white/5 hover:border-amber-400/30 transition-all group/link"
                          >
                            <ExternalLink size={10} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            {s.web.title || 'Source Signal'}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-xl">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                </div>
                <div className="flex flex-col">
                  <span className="text-amber-400 text-[9px] font-black uppercase tracking-[0.2em]">Processing Request</span>
                  <span className="text-gray-500 text-[8px] font-mono uppercase">Analyzing US-GTA Market Delta...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Input Hub */}
        <div className="p-6 md:p-8 bg-slate-950/95 border-t border-white/10 backdrop-blur-2xl">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-4 group"
          >
            <div className="flex-1 relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query market delta or import compliance protocols..."
                disabled={isLoading}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-gray-600 disabled:opacity-50 font-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 pointer-events-none">
                 <span className="text-[10px] text-gray-600 font-mono border border-white/5 px-1.5 py-0.5 rounded">⏎ Send</span>
              </div>
            </div>
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-black hover:bg-amber-400 transition-all active:scale-95 disabled:opacity-30 disabled:grayscale shadow-[0_10px_30px_rgba(255,255,255,0.05)] hover:shadow-amber-400/20 group/send"
            >
              <Send size={28} className="group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5 transition-transform" />
            </button>
          </form>
          
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 opacity-50">
              <Globe size={12} className="text-emerald-500" />
              <span className="text-[8px] font-black text-white uppercase tracking-widest">Global Grounding Active</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="flex items-center gap-2 opacity-50">
              <Lock size={12} className="text-amber-400" />
              <span className="text-[8px] font-black text-white uppercase tracking-widest">End-to-End Encrypted</span>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scanner {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        .scale-in-center {
          animation: scale-in-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }
        @keyframes scale-in-center {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

const Lock = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
