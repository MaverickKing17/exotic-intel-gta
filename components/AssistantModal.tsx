
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, ExternalLink, Globe } from 'lucide-react';
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

  if (!car) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-2xl glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-[700px] shadow-2xl border-white/20">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Bot size={28} className="text-black" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base uppercase tracking-tighter">Market Intel Engine</h4>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Grounding Active</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/30">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] rounded-[1.5rem] p-5 text-sm leading-relaxed ${
                m.role === 'user' 
                ? 'bg-amber-400 text-black font-semibold rounded-tr-none' 
                : 'bg-white/5 text-white border border-white/10 rounded-tl-none shadow-xl'
              }`}>
                {m.text}
                
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                    <div className="w-full text-[10px] text-gray-500 font-bold uppercase mb-1 flex items-center gap-1">
                      <Globe size={10} /> Verified Sources:
                    </div>
                    {m.sources.map((s: any, i: number) => (
                      s.web && (
                        <a 
                          key={i} 
                          href={s.web.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-[10px] text-amber-400 transition-colors"
                        >
                          <ExternalLink size={10} />
                          {s.web.title || 'Source'}
                        </a>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 rounded-2xl px-6 py-4 text-amber-400/80 text-xs font-bold animate-pulse flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1 h-1 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1 h-1 bg-amber-400 rounded-full animate-bounce" />
                </div>
                SCANNING GLOBAL MARKET REPOSITORIES...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 bg-slate-950/80 border-t border-white/10">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-3"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query US market trends or import compliance..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-gray-600"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black hover:bg-amber-400 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-white/5"
            >
              <Send size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
