import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Newspaper, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FAQSectionProps {
  onDiscussArticle?: (serviceName: string) => void;
}

interface NewsItem {
  id: string;
  title: { en: string; kn: string };
  source: string;
  date: { en: string; kn: string };
  category: { en: string; kn: string };
  desc: { en: string; kn: string };
}

const newsArticles: NewsItem[] = [
  {
    id: 'news-1',
    title: {
      en: 'Namma Metro Phase 2 & 3 Corridors Boost North & East Bangalore Property Valuations',
      kn: 'ನಮ್ಮ ಮೆಟ್ರೋ ೨ ಮತ್ತು ೩ನೇ ಹಂತದ ವಿಸ್ತರಣೆಯಿಂದ ಉತ್ತರ ಹಾಗೂ ಪೂರ್ವ ಬೆಂಗಳೂರು ಆಸ್ತಿ ಮೌಲ್ಯ ಹೆಚ್ಚಳ'
    },
    source: 'Economic Times Real Estate',
    date: {
      en: 'July 13, 2026',
      kn: 'ಜುಲೈ ೧೩, ೨೦೨೬'
    },
    category: {
      en: 'Infrastructure',
      kn: 'Infrastructure'
    },
    desc: {
      en: 'Extensive metro connectivity across crucial IT and aerospace corridors has triggered a 12-18% rise in residential and land plot valuations around Hebbal, Devanahalli, and Whitefield.',
      kn: 'ಪ್ರಮುಖ ಐಟಿ ಮತ್ತು ಏರೋಸ್ಪೇಸ್ ಕಾರಿಡಾರ್‌ಗಳ ನಡುವೆ ಮೆಟ್ರೋ ಸಂಪರ್ಕ ಹೆಚ್ಚುತ್ತಿರುವುದರಿಂದ ಹೆಬ್ಬಾಳ, ದೇವನಹಳ್ಳಿ ಮತ್ತು ವೈಟ್‌ಫೀಲ್ಡ್ ಸುತ್ತಮುತ್ತಲಿನ ನಿವೇಶನಗಳ ಬೆಲೆ ೧೨-೧೮% ಹೆಚ್ಚಾಗಿದೆ.'
    }
  },
  {
    id: 'news-2',
    title: {
      en: 'Kaveri 2.0 & E-Khata Digitization Streamlining Property Registrations in Bengaluru',
      kn: 'ಕಾವೇರಿ ೨.೦ ಮತ್ತು ಇ-ಖಾತಾ ಡಿಜಿಟಲೀಕರಣದಿಂದ ಬೆಂಗಳೂರಿನಲ್ಲಿ ಆಸ್ತಿ ನೋಂದಣಿ ಇನ್ನಷ್ಟು ಸುಲಭ'
    },
    source: 'Hindustan Times',
    date: {
      en: 'June 28, 2026',
      kn: 'ಜೂನ್ ೨೮, ೨೦೨೬'
    },
    category: {
      en: 'Regulations',
      kn: 'Regulations'
    },
    desc: {
      en: 'The Stamps and Registration Department recorded high digital volume with newly integrated BBMP E-Khata systems, ensuring faster online slot bookings and verification processes.',
      kn: 'ಮುದ್ರಾಂಕ ಮತ್ತು ನೋಂದಣಿ ಇಲಾಖೆಯು ಹೊಸ ಬಿಬಿಎಂಪಿ ಇ-ಖಾತಾ ಸಂಯೋಜನೆಯೊಂದಿಗೆ ಗರಿಷ್ಠ ಡಿಜಿಟಲ್ ನೋಂದಣಿ ದಾಖಲಿಸಿದೆ, ಆನ್‌ಲೈನ್ ಸ್ಲಾಟ್ ಬುಕಿಂಗ್ ಮತ್ತಷ್ಟು ಸರಳವಾಗಿದೆ.'
    }
  },
  {
    id: 'news-3',
    title: {
      en: 'North Bangalore Emerges as Luxury Residential Hub Fuelled by Aerospace & IT Expansion',
      kn: 'ಏರೋಸ್ಪೇಸ್ ಮತ್ತು ಐಟಿ ಕಾರಿಡಾರ್‌ ವಿಸ್ತರಣೆಯಿಂದ ಉತ್ತರ ಬೆಂಗಳೂರು ಲಕ್ಸುರಿ ಮನೆಗಳ ಪ್ರಮುಖ ಕೇಂದ್ರವಾಗಿ ಹೊರಹೊಮ್ಮಿದೆ'
    },
    source: 'Savills India Residential Report',
    date: {
      en: 'May 15, 2026',
      kn: 'May 15, 2026'
    },
    category: {
      en: 'Market Trends',
      kn: 'Market Trends'
    },
    desc: {
      en: 'Devanahalli, Thanisandra, and Yelahanka continue to dominate Bangalore premium real estate demand with double-digit year-on-year growth due to massive tech-park expansions.',
      kn: 'ದೇವನಹಳ್ಳಿ, ತಣಿಸಂದ್ರ ಮತ್ತು ಯಲಹಂಕ ಭಾಗದಲ್ಲಿ ಬೃಹತ್ ತಂತ್ರಜ್ಞಾನ ಪಾರ್ಕ್‌ಗಳ ವಿಸ್ತರಣೆಯಿಂದಾಗಿ ಐಷಾರಾಮಿ ಆಸ್ತಿಗಳ ಬೇಡಿಕೆ ವರ್ಷದಿಂದ ವರ್ಷಕ್ಕೆ ದ್ವಿಗುಣಗೊಳ್ಳುತ್ತಿದೆ.'
    }
  },
  {
    id: 'news-4',
    title: {
      en: 'BBMP GPS-Linked GIS Tagging Plan Targets Land Encroachment and Title Frauds',
      kn: 'ಬಿಬಿಎಂಪಿಯಿಂದ ಜಿಪಿಎಸ್ ಸಂಯೋಜಿತ ಜಿಐಎಸ್ ಟ್ಯಾಗಿಂಗ್ ಯೋಜನೆ: ಆಸ್ತಿ ಅತಿಕ್ರಮಣ ಮತ್ತು ನಕಲಿ ಖಾತಾಗಳಿಗೆ ಬ್ರೇಕ್'
    },
    source: 'The Hindu',
    date: {
      en: 'April 30, 2026',
      kn: 'April 30, 2026'
    },
    category: {
      en: 'Local Law',
      kn: 'Local Law'
    },
    desc: {
      en: 'Municipal authorities are launching a geospatial mapping campaign to link physical layout boundaries with central land registers, enhancing buyer safety and title verification.',
      kn: 'ಭೌತಿಕ ಲೇಔಟ್ ಗಡಿಗಳನ್ನು ಅಧಿಕೃತ ಭೂ ದಾಖಲೆಗಳೊಂದಿಗೆ ಜೋಡಿಸಲು ಜಿಪಿಎಸ್ ಆಧಾರಿತ ಮ್ಯಾಪಿಂಗ್ ಅಭಿಯಾನವನ್ನು ಪಾಲಿಕೆ ಆರಂಭಿಸಿದ್ದು, ಇದರಿಂದ ಆಸ್ತಿ ಸುರಕ್ಷತೆ ಹೆಚ್ಚಲಿದೆ.'
    }
  }
];

export default function FAQSection({ onDiscussArticle }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { t, language } = useLanguage();
  const isKn = language === 'kn';

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = ['All', 'Infrastructure', 'Regulations', 'Market Trends', 'Local Law'];
  const categoriesKn: Record<string, string> = {
    'All': 'ಎಲ್ಲಾ ಸುದ್ದಿ',
    'Infrastructure': 'ಮೂಲಸೌಕರ್ಯ',
    'Regulations': 'ನಿಯಮಾವಳಿ',
    'Market Trends': 'ಮಾರುಕಟ್ಟೆ',
    'Local Law': 'ಕಾನೂನು'
  };

  const filteredArticles = selectedCategory === 'All'
    ? newsArticles
    : newsArticles.filter(item => item.category.en === selectedCategory);

  return (
    <section id="faq" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 font-mono uppercase tracking-wider">
            <span>{t.faq.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {isKn ? 'ಆಸ್ತಿ ಜ್ಞಾನ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ' : 'Property Knowledge & Market Intelligence'}
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            {isKn 
              ? 'ಬೆಂಗಳೂರು ಆಸ್ತಿ ಕಾನೂನು ಮತ್ತು ಇತ್ತೀಚಿನ ರಿಯಲ್ ಎಸ್ಟೇಟ್ ಸುದ್ದಿಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ಅಧಿಕೃತ ಮಾಹಿತಿ.' 
              : 'Authorized guidance addressing local property paper issues, municipal updates, and live Bangalore real estate market news.'}
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: FAQs Accordion (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2.5 mb-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-black text-white uppercase tracking-wider font-mono">
                {t.faq.title}
              </h3>
            </div>
            
            <div className="space-y-4">
              {t.faq.items.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div 
                    key={i} 
                    className={`bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-200 ${
                      isOpen ? 'border-amber-400 bg-gradient-to-b from-slate-900 to-slate-950 shadow-xl' : 'border-slate-800'
                    }`}
                  >
                    {/* Accordion Trigger */}
                    <button
                      onClick={() => toggleFAQ(i)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                    >
                      <div className="flex items-start space-x-3.5 pr-4">
                        <HelpCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isOpen ? 'text-amber-400' : 'text-slate-500'}`} />
                        <span className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                          {faq.q}
                        </span>
                      </div>
                      <div className={`p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 ${isOpen && 'border-amber-400/30 text-amber-400'}`}>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Accordion Content */}
                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-left border-t border-slate-800/60">
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legal Disclaimer Box */}
            <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 text-left flex items-start space-x-3.5">
              <div className="p-2 bg-amber-500/15 text-amber-400 rounded-lg shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-[11px] font-black text-white uppercase tracking-wider font-mono">{t.faq.legalNoteTitle}</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                  {t.faq.legalNoteDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Bangalore Property Market News Feed (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
            
            {/* News Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Newspaper className="w-5 h-5 text-amber-400 animate-pulse" />
                <h3 className="text-lg font-black text-white uppercase tracking-wider font-mono">
                  {isKn ? 'ಬೆಂಗಳೂರು ರಿಯಲ್ ಎಸ್ಟೇಟ್ ಸುದ್ದಿ' : 'Bangalore Property News'}
                </h3>
              </div>
              
              {/* Pulsing Live indicator */}
              <div className="flex items-center space-x-2 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                <span className="text-[10px] font-bold text-amber-400 font-mono uppercase tracking-wider">
                  {isKn ? 'ಲೈವ್ ಸುದ್ದಿ' : 'Live'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {isKn 
                ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ, ಬಿಬಿಎಂಪಿಯ ಇತ್ತೀಚಿನ ಸುತ್ತೋಲೆಗಳು ಮತ್ತು ಬೆಂಗಳೂರು ಆಸ್ತಿ ಮಾರುಕಟ್ಟೆಯ ತಾಜಾ ಬೆಳವಣಿಗೆಗಳು.' 
                : 'Real-time curated updates, regulatory shifts, and major market indices shaping land and apartment valuations across Bengaluru.'}
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 border-b border-slate-800 pb-4">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer font-mono ${
                      isActive 
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/15' 
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {isKn ? (categoriesKn[cat] || cat) : cat === 'All' ? 'All News' : cat}
                  </button>
                );
              })}
            </div>

            {/* Articles List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredArticles.map((article) => (
                <div 
                  key={article.id}
                  className="group bg-slate-950/60 hover:bg-slate-900 border border-slate-850 hover:border-amber-400/40 rounded-2xl p-4 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    {/* Category tag */}
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md font-mono uppercase tracking-wider">
                      {isKn ? (categoriesKn[article.category.en] || article.category.en) : article.category.en}
                    </span>
                    
                    {/* Source & Date */}
                    <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 font-mono">
                      <Calendar className="w-3 h-3 text-slate-600" />
                      <span>{isKn ? article.date.kn : article.date.en}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors duration-200 tracking-tight leading-snug mb-1.5">
                    {isKn ? article.title.kn : article.title.en}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {isKn ? article.desc.kn : article.desc.en}
                  </p>

                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-850/60">
                    {/* Media Source */}
                    <span className="text-[10px] text-slate-500 font-mono italic">
                      Source: {article.source}
                    </span>

                    {/* Quick Consult Action */}
                    <button
                      onClick={() => onDiscussArticle?.(isKn ? `ಸುದ್ದಿ ಚರ್ಚೆ: ${article.title.kn}` : `News Discussion: ${article.title.en}`)}
                      className="inline-flex items-center space-x-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group"
                    >
                      <span>{isKn ? 'ಸಲಹೆ ಪಡೆಯಿರಿ' : 'Consult Expert'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredArticles.length === 0 && (
                <div className="text-center py-10 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                  <p className="text-xs font-mono">
                    {isKn ? 'ಯಾವುದೇ ಹೊಸ ಸುದ್ದಿ ಲಭ್ಯವಿಲ್ಲ' : 'No recent updates in this category'}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom info banner */}
            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 text-center">
              <span className="text-[10px] font-semibold text-slate-400 leading-relaxed">
                {isKn 
                  ? 'ಮಾರುಕಟ್ಟೆಯ ಇತ್ತೀಚಿನ ಬದಲಾವಣೆಗಳು ನಿಮ್ಮ ಪ್ರಾಪರ್ಟಿಗೆ ಹೇಗೆ ಅನ್ವಯಿಸುತ್ತವೆ ಎಂದು ತಿಳಿಯಲು ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.'
                  : 'Wondering how these news updates impact your specific property? Arrange a chat with our advisory desk.'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

