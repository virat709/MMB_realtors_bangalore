import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import StampDutyCalculator from './components/StampDutyCalculator';
import ApplicationTracker from './components/ApplicationTracker';
import BookingForm from './components/BookingForm';
import LandHub from './components/LandHub';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import ScrollWorldBackground from './components/ScrollWorldBackground';
import { CalculationResult } from './types';
import { ShieldCheck, MapPin, Sparkles, Building2, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [prefilledService, setPrefilledService] = useState('');

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for sticky header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Prefill service callback from Services grid
  const handleSelectService = (serviceName: string) => {
    setPrefilledService(serviceName);
    handleNavigate('booking');
  };

  // Prefill service callback from Stamp Duty Calculator
  const handleEstimateBook = (calcResult: CalculationResult, serviceName: string) => {
    setPrefilledService(serviceName);
    handleNavigate('booking');
  };

  // IntersectionObserver to dynamically change header active states as the user scrolls
  useEffect(() => {
    const sections = ['hero', 'services', 'calculator', 'tracker', 'land-hub', 'booking'];
    const observers = sections.map((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        {
          rootMargin: '-30% 0px -60% 0px' // Adjust bounds for highlight timing
        }
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-700 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      
      {/* 3D Scroll World Background Animation */}
      <ScrollWorldBackground />
      
      {/* Sticky Navigation Header */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Sections Wrapper */}
      <main className="relative">
        
        {/* 1. Hero Section (with built-in Bangalore background) */}
        <Hero onNavigate={handleNavigate} />

        {/* 2. Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* 4. Interactive Stamp Duty & Registry Fee Calculator */}
        <StampDutyCalculator onEstimateBook={handleEstimateBook} />

        {/* 6. Live Interactive SRO/BBMP Progress Tracker */}
        <ApplicationTracker />

        {/* 8. Land Hub for registering Land Buy and Sell demands */}
        <LandHub />

        {/* 9. Booking Form / Consultation Appointment Portal */}
        <BookingForm 
          prefilledService={prefilledService} 
          onClearPrefilled={() => setPrefilledService('')} 
        />

      </main>

      {/* Footer Section with offices, coordinates and Kaveri links */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Button for WhatsApp Support */}
      <WhatsAppFAB />

    </div>
  );
}
