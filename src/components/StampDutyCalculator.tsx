import { useState, useEffect } from 'react';
import { PropertyType, BBMPZone, CalculationResult } from '../types';
import { IndianRupee, Calculator, ShieldAlert, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StampDutyCalculatorProps {
  onEstimateBook: (result: CalculationResult, serviceName: string) => void;
}

export default function StampDutyCalculator({ onEstimateBook }: StampDutyCalculatorProps) {
  const [propertyValue, setPropertyValue] = useState<number>(7500000); // 75 Lakhs default
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [bbmpZone, setBbmpZone] = useState<BBMPZone>('bbmp');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const { t } = useLanguage();

  // Constants for calculation
  const getServiceFee = (type: PropertyType): number => {
    switch (type) {
      case 'apartment': return 14999;
      case 'independent': return 19999;
      case 'villa': return 24999;
      case 'plot': return 11999;
    }
  };

  useEffect(() => {
    // Karnataka standard Stamp duty: 5.0% base
    const stampDutyRate = 0.05; 
    const baseStampDuty = propertyValue * stampDutyRate;

    // Karnataka Registration fee: 1.0% of property value
    const registrationFeeRate = 0.01;
    const registrationFeeAmount = propertyValue * registrationFeeRate;

    let surchargeAmount = 0;
    let cessAmount = 0;

    if (bbmpZone === 'bbmp') {
      // BBMP Area: 2% Surcharge on Stamp Duty, 10% Infrastructure & Library Cess on Stamp Duty
      surchargeAmount = baseStampDuty * 0.02; // 0.1% effective
      cessAmount = baseStampDuty * 0.10; // 0.5% effective
    } else if (bbmpZone === 'bda_bmrda') {
      // BDA / BMRDA limits: 3% Cess on Stamp Duty, 10% Infra Cess on Stamp Duty
      surchargeAmount = baseStampDuty * 0.03; // 0.15% effective
      cessAmount = baseStampDuty * 0.10; // 0.5% effective
    } else {
      // Panchayat / Rural limits: 10% Infra Cess on Stamp Duty (No urban surcharge)
      surchargeAmount = 0;
      cessAmount = baseStampDuty * 0.10; // 0.5% effective
    }

    const stampDutyAmount = baseStampDuty;
    const serviceFee = getServiceFee(propertyType);
    const totalGovtFees = stampDutyAmount + registrationFeeAmount + surchargeAmount + cessAmount;
    const totalEstimatedCost = totalGovtFees + serviceFee;

    setResult({
      propertyValue,
      stampDutyRate,
      stampDutyAmount,
      registrationFeeRate,
      registrationFeeAmount,
      surchargeAmount,
      cessAmount,
      serviceFee,
      totalGovtFees,
      totalEstimatedCost
    });
  }, [propertyValue, propertyType, bbmpZone]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatLakhsOrCrores = (val: number) => {
    if (val >= 10000000) {
      return `${(val / 10000000).toFixed(2)} ${t.calculator.crores}`;
    }
    return `${(val / 100000).toFixed(1)} ${t.calculator.lakhs}`;
  };

  const formattedValueLabel = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} ${t.calculator.crores}`;
    }
    return `₹${(val / 100000).toFixed(0)} ${t.calculator.lakhs}`;
  };

  return (
    <section id="calculator" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 font-mono uppercase tracking-wider">
            <span>{t.calculator.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.calculator.title}
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Calculator Widget Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Controls - Left (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 text-left">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-400" />
                {t.calculator.configureTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{t.calculator.configureDesc}</p>
            </div>

            {/* Property Value Slider & Number Input */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-sm font-semibold text-slate-300">{t.calculator.guidanceLabel}</label>
                <div className="flex items-center space-x-2">
                  <div className="relative rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 flex items-center">
                    <span className="text-slate-500 text-xs mr-1 font-mono">₹</span>
                    <input 
                      type="number" 
                      value={propertyValue} 
                      onChange={(e) => setPropertyValue(Math.max(100000, Number(e.target.value)))}
                      className="bg-transparent font-mono text-white text-sm font-bold focus:outline-none w-28 sm:w-36 text-right"
                    />
                  </div>
                  <span className="text-xs font-bold font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded">
                    {formatLakhsOrCrores(propertyValue)}
                  </span>
                </div>
              </div>

              {/* Slider */}
              <div className="pt-2">
                <input 
                  type="range" 
                  min="500000" 
                  max="50000000" 
                  step="100000"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>{formattedValueLabel(500000)}</span>
                  <span>{formattedValueLabel(12500000)}</span>
                  <span>{formattedValueLabel(25000000)}</span>
                  <span>{formattedValueLabel(37500000)}</span>
                  <span>{formattedValueLabel(50000000)}</span>
                </div>
              </div>
            </div>

            {/* Property Type Grid Selector */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300 block">{t.calculator.categoryLabel}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'apartment', label: t.calculator.categories.apartment },
                  { id: 'independent', label: t.calculator.categories.independent },
                  { id: 'plot', label: t.calculator.categories.plot },
                  { id: 'villa', label: t.calculator.categories.villa }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPropertyType(item.id as PropertyType)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                      propertyType === item.id
                        ? 'border-amber-400 bg-amber-500/10 text-amber-400 font-extrabold'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* BBMP / Registrar Zone Selector */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300 block">{t.calculator.locationLabel}</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'bbmp', label: t.calculator.locations.bbmp.label, desc: t.calculator.locations.bbmp.desc },
                  { id: 'bda_bmrda', label: t.calculator.locations.bda_bmrda.label, desc: t.calculator.locations.bda_bmrda.desc },
                  { id: 'panchayat_rural', label: t.calculator.locations.panchayat_rural.label, desc: t.calculator.locations.panchayat_rural.desc }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setBbmpZone(item.id as BBMPZone)}
                    className={`p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between h-24 ${
                      bbmpZone === item.id
                        ? 'border-amber-400 bg-amber-500/10 text-amber-400'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-black block leading-tight">{item.label}</span>
                    <span className="text-[10px] text-slate-400 mt-1 block">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Guidance value advisory */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-start space-x-3 text-xs text-slate-400 leading-relaxed">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block mb-0.5">{t.calculator.guidanceRuleTitle}</span>
                {t.calculator.guidanceRuleDesc}
              </div>
            </div>
          </div>

          {/* cost breakdown - Right (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {result && (
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                
                {/* Header */}
                <div className="text-left pb-4 border-b border-slate-800">
                  <span className="text-[10px] font-mono tracking-wider text-amber-400 font-semibold uppercase flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {t.calculator.kaveriCostHeader}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1">{t.calculator.estimateTitle}</h4>
                </div>
 
                {/* Main Estimated Cost Big Display */}
                <div className="py-6 text-left">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">{t.calculator.totalEstimatedCost}</span>
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight block mt-1">
                    {formatCurrency(result.totalEstimatedCost)}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">
                    {t.calculator.govFees}: {formatCurrency(result.totalGovtFees)} | {t.calculator.serviceFees}: {formatCurrency(result.serviceFee)}
                  </p>
                </div>

                {/* Detailed Fees Breakdown */}
                <div className="space-y-3.5 border-t border-slate-800/80 pt-5 text-sm">
                  {/* Base Stamp Duty */}
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="flex items-center gap-1.5">
                      {t.calculator.baseStampDuty} <span className="text-[10px] font-mono font-bold text-slate-500">(5.0%)</span>
                    </span>
                    <span className="font-mono text-white text-xs">{formatCurrency(result.stampDutyAmount)}</span>
                  </div>

                  {/* Surcharges & Cess */}
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="flex items-center gap-1.5">
                      {t.calculator.infraCess} <span className="text-[10px] font-mono font-bold text-slate-500">(10% of SD)</span>
                    </span>
                    <span className="font-mono text-white text-xs">{formatCurrency(result.cessAmount)}</span>
                  </div>

                  {bbmpZone !== 'panchayat_rural' && (
                    <div className="flex justify-between items-center text-slate-400">
                      <span className="flex items-center gap-1.5">
                        {t.calculator.urbanSurcharge} <span className="text-[10px] font-mono font-bold text-slate-500">({bbmpZone === 'bbmp' ? '2%' : '3%'} of SD)</span>
                      </span>
                      <span className="font-mono text-white text-xs">{formatCurrency(result.surchargeAmount)}</span>
                    </div>
                  )}

                  {/* Registration Fee */}
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="flex items-center gap-1.5">
                      {t.calculator.registrationCharge} <span className="text-[10px] font-mono font-bold text-slate-500">(1.0%)</span>
                    </span>
                    <span className="font-mono text-white text-xs">{formatCurrency(result.registrationFeeAmount)}</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-slate-800 my-1" />

                  {/* Service Charge */}
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="flex items-center font-semibold text-amber-400">
                      {t.calculator.flatLegalFee}
                    </span>
                    <span className="font-mono text-amber-400 font-bold text-xs">{formatCurrency(result.serviceFee)}</span>
                  </div>
                </div>

                {/* Sub-note */}
                <p className="text-[10px] text-slate-500 text-left leading-relaxed mt-6 font-mono">
                  {t.calculator.disclaimer}
                </p>

                {/* CTA */}
                <button
                  onClick={() => onEstimateBook(result, `${propertyType.toUpperCase()} Registry Assistance (Value: ${formatLakhsOrCrores(propertyValue)})`)}
                  className="w-full mt-6 py-4 rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-95"
                >
                  {t.calculator.ctaButton}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Trust badge card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-left flex items-start space-x-3.5">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-white font-bold text-xs uppercase tracking-wider font-mono">{t.calculator.escrowTitle}</h5>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  {t.calculator.escrowDesc}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
