import { useState, useEffect, FormEvent } from 'react';
import { BookingDetails, PropertyType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  MapPin, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  MessageCircle
} from 'lucide-react';

interface BookingFormProps {
  prefilledService: string;
  onClearPrefilled?: () => void;
}

export default function BookingForm({ prefilledService, onClearPrefilled }: BookingFormProps) {
  const { t, language } = useLanguage();
  const isKn = language === 'kn';

  const [formData, setFormData] = useState<BookingDetails>({
    fullName: '',
    phone: '',
    email: '',
    locality: '',
    propertyType: 'apartment',
    serviceType: 'Encumbrance Certificate (EC)',
    preferredDate: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [currentReference, setCurrentReference] = useState('');

  const getWhatsAppLink = (refNo = currentReference) => {
    const text = `📋 *MMB REALTORS - CONSULTATION BOOKING*
----------------------------------------
🆔 *Reference ID:* ${refNo}
👤 *Full Name:* ${formData.fullName}
📞 *Phone/Mobile:* ${formData.phone}
✉️ *Email Address:* ${formData.email || 'None / skipped'}
📍 *Bangalore Locality:* ${formData.locality}
🏢 *Property Category:* ${formData.propertyType}
⚖️ *Service Required:* ${formData.serviceType}
📅 *Preferred Appointment:* ${formData.preferredDate}
📝 *Special Queries/Notes:* ${formData.notes || 'None'}
----------------------------------------
Submitted via MMB Legal Assistant Portal.`;
    return `https://wa.me/916366310992?text=${encodeURIComponent(text)}`;
  };

  // Handle prefilled service from other sections
  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({
        ...prev,
        serviceType: prefilledService
      }));
    }
  }, [prefilledService]);

  const bangaloreLocalities = isKn ? [
    'ವೈಟ್‌ಫೀಲ್ಡ್ / ವರ್ತೂರು',
    'ಇಂದಿರಾನಗರ / ಹೆಚ್ಎಎಲ್',
    'ಬೆಳ್ಳಂದೂರು / ಔಟರ್ ರಿಂಗ್ ರೋಡ್',
    'ಹೆಚ್ಎಸ್ಆರ್ ಲೇಔಟ್ / ಕೋರಮಂಗಲ',
    'ಸರ್ಜಾಪುರ ರಸ್ತೆ / ಕೈಕೊಂಡ್ರಹಳ್ಳಿ',
    'ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ / ಬೊಮ್ಮಸಂದ್ರ',
    'ಹೆಬ್ಬಾಳ / ತನಿಶಂದ್ರ',
    'ಯಲಹಂಕ / ದೇವನಹಳ್ಳಿ',
    'ಜಯನಗರ / ಜೆಪಿ ನಗರ',
    'ಮಲ್ಲೇಶ್ವರಂ / ರಾಜಾಜಿನಗರ',
    'ಕನಕಪುರ ರಸ್ತೆ / ಬನ್ನೇರುಘಟ್ಟ'
  ] : [
    'Whitefield / Varthur',
    'Indiranagar / Hal',
    'Bellandur / Outer Ring Road',
    'HSR Layout / Koramangala',
    'Sarjapur Road / Kaikondrahalli',
    'Electronic City / Bommasandra',
    'Hebbal / Thanisandra',
    'Yelahanka / Devanahalli',
    'Jayanagar / JP Nagar',
    'Malleshwaram / Rajajinagar',
    'Kanakapura Road / Bannerghatta'
  ];

  const propertyTypes = isKn ? [
    { value: 'apartment', label: 'ಅಪಾರ್ಟ್ಮೆಂಟ್ / ಬಹುಮಹಡಿ ಫ್ಲಾಟ್' },
    { value: 'independent', label: 'ಸ್ವತಂತ್ರ ಮನೆ / ರೋಹೌಸ್' },
    { value: 'villa', label: 'ವಿಲಾಸಿ ವಿಲ್ಲಾ / ಗೇಟೆಡ್ ಕಮ್ಯುನಿಟಿ' },
    { value: 'plot', label: 'ಖಾಲಿ ಸೈಟ್ / ಗೇಟೆಡ್ ಲೇಔಟ್' }
  ] : [
    { value: 'apartment', label: 'Apartment / High-rise Flat' },
    { value: 'independent', label: 'Independent House / Rowhouse' },
    { value: 'villa', label: 'Luxury Villa / Gated Community' },
    { value: 'plot', label: 'Vacant Plot / Gated Layout' }
  ];

  const servicesList = [
    'Encumbrance Certificate (EC)',
    'e-Khata Registration',
    'e-Khata Transfer',
    'A Khata Assistance',
    'B Khata Assistance',
    'Khata Extract',
    'Khata Certificate',
    'Property Tax Assessment',
    'Property Tax Payment Assistance',
    'Property Tax Name Transfer',
    'Certified Copies of Sale Deed',
    'Mother Deed Retrieval',
    'Previous Title Documents',
    'RTC / Pahani',
    'Mutation Register Extract (MR)',
    'Survey Sketch',
    'Tippani',
    'Village Map',
    'Akarband',
    'Conversion Order Copy',
    'Layout Approval Documents',
    'Approved Building Plan Copy',
    'Occupancy Certificate (OC)',
    'Completion Certificate (CC)',
    'Building License Copy',
    'Commencement Certificate',
    'Property PID Search',
    'BBMP Property Details Search',
    'Missing Property Document Retrieval'
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Quick validations
    if (!formData.fullName.trim()) {
      setErrorMsg(isKn ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.' : 'Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg(isKn ? 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ೧೦-ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.' : 'Please enter a valid 10-digit phone number.');
      return;
    }
    // Email is now completely optional, only checked if entered
    if (formData.email.trim() && !formData.email.includes('@')) {
      setErrorMsg(isKn ? 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.' : 'Please enter a valid email address.');
      return;
    }
    if (!formData.locality) {
      setErrorMsg(isKn ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬೆಂಗಳೂರಿನ ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.' : 'Please select your Bangalore locality.');
      return;
    }
    if (!formData.preferredDate) {
      setErrorMsg(isKn ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಮಾಲೋಚನಾ ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.' : 'Please choose your preferred consultation date.');
      return;
    }

    setSubmitting(true);

    const refNo = 'MMB-REALTORS-' + Math.floor(1000 + Math.random() * 9000);
    setCurrentReference(refNo);

    setTimeout(() => {
      setIsSubmitted(true);
      setSubmitting(false);

      // Instantly auto-direct to WhatsApp with structured data
      const text = `📋 *MMB REALTORS - CONSULTATION BOOKING*
----------------------------------------
🆔 *Reference ID:* ${refNo}
👤 *Full Name:* ${formData.fullName}
📞 *Phone/Mobile:* ${formData.phone}
✉️ *Email Address:* ${formData.email || 'None / skipped'}
📍 *Bangalore Locality:* ${formData.locality}
🏢 *Property Category:* ${formData.propertyType}
⚖️ *Service Required:* ${formData.serviceType}
📅 *Preferred Appointment:* ${formData.preferredDate}
📝 *Special Queries/Notes:* ${formData.notes || 'None'}
----------------------------------------
Submitted via MMB Legal Assistant Portal.`;
      
      const waUrl = `https://wa.me/916366310992?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      locality: '',
      propertyType: 'apartment',
      serviceType: 'Encumbrance Certificate (EC)',
      preferredDate: '',
      notes: ''
    });
    setIsSubmitted(false);
    if (onClearPrefilled) onClearPrefilled();
  };

  return (
    <section id="booking" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 font-mono uppercase tracking-wider">
            <span>{t.booking.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.booking.title}
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            {t.booking.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!isSubmitted ? (
            <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMsg && (
                  <div className="p-4 bg-red-500/15 border border-red-500/30 text-red-400 rounded-xl text-xs font-semibold flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {prefilledService && (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl text-xs font-bold flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>
                        {isKn ? 'ಪೂರ್ವ ಆಯ್ಕೆ ಮಾಡಿದ ಸೇವೆ:' : 'Prefilled Service Selected:'}{' '}
                        <span className="text-white font-black">{formData.serviceType}</span>
                      </span>
                    </div>
                    {onClearPrefilled && (
                      <button 
                        type="button"
                        onClick={onClearPrefilled} 
                        className="text-[10px] uppercase font-mono font-black text-amber-500 hover:text-white"
                      >
                        {isKn ? 'ರದ್ದುಗೊಳಿಸಿ' : 'Reset Select'}
                      </button>
                    )}
                  </div>
                )}

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
                      {t.booking.fieldFullName}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder={isKn ? 'ಉದಾ: ಪ್ರಕಾಶ್ ಹೆಗಡೆ' : 'e.g. Amit Kumar Sharma'}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
                      {t.booking.fieldPhone}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder={isKn ? '೧೦-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' : '10-Digit Mobile (e.g. 9845012345)'}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-amber-400 focus:outline-none font-mono"
                        required
                      />
                    </div>
                  </div>

                  {/* Email (Optional) */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
                      {t.booking.fieldEmail}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder={isKn ? 'ಇಮೇಲ್ ವಿಳಾಸ (ಐಚ್ಛಿಕ)' : 'e.g. amit@example.com'}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Bangalore Locality */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
                      {t.booking.fieldLocality}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                      <select
                        value={formData.locality}
                        onChange={(e) => setFormData(prev => ({ ...prev, locality: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-amber-400 focus:outline-none appearance-none"
                        required
                      >
                        <option value="">{isKn ? '-- ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ --' : '-- Choose Locality --'}</option>
                        {bangaloreLocalities.map((loc, i) => (
                          <option key={i} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
                      {t.booking.fieldPropertyType}
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value as PropertyType }))}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                    >
                      {propertyTypes.map((pt) => (
                        <option key={pt.value} value={pt.value}>{pt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Service Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
                      {t.booking.fieldServiceType}
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                    >
                      {(() => {
                        const displayedServices = [...servicesList];
                        if (formData.serviceType && !displayedServices.includes(formData.serviceType)) {
                          displayedServices.unshift(formData.serviceType);
                        }
                        return displayedServices.map((service, i) => (
                          <option key={i} value={service}>{service}</option>
                        ));
                      })()}
                    </select>
                  </div>
                </div>

                {/* Date & Note */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Preferred Date */}
                  <div className="space-y-2 md:col-span-1">
                    <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
                      {t.booking.fieldDate}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5 pointer-events-none" />
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]} // restrict previous dates
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-amber-400 focus:outline-none font-mono"
                        required
                      />
                    </div>
                  </div>

                  {/* Notes / Special queries */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
                      {t.booking.fieldNotes}
                    </label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder={t.booking.fieldNotesPlaceholder}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Consent text */}
                <p className="text-[10px] text-slate-500 leading-normal font-mono text-center">
                  {isKn 
                    ? '*ಬುಕ್ ಮಾಡುವ ಮೂಲಕ, ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಆಸ್ತಿ ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆಯ ಅಪ್‌ಡೇಟ್‌ಗಳು, ಕಾನೂನು ಮುನ್ನೆಚ್ಚರಿಕೆ ಮಾಹಿತಿ ಮತ್ತು ಡೀಡ್ ಪ್ರತಿಗಳನ್ನು ಪಡೆಯಲು ನೀವು ಒಪ್ಪಿಗೆ ನೀಡುತ್ತೀರಿ. ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಾವು ಗೌಪ್ಯವಾಗಿಡುತ್ತೇವೆ.'
                    : '*By scheduling, you consent to receive legal compliance alerts, token status updates, and digital deed copies on WhatsApp. We strictly do not share your contact details.'
                  }
                </p>

                {/* Submit button */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-12 py-4 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-98 disabled:opacity-50 font-sans text-base text-center cursor-pointer"
                  >
                    {submitting ? t.booking.submitting : t.booking.submitBtn}
                  </button>
                </div>

              </form>
            </div>
          ) : (
            /* Submission Success Panel */
            <div className="bg-slate-950/90 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6 max-w-lg mx-auto">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full">
                    {isKn ? 'ಯಶಸ್ವಿಯಾಗಿ ನಿಗದಿಯಾಗಿದೆ' : 'Consultation Scheduled'}
                  </span>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {t.booking.successTitle}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {isKn 
                      ? <>ಧನ್ಯವಾದಗಳು, <span className="text-white font-bold">{formData.fullName}</span>. ನಿಮ್ಮ ಬೆಂಗಳೂರು ಆಸ್ತಿ ಪತ್ರಗಳ ಪರಿಶೀಲನಾ ಕೋರಿಕೆಯನ್ನು ನಾವು ಯಶಸ್ವಿಯಾಗಿ ನೋಂದಾಯಿಸಿಕೊಂಡಿದ್ದೇವೆ.</>
                      : <>Thank you, <span className="text-white font-bold">{formData.fullName}</span>. We have locked in your Bangalore property papers audit request.</>
                    }
                  </p>
                </div>

                {/* Appointment Detail Grid */}
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-left space-y-3.5 font-mono text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>{t.booking.refId}:</span>
                    <span className="text-amber-400 font-bold">{currentReference}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>{isKn ? 'ಸೇವೆ:' : 'Service:'}</span>
                    <span className="text-slate-200 font-bold text-right truncate max-w-[200px]">{formData.serviceType}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>{isKn ? 'ನಿಗದಿತ ದಿನಾಂಕ:' : 'Callback Scheduled:'}</span>
                    <span className="text-slate-200 font-bold">{formData.preferredDate}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>{isKn ? 'ಅಧಿಕಾರಿ ನಿಯೋಜನೆ:' : 'Office Assignee:'}</span>
                    <span className="text-slate-200 font-bold">{isKn ? 'ಶ್ರೀ ಮಂಜುನಾಥ್ ಜಿ. (ಹಿರಿಯ ಸಲಹೆಗಾರರು)' : 'Mr. Sandeep Hegde (Senior Advisor)'}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 pt-2 border-t border-slate-800">
                    <span>{isKn ? 'ನಿಮ್ಮ ಪ್ರದೇಶ:' : 'Your Locality:'}</span>
                    <span className="text-slate-300 font-bold">{formData.locality}</span>
                  </div>
                </div>

                {/* SRO / BBMP Trust statement */}
                <div className="flex items-start space-x-3 text-left p-4 bg-slate-900/40 rounded-xl border border-slate-850">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {isKn 
                      ? 'ನಮ್ಮ ತಜ್ಞರು ಕಾವೇರಿ ನೋಂದಣಿ ಪೋರ್ಟಲ್ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ನಿಮಗೆ ನಿಖರವಾದ ಮತ್ತು ನೇರವಾದ ಸಲಹೆಯನ್ನು ನೀಡಲು ಸಿದ್ಧರಾಗಿ ನಿಮಗೆ ಕರೆ ಮಾಡುತ್ತಾರೆ.'
                      : 'Our compliance expert will review the Kaveri registration portal and draft standard agreements prior to calling you, ensuring you get concrete, actionable advice immediately.'
                    }
                  </p>
                </div>

                {/* Instant Data Delivery Channel */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 text-left space-y-3.5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
                      {t.booking.syncTitle}
                    </span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono font-bold">
                      {isKn ? 'ಸಿದ್ಧವಾಗಿದೆ' : 'Ready'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t.booking.syncDesc}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white transition-colors font-bold text-xs shadow-lg shadow-emerald-950/20 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white/10" />
                      {t.booking.sendWhatsApp}
                    </a>
                    <a
                      href="tel:+916366310992"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors font-bold text-xs cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      {isKn ? 'ಕರೆ ಮಾಡಿ: +91 63663 10992' : 'Call +91 63663 10992'}
                    </a>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {t.booking.resetForm}
                  </button>
                  <a
                    href="tel:+916366310992"
                    className="px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {isKn ? 'ಸಹಾಯವಾಣಿಗೆ ನೇರ ಕರೆ ಮಾಡಿ' : 'Call Helpline Directly'}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
