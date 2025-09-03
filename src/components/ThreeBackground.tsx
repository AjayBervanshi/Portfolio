import { useEffect, useRef, useCallback, useMemo } from 'react';
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
  const scriptsLoaded = useRef({ three: false, vanta: false });
  const isMobile = useIsMobile();

  // Optimized configuration based on device capabilities
  const vantaConfig = useMemo(() => {
    const isHighEnd = !isMobile && window.navigator.hardwareConcurrency > 4;
    const isLowEnd = isMobile || window.navigator.hardwareConcurrency <= 2;
    
    return {
      el: vantaRef.current,
      mouseControls: true,
      touchControls: !isMobile, // Disable touch controls on mobile for better performance
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 0.8, // Reduce scale on mobile
      color: 0x00f5ff,
      backgroundColor: 0x0a0f1c,
      // Dynamic performance settings
      points: isHighEnd ? 35 : isLowEnd ? 15 : 25,
      maxDistance: isHighEnd ? 35 : isLowEnd ? 20 : 25,
      spacing: isHighEnd ? 20 : isLowEnd ? 30 : 25,
      showDots: !isLowEnd, // Hide dots on low-end devices
      forceAnimate: false, // Let the system decide
      fps: isHighEnd ? 60 : 30, // Adaptive FPS
    };
  }, [isMobile]);

  const initializeVanta = useCallback(() => {
    if (vantaRef.current && window.VANTA && !vantaEffect.current) {
      try {
        vantaEffect.current = window.VANTA.NET(vantaConfig);
        
        // Performance optimization: Reduce quality on slower devices
        if (vantaEffect.current && vantaEffect.current.renderer) {
          const renderer = vantaEffect.current.renderer;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          renderer.powerPreference = "default";
        }
      } catch (error) {
        console.warn('Vanta.js initialization failed:', error);
      }
    }
  }, [vantaConfig]);

  const loadScript = useCallback((src: string, key: 'three' | 'vanta'): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (scriptsLoaded.current[key]) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        scriptsLoaded.current[key] = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => {
        scriptsLoaded.current[key] = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let mounted = true;

    const initBackground = async () => {
      try {
        // Use requestIdleCallback for non-critical loading
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(async () => {
            if (!mounted) return;
            
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js', 'three');
            if (!mounted) return;
            
            await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js', 'vanta');
            if (!mounted) return;
            
            // Small delay to ensure DOM is ready
            requestAnimationFrame(() => {
              if (mounted) initializeVanta();
            });
          });
        } else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(async () => {
            if (!mounted) return;
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js', 'three');
            if (!mounted) return;
            await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js', 'vanta');
            if (!mounted) return;
            requestAnimationFrame(() => {
              if (mounted) initializeVanta();
            });
          }, 100);
        }
      } catch (error) {
        console.warn('Failed to load background scripts:', error);
      }
    };

    initBackground();

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
  }, [isMobile, loadScript, initializeVanta]);

  // Enhanced fallback for mobile and low-end devices
  if (isMobile) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(0,245,255,0.02)_50%,_transparent_75%)] bg-[length:60px_60px] animate-pulse"></div>
      </div>
    );
  }

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-10 transition-opacity duration-1000"
      style={{ 
        width: '100%', 
        height: '100%',
        background: 'linear-gradient(135deg, #0a0f1c 0%, #1e293b 50%, #0f172a 100%)'
      }}
    />
  );
};