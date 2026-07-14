import { Shield, Sparkles, Star, UserCheck, KeyRound } from 'lucide-react';
import propertyPapers from '../assets/images/property_papers_1783700850111.jpg';
import happyHomeowner from '../assets/images/happy_homeowner_1783700864582.jpg';
import { useLanguage } from '../context/LanguageContext';

interface AboutTrustProps {
  onNavigate: (sectionId: string) => void;
}

export default function AboutTrust({ onNavigate }: AboutTrustProps) {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 font-mono uppercase tracking-wider">
            <span>{t.trust.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.trust.title}
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            {t.trust.subtitle}
          </p>
        </div>

        {/* Feature Split Row 1 - Property Papers Image (Left) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Image */}
          <div className="lg:col-span-6 relative group">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/15 to-amber-500/5 rounded-3xl blur-xl transition duration-500 group-hover:opacity-100" />
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img 
                src={propertyPapers} 
                alt="Property sale deeds and fountain pen on desk" 
                className="w-full h-auto object-cover aspect-4/3 group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-left">
                <div>
                  <span className="text-[9px] uppercase font-mono text-slate-400 block font-bold">Bangalore Registrar Standards</span>
                  <span className="text-xs font-semibold text-white block mt-0.5">K-RERA Vetted Drafting & Deeds</span>
                </div>
                <span className="text-xs font-bold font-mono text-amber-400 bg-amber-500/15 px-2.5 py-1 rounded">
                  Form 15 & 16 Verified
                </span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex p-3 bg-amber-500/10 text-amber-500 rounded-2xl border border-amber-500/20">
              <Shield className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t.trust.block1Title}
            </h3>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {t.trust.p1}
            </p>

            {/* Check points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3 text-xs">
                <div className="p-1 bg-emerald-500/10 text-emerald-400 rounded-md shrink-0 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <div>
                  <h5 className="text-white font-bold mb-0.5">Title Chain Verification</h5>
                  <p className="text-slate-400">{t.trust.block1Desc}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-xs">
                <div className="p-1 bg-emerald-500/10 text-emerald-400 rounded-md shrink-0 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <div>
                  <h5 className="text-white font-bold mb-0.5">Tax Ledger Syncing</h5>
                  <p className="text-slate-400">Verifying BBMP property tax paid receipts are fully cleared.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('checklist')}
                className="px-6 py-3 rounded-xl font-bold text-xs bg-slate-900 border border-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-800 transition-colors"
              >
                {t.nav.checklist}
              </button>
            </div>
          </div>

        </div>

        {/* Feature Split Row 2 - Happy Customer Image (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content (Left on desktop) */}
          <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
            <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
              <UserCheck className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t.trust.block2Title}
            </h3>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {t.trust.p2}
            </p>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 text-xs font-mono">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg shrink-0">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-slate-400 block font-semibold">Immediate Handover Coordination</span>
                  <p className="text-slate-500 text-[10px] mt-0.5 leading-normal">
                    {t.trust.block2Desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('booking')}
                className="px-6 py-3.5 rounded-xl font-bold text-xs bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-lg"
              >
                {t.nav.schedule}
              </button>
            </div>
          </div>

          {/* Image (Right on desktop) */}
          <div className="lg:col-span-6 relative group order-1 lg:order-2">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 rounded-3xl blur-xl transition duration-500 group-hover:opacity-100" />
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img 
                src={happyHomeowner} 
                alt="Happy Indian couple in front of a modern Bangalore luxury apartment holding documents" 
                className="w-full h-auto object-cover aspect-4/3 group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-left">
                <div>
                  <span className="text-[9px] uppercase font-mono text-slate-400 block font-bold">100% Complete Satisfaction</span>
                  <span className="text-xs font-semibold text-white block mt-0.5">Amit & Neha — Registered homeowners</span>
                </div>
                <div className="flex items-center space-x-1 text-amber-400 font-mono text-xs font-bold">
                  <span>★ 5.0</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
