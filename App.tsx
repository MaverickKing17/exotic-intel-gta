
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_CARS } from './constants';
import { MoneyTicker } from './components/MoneyTicker';
import { CarCard } from './components/CarCard';
import { AssistantModal } from './components/AssistantModal';
import { MarketPulse } from './components/MarketPulse';
import { Footer } from './components/Footer';
import { calculateProfit } from './utils';
import { Car } from './types';
import { LayoutGrid, BarChart3, Globe2, Gem, Search, Filter, ArrowUpRight } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCarForChat, setSelectedCarForChat] = useState<Car | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [exchangeRate, setExchangeRate] = useState(0.737); // Default fallback

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/CAD');
        const data = await response.json();
        if (data && data.rates && data.rates.USD) {
          setExchangeRate(data.rates.USD);
          console.log('Exotic Intel: Live CAD/USD rate updated to', data.rates.USD);
        }
      } catch (error) {
        console.error('Exotic Intel: Failed to fetch live exchange rate, using fallback.', error);
      }
    };

    fetchExchangeRate();
    // Refresh rate every 15 minutes
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

  const handleNavLinkClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    if (section === 'INVENTORY') {
      setActiveFilter('ALL');
      setSearchQuery('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert(`${section} Access Restricted: Your credentials allow Inventory access only. Contact your regional manager to unlock ${section.toLowerCase()} modules.`);
    }
  };

  const handleFilterRequest = (filter: string) => {
    setActiveFilter(filter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-0 selection:bg-amber-400 selection:text-black bg-[#252932]">
      {/* Real-Time Live Feed Ticker - Highest priority sticky */}
      <MoneyTicker totalProfit={totalMarketProfit} exchangeRate={exchangeRate} />

      {/* Navigation Header - Enhanced opacity and z-index to block content background */}
      <nav className="max-w-[1600px] mx-auto px-8 py-5 flex items-center justify-between border-b border-white/5 bg-[#252932] sticky top-[41px] z-[60] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={(e) => handleNavLinkClick(e, 'INVENTORY')}>
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Gem size={22} className="text-black" />
            </div>
            <h1 className="text-white text-xl font-black tracking-tighter uppercase group-hover:text-amber-400 transition-colors">Exotic Intel</h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'INVENTORY')} className={`transition-all py-2 border-b-2 ${activeFilter === 'ALL' && !searchQuery ? 'text-white border-amber-400' : 'border-transparent hover:text-white'}`}>Inventory</a>
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'LOGISTICS')} className="hover:text-white transition-colors py-2 border-b-2 border-transparent">Logistics</a>
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'COMPLIANCE')} className="hover:text-white transition-colors py-2 border-b-2 border-transparent">Compliance</a>
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'REPORTS')} className="hover:text-white transition-colors py-2 border-b-2 border-transparent">Reports</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Vaughan Hub Hub Active</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-600 border border-white/10 shadow-lg cursor-pointer hover:border-amber-400/50 transition-all flex items-center justify-center">
             <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-8 py-12">
        <div className="grid grid-cols-12 gap-12">
          
          {/* Main Dashboard - Left 9 Cols */}
          <div className="col-span-12 lg:col-span-9 space-y-12">
            
            {/* Search and Filters */}
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
                  USMCA Native
                </button>
              </div>
            </div>

            {/* Car Grid */}
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
                    className="bg-white/10 text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white hover:text-black transition-all"
                  >
                    Reset System Parameters
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Trust Section (Inline) */}
            <div className="bg-gradient-to-br from-amber-400/15 via-transparent to-transparent p-16 rounded-[4rem] border border-amber-400/10 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="max-w-xl relative z-10">
                <h2 className="text-white text-4xl font-black mb-6 uppercase tracking-tighter leading-none">Market Signal Active</h2>
                <p className="text-gray-300 text-base leading-relaxed mb-10 font-medium italic">
                  "Exotic Intel's neural engine predicts a 2.4% increase in Miami luxury demand over the next 14 days. Toronto inventory is currently undervalued relative to this peak."
                </p>
                <button 
                  onClick={() => alert("Market Report Generation: Restricted to Premium Brokers.")}
                  className="bg-amber-400 text-black font-black px-12 py-5 rounded-2xl hover:bg-amber-300 transition-all flex items-center gap-4 shadow-2xl shadow-amber-400/20 active:scale-95"
                >
                  EXECUTE SYSTEM SCAN
                  <ArrowUpRight size={22} />
                </button>
              </div>
              <div className="hidden xl:block relative z-10">
                 <Globe2 size={200} className="text-amber-400/30 animate-pulse" />
              </div>
            </div>
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
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[10px] font-bold uppercase">System Integrity</span>
                  <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">Nominal</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      {/* AI Assistant Modal */}
      <AssistantModal 
        car={selectedCarForChat} 
        onClose={() => setSelectedCarForChat(null)} 
      />
    </div>
  );
};

export default App;
