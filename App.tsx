
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_CARS } from './constants';
import { MoneyTicker } from './components/MoneyTicker';
import { CarCard } from './components/CarCard';
import { AssistantModal } from './components/AssistantModal';
import { MarketPulse } from './components/MarketPulse';
import { Footer } from './components/Footer';
import { NegotiationAssistant } from './components/NegotiationAssistant';
import { calculateProfit } from './utils';
import { Car } from './types';
import { fetchPorscheInventory } from './supabaseService';
import { 
  Globe2, Gem, Search, Filter, ArrowUpRight, X, ShieldAlert, 
  Truck, ShieldCheck, MapPin, FileText, CheckCircle2, 
  TrendingUp, BarChart3, AlertCircle, Ship, Landmark,
  Clock, Database, MessageSquareText, Sparkles
} from 'lucide-react';

const App: React.FC = () => {
  const [liveCars, setLiveCars] = useState<Car[]>([]);
  const [selectedCarForChat, setSelectedCarForChat] = useState<Car | null>(null);
  const [selectedCarForDeal, setSelectedCarForDeal] = useState<Car | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [exchangeRate, setExchangeRate] = useState(0.734);
  const [legalModal, setLegalModal] = useState<{title: string, content: string} | null>(null);
  const [currentView, setCurrentView] = useState<'INVENTORY' | 'LOGISTICS' | 'COMPLIANCE' | 'REPORTS'>('INVENTORY');
  const [userHub, setUserHub] = useState('TORONTO HUB');

  // Unified Inventory Management
  const allCars = useMemo(() => {
    const mockIds = new Set(liveCars.map(c => c.id));
    return [...liveCars, ...MOCK_CARS.filter(c => !mockIds.has(c.id))];
  }, [liveCars]);

  useEffect(() => {
    // GEO Implementation for AI Context
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Dynamic hub status based on precision location
          const hubPrefix = pos.coords.latitude > 43.6 ? 'NORTH VAUGHAN HUB' : 'DOWNTOWN ACCESS POINT';
          setUserHub(`${hubPrefix} [SECURE]`);
        },
        () => setUserHub('GLOBAL ACCESS HUB')
      );
    }

    const initData = async () => {
      // Frankfurter Real-time FX Pulse
      try {
        const response = await fetch('https://api.frankfurter.dev/v1/latest?base=CAD&symbols=USD');
        const data = await response.json();
        if (data?.rates?.USD) setExchangeRate(data.rates.USD);
      } catch (e) { 
        console.warn('FX fallback active.');
      }

      // Supabase Private Inventory Pulse
      const porsches = await fetchPorscheInventory();
      setLiveCars(porsches);
    };

    initData();
    const interval = setInterval(initData, 5 * 60 * 1000); // Higher frequency sync
    return () => clearInterval(interval);
  }, []);

  const handleStartDeal = (car: Car) => {
    setSelectedCarForDeal(car);
  };

  const filteredCars = useMemo(() => {
    return allCars.filter(car => {
      const matchesSearch = 
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) || 
        car.model.toLowerCase().includes(searchQuery.toLowerCase());
      
      const profit = calculateProfit(car, exchangeRate);
      if (activeFilter === 'HIGH_YIELD') return matchesSearch && profit.isHighYield;
      if (activeFilter === 'NAFTA') return matchesSearch && car.isNorthAmerican;
      return matchesSearch;
    });
  }, [allCars, searchQuery, activeFilter, exchangeRate]);

  const totalMarketProfit = useMemo(() => {
    return allCars.reduce((acc, car) => acc + calculateProfit(car, exchangeRate).netProfit, 0);
  }, [allCars, exchangeRate]);

  const handleNavLinkClick = (e: React.MouseEvent, section: 'INVENTORY' | 'LOGISTICS' | 'COMPLIANCE' | 'REPORTS') => {
    e.preventDefault();
    setCurrentView(section);
    setActiveFilter('ALL');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'LOGISTICS':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-white text-4xl font-black uppercase tracking-tighter">GTA-US Logistics Command</h2>
                <p className="text-gray-500 text-sm mt-1 font-medium">Real-time status of the Toronto-Miami export corridor.</p>
              </div>
              <div className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-500 text-[11px] font-black uppercase tracking-widest">Border Clear</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: 'Vaughan Secure Point', status: 'Optimal', capacity: '82%', desc: 'Secure high-value vehicle consolidation node.', icon: MapPin, color: 'text-amber-400' },
                { title: 'Detroit Bridge Hub', status: '12m Delay', capacity: 'Normal', desc: 'Customs clearing station for heavy truck transit.', icon: Truck, color: 'text-blue-400' },
                { title: 'Port of Miami Node', status: 'Receiving', capacity: 'High Load', desc: 'Primary secondary market distribution terminal.', icon: Ship, color: 'text-emerald-400' },
              ].map((h, i) => (
                <div key={i} className="glass-card p-10 rounded-[3rem] hover:border-amber-400/30 transition-all group">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${h.color} mb-8 transition-transform group-hover:scale-110`}>
                    <h.icon size={32} />
                  </div>
                  <h3 className="text-white text-2xl font-black mb-2 tracking-tight">{h.title}</h3>
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-6">
                    <span className={h.status.includes('Delay') ? 'text-rose-400' : 'text-emerald-500'}>{h.status}</span>
                    <span className="text-gray-500">{h.capacity}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">{h.desc}</p>
                </div>
              ))}
            </div>

            <div className="glass-card p-12 rounded-[4rem] border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-400/5 to-transparent pointer-events-none" />
              <h3 className="text-white text-xs font-black uppercase tracking-[0.4em] mb-10 text-gray-500">Active Transit manifest</h3>
              <div className="space-y-6">
                {[
                  { id: 'TX-8821', route: 'Vaughan → Miami', carrier: 'TFX International', eta: '36 Hours', status: 'In Transit' },
                  { id: 'TX-9012', route: 'Toronto → NYC', carrier: 'Thorson’s', eta: '14 Hours', status: 'Border Clear' },
                  { id: 'TX-4450', route: 'Oakville → Dallas', carrier: 'Reliable Carriers', eta: '48 Hours', status: 'Loading' }
                ].map((t, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-white/5 rounded-[2rem] border border-white/5 gap-6 hover:bg-white/10 transition-colors cursor-default">
                    <div className="flex items-center gap-8">
                      <div className="text-amber-400 font-mono text-xs bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/20">{t.id}</div>
                      <div>
                        <p className="text-white text-lg font-black uppercase tracking-tight">{t.route}</p>
                        <p className="text-gray-500 text-[11px] uppercase font-black tracking-widest mt-1">{t.carrier}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-12">
                      <div className="text-right">
                        <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">ETA Window</p>
                        <p className="text-white text-base font-mono font-bold">{t.eta}</p>
                      </div>
                      <span className="bg-white/10 text-white text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-widest border border-white/10">{t.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'COMPLIANCE':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <h2 className="text-white text-4xl font-black uppercase tracking-tighter">Regulatory & Audit Desk</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 glass-card p-14 rounded-[4rem] space-y-12">
                <div className="flex items-center gap-8 p-10 bg-blue-500/5 border border-blue-500/20 rounded-[3rem]">
                  <div className="w-16 h-16 rounded-3xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <ShieldCheck size={48} />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-tight text-2xl">USMCA Eligibility Rule 4.1 Verified</h4>
                    <p className="text-gray-400 text-base leading-relaxed mt-2">Real-time verification of Regional Value Content (RVC) thresholds (62.5%) for 2026-compliance export cycles.</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <h3 className="text-white text-[11px] font-black uppercase tracking-[0.4em] text-gray-500 px-2">Compliance Nodes</h3>
                  {[
                    { label: 'OMVIC Dealer License Registry', status: 'Authenticated', date: '2025-05-14' },
                    { label: 'CBP Form 7501 Automation Node', status: 'Ready', date: '2025-05-15' },
                    { label: 'Ontario UVIP Data Verification', status: 'Nominal', date: '2025-05-15' },
                    { label: 'EPA/DOT Standards Validation', status: 'Active', date: '2025-05-15' }
                  ].map((c, i) => (
                    <div key={i} className="flex justify-between items-center p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all">
                      <div className="flex items-center gap-6">
                        <CheckCircle2 className="text-emerald-500" size={24} />
                        <div>
                          <p className="text-white text-base font-black uppercase tracking-tight">{c.label}</p>
                          <p className="text-gray-500 text-[11px] font-mono mt-1">LAST AUDIT: {c.date}</p>
                        </div>
                      </div>
                      <span className="text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 bg-black/40 rounded-xl border border-white/10">{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-8">
                <div className="glass-card p-10 rounded-[3rem] bg-amber-400/5 border-amber-400/20">
                  <AlertCircle className="text-amber-400 mb-8" size={40} />
                  <h3 className="text-white text-2xl font-black mb-6 tracking-tight">Risk Monitoring</h3>
                  <div className="space-y-8">
                    <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-3">Border Enforcement Level</p>
                      <div className="flex items-center gap-6">
                        <div className="flex-1 bg-white/10 h-3 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[25%] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        </div>
                        <span className="text-emerald-500 text-sm font-black tracking-widest">LOW</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed italic font-medium">
                      "Market signals indicate no impending regulatory shifts at the Buffalo-Fort Erie corridor. Export corridor capacity remains at 100% efficiency."
                    </p>
                  </div>
                </div>
                <button className="w-full py-6 bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-[2rem] hover:bg-amber-400 transition-all active:scale-95 shadow-2xl">
                  Download Audit Pack
                </button>
              </div>
            </div>
          </div>
        );
      case 'REPORTS':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-4xl font-black uppercase tracking-tighter">Market Arbitrage Analytics</h2>
              <div className="flex gap-4">
                <button className="p-4 bg-white/5 rounded-2xl text-white hover:bg-white/10 transition-all border border-white/5"><BarChart3 size={24}/></button>
                <button className="p-4 bg-white/5 rounded-2xl text-white hover:bg-white/10 transition-all border border-white/5"><FileText size={24}/></button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Avg Arbitrage Yield', value: '18.2%', icon: TrendingUp, color: 'text-emerald-400' },
                { label: 'GTA Luxury Volume', value: '$1.4B', icon: Landmark, color: 'text-blue-400' },
                { label: 'Resale Velocity', value: '8.4d', icon: Clock, color: 'text-amber-400' },
                { label: 'Export Success Rate', value: '99.8%', icon: ShieldCheck, color: 'text-emerald-500' }
              ].map((s, i) => (
                <div key={i} className="glass-card p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className={`p-3 rounded-xl bg-white/5 ${s.color}`}>
                      <s.icon size={24} />
                    </div>
                    <span className="text-emerald-500 text-[11px] font-black bg-emerald-500/10 px-2 py-1 rounded-lg">+2.4%</span>
                  </div>
                  <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.2em] mb-2 relative z-10">{s.label}</p>
                  <p className="text-white text-4xl font-black tracking-tighter relative z-10">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="glass-card p-20 rounded-[5rem] border-white/5 text-center flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05),transparent_70%)]" />
              <div className="w-24 h-24 rounded-[2rem] bg-amber-400/10 flex items-center justify-center text-amber-400 mb-10 animate-pulse border border-amber-400/20 group-hover:scale-110 transition-transform">
                <TrendingUp size={48} />
              </div>
              <h3 className="text-white text-4xl font-black uppercase tracking-tighter mb-6">Predictive Profit Modeler</h3>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed font-medium">
                Analyzing real-time US listing velocity from MarketCheck vs Ontario-specific UVIP data. Our neural engine is optimizing the next 30-day arbitrage window for the Porsche 911 segment.
              </p>
              <div className="mt-12 flex gap-4">
                {[0,1,2].map(i => <div key={i} className="w-3 h-3 rounded-full bg-amber-400 animate-bounce shadow-[0_0_15px_rgba(251,191,36,0.5)]" style={{animationDelay: `${i*0.2}s`}} />)}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex flex-col md:flex-row gap-8 justify-between items-center bg-slate-900/40 p-6 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-xl">
              <div className="relative w-full md:w-[450px]">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="text" 
                  placeholder="Scan Market (Make, Model, VIN)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white text-base focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-gray-600 shadow-inner font-medium"
                />
              </div>
              
              <div className="flex items-center gap-3 p-2 bg-black/40 rounded-[2rem] border border-white/5">
                {['ALL', 'HIGH_YIELD', 'NAFTA'].map((f) => (
                  <button 
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer active:scale-95 ${activeFilter === f ? 'bg-white text-black shadow-2xl' : 'text-gray-500 hover:text-white'}`}
                  >
                    {f.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredCars.map(car => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  exchangeRate={exchangeRate}
                  onAction={handleStartDeal}
                  onChat={(c) => setSelectedCarForChat(c)}
                  onFilterSelect={(f) => setActiveFilter(f)}
                />
              ))}
            </div>

            <div className="bg-gradient-to-br from-amber-400/20 via-slate-900/40 to-transparent p-20 rounded-[5rem] border border-amber-400/20 flex flex-col md:flex-row items-center justify-between gap-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden group">
              <div className="max-w-2xl relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-amber-400 text-xs font-black uppercase tracking-[0.4em]">Live Intelligence Signal</span>
                </div>
                <h2 className="text-white text-6xl font-black mb-8 uppercase tracking-tighter leading-[0.9] group-hover:scale-[1.02] transition-transform duration-1000">Market Pulse Activated</h2>
                <p className="text-gray-300 text-xl leading-relaxed mb-12 font-medium italic opacity-80">
                  "Exotic Intel's neural recon engine predicts a 4.2% demand surge for USMCA-native inventory in the South-East US corridor. Toronto supply currently lags this trend by 11 days."
                </p>
                <button className="bg-amber-400 text-black font-black px-16 py-6 rounded-[2rem] hover:bg-amber-300 transition-all flex items-center gap-6 shadow-[0_20px_40px_-10px_rgba(251,191,36,0.4)] active:scale-95 text-sm uppercase tracking-widest">
                  EXECUTE FULL SCAN
                  <ArrowUpRight size={24} />
                </button>
              </div>
              <div className="hidden xl:block relative z-10 pointer-events-none">
                 <Globe2 size={300} className="text-amber-400/20 animate-pulse duration-[4000ms]" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1f26] selection:bg-amber-400 selection:text-black flex flex-col transition-colors duration-500">
      <MoneyTicker totalProfit={totalMarketProfit} exchangeRate={exchangeRate} location={userHub} />

      <nav className="w-full bg-[#1c1f26]/95 border-b border-white/5 sticky top-[44px] z-[100] shadow-2xl backdrop-blur-xl">
        <div className="max-w-[1700px] mx-auto px-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-16">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={(e) => handleNavLinkClick(e, 'INVENTORY')}>
              <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-[10deg] transition-all duration-500">
                <Gem size={26} className="text-black" />
              </div>
              <h1 className="text-white text-2xl font-black tracking-tighter uppercase group-hover:text-amber-400 transition-colors">Exotic Intel</h1>
            </div>
            
            <div className="hidden lg:flex items-center gap-12 text-[12px] font-black uppercase tracking-[0.3em] text-gray-500">
              {['INVENTORY', 'LOGISTICS', 'COMPLIANCE', 'REPORTS'].map((v) => (
                <a 
                  key={v}
                  href="#" 
                  onClick={(e) => handleNavLinkClick(e, v as any)} 
                  className={`transition-all py-2 border-b-2 font-black ${currentView === v ? 'text-white border-amber-400' : 'border-transparent hover:text-white'}`}
                >
                  {v}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
              <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">SaaS Active</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center cursor-pointer hover:border-amber-400/50 transition-all shadow-xl group">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse group-hover:scale-125 transition-transform" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1700px] mx-auto px-10 py-20 w-full flex-grow">
        <div className="grid grid-cols-12 gap-16">
          <div className="col-span-12 lg:col-span-9">
            {renderView()}
          </div>
          <aside className="hidden lg:block lg:col-span-3 space-y-10 sticky top-[160px] h-fit">
            <MarketPulse />
            <div className="glass-card rounded-[3rem] p-10 border-white/5 space-y-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4 text-gray-300 relative z-10">
                <BarChart3 size={20} className="text-amber-400" />
                <h4 className="text-[12px] font-black uppercase tracking-[0.2em]">Global Yield Index</h4>
              </div>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-end border-b border-white/5 pb-6">
                  <div>
                    <p className="text-white text-4xl font-black tracking-tighter">$2.4m</p>
                    <p className="text-gray-500 text-[11px] font-black uppercase tracking-widest mt-2">Ready Capital</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 text-base font-black">+18.4%</p>
                    <p className="text-gray-600 text-[10px] font-black">7-Day Delta</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[11px] font-black uppercase tracking-widest">Neural Integrity</span>
                  <span className="text-emerald-500 text-[11px] font-black bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">OPTIMAL</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer 
        onShowLegal={(title, content) => setLegalModal({title, content})}
        onContactSupport={() => alert('Toronto Broker Desk: Initializing live neural connection...')}
      />

      {/* Floating AI Concierge Chat */}
      <div className="fixed bottom-8 right-8 z-[150] group">
        <div className="absolute -top-12 right-0 bg-white text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl flex items-center gap-2">
          <Sparkles size={12} className="text-amber-500" />
          Neural Concierge Online
        </div>
        <button 
          onClick={() => setSelectedCarForChat(allCars[0])}
          className="w-16 h-16 bg-amber-400 rounded-[1.5rem] flex items-center justify-center text-black shadow-[0_20px_50px_rgba(251,184,0,0.4)] chat-pulse hover:scale-110 hover:rotate-[10deg] active:scale-95 transition-all"
        >
          <MessageSquareText size={32} />
        </button>
      </div>

      {legalModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/98 backdrop-blur-2xl">
          <div className="w-full max-w-xl glass-card rounded-[4rem] p-12 border border-white/20 shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button onClick={() => setLegalModal(null)} className="absolute top-8 right-8 text-gray-500 hover:text-white p-2 transition-colors">
              <X size={28} />
            </button>
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-[1.5rem] bg-amber-400/10 flex items-center justify-center border border-amber-400/20">
                <ShieldAlert size={32} className="text-amber-400" />
              </div>
              <h2 className="text-white text-3xl font-black uppercase tracking-tighter">{legalModal.title}</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed font-medium mb-12">{legalModal.content}</p>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 mb-10">
              <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest mb-2">Protocol Authorization Code</p>
              <p className="text-amber-400 font-mono text-base font-black tracking-widest">TOR-GTA-CERT-2025-V4-NODE9</p>
            </div>
            <button 
              onClick={() => setLegalModal(null)}
              className="w-full bg-white text-black font-black uppercase tracking-[0.3em] py-5 rounded-[2rem] hover:bg-amber-400 transition-all active:scale-95 shadow-2xl text-xs"
            >
              System Authorization Confirmed
            </button>
          </div>
        </div>
      )}

      {selectedCarForDeal && (
        <NegotiationAssistant 
          car={selectedCarForDeal} 
          profit={calculateProfit(selectedCarForDeal, exchangeRate)} 
          onClose={() => setSelectedCarForDeal(null)} 
        />
      )}

      <AssistantModal car={selectedCarForChat} onClose={() => setSelectedCarForChat(null)} />
    </div>
  );
};

export default App;
