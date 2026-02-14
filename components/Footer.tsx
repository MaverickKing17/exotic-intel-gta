
import React from 'react';
import { 
  Gem, MapPin, ShieldCheck, Globe, 
  Instagram, Twitter, Linkedin, Facebook, 
  FileText, LifeBuoy, Users, HelpCircle, 
  Lock
} from 'lucide-react';

interface FooterProps {
  onShowLegal: (title: string, content: string) => void;
  onContactSupport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowLegal, onContactSupport }) => {
  const legalData = {
    'Privacy Policy': 'Exotic Intel (EI) uses high-level encryption for all your data. This includes dealer licenses and private car history. Our Toronto data centers keep your information safe and local. We delete transaction data every 24 hours to keep your trades secret.',
    'Terms of Service': 'This platform is for active luxury car brokers in the Toronto area only. By using our real-time feed, you agree to keep our profit calculations private. We may remove access for any unauthorized use of our data.',
    'Sitemap': 'Quick access to all EI points: Vaughan Hub, Toronto Desk, Border Portals, and Miami Market updates. Includes full access to all data logs and manuals.',
    'Data Security': 'Our Vaughan hub is protected by biometric locks. Every profit signal we send is verified to prevent fake market data. We guarantee 100% uptime for brokers watching fast-moving exchange rates.',
    'Cookie Policy': 'We only use cookies to keep your account secure. We save your search preferences locally on your device. We never share your data with advertisers.'
  };

  const socialLinks = [
    { 
      Icon: Instagram, 
      color: 'hover:text-[#E4405F]', 
      glow: 'hover:shadow-[0_0_25px_rgba(228,64,95,0.6)] hover:border-[#E4405F]/50', 
      label: 'Instagram' 
    },
    { 
      Icon: Twitter, 
      color: 'hover:text-[#1DA1F2]', 
      glow: 'hover:shadow-[0_0_25px_rgba(29,161,242,0.6)] hover:border-[#1DA1F2]/50', 
      label: 'Twitter' 
    },
    { 
      Icon: Linkedin, 
      color: 'hover:text-[#0077B5]', 
      glow: 'hover:shadow-[0_0_25px_rgba(0,119,181,0.6)] hover:border-[#0077B5]/50', 
      label: 'LinkedIn' 
    },
    { 
      Icon: Facebook, 
      color: 'hover:text-[#1877F2]', 
      glow: 'hover:shadow-[0_0_25px_rgba(24,119,242,0.6)] hover:border-[#1877F2]/50', 
      label: 'Facebook' 
    }
  ];

  return (
    <footer className="w-full bg-black border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      
      <div className="max-w-[1600px] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand & Socials */}
          <div className="lg:col-span-1 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                  <Gem size={28} className="text-black" />
                </div>
                <h1 className="text-white text-2xl font-black tracking-tighter uppercase">Exotic Intel</h1>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                The leading market engine for luxury car trading. We provide Toronto's top brokers with real-time data and profit models.
              </p>
            </div>

            {/* Enhanced Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, color, glow, label }) => (
                <button
                  key={label}
                  onClick={onContactSupport}
                  aria-label={label}
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 ${color} ${glow} hover:bg-black hover:scale-110 active:scale-95 group relative`}
                >
                  <Icon size={22} className="relative z-10 transition-transform group-hover:scale-110" />
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity bg-current`} />
                </button>
              ))}
            </div>
          </div>

          {/* Links Sections - Simplified Language */}
          <div className="space-y-6">
            <h4 className="text-amber-400 text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <Users size={14} /> Broker Network
            </h4>
            <ul className="space-y-4">
              {['Live Car Feed', 'Auction Intel', 'Dealer Solutions', 'Developer API', 'Toronto Portal'].map((link) => (
                <li key={link}>
                  <button onClick={onContactSupport} className="text-white hover:text-amber-400 transition-colors text-xs font-black uppercase tracking-widest block text-left">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-blue-500 text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <ShieldCheck size={14} /> Trade Rules
            </h4>
            <ul className="space-y-4">
              {['OMVIC Registry', 'CUSMA Clearance', 'Audit Logs', 'VIN History', 'Export Permits'].map((link) => (
                <li key={link}>
                  <button onClick={onContactSupport} className="text-white hover:text-amber-400 transition-colors text-xs font-black uppercase tracking-widest block text-left">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-rose-500 text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <LifeBuoy size={14} /> Help Desk
            </h4>
            <ul className="space-y-4">
              <li><button onClick={onContactSupport} className="text-white hover:text-amber-400 transition-colors text-xs font-black uppercase tracking-widest">Help Center</button></li>
              <li className="text-white text-[12px] font-black">+1 (416) 555-0198</li>
              <li className="text-white text-[12px] font-black">support@exoticintel.io</li>
              <li>
                <button onClick={onContactSupport} className="bg-amber-400 text-black text-[10px] font-black uppercase tracking-widest px-6 py-4 rounded-xl hover:bg-white transition-all w-full active:scale-95 shadow-lg shadow-amber-400/10">
                  Priority Support
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-emerald-500 text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <MapPin size={14} /> Hub Locations
            </h4>
            <div className="space-y-6">
              <div className="group cursor-pointer" onClick={onContactSupport}>
                <p className="text-white text-[11px] font-black uppercase tracking-widest group-hover:text-amber-400 transition-colors">Vaughan Hub</p>
                <p className="text-gray-500 text-[10px] mt-1 leading-tight">Jane St Corridor, Vaughan<br/>Secure Logistics Node</p>
              </div>
              <div className="group cursor-pointer" onClick={onContactSupport}>
                <p className="text-white text-[11px] font-black uppercase tracking-widest group-hover:text-amber-400 transition-colors">Toronto HQ</p>
                <p className="text-gray-500 text-[10px] mt-1 leading-tight">Bay St Financial District<br/>Compliance Center</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <p className="text-white/40 text-[11px] font-black tracking-[0.3em] uppercase">
              © 2025 EXOTIC INTEL // SYSTEM VERSION 4.12
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
                className="flex items-center gap-2 text-white hover:text-amber-400 transition-all text-[11px] font-black uppercase tracking-[0.1em] group"
              >
                <item.icon size={14} className="text-amber-400 transition-transform group-hover:scale-110" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
