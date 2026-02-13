
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_CARS } from './constants';
import { MoneyTicker } from './components/MoneyTicker';
import { CarCard } from './components/CarCard';
import { AssistantModal } from './components/AssistantModal';
import { MarketPulse } from './components/MarketPulse';
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert(`${section} system is currently in read-only mode. Access restricted to Premium Brokers.`);
    }
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-amber-400 selection:text-black bg-[#1a1d23]">
      {/* Real-Time Live Feed Ticker */}
      <MoneyTicker totalProfit={totalMarketProfit} exchangeRate={exchangeRate} />

      {/* Navigation Header */}
      <nav className="max-w-[1600px] mx-auto px-8 py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Gem size={20} className="text-black" />
            </div>
            <h1 className="text-white text-xl font-black tracking-tighter">EXOTIC INTEL</h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'INVENTORY')} className="text-white hover:text-amber-400 transition-colors">Inventory</a>
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'LOGISTICS')} className="hover:text-white transition-colors">Logistics</a>
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'COMPLIANCE')} className="hover:text-white transition-colors">Compliance</a>
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'REPORTS')} className="hover:text-white transition-colors">Reports</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 text-[10px] font-black uppercase">Vaughan Hub: Connected</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/10" />
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-8 py-12">
        <div className="grid grid-cols-12 gap-12">
          
          {/* Main Dashboard - Left 9 Cols */}
          <div className="col-span-12 lg:col-span-9 space-y-12">
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white/5 p-4 rounded-3xl border border-white/5">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter by Make, Model or VIN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-gray-600"
                />
              </div>
              
              <div className="flex items-center gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/10">
                <button 
                  onClick={() => setActiveFilter('ALL')}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeFilter === 'ALL' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  All Feeds
                </button>
                <button 
                  onClick={() => setActiveFilter('HIGH_YIELD')}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeFilter === 'HIGH_YIELD' ? 'bg-amber-400 text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  High Yield
                </button>
                <button 
                  onClick={() => setActiveFilter('NAFTA')}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeFilter === 'NAFTA' ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
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
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-600">
                    <Filter size={32} />
                  </div>
                  <p className="text-gray-500 font-bold uppercase tracking-widest">No intelligence found for this query.</p>
                </div>
              )}
            </div>

            {/* Bottom Trust Section (Inline) */}
            <div className="bg-gradient-to-br from-amber-400/20 to-transparent p-12 rounded-[3rem] border border-amber-400/10 flex items-center justify-between">
              <div className="max-w-xl">
                <h2 className="text-white text-3xl font-black mb-4">UNLOCK THE ARBITRAGE</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
                  "The delta between Toronto luxury MSRPs and the US secondary market has reached a 10-year high. Our tools give you the proprietary edge to capture it."
                </p>
                <button className="bg-amber-400 text-black font-black px-10 py-4 rounded-2xl hover:bg-amber-300 transition-all flex items-center gap-3">
                  ACCESS FULL MARKET REPORT
                  <ArrowUpRight size={20} />
                </button>
              </div>
              <div className="hidden xl:block">
                 <Globe2 size={120} className="text-amber-400/20" />
              </div>
            </div>
          </div>

          {/* Right Sidebar - 3 Cols */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 h-fit sticky top-24">
            <MarketPulse />
            
            {/* Mini Summary Stats */}
            <div className="glass-card rounded-[2rem] p-6 border-white/5 space-y-4">
              <h4 className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Portfolio Health</h4>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white text-2xl font-black">2.4m</p>
                  <p className="text-gray-500 text-[10px] font-bold uppercase">Liquidity Available</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 text-sm font-black">+14%</p>
                  <p className="text-gray-500 text-[10px] font-bold uppercase">Weekly Yield</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-[1600px] mx-auto px-8 pt-20 text-center border-t border-white/5 mt-20 pb-10">
        <p className="text-gray-600 text-[9px] font-mono tracking-[1em] uppercase mb-8">
          Exotic Intel GTA // Proprietary Algorithm 2.5 // Toronto HQ
        </p>
      </footer>

      {/* AI Assistant Modal */}
      <AssistantModal 
        car={selectedCarForChat} 
        onClose={() => setSelectedCarForChat(null)} 
      />
    </div>
  );
};

export default App;
