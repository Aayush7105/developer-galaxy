"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { SiteShell } from "@/components/site-shell";
import { COMMAND_NODES, type TechNodeData } from "@/components/command-center/interactive-nodes";
import { CommandCenterHUD } from "@/components/command-center/command-center-hud";

// Dynamically import Canvas with SSR disabled
const DynamicCommandCenterCanvas = dynamic(
  () =>
    import("@/components/command-center/command-center-canvas").then(
      (mod) => mod.CommandCenterCanvas
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#02060d] text-emerald-400 font-mono">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-400" />
          <span className="text-xl font-bold">✦</span>
        </div>
        <p className="mt-4 text-sm font-semibold tracking-widest uppercase">
          Initializing 3D Quantum Engine...
        </p>
      </div>
    ),
  }
);

export default function CommandCenterPage() {
  const [selectedNode, setSelectedNode] = useState<TechNodeData | null>(
    COMMAND_NODES[0] // Default to Next.js node
  );
  const [cameraPreset, setCameraPreset] = useState<"CORE" | "ORBIT" | "GRID" | "NODE_WEB">(
    "ORBIT"
  );
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showParticles, setShowParticles] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  return (
    <SiteShell>
      <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden">
        {/* 3D R3F Scene Canvas */}
        <DynamicCommandCenterCanvas
          selectedNode={selectedNode}
          cameraPreset={cameraPreset}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          showParticles={showParticles}
          showGrid={showGrid}
          onSelectNode={(node) => setSelectedNode(node)}
        />

        {/* Futuristic Glassmorphic HUD Overlays */}
        <CommandCenterHUD
          selectedNode={selectedNode}
          cameraPreset={cameraPreset}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          showParticles={showParticles}
          showGrid={showGrid}
          audioEnabled={audioEnabled}
          onSelectNode={(node) => setSelectedNode(node)}
          onSetCameraPreset={(preset) => setCameraPreset(preset)}
          onSetCategory={(category) => setActiveCategory(category)}
          onSetSearchQuery={(query) => setSearchQuery(query)}
          onToggleParticles={() => setShowParticles(!showParticles)}
          onToggleGrid={() => setShowGrid(!showGrid)}
          onToggleAudio={() => setAudioEnabled(!audioEnabled)}
        />
      </div>
    </SiteShell>
  );
}
