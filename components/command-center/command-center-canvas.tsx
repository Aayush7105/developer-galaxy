"use client";

import { Component, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { CoreReactor } from "./core-reactor";
import { SpaceEnvironment } from "./space-environment";
import { InteractiveNodes, type TechNodeData } from "./interactive-nodes";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("3D Command Center Canvas Error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-slate-950 p-6 text-center text-emerald-400">
          <div>
            <h3 className="text-xl font-bold">3D Canvas Render Error</h3>
            <p className="text-sm text-slate-400">Falling back to 2D telemetry HUD mode.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

interface CameraRigProps {
  selectedNode: TechNodeData | null;
  cameraPreset: "CORE" | "ORBIT" | "GRID" | "NODE_WEB";
}

function CameraRig({ selectedNode, cameraPreset }: CameraRigProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useFrame((state) => {
    if (!controlsRef.current) return;

    const targetPos = new THREE.Vector3(0, 0, 18);
    const lookTarget = new THREE.Vector3(0, 0, 0);

    if (selectedNode) {
      const [nx, ny, nz] = selectedNode.position;
      lookTarget.set(nx, ny, nz);
      targetPos.set(nx * 1.5 + 2, ny * 1.5 + 3, nz + 6);
    } else {
      switch (cameraPreset) {
        case "CORE":
          targetPos.set(0, 2, 9);
          lookTarget.set(0, 0, 0);
          break;
        case "GRID":
          targetPos.set(0, 15, 25);
          lookTarget.set(0, -2, 0);
          break;
        case "NODE_WEB":
          targetPos.set(-15, 10, 15);
          lookTarget.set(0, 0, 0);
          break;
        case "ORBIT":
        default:
          targetPos.set(0, 4, 20);
          lookTarget.set(0, 0, 0);
          break;
      }
    }

    state.camera.position.lerp(targetPos, 0.05);
    controlsRef.current.target.lerp(lookTarget, 0.05);
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan
      enableZoom
      enableRotate
      maxDistance={60}
      minDistance={3}
      rotateSpeed={0.6}
    />
  );
}

interface CommandCenterCanvasProps {
  selectedNode: TechNodeData | null;
  cameraPreset: "CORE" | "ORBIT" | "GRID" | "NODE_WEB";
  activeCategory: string;
  searchQuery: string;
  showParticles: boolean;
  showGrid: boolean;
  onSelectNode: (node: TechNodeData) => void;
}

export function CommandCenterCanvas({
  selectedNode,
  cameraPreset,
  activeCategory,
  searchQuery,
  showParticles,
  showGrid,
  onSelectNode,
}: CommandCenterCanvasProps) {
  return (
    <CanvasErrorBoundary>
      <div className="relative h-full w-full bg-[#02060d]">
        <Canvas
          camera={{ position: [0, 4, 20], fov: 60 }}
          gl={{ antialias: true, alpha: false }}
        >
          <SpaceEnvironment showParticles={showParticles} showGrid={showGrid} />
          <CoreReactor intensity={selectedNode ? 1.5 : 1.0} />
          <InteractiveNodes
            selectedNodeId={selectedNode?.id || null}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onSelectNode={onSelectNode}
          />
          <CameraRig selectedNode={selectedNode} cameraPreset={cameraPreset} />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
