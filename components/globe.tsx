"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function latLonToXYZ(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/**
 * Very rough continent mask.
 * We'll improve the shapes using noise.
 */
function isLand(lat: number, lon: number) {
  const noise = Math.sin(lat * 0.15) * Math.cos(lon * 0.18) * 8;

  // North America
  if (lat > 15 + noise && lat < 72 && lon > -168 && lon < -50) return true;

  // South America
  if (lat > -58 && lat < 15 && lon > -85 && lon < -30) return true;

  // Europe
  if (lat > 35 && lat < 72 && lon > -10 && lon < 45) return true;

  // Africa
  if (lat > -35 && lat < 37 && lon > -20 && lon < 52) return true;

  // Asia
  if (lat > 5 && lat < 75 && lon > 40 && lon < 180) return true;

  // Australia
  if (lat > -45 && lat < -10 && lon > 110 && lon < 155) return true;

  return false;
}

type Dot = {
  position: THREE.Vector3;
  land: boolean;
};

function EarthDots() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const dots = useMemo(() => {
    const generated: Dot[] = [];

    const radius = 2.02;

    for (let lat = -90; lat <= 90; lat += 3) {
      for (let lon = -180; lon <= 180; lon += 3) {
        generated.push({
          position: latLonToXYZ(lat, lon, radius),
          land: isLand(lat, lon),
        });
      }
    }

    return generated;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Sphere */}
      <mesh>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial
          color="#020617"
          emissive="#031525"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Dots */}
      {dots.map((dot, i) => (
        <mesh key={i} position={dot.position}>
          <sphereGeometry args={[0.01, 4, 4]} />
          <meshBasicMaterial color={dot.land ? "#7df9ff" : "#14324a"} />
        </mesh>
      ))}

      {/* Atmosphere */}
      <mesh scale={1.05}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export default function Globe() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 45,
      }}
    >
      <ambientLight intensity={1.5} />

      <pointLight position={[10, 10, 10]} intensity={4} />

      <Stars radius={100} depth={50} count={4000} factor={4} fade />

      <EarthDots />
    </Canvas>
  );
}
