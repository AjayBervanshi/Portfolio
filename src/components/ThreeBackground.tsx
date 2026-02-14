import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'primary' | 'secondary' | 'accent';
}

interface Connection {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

export const ThreeBackground = () => {
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const bgX = useTransform(smoothX, [0, window.innerWidth], [-15, 15]);
  const bgY = useTransform(smoothY, [0, window.innerHeight], [-15, 15]);

  const nodeCount = isMobile ? 18 : 30;

  const particles = useMemo<Particle[]>(() => {
    const items: Particle[] = [];
    const types: Particle['type'][] = ['primary', 'secondary', 'accent'];
    for (let i = 0; i < nodeCount; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 15 + Math.random() * 25,
        delay: Math.random() * -20,
        type: types[i % 3],
      });
    }
    return items;
  }, [nodeCount]);

  const connections = useMemo<Connection[]>(() => {
    const conns: Connection[] = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 25) {
          conns.push({
            id: `${i}-${j}`,
            x1: particles[i].x,
            y1: particles[i].y,
            x2: particles[j].x,
            y2: particles[j].y,
            delay: Math.random() * 5,
          });
        }
      }
    }
    return conns;
  }, [particles]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  const colorMap = {
    primary: 'rgba(0, 245, 255, 0.8)',
    secondary: 'rgba(59, 130, 246, 0.6)',
    accent: 'rgba(168, 85, 247, 0.5)',
  };

  const glowMap = {
    primary: '0 0 12px rgba(0,245,255,0.6), 0 0 24px rgba(0,245,255,0.3)',
    secondary: '0 0 10px rgba(59,130,246,0.5), 0 0 20px rgba(59,130,246,0.2)',
    accent: '0 0 10px rgba(168,85,247,0.4), 0 0 20px rgba(168,85,247,0.2)',
  };

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0a0f1c 0%, #1e293b 50%, #0f172a 100%)',
        }}
      />

      {/* Parallax layer */}
      <motion.div
        className="absolute inset-0"
        style={{ x: bgX, y: bgY }}
      >
        {/* SVG connections */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
          {connections.map((c) => (
            <motion.line
              key={c.id}
              x1={`${c.x1}%`}
              y1={`${c.y1}%`}
              x2={`${c.x2}%`}
              y2={`${c.y2}%`}
              stroke="rgba(0, 245, 255, 0.25)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.1, 0.4, 0.1] }}
              transition={{
                pathLength: { duration: 2, delay: c.delay },
                opacity: { duration: 4, repeat: Infinity, delay: c.delay },
              }}
            />
          ))}
        </svg>

        {/* Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              backgroundColor: colorMap[p.type],
              boxShadow: glowMap[p.type],
            }}
            animate={{
              x: [0, 30, -20, 15, 0],
              y: [0, -25, 20, -10, 0],
              opacity: [0.4, 0.9, 0.5, 0.8, 0.4],
              scale: [1, 1.3, 0.9, 1.15, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '40vw',
          height: '40vw',
          left: '10%',
          top: '20%',
          background:
            'radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '35vw',
          height: '35vw',
          right: '5%',
          bottom: '10%',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};
