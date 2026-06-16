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

type ShapeKind =
  | "box"
  | "dodecahedron"
  | "icosahedron"
  | "octahedron"
  | "tetrahedron"
  | "torus";

type GalaxyShape = {
  kind: ShapeKind;
  color: string;
  emissive: string;
  orbitRadius: number;
  size: number;
  speed: number;
  phase: number;
  verticalOffset: number;
  wobble: number;
};

const galaxyShapes: GalaxyShape[] = [
  {
    kind: "torus",
    color: "#f8fafc",
    emissive: "#38bdf8",
    orbitRadius: 3.05,
    size: 0.46,
    speed: 0.42,
    phase: 0,
    verticalOffset: 0.78,
    wobble: 0.18,
  },
  {
    kind: "octahedron",
    color: "#fb7185",
    emissive: "#be123c",
    orbitRadius: 3.38,
    size: 0.34,
    speed: -0.35,
    phase: 1.15,
    verticalOffset: -0.62,
    wobble: 0.24,
  },
  {
    kind: "icosahedron",
    color: "#a7f3d0",
    emissive: "#059669",
    orbitRadius: 3.74,
    size: 0.38,
    speed: 0.28,
    phase: 2.5,
    verticalOffset: 1.05,
    wobble: 0.2,
  },
  {
    kind: "box",
    color: "#fde68a",
    emissive: "#ca8a04",
    orbitRadius: 4.05,
    size: 0.36,
    speed: -0.24,
    phase: 3.35,
    verticalOffset: -1.04,
    wobble: 0.16,
  },
  {
    kind: "tetrahedron",
    color: "#c4b5fd",
    emissive: "#7c3aed",
    orbitRadius: 4.34,
    size: 0.42,
    speed: 0.2,
    phase: 4.7,
    verticalOffset: 0.18,
    wobble: 0.28,
  },
  {
    kind: "dodecahedron",
    color: "#67e8f9",
    emissive: "#0891b2",
    orbitRadius: 4.68,
    size: 0.34,
    speed: -0.18,
    phase: 5.55,
    verticalOffset: -0.18,
    wobble: 0.22,
  },
];

function ShapeGeometry({ kind, size }: { kind: ShapeKind; size: number }) {
  if (kind === "box") {
    return <boxGeometry args={[size, size, size]} />;
  }

  if (kind === "dodecahedron") {
    return <dodecahedronGeometry args={[size, 0]} />;
  }

  if (kind === "icosahedron") {
    return <icosahedronGeometry args={[size, 0]} />;
  }

  if (kind === "octahedron") {
    return <octahedronGeometry args={[size, 0]} />;
  }

  if (kind === "tetrahedron") {
    return <tetrahedronGeometry args={[size, 0]} />;
  }

  return <torusGeometry args={[size * 0.72, size * 0.2, 18, 48]} />;
}

function OrbitRing({
  radius,
  rotation,
}: {
  radius: number;
  rotation: [number, number, number];
}) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.004, 8, 144]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.16} />
    </mesh>
  );
}

function GalaxyShapes() {
  const shapeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.06;
      groupRef.current.rotation.z = Math.sin(elapsed * 0.1) * 0.05;
    }

    galaxyShapes.forEach((shape, index) => {
      const mesh = shapeRefs.current[index];

      if (!mesh) return;

      const angle = elapsed * shape.speed + shape.phase;

      mesh.position.set(
        Math.cos(angle) * shape.orbitRadius,
        shape.verticalOffset + Math.sin(elapsed * 0.85 + shape.phase) * shape.wobble,
        Math.sin(angle) * shape.orbitRadius,
      );

      mesh.rotation.x = elapsed * (0.55 + index * 0.05);
      mesh.rotation.y = elapsed * (0.78 - index * 0.04);
      mesh.rotation.z = elapsed * 0.32 + shape.phase;
    });
  });

  return (
    <group ref={groupRef}>
      <OrbitRing radius={3.25} rotation={[Math.PI / 2.2, 0.05, 0.16]} />
      <OrbitRing radius={3.95} rotation={[Math.PI / 2.45, -0.1, -0.22]} />
      <OrbitRing radius={4.6} rotation={[Math.PI / 2.7, 0.18, 0.34]} />

      {galaxyShapes.map((shape, index) => (
        <mesh
          key={`${shape.kind}-${index}`}
          ref={(mesh) => {
            shapeRefs.current[index] = mesh;
          }}
        >
          <ShapeGeometry kind={shape.kind} size={shape.size} />
          <meshStandardMaterial
            color={shape.color}
            emissive={shape.emissive}
            emissiveIntensity={0.7}
            metalness={0.35}
            roughness={0.28}
          />
        </mesh>
      ))}
    </group>
  );
}

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
      <pointLight position={[-6, -4, 5]} color="#f472b6" intensity={1.4} />

      <Stars radius={100} depth={50} count={4000} factor={4} fade />

      <EarthDots />
      <GalaxyShapes />
    </Canvas>
  );
}
