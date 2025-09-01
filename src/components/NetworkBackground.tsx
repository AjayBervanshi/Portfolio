import { useEffect, useRef } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number; // Orbit speed
  connections: number[];
  radius: number; // Orbit radius
  angle: number;  // Current angle
}

class Rectangle {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point: Node) {
    return (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h
    );
  }

  intersects(range: Rectangle) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  }
}

class QuadTree {
  boundary: Rectangle;
  capacity: number;
  points: Node[] = [];
  divided = false;
  northeast!: QuadTree;
  northwest!: QuadTree;
  southeast!: QuadTree;
  southwest!: QuadTree;

  constructor(boundary: Rectangle, capacity: number) {
    this.boundary = boundary;
    this.capacity = capacity;
  }

  subdivide() {
    const { x, y, w, h } = this.boundary;
    const ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.northeast = new QuadTree(ne, this.capacity);
    const nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    this.northwest = new QuadTree(nw, this.capacity);
    const se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.southeast = new QuadTree(se, this.capacity);
    const sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.southwest = new QuadTree(sw, this.capacity);
    this.divided = true;
  }

  insert(point: Node): boolean {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }
      if (this.northeast.insert(point)) return true;
      if (this.northwest.insert(point)) return true;
      if (this.southeast.insert(point)) return true;
      if (this.southwest.insert(point)) return true;
    }
    return false;
  }

  query(range: Rectangle, found: Node[] = []): Node[] {
    if (!this.boundary.intersects(range)) {
      return found;
    } else {
      for (const p of this.points) {
        if (range.contains(p)) {
          found.push(p);
        }
      }
      if (this.divided) {
        this.northwest.query(range, found);
        this.northeast.query(range, found);
        this.southwest.query(range, found);
        this.southeast.query(range, found);
      }
    }
    return found;
  }
}

const config = {
  nodeCount: 81, // Adjusted for 3 circles
  orbitSpeed: 0.001,
  connectionDistance: 120,
  lineColor: 'rgba(34, 211, 238, 0.15)',
  lineWidth: 1,
  lineAlpha: 0.15,
  nodeRadius: 3,
  nodeColor: 'rgba(34, 211, 238, 0.7)',
  quadtreeCapacity: 4,
  pulseSpeed: 500,
  pulseAmount: 2,
};

export const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodes: Node[] = [];
    const circleCount = 3;
    const nodesPerCircle = Math.floor(config.nodeCount / circleCount);
    const baseRadius = Math.min(canvas.width, canvas.height) * 0.15;

    for (let i = 0; i < circleCount; i++) {
      const circleRadius = baseRadius * (i + 1);
      for (let j = 0; j < nodesPerCircle; j++) {
        const angle = (j / nodesPerCircle) * Math.PI * 2;
        const id = i * nodesPerCircle + j;
        nodes.push({
          id: id,
          x: canvas.width / 2 + circleRadius * Math.cos(angle),
          y: canvas.height / 2 + circleRadius * Math.sin(angle),
          vx: config.orbitSpeed,
          connections: [],
          radius: circleRadius,
          angle: angle,
        });
      }
    }
    
    nodesRef.current = nodes;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const boundary = new Rectangle(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
      const qtree = new QuadTree(boundary, config.quadtreeCapacity);

      nodes.forEach(node => {
        qtree.insert(node);
      });

      nodes.forEach((node) => {
        node.angle += node.vx;
        node.x = canvas.width / 2 + node.radius * Math.cos(node.angle);
        node.y = canvas.height / 2 + node.radius * Math.sin(node.angle);

        node.connections = [];
        const range = new Rectangle(node.x, node.y, config.connectionDistance, config.connectionDistance);
        const neighbors = qtree.query(range);

        for (const otherNode of neighbors) {
          if (node.id !== otherNode.id) {
            const ddx = node.x - otherNode.x;
            const ddy = node.y - otherNode.y;
            const distSq = ddx * ddx + ddy * ddy;
            if (distSq < config.connectionDistance * config.connectionDistance) {
              node.connections.push(otherNode.id);
            }
          }
        }
      });

      ctx.strokeStyle = config.lineColor;
      ctx.lineWidth = config.lineWidth;
      ctx.globalAlpha = config.lineAlpha;

      nodes.forEach((node) => {
        node.connections.forEach(connectionIndex => {
          if (connectionIndex > node.id) {
            const otherNode = nodes[connectionIndex];
            ctx.beginPath();
            ctx.moveTo(Math.round(node.x), Math.round(node.y));
            ctx.lineTo(Math.round(otherNode.x), Math.round(otherNode.y));
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 0.8;
      nodes.forEach(node => {
        const pulseFactor = (Math.sin(time / config.pulseSpeed + node.id) + 1) / 2;
        const radius = config.nodeRadius + pulseFactor * config.pulseAmount;
        ctx.beginPath();
        ctx.arc(Math.round(node.x), Math.round(node.y), radius, 0, Math.PI * 2);
        ctx.fillStyle = config.nodeColor;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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