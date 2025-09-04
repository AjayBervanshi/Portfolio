import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { NetworkBackground } from './NetworkBackground';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export const EnhancedThreeBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  
  const isMobile = useIsMobile();
  const { isHighEnd, isLowEnd, preferReducedMotion, connectionSpeed } = usePerformanceOptimization();

  // Determine best rendering approach
  const shouldUseVanta = !isMobile && !isLowEnd && connectionSpeed !== 'slow' && !preferReducedMotion;
  const shouldUseFallback = isMobile || isLowEnd || preferReducedMotion || connectionSpeed === 'slow';

  useEffect(() => {
    if (shouldUseFallback) {
      setFallbackMode(true);
      setIsLoaded(true);
      return;
    }

    if (!shouldUseVanta) return;

    let mounted = true;
    let loadTimeout: NodeJS.Timeout;

    const loadScripts = async () => {
      try {
        // Set loading timeout
        loadTimeout = setTimeout(() => {
          if (mounted) {
            console.warn('Vanta loading timeout, switching to fallback');
            setFallbackMode(true);
            setIsLoaded(true);
          }
        }, 5000);

        // Check if scripts are already loaded
        if (window.THREE && window.VANTA) {
          clearTimeout(loadTimeout);
          initVanta();
          return;
        }

        // Load Three.js with performance optimization
        if (!window.THREE) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
            script.async = true;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Three.js'));
            document.head.appendChild(script);
          });
        }

        // Load Vanta.js with error handling
        if (!window.VANTA) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
            script.async = true;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Vanta.js'));
            document.head.appendChild(script);
          });
        }

        if (mounted) {
          clearTimeout(loadTimeout);
          initVanta();
        }
      } catch (error) {
        console.warn('Failed to load Vanta scripts, using fallback:', error);
        if (mounted) {
          clearTimeout(loadTimeout);
          setFallbackMode(true);
          setIsLoaded(true);
        }
      }
    };

    const initVanta = () => {
      if (!vantaRef.current || !window.VANTA || vantaEffect.current || !mounted) return;

      try {
        // Performance-optimized configuration
        const config = {
          el: vantaRef.current,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x00f5ff,
          backgroundColor: 0x0a0f1c,
          // Adaptive settings based on device performance
          points: isHighEnd ? 35 : 25,
          maxDistance: isHighEnd ? 35 : 30,
          spacing: isHighEnd ? 20 : 25,
          showDots: true,
          // Performance optimizations
          forceAnimate: false,
          animationSpeed: 0.5,
          size: 1.0
        };

        vantaEffect.current = window.VANTA.NET(config);
        setIsLoaded(true);
        
        // Optimize performance after initialization
        setTimeout(() => {
          if (vantaEffect.current && vantaEffect.current.renderer) {
            vantaEffect.current.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }
        }, 100);
      } catch (error) {
        console.warn('Vanta initialization failed, using fallback:', error);
        setFallbackMode(true);
        setIsLoaded(true);
      }
    };

    loadScripts();

    return () => {
      mounted = false;
      if (loadTimeout) clearTimeout(loadTimeout);
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
          vantaEffect.current = null;
        } catch (error) {
          console.warn('Error destroying Vanta effect:', error);
        }
      }
    };
  }, [shouldUseVanta, shouldUseFallback, isHighEnd]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(135deg, hsl(var(--background)) 0%, #1e293b 50%, #0f172a 100%)'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse text-cyan-400 text-sm">Loading...</div>
        </div>
      </div>
    );
  }

  // Fallback mode with enhanced network background
  if (fallbackMode) {
    return (
      <div className="fixed inset-0 -z-10">
        <NetworkBackground 
          interactive={!preferReducedMotion && !isLowEnd}
          quality={isHighEnd ? 'high' : isMobile ? 'low' : 'medium'}
        />
      </div>
    );
  }

  // Vanta mode
  return (
    <div className="fixed inset-0 -z-10">
      <div 
        ref={vantaRef} 
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: 'linear-gradient(135deg, hsl(var(--background)) 0%, #1e293b 50%, #0f172a 100%)'
        }}
      />
      {/* Fallback overlay in case Vanta fails */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-1000"
        style={{ 
          opacity: isLoaded && !vantaEffect.current ? 1 : 0,
          pointerEvents: 'none'
        }}
      >
        <NetworkBackground 
          interactive={false}
          quality="low"
        />
      </div>
    </div>
  );
};