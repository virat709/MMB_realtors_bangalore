import { Mail, Phone, MapPin, Clock, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LogoIcon from './LogoIcon';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { t, language } = useLanguage();
  const isKn = language === 'kn';

  return (
    <footer className="bg-slate-950 pt-16 pb-12 text-left text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Logo & Intro - 7 Cols */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={() => onNavigate('hero')}>
              <div className="group-hover:scale-105 transition-transform duration-300">
                <LogoIcon size={38} className="text-amber-400" />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight">
                  MMB <span className="text-amber-400 font-bold">Realtors</span>
                </span>
                <span className="block text-[9px] text-slate-500 tracking-wider uppercase font-mono">
                  {t.nav.logoSubtitle}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
              {isKn 
                ? "ನಾವು ಬೆಂಗಳೂರಿನ ಪ್ರಮುಖ ಮತ್ತು ಆಸ್ತಿ ಸಂಬಂಧಿತ ವಿಶೇಷ ಕಾನೂನು ಸಹಾಯ ಕೇಂದ್ರವಾಗಿದ್ದು, ವೈಯಕ್ತಿಕ ಗೃಹ ಖರೀದಿದಾರರಿಗೆ, ಅನಿವಾಸಿ ಭಾರತೀಯ (NRI) ಹೂಡಿಕೆದಾರರಿಗೆ ಹಸ್ತಾಂತರ ಮುಕ್ತ ಕಾವೇರಿ ಆಸ್ತಿ ನೋಂದಣಿಗಳು, ಪತ್ರಗಳ ಹುಡುಕಾಟ ಮತ್ತು ಬಿಬಿಎಂಪಿ ಇ-ಖಾತಾ ಪಡೆಯಲು ಅತ್ಯಂತ ಪ್ರಾಮಾಣಿಕ ನೆರವು ನೀಡುತ್ತೇವೆ."
                : "We are Bangalore's leading specialized legal-assist consultancy assisting individual homeowners, NRI investors, and layout purchasers with hassle-free property registries, mother deed titles, and BBMP Khata transfers."
              }
            </p>

            <div className="space-y-2">
              <div className="flex items-center text-xs font-mono text-slate-300">
                <Clock className="w-4 h-4 mr-2 text-amber-500 shrink-0" />
                {isKn ? 'ಕಚೇರಿ ಸಮಯ: ಸೋಮ - ಶನಿ' : 'Office Hours: Mon - Sat'}
              </div>
            </div>
          </div>

          {/* Quick Links & Legal Badges - 5 Cols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase font-mono tracking-wider text-slate-200">
                  {isKn ? 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು' : 'Quick Links'}
                </h4>
                <ul className="space-y-2 text-xs">
                  {['services', 'calculator', 'tracker', 'booking'].map((link) => (
                    <li key={link}>
                      <button
                        onClick={() => onNavigate(link)}
                        className="hover:text-amber-400 transition-colors capitalize font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500/60" />
                        {link === 'services' ? (isKn ? 'ನಮ್ಮ ಸೇವೆಗಳು' : 'Our services') :
                         link === 'calculator' ? (isKn ? 'ಮುದ್ರೆ ಶುಲ್ಕ ಕ್ಯಾಲ್ಕುಲೇಟರ್' : 'Stamp duty calc') :
                         link === 'tracker' ? (isKn ? 'ಅರ್ಜಿಯ ಸ್ಥಿತಿ' : 'Track registration') : (isKn ? 'ಸಮಾಲೋಚನೆ ನಿಗದಿಪಡಿಸಿ' : 'Schedule appointment')}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gov portal external links */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-black uppercase font-mono tracking-wider text-slate-200">
                  {isKn ? 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ಗಳು' : 'External Portals'}
                </h4>
                <div className="flex flex-col gap-2">
                  <a 
                    href="https://kaverionline.karnataka.gov.in" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2.5 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between text-[11px] hover:border-slate-700 transition-colors text-slate-300"
                  >
                    <span>{isKn ? 'ಕಾವೇರಿ ಕರ್ನಾಟಕ ಪೋರ್ಟಲ್' : 'Kaveri Karnataka Portal'}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                  <a 
                    href="https://sakala.kar.nic.in" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2.5 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between text-[11px] hover:border-slate-700 transition-colors text-slate-300"
                  >
                    <span>{isKn ? 'ಕರ್ನಾಟಕ ಸಕಾಲ ಸೇವೆಗಳು' : 'Karnataka Sakala Services'}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-mono">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <span>
              {isKn 
                ? `&copy; ಎಮ್ಎಮ್‌ಬಿ ರಿಯಾಲ್ಟರ್ಸ್ ಮತ್ತು ಕಾನೂನು ಸಹಾಯ. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.`
                : `&copy; MMB Realtors & Legal-Assist. All Rights Reserved.`
              }
            </span>
            <span className="hidden md:inline text-slate-800">|</span>
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldAlert className="w-3.5 h-3.5" /> 
              {isKn ? 'ಖಾಸಗಿ ಕಾನೂನು ಬೆಂಬಲ ಕಚೇರಿ (ಸರ್ಕಾರೇತರ ಸಂಸ್ಥೆ)' : 'Private Legal Support (Non-Govt Entity)'}
            </span>
          </div>
          <div>
            <span>{isKn ? 'ಬೆಂಗಳೂರು ಆಸ್ತಿ ಮಾಲೀಕರಿಗಾಗಿ ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾಗಿದೆ' : 'Developed for Bangalore Property Owners'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
