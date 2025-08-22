
import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

export const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize nodes
    const nodeCount = 80;
    const nodes: Node[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: []
      });
    }
    
    nodesRef.current = nodes;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    // Click rotation effect
    const handleClick = () => {
      rotationRef.current += Math.PI / 4; // 45 degree rotation on click
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update rotation based on mouse position
      const mouseInfluence = (mouseRef.current.x / canvas.width - 0.5) * 0.02;
      rotationRef.current += mouseInfluence;

      // Update nodes
      nodes.forEach((node, i) => {
        // Apply rotation
        const cos = Math.cos(rotationRef.current);
        const sin = Math.sin(rotationRef.current);
        
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around edges
        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        // Mouse attraction
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150 * 0.01;
          node.vx += (dx / distance) * force;
          node.vy += (dy / distance) * force;
        }

        // Limit velocity
        const maxVel = 1;
        const vel = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (vel > maxVel) {
          node.vx = (node.vx / vel) * maxVel;
          node.vy = (node.vy / vel) * maxVel;
        }

        // Find connections
        node.connections = [];
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dist = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + 
              Math.pow(node.y - otherNode.y, 2)
            );
            if (dist < 120) {
              node.connections.push(j);
            }
          }
        });
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
      ctx.lineWidth = 1;
      
      nodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          if (connectionIndex > i) { // Avoid drawing duplicate lines
            const otherNode = nodes[connectionIndex];
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + 
              Math.pow(node.y - otherNode.y, 2)
            );
            
            ctx.globalAlpha = Math.max(0, 1 - distance / 120);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      ctx.globalAlpha = 0.8;
      nodes.forEach(node => {
        // Distance from mouse affects node appearance
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const distanceFromMouse = Math.sqrt(dx * dx + dy * dy);
        
        const baseRadius = 2;
        const maxRadius = 6;
        const radius = distanceFromMouse < 100 
          ? baseRadius + (maxRadius - baseRadius) * (1 - distanceFromMouse / 100)
          : baseRadius;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = distanceFromMouse < 100 
          ? 'rgba(34, 211, 238, 0.9)'
          : 'rgba(34, 211, 238, 0.6)';
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};
