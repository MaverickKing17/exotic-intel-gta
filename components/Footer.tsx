
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
    'Privacy Policy': 'Exotic Intel GTA (EIGTA) enforces strict data residency within Canadian borders for all broker-identifiable information. Our privacy protocol for Toronto-based luxury brokerages ensures all VIN data, driver license scans, and UVIP ownership documents are stored in AES-256 encrypted silos. We are fully compliant with the Ontario Personal Information Protection and Electronic Documents Act (PIPEDA) specifically regarding the handling of sensitive automotive arbitrage data and client financial records required for high-value exports.',
    'Terms of Service': 'The use of the Exotic Intel system is restricted to licensed OMVIC dealers and registered luxury brokers in the Province of Ontario. By accessing the Vaughan Real-Time Inventory Feed, users agree to a non-disclosure of the proprietary USMCA (CMA) arbitrage calculation engine. EIGTA reserves the right to terminate access for any broker found poaching inventory from regional distribution nodes or engaging in "curbsiding" practices that violate Ontario automotive trade regulations. EIGTA assumes no liability for U.S. Customs (CBP) seizures resulting from inaccurate user-input parts-content declarations.',
    'Sitemap': 'The EIGTA directory provides direct access to our core nodes: Vaughan Distribution Hub (V-Node), Downtown Toronto Compliance Desk (D-Node), Detroit/Windsor Border Logistics Portal, Miami Secondary Market Pulse, and the Global Arbitrage API documentation for Enterprise partners.',
    'Data Security': 'Exotic Intel maintains Tier-4 data centers specifically located in the Greater Toronto Area to minimize latency for high-frequency inventory scans. Our security stack includes biometric-locked physical access for the Vaughan Logistics secure terminal and a decentralized ledger for all smart-contract vehicle imports. Arbitrage signals are verified through multi-node consensus, ensuring zero-day vulnerabilities in the Toronto-Miami export corridor are mitigated via real-time VIN-tracking audit logs.',
    'Cookie Policy': 'We utilize strictly necessary session-tokens to maintain secure broker authentication across the GTA network. Specialized "Market-Pulse Cookies" are used to store your preferred regional filtering (Vaughan, Mississauga, Markham) and arbitrage spread preferences. These cookies are non-tracking for third-party advertising and are purged upon broker session termination to ensure maximum trade-secrecy.'
  };

  return (
    <footer className="w-full bg-black/60 border-t border-white/10 mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      
      <div className="max-w-[1600px] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
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
              <Instagram size={20} className="text-gray-500 hover:text-[#E4405F] hover:scale-125 transition-all cursor-pointer" onClick={() => alert('Launching Exotic Intel Instagram...')} />
              <Twitter size={20} className="text-gray-500 hover:text-[#1DA1F2] hover:scale-125 transition-all cursor-pointer" onClick={() => alert('Launching Exotic Intel Twitter...')} />
              <Linkedin size={20} className="text-gray-500 hover:text-[#0077B5] hover:scale-125 transition-all cursor-pointer" onClick={() => alert('Launching Exotic Intel LinkedIn...')} />
              <Facebook size={20} className="text-gray-500 hover:text-[#1877F2] hover:scale-125 transition-all cursor-pointer" onClick={() => alert('Launching Exotic Intel Facebook...')} />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <Users size={12} className="text-amber-400" />
              Broker Network
            </h4>
            <ul className="space-y-4">
              {['Live Inventory Feed', 'Auction Intelligence', 'White Label Solutions', 'Broker API Docs', 'GTA Dealer Portal'].map((link) => (
                <li key={link}>
                  <button onClick={() => alert(`Accessing ${link}...`)} className="text-white hover:text-amber-400 transition-colors text-xs font-semibold block text-left">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <ShieldCheck size={12} className="text-blue-500" />
              Compliance
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <BadgeCheck size={14} className="text-emerald-500" />
                <button onClick={() => alert('OMVIC Compliance System: Status Green.')} className="text-white hover:text-amber-400 transition-colors text-xs font-semibold">OMVIC Protocol</button>
              </li>
              <li className="flex items-center gap-2">
                <Globe size={14} className="text-blue-400" />
                <button onClick={() => alert('USMCA Import Desk: Real-time clearing active.')} className="text-white hover:text-amber-400 transition-colors text-xs font-semibold">USMCA Import Desk</button>
              </li>
              {['CBP Clearing Status', 'VIN Audit Logs', 'Cross-Border Permits'].map((link) => (
                <li key={link}>
                  <button onClick={() => alert(`Reviewing ${link}...`)} className="text-white hover:text-amber-400 transition-colors text-xs font-semibold block text-left">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <LifeBuoy size={12} className="text-rose-500" />
              Support Desk
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <HelpCircle size={14} className="text-gray-400" />
                <button onClick={onContactSupport} className="text-white hover:text-amber-400 transition-colors text-xs font-semibold text-left">Help Center</button>
              </li>
              <li className="flex items-center gap-2 text-white text-xs font-medium">
                <Phone size={14} className="text-amber-400" /> +1 (416) 555-0198
              </li>
              <li className="flex items-center gap-2 text-white text-xs font-medium">
                <Mail size={14} className="text-amber-400" /> intel@exoticgta.io
              </li>
              <li>
                <button onClick={() => alert('Access Request: Priority Queue Initialized.')} className="bg-amber-400 text-black text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-lg hover:bg-white transition-all w-full shadow-lg shadow-amber-400/5 active:scale-95">
                  Request 24/7 Access
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <MapPin size={12} className="text-emerald-400" />
              Regional Hubs
            </h4>
            <div className="space-y-5">
              <div className="group cursor-pointer" onClick={() => alert('Displaying Vaughan Logistics Map...')}>
                <p className="text-white text-[11px] font-bold uppercase group-hover:text-amber-400 transition-colors">Vaughan Distribution</p>
                <p className="text-gray-400 text-[10px] leading-tight mt-1">8800 Jane St, Vaughan, ON<br/>24/7 Logistics Secure Point</p>
              </div>
              <div className="group cursor-pointer" onClick={() => alert('Displaying Downtown Toronto HQ Map...')}>
                <p className="text-white text-[11px] font-bold uppercase group-hover:text-amber-400 transition-colors">Downtown HQ</p>
                <p className="text-gray-400 text-[10px] leading-tight mt-1">Bay St Corridor, Toronto, ON<br/>Broker Exec & Compliance</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-white">
            <p className="text-[11px] font-black tracking-[0.3em] uppercase">
              © 2025 EXOTIC INTEL GTA // SYSTEM V4.12
            </p>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
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
                className="flex items-center gap-2 text-white hover:text-amber-400 transition-all text-[11px] font-black uppercase tracking-widest active:scale-95"
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
