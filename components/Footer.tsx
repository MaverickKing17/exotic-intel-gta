
import React from 'react';
import { Gem, MapPin, Phone, Mail, ShieldCheck, Globe, Instagram, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black/40 border-t border-white/5 mt-20">
      <div className="max-w-[1600px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Gem size={20} className="text-black" />
              </div>
              <h1 className="text-white text-xl font-black tracking-tighter uppercase">Exotic Intel</h1>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed font-medium">
              The leading GTA intelligence platform for luxury automotive arbitrage. Bridge the gap between Toronto inventory and U.S. market demand with precision analytics.
            </p>
            <div className="flex gap-4">
              <Instagram size={18} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
              <Twitter size={18} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
              <Linkedin size={18} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Location Column */}
          <div className="space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Regional Hubs</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-amber-400 mt-0.5" />
                <div>
                  <p className="text-white text-xs font-bold uppercase">Vaughan Distribution Hub</p>
                  <p className="text-gray-500 text-[11px]">8800 Jane St, Vaughan, ON L4K</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gray-600 mt-0.5" />
                <div>
                  <p className="text-white text-xs font-bold uppercase">Downtown Toronto Exec</p>
                  <p className="text-gray-500 text-[11px]">Bay Street Corridor, M5H</p>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Column */}
          <div className="space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Compliance & Safety</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer text-xs font-medium">
                <ShieldCheck size={14} className="text-blue-500" /> USMCA Import Compliance
              </li>
              <li className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer text-xs font-medium">
                <Globe size={14} className="text-emerald-500" /> VIN History Verification
              </li>
              <li className="text-gray-400 hover:text-white transition-colors cursor-pointer text-xs font-medium">Transport Logistics Protocol</li>
              <li className="text-gray-400 hover:text-white transition-colors cursor-pointer text-xs font-medium">Digital Escrow Services</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Broker Support</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                <Phone size={14} /> +1 (416) 555-0198
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                <Mail size={14} /> intel@exoticgta.io
              </div>
              <button className="w-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-white/10 transition-all mt-2">
                Contact Desk
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-[9px] font-mono tracking-[0.3em] uppercase">
            © 2025 EXOTIC INTEL GTA // PROPRIETARY ALGORITHM V4.12
          </p>
          <div className="flex gap-8 text-[9px] font-bold uppercase tracking-widest text-gray-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
