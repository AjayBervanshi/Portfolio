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
    if (!isMobile) {
      // Load Three.js
      const threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
      threeScript.onload = () => {
        // Load Vanta.js NET after Three.js loads
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
        vantaScript.onload = () => {
          if (vantaRef.current && window.VANTA) {
            vantaEffect.current = window.VANTA.NET({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x00f5ff,
              backgroundColor: 0x0a0f1c,
              points: 30,
              maxDistance: 30,
              spacing: 25,
              showDots: true,
            });
          }
        };
        document.head.appendChild(vantaScript);
      };
      document.head.appendChild(threeScript);
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-10"
      style={{ width: '100%', height: '100%' }}
    />
  );
};