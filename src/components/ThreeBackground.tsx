import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export const ThreeBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Skip loading on mobile devices for performance
    if (isMobile) return;

    let mounted = true;

    const loadScripts = async () => {
      try {
        // Check if scripts are already loaded
        if (window.THREE && window.VANTA) {
          initVanta();
          return;
        }

        // Load Three.js first
        if (!window.THREE) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
            script.onload = () => resolve();
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        // Then load Vanta.js
        if (!window.VANTA) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
            script.onload = () => resolve();
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        // Initialize Vanta effect
        if (mounted) {
          initVanta();
        }
      } catch (error) {
        console.warn('Failed to load background scripts:', error);
      }
    };

    const initVanta = () => {
      if (!vantaRef.current || !window.VANTA || vantaEffect.current) return;

      try {
        // Device-specific configuration
        const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
        const isHighDPI = window.devicePixelRatio > 2;
        
        vantaEffect.current = window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: isTablet ? 0.9 : 1.00,
          scaleMobile: 0.8,
          color: 0x00f5ff,
          backgroundColor: 0x0a0f1c,
          // Adaptive settings based on device
          points: isHighDPI ? 20 : isTablet ? 25 : 30,
          maxDistance: isHighDPI ? 25 : isTablet ? 28 : 30,
          spacing: isHighDPI ? 30 : isTablet ? 27 : 25,
          showDots: true,
        });
      } catch (error) {
        console.warn('Vanta initialization failed:', error);
      }
    };

    loadScripts();

    return () => {
      mounted = false;
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
          vantaEffect.current = null;
        } catch (error) {
          console.warn('Error destroying Vanta effect:', error);
        }
      }
    };
  }, [isMobile]);

  // Mobile fallback with animated network pattern
  if (isMobile) {
    return (
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#00f5ff" opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="80" cy="40" r="1.5" fill="#00f5ff" opacity="0.4">
                  <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="50" cy="70" r="1" fill="#00f5ff" opacity="0.6">
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <line x1="20" y1="20" x2="80" y2="40" stroke="#00f5ff" strokeWidth="0.5" opacity="0.3">
                  <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3.5s" repeatCount="indefinite"/>
                </line>
                <line x1="80" y1="40" x2="50" y2="70" stroke="#00f5ff" strokeWidth="0.5" opacity="0.2">
                  <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4.5s" repeatCount="indefinite"/>
                </line>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#network)" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-10"
      style={{ 
        width: '100%', 
        height: '100%',
        background: 'linear-gradient(135deg, #0a0f1c 0%, #1e293b 50%, #0f172a 100%)'
      }}
    />
  );
};