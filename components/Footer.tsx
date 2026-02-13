
import React from 'react';
import { 
  Gem, MapPin, Phone, Mail, ShieldCheck, Globe, 
  Instagram, Twitter, Linkedin, Facebook, 
  Gavel, FileText, LifeBuoy, Users, HelpCircle, 
  Lock, BadgeCheck
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black/60 border-t border-white/10 mt-20 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      
      <div className="max-w-[1600px] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand & Social Column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                <Gem size={24} className="text-black" />
              </div>
              <h1 className="text-white text-2xl font-black tracking-tighter uppercase">Exotic Intel</h1>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed font-medium">
              The premier GTA intelligence engine for cross-border luxury arbitrage. Powering Toronto's most elite brokerages with real-time USMCA data.
            </p>
            <div className="flex gap-5">
              <Instagram size={20} className="text-gray-500 hover:text-[#E4405F] hover:scale-125 transition-all cursor-pointer" />
              <Twitter size={20} className="text-gray-500 hover:text-[#1DA1F2] hover:scale-125 transition-all cursor-pointer" />
              <Linkedin size={20} className="text-gray-500 hover:text-[#0077B5] hover:scale-125 transition-all cursor-pointer" />
              <Facebook size={20} className="text-gray-500 hover:text-[#1877F2] hover:scale-125 transition-all cursor-pointer" />
            </div>
          </div>

          {/* Brokerage Network */}
          <div className="space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <Users size={12} className="text-amber-400" />
              Broker Network
            </h4>
            <ul className="space-y-4">
              {['Live Inventory Feed', 'Auction Intelligence', 'White Label Solutions', 'Broker API Docs', 'GTA Dealer Portal'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-xs font-semibold block">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Regulatory & Compliance */}
          <div className="space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <ShieldCheck size={12} className="text-blue-500" />
              Compliance
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <BadgeCheck size={14} className="text-emerald-500" />
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-xs font-semibold">OMVIC Protocol</a>
              </li>
              <li className="flex items-center gap-2">
                <Globe size={14} className="text-blue-400" />
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-xs font-semibold">USMCA Import Desk</a>
              </li>
              {['CBP Clearing Status', 'VIN Audit Logs', 'Cross-Border Permits'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-xs font-semibold block">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <LifeBuoy size={12} className="text-rose-500" />
              Support Desk
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <HelpCircle size={14} className="text-gray-400" />
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-xs font-semibold">Help Center</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                <Phone size={14} /> +1 (416) 555-0198
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                <Mail size={14} /> intel@exoticgta.io
              </li>
              <li>
                <button className="bg-amber-400 text-black text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-lg hover:bg-white transition-all w-full shadow-lg shadow-amber-400/5">
                  Request 24/7 Access
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Hubs */}
          <div className="space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <MapPin size={12} className="text-emerald-400" />
              Regional Hubs
            </h4>
            <div className="space-y-5">
              <div className="group cursor-default">
                <p className="text-white text-[11px] font-bold uppercase group-hover:text-amber-400 transition-colors">Vaughan Distribution</p>
                <p className="text-gray-500 text-[10px] leading-tight mt-1">8800 Jane St, Vaughan, ON<br/>24/7 Logistics Secure Point</p>
              </div>
              <div className="group cursor-default">
                <p className="text-white text-[11px] font-bold uppercase group-hover:text-amber-400 transition-colors">Downtown HQ</p>
                <p className="text-gray-500 text-[10px] leading-tight mt-1">Bay St Corridor, Toronto, ON<br/>Broker Exec & Compliance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-gray-500">
            <p className="text-[9px] font-mono tracking-[0.3em] uppercase">
              © 2025 EXOTIC INTEL GTA // SYSTEM V4.12
            </p>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {[
              { label: 'Privacy Policy', icon: Lock },
              { label: 'Terms of Service', icon: FileText },
              { label: 'Sitemap', icon: Globe },
              { label: 'Data Security', icon: ShieldCheck },
              { label: 'Cookie Policy', icon: HelpCircle }
            ].map((item) => (
              <a 
                key={item.label} 
                href="#" 
                className="flex items-center gap-2 text-white hover:text-amber-400 transition-all text-[10px] font-black uppercase tracking-widest"
              >
                <item.icon size={12} className="opacity-50" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
