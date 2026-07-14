import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppFAB() {
  const [showTooltip, setShowTooltip] = useState(false);

  // Auto-show tooltip after 2.5 seconds to catch attention elegantly
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user has previously dismissed the tooltip in this session
      const dismissed = sessionStorage.getItem('mmb_wa_tooltip_dismissed');
      if (!dismissed) {
        setShowTooltip(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
    sessionStorage.setItem('mmb_wa_tooltip_dismissed', 'true');
  };

  const whatsappUrl = "https://wa.me/916366310992?text=Hello%20MMB%20Realtors%2C%20I%20have%20an%20inquiry%20regarding%20property%20services.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Tooltip speech bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mb-3 max-w-xs bg-slate-900 text-white rounded-2xl p-3.5 shadow-2xl border border-emerald-500/20 relative pointer-events-auto flex items-start gap-2.5"
            style={{ filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.4))' }}
          >
            {/* WhatsApp avatar accent indicator */}
            <div className="relative flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900" />
            </div>

            <div className="flex-1">
              <p className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Quick Inquiry</p>
              <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
                Need urgent assistance? Chat with an MMB specialist on WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-[11px] font-bold text-amber-400 hover:text-amber-300 mt-2 transition-colors gap-0.5"
              >
                Start Chat Now &rarr;
              </a>
            </div>

            <button
              onClick={handleDismiss}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              aria-label="Close message"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Little pointing arrow pointing down */}
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-slate-900 border-r border-b border-emerald-500/20 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-emerald-950/40 relative group pointer-events-auto cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        {/* Glowing pulsing outer ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 group-hover:scale-125 transition-transform duration-500 animate-ping pointer-events-none" />
        
        {/* WhatsApp Icon wrapper */}
        <MessageCircle className="w-7 h-7 text-white fill-white/10 relative z-10 transition-transform duration-300 group-hover:rotate-12" />

        {/* Hover label for desktop */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-800 text-white text-[11px] font-mono font-bold tracking-tight px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
          +91 63663 10992
        </span>
      </motion.a>
    </div>
  );
}
