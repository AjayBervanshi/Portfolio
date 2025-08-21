import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export const ThreeBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
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
            // Tech blue theme for database admin
            color: 0x00d4ff, // Cyber blue
            backgroundColor: 0x0a0f1c, // Dark tech blue
            // Enhanced network configuration
            points: 20, // More points for complex network
            maxDistance: 30, // Better connectivity
            spacing: 25, // Better distribution
            showDots: true, // Show connection points
            // Enhanced tech features
            nodeSize: 2.5, // Perfect node size
            lineWidth: 1.8, // Thicker connection lines
            // Animation settings for automatic movement
            animationSpeed: 1.5, // Faster for more dynamic feel
            // Performance optimizations
            maxPoints: 50, // More complex network
            // Enhanced interactive features
            mouseEase: true, // Smooth mouse interaction
            // Auto-movement enhancements
            forceAnimate: true, // Force continuous animation
            // Cursor reactivity
            mouseControls: true, // Enhanced mouse control
            touchControls: true, // Touch support
            // Network movement
            autoRotate: true, // Automatic rotation
            autoRotateSpeed: 0.5, // Slow rotation speed
            // Visual effects
            connectionOpacity: 0.9, // More visible connections
            nodeOpacity: 1.0, // Fully visible nodes
            // Color variations
            colorMode: 'variance', // Subtle color variations
            // Responsive design
            responsive: true, // Adapts to screen size
            // Additional movement
            waveSpeed: 0.3, // Wave-like movement
            waveHeight: 0.2, // Subtle wave height
          });
        }
      };
      document.head.appendChild(vantaScript);
    };
    document.head.appendChild(threeScript);

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-10"
      style={{ width: '100%', height: '100%' }}
    />
  );
};