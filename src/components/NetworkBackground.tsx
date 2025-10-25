import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  brightness: number;
  targetBrightness: number;
  connections: number[];
  pulse: number;
  type: 'primary' | 'secondary' | 'accent';
}

interface NetworkBackgroundProps {
  interactive?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

export const NetworkBackground = ({ 
  interactive = true, 
  quality = 'medium' 
}: NetworkBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });
  const isMouseNearRef = useRef(false);
  
  const isMobile = useIsMobile();
  const { isHighEnd, isLowEnd, preferReducedMotion } = usePerformanceOptimization();

  // Adaptive configuration based on device capabilities
  const config = useMemo(() => {
    const baseConfig = {
      low: { nodeCount: 15, maxConnections: 2, connectionDistance: 120, fps: 30 },
      medium: { nodeCount: 25, maxConnections: 3, connectionDistance: 140, fps: 60 },
      high: { nodeCount: 40, maxConnections: 4, connectionDistance: 160, fps: 60 }
    };

    let selectedQuality = quality;
    if (isLowEnd || isMobile) selectedQuality = 'low';
    else if (!isHighEnd) selectedQuality = 'medium';

    if (preferReducedMotion) {
      return { ...baseConfig[selectedQuality], fps: 15 };
    }

    return baseConfig[selectedQuality];
  }, [quality, isHighEnd, isLowEnd, isMobile, preferReducedMotion]);

  const colors = {
    primary: 'rgba(0, 245, 255, 0.8)',    // Cyan
    secondary: 'rgba(59, 130, 246, 0.6)', // Blue
    accent: 'rgba(168, 85, 247, 0.4)',    // Purple
    connection: 'rgba(0, 245, 255, 0.15)',
    connectionActive: 'rgba(0, 245, 255, 0.3)'
  };

  // Initialize nodes with proper distribution
  const initializeNodes = useCallback((width: number, height: number) => {
    const nodes: Node[] = [];
    const { nodeCount } = config;
    
    // Create grid-based distribution for better coverage
    const cols = Math.ceil(Math.sqrt(nodeCount * (width / height)));
    const rows = Math.ceil(nodeCount / cols);
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    for (let i = 0; i < nodeCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      // Add randomness within grid cells
      const baseX = col * cellWidth + cellWidth / 2;
      const baseY = row * cellHeight + cellHeight / 2;
      const offsetX = (Math.random() - 0.5) * cellWidth * 0.6;
      const offsetY = (Math.random() - 0.5) * cellHeight * 0.6;

      const nodeTypes: Node['type'][] = ['primary', 'secondary', 'accent'];
      const type = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
      
      nodes.push({
        id: i,
        x: Math.max(50, Math.min(width - 50, baseX + offsetX)),
        y: Math.max(50, Math.min(height - 50, baseY + offsetY)),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: type === 'primary' ? 3 + Math.random() * 2 : 2 + Math.random() * 1.5,
        brightness: 0.3 + Math.random() * 0.4,
        targetBrightness: 0.3 + Math.random() * 0.4,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
        type
      });
    }

    // Calculate connections efficiently
    nodes.forEach((node, i) => {
      const connections: number[] = [];
      const distances: { index: number; distance: number }[] = [];
      
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          distances.push({ index: j, distance });
        }
      });
      
      // Connect to closest nodes within range
      distances
        .sort((a, b) => a.distance - b.distance)
        .slice(0, config.maxConnections)
        .forEach(({ index, distance }) => {
          if (distance < config.connectionDistance) {
            connections.push(index);
          }
        });
      
      node.connections = connections;
    });

    nodesRef.current = nodes;
  }, [config]);

  // Handle mouse interaction
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!interactive || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = event.clientX - rect.left;
    mouseRef.current.y = event.clientY - rect.top;
    
    // Check if mouse is near any node
    isMouseNearRef.current = nodesRef.current.some(node => {
      const dx = mouseRef.current.x - node.x;
      const dy = mouseRef.current.y - node.y;
      return Math.sqrt(dx * dx + dy * dy) < mouseRef.current.radius;
    });
  }, [interactive]);

  // Animation loop with performance optimization
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const nodes = nodesRef.current;
    
    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(10, 15, 28, 0.1)';
    ctx.fillRect(0, 0, width, height);

    const time = Date.now() * 0.001;
    
    // Update nodes
    nodes.forEach((node, i) => {
      // Individual node movement
      if (!preferReducedMotion) {
        node.x += node.vx;
        node.y += node.vy;
        
        // Boundary collision with smooth bounce
        if (node.x <= node.size || node.x >= width - node.size) {
          node.vx *= -0.8;
          node.x = Math.max(node.size, Math.min(width - node.size, node.x));
        }
        if (node.y <= node.size || node.y >= height - node.size) {
          node.vy *= -0.8;
          node.y = Math.max(node.size, Math.min(height - node.size, node.y));
        }
        
        // Add subtle drift
        node.vx += (Math.random() - 0.5) * 0.02;
        node.vy += (Math.random() - 0.5) * 0.02;
        
        // Velocity damping
        node.vx *= 0.99;
        node.vy *= 0.99;
      }
      
      // Mouse interaction
      if (interactive && isMouseNearRef.current) {
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          node.targetBrightness = Math.min(1, 0.8 + force * 0.4);
          
          // Subtle attraction/repulsion
          const angle = Math.atan2(dy, dx);
          const pushForce = force * 0.1;
          node.vx += Math.cos(angle) * pushForce;
          node.vy += Math.sin(angle) * pushForce;
        } else {
          node.targetBrightness = 0.3 + Math.random() * 0.2;
        }
      }
      
      // Update brightness and pulse
      node.brightness += (node.targetBrightness - node.brightness) * 0.1;
      node.pulse += 0.02;
    });

    // Draw connections
    ctx.strokeStyle = colors.connection;
    ctx.lineWidth = 1;
    
    nodes.forEach((node, i) => {
      node.connections.forEach(connectionIndex => {
        const connectedNode = nodes[connectionIndex];
        if (!connectedNode) return;
        
        const dx = connectedNode.x - node.x;
        const dy = connectedNode.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.connectionDistance) {
          const opacity = (1 - distance / config.connectionDistance) * 0.5;
          ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.stroke();
        }
      });
    });

    // Draw nodes
    nodes.forEach(node => {
      const pulseSize = node.size + Math.sin(node.pulse) * 0.5;
      const glowIntensity = node.brightness;
      
      // Glow effect
      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, pulseSize * 3
      );
      
      const color = node.type === 'primary' ? colors.primary :
                   node.type === 'secondary' ? colors.secondary : colors.accent;
      
      gradient.addColorStop(0, color.replace('0.8', glowIntensity.toString()));
      gradient.addColorStop(1, 'rgba(0, 245, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseSize * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Core node
      ctx.fillStyle = color.replace('0.8', (glowIntensity * 1.2).toString());
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
      ctx.fill();
    });

    // Schedule next frame with adaptive FPS
    const targetFrameTime = 1000 / config.fps;
    setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, targetFrameTime);
  }, [config, interactive, preferReducedMotion, colors]);

  // Resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    initializeNodes(rect.width, rect.height);
  }, [initializeNodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial setup
    handleResize();
    
    // Event listeners
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [animate, handleMouseMove, handleResize, interactive]);

  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--background)) 0%, #1e293b 50%, #0f172a 100%)'
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};