import { useState, useEffect, useRef, ReactNode } from 'react';
import { Compass, Map, Layers, HelpCircle, Shield, FileCheck, MapPin, Eye, EyeOff } from 'lucide-react';

interface FloatingElement {
  id: string;
  label: string;
  icon?: ReactNode;
  x: string; // Percentage from center, e.g., "-35%", "40%"
  y: string; // Percentage from center, e.g., "-20%", "30%"
  z: number; // Z-coordinate depth (negative pixels)
  type: 'badge' | 'card' | 'grid' | 'text' | 'radar';
  detail?: string;
  isKannada?: boolean;
}

export default function ScrollWorldBackground() {
  const [scrollZ, setScrollZ] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [intensity, setIntensity] = useState<'high' | 'subtle' | 'none'>('high');
  const targetScrollZ = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // 3D layers data centered around Bangalore land, real estate, and legal compliance
  const elements: FloatingElement[] = [
    // LAYER 1: Close Depth (z = -300 to -500px)
    {
      id: 'gps-badge',
      label: 'BANGALORE METRO REGION',
      detail: '12.9716° N, 77.5946° E',
      icon: <MapPin className="w-4 h-4 text-amber-400" />,
      x: '38%',
      y: '15%',
      z: -400,
      type: 'badge'
    },
    {
      id: 'survey-boundary',
      label: 'SURVEY BOUNDARY GRID',
      detail: 'Sy No. 142/3A - Jayanagar Hobli',
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      x: '-35%',
      y: '-25%',
      z: -500,
      type: 'card'
    },

    // LAYER 2: Medium-Close Depth (z = -800 to -1000px)
    {
      id: 'kannada-logo',
      label: 'ಭೂಮಿ ಮತ್ತು ಆಸ್ತಿ ನೋಂದಣಿ',
      detail: 'Bhoomi Land Records System',
      x: '-38%',
      y: '25%',
      z: -900,
      type: 'text',
      isKannada: true
    },
    {
      id: 'rera-card',
      label: 'K-RERA COMPLIANT PLOTS',
      detail: 'Karnataka Real Estate Regulatory Authority',
      icon: <Shield className="w-4 h-4 text-blue-400" />,
      x: '35%',
      y: '-30%',
      z: -950,
      type: 'card'
    },

    // LAYER 3: Mid Depth (z = -1300 to -1500px)
    {
      id: 'compass-dial',
      label: 'LAND ALIGNMENT ANGLE',
      detail: 'North-East Facing (Vastu Verified)',
      icon: <Compass className="w-5 h-5 text-amber-500" />,
      x: '-42%',
      y: '-10%',
      z: -1400,
      type: 'badge'
    },
    {
      id: 'checklist-card',
      label: 'KAVERI 2.0 PORTAL',
      detail: 'Auto-Calculated SRO Surcharges',
      icon: <FileCheck className="w-4 h-4 text-amber-400" />,
      x: '38%',
      y: '20%',
      z: -1450,
      type: 'card'
    },

    // LAYER 4: Deep Depth (z = -1800 to -2000px)
    {
      id: 'dimension-grid',
      label: 'STANDARD PLOT DIMENSIONS',
      detail: '30x40 | 40x60 | 50x80 SqFt',
      x: '-35%',
      y: '35%',
      z: -1900,
      type: 'grid'
    },
    {
      id: 'locality-network',
      label: 'HIGH-DEMAND LOCALITIES',
      detail: 'Sarjapur • Whitefield • Hebbal • Devanahalli',
      x: '32%',
      y: '-25%',
      z: -1950,
      type: 'text'
    },

    // LAYER 5: Very Deep Depth (z = -2300 to -2500px)
    {
      id: 'central-radar',
      label: 'GEOSPATIAL CADASTRAL SURVEY MAP',
      detail: 'KAVERI GEOSPATIAL DATABASE ENGINE',
      x: '0%',
      y: '-5%',
      z: -2400,
      type: 'radar'
    },
    {
      id: 'kannada-bottom',
      label: 'ದಾಖಲೆ ಪರಿಶೀಲನೆ ಪೂರ್ಣ',
      detail: '100% Legal Clearance Verification',
      x: '-25%',
      y: '-35%',
      z: -2450,
      type: 'text',
      isKannada: true
    }
  ];

  // Particle background for starry world effect
  const starsRef = useRef<{ x: number; y: number; z: number; size: number }[]>([]);
  if (starsRef.current.length === 0) {
    starsRef.current = Array.from({ length: 120 }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 1500,
      z: -Math.random() * 3000 - 200,
      size: Math.random() * 1.5 + 0.5
    }));
  }

  // Smooth scroll interpolation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = docHeight > 0 ? scrollTop / docHeight : 0;
      
      // Map scroll progress to travel up to -2800px into Z-depth
      targetScrollZ.current = scrollPct * 2600;
    };

    const animate = () => {
      // Lerp (Linear Interpolation) for smooth 3D scroll movement
      setScrollZ((prev) => {
        const diff = targetScrollZ.current - prev;
        const speed = 0.08; // Smoothness factor
        if (Math.abs(diff) < 0.1) return targetScrollZ.current;
        return prev + diff * speed;
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Mouse Parallax Effect on X & Y axes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 20; // max 20px offset
      const yPct = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x: xPct, y: yPct });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (intensity === 'none') return (
    <div className="fixed bottom-4 left-4 z-50 pointer-events-auto">
      <button
        onClick={() => setIntensity('high')}
        className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-full text-[10px] font-bold text-slate-400 hover:text-amber-400 font-mono transition-all cursor-pointer backdrop-blur-sm"
        title="Enable 3D Scroll World Background"
      >
        <Eye className="w-3.5 h-3.5" />
        <span>3D Background: Off</span>
      </button>
    </div>
  );

  return (
    <>
      {/* Absolute 3D viewport covering the document */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        style={{ 
          perspective: '1000px', 
          perspectiveOrigin: '50% 50%' 
        }}
      >
        {/* The 3D World Container */}
        <div 
          className="absolute inset-0 transition-transform duration-75 ease-out" 
          style={{ 
            transformStyle: 'preserve-3d', 
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, ${scrollZ}px)` 
          }}
        >
          {/* 1. Starfield / Particles */}
          {starsRef.current.map((star, idx) => {
            // Fade particles out when they fly very close to the screen (Z > -100)
            const currentDepth = star.z + scrollZ;
            const isFaded = currentDepth > -150;
            const opacity = isFaded ? Math.max(0, 1 - (currentDepth + 150) / 150) * 0.35 : 0.35;

            return (
              <div
                key={`star-${idx}`}
                className="absolute bg-amber-400/80 rounded-full blur-[0.5px]"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  left: `calc(50% + ${star.x}px)`,
                  top: `calc(50% + ${star.y}px)`,
                  transform: `translate3d(-50%, -50%, ${star.z}px)`,
                  opacity: intensity === 'subtle' ? opacity * 0.3 : opacity,
                  transition: 'opacity 0.2s ease-out'
                }}
              />
            );
          })}

          {/* 2. Structured 3D Floating Layers */}
          {elements.map((el) => {
            const depthThreshold = el.z + scrollZ;
            // Hide element if it is fully behind the user's camera (Z > 0)
            if (depthThreshold > 100) return null;

            // Fade out when close to screen to prevent sudden clipping
            let opacity = 1;
            if (depthThreshold > -200) {
              opacity = Math.max(0, 1 - (depthThreshold + 200) / 300);
            } else if (depthThreshold < -2400) {
              // Fade out very deep elements as they are in the distance
              opacity = Math.max(0, (3000 + depthThreshold) / 600);
            }

            // Adjust opacity depending on the intensity setting chosen by user
            const finalOpacity = intensity === 'subtle' ? opacity * 0.2 : opacity * 0.65;

            return (
              <div
                key={el.id}
                className="absolute select-none pointer-events-none transition-all duration-300"
                style={{
                  left: `calc(50% + ${el.x})`,
                  top: `calc(50% + ${el.y})`,
                  transform: `translate3d(-50%, -50%, ${el.z}px)`,
                  opacity: finalOpacity,
                }}
              >
                {/* Visual representation based on type */}
                {el.type === 'badge' && (
                  <div className="flex items-center space-x-2 bg-slate-950/90 border border-amber-500/20 px-3 py-1.5 rounded-full shadow-lg shadow-black/80">
                    {el.icon}
                    <div className="text-left font-mono">
                      <div className="text-[10px] font-bold text-amber-400 tracking-wider whitespace-nowrap">{el.label}</div>
                      {el.detail && <div className="text-[8px] text-slate-500 leading-none whitespace-nowrap mt-0.5">{el.detail}</div>}
                    </div>
                  </div>
                )}

                {el.type === 'card' && (
                  <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl shadow-xl shadow-black/80 max-w-[200px] text-left">
                    <div className="flex items-center space-x-2 text-amber-400 mb-1.5">
                      {el.icon}
                      <span className="text-[9px] font-bold font-mono tracking-wider">{el.label}</span>
                    </div>
                    {el.detail && <p className="text-[9px] text-slate-400 leading-relaxed font-sans">{el.detail}</p>}
                    <div className="mt-2 flex space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[7px] text-slate-500 uppercase font-mono tracking-widest">LIVE SECURE</span>
                    </div>
                  </div>
                )}

                {el.type === 'text' && (
                  <div className="text-left max-w-[220px]">
                    <div className={`font-black text-slate-500/80 tracking-wide ${el.isKannada ? 'text-lg font-bold text-amber-500/30' : 'text-sm font-mono'}`}>
                      {el.label}
                    </div>
                    {el.detail && <div className="text-[8px] text-slate-600 font-mono mt-1">{el.detail}</div>}
                  </div>
                )}

                {el.type === 'grid' && (
                  <div className="flex flex-col p-3 bg-slate-950/60 border border-slate-850/60 rounded-xl max-w-[150px] text-left">
                    <span className="text-[8px] text-slate-500 font-mono tracking-widest uppercase mb-1">PLOT SPATIALS</span>
                    <span className="text-xs font-bold text-slate-400 font-mono">{el.label}</span>
                    <span className="text-[9px] text-emerald-500/70 font-mono mt-0.5">{el.detail}</span>
                    <div className="mt-2 w-full h-[1px] bg-slate-800/50" />
                    <div className="mt-1.5 flex justify-between text-[7px] text-slate-600 font-mono">
                      <span>X: 12.92</span>
                      <span>Y: 77.61</span>
                    </div>
                  </div>
                )}

                {el.type === 'radar' && (
                  <div className="relative w-80 h-80 rounded-full border border-amber-500/10 flex items-center justify-center">
                    {/* Concentric helper rings */}
                    <div className="absolute w-60 h-60 rounded-full border border-amber-500/5" />
                    <div className="absolute w-40 h-40 rounded-full border border-amber-500/5" />
                    <div className="absolute w-20 h-20 rounded-full border border-amber-500/10" />
                    {/* Rotating sweeping effect */}
                    <div className="absolute inset-0 rounded-full bg-conic-sweep from-amber-500/5 via-transparent to-transparent animate-spin duration-[10s]" />
                    {/* Text overlays */}
                    <div className="z-10 text-center font-mono select-none px-4 max-w-[180px]">
                      <div className="text-[9px] text-amber-500/40 font-bold tracking-widest leading-normal">{el.label}</div>
                      <div className="text-[7px] text-slate-600 tracking-wider leading-none mt-1">{el.detail}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating control widget in bottom-left to toggle 3D background visual styles */}
      <div className="fixed bottom-4 left-4 z-50 pointer-events-auto flex items-center bg-slate-900/80 border border-slate-850 rounded-full p-1 shadow-lg shadow-black/50 backdrop-blur-sm">
        <button
          onClick={() => setIntensity('high')}
          className={`px-3 py-1.5 rounded-full text-[9px] font-bold font-mono tracking-wider transition-all cursor-pointer ${
            intensity === 'high' 
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Full depth 3D Scroll World"
        >
          3D High
        </button>
        <button
          onClick={() => setIntensity('subtle')}
          className={`px-3 py-1.5 rounded-full text-[9px] font-bold font-mono tracking-wider transition-all cursor-pointer ${
            intensity === 'subtle' 
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Faded 3D scroll background"
        >
          Subtle
        </button>
        <button
          onClick={() => setIntensity('none')}
          className="p-1.5 text-slate-500 hover:text-slate-300 rounded-full transition-all cursor-pointer"
          title="Turn off 3D Background"
        >
          <EyeOff className="w-3.5 h-3.5" />
        </button>
      </div>
    </>
  );
}
