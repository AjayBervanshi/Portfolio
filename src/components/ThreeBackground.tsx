import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

interface NetworkNode {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  brightness: number;
  targetBrightness: number;
  connections: number[];
  pulse: number;
  type: 'primary' | 'secondary' | 'accent';
  lastInteraction: number;
}

export const ThreeBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vantaEffect = useRef<any>(null);
  const nodesRef = useRef<NetworkNode[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef<{ x: number; y: number; isNear: boolean; timeout?: NodeJS.Timeout }>({ x: 0, y: 0, isNear: false });
  const performanceRef = useRef({ frameCount: 0, lastFpsCheck: Date.now(), fps: 60 });
  
  const isMobile = useIsMobile();
  const { isHighEnd, isLowEnd, preferReducedMotion, connectionSpeed } = usePerformanceOptimization();

  // Adaptive configuration based on device capabilities
  const config = useMemo(() => {
    const baseConfigs = {
      vanta: {
        high: { points: 55, maxDistance: 50, spacing: 20, fps: 60 },
        medium: { points: 40, maxDistance: 40, spacing: 25, fps: 60 },
        low: { points: 25, maxDistance: 30, spacing: 30, fps: 30 }
      },
      canvas: {
        high: { nodeCount: 70, connectionDistance: 300, interactionRadius: 250 },
        medium: { nodeCount: 50, connectionDistance: 250, interactionRadius: 200 },
        low: { nodeCount: 35, connectionDistance: 200, interactionRadius: 160 }
      }
    };

    let quality: 'high' | 'medium' | 'low' = 'medium';
    if (isLowEnd || connectionSpeed === 'slow') quality = 'low';
    else if (isHighEnd && connectionSpeed === 'fast') quality = 'high';

    const useVanta = !isMobile && !isLowEnd && !preferReducedMotion && connectionSpeed !== 'slow';
    
    return {
      useVanta,
      quality,
      vanta: baseConfigs.vanta[quality],
      canvas: baseConfigs.canvas[quality],
      fps: preferReducedMotion ? 15 : baseConfigs.vanta[quality].fps
    };
  }, [isMobile, isHighEnd, isLowEnd, preferReducedMotion, connectionSpeed]);

  // Initialize canvas-based network with center-point distribution
  const initializeNodes = useCallback((width: number, height: number) => {
    const nodes: NetworkNode[] = [];
    const { nodeCount } = config.canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Create center node first
    nodes.push({
      id: 0,
      x: centerX,
      y: centerY,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      size: 6, // Larger center node
      brightness: 1,
      targetBrightness: 1,
      connections: [],
      pulse: 0,
      type: 'primary',
      lastInteraction: 0
    });
    
    // Create concentric rings expanding outward from center
    const rings = 4;
    const nodesPerRing = Math.floor((nodeCount - 1) / rings);
    
    for (let ring = 1; ring <= rings; ring++) {
      const ringRadius = (ring / rings) * Math.min(width, height) * 0.35;
      const nodesInThisRing = ring === rings ? (nodeCount - 1) - (rings - 1) * nodesPerRing : nodesPerRing;
      
      for (let i = 0; i < nodesInThisRing; i++) {
        const angle = (2 * Math.PI * i) / nodesInThisRing + (ring * Math.PI / 8); // Offset each ring
        const x = centerX + ringRadius * Math.cos(angle);
        const y = centerY + ringRadius * Math.sin(angle);
        const z = (Math.random() - 0.5) * 100;
        
        // Determine node type based on ring
        const type: NetworkNode['type'] = ring <= 2 ? 'primary' : ring === 3 ? 'secondary' : 'accent';
        
        nodes.push({
          id: nodes.length,
          x: Math.max(20, Math.min(width - 20, x)),
          y: Math.max(20, Math.min(height - 20, y)),
          z,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          vz: (Math.random() - 0.5) * 0.1,
          size: type === 'primary' ? 4 + Math.random() * 1.5 : 
                type === 'secondary' ? 2.5 + Math.random() * 1 : 
                1.5 + Math.random() * 0.8,
          brightness: 0.5 + Math.random() * 0.3,
          targetBrightness: 0.5 + Math.random() * 0.3,
          connections: [],
          pulse: Math.random() * Math.PI * 2,
          type,
          lastInteraction: 0
        });
      }
    }

    // Create symmetric connections from center outward
    nodes.forEach((node, i) => {
      if (i === 0) {
        // Center node connects to all inner ring nodes
        for (let j = 1; j <= Math.min(8, nodes.length - 1); j++) {
          node.connections.push(j);
        }
        return;
      }
      
      const distances: { index: number; distance: number; priority: number }[] = [];
      
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const dz = node.z - otherNode.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          // Prioritize center connections and same-type connections
          const isCenterConnection = j === 0 ? 2.0 : 1.0;
          const typeCompatibility = node.type === otherNode.type ? 1.3 : 1.0;
          const priority = isCenterConnection * typeCompatibility;
          
          distances.push({ index: j, distance, priority });
        }
      });
      
      // Connect based on distance and priority for symmetric structure
      const maxConnections = node.type === 'primary' ? 4 : node.type === 'secondary' ? 3 : 2;
      
      distances
        .sort((a, b) => (a.distance / a.priority) - (b.distance / b.priority))
        .slice(0, maxConnections)
        .forEach(({ index, distance }) => {
          if (distance < config.canvas.connectionDistance) {
            node.connections.push(index);
          }
        });
    });

    nodesRef.current = nodes;
  }, [config.canvas]);

  // Enhanced canvas animation with optimized rendering
  const animateCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const nodes = nodesRef.current;
    const currentTime = Date.now();
    
    // Performance monitoring
    performanceRef.current.frameCount++;
    if (currentTime - performanceRef.current.lastFpsCheck > 1000) {
      performanceRef.current.fps = performanceRef.current.frameCount;
      performanceRef.current.frameCount = 0;
      performanceRef.current.lastFpsCheck = currentTime;
    }

    // Adaptive quality based on performance with better frame skipping
    const shouldSkipFrame = performanceRef.current.fps < 45 && performanceRef.current.frameCount % 3 === 0;
    if (shouldSkipFrame && !isHighEnd) {
      animationRef.current = requestAnimationFrame(animateCanvas);
      return;
    }

    // Clear with fade effect
    ctx.fillStyle = `rgba(10, 15, 28, ${isHighEnd ? 0.08 : 0.12})`;
    ctx.fillRect(0, 0, width, height);

    const time = currentTime * 0.001;
    
    // Update nodes with enhanced physics
    nodes.forEach((node, i) => {
      if (!preferReducedMotion) {
        // Individual node movement with physics
        const centerX = width / 2;
        const centerY = height / 2;
        const distFromCenter = Math.sqrt((node.x - centerX) ** 2 + (node.y - centerY) ** 2);
        const maxDist = Math.min(width, height) * 0.4;
        
        // Gentle attraction to center if too far
        if (distFromCenter > maxDist) {
          const angle = Math.atan2(centerY - node.y, centerX - node.x);
          const force = (distFromCenter - maxDist) * 0.0005;
          node.vx += Math.cos(angle) * force;
          node.vy += Math.sin(angle) * force;
        }
        
        // Individual orbital movement
        const orbitalSpeed = 0.0002 + node.type === 'primary' ? 0.0001 : 0;
        const orbitalRadius = distFromCenter;
        const orbitalAngle = Math.atan2(node.y - centerY, node.x - centerX) + orbitalSpeed;
        
        const targetX = centerX + orbitalRadius * Math.cos(orbitalAngle);
        const targetY = centerY + orbitalRadius * Math.sin(orbitalAngle);
        
        node.vx += (targetX - node.x) * 0.0001;
        node.vy += (targetY - node.y) * 0.0001;
        
        // Apply velocities with 3D movement
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        
        // Z-axis boundaries
        if (Math.abs(node.z) > 100) {
          node.vz *= -0.8;
        }
        
        // Velocity damping
        node.vx *= 0.995;
        node.vy *= 0.995;
        node.vz *= 0.995;
        
        // Random micro-movements
        node.vx += (Math.random() - 0.5) * 0.01;
        node.vy += (Math.random() - 0.5) * 0.01;
        node.vz += (Math.random() - 0.5) * 0.005;
      }
      
      // Enhanced mouse interaction with faster response
      if (mouseRef.current.isNear) {
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.canvas.interactionRadius) {
          const force = (config.canvas.interactionRadius - distance) / config.canvas.interactionRadius;
          node.targetBrightness = Math.min(1, 0.8 + force * 0.2);
          node.lastInteraction = currentTime;
          
          // Faster interaction response
          const angle = Math.atan2(dy, dx);
          const interactionMultiplier = node.type === 'primary' ? -2 : 1.5; // Center attracts stronger
          const interactionForce = force * 0.05 * interactionMultiplier;
          
          node.vx += Math.cos(angle) * interactionForce;
          node.vy += Math.sin(angle) * interactionForce;
          
          // Instant ripple effect to connected nodes
          node.connections.forEach(connIdx => {
            const connectedNode = nodes[connIdx];
            if (connectedNode) {
              connectedNode.targetBrightness = Math.min(1, connectedNode.brightness + force * 0.4);
              connectedNode.lastInteraction = currentTime;
            }
          });
        }
      }
      
      // Decay interaction effects
      if (currentTime - node.lastInteraction > 1000) {
        node.targetBrightness = 0.4 + Math.sin(time + node.id) * 0.1;
      }
      
      // Update brightness and pulse
      node.brightness += (node.targetBrightness - node.brightness) * 0.08;
      node.pulse += 0.015 + node.brightness * 0.01;
    });

    // Draw connections with enhanced visuals
    nodes.forEach((node, i) => {
      node.connections.forEach(connectionIndex => {
        const connectedNode = nodes[connectionIndex];
        if (!connectedNode || connectionIndex <= i) return; // Avoid duplicate lines
        
        const dx = connectedNode.x - node.x;
        const dy = connectedNode.y - node.y;
        const dz = connectedNode.z - node.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < config.canvas.connectionDistance) {
          const opacity = (1 - distance / config.canvas.connectionDistance) * 0.4;
          const avgBrightness = (node.brightness + connectedNode.brightness) / 2;
          const enhancedOpacity = opacity * (0.5 + avgBrightness * 0.5);
          
          // Z-depth effect
          const zOffset = (node.z + connectedNode.z) / 2;
          const depthFactor = 1 + zOffset * 0.001;
          
          const gradient = ctx.createLinearGradient(node.x, node.y, connectedNode.x, connectedNode.y);
          gradient.addColorStop(0, `rgba(0, 245, 255, ${enhancedOpacity * depthFactor})`);
          gradient.addColorStop(0.5, `rgba(59, 130, 246, ${enhancedOpacity * 0.8 * depthFactor})`);
          gradient.addColorStop(1, `rgba(0, 245, 255, ${enhancedOpacity * depthFactor})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.5 + avgBrightness;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.stroke();
        }
      });
    });

    // Draw nodes with enhanced 3D effect
    nodes.forEach(node => {
      const pulseSize = node.size + Math.sin(node.pulse) * 0.8;
      const zOffset = node.z;
      const depthScale = 1 + zOffset * 0.002;
      const actualSize = pulseSize * depthScale;
      
      // Enhanced glow effect
      const glowRadius = actualSize * 4;
      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, glowRadius
      );
      
      const colors = {
        primary: `rgba(0, 245, 255, ${node.brightness})`,
        secondary: `rgba(59, 130, 246, ${node.brightness * 0.8})`,
        accent: `rgba(168, 85, 247, ${node.brightness * 0.6})`
      };
      
      const nodeColor = colors[node.type];
      
      gradient.addColorStop(0, nodeColor);
      gradient.addColorStop(0.3, nodeColor.replace(/[\d\.]+\)/, `${node.brightness * 0.4})`));
      gradient.addColorStop(1, 'rgba(0, 245, 255, 0)');
      
      // Outer glow
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Core node with depth
      ctx.fillStyle = nodeColor;
      ctx.shadowBlur = actualSize * 2;
      ctx.shadowColor = nodeColor;
      ctx.beginPath();
      ctx.arc(node.x, node.y, actualSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Inner highlight for 3D effect
      if (node.brightness > 0.6) {
        const highlightGradient = ctx.createRadialGradient(
          node.x - actualSize * 0.3, node.y - actualSize * 0.3, 0,
          node.x, node.y, actualSize
        );
        highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${(node.brightness - 0.6) * 0.5})`);
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = highlightGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, actualSize, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Schedule next frame with adaptive timing
    const targetFrameTime = 1000 / config.fps;
    const actualFrameTime = Math.max(16, targetFrameTime); // Cap at 60fps
    
    setTimeout(() => {
      animationRef.current = requestAnimationFrame(animateCanvas);
    }, actualFrameTime - 16); // Subtract typical RAF delay
  }, [config, preferReducedMotion, isHighEnd]);

  // Mouse interaction handler
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = event.clientX - rect.left;
    mouseRef.current.y = event.clientY - rect.top;
    mouseRef.current.isNear = true;
    
    // Ultra-fast mouse interaction clearing
    clearTimeout(mouseRef.current.timeout);
    mouseRef.current.timeout = setTimeout(() => {
      mouseRef.current.isNear = false;
    }, 50); // Reduced from 100ms for faster response
  }, []);

  // Canvas resize handler
  const handleCanvasResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, isHighEnd ? 2 : 1.5);
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    initializeNodes(rect.width, rect.height);
  }, [initializeNodes, isHighEnd]);

  // Optimized Vanta.js initialization with symmetric distribution
  const initVanta = useCallback(() => {
    if (!vantaRef.current || !window.VANTA || vantaEffect.current) return;

    try {
      const { vanta } = config;
      
      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: !isMobile,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x00f5ff,
        backgroundColor: 0x0a0f1c,
        // Optimized symmetric distribution
        // Optimized center-point network configuration
        points: vanta.points,
        maxDistance: vanta.maxDistance,
        spacing: vanta.spacing,
        showDots: true,
        // Center-point distribution
        centerX: 0.5,
        centerY: 0.5,
        // Symmetric radial expansion
        distribution: 'uniform',
        // High-performance settings
        forceAnimate: true,
        animationSpeed: preferReducedMotion ? 0.4 : 1.5,
        // Ultra-fast interaction response
        mouseEase: true,
        mouseSpeed: 3.0, // Increased for faster response
        touchSpeed: 3.0, // Increased for faster touch response
        // Enhanced rendering for symmetric effect
        size: 1.3,
        lineOpacity: 0.3,
        dotOpacity: 0.95,
        // Symmetric color distribution from center
        vertexColors: [0x00f5ff, 0x3b82f6, 0xa855f7],
        // Enhanced wave properties for center expansion
        waveHeight: 20,
        waveSpeed: 1.0,
        zoom: 0.7,
        // Performance boost
        lowLatency: true,
        gpuAcceleration: true,
        // Network symmetry enhancements
        meshDensity: 1.2,
        meshOpacity: 0.4
      });

      // Post-initialization optimizations
      setTimeout(() => {
        if (vantaEffect.current?.renderer) {
          vantaEffect.current.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          vantaEffect.current.renderer.powerPreference = 'high-performance';
        }
      }, 100);
    } catch (error) {
      console.warn('Vanta initialization failed:', error);
    }
  }, [config, isMobile, preferReducedMotion]);

  // Script loading with timeout and fallback
  useEffect(() => {
    if (!config.useVanta) return;

    let mounted = true;
    let loadTimeout: NodeJS.Timeout;

    const loadScripts = async () => {
      try {
        loadTimeout = setTimeout(() => {
          if (mounted) {
            console.warn('Vanta loading timeout, script loading took too long');
          }
        }, 8000);

        if (window.THREE && window.VANTA) {
          clearTimeout(loadTimeout);
          initVanta();
          return;
        }

        // Load scripts in parallel for better performance
        const [threePromise, vantaPromise] = await Promise.allSettled([
          window.THREE ? Promise.resolve() : new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Three.js failed to load'));
            document.head.appendChild(script);
          }),
          window.VANTA ? Promise.resolve() : new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Vanta.js failed to load'));
            document.head.appendChild(script);
          })
        ]);

        if (mounted) {
          clearTimeout(loadTimeout);
          if (threePromise.status === 'fulfilled' && vantaPromise.status === 'fulfilled') {
            initVanta();
          }
        }
      } catch (error) {
        console.warn('Failed to load background scripts:', error);
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
  }, [config.useVanta, initVanta]);

  // Canvas setup for fallback mode
  useEffect(() => {
    if (config.useVanta) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    handleCanvasResize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleCanvasResize);
    
    animationRef.current = requestAnimationFrame(animateCanvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleCanvasResize);
    };
  }, [config.useVanta, handleCanvasResize, handleMouseMove, animateCanvas]);

  // Render appropriate background based on device capabilities
  if (config.useVanta) {
    return (
      <div 
        ref={vantaRef} 
        className="fixed inset-0 -z-10"
        style={{ 
          background: 'linear-gradient(135deg, hsl(var(--background)) 0%, #1e293b 50%, #0f172a 100%)'
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 -z-10">
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(135deg, hsl(var(--background)) 0%, #1e293b 50%, #0f172a 100%)'
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full network-canvas"
        style={{ 
          imageRendering: 'auto',
          willChange: 'transform'
        }}
      />
    </div>
  );
};