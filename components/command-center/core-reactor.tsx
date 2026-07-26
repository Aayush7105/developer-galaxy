"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CoreReactorProps {
  intensity?: number;
}

export function CoreReactor({ intensity = 1 }: CoreReactorProps) {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerPolyRef = useRef<THREE.Mesh>(null);
  const coreGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.4 * intensity;
      outerRingRef.current.rotation.x += delta * 0.2 * intensity;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.y -= delta * 0.6 * intensity;
      midRingRef.current.rotation.z += delta * 0.3 * intensity;
    }
    if (innerPolyRef.current) {
      innerPolyRef.current.rotation.y += delta * 0.8 * intensity;
      innerPolyRef.current.rotation.x += delta * 0.5 * intensity;
    }
    if (coreGlowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
      coreGlowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Pulsating Energy Sphere */}
      <mesh ref={coreGlowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#34d399"
          transparent
          opacity={0.4}
          wireframe={false}
        />
      </mesh>

      {/* Inner Glowing Crystal Core */}
      <mesh ref={innerPolyRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#059669"
          emissive="#10b981"
          emissiveIntensity={0.8}
          wireframe
          roughness={0.2}
        />
      </mesh>

      {/* Outer Tactical Ring 1 */}
      <group ref={outerRingRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.2, 0.04, 16, 100]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#34d399"
            emissiveIntensity={1.2}
          />
        </mesh>
        {/* Ring Node Indicators */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 3.2,
              Math.sin(angle) * 3.2,
              0,
            ]}
          >
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshBasicMaterial color="#a7f3d0" />
          </mesh>
        ))}
      </group>

      {/* Mid Tactical Ring 2 */}
      <group ref={midRingRef}>
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.03, 16, 80]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#0891b2"
            emissiveIntensity={1}
          />
        </mesh>
      </group>

      {/* Core Point Light */}
      <pointLight color="#34d399" intensity={3} distance={15} />
      <pointLight color="#06b6d4" intensity={2} distance={10} />
    </group>
  );
}
