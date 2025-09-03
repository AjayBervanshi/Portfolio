import { useEffect, useState } from 'react';

interface DeviceCapabilities {
  isHighEnd: boolean;
  isLowEnd: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
  preferReducedMotion: boolean;
  devicePixelRatio: number;
  hardwareConcurrency: number;
}

export function usePerformanceOptimization(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isHighEnd: false,
    isLowEnd: false,
    connectionSpeed: 'unknown',
    preferReducedMotion: false,
    devicePixelRatio: 1,
    hardwareConcurrency: 1,
  });

  useEffect(() => {
    const hardwareConcurrency = navigator.hardwareConcurrency || 1;
    const devicePixelRatio = window.devicePixelRatio || 1;
    const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Detect device performance
    const isHighEnd = hardwareConcurrency >= 8 && devicePixelRatio <= 2;
    const isLowEnd = hardwareConcurrency <= 2 || devicePixelRatio > 2;

    // Detect connection speed
    let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        connectionSpeed = connection.effectiveType === '4g' || connection.effectiveType === '3g' ? 'fast' : 'slow';
      }
    }

    setCapabilities({
      isHighEnd,
      isLowEnd,
      connectionSpeed,
      preferReducedMotion,
      devicePixelRatio,
      hardwareConcurrency,
    });
  }, []);

  return capabilities;
}