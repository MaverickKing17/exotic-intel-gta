
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
      glow: 'hover:shadow-[0_0_30px_rgba(228,64,95,0.7)] hover:border-[#E4405F]/60', 
      label: 'Instagram',
      brand: 'rgba(228,64,95,0.1)'
    },
    { 
      Icon: Twitter, 
      color: 'hover:text-[#1DA1F2]', 
      glow: 'hover:shadow-[0_0_30px_rgba(29,161,242,0.7)] hover:border-[#1DA1F2]/60', 
      label: 'Twitter',
      brand: 'rgba(29,161,242,0.1)'
    },
    { 
      Icon: Linkedin, 
      color: 'hover:text-[#0077B5]', 
      glow: 'hover:shadow-[0_0_30px_rgba(0,119,181,0.7)] hover:border-[#0077B5]/60', 
      label: 'LinkedIn',
      brand: 'rgba(0,119,181,0.1)'
    },
    { 
      Icon: Facebook, 
      color: 'hover:text-[#1877F2]', 
      glow: 'hover:shadow-[0_0_30px_rgba(24,119,242,0.7)] hover:border-[#1877F2]/60', 
      label: 'Facebook',
      brand: 'rgba(24,119,242,0.1)'
    }
  ];

  return (
    <footer className="w-full bg-[#05070a] border-t border-white/5 relative overflow-hidden">
      {/* Top Border Glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      
      <div className="max-w-[1600px] mx-auto px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 mb-28">
          {/* Brand & Realistic Socials */}
          <div className="lg:col-span-1 space-y-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(255,255,255,0.15)] transition-transform hover:scale-105 duration-500">
                  <Gem size={32} className="text-black" />
                </div>
                <h1 className="text-white text-3xl font-black tracking-tighter uppercase">Exotic Intel</h1>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                The world's most powerful market engine for luxury car trading. We serve Toronto's elite brokers with real-time data and high-yield profit models.
              </p>
            </div>

            {/* Realistic & Vivid Social Media Icons */}
            <div className="flex gap-5">
              {socialLinks.map(({ Icon, color, glow, label, brand }) => (
                <button
                  key={label}
                  onClick={onContactSupport}
                  aria-label={label}
                  className={`w-14 h-14 flex items-center justify-center rounded-[1.25rem] bg-white/[0.03] border border-white/[0.08] text-gray-200 transition-all duration-500 ${color} ${glow} hover:bg-black hover:scale-110 active:scale-95 group relative`}
                >
                  <Icon size={24} strokeWidth={2} className="relative z-10 transition-transform group-hover:scale-110" />
                  {/* Subtle Inner Glow */}
                  <div className={`absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ backgroundColor: brand }} />
                </button>
              ))}
            </div>
          </div>

          {/* Links Sections - Professional Plain English */}
          <div className="space-y-8">
            <h4 className="text-amber-400 text-[12px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <Users size={16} /> Broker Network
            </h4>
            <ul className="space-y-5">
              {['Live Car Feed', 'Auction Intel', 'Dealer Solutions', 'Developer API', 'Toronto Portal'].map((link) => (
                <li key={link}>
                  <button onClick={onContactSupport} className="text-gray-100 hover:text-amber-400 transition-all text-xs font-black uppercase tracking-widest block text-left premium-hover hover:translate-x-1">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-blue-500 text-[12px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <ShieldCheck size={16} /> Trade Rules
            </h4>
            <ul className="space-y-5">
              {['OMVIC Registry', 'CUSMA Clearance', 'Audit Logs', 'VIN History', 'Export Permits'].map((link) => (
                <li key={link}>
                  <button onClick={onContactSupport} className="text-gray-100 hover:text-amber-400 transition-all text-xs font-black uppercase tracking-widest block text-left premium-hover hover:translate-x-1">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-rose-500 text-[12px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <LifeBuoy size={16} /> Help Desk
            </h4>
            <ul className="space-y-5">
              <li><button onClick={onContactSupport} className="text-gray-100 hover:text-amber-400 transition-all text-xs font-black uppercase tracking-widest premium-hover hover:translate-x-1">Help Center</button></li>
              <li className="text-white text-sm font-black">+1 (416) 555-0198</li>
              <li className="text-white text-sm font-black">support@exoticintel.io</li>
              <li className="pt-4">
                <button onClick={onContactSupport} className="bg-amber-400 text-black text-[11px] font-black uppercase tracking-[0.3em] px-8 py-5 rounded-2xl hover:bg-white transition-all w-full active:scale-95 shadow-xl shadow-amber-400/20">
                  Priority Support
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-emerald-500 text-[12px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <MapPin size={16} /> Hub Locations
            </h4>
            <div className="space-y-8">
              <div className="group cursor-pointer premium-hover hover:translate-x-1" onClick={onContactSupport}>
                <p className="text-white text-xs font-black uppercase tracking-widest group-hover:text-amber-400 transition-colors">Vaughan Hub</p>
                <p className="text-gray-500 text-[11px] mt-2 leading-relaxed">Jane St Corridor, Vaughan<br/>Secure Logistics Node</p>
              </div>
              <div className="group cursor-pointer premium-hover hover:translate-x-1" onClick={onContactSupport}>
                <p className="text-white text-xs font-black uppercase tracking-widest group-hover:text-amber-400 transition-colors">Toronto HQ</p>
                <p className="text-gray-500 text-[11px] mt-2 leading-relaxed">Bay St Financial District<br/>Compliance Center</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-16 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-5">
            <p className="text-white/30 text-[12px] font-black tracking-[0.3em] uppercase">
              © 2025 EXOTIC INTEL // SYSTEM VERSION 4.12
            </p>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
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
                className="flex items-center gap-2.5 text-gray-400 hover:text-amber-400 transition-all text-[11px] font-black uppercase tracking-[0.1em] group"
              >
                <item.icon size={16} className="text-amber-400 transition-transform group-hover:scale-125 duration-300" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
