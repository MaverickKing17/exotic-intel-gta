
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
  Globe2, Gem, Search, Filter, ArrowUpRight, X, ShieldAlert, 
  Truck, ShieldCheck, MapPin, FileText, CheckCircle2, 
  TrendingUp, BarChart3, AlertCircle, Ship, Landmark,
  Clock // Added missing Clock import
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
        console.error('Exotic Intel: Live exchange rate fetch failed.', error);
      }
    };
    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Added handleStartDeal function to fix "Cannot find name 'handleStartDeal'" error
  const handleStartDeal = (car: Car) => {
    alert(`Initializing Deal Protocol for ${car.historyId} (${car.make} ${car.model}). Redirecting to secure transaction node...`);
  };

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
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-white text-4xl font-black uppercase tracking-tighter">GTA-US Logistics Command</h2>
                <p className="text-gray-500 text-sm mt-1 font-medium">Real-time status of the Toronto-Miami export corridor.</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Border Clear</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Vaughan Secure Point', status: 'Optimal', capacity: '82%', desc: 'Secure high-value vehicle consolidation node.', icon: MapPin, color: 'text-amber-400' },
                { title: 'Detroit Bridge Hub', status: '12m Delay', capacity: 'Normal', desc: 'Customs clearing station for heavy truck transit.', icon: Truck, color: 'text-blue-400' },
                { title: 'Port of Miami Node', status: 'Receiving', capacity: 'High Load', desc: 'Primary secondary market distribution terminal.', icon: Ship, color: 'text-emerald-400' },
              ].map((h, i) => (
                <div key={i} className="glass-card p-8 rounded-[2.5rem] hover:border-amber-400/30 transition-all">
                  <h.icon size={32} className={`${h.color} mb-6`} />
                  <h3 className="text-white text-xl font-bold mb-1">{h.title}</h3>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-4">
                    <span className={h.status.includes('Delay') ? 'text-rose-400' : 'text-emerald-500'}>{h.status}</span>
                    <span className="text-gray-500">{h.capacity}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>

            <div className="glass-card p-10 rounded-[3rem] border-white/10">
              <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8 text-gray-500">Active Transit manifest</h3>
              <div className="space-y-4">
                {[
                  { id: 'TX-8821', route: 'Vaughan → Miami', carrier: 'TFX International', eta: '36 Hours', status: 'In Transit' },
                  { id: 'TX-9012', route: 'Toronto → NYC', carrier: 'Thorson’s', eta: '14 Hours', status: 'Border Clear' },
                  { id: 'TX-4450', route: 'Oakville → Dallas', carrier: 'Reliable Carriers', eta: '48 Hours', status: 'Loading' }
                ].map((t, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 gap-4">
                    <div className="flex items-center gap-6">
                      <div className="text-amber-400 font-mono text-xs">{t.id}</div>
                      <div>
                        <p className="text-white text-sm font-bold uppercase">{t.route}</p>
                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{t.carrier}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-10">
                      <div className="text-right">
                        <p className="text-gray-500 text-[10px] uppercase font-bold">ETA</p>
                        <p className="text-white text-sm font-mono">{t.eta}</p>
                      </div>
                      <span className="bg-white/10 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{t.status}</span>
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
            <h2 className="text-white text-4xl font-black uppercase tracking-tighter">Regulatory & Audit Desk</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 glass-card p-10 rounded-[3rem] space-y-10">
                <div className="flex items-center gap-5 p-8 bg-blue-500/5 border border-blue-500/20 rounded-[2.5rem]">
                  <ShieldCheck className="text-blue-400" size={40} />
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-tight text-lg">USMCA Eligibility Rule 4.1 Verified</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">System-wide verification of Regional Value Content (RVC) thresholds (62.5%) across all Toronto inventory.</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Compliance Checklists</h3>
                  {[
                    { label: 'OMVIC Dealer License Registry', status: 'Authenticated', date: '2025-05-14' },
                    { label: 'CBP Form 7501 Automation Node', status: 'Ready', date: '2025-05-15' },
                    { label: 'Ontario UVIP Data Verification', status: 'Nominal', date: '2025-05-15' },
                    { label: 'EPA/DOT Standards Validation', status: 'Active', date: '2025-05-15' }
                  ].map((c, i) => (
                    <div key={i} className="flex justify-between items-center pb-6 border-b border-white/5">
                      <div className="flex items-center gap-4">
                        <CheckCircle2 className="text-emerald-500" size={20} />
                        <div>
                          <p className="text-white text-sm font-bold uppercase">{c.label}</p>
                          <p className="text-gray-500 text-[10px] font-mono">LAST AUDIT: {c.date}</p>
                        </div>
                      </div>
                      <span className="text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-md border border-white/5">{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-card p-8 rounded-[3rem] bg-amber-400/5 border-amber-400/20 flex flex-col">
                <AlertCircle className="text-amber-400 mb-6" size={32} />
                <h3 className="text-white text-lg font-bold mb-4">Risk Monitoring</h3>
                <div className="space-y-6 flex-1">
                  <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Border Enforcement Level</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[25%]" />
                      </div>
                      <span className="text-emerald-500 text-xs font-black">LOW</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed italic">
                    "Current monitoring levels at the Buffalo-Fort Erie corridor are normal. No USMCA trade policy shifts detected in the last 24-hour cycle."
                  </p>
                </div>
                <button className="w-full mt-10 py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-amber-400 transition-all active:scale-95 shadow-xl">
                  Download Audit Pack
                </button>
              </div>
            </div>
          </div>
        );
      case 'REPORTS':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-4xl font-black uppercase tracking-tighter">Market Arbitrage Analytics</h2>
              <div className="flex gap-2">
                <button className="p-3 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-all"><BarChart3 size={20}/></button>
                <button className="p-3 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-all"><FileText size={20}/></button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Avg Arbitrage Yield', value: '18.2%', icon: TrendingUp, color: 'text-emerald-400' },
                { label: 'GTA Luxury Volume', value: '$1.4B', icon: Landmark, color: 'text-blue-400' },
                { label: 'Resale Velocity', value: '8.4d', icon: Clock, color: 'text-amber-400' },
                { label: 'Export Success Rate', value: '99.8%', icon: ShieldCheck, color: 'text-emerald-500' }
              ].map((s, i) => (
                <div key={i} className="glass-card p-6 rounded-3xl border-white/5">
                  <div className="flex justify-between items-start mb-4">
                    <s.icon size={20} className={s.color} />
                    <span className="text-emerald-500 text-[10px] font-black">+2.4%</span>
                  </div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-white text-3xl font-black tracking-tighter">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="glass-card p-12 rounded-[4rem] border-white/5 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 mb-8 animate-pulse">
                <TrendingUp size={40} />
              </div>
              <h3 className="text-white text-3xl font-black uppercase tracking-tighter mb-4">Predictive Profit Modeler</h3>
              <p className="text-gray-400 text-base max-w-xl leading-relaxed">
                Analyzing real-time auction data from Mississauga and Florida-based resale listings. Our neural engine is currently modeling the next 30-day arbitrage window for the Porsche 911 segment.
              </p>
              <div className="mt-10 flex gap-2">
                {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{animationDelay: `${i*0.2}s`}} />)}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer ${activeFilter === 'ALL' ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
                >
                  Global Feed
                </button>
                <button 
                  onClick={() => setActiveFilter('HIGH_YIELD')}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer ${activeFilter === 'HIGH_YIELD' ? 'bg-amber-400 text-black shadow-xl shadow-amber-400/10' : 'text-gray-500 hover:text-white'}`}
                >
                  High Yield
                </button>
                <button 
                  onClick={() => setActiveFilter('NAFTA')}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer ${activeFilter === 'NAFTA' ? 'bg-blue-500 text-white shadow-xl shadow-blue-500/10' : 'text-gray-500 hover:text-white'}`}
                >
                  USMCA
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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

            <div className="bg-gradient-to-br from-amber-400/15 via-transparent to-transparent p-16 rounded-[4rem] border border-amber-400/10 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
              <div className="max-w-xl relative z-10">
                <h2 className="text-white text-4xl font-black mb-6 uppercase tracking-tighter leading-none">Market Signal Active</h2>
                <p className="text-gray-300 text-base leading-relaxed mb-10 font-medium italic">
                  "Exotic Intel's neural engine predicts a 2.4% increase in Miami luxury demand over the next 14 days. Toronto inventory is currently undervalued relative to this peak."
                </p>
                <button className="bg-amber-400 text-black font-black px-12 py-5 rounded-2xl hover:bg-amber-300 transition-all flex items-center gap-4 shadow-2xl shadow-amber-400/20 active:scale-95">
                  EXECUTE SYSTEM SCAN
                  <ArrowUpRight size={22} />
                </button>
              </div>
              <div className="hidden xl:block relative z-10">
                 <Globe2 size={200} className="text-amber-400/30 animate-pulse" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1d23] selection:bg-amber-400 selection:text-black flex flex-col">
      <MoneyTicker totalProfit={totalMarketProfit} exchangeRate={exchangeRate} />

      {/* Navigation Header - Enhanced opacity and Z-index to block overlap */}
      <nav className="w-full bg-[#1a1d23]/98 border-b border-white/5 sticky top-[41px] z-[100] shadow-2xl backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={(e) => handleNavLinkClick(e, 'INVENTORY')}>
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Gem size={22} className="text-black" />
              </div>
              <h1 className="text-white text-xl font-black tracking-tighter uppercase">Exotic Intel</h1>
            </div>
            
            <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
              <a href="#" onClick={(e) => handleNavLinkClick(e, 'INVENTORY')} className={`transition-all py-2 border-b-2 ${currentView === 'INVENTORY' ? 'text-white border-amber-400' : 'border-transparent hover:text-white'}`}>Inventory</a>
              <a href="#" onClick={(e) => handleNavLinkClick(e, 'LOGISTICS')} className={`transition-all py-2 border-b-2 ${currentView === 'LOGISTICS' ? 'text-white border-amber-400' : 'border-transparent hover:text-white'}`}>Logistics</a>
              <a href="#" onClick={(e) => handleNavLinkClick(e, 'COMPLIANCE')} className={`transition-all py-2 border-b-2 ${currentView === 'COMPLIANCE' ? 'text-white border-amber-400' : 'border-transparent hover:text-white'}`}>Compliance</a>
              <a href="#" onClick={(e) => handleNavLinkClick(e, 'REPORTS')} className={`transition-all py-2 border-b-2 ${currentView === 'REPORTS' ? 'text-white border-amber-400' : 'border-transparent hover:text-white'}`}>Reports</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest">Hub Active</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center cursor-pointer hover:border-amber-400/50 transition-all">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-8 py-16 w-full flex-grow">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-9">
            {renderView()}
          </div>
          <aside className="hidden lg:block lg:col-span-3 space-y-8 sticky top-[140px] h-fit">
            <MarketPulse />
            <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 text-gray-300">
                <BarChart3 size={18} />
                <h4 className="text-[11px] font-black uppercase tracking-widest">Live Broker Stats</h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div>
                    <p className="text-white text-3xl font-black tracking-tighter">$2.4m</p>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Available Liquidity</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 text-sm font-black">+18.4%</p>
                    <p className="text-gray-600 text-[9px] font-bold">Weekly</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[10px] font-bold uppercase">System Uptime</span>
                  <span className="text-emerald-500 text-[10px] font-black bg-emerald-500/10 px-2 py-0.5 rounded">99.9%</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer 
        onShowLegal={(title, content) => setLegalModal({title, content})}
        onContactSupport={() => alert('Toronto Broker Desk: Initializing live connection...')}
      />

      {legalModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl">
          <div className="w-full max-w-lg glass-card rounded-[3rem] p-10 border border-white/20 shadow-2xl relative">
            <button onClick={() => setLegalModal(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white p-2">
              <X size={24} />
            </button>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center">
                <ShieldAlert size={24} className="text-amber-400" />
              </div>
              <h2 className="text-white text-2xl font-black uppercase tracking-tighter">{legalModal.title}</h2>
            </div>
            <p className="text-gray-300 text-base leading-relaxed font-medium mb-10">{legalModal.content}</p>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 mb-8">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Certification Code</p>
              <p className="text-amber-400 font-mono text-sm">TOR-GTA-CERT-2025-V4</p>
            </div>
            <button 
              onClick={() => setLegalModal(null)}
              className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-amber-400 transition-all active:scale-95"
            >
              Acknowledged
            </button>
          </div>
        </div>
      )}

      <AssistantModal car={selectedCarForChat} onClose={() => setSelectedCarForChat(null)} />
    </div>
  );
};

export default App;
