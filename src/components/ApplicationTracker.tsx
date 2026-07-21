import { useState, FormEvent, useEffect } from 'react';
import { ApplicationDetails } from '../types';
import { Search, Loader2, Calendar, CheckCircle2, Circle, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ApplicationTracker() {
  const [trackingId, setTrackingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentApp, setCurrentApp] = useState<ApplicationDetails | null>(null);
  const [error, setError] = useState('');
  const { language, t } = useLanguage();

  // Dynamically constructed local mock database depending on language selection
  const isKn = language === 'kn';

  const mockDatabase: Record<string, ApplicationDetails> = {
    'BLR-KHA-8492': {
      id: 'BLR-KHA-8492',
      applicantName: isKn ? 'ಅಮಿತ್ ಕುಮಾರ್ ಶರ್ಮಾ' : 'Amit Kumar Sharma',
      propertyAddress: isKn 
        ? 'ಶೋಭಾ ಐರಿಸ್, ಫ್ಲಾಟ್ ೪೦೨, ಹೊರ ವರ್ತುಲ ರಸ್ತೆ, ಬೆಳ್ಳಂದೂರು, ಬೆಂಗಳೂರು - ೫೬೦೧೦೩' 
        : 'Sobha Iris, Apt 402, Outer Ring Road, Bellandur, Bengaluru - 560103',
      serviceSelected: isKn ? 'ಇ-ಖಾತಾ ವರ್ಗಾವಣೆ' : 'e-Khata Transfer',
      overallStatus: 'In Progress',
      steps: [
        { 
          id: 1, 
          title: isKn ? 'ದಾಖಲೆಗಳ ಸಲ್ಲಿಕೆ ಮತ್ತು ಕಾನೂನು ಪರಿಶೀಲನೆ' : 'Document Submission & Legal Audit', 
          description: isKn 
            ? 'ನಮ್ಮ ಕಾನೂನು ವಿಭಾಗವು ಹಿಂದಿನ ಕ್ರಯ ಪತ್ರ, ತೆರಿಗೆ ರಶೀದಿಗಳು ಮತ್ತು ಮದರ್ ಡೀಡ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿದೆ.' 
            : 'Our legal desk audited previous Sale Deed, Tax Receipts, and Mother Deeds for compliance.', 
          status: 'completed', 
          date: isKn ? '೦೨ ಜುಲೈ ೨ಎಎ೬' : '02 July 2026', 
          remarks: isKn ? 'ಎಲ್ಲಾ ದಾಖಲೆಗಳು ಸರಿಯಾಗಿವೆ.' : 'All documentation clear.' 
        },
        { 
          id: 2, 
          title: isKn ? 'ಸಕಾಲ ಪೋರ್ಟಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಕೆ' : 'Application Filed via Sakala Portal', 
          description: isKn 
            ? 'ಬೆಂಗಳೂರು ಸಕಾಲ ಬಿಬಿಎಂಪಿ ವಾರ್ಡ್ ಕಚೇರಿ ಪೋರ್ಟಲ್‌ಗೆ ಭೌತಿಕ ಮತ್ತು ಡಿಜಿಟಲ್ ಫೈಲ್‌ಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ.' 
            : 'Successfully submitted physical and digital files to Bangalore Sakala BBMP ward office portal.', 
          status: 'completed', 
          date: isKn ? '೦೪ ಜುಲೈ ೨ಎಎ೬' : '04 July 2026', 
          remarks: isKn ? 'ಸ್ವೀಕೃತಿ ಸಂಖ್ಯೆ: SKL-BBMP-82019' : 'Ack No: SKL-BBMP-82019' 
        },
        { 
          id: 3, 
          title: isKn ? 'ಬಿಬಿಎಂಪಿ ಕಂದಾಯ ಅಧಿಕಾರಿಯಿಂದ ಹಕ್ಕುಗಳ ಪರಿಶೀಲನೆ' : 'BBMP Revenue Officer Title Verification', 
          description: isKn 
            ? 'ಸ್ಥಳೀಯ ವಾರ್ಡ್ ಕಂದಾಯ ನಿರೀಕ್ಷಕರು ಭೌತಿಕ ಮದರ್ ಡೀಡ್ ಮತ್ತು ಹಕ್ಕು ವರ್ಗಾವಣೆ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದ್ದಾರೆ.' 
            : 'Local ward revenue inspector verifying physical mother deed files and flow-of-title papers.', 
          status: 'completed', 
          date: isKn ? '೦೮ ಜುಲೈ ೨ಎಎ೬' : '08 July 2026', 
          remarks: isKn ? 'ಮೂಲ ಪತ್ರದಲ್ಲಿ ಯಾವುದೇ ವ್ಯತ್ಯಾಸಗಳು ಕಂಡುಬಂದಿಲ್ಲ.' : 'No discrepancies found on Mother Deed.' 
        },
        { 
          id: 4, 
          title: isKn ? 'ಆಸ್ತಿ ಭೌತಿಕ ಪರಿಶೀಲನೆ ಮತ್ತು ಚಲನ್ ಸೃಜನೆ' : 'Physical Property Inspection & Challan Generation', 
          description: isKn 
            ? 'ನೇಮಕಗೊಂಡ ಬಿಬಿಎಂಪಿ ಸಹಾಯಕ ಕಂದಾಯ ಅಧಿಕಾರಿಯಿಂದ ಪರಿಶೀಲನೆ ನಿಗದಿಯಾಗಿದೆ. ಅಧಿಕೃತ ವರ್ಗಾವಣೆ ಶುಲ್ಕದ ಚಲನ್ ಲೆಕ್ಕಾಚಾರ ಪ್ರಗತಿಯಲ್ಲಿದೆ.' 
            : 'Assigned BBMP assistant revenue inspector scheduled for inspection. Calculation of official transfer fee challan (2% of stamp value).', 
          status: 'in_progress', 
          date: isKn ? 'ಅಂದಾಜು: ೧೪ ಜುಲೈ ೨ಎಎ೬' : 'Est: 14 July 2026', 
          remarks: isKn ? 'ಸ್ಥಳ ಪರಿಶೀಲನೆ ಟೋಕನ್ ನೀಡಲಾಗಿದೆ.' : 'Site inspection token issued.' 
        },
        { 
          id: 5, 
          title: isKn ? 'ಖಾತಾ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಎಕ್ಸ್‌ಟ್ರಾಕ್ಟ್ ವಿತರಣೆ' : 'Khata Certificate & Extract Issuance', 
          description: isKn 
            ? 'ವಾರ್ಡ್ ಜಂಟಿ ಕಮಿಷನರ್ ಅವರಿಂದ ಅಧಿಕೃತ ಎ-ಖಾತಾ ಪತ್ರಕ್ಕೆ ಸಹಿ ಮತ್ತು ಅರ್ಜಿದಾರರಿಗೆ ವಿತರಣೆ.' 
            : 'Signing of official A-Khata document by Ward Joint Commissioner and delivery to applicant.', 
          status: 'pending', 
          remarks: isKn ? 'ಹಂತ ೪ ರ ಮುಕ್ತಾಯಕ್ಕಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ.' : 'Awaiting completion of Step 4.' 
        }
      ]
    },
    'BLR-REG-3041': {
      id: 'BLR-REG-3041',
      applicantName: isKn ? 'ದೀಪಾ ಆರ್. ಗೌಡ ಮತ್ತು ರಾಜೇಶ್ ಗೌಡ' : 'Deepa R. Gowda & Rajesh Gowda',
      propertyAddress: isKn 
        ? 'ಪ್ರೆಸ್ಟೀಜ್ ಲೇಕ್‌ಸೈಡ್ ಹ್ಯಾಬಿಟಾಟ್, ವಿಲ್ಲಾ ೧೮೪, ವರ್ತೂರು, ಬೆಂಗಳೂರು - ೫೬೦೦೮೭' 
        : 'Prestige Lakeside Habitat, Villa 184, Varthur, Bengaluru - 560087',
      serviceSelected: isKn ? 'ಮೂಲ ಮದರ್ ಡೀಡ್ ಪತ್ತೆಹಚ್ಚುವಿಕೆ' : 'Mother Deed Retrieval',
      overallStatus: 'Awaiting Registrar Appointment',
      steps: [
        { 
          id: 1, 
          title: isKn ? 'ಟೈಟಲ್ ಸರ್ಚ್ ಮತ್ತು ೩೦ ವರ್ಷಗಳ ಇಸಿ ಪರಿಶೀಲನೆ' : 'Title Search & 30-Year EC Audit', 
          description: isKn 
            ? 'ಋಣಭಾರ ಪ್ರಮಾಣಪತ್ರದ (EC) ಪ್ರತಿಗಳನ್ನು ಹೊರತೆಗೆದು, ಜಂಟಿ ಅಭಿವೃದ್ಧಿ ಒಪ್ಪಂದದಡಿ ಪಾಲುಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ.' 
            : 'Extracted EC copies and verified developer-landowner share split under JD Agreement.', 
          status: 'completed', 
          date: isKn ? '೨೮ ಜೂನ್ ೨೦೨೬' : '28 June 2026', 
          remarks: isKn ? 'ಮೂಲ ದಾಖಲೆಗಳು ಸರಿಯಾಗಿವೆ. ಇಸಿ ಖಾಲಿ ಇದೆ.' : 'Mother deeds verified clean. EC is nil.' 
        },
        { 
          id: 2, 
          title: isKn ? 'ಕ್ರಯ ಪತ್ರದ ಕರಡು ಮತ್ತು ನೋಂದಣಿ ಕಚೇರಿ ಅನುಮೋದನೆ' : 'Sale Deed Drafting & SRO Approval', 
          description: isKn 
            ? 'ನಮ್ಮ ವಕೀಲರ ತಂಡದಿಂದ ಕ್ರಯ ಪತ್ರದ ಕರಡು ಸಿದ್ಧಪಡಿಸಲಾಗಿದ್ದು, ಖರೀದಿದಾರರು ಮತ್ತು ಮಾರಾಟಗಾರರು ಅನುಮೋದಿಸಿದ್ದಾರೆ.' 
            : 'Deed drafted by our legal panel and approved by both buyer and seller parties.', 
          status: 'completed', 
          date: isKn ? '೦೧ ಜುಲೈ ೨೦೨೬' : '01 July 2026', 
          remarks: isKn ? 'ಬೆಂಗಳೂರಿನ ಪ್ರಮಾಣಿತ ನಿಯಮಗಳೊಂದಿಗೆ ಕರಡು ಅನುಮೋದಿಸಲಾಗಿದೆ.' : 'Draft approved with standard Bangalore indemnity clauses.' 
        },
        { 
          id: 3, 
          title: isKn ? 'ಕಾವೇರಿ ೨.೦ ಮುದ್ರೆ ಶುಲ್ಕ ಪಾವತಿ' : 'Kaveri 2.0 Stamp Duty Payment', 
          description: isKn 
            ? 'ಅಧಿಕೃತ ಮುದ್ರೆ ಶುಲ್ಕ (ಒಟ್ಟು ೫.೬%) ಮತ್ತು ನೋಂದಣಿ ಶುಲ್ಕವನ್ನು (೧%) ಆನ್‌ಲೈನ್ ಬ್ಯಾಂಕಿಂಗ್ ಮೂಲಕ ನೇರವಾಗಿ ಸರ್ಕಾರಿ ಖಜಾನೆಗೆ ಪಾವತಿಸಲಾಗಿದೆ.' 
            : 'Official Stamp duty (5.6% total) and Registration Fee (1%) paid directly to treasury via netbanking.', 
          status: 'completed', 
          date: isKn ? '೦೫ ಜುಲೈ ೨೦೨೬' : '05 July 2026', 
          remarks: isKn ? 'ಚಲನ್ ಸೃಜಿಸಲಾಗಿದೆ: KAV-CHL-1029837' : 'Challan Generated: KAV-CHL-1029837' 
        },
        { 
          id: 4, 
          title: isKn ? 'ಉಪ-ನೋಂದಣಾಧಿಕಾರಿ ಕಚೇರಿ ಸಮಯ ನಿಗದಿ' : 'Sub-Registrar Office Slot Booking', 
          description: isKn 
            ? 'ಇಂದಿರಾನಗರ ಸಬ್-ರಿಜಿಸ್ಟ್ರಾರ್ ಕಚೇರಿಯಲ್ಲಿ ಬಯೋಮೆಟ್ರಿಕ್ ಮತ್ತು ಸಹಿಗಾಗಿ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.' 
            : 'Confirmed appointment slot secured for biometrics and signing at SRO Indiranagar.', 
          status: 'in_progress', 
          date: isKn ? 'ನಿಗದಿಯಾಗಿದೆ: ೧೩ ಜುಲೈ ಬೆಳಗ್ಗೆ ೧೧:೩೦' : 'Scheduled: 13 July 11:30 AM', 
          remarks: isKn ? 'ಟೋಕನ್ ಸ್ಲಾಟ್: SRO-IND-T15. ಖರೀದಿದಾರರು ಮತ್ತು ಮಾರಾಟಗಾರರು ಮೂಲ ಆಧಾರ್ ಕಾರ್ಡ್ ತರಬೇಕು.' : 'Token Slot: SRO-IND-T15. Both buyer and seller must bring original Aadhars.' 
        },
        { 
          id: 5, 
          title: isKn ? 'ಬಯೋಮೆಟ್ರಿಕ್ಸ್ ಮತ್ತು ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆ' : 'Biometrics & Registration Execution', 
          description: isKn 
            ? 'ಸಬ್-ರಿಜಿಸ್ಟ್ರಾರ್ ಕಚೇರಿಯಲ್ಲಿ ಬಯೋಮೆಟ್ರಿಕ್ ಮತ್ತು ಫೋಟೋ ತೆಗೆಸುವ ಪ್ರಕ್ರಿಯೆ ನಡೆಯಲಿದೆ.' 
            : 'Physical execution, thumbprinting, web-camera photos, and final endorsement by sub-registrar officer.', 
          status: 'pending', 
          remarks: isKn ? 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ದಿನಾಂಕಕ್ಕಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ.' : 'Awaiting appointment slot date.' 
        },
        { 
          id: 6, 
          title: isKn ? 'ನೋಂದಾಯಿತ ಪತ್ರದ ಸಂಗ್ರಹಣೆ ಮತ್ತು ಸ್ಕ್ಯಾನ್ ವಿತರಣೆ' : 'Registered Deed Collection & Scan Delivery', 
          description: isKn 
            ? 'ನೋಂದಾಯಿತ ಮೂಲ ಪತ್ರವನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಿ, ಲ್ಯಾಮಿನೇಟ್ ಮಾಡಿ ಮನೆಗೆ ತಲುಪಿಸಲಾಗುವುದು.' 
            : 'Securely collecting original registered deed, lamination, scanning, and hand-delivering to home.', 
          status: 'pending', 
          remarks: isKn ? 'ಹಂತ ೫ ರ ನಂತರ ತಕ್ಷಣವೇ ಆರಂಭವಾಗಲಿದೆ.' : 'Initiated immediately after step 5.' 
        }
      ]
    }
  };

  // Sync state if application is active and language changes
  useEffect(() => {
    if (currentApp) {
      const updated = mockDatabase[currentApp.id];
      if (updated) {
        setCurrentApp(updated);
      }
    }
  }, [language]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setIsLoading(true);
    setError('');
    setCurrentApp(null);

    setTimeout(() => {
      const code = trackingId.trim().toUpperCase();
      if (mockDatabase[code]) {
        setCurrentApp(mockDatabase[code]);
      } else {
        setError(isKn 
          ? 'ಈ ಕೋಡ್‌ನೊಂದಿಗೆ ಯಾವುದೇ ಅರ್ಜಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಕೋಡ್‌ಗಳನ್ನು ಬಳಸಿ ಪ್ರಯತ್ನಿಸಿ.' 
          : 'No record found with this tracking ID. Please try one of our live sample codes below.'
        );
      }
      setIsLoading(false);
    }, 800);
  };

  const loadSample = (code: string) => {
    setTrackingId(code);
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      setCurrentApp(mockDatabase[code]);
      setIsLoading(false);
    }, 400);
  };

  return (
    <section id="tracker" className="py-24 bg-slate-950 border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-500 font-mono uppercase tracking-wider">
            <span>{t.tracker.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-700 tracking-tight text-center">
            {t.tracker.title}
          </h2>
          <p className="text-base text-slate-500 leading-relaxed text-center">
            {t.tracker.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
          
          {/* Tracking Search Input Box */}
          <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
            <form onSubmit={handleSearch} className="space-y-4">
              <label className="text-sm font-semibold text-slate-600 block">
                {t.tracker.enterCodeLabel}
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder={t.tracker.placeholder}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950 border border-slate-850 text-slate-700 placeholder-slate-400 focus:border-amber-500 focus:outline-none font-mono text-sm uppercase tracking-wider animate-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 rounded-xl font-bold bg-amber-500 text-slate-900 hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm shrink-0 shadow-lg shadow-amber-500/10 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.tracker.checkingRegisters}
                    </>
                  ) : (
                    t.tracker.checkStatusBtn
                  )}
                </button>
              </div>
            </form>

            {/* Live Sample Helpers */}
            <div className="pt-5 border-t border-slate-850 mt-5 flex flex-wrap items-center gap-3 text-left">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t.tracker.trySampleLabel}</span>
              <button
                onClick={() => loadSample('BLR-REG-3041')}
                className="text-xs font-mono font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 border border-amber-500/20 px-3 py-1.5 rounded-lg transition-colors text-left cursor-pointer"
              >
                {t.tracker.sample1}
              </button>
              <button
                onClick={() => loadSample('BLR-KHA-8492')}
                className="text-xs font-mono font-semibold bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-colors text-left cursor-pointer"
              >
                {t.tracker.sample2}
              </button>
            </div>
          </div>

          {/* Tracking Results Output */}
          {error && (
            <div className="p-5 bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-semibold rounded-2xl text-left">
              {error}
            </div>
          )}

          {currentApp && (
            <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 sm:p-8 shadow-lg text-left space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              
              {/* Result Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-850">
                <div className="space-y-1 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold font-mono tracking-wider text-amber-600 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase">
                      {t.tracker.reference}: {currentApp.id}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{t.tracker.registryNode}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 tracking-tight">{currentApp.serviceSelected}</h3>
                </div>
 
                <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-850 flex items-center space-x-3 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <div className="text-left">
                    <span className="text-[9px] uppercase font-mono text-slate-400 block">{t.tracker.currentStatus}</span>
                    <span className="text-xs font-bold text-slate-700 block">
                      {isKn 
                        ? (currentApp.overallStatus === 'In Progress' ? 'ಪ್ರಗತಿಯಲ್ಲಿದೆ' : 'ಉಪ-ನೋಂದಣಾಧಿಕಾರಿ ಭೇಟಿಯ ಸಮಯಕ್ಕಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ')
                        : currentApp.overallStatus
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Applicant & Property info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-left">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">{t.tracker.primaryApplicant}</span>
                  <span className="text-sm font-semibold text-slate-700 mt-1 block">{currentApp.applicantName}</span>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 text-left">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">{t.tracker.propertyLocation}</span>
                  <span className="text-sm font-semibold text-slate-700 mt-1 block leading-normal line-clamp-1" title={currentApp.propertyAddress}>
                    {currentApp.propertyAddress}
                  </span>
                </div>
              </div>

              {/* Steps timeline */}
              <div className="pt-6 text-left">
                <h4 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-1.5 text-left">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> {t.tracker.workflowTitle}
                </h4>

                <div className="relative pl-6 sm:pl-8 border-l border-slate-850 space-y-8 pb-4 ml-3">
                  {currentApp.steps.map((step) => {
                    const isCompleted = step.status === 'completed';
                    const isInProgress = step.status === 'in_progress';

                    return (
                      <div key={step.id} className="relative">
                        {/* Bullet Marker */}
                        <div className={`absolute -left-[37px] sm:-left-[45px] top-1.5 p-1 rounded-full border bg-slate-900 transition-colors ${
                          isCompleted ? 'border-emerald-500 text-emerald-600 bg-emerald-500/10' :
                          isInProgress ? 'border-amber-500 text-amber-500 bg-amber-500/10' :
                          'border-slate-850 text-slate-400 bg-slate-950'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-5 h-5 shrink-0" /> :
                           isInProgress ? <Clock className="w-5 h-5 shrink-0 animate-spin" /> :
                           <Circle className="w-5 h-5 shrink-0" />}
                        </div>

                        {/* Step details */}
                        <div className="space-y-1.5 text-left">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h5 className={`text-sm font-bold ${
                              isCompleted ? 'text-slate-600' :
                              isInProgress ? 'text-amber-500 font-extrabold' : 'text-slate-400'
                            }`}>
                              Step {step.id}: {step.title}
                            </h5>
                            {step.date && (
                              <span className="text-[10px] font-mono text-slate-500 bg-slate-950 border border-slate-850 px-2 py-0.5 rounded flex items-center w-fit">
                                <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                                {step.date}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed pr-2 text-left">
                            {step.description}
                          </p>
                          {step.remarks && (
                            <div className="text-[11px] font-mono p-2 bg-slate-950 border border-slate-850 rounded-lg text-slate-600 leading-normal text-left">
                              <span className="text-amber-500 font-semibold uppercase text-[9px] mr-1.5">{t.tracker.remarksLabel}</span>
                              {step.remarks}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
