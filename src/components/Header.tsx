import { useState, useEffect } from 'react';
import { Phone, MapPin, Menu, X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LogoIcon from './LogoIcon';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'services', label: t.nav.services },
    { id: 'calculator', label: t.nav.calculator },
    { id: 'tracker', label: t.nav.tracker },
    { id: 'faq', label: t.nav.faq },
    { id: 'land-hub', label: t.nav.landHub }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg py-3' 
          : 'bg-slate-900/40 backdrop-blur-sm border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="group-hover:scale-105 transition-transform duration-300">
              <LogoIcon size={44} className="text-amber-400" />
            </div>
            <div className="text-left">
              <span className="text-xl font-black text-white tracking-tight flex items-center gap-1">
                MMB <span className="text-amber-400 font-bold">Realtors</span>
              </span>
              <span className="block text-[10px] text-slate-400 tracking-widest uppercase font-mono">
                {t.nav.logoSubtitle}
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-amber-400 bg-white/5 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Consultation Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-950/80 p-1 border border-slate-800 rounded-lg mr-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold tracking-tight transition-all ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('kn')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold tracking-tight transition-all ${
                  language === 'kn'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>

            <a 
              href="tel:+916366310992" 
              className="flex items-center text-slate-300 hover:text-amber-400 transition-colors text-sm font-mono font-medium"
            >
              <Phone className="w-4 h-4 mr-1.5 text-amber-500" />
              {t.nav.phone}
            </a>
            <button
              onClick={() => handleNavClick('booking')}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md hover:shadow-amber-500/20 active:scale-95 transition-all"
            >
              {t.nav.schedule}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-950/80 p-0.5 border border-slate-800 rounded-lg">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('kn')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  language === 'kn'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>

            <a 
              href="tel:+916366310992" 
              className="p-2 text-slate-300 hover:text-amber-400"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3 shadow-xl">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-amber-400 bg-white/5 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800 flex flex-col space-y-3">
            <div className="flex items-center text-sm font-mono text-slate-400 px-4 text-left">
              <MapPin className="w-4 h-4 mr-2 text-amber-500 shrink-0" />
              {t.nav.offices}
            </div>
            <div className="flex items-center text-sm font-mono text-slate-400 px-4 text-left">
              <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500 shrink-0" />
              {t.nav.authPaperwork}
            </div>
            <button
              onClick={() => handleNavClick('booking')}
              className="w-full py-3 rounded-lg text-center font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-lg"
            >
              {t.nav.schedule}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
