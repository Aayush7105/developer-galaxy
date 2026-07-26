"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpaceEnvironmentProps {
  showParticles?: boolean;
  showGrid?: boolean;
}

export function SpaceEnvironment({
  showParticles = true,
  showGrid = true,
}: SpaceEnvironmentProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const gridRef = useRef<THREE.GridHelper>(null);

  // Generate star field particles
  const [particlePositions, particleColors] = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color("#34d399"), // Emerald
      new THREE.Color("#38bdf8"), // Cyan / Sky
      new THREE.Color("#a78bfa"), // Purple
      new THREE.Color("#ffffff"), // Pure white star
    ];

    for (let i = 0; i < count; i++) {
      const radius = 20 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current && showParticles) {
      particlesRef.current.rotation.y += delta * 0.03;
      particlesRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 15]} intensity={1} color="#34d399" />
      <directionalLight position={[-10, -20, -15]} intensity={0.5} color="#38bdf8" />

      {/* Particle Stars */}
      {showParticles && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[particleColors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.25}
            vertexColors
            transparent
            opacity={0.8}
            sizeAttenuation
          />
        </points>
      )}

      {/* Tactical Holographic Floor Grid */}
      {showGrid && (
        <group position={[0, -6, 0]}>
          <gridHelper
            ref={gridRef}
            args={[80, 40, "#10b981", "#064e3b"]}
            position={[0, 0, 0]}
          />
        </group>
      )}
    </>
  );
}
