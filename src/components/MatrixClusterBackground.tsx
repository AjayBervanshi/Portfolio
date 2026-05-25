import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Packet {
  x: number; // 3D X coordinate (column offset)
  z: number; // 3D Z coordinate (depth)
  speed: number;
  length: number;
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
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 3D Perspective settings
    const fov = isMobile ? 300 : 450;
    let cameraX = 0;
    let cameraY = -140; // Camera height looking down
    let gridZ = 0;
    const gridSpeed = 0.8; // Grid scrolling speed

    // Telemetry columns in 3D space
    const columns = isMobile ? [-240, -120, 0, 120, 240] : [-480, -360, -240, -120, 0, 120, 240, 360, 480];
    const colors = [
      'rgba(14, 165, 233, ', // Electric Sky Blue
      'rgba(16, 185, 129, ', // Telemetry Emerald Green
      'rgba(99, 102, 241, ', // High-speed Indigo
    ];

    const packets: Packet[] = [];
    const maxPackets = isMobile ? 8 : 18;

    for (let i = 0; i < maxPackets; i++) {
      packets.push({
        x: columns[Math.floor(Math.random() * columns.length)],
        z: Math.random() * 1000,
        speed: 1.5 + Math.random() * 3.5,
        length: 50 + Math.random() * 100,
        color: colors[i % colors.length],
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1] range for smooth parallax
      mouseRef.current.tx = (e.clientX / width) * 2 - 1;
      mouseRef.current.ty = (e.clientY / height) * 2 - 1;
    };

    // Initialize mouse offsets
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
    mouseRef.current.tx = 0;
    mouseRef.current.ty = 0;

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const draw = () => {
      // 1. Sleek Deep Obsidian Slate Base
      ctx.fillStyle = '#030712'; // True clean charcoal obsidian
      ctx.fillRect(0, 0, width, height);

      // Soft ambient core glow rising from bottom-center
      const bottomGlow = ctx.createRadialGradient(
        width / 2,
        height * 0.9,
        0,
        width / 2,
        height * 0.9,
        Math.max(width, height) * 0.65
      );
      bottomGlow.addColorStop(0, 'rgba(17, 24, 39, 0.6)');
      bottomGlow.addColorStop(0.5, 'rgba(15, 23, 42, 0.3)');
      bottomGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bottomGlow;
      ctx.fillRect(0, 0, width, height);

      // Smooth camera offsets tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      // Adjust camera positioning slightly based on mouse tilt (Parallax 3D effect)
      cameraX = mouse.x * 200;
      cameraY = -140 + mouse.y * 45;

      // Scroll horizontal grid lines forward
      gridZ -= gridSpeed;
      if (gridZ <= -80) {
        gridZ = 0;
      }

      // Projection helper: 3D to 2D
      const project = (x3d: number, y3d: number, z3d: number) => {
        const relativeX = x3d - cameraX;
        const relativeY = y3d - cameraY;
        const relativeZ = z3d;

        if (relativeZ <= 5) return null; // Prevent divide by zero / clip near plane

        const screenX = width / 2 + (relativeX / relativeZ) * fov;
        const screenY = height / 2 + (relativeY / relativeZ) * fov;

        return { x: screenX, y: screenY, scale: fov / relativeZ };
      };

      // 2. Render 3D Transverse Lines (Horizontal Grid Gridlines)
      ctx.lineWidth = 0.5;
      const stepZ = 80;
      const endDepth = 1000;

      for (let z = 0; z <= endDepth; z += stepZ) {
        const actualZ = z + gridZ;
        
        // Project endpoints in 3D
        const pLeft = project(-700, 0, actualZ);
        const pRight = project(700, 0, actualZ);

        if (pLeft && pRight) {
          // Fade grid out in the deep horizon
          const horizonFade = (endDepth - actualZ) / endDepth;
          ctx.strokeStyle = `rgba(148, 163, 184, ${horizonFade * 0.055})`; // Premium slate-grey
          ctx.beginPath();
          ctx.moveTo(pLeft.x, pLeft.y);
          ctx.lineTo(pRight.x, pRight.y);
          ctx.stroke();
        }
      }

      // 3. Render 3D Longitudinal Lines (Vertical columns stretching to center-horizon)
      const borderLimit = isMobile ? 300 : 600;
      columns.forEach((colX) => {
        const pNear = project(colX, 0, 20);
        const pFar = project(colX, 0, endDepth);

        if (pNear && pFar) {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.04)';
          ctx.beginPath();
          ctx.moveTo(pNear.x, pNear.y);
          ctx.lineTo(pFar.x, pFar.y);
          ctx.stroke();
        }
      });

      // 4. Update and Draw 3D Data Transmission Packets (Pulsing light streaks)
      packets.forEach((packet) => {
        // Rushes forward along depth (Z axis)
        packet.z -= packet.speed;
        
        // Loop back when passing camera view boundary
        if (packet.z <= 20) {
          packet.z = 1000;
          packet.x = columns[Math.floor(Math.random() * columns.length)];
          packet.speed = 1.5 + Math.random() * 3.5;
        }

        // Project the start and end of the glowing trail
        const pEnd = project(packet.x, 0, packet.z);
        const pStart = project(packet.x, 0, packet.z + packet.length);

        if (pStart && pEnd && pStart.y < height && pEnd.y > 0) {
          const depthFade = (1000 - packet.z) / 1000;
          const alpha = depthFade * 0.45;

          // Glowing tail gradient
          const packetGrad = ctx.createLinearGradient(pStart.x, pStart.y, pEnd.x, pEnd.y);
          packetGrad.addColorStop(0, `${packet.color}0)`);
          packetGrad.addColorStop(1, `${packet.color}${alpha})`);

          ctx.strokeStyle = packetGrad;
          ctx.lineWidth = Math.max(0.6, pEnd.scale * 1.1);
          ctx.beginPath();
          ctx.moveTo(pStart.x, pStart.y);
          ctx.lineTo(pEnd.x, pEnd.y);
          ctx.stroke();

          // Glowing point node at front of packet
          ctx.fillStyle = `${packet.color}${alpha * 1.4})`;
          ctx.beginPath();
          ctx.arc(pEnd.x, pEnd.y, Math.max(1.2, pEnd.scale * 0.8), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 5. Delicate ambient radar glow centered on cursor tilt
      const cursor3D = project(mouse.x * 240, 0, 180 - mouse.y * 120);
      if (cursor3D) {
        const spotGrad = ctx.createRadialGradient(
          cursor3D.x,
          cursor3D.y,
          0,
          cursor3D.x,
          cursor3D.y,
          isMobile ? 120 : 280
        );
        spotGrad.addColorStop(0, 'rgba(14, 165, 233, 0.055)');
        spotGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.015)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(cursor3D.x, cursor3D.y, isMobile ? 120 : 280, 0, Math.PI * 2);
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
