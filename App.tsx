
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_CARS } from './constants';
import { MoneyTicker } from './components/MoneyTicker';
import { CarCard } from './components/CarCard';
import { AssistantModal } from './components/AssistantModal';
import { MarketPulse } from './components/MarketPulse';
import { Footer } from './components/Footer';
import { calculateProfit } from './utils';
import { Car } from './types';
import { 
  LayoutGrid, BarChart3, Globe2, Gem, Search, Filter, 
  ArrowUpRight, X, ShieldAlert, Truck, ShieldCheck, 
  MapPin, Clock, FileText, CheckCircle2, TrendingUp,
  Activity, Zap
} from 'lucide-react';

const App: React.FC = () => {
  const [selectedCarForChat, setSelectedCarForChat] = useState<Car | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [exchangeRate, setExchangeRate] = useState(0.737);
  const [legalModal, setLegalModal] = useState<{title: string, content: string} | null>(null);
  const [currentView, setCurrentView] = useState<'INVENTORY' | 'LOGISTICS' | 'COMPLIANCE' | 'REPORTS'>('INVENTORY');

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/CAD');
        const data = await response.json();
        if (data && data.rates && data.rates.USD) {
          setExchangeRate(data.rates.USD);
        }
      } catch (error) {
        console.error('Exotic Intel: Failed to fetch live exchange rate.', error);
      }
    };

    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter(car => {
      const matchesSearch = 
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) || 
        car.model.toLowerCase().includes(searchQuery.toLowerCase());
      
      const profit = calculateProfit(car, exchangeRate);
      if (activeFilter === 'HIGH_YIELD') return matchesSearch && profit.isHighYield;
      if (activeFilter === 'NAFTA') return matchesSearch && car.isNorthAmerican;
      return matchesSearch;
    });
  }, [searchQuery, activeFilter, exchangeRate]);

  const totalMarketProfit = useMemo(() => {
    return MOCK_CARS.reduce((acc, car) => acc + calculateProfit(car, exchangeRate).netProfit, 0);
  }, [exchangeRate]);

  const handleStartDeal = (car: Car) => {
    alert(`Initializing Smart-Contract Import for ${car.make} ${car.model}...\nOur Toronto agents will contact you within 60 minutes.`);
  };

  const handleNavLinkClick = (e: React.MouseEvent, section: any) => {
    e.preventDefault();
    setCurrentView(section);
    setActiveFilter('ALL');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterRequest = (filter: string) => {
    setActiveFilter(filter);
    setCurrentView('INVENTORY');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Logic for different views
  const renderView = () => {
    switch (currentView) {
      case 'LOGISTICS':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-3xl font-black uppercase tracking-tighter">GTA-US Logistics Command</h2>
              <div className="flex gap-2">
                <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">All Routes Active</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Vaughan Secure Point', status: 'Active', load: '42%', desc: 'Primary consolidation node for luxury SUVs and Pickups.', icon: MapPin },
                { title: 'Ambassador Bridge Crossing', status: 'Normal', load: '12m Wait', desc: 'Real-time clearing at Detroit-Windsor border.', icon: Truck },
                { title: 'Port of Miami Node', status: 'Receiving', load: 'High Demand', desc: 'Final distribution point for Florida-market arbitrage.', icon: Globe2 },
              ].map((h, i) => (
                <div key={i} className="glass-card p-8 rounded-[2.5rem] border-white/5 hover:border-amber-400/30 transition-all group">
                   <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-amber-400 mb-6 group-hover:bg-amber-400 group-hover:text-black transition-all">
                     <h.icon size={24} />
                   </div>
                   <h3 className="text-white text-xl font-bold mb-2">{h.title}</h3>
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-4">
                     <span className="text-emerald-500">{h.status}</span>
                     <span className="text-gray-500">{h.load}</span>
                   </div>
                   <p className="text-gray-400 text-sm leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
            <div className="glass-card p-10 rounded-[3rem] border-white/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-amber-400/5 to-transparent pointer-events-none" />
               <h3 className="text-white text-xl font-black uppercase tracking-widest mb-6">Transit Schedule Intelligence</h3>
               <div className="space-y-4">
                 {[
                   { route: 'GTA-Detroit-Miami', eta: '48h', status: 'On Track', id: 'LOG-772' },
                   { route: 'GTA-Buffalo-NYC', eta: '12h', status: 'Priority', id: 'LOG-441' },
                   { route: 'Vaughan Distribution-Montreal', eta: '6h', status: 'Clear', id: 'LOG-902' }
                 ].map((r, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                     <div className="flex items-center gap-4">
                       <div className="text-amber-400 font-mono text-xs">{r.id}</div>
                       <div className="text-white text-sm font-bold">{r.route}</div>
                     </div>
                     <div className="flex items-center gap-6">
                       <span className="text-gray-500 text-xs font-mono">{r.eta}</span>
                       <span className="text-emerald-500 text-[10px] font-black uppercase">{r.status}</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        );
      case 'COMPLIANCE':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-white text-3xl font-black uppercase tracking-tighter">CMA Regulatory & Audit Desk</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 glass-card p-10 rounded-[3rem] space-y-8">
                  <div className="flex items-center gap-4 p-6 bg-blue-500/5 border border-blue-500/20 rounded-3xl">
                    <ShieldCheck className="text-blue-400" size={32} />
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-tight">USMCA Eligibility Rule 4.1</h4>
                      <p className="text-gray-400 text-sm">Real-time verification of Regional Value Content (RVC) requirements (62.5% Threshold).</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-white text-xs font-black uppercase tracking-widest text-gray-500">Active Compliance Checks</h3>
                    {[
                      { label: 'OMVIC License Status (Active)', code: 'LIC-2025-V4', status: 'Verified' },
                      { label: 'CBP Form 7501 Automation', code: 'CBP-EN-882', status: 'Ready' },
                      { label: 'EPA/DOT Standards Audit', code: 'AUD-VIN-99', status: 'Nominal' }
                    ].map((c, i) => (
                      <div key={i} className="flex justify-between items-center pb-4 border-b border-white/5">
                        <div>
                          <p className="text-white text-sm font-bold">{c.label}</p>
                          <p className="text-gray-600 font-mono text-[10px] uppercase mt-1">ID: {c.code}</p>
                        </div>
                        <CheckCircle2 className="text-emerald-500" size={20} />
                      </div>
                    ))}
                  </div>
               </div>
               <div className="glass-card p-8 rounded-[2.5rem] bg-rose-500/5 border-rose-500/20">
                  <h3 className="text-rose-400 text-xs font-black uppercase tracking-[0.2em] mb-4">Risk Mitigation Pulse</h3>
                  <div className="space-y-8">
                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                      <p className="text-white text-xs font-bold mb-1">CBP Enforcement Level</p>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full w-[15%]" />
                      </div>
                      <p className="text-gray-600 text-[9px] mt-2 uppercase">Current: Low Alert (Nominal)</p>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed italic">
                      "Brokerage activity in the GTA is currently under standard monitoring. No major export delays reported at the Port of Buffalo."
                    </p>
                    <button className="w-full py-4 rounded-xl bg-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                      Download Compliance Logs
                    </button>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'REPORTS':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center">
               <h2 className="text-white text-3xl font-black uppercase tracking-tighter">Global Arbitrage Analytics</h2>
               <div className="flex gap-4">
                 <button className="px-4 py-2 rounded-lg bg-white text-black text-[10px] font-black uppercase">Export Q3 Data</button>
                 <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase hover:bg-white/10">Full Audit</button>
               </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Avg Arbitrage Spread', value: '14.2%', trend: '+2.1%', color: 'text-emerald-400' },
                  { label: 'GTA Inventory Vol', value: '$840M', trend: '-4.8%', color: 'text-rose-400' },
                  { label: 'US Demand Pulse', value: '9.8', trend: 'Peak', color: 'text-amber-400' },
                  { label: 'Logistics Efficiency', value: '96%', trend: 'Optimum', color: 'text-blue-400' }
                ].map((s, i) => (
                  <div key={i} className="glass-card p-6 rounded-3xl border-white/5">
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">{s.label}</p>
                    <div className="flex justify-between items-end">
                      <p className="text-white text-2xl font-black">{s.value}</p>
                      <span className={`${s.color} text-[10px] font-black uppercase`}>{s.trend}</span>
                    </div>
                  </div>
                ))}
             </div>
             <div className="glass-card p-12 rounded-[4rem] border-white/5 h-96 flex flex-col justify-center items-center text-center space-y-6">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-amber-400 animate-pulse">
                  <TrendingUp size={32} />
                </div>
                <div>
                  <h3 className="text-white text-2xl font-black uppercase tracking-tighter">Profit Prediction Engine</h3>
                  <p className="text-gray-400 text-sm max-w-md mx-auto mt-2">Dynamic visualization of CAD/USD spread vs historical resale data for the Toronto Luxury SUV segment. (Real-time data visualization currently loading...)</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.1s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.2s]" />
                </div>
             </div>
          </div>
        );
      default:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Inventory View (Existing Grid Logic) */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-black/20 p-5 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Scan Intelligence (Make, Model, VIN)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-gray-600 shadow-inner"
                />
              </div>
              
              <div className="flex items-center gap-2 p-1.5 bg-black/40 rounded-[1.5rem] border border-white/5">
                <button 
                  onClick={() => setActiveFilter('ALL')}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer active:scale-95 ${activeFilter === 'ALL' ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
                >
                  Global Feed
                </button>
                <button 
                  onClick={() => setActiveFilter('HIGH_YIELD')}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer active:scale-95 ${activeFilter === 'HIGH_YIELD' ? 'bg-amber-400 text-black shadow-xl shadow-amber-400/10' : 'text-gray-500 hover:text-white'}`}
                >
                  High Yield
                </button>
                <button 
                  onClick={() => setActiveFilter('NAFTA')}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer active:scale-95 ${activeFilter === 'NAFTA' ? 'bg-blue-500 text-white shadow-xl shadow-blue-500/10' : 'text-gray-500 hover:text-white'}`}
                >
                  USMCA Native
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredCars.length > 0 ? (
                filteredCars.map(car => (
                  <CarCard 
                    key={car.id} 
                    car={car} 
                    exchangeRate={exchangeRate}
                    onAction={handleStartDeal}
                    onChat={(c) => setSelectedCarForChat(c)}
                    onFilterSelect={handleFilterRequest}
                  />
                ))
              ) : (
                <div className="col-span-full py-40 text-center space-y-8">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-700 shadow-inner ring-1 ring-white/10">
                    <Filter size={48} className="opacity-50" />
                  </div>
                  <div>
                    <h3 className="text-white text-2xl font-black uppercase tracking-tighter">No Arbitrage Opportunities</h3>
                    <p className="text-gray-500 text-sm font-medium mt-2 max-w-md mx-auto">Your current intelligence filters yield zero matches. Broaden your search parameters or check the global feed.</p>
                  </div>
                  <button 
                    onClick={() => { setActiveFilter('ALL'); setSearchQuery(''); }} 
                    className="bg-white/10 text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white hover:text-black transition-all active:scale-95"
                  >
                    Reset System Parameters
                  </button>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-amber-400/15 via-transparent to-transparent p-16 rounded-[4rem] border border-amber-400/10 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="max-w-xl relative z-10">
                <h2 className="text-white text-4xl font-black mb-6 uppercase tracking-tighter leading-none">Market Signal Active</h2>
                <p className="text-gray-300 text-base leading-relaxed mb-10 font-medium italic">
                  "Exotic Intel's neural engine predicts a 2.4% increase in Miami luxury demand over the next 14 days. Toronto inventory is currently undervalued relative to this peak."
                </p>
                <button 
                  onClick={() => alert("Initiating Full System Arbitrage Scan... Please wait for Broker Verification.")}
                  className="bg-amber-400 text-black font-black px-12 py-5 rounded-2xl hover:bg-amber-300 transition-all flex items-center gap-4 shadow-2xl shadow-amber-400/20 active:scale-95"
                >
                  EXECUTE SYSTEM SCAN
                  <ArrowUpRight size={22} />
                </button>
              </div>
              <div className="hidden xl:block relative z-10 cursor-pointer" onClick={() => alert('Global Arbitrage Map: Toronto-Miami corridor active.')}>
                 <Globe2 size={200} className="text-amber-400/30 animate-pulse hover:text-amber-400 transition-colors" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pb-0 selection:bg-amber-400 selection:text-black bg-[#252932]">
      {/* Highest priority sticky Ticker */}
      <MoneyTicker totalProfit={totalMarketProfit} exchangeRate={exchangeRate} />

      {/* Navigation Header - Enhanced opacity/z-index to prevent overlapping clutter */}
      <nav className="max-w-[1600px] mx-auto px-8 py-5 flex items-center justify-between border-b border-white/5 bg-[#252932] sticky top-[41px] z-[60] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={(e) => handleNavLinkClick(e, 'INVENTORY')}>
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Gem size={22} className="text-black" />
            </div>
            <h1 className="text-white text-xl font-black tracking-tighter uppercase group-hover:text-amber-400 transition-colors">Exotic Intel</h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'INVENTORY')} className={`transition-all py-2 border-b-2 ${currentView === 'INVENTORY' ? 'text-white border-amber-400' : 'border-transparent hover:text-white'}`}>Inventory</a>
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'LOGISTICS')} className={`transition-all py-2 border-b-2 ${currentView === 'LOGISTICS' ? 'text-white border-amber-400' : 'border-transparent hover:text-white'}`}>Logistics</a>
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'COMPLIANCE')} className={`transition-all py-2 border-b-2 ${currentView === 'COMPLIANCE' ? 'text-white border-amber-400' : 'border-transparent hover:text-white'}`}>Compliance</a>
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'REPORTS')} className={`transition-all py-2 border-b-2 ${currentView === 'REPORTS' ? 'text-white border-amber-400' : 'border-transparent hover:text-white'}`}>Reports</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 cursor-pointer" onClick={() => alert('Regional Hub Status: ONLINE and SECURE.')}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Vaughan Hub Active</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-600 border border-white/10 shadow-lg cursor-pointer hover:border-amber-400/50 transition-all flex items-center justify-center active:scale-95">
             <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-8 py-12 min-h-[70vh]">
        <div className="grid grid-cols-12 gap-12">
          
          {/* Main Dashboard - Left 9 Cols */}
          <div className="col-span-12 lg:col-span-9">
            {renderView()}
          </div>

          {/* Right Sidebar - 3 Cols */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 h-fit sticky top-44">
            <MarketPulse />
            
            {/* Mini Summary Stats */}
            <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6 shadow-2xl ring-1 ring-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <BarChart3 size={16} />
                </div>
                <h4 className="text-gray-300 text-[11px] font-black uppercase tracking-[0.2em]">Live Analytics</h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div>
                    <p className="text-white text-3xl font-black tracking-tighter">$2.4m</p>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Available Liquidity</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 text-sm font-black">+18.4%</p>
                    <p className="text-gray-600 text-[9px] font-bold uppercase">Weekly Trend</p>
                  </div>
                </div>
                <div className="flex justify-between items-center cursor-pointer group" onClick={() => alert('System integrity check: 100% compliant.')}>
                  <span className="text-gray-500 text-[10px] font-bold uppercase group-hover:text-white transition-colors">System Integrity</span>
                  <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">Nominal</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer 
        onShowLegal={(title, content) => setLegalModal({title, content})}
        onContactSupport={() => alert('Connecting to Toronto Support Desk... Live Chat initialized.')}
      />

      {/* Legal Modal Implementation */}
      {legalModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl">
          <div className="w-full max-w-lg glass-card rounded-[3rem] p-10 border border-white/20 shadow-2xl relative">
            <button 
              onClick={() => setLegalModal(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center">
                <ShieldAlert size={24} className="text-amber-400" />
              </div>
              <h2 className="text-white text-2xl font-black uppercase tracking-tighter">{legalModal.title}</h2>
            </div>
            <div className="space-y-6">
              <p className="text-gray-300 text-base leading-relaxed font-medium">{legalModal.content}</p>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Broker Certification Code</p>
                <p className="text-amber-400 font-mono text-sm">TOR-GTA-CERT-2025-V4</p>
              </div>
            </div>
            <button 
              onClick={() => setLegalModal(null)}
              className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-2xl mt-8 hover:bg-amber-400 transition-all active:scale-95"
            >
              Acknowledged
            </button>
          </div>
        </div>
      )}

      <AssistantModal 
        car={selectedCarForChat} 
        onClose={() => setSelectedCarForChat(null)} 
      />
    </div>
  );
};

export default App;
