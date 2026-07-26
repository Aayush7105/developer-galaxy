"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { commandAudio } from "@/lib/command-center-audio";

export interface TechNodeData {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "AI & Data" | "DevOps & Cloud" | "3D & Graphics";
  version: string;
  status: "OPTIMAL" | "STABLE" | "SYNCING" | "CRITICAL";
  latency: number; // ms
  throughput: string;
  description: string;
  position: [number, number, number];
  color: string;
  emissive: string;
  shape: "sphere" | "octahedron" | "dodecahedron" | "box" | "torus";
  connections: string[];
}

export const COMMAND_NODES: TechNodeData[] = [
  {
    id: "nextjs",
    name: "Next.js 16 (App Router)",
    category: "Frontend",
    version: "v16.2.9",
    status: "OPTIMAL",
    latency: 12,
    throughput: "4.8 GB/s",
    description: "Server Component streaming engine & Edge routing framework",
    position: [-6, 2, 3],
    color: "#ffffff",
    emissive: "#34d399",
    shape: "octahedron",
    connections: ["react", "typescript", "tailwindcss"],
  },
  {
    id: "react",
    name: "React 19",
    category: "Frontend",
    version: "v19.2.4",
    status: "OPTIMAL",
    latency: 8,
    throughput: "5.2 GB/s",
    description: "Concurrent UI engine with Server Actions & Use hook primitive",
    position: [-7, -2, -1],
    color: "#38bdf8",
    emissive: "#0284c7",
    shape: "sphere",
    connections: ["nextjs", "r3f", "typescript"],
  },
  {
    id: "r3f",
    name: "React Three Fiber",
    category: "3D & Graphics",
    version: "v9.6.1",
    status: "OPTIMAL",
    latency: 4,
    throughput: "120 FPS",
    description: "Declarative WebGL canvas renderer & 3D scene orchestrator",
    position: [0, 5, -2],
    color: "#a78bfa",
    emissive: "#7c3aed",
    shape: "dodecahedron",
    connections: ["three", "react"],
  },
  {
    id: "three",
    name: "Three.js Engine",
    category: "3D & Graphics",
    version: "r184",
    status: "OPTIMAL",
    latency: 2,
    throughput: "450k Poly/s",
    description: "GPU Matrix shader pipeline, dynamic lights & raycasting geometry",
    position: [5, 4, -4],
    color: "#f472b6",
    emissive: "#db2777",
    shape: "octahedron",
    connections: ["r3f", "webgl"],
  },
  {
    id: "ai-core",
    name: "Gemini 3.6 Flash AI",
    category: "AI & Data",
    version: "v3.6-pro",
    status: "OPTIMAL",
    latency: 45,
    throughput: "1.2 M Tokens/s",
    description: "Autonomous reasoning agent matrix with multi-modal context",
    position: [6, -1, 4],
    color: "#f59e0b",
    emissive: "#d97706",
    shape: "dodecahedron",
    connections: ["nextjs", "graphql", "rust-engine"],
  },
  {
    id: "rust-engine",
    name: "Rust Core Module",
    category: "Backend",
    version: "v1.85.0",
    status: "OPTIMAL",
    latency: 1,
    throughput: "14.2 GB/s",
    description: "Zero-cost abstractions, memory-safe high-speed binary computations",
    position: [7, -4, -3],
    color: "#ef4444",
    emissive: "#b91c1c",
    shape: "box",
    connections: ["ai-core", "docker"],
  },
  {
    id: "typescript",
    name: "TypeScript 5.8",
    category: "Frontend",
    version: "v5.8.2",
    status: "OPTIMAL",
    latency: 3,
    throughput: "99.9% Type-Safe",
    description: "Strict typed static system with structural type checking",
    position: [-4, 4, -5],
    color: "#3b82f6",
    emissive: "#1d4ed8",
    shape: "box",
    connections: ["nextjs", "react"],
  },
  {
    id: "docker",
    name: "Docker Container Mesh",
    category: "DevOps & Cloud",
    version: "v27.4.0",
    status: "STABLE",
    latency: 18,
    throughput: "64 Pods Active",
    description: "Isolated containerized runtime microservices and cluster sync",
    position: [2, -6, 2],
    color: "#06b6d4",
    emissive: "#0891b2",
    shape: "torus",
    connections: ["rust-engine", "graphql"],
  },
  {
    id: "graphql",
    name: "GraphQL / Edge API",
    category: "Backend",
    version: "v16.8",
    status: "OPTIMAL",
    latency: 15,
    throughput: "18.5k req/s",
    description: "High performance federated query graph & real-time WebSocket subscriptions",
    position: [-2, -5, 5],
    color: "#10b981",
    emissive: "#059669",
    shape: "octahedron",
    connections: ["ai-core", "docker", "nextjs"],
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS v4 Engine",
    category: "Frontend",
    version: "v4.0.0",
    status: "OPTIMAL",
    latency: 2,
    throughput: "0ms JIT Compiler",
    description: "High-performance CSS utility engine with modern design token variables",
    position: [-8, 0, 4],
    color: "#06b6d4",
    emissive: "#0e7490",
    shape: "sphere",
    connections: ["nextjs"],
  },
];

interface InteractiveNodesProps {
  selectedNodeId: string | null;
  activeCategory: string;
  searchQuery: string;
  onSelectNode: (node: TechNodeData) => void;
}

export function InteractiveNodes({
  selectedNodeId,
  activeCategory,
  searchQuery,
  onSelectNode,
}: InteractiveNodesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNodeId, setHoveredNodeId] = React.useState<string | null>(null);

  // Filter nodes based on category and search query
  const filteredNodes = useMemo(() => {
    return COMMAND_NODES.filter((node) => {
      const matchCategory =
        activeCategory === "ALL" || node.category === activeCategory;
      const matchSearch =
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Compute laser connection lines between filtered nodes
  const connectionLines = useMemo(() => {
    const lines: { id: string; from: [number, number, number]; to: [number, number, number]; active: boolean }[] = [];
    const filteredIds = new Set(filteredNodes.map((n) => n.id));

    filteredNodes.forEach((node) => {
      node.connections.forEach((targetId) => {
        if (filteredIds.has(targetId)) {
          const targetNode = COMMAND_NODES.find((n) => n.id === targetId);
          if (targetNode) {
            const lineId = [node.id, targetId].sort().join("---");
            if (!lines.some((l) => l.id === lineId)) {
              const isActive =
                selectedNodeId === node.id || selectedNodeId === targetId;
              lines.push({
                id: lineId,
                from: node.position,
                to: targetNode.position,
                active: isActive,
              });
            }
          }
        }
      });
    });
    return lines;
  }, [filteredNodes, selectedNodeId]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Laser Connection Lines */}
      {connectionLines.map((line) => {
        const points = [
          new THREE.Vector3(...line.from),
          new THREE.Vector3(...line.to),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <primitive
            key={line.id}
            object={
              new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({
                  color: line.active ? "#34d399" : "#1e293b",
                  linewidth: line.active ? 2 : 1,
                  transparent: true,
                  opacity: line.active ? 0.9 : 0.25,
                })
              )
            }
          />
        );
      })}

      {/* Render 3D Tech Nodes */}
      {filteredNodes.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isHovered = hoveredNodeId === node.id;

        return (
          <SingleNodeMesh
            key={node.id}
            node={node}
            isSelected={isSelected}
            isHovered={isHovered}
            onHover={(hovering) => {
              setHoveredNodeId(hovering ? node.id : null);
              if (hovering) commandAudio.playHover();
            }}
            onClick={() => {
              commandAudio.playSelect();
              onSelectNode(node);
            }}
          />
        );
      })}
    </group>
  );
}

interface SingleNodeMeshProps {
  node: TechNodeData;
  isSelected: boolean;
  isHovered: boolean;
  onHover: (hovering: boolean) => void;
  onClick: () => void;
}

function SingleNodeMesh({
  node,
  isSelected,
  isHovered,
  onHover,
  onClick,
}: SingleNodeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.8;

      const targetScale = isSelected ? 1.6 : isHovered ? 1.3 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 1.2;
    }
  });

  const renderGeometry = () => {
    switch (node.shape) {
      case "sphere":
        return <sphereGeometry args={[0.75, 24, 24]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.8, 0]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[0.75, 0]} />;
      case "box":
        return <boxGeometry args={[1, 1, 1]} />;
      case "torus":
        return <torusGeometry args={[0.6, 0.2, 16, 32]} />;
      default:
        return <sphereGeometry args={[0.75, 16, 16]} />;
    }
  };

  return (
    <group position={node.position}>
      {/* Selection Glow Ring */}
      {(isSelected || isHovered) && (
        <mesh ref={ringRef}>
          <ringGeometry args={[1.1, 1.25, 32]} />
          <meshBasicMaterial
            color={isSelected ? "#34d399" : node.color}
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* Interactive Mesh Node */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {renderGeometry()}
        <meshStandardMaterial
          color={node.color}
          emissive={node.emissive}
          emissiveIntensity={isSelected ? 1.5 : isHovered ? 1.0 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Point light for selected node */}
      {isSelected && (
        <pointLight color={node.color} intensity={2} distance={6} />
      )}

      {/* Floating 3D Html Label */}
      <Html
        position={[0, 1.4, 0]}
        center
        distanceFactor={18}
        style={{ pointerEvents: "none" }}
      >
        <div
          className={`whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-mono font-bold transition-all duration-300 backdrop-blur-md border ${
            isSelected
              ? "bg-emerald-500/30 text-emerald-200 border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]"
              : isHovered
              ? "bg-slate-900/90 text-emerald-300 border-emerald-500/50 shadow-md scale-105"
              : "bg-slate-950/70 text-slate-300 border-slate-700/40"
          }`}
        >
          <span className="mr-1 text-[9px] text-emerald-400">✦</span>
          {node.name}
        </div>
      </Html>
    </group>
  );
}
