import { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  BadgeCheck, 
  HelpCircle, 
  FileText, 
  CreditCard, 
  FolderOpen, 
  Map, 
  Building2, 
  Compass,
  ArrowRight,
  Scale
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { t } = useLanguage();

  const categories = [
    { id: 'all', name: t.services.categories.all, icon: Compass },
    { id: 'khata', name: t.services.categories.khata, icon: FileText },
    { id: 'tax', name: t.services.categories.tax, icon: CreditCard },
    { id: 'deeds', name: t.services.categories.deeds, icon: FolderOpen },
    { id: 'land', name: t.services.categories.land, icon: Map },
    { id: 'approvals', name: t.services.categories.approvals, icon: Building2 },
    { id: 'search', name: t.services.categories.search, icon: Search }
  ];

  const allServices = [
    // Khata Services
    {
      name: 'e-Khata Registration',
      category: 'khata',
      desc: 'Get your property newly registered in the digitized BBMP e-Khata system with a valid PID.',
      badge: 'Digital India',
      duration: '5-7 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'e-Khata Transfer',
      category: 'khata',
      desc: 'Official transfer of e-Khata from the seller to the buyer after property registration.',
      badge: 'Title Update',
      duration: '10-15 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'A Khata Assistance',
      category: 'khata',
      desc: 'Verify and apply for A-Khata listing to secure high-value bank loans and building permits.',
      badge: 'Premium Title',
      duration: '12-18 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'B Khata Assistance',
      category: 'khata',
      desc: 'Verify B-Khata registration, tax payment tracking, and assistance in understanding conversion rules.',
      badge: 'Compliance',
      duration: '3-5 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'Khata Extract',
      category: 'khata',
      desc: 'Procure official certified Khata Extract detailing property dimensions, value, and taxation history.',
      badge: 'Verification',
      duration: '4-6 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'Khata Certificate',
      category: 'khata',
      desc: 'Retrieve certified Khata Certificate proving property registration under the municipal tax register.',
      badge: 'Official Proof',
      duration: '4-6 Days',
      price: 'Discussed Directly'
    },

    // Property Tax
    {
      name: 'Property Tax Assessment',
      category: 'tax',
      desc: 'Calculate, structure, and submit property tax assessments to prevent legal penalties or arrears.',
      badge: 'Tax Computation',
      duration: '3-5 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'Property Tax Payment Assistance',
      category: 'tax',
      desc: 'Secure digital payment of property tax online with clean receipt downloads and ledger clearance.',
      badge: 'Quick Clearance',
      duration: '1-2 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'Property Tax Name Transfer',
      category: 'tax',
      desc: 'Update ownership records in the property tax database after buying or inheriting a property.',
      badge: 'Owner Update',
      duration: '10-15 Days',
      price: 'Discussed Directly'
    },

    // Deeds & Certified Copies
    {
      name: 'Encumbrance Certificate (EC)',
      category: 'deeds',
      desc: 'Obtain Form 15/16 Encumbrance Certificates to confirm there are no active mortgages or legal disputes.',
      badge: 'Clear History',
      duration: '2-4 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'Certified Copies of Sale Deed',
      category: 'deeds',
      desc: 'Retrieve legally certified copies of your registered Sale Deed from the Kaveri sub-registrar vault.',
      badge: 'Legal Copy',
      duration: '5-7 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'Previous Title Documents',
      category: 'deeds',
      desc: 'Sourcing and audit of older title agreements, partition deeds, and settlement papers.',
      badge: 'Audit Help',
      duration: '5-7 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'Missing Property Document Retrieval',
      category: 'deeds',
      desc: 'Locate, trace, and extract lost, misplaced, or damaged property title deeds from government archives.',
      badge: 'Archive Search',
      duration: '10-15 Days',
      price: 'Discussed Directly'
    },

    // Land Records & Survey Maps
    {
      name: 'RTC / Pahani',
      category: 'land',
      desc: 'Obtain the official Record of Rights, Tenancy and Crops (RTC) from the Bhoomi land records system.',
      badge: 'Bhoomi Record',
      duration: '3-5 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'Mutation Register Extract (MR)',
      category: 'land',
      desc: 'Retrieve MR extracts confirming agricultural or converted land ownership changes.',
      badge: 'Revenue Record',
      duration: '5-7 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'Survey Sketch',
      category: 'land',
      desc: 'Official 11E survey sketch showing exact geometric boundary lines and property coordinates.',
      badge: 'Land Boundary',
      duration: '10-12 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'Tippani',
      category: 'land',
      desc: 'Retrieve Tippani land records indicating physical survey maps and original partition lines.',
      badge: 'Survey Proof',
      duration: '7-10 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'Village Map',
      category: 'land',
      desc: 'Official village maps depicting surrounding property survey numbers and public roads/channels.',
      badge: 'Zoning Map',
      duration: '3-5 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'Akarband',
      category: 'land',
      desc: 'Retrieve official Akarband register copies showing land valuation, survey details, and tax rates.',
      badge: 'Register Copy',
      duration: '7-10 Days',
      price: 'Discussed Directly'
    },

    // Rental Houses & Property Lands
    {
      name: 'Rental Houses Assistance',
      category: 'approvals',
      desc: 'Looking for a room or house to rent? Contact us and we will help you find the perfect rental property.',
      badge: 'Rent Finder',
      duration: 'Ongoing',
      price: 'Discussed Directly'
    },
    {
      name: 'Urban Property Land Services',
      category: 'approvals',
      desc: 'Are you selling an urban property or plot? Contact us and we will connect you with verified genuine buyers.',
      badge: 'Urban Matchmaking',
      duration: 'Ongoing',
      price: 'Discussed Directly'
    },
    {
      name: 'Rural Property Land Services',
      category: 'approvals',
      desc: 'Are you selling agricultural land or rural property? Contact us and we will help you find genuine buyers.',
      badge: 'Rural Matchmaking',
      duration: 'Ongoing',
      price: 'Discussed Directly'
    },

    // Search & Details
    {
      name: 'Property PID Search',
      category: 'search',
      desc: 'Locate and verify your property Unique Property Identification Number (PID) in BBMP records.',
      badge: 'PID ID',
      duration: '1-3 Days',
      price: 'Discussed Directly'
    },
    {
      name: 'BBMP Property Details Search',
      category: 'search',
      desc: 'Complete background checks on registered property dimensions, zone classification, and status.',
      badge: 'BBMP Search',
      duration: '2-4 Days',
      price: 'Discussed Directly'
    }
  ];

  const filteredServices = allServices.filter(service => {
    const localized = t.services.items[service.name] || service;
    const matchesSearch = localized.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          localized.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="services" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 text-left">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 font-mono uppercase tracking-wider">
            <span>{t.services.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight text-center">
            {t.services.title}
          </h2>
          <p className="text-base text-slate-400 leading-relaxed text-center">
            {t.services.subtitle}
          </p>
        </div>

        {/* Real-time Search and Category Filters Panel */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 mb-12 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
              <input
                type="text"
                placeholder={t.services.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors font-sans"
              />
            </div>
            
            {/* Counter */}
            <div className="flex items-center space-x-2 font-mono text-xs bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-bold">{filteredServices.length}</span>
              <span className="text-slate-500">{t.services.shownOf}</span>
            </div>
          </div>

          {/* Categories Grid/Flex Selector */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-900">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    isActive 
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md' 
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredServices.map((service, index) => {
              const localized = t.services.items[service.name] || service;
              return (
                <div 
                  key={index}
                  className="bg-slate-950/40 border border-slate-850 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center mb-4">
                      <span className="text-[10px] font-bold font-mono tracking-wider uppercase px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400">
                        {localized.badge}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-base font-bold text-white text-left tracking-tight group-hover:text-amber-400 transition-colors">
                      {localized.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-400 text-left leading-relaxed mt-2 mb-6">
                      {localized.desc}
                    </p>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="border-t border-slate-900/60 pt-4 flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase">
                      {service.price}
                    </span>
                    
                    <button
                      onClick={() => onSelectService(localized.name)}
                      className="flex items-center space-x-1 py-1.5 px-3 rounded-lg text-xs font-bold text-amber-400 hover:text-slate-950 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 hover:border-amber-500 transition-all duration-200"
                    >
                      <span>{t.services.requestBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto">
            <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-white font-bold text-base">No services found matching your query</h3>
            <p className="text-xs text-slate-400 mt-1">Please try clearing your search term or selecting another category.</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all"
            >
              {t.services.resetFilters}
            </button>
          </div>
        )}

        {/* Legal Services Section */}
        <div className="mt-16 bg-slate-950 border border-slate-800/80 rounded-3xl p-8 max-w-4xl mx-auto text-left relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 p-6 opacity-5 pointer-events-none">
            <Scale className="w-64 h-64 text-amber-500" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
            <div className="p-4 bg-amber-500/10 text-amber-400 rounded-2xl shrink-0">
              <Scale className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-400 font-mono uppercase tracking-wider mb-2">
                <span>{t.services.advocateBadge}</span>
              </div>
              <h4 className="text-xl font-bold text-white tracking-tight">{t.services.advocateTitle}</h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                {t.services.advocateDesc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-xs text-slate-300">
                <div className="flex items-center space-x-2 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{t.services.advocatePoint1}</span>
                </div>
                <div className="flex items-center space-x-2 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{t.services.advocatePoint2}</span>
                </div>
                <div className="flex items-center space-x-2 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{t.services.advocatePoint3}</span>
                </div>
                <div className="flex items-center space-x-2 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{t.services.advocatePoint4}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Inquiry Advisory Callout */}
        <div className="mt-12 bg-slate-950 border border-slate-850 rounded-2xl p-6 text-left max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-full shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-bold text-white text-sm sm:text-base">{t.services.pricingTitle}</h4>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              {t.services.pricingDesc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
