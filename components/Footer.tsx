
import React from 'react';
import { 
  Gem, MapPin, Phone, Mail, ShieldCheck, Globe, 
  Instagram, Twitter, Linkedin, Facebook, 
  FileText, LifeBuoy, Users, HelpCircle, 
  Lock, BadgeCheck
} from 'lucide-react';

interface FooterProps {
  onShowLegal: (title: string, content: string) => void;
  onContactSupport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowLegal, onContactSupport }) => {
  const legalData = {
    'Privacy Policy': 'Exotic Intel GTA (EIGTA) mandates end-to-end encryption for all broker-identifiable data including Toronto OMVIC registration certificates and private VIN history logs. Our secure Toronto data centers comply with Ontario PIPEDA standards, ensuring that high-value transaction metadata never leaves sovereign Canadian territory during the arbitrage modeling process. All client financial data is purged every 24 hours post-transaction to ensure maximum trade secrecy.',
    'Terms of Service': 'This platform is restricted to active luxury automotive brokers operating within the Greater Toronto Area. By accessing the Real-Time Vaughan Inventory Feed, users enter into a binding non-disclosure agreement (NDA) regarding proprietary USMCA arbitrage calculations. EIGTA reserves the right to suspend any user suspected of "shadow-flipping" or unauthorized inventory scraping that bypasses official Toronto regional distribution nodes.',
    'Sitemap': 'Direct access to EIGTA Nodes: Vaughan Distribution (Node-A), Downtown Toronto Audit Desk (Node-B), Detroit-Windsor Transit Portal (Node-C), and the Florida Secondary Market Pulse. Also includes the Enterprise API documentation and Global Logistical Manifests.',
    'Data Security': 'Exotic Intel features biometric-locked physical security at our Vaughan regional data hub. All arbitrage signals and sales predictions are cryptographically signed to prevent market spoofing. Our GTA-based redundancy ensures 100% uptime for high-frequency brokers monitoring tight CAD/USD delta shifts in the Toronto luxury segment.',
    'Cookie Policy': 'We use strictly necessary session cookies to maintain secure broker authentication states across the GTA encrypted network. Local storage is utilized solely for your specific inventory filtering preferences (e.g., High-Yield, USMCA Native) and never shared with 3rd party advertising entities.'
  };

  return (
    <footer className="w-full bg-black border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      
      <div className="max-w-[1600px] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-2xl">
                <Gem size={24} className="text-black" />
              </div>
              <h1 className="text-white text-2xl font-black tracking-tighter uppercase">Exotic Intel</h1>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed font-medium">
              The premier GTA intelligence engine for cross-border luxury arbitrage. Powering Toronto's most elite brokerages with real-time USMCA data and neural market modeling.
            </p>
            <div className="flex gap-6">
              <Instagram size={20} className="text-gray-500 hover:text-[#E4405F] hover:scale-125 transition-all cursor-pointer" onClick={onContactSupport} />
              <Twitter size={20} className="text-gray-500 hover:text-[#1DA1F2] hover:scale-125 transition-all cursor-pointer" onClick={onContactSupport} />
              <Linkedin size={20} className="text-gray-500 hover:text-[#0077B5] hover:scale-125 transition-all cursor-pointer" onClick={onContactSupport} />
              <Facebook size={20} className="text-gray-500 hover:text-[#1877F2] hover:scale-125 transition-all cursor-pointer" onClick={onContactSupport} />
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-6">
            <h4 className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <Users size={12} /> Broker Network
            </h4>
            <ul className="space-y-4">
              {['Live Inventory Feed', 'Auction Intelligence', 'White Label Solutions', 'Broker API Docs', 'GTA Dealer Portal'].map((link) => (
                <li key={link}>
                  <button onClick={onContactSupport} className="text-white hover:text-amber-400 transition-colors text-xs font-black uppercase tracking-widest block text-left">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <ShieldCheck size={12} /> Compliance
            </h4>
            <ul className="space-y-4">
              <li><button onClick={onContactSupport} className="text-white hover:text-amber-400 transition-colors text-xs font-black uppercase tracking-widest">OMVIC Registry</button></li>
              <li><button onClick={onContactSupport} className="text-white hover:text-amber-400 transition-colors text-xs font-black uppercase tracking-widest">USMCA Clearing</button></li>
              {['CBP Audit Logs', 'VIN History Verification', 'Cross-Border Permits'].map((link) => (
                <li key={link}>
                  <button onClick={onContactSupport} className="text-white hover:text-amber-400 transition-colors text-xs font-black uppercase tracking-widest block text-left">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-rose-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <LifeBuoy size={12} /> Support
            </h4>
            <ul className="space-y-4">
              <li><button onClick={onContactSupport} className="text-white hover:text-amber-400 transition-colors text-xs font-black uppercase tracking-widest">Help Center</button></li>
              <li className="text-white text-[11px] font-bold group cursor-pointer" onClick={onContactSupport}>+1 (416) 555-0198</li>
              <li className="text-white text-[11px] font-bold group cursor-pointer" onClick={onContactSupport}>intel@exoticgta.io</li>
              <li>
                <button onClick={onContactSupport} className="bg-amber-400 text-black text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-lg hover:bg-white transition-all w-full active:scale-95 shadow-lg">
                  Priority 24/7 Access
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <MapPin size={12} /> Regional Hubs
            </h4>
            <div className="space-y-6">
              <div className="group cursor-pointer" onClick={onContactSupport}>
                <p className="text-white text-[11px] font-black uppercase tracking-widest group-hover:text-amber-400 transition-colors">Vaughan Hub</p>
                <p className="text-gray-500 text-[10px] mt-1 leading-tight">8800 Jane St, Vaughan, ON<br/>Logistics Secure Node</p>
              </div>
              <div className="group cursor-pointer" onClick={onContactSupport}>
                <p className="text-white text-[11px] font-black uppercase tracking-widest group-hover:text-amber-400 transition-colors">Downtown HQ</p>
                <p className="text-gray-500 text-[10px] mt-1 leading-tight">Bay St Corridor, Toronto, ON<br/>Broker Compliance Desk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <p className="text-white text-[11px] font-black tracking-[0.3em] uppercase">
              © 2025 EXOTIC INTEL GTA // SYSTEM V4.12
            </p>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {[
              { label: 'Privacy Policy', icon: Lock },
              { label: 'Terms of Service', icon: FileText },
              { label: 'Sitemap', icon: Globe },
              { label: 'Data Security', icon: ShieldCheck },
              { label: 'Cookie Policy', icon: HelpCircle }
            ].map((item) => (
              <button 
                key={item.label} 
                onClick={() => onShowLegal(item.label, (legalData as any)[item.label])}
                className="flex items-center gap-2 text-white hover:text-amber-400 transition-all text-[11px] font-black uppercase tracking-[0.1em]"
              >
                <item.icon size={13} className="text-amber-400" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
