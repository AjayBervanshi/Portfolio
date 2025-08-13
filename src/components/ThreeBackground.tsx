import { Canvas } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function ParticleNetwork() {
  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);
  
  const particleCount = 100;
  const maxDistance = 150;
  
  // Generate random particle positions
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.5;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    
    return { positions, velocities };
  }, []);

  // Animation loop
  useFrame(() => {
    if (!points.current || !lines.current) return;
    
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    const linePositions: number[] = [];
    
    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += particles.velocities[i * 3];
      positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
      positions[i * 3 + 2] += particles.velocities[i * 3 + 2];
      
      // Boundary checks
      if (Math.abs(positions[i * 3]) > 400) particles.velocities[i * 3] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 300) particles.velocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 100) particles.velocities[i * 3 + 2] *= -1;
    }
    
    // Create connections between nearby particles
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < maxDistance) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
    
    // Update line geometry
    if (linePositions.length > 0) {
      lines.current.geometry.setFromPoints(
        linePositions.reduce((acc, _, i) => {
          if (i % 3 === 0) {
            acc.push(new THREE.Vector3(linePositions[i], linePositions[i + 1], linePositions[i + 2]));
          }
          return acc;
        }, [] as THREE.Vector3[])
      );
    }
  });

  return (
    <>
      <Points ref={points} positions={particles.positions} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#6366f1" 
          size={2} 
          sizeAttenuation={true} 
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      <lineSegments ref={lines}>
        <bufferGeometry />
        <lineBasicMaterial color="#6366f1" transparent opacity={0.2} />
      </lineSegments>
    </>
  );
}

export const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 200], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ParticleNetwork />
      </Canvas>
    </div>
  );
};