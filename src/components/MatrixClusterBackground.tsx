import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Packet {
  x: number; // 3D X coordinate (column offset)
  y: number; // 3D Y coordinate (floor or ceiling)
  z: number; // 3D Z coordinate (depth)
  speed: number;
  length: number;
  color: string;
  glowColor: string;
}

interface ConstellationNode {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
}

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
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;

    // 3D Engine Constants (Mobile optimized field of view and height)
    const fov = isMobile ? 280 : 500;
    let cameraX = 0;
    let cameraY = 0;
    let gridZ = 0;
    const gridSpeed = isMobile ? 0.7 : 1.0; // Slightly slower scrolling on mobile for elegance

    // Dual Grid Columns (Floor Y = 160, Ceiling Y = -160)
    const floorY = isMobile ? 120 : 160;
    const ceilingY = isMobile ? -120 : -160;
    const columns = isMobile ? [-180, -90, 0, 90, 180] : [-480, -360, -240, -120, 0, 120, 240, 360, 480];

    const colors = [
      { base: 'rgba(6, 182, 212, ', glow: 'rgba(6, 182, 212, 0.18)' },   // Neon Cyan
      { base: 'rgba(16, 185, 129, ', glow: 'rgba(16, 185, 129, 0.12)' }, // Telemetry Green
      { base: 'rgba(129, 140, 248, ', glow: 'rgba(129, 140, 248, 0.12)' }, // Indigo / Blue-Violet
    ];

    // Data Transmission Packets (Floor and Ceiling lanes)
    const packets: Packet[] = [];
    const maxPackets = isMobile ? 8 : 22;

    for (let i = 0; i < maxPackets; i++) {
      const colorData = colors[i % colors.length];
      const isFloor = i % 2 === 0;
      packets.push({
        x: columns[Math.floor(Math.random() * columns.length)],
        y: isFloor ? floorY : ceilingY,
        z: Math.random() * 1000,
        speed: (isMobile ? 1.5 : 2.2) + Math.random() * 3.5,
        length: (isMobile ? 40 : 60) + Math.random() * 100,
        color: colorData.base,
        glowColor: colorData.glow,
      });
    }

    // 3D Floating Constellation Nodes
    const nodes: ConstellationNode[] = [];
    const maxNodes = isMobile ? 10 : 30;

    for (let i = 0; i < maxNodes; i++) {
      const colorSet = colors[i % colors.length];
      nodes.push({
        x: (Math.random() - 0.5) * (isMobile ? 400 : 800),
        y: (Math.random() - 0.5) * (isMobile ? 180 : 240), // Float between floor and ceiling
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        vz: -0.15 - Math.random() * 0.35,
        size: 0.8 + Math.random() * 1.2,
        color: colorSet.base + '0.6)',
      });
    }

    // Sonar Heartbeat Pulse
    let sonarZ = 1000;
    const sonarSpeed = isMobile ? 2.5 : 3.5;

    // High-DPI Sharpness Sizing
    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.0); // Cap on mobile for 60 FPS performance, allow high-res on desktop
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse inputs to smooth camera movement [-1, 1]
      mouseRef.current.tx = (e.clientX / width) * 2 - 1;
      mouseRef.current.ty = (e.clientY / height) * 2 - 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial resize setup
    handleResize();

    // Initial mouse coordinate defaults
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
    mouseRef.current.tx = 0;
    mouseRef.current.ty = 0;

    // Animation Loop
    const draw = () => {
      // 1. Sleek Deep Space Vignette Base
      ctx.fillStyle = '#020408'; // Rich cyber-black
      ctx.fillRect(0, 0, width, height);

      // Ambient indigo vignette centered at horizon
      const horizonGlow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.65
      );
      horizonGlow.addColorStop(0, 'rgba(15, 23, 42, 0.7)'); // Dark slate ambient glow
      horizonGlow.addColorStop(0.6, 'rgba(3, 7, 18, 0.45)');
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, 0, width, height);

      // Smooth camera offsets tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      // Adjust camera viewport in 3D based on mouse parallax
      cameraX = mouse.x * (isMobile ? 120 : 240);
      cameraY = mouse.y * (isMobile ? 50 : 90);

      // Scroll horizontal grid lines forward
      gridZ -= gridSpeed;
      if (gridZ <= -80) {
        gridZ = 0;
      }

      // Project 3D coordinates to 2D screen
      const project = (x3d: number, y3d: number, z3d: number) => {
        const relativeX = x3d - cameraX;
        const relativeY = y3d - cameraY;
        const relativeZ = z3d;

        if (relativeZ <= 5) return null; // Prevent divide by zero / clip near plane

        const screenX = width / 2 + (relativeX / relativeZ) * fov;
        const screenY = height / 2 + (relativeY / relativeZ) * fov;

        return { x: screenX, y: screenY, scale: fov / relativeZ };
      };

      // 2. Render 3D Transverse Lines (Horizontal Grid Floor & Ceiling)
      ctx.lineWidth = 0.5;
      const stepZ = isMobile ? 100 : 80;
      const endDepth = 1000;

      for (let z = 0; z <= endDepth; z += stepZ) {
        const actualZ = z + gridZ;
        const horizonFade = (endDepth - actualZ) / endDepth;
        const gridAlpha = horizonFade * 0.055;

        ctx.strokeStyle = `rgba(148, 163, 184, ${gridAlpha})`;

        // Floor line
        const fLeft = project(isMobile ? -350 : -700, floorY, actualZ);
        const fRight = project(isMobile ? 350 : 700, floorY, actualZ);
        if (fLeft && fRight) {
          ctx.beginPath();
          ctx.moveTo(fLeft.x, fLeft.y);
          ctx.lineTo(fRight.x, fRight.y);
          ctx.stroke();
        }

        // Ceiling line
        const cLeft = project(isMobile ? -350 : -700, ceilingY, actualZ);
        const cRight = project(isMobile ? 350 : 700, ceilingY, actualZ);
        if (cLeft && cRight) {
          ctx.beginPath();
          ctx.moveTo(cLeft.x, cLeft.y);
          ctx.lineTo(cRight.x, cRight.y);
          ctx.stroke();
        }
      }

      // 3. Render 3D Longitudinal Lines (Vertical Columns stretching into distance)
      columns.forEach((colX) => {
        // Floor Grid Columns
        const fNear = project(colX, floorY, 20);
        const fFar = project(colX, floorY, endDepth);
        if (fNear && fFar) {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.035)';
          ctx.beginPath();
          ctx.moveTo(fNear.x, fNear.y);
          ctx.lineTo(fFar.x, fFar.y);
          ctx.stroke();
        }

        // Ceiling Grid Columns
        const cNear = project(colX, ceilingY, 20);
        const cFar = project(colX, ceilingY, endDepth);
        if (cNear && cFar) {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.035)';
          ctx.beginPath();
          ctx.moveTo(cNear.x, cNear.y);
          ctx.lineTo(cFar.x, cFar.y);
          ctx.stroke();
        }
      });

      // 4. Update and Draw 3D Floating Constellation Nodes
      // Physics drift & boundary loops
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Wrap Z depth
        if (node.z < 20) {
          node.z = 1000;
          node.x = (Math.random() - 0.5) * (isMobile ? 400 : 800);
          node.y = (Math.random() - 0.5) * (isMobile ? 180 : 240);
        }

        // Project and render
        const proj = project(node.x, node.y, node.z);
        if (proj && proj.x > 0 && proj.x < width && proj.y > 0 && proj.y < height) {
          const depthFade = (1000 - node.z) / 1000;
          const nodeAlpha = depthFade * 0.75;
          const size = node.size * proj.scale * 0.8;

          // Glowing Node Halo
          ctx.fillStyle = node.color.replace(/[\d\.]+\)$/, `${nodeAlpha * 0.22})`);
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, size * (isMobile ? 2.5 : 3.5), 0, Math.PI * 2);
          ctx.fill();

          // Node center core
          ctx.fillStyle = node.color.replace(/[\d\.]+\)$/, `${nodeAlpha})`);
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, Math.max(0.8, size), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw faint connections between close 3D nodes
      ctx.lineWidth = 0.5;
      const maxConnDist = isMobile ? 110 : 160;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          
          // Calculate 3D Euclidean distance
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dz = n1.z - n2.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < maxConnDist) {
            const p1 = project(n1.x, n1.y, n1.z);
            const p2 = project(n2.x, n2.y, n2.z);

            if (p1 && p2) {
              const avgZ = (n1.z + n2.z) / 2;
              const fade = (1000 - avgZ) / 1000;
              const linkAlpha = fade * (maxConnDist - dist3D) / maxConnDist * 0.12;

              ctx.strokeStyle = `rgba(56, 189, 248, ${linkAlpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // 5. Update and Draw 3D Data Packets (Pulsing Neon Bloom Lasers)
      packets.forEach((packet) => {
        // Rushes forward along depth (Z axis)
        packet.z -= packet.speed;

        // Loop back when passing camera boundary
        if (packet.z <= 20) {
          packet.z = 1000;
          packet.x = columns[Math.floor(Math.random() * columns.length)];
          packet.speed = (isMobile ? 1.5 : 2.2) + Math.random() * 4.5;
        }

        // Project packet endpoints
        const pEnd = project(packet.x, packet.y, packet.z);
        const pStart = project(packet.x, packet.y, packet.z + packet.length);

        if (pStart && pEnd && pStart.y < height && pEnd.y > 0) {
          const depthFade = (1000 - packet.z) / 1000;
          const alpha = depthFade * 0.45;
          const scaleWidth = Math.max(0.6, pEnd.scale * 1.1);

          // Render layering glow (Bloom Effect)
          // Layer 1: Wide faint outer glow
          ctx.strokeStyle = packet.glowColor;
          ctx.lineWidth = scaleWidth * (isMobile ? 2.5 : 3.5);
          ctx.beginPath();
          ctx.moveTo(pStart.x, pStart.y);
          ctx.lineTo(pEnd.x, pEnd.y);
          ctx.stroke();

          // Layer 2: Main colored core laser
          const grad = ctx.createLinearGradient(pStart.x, pStart.y, pEnd.x, pEnd.y);
          grad.addColorStop(0, `${packet.color}0)`);
          grad.addColorStop(1, `${packet.color}${alpha})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = scaleWidth;
          ctx.beginPath();
          ctx.moveTo(pStart.x, pStart.y);
          ctx.lineTo(pEnd.x, pEnd.y);
          ctx.stroke();

          // Layer 3: High-brightness front light node
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.5})`;
          ctx.beginPath();
          ctx.arc(pEnd.x, pEnd.y, Math.max(1, scaleWidth * 0.6), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 6. Draw 3D Sonar Pulse Telemetry (Pulsing radar ring on grid horizon)
      sonarZ -= sonarSpeed;
      if (sonarZ <= 20) {
        sonarZ = 1000;
      }
      
      const pSonarLeft = project(isMobile ? -300 : -600, floorY, sonarZ);
      const pSonarRight = project(isMobile ? 300 : 600, floorY, sonarZ);
      if (pSonarLeft && pSonarRight) {
        const sonarFade = (1000 - sonarZ) / 1000;
        const ringAlpha = Math.sin(sonarFade * Math.PI) * (isMobile ? 0.03 : 0.05); // Fade out near camera and at horizon
        
        ctx.strokeStyle = `rgba(14, 165, 233, ${ringAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(width / 2 - (cameraX / sonarZ) * fov, height / 2 + (floorY - cameraY) / sonarZ * fov, ((isMobile ? 300 : 600) / sonarZ) * fov, Math.PI, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(width / 2 - (cameraX / sonarZ) * fov, height / 2 + (ceilingY - cameraY) / sonarZ * fov, ((isMobile ? 300 : 600) / sonarZ) * fov, 0, Math.PI);
        ctx.stroke();
      }

      // 7. Ambient Spotlight Cursor Glow
      const cursor3D = project(mouse.x * (isMobile ? 120 : 240), 0, 180 - mouse.y * 120);
      if (cursor3D) {
        const spotGrad = ctx.createRadialGradient(
          cursor3D.x,
          cursor3D.y,
          0,
          cursor3D.x,
          cursor3D.y,
          isMobile ? 100 : 280
        );
        spotGrad.addColorStop(0, 'rgba(14, 165, 233, 0.055)');
        spotGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.012)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(cursor3D.x, cursor3D.y, isMobile ? 100 : 280, 0, Math.PI * 2);
        ctx.fill();
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
