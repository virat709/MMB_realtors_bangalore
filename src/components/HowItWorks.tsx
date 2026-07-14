import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Search, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  PlusCircle, 
  Users, 
  Sparkles, 
  ClipboardCheck, 
  PhoneCall, 
  Truck, 
  Building2, 
  ArrowRight,
  CheckCircle2,
  Scale
} from 'lucide-react';

export default function HowItWorks() {
  const { language } = useLanguage();
  const isKn = language === 'kn';
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'legal'>('buy');

  const tabs = [
    {
      id: 'buy' as const,
      label: isKn ? 'ಜಮೀನು ಖರೀದಿಸಲು' : 'I Want to Buy',
      emoji: '🏡',
      color: 'from-amber-500 to-amber-600',
      borderColor: 'border-amber-400/30',
      textColor: 'text-amber-400'
    },
    {
      id: 'sell' as const,
      label: isKn ? 'ಜಮೀನು ಮಾರಾಟ ಮಾಡಲು' : 'I Want to Sell',
      emoji: '💰',
      color: 'from-emerald-500 to-emerald-600',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400'
    },
    {
      id: 'legal' as const,
      label: isKn ? 'ಕಾನೂನು ಸೇವೆಗಳು' : 'Legal & Papers',
      emoji: '⚖️',
      color: 'from-indigo-500 to-indigo-600',
      borderColor: 'border-indigo-500/30',
      textColor: 'text-indigo-400'
    }
  ];

  const stepsData = {
    buy: [
      {
        step: '01',
        title: isKn ? 'ಬಜೆಟ್ & ಸ್ಥಳ ಆರಿಸಿ' : '1. Pick Area & Budget',
        desc: isKn 
          ? 'ನಮ್ಮ ಲೈವ್ ಜೋಡಣೆ ಬೋರ್ಡ್ ನೋಡಿ ಅಥವಾ ನಿಮ್ಮ ಬಜೆಟ್ ವಿವರಗಳನ್ನು ಲ್ಯಾಂಡ್ ಹಬ್‌ನಲ್ಲಿ ನಮೂದಿಸಿ.' 
          : 'Browse direct-from-owner matched listings or post your desired area & price cap on our system.',
        icon: Search,
        iconBg: 'bg-amber-400/10 text-amber-400',
        actionLabel: isKn ? 'ಲ್ಯಾಂಡ್ ಹಬ್ ಪರಿಶೀಲಿಸಿ' : 'Open Land Hub',
        actionId: 'land-hub'
      },
      {
        step: '02',
        title: isKn ? 'ದಾಖಲೆ ಪರಿಶೀಲನೆ' : '2. 30-Year Title Audit',
        desc: isKn 
          ? 'ನಮ್ಮ ಹಿರಿಯ ವಕೀಲರ ತಂಡವು ಆಸ್ತಿಯ ೩೦ ವರ್ಷಗಳ ಹಳೆಯ ಮದರ್ ಡೀಡ್ ಮತ್ತು ಇಸಿ ದಾಖಲೆಗಳನ್ನು ಸೂಕ್ಷ್ಮವಾಗಿ ಪರಿಶೀಲಿಸುತ್ತದೆ.' 
          : 'Our K-RERA panel lawyers run background checks on mother deeds, BDA/BBMP approvals, and EC records.',
        icon: ShieldCheck,
        iconBg: 'bg-emerald-500/10 text-emerald-400',
        actionLabel: isKn ? 'ಅಗತ್ಯ ಪತ್ರಗಳ ಪರಿಶೀಲನೆ' : 'See Document Checklist',
        actionId: 'checklist'
      },
      {
        step: '03',
        title: isKn ? 'ಸುರಕ್ಷಿತ ಕಾವೇರಿ ನೋಂದಣಿ' : '3. Biometric Registration',
        desc: isKn 
          ? 'ಕಾವೇರಿ ೨.೦ ಮೂಲಕ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ, ಸರ್ಕಾರಕ್ಕೆ ನೇರ ಚಲನ್ ಮೂಲಕ ಶುಲ್ಕ ಪಾವತಿಸಿ, ಉಪ-ನೋಂದಣಾಧಿಕಾರಿ ಕಚೇರಿಯಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಮುಗಿಸಿ.' 
          : 'Book Kaveri 2.0 slots, pay secure govt stamp duties directly via challan, and complete biometric logging safely.',
        icon: ClipboardCheck,
        iconBg: 'bg-indigo-500/10 text-indigo-400',
        actionLabel: isKn ? 'ವೆಚ್ಚ ಲೆಕ್ಕ ಹಾಕಿ' : 'Calculate Registration Fees',
        actionId: 'calculator'
      }
    ],
    sell: [
      {
        step: '01',
        title: isKn ? 'ಆಸ್ತಿ ವಿವರಗಳನ್ನು ಹಾಕಿ' : '1. List Your Property',
        desc: isKn 
          ? 'ನಿಮ್ಮ ಜಮೀನಿನ ಅಳತೆ, ಖಾತಾ ಪತ್ರ ಮತ್ತು ಅಪೇಕ್ಷಿತ ಬೆಲೆಯನ್ನು ನಮ್ಮ ಸಿಸ್ಟಮ್‌ನಲ್ಲಿ ಉಚಿತವಾಗಿ ನಮೂದಿಸಿ.' 
          : 'Add your property details, location, size, and expectation. Zero setup or listing fees.',
        icon: PlusCircle,
        iconBg: 'bg-emerald-500/10 text-emerald-400',
        actionLabel: isKn ? 'ಜಮೀನು ವಿವರ ಹಾಕಿ' : 'List Property Now',
        actionId: 'land-hub'
      },
      {
        step: '02',
        title: isKn ? 'ನೇರ ಖರೀದಿದಾರರ ಸಂಪರ್ಕ' : '2. Automatic Buyer Match',
        desc: isKn 
          ? 'ನಮ್ಮ ಆಟೋ-ಮ್ಯಾಚಿಂಗ್ ಡೇಟಾಬೇಸ್ ಯಾವುದೇ ಬ್ರೋಕರ್ ಇಲ್ಲದೆ ಅದೇ ಏರಿಯಾ ಮತ್ತು ಬಜೆಟ್‌ನಲ್ಲಿರುವ ನೇರ ಗ್ರಾಹಕರನ್ನು ಜೋಡಿಸುತ್ತದೆ.' 
          : 'Our live engine cross-references active buyer requirements to pair you with high-intent direct buyers.',
        icon: Users,
        iconBg: 'bg-amber-400/10 text-amber-400',
        actionLabel: isKn ? 'ಲೈವ್ ಜೋಡಿಗಳನ್ನು ನೋಡಿ' : 'View Matching Board',
        actionId: 'land-hub'
      },
      {
        step: '03',
        title: isKn ? 'ಸುರಕ್ಷಿತ ಕ್ರಯಪತ್ರ ಹಸ್ತಾಂತರ' : '3. Complete Secure Sale',
        desc: isKn 
          ? 'ನಿಮ್ಮ ಮಾಲೀಕತ್ವದ ಖಾತಾ ಬದಲಾವಣೆಯನ್ನು ಮತ್ತು ಹೊಸ ಕ್ರಯ ಪತ್ರದ ಕರಡನ್ನು ಕಾನೂನುಬದ್ಧವಾಗಿ ಸಿದ್ಧಪಡಿಸಿ ಸುರಕ್ಷಿತವಾಗಿ ಸೇಲ್ ಮುಗಿಸಿಕೊಡುತ್ತೇವೆ.' 
          : 'Get a clean, professional Sale Deed drafted, confirm direct payment, and transfer e-Khata smoothly.',
        icon: Sparkles,
        iconBg: 'bg-indigo-500/10 text-indigo-400',
        actionLabel: isKn ? 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Schedule Legal Drafting',
        actionId: 'booking'
      }
    ],
    legal: [
      {
        step: '01',
        title: isKn ? 'ಸಂಪರ್ಕಿಸಿ / ಬುಕ್ ಮಾಡಿ' : '1. Request a Callback',
        desc: isKn 
          ? 'ನಮ್ಮ ಸರಳ ಸಮಾಲೋಚನೆ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ. ನುರಿತ ಕಾನೂನು ಸಲಹೆಗಾರರು ಕೆಲವೇ ನಿಮಿಷಗಳಲ್ಲಿ ನಿಮಗೆ ಕರೆ ಮಾಡುತ್ತಾರೆ.' 
          : 'Fill out our short consultation form or select a service. An expert is assigned to your case immediately.',
        icon: PhoneCall,
        iconBg: 'bg-indigo-500/10 text-indigo-400',
        actionLabel: isKn ? 'ಕರೆ ನಿಗದಿಪಡಿಸಿ' : 'Schedule Call',
        actionId: 'booking'
      },
      {
        step: '02',
        title: isKn ? 'ಮನೆಯಿಂದಲೇ ದಾಖಲೆ ಪಿಕಪ್' : '2. Secure Document Transit',
        desc: isKn 
          ? 'ನಿಮ್ಮ ಆಸ್ತಿ ಪತ್ರಗಳ ನಕಲು ಪಡೆಯಲು ನಮ್ಮ ಏಜೆಂಟ್ ನಿಮ್ಮ ಮನೆಯಿಂದಲೇ ಸುರಕ್ಷಿತವಾಗಿ ಕಡತಗಳನ್ನು ಸಂಗ್ರಹಿಸುತ್ತಾರೆ ಅಥವಾ ಡಿಜಿಟಲ್ ಪ್ರತಿಗಳನ್ನು ಕಳುಹಿಸಿ.' 
          : 'Opt for safe physical document transit inside Bangalore, or securely submit digital scanned papers.',
        icon: Truck,
        iconBg: 'bg-amber-400/10 text-amber-400',
        actionLabel: isKn ? 'ಸೇವೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ' : 'Browse 24 Legal Services',
        actionId: 'services'
      },
      {
        step: '03',
        title: isKn ? 'ತ್ವರಿತ ಸರ್ಕಾರಿ ಕಚೇರಿ ಪ್ರಕ್ರಿಯೆ' : '3. Ward & SRO Liaisoning',
        desc: isKn 
          ? 'ನಾವು ನೇರವಾಗಿ ಬಿಬಿಎಂಪಿ ಮತ್ತು ಸಬ್-ರಜಿಸ್ಟ್ರಾರ್ ಕಚೇರಿಗಳಲ್ಲಿ ಕೆಲಸ ಮುಗಿಸಿ, ನಿಮ್ಮ ಕಡತದ ಪ್ರತಿ ಹಂತದ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕರ್ ಮೂಲಕ ಲೈವ್ ತೋರಿಸುತ್ತೇವೆ.' 
          : 'We coordinate directly with BBMP ward officers and SROs. Track real-time progress on your digital dashboard.',
        icon: Building2,
        iconBg: 'bg-emerald-500/10 text-emerald-400',
        actionLabel: isKn ? 'ಅರ್ಜಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ' : 'Track Application Status',
        actionId: 'tracker'
      }
    ]
  };

  const activeSteps = stepsData[activeTab];

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-slate-950 border-t border-b border-slate-900 relative">
      {/* Background visual accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Simple friendly Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-bold text-indigo-400 mb-4">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{isKn ? 'ಸರಳ ಹಂತಗಳ ಮಾರ್ಗದರ್ಶಿ' : 'Simplified 3-Step Pathways'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-mono">
            {isKn ? '⚡ ನಿಮ್ಮ ಮುಂದಿನ ಹೆಜ್ಜೆ ತಿಳಿಯಿರಿ' : '⚡ What should you do next?'}
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            {isKn 
              ? 'ಆಸ್ತಿ ವ್ಯವಹಾರಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಕಡತಗಳ ಕೆಲಸ ಸುಲಭ ಮತ್ತು ಪಾರದರ್ಶಕ. ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ ನೋಡಿ:'
              : 'Real estate can be complicated, but our process is incredibly simple. Choose your path below to see your 1-2-3 custom roadmap.'}
          </p>
        </div>

        {/* Tab Buttons / Pathway Selector */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl gap-1.5 max-w-full overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-button-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
                    isActive 
                      ? 'bg-slate-950 text-white border border-slate-800 shadow-xl' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-850/50'
                  }`}
                >
                  <span className="text-base">{tab.emoji}</span>
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Step-by-Step Pathway Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative items-stretch"
          >
            {/* Visual connecting line behind cards (desktop only) */}
            <div className="absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-slate-800 via-indigo-950/40 to-slate-800 -translate-y-1/2 hidden lg:block z-0 pointer-events-none" />

            {activeSteps.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.step}
                  id={`step-card-${activeTab}-${idx}`}
                  className="bg-slate-900/30 backdrop-blur-sm border border-slate-850 hover:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative z-10 group shadow-lg"
                >
                  {/* Step number and Icon row */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-4xl font-black font-mono text-slate-800/60 group-hover:text-slate-700 tracking-tighter">
                      {item.step}
                    </span>
                    <div className={`p-4 rounded-2xl ${item.iconBg} border border-slate-800/50 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Copy content */}
                  <div className="space-y-3 mb-8">
                    <h3 className="text-lg font-black text-white font-mono tracking-wide uppercase">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed min-h-[60px]">
                      {item.desc}
                    </p>
                  </div>

                  {/* Immediate Action Link to take them next without reading */}
                  <button
                    onClick={() => handleNavigate(item.actionId)}
                    className="w-full py-3 bg-slate-950/80 hover:bg-slate-900 border border-slate-850 group-hover:border-slate-800 text-xs font-bold text-slate-300 group-hover:text-amber-400 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Small pointer connection on right side of cards */}
                  {idx < 2 && (
                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 text-slate-800 hidden lg:block z-20 pointer-events-none font-bold">
                      ➔
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Visual trust check guarantee footer */}
        <div className="mt-16 text-center max-w-xl mx-auto p-4 bg-slate-900/20 border border-slate-900 rounded-2xl flex items-center justify-center space-x-3">
          <Scale className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
            {isKn 
              ? 'ಪ್ರತಿಯೊಂದು ಪ್ರಕ್ರಿಯೆಯು ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಮತ್ತು ಕಾವೇರಿ ೨.೦ ನಿಯಮಾವಳಿಗಳಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ.'
              : 'Every single step is legally guided & fully compliant with Karnataka Land Revenue & Kaveri 2.0 Acts.'}
          </span>
        </div>

      </div>
    </section>
  );
}
