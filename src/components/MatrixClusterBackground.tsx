import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const MatrixClusterBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Warm, premium 2026 organic auroral glows
    const auroras = [
      {
        x: Math.random() * width,
        y: Math.random() * height,
        tx: Math.random() * width,
        ty: Math.random() * height,
        radius: isMobile ? 250 : 500,
        color: 'rgba(245, 158, 11, 0.08)', // Warm Amber Gold
        speed: 0.002,
        phase: Math.random() * Math.PI * 2,
      },
      {
        x: Math.random() * width,
        y: Math.random() * height,
        tx: Math.random() * width,
        ty: Math.random() * height,
        radius: isMobile ? 300 : 600,
        color: 'rgba(236, 72, 153, 0.07)', // Warm Rose Violet
        speed: 0.0015,
        phase: Math.random() * Math.PI * 2,
      },
      {
        x: Math.random() * width,
        y: Math.random() * height,
        tx: Math.random() * width,
        ty: Math.random() * height,
        radius: isMobile ? 200 : 400,
        color: 'rgba(99, 102, 241, 0.06)', // Soft Elegant Indigo
        speed: 0.0025,
        phase: Math.random() * Math.PI * 2,
      },
      {
        x: Math.random() * width,
        y: Math.random() * height,
        tx: Math.random() * width,
        ty: Math.random() * height,
        radius: isMobile ? 200 : 350,
        color: 'rgba(249, 115, 22, 0.07)', // Warm Terracotta/Bronze Orange
        speed: 0.001,
        phase: Math.random() * Math.PI * 2,
      }
    ];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };

    // Initialize mouse to center
    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 2;
    mouseRef.current.tx = width / 2;
    mouseRef.current.ty = height / 2;

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const draw = () => {
      // 1. Deep space warm Stone-Bronze base (gorgeous warm charcoal, visibly lighter and warmer)
      ctx.fillStyle = '#221a17'; 
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse tracking coordinates
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      // 2. Animate and Draw Auroras (Organic Glassmorphic Waves)
      auroras.forEach((aurora) => {
        aurora.phase += aurora.speed;
        
        // Organic orbital drift
        const dx = aurora.tx - aurora.x;
        const dy = aurora.ty - aurora.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 50) {
          aurora.tx = Math.random() * width;
          aurora.ty = Math.random() * height;
        } else {
          aurora.x += (dx / dist) * 0.8;
          aurora.y += (dy / dist) * 0.8;
        }

        // Dynamic Mouse/Spotlight Attraction Warp (Organic magnetic color pull)
        const toMouseDx = mouse.x - aurora.x;
        const toMouseDy = mouse.y - aurora.y;
        const toMouseDist = Math.sqrt(toMouseDx * toMouseDx + toMouseDy * toMouseDy);
        if (toMouseDist < 600 && toMouseDist > 0) {
          const warpFactor = ((600 - toMouseDist) / 600) * 0.25;
          aurora.x += toMouseDx * warpFactor * 0.04;
          aurora.y += toMouseDy * warpFactor * 0.04;
        }

        // Add slow breathing to radius
        const currentRadius = aurora.radius * (1 + Math.sin(aurora.phase) * 0.15);

        // Draw soft, glowing radial gradient for each blob
        const grad = ctx.createRadialGradient(
          aurora.x,
          aurora.y,
          0,
          aurora.x,
          aurora.y,
          currentRadius
        );
        grad.addColorStop(0, aurora.color);
        grad.addColorStop(0.5, aurora.color.replace(/[\d\.]+\)$/, '0.02)'));
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(aurora.x, aurora.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Smooth Mouse Spotlight Interaction (Luxurious Purple/Indigo Ambient Cursor Glow)
      const cursorGlow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        isMobile ? 200 : 450
      );
      cursorGlow.addColorStop(0, 'rgba(168, 85, 247, 0.16)'); // Soft premium purple spotlight
      cursorGlow.addColorStop(0.5, 'rgba(99, 102, 241, 0.05)'); // Sleek indigo/violet ambient blend
      cursorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cursorGlow;
      ctx.fillRect(0, 0, width, height);

      // 4. Sleek Cybernetic Grid Map with Spotlight Hover
      const gridSize = isMobile ? 60 : 80;
      ctx.lineWidth = 0.5;

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          // Calculate distance from grid point to mouse for interactive spotlight
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let alpha = 0.015; // Barely visible base grid opacity
          
          // Spotlight effect: close to mouse, grid highlights elegantly
          if (dist < 250) {
            const factor = (250 - dist) / 250;
            alpha += factor * 0.10; // Brighter highlights for interactive tactile grid dots
          }

          // Draw an elegant, tiny point or fine dot/crosshair instead of hard grids
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();

          // Draw extremely subtle crossing axis ticks at grid lines for a technical drafting blueprint feel
          if (dist < 220) {
            const factor = (220 - dist) / 220;
            ctx.strokeStyle = `rgba(245, 158, 11, ${factor * 0.12})`; // Crisply highlighted warm amber axis crosshairs
            ctx.beginPath();
            ctx.moveTo(x - 4, y);
            ctx.lineTo(x + 4, y);
            ctx.moveTo(x, y - 4);
            ctx.lineTo(x, y + 4);
            ctx.stroke();
          }

          // Draw extremely tiny database technical tags at intersections near the spotlight
          if (!isMobile && dist < 180 && x % (gridSize * 3) === 0 && y % (gridSize * 3) === 0) {
            const factor = (180 - dist) / 180;
            const tags = ['[SLA_99.999%]', '[LSN_24:412]', '[DB_ACTIVE]', '[sa_sa]', '[PORT_1433]', '[PING_18ms]', '[CPU_OK]', '[HA_SYNC]'];
            const tag = tags[Math.floor((x + y) / gridSize) % tags.length];
            ctx.font = '7px monospace';
            ctx.fillStyle = `rgba(245, 158, 11, ${factor * 0.09})`; // Soft amber technical lettering
            ctx.fillText(tag, x + 8, y - 4);
          }
        }
      }

      // 5. Draw extremely subtle background ambient vertical scanning data lines
      if (!isMobile) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.003)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Drawing thin vertical rules for grid columns
        for (let x = 0; x < width; x += gridSize * 2) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-20 pointer-events-none block" />;
};
