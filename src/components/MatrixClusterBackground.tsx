import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ClusterNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  pulsePhase: number;
  pulseSpeed: number;
  status: 'PRIMARY' | 'SYNCHRONIZED' | 'STANDBY' | 'WITNESS';
}

interface LsnStream {
  x: number;
  y: number;
  speed: number;
  logs: string[];
  ticks: number;
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

    // Initialize Database Cluster Nodes
    const nodeLabels = [
      { name: 'AG_PRIMARY_NAGPUR', status: 'PRIMARY' },
      { name: 'AG_REPLICA_PUNE', status: 'SYNCHRONIZED' },
      { name: 'AZURE_DR_STANDBY', status: 'STANDBY' },
      { name: 'WITNESS_QUORUM', status: 'WITNESS' },
      { name: 'TEMPDB_CACHE_01', status: 'SYNCHRONIZED' },
      { name: 'LOG_REDO_QUEUE', status: 'SYNCHRONIZED' },
      { name: 'REPL_DIST_HUB', status: 'SYNCHRONIZED' },
      { name: 'AG_LISTENER_1433', status: 'PRIMARY' },
      { name: 'BUFF_POOL_HAS', status: 'SYNCHRONIZED' },
      { name: 'INDEX_OPT_ENGINE', status: 'STANDBY' },
      { name: 'MEM_POOL_A', status: 'SYNCHRONIZED' },
      { name: 'MEM_POOL_B', status: 'SYNCHRONIZED' },
    ] as const;

    const nodes: ClusterNode[] = [];
    const maxNodes = isMobile ? 6 : 12;

    for (let i = 0; i < maxNodes; i++) {
      const labelData = nodeLabels[i % nodeLabels.length];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: labelData.status === 'PRIMARY' ? 3.5 : 2.5,
        label: labelData.name,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        status: labelData.status,
      });
    }

    // Hex Transaction Logs Streams
    const streams: LsnStream[] = [
      {
        x: 0.08,
        y: Math.random() * -300,
        speed: 0.7,
        logs: ['0000003b:000001a4:0001', 'BEGIN TRAN', 'INSERT [messages]', 'Checkpoint', 'PAGE_WRITE', 'DB_SYNC_OK', '0000003b:000001a8:0002', 'COMMIT'],
        ticks: 0
      },
      {
        x: 0.92,
        y: Math.random() * -300,
        speed: 0.5,
        logs: ['LSN_XACT_2415', 'HADR_FAILOVER', 'REPL_COMMIT', 'REDO_REPLICATED', '0000003c:000001b2:0001', 'INDEX_REBUILD', 'SP_WHO2_ACTIVE'],
        ticks: 0
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

    // Initialize mouse positions
    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 2;
    mouseRef.current.tx = width / 2;
    mouseRef.current.ty = height / 2;

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const draw = () => {
      // 1. Premium Obsidian Slate Core Base Gradient
      const baseGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      baseGrad.addColorStop(0, '#090e15'); // Rich deep iron blue-black
      baseGrad.addColorStop(1, '#05070a'); // True black edge vignette
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse coordinates tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      // 2. High-Precision Blueprint Grid
      const gridSize = isMobile ? 60 : 80;
      ctx.lineWidth = 0.5;

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let alpha = 0.02; // Muted sleek slate grid dots
          if (dist < 300) {
            const factor = (300 - dist) / 300;
            alpha += factor * 0.08;
          }

          ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();

          // Elegant, thin coordinate crosshairs under the spotlight
          if (dist < 200) {
            const factor = (200 - dist) / 200;
            ctx.strokeStyle = `rgba(6, 182, 212, ${factor * 0.08})`; // Steel cyan color
            ctx.beginPath();
            ctx.moveTo(x - 3, y);
            ctx.lineTo(x + 3, y);
            ctx.moveTo(x, y - 3);
            ctx.lineTo(x, y + 3);
            ctx.stroke();
          }
        }
      }

      // 3. Scrollable Monospace LSN Streams
      if (!isMobile) {
        ctx.font = '8px monospace';
        streams.forEach((stream) => {
          stream.ticks++;
          stream.y += stream.speed;
          
          if (stream.y > height) {
            stream.y = -200;
          }

          const streamX = stream.x * width;
          ctx.fillStyle = 'rgba(6, 182, 212, 0.015)'; // Very faint layout guide line
          ctx.beginPath();
          ctx.moveTo(streamX, 0);
          ctx.lineTo(streamX, height);
          ctx.stroke();

          // Render hexadecimal logging logs
          stream.logs.forEach((log, index) => {
            const logY = stream.y + index * 24;
            if (logY > 0 && logY < height) {
              const distanceToMouse = Math.abs(mouse.y - logY) + Math.abs(mouse.x - streamX);
              let logAlpha = 0.025; // Barely visible background process

              if (distanceToMouse < 250) {
                logAlpha += (250 - distanceToMouse) / 250 * 0.07;
              }

              ctx.fillStyle = log.includes('COMMIT') || log.includes('OK')
                ? `rgba(16, 185, 129, ${logAlpha * 1.5})` // Emerald Green for success transactions
                : `rgba(6, 182, 212, ${logAlpha})`; // Cyan-blue for regular transactions

              ctx.fillText(log, streamX - 45, logY);
            }
          });
        });
      }

      // 4. Live Server Replica Cluster Graph (Database Mesh)
      // Update Node Positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += node.pulseSpeed;

        // Bounce boundaries
        if (node.x < 20 || node.x > width - 20) node.vx *= -1;
        if (node.y < 20 || node.y > height - 20) node.vy *= -1;

        // Mouse attraction warp
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400 && dist > 0) {
          const force = (400 - dist) / 400 * 0.06;
          node.x += dx * force * 0.1;
          node.y += dy * force * 0.1;
        }
      });

      // Connect Cluster Nodes (Network Mesh Grid Lines)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = isMobile ? 160 : 250;
          if (dist < maxDist) {
            // Determine alpha based on distance
            let edgeAlpha = (maxDist - dist) / maxDist * 0.035;

            // Highlight connections near the cursor spotlight
            const mDist1 = Math.sqrt((mouse.x - n1.x) ** 2 + (mouse.y - n1.y) ** 2);
            const mDist2 = Math.sqrt((mouse.x - n2.x) ** 2 + (mouse.y - n2.y) ** 2);
            const avgMDist = (mDist1 + mDist2) / 2;

            if (avgMDist < 300) {
              const highlightFactor = (300 - avgMDist) / 300;
              edgeAlpha += highlightFactor * 0.12;
            }

            // Draw line
            ctx.strokeStyle = avgMDist < 250
              ? `rgba(6, 182, 212, ${edgeAlpha})` // Interactive electric cyan connection
              : `rgba(148, 163, 184, ${edgeAlpha})`; // Subtle cool grey connection
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Cluster Nodes
      nodes.forEach((node) => {
        const pulse = Math.sin(node.pulsePhase) * 1.5;
        const currentRadius = node.radius + (node.status === 'PRIMARY' ? pulse * 0.8 : pulse * 0.4);

        // Distance from cursor to highlight node details
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let nodeColor = 'rgba(148, 163, 184, 0.4)'; // Standard grey replica
        let glowColor = 'rgba(148, 163, 184, 0.1)';

        if (node.status === 'PRIMARY') {
          nodeColor = 'rgba(6, 182, 212, 0.85)'; // High-visibility Cyan Primary Active
          glowColor = 'rgba(6, 182, 212, 0.25)';
        } else if (node.status === 'WITNESS') {
          nodeColor = 'rgba(245, 158, 11, 0.7)'; // Warning/quorum amber
          glowColor = 'rgba(245, 158, 11, 0.15)';
        } else if (node.status === 'STANDBY') {
          nodeColor = 'rgba(129, 140, 248, 0.7)'; // Cool standby violet
          glowColor = 'rgba(129, 140, 248, 0.15)';
        } else {
          nodeColor = 'rgba(16, 185, 129, 0.8)'; // Replicated Synchronized Emerald Green
          glowColor = 'rgba(16, 185, 129, 0.2)';
        }

        // Draw glowing halo for hovered or primary nodes
        const isHovered = dist < 220;
        const glowRadius = currentRadius * (isHovered ? 4.5 : 2.5);

        const nodeGlow = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          glowRadius
        );
        nodeGlow.addColorStop(0, glowColor);
        nodeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node center core
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // High-Precision Telemetry Details near cursor spotlight
        if (isHovered) {
          const factor = (220 - dist) / 220;
          ctx.font = '8px monospace';

          // Node Tag
          ctx.fillStyle = node.status === 'PRIMARY'
            ? `rgba(6, 182, 212, ${factor * 0.95})`
            : node.status === 'WITNESS'
            ? `rgba(245, 158, 11, ${factor * 0.9})`
            : `rgba(16, 185, 129, ${factor * 0.95})`;

          ctx.fillText(node.label, node.x + 8, node.y - 3);

          // Details line
          ctx.fillStyle = `rgba(148, 163, 184, ${factor * 0.6})`;
          ctx.fillText(
            `STATUS: ${node.status} | ping: ${Math.floor(8 + Math.sin(node.pulsePhase) * 4)}ms`,
            node.x + 8,
            node.y + 7
          );
        }
      });

      // 5. Ambient Cursor Spotlight (Teal/Emerald High-Tech Diagnostic Glow)
      const spotlight = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        isMobile ? 180 : 380
      );
      spotlight.addColorStop(0, 'rgba(6, 182, 212, 0.08)'); // Electric cyan center spotlight
      spotlight.addColorStop(0.4, 'rgba(16, 185, 129, 0.025)'); // Muted emerald sync glow border
      spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, width, height);

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
