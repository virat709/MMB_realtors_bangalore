import { FileText, ShieldAlert, CheckCircle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import bangaloreCityscape from '../assets/images/bangalore_cityscape_1783700834123.jpg';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background Image with Clear Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bangaloreCityscape} 
          alt="Bangalore Cityscape Skyline" 
          className="w-full h-full object-cover opacity-80 object-center scale-100 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/70" />
      </div>

      {/* Decorative Radial Light Glares */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Main Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-400 tracking-wide uppercase font-mono">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {t.hero.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">{t.hero.titleAccent}</span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* Quick Benefits Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold text-sm">100% Safe & Compliant</h4>
                  <p className="text-xs text-slate-400">Verifiably vetted by senior K-RERA panel lawyers.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold text-sm">Direct Pricing Discussion</h4>
                  <p className="text-xs text-slate-400">Personalized pricing quotes with zero hidden commissions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold text-sm">End-to-End Tracking</h4>
                  <p className="text-xs text-slate-400">Watch your legal work progress in real time.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold text-sm">Home Documentation Pick-Up</h4>
                  <p className="text-xs text-slate-400">Secure physical document transit inside Bangalore.</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => onNavigate('booking')}
                className="group px-8 py-4 rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-xl shadow-amber-500/15 hover:shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base"
              >
                {t.booking.submitBtn}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('calculator')}
                className="px-8 py-4 rounded-xl font-bold bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600 active:scale-[0.98] transition-all text-base text-center"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
          </div>

          {/* Right Column - Trust Panel Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="absolute -top-3 -right-3 bg-emerald-500 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase font-mono tracking-wider flex items-center gap-1 shadow-lg animate-pulse">
                <ShieldCheck className="w-3.5 h-3.5" /> BBMP AREA CERTIFIED
              </div>

              <div className="space-y-6">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white tracking-tight">Need Urgent Help with Registration?</h3>
                  <p className="text-xs text-slate-400 mt-1">Get custom BBMP/Sub-Registrar paperwork timelines instantly</p>
                </div>

                {/* Info Pills */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-left">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-mono">STAMP DUTY IN KARNATAKA</span>
                        <span className="text-sm font-semibold text-white">5.1% + Cess + Surcharge</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-left">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-mono">B-KHATA RISK AWARENESS</span>
                        <span className="text-sm font-semibold text-white">Convert to A-Khata Securely</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Counter Widget */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-950/30 border border-slate-800/50 rounded-2xl">
                  <div className="text-center">
                    <span className="block text-2xl font-black text-amber-400">14,200+</span>
                    <span className="text-[10px] uppercase tracking-wider font-mono text-slate-500">Deeds Registered</span>
                  </div>
                  <div className="text-center border-l border-slate-800">
                    <span className="block text-2xl font-black text-emerald-400">99.7%</span>
                    <span className="text-[10px] uppercase tracking-wider font-mono text-slate-500">Approval Rate</span>
                  </div>
                </div>

                {/* Quick Helper CTA */}
                <div className="space-y-2">
                  <button
                    onClick={() => onNavigate('checklist')}
                    className="w-full py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 border border-amber-500/30 text-amber-400 hover:text-amber-300 transition-all flex items-center justify-center gap-2"
                  >
                    {t.hero.ctaPrimary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-slate-500 text-center font-mono">
                    *Our lawyers verify papers according to BBMP & Kaveri 2.0 standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
