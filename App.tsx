
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
      {/* Real-Time Live Feed Ticker - Z-50 */}
      <MoneyTicker totalProfit={totalMarketProfit} exchangeRate={exchangeRate} />

      {/* Navigation Header - Enhanced Z-index and Opacity to prevent overlap clutter */}
      <nav className="max-w-[1600px] mx-auto px-8 py-6 flex items-center justify-between border-b border-white/5 bg-[#252932]/95 backdrop-blur-xl sticky top-[41px] z-[60] shadow-sm">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <Gem size={20} className="text-black" />
            </div>
            <h1 className="text-white text-xl font-black tracking-tighter uppercase">Exotic Intel</h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'INVENTORY')} className={`transition-colors py-2 ${activeFilter === 'ALL' && !searchQuery ? 'text-white border-b border-white' : 'hover:text-amber-400'}`}>Inventory</a>
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'LOGISTICS')} className="hover:text-white transition-colors py-2">Logistics</a>
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'COMPLIANCE')} className="hover:text-white transition-colors py-2">Compliance</a>
            <a href="#" onClick={(e) => handleNavLinkClick(e, 'REPORTS')} className="hover:text-white transition-colors py-2">Reports</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Vaughan Hub Active</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 border border-white/10 shadow-lg cursor-pointer hover:border-amber-400/50 transition-all" />
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-8 py-12">
        <div className="grid grid-cols-12 gap-12">
          
          {/* Main Dashboard - Left 9 Cols */}
          <div className="col-span-12 lg:col-span-9 space-y-12">
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-black/20 p-4 rounded-3xl border border-white/5 shadow-2xl">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Scan Intelligence (Make, Model, VIN)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-gray-600 shadow-inner"
                />
              </div>
              
              <div className="flex items-center gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/5 shadow-inner">
                <button 
                  onClick={() => setActiveFilter('ALL')}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer ${activeFilter === 'ALL' ? 'bg-white text-black shadow-lg shadow-white/5' : 'text-gray-500 hover:text-white'}`}
                >
                  Global Feed
                </button>
                <button 
                  onClick={() => setActiveFilter('HIGH_YIELD')}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer ${activeFilter === 'HIGH_YIELD' ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/5' : 'text-gray-500 hover:text-white'}`}
                >
                  High Yield
                </button>
                <button 
                  onClick={() => setActiveFilter('NAFTA')}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer ${activeFilter === 'NAFTA' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/5' : 'text-gray-500 hover:text-white'}`}
                >
                  USMCA
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
                <div className="col-span-full py-32 text-center space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto text-gray-700 shadow-inner">
                    <Filter size={40} />
                  </div>
                  <div>
                    <p className="text-white text-lg font-bold">Zero Results Found</p>
                    <p className="text-gray-500 text-sm font-medium">Your current filter parameters yielded no arbitrage opportunities.</p>
                  </div>
                  <button onClick={() => { setActiveFilter('ALL'); setSearchQuery(''); }} className="text-amber-400 text-xs font-black uppercase tracking-widest hover:underline cursor-pointer">Reset All Parameters</button>
                </div>
              )}
            </div>

            {/* Bottom Trust Section (Inline) */}
            <div className="bg-gradient-to-br from-amber-400/20 to-transparent p-12 rounded-[3rem] border border-amber-400/10 flex items-center justify-between shadow-2xl">
              <div className="max-w-xl">
                <h2 className="text-white text-3xl font-black mb-4 uppercase tracking-tighter">Arbitrage Signal Active</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-8 font-medium italic">
                  "Market analysis indicates a widening spread between Toronto MSRP inventory and U.S. secondary market values. Proprietary data suggests a 48-hour window for maximum yields on current SUV stock."
                </p>
                <button 
                  onClick={() => alert("Market Report Generation: Restricted. Upgrade to Enterprise Plan to access full predictive analytics.")}
                  className="bg-amber-400 text-black font-black px-10 py-5 rounded-2xl hover:bg-amber-300 transition-all flex items-center gap-3 shadow-xl shadow-amber-400/10 cursor-pointer"
                >
                  EXECUTE FULL MARKET SCAN
                  <ArrowUpRight size={20} />
                </button>
              </div>
              <div className="hidden xl:block opacity-20">
                 <Globe2 size={160} className="text-amber-40