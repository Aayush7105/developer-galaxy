"use client";

import React, { useState, useEffect } from "react";
import { COMMAND_NODES, type TechNodeData } from "./interactive-nodes";
import { commandAudio } from "@/lib/command-center-audio";

interface CommandCenterHUDProps {
  selectedNode: TechNodeData | null;
  cameraPreset: "CORE" | "ORBIT" | "GRID" | "NODE_WEB";
  activeCategory: string;
  searchQuery: string;
  showParticles: boolean;
  showGrid: boolean;
  audioEnabled: boolean;
  onSelectNode: (node: TechNodeData | null) => void;
  onSetCameraPreset: (preset: "CORE" | "ORBIT" | "GRID" | "NODE_WEB") => void;
  onSetCategory: (category: string) => void;
  onSetSearchQuery: (query: string) => void;
  onToggleParticles: () => void;
  onToggleGrid: () => void;
  onToggleAudio: () => void;
}

export function CommandCenterHUD({
  selectedNode,
  cameraPreset,
  activeCategory,
  searchQuery,
  showParticles,
  showGrid,
  audioEnabled,
  onSelectNode,
  onSetCameraPreset,
  onSetCategory,
  onSetSearchQuery,
  onToggleParticles,
  onToggleGrid,
  onToggleAudio,
}: CommandCenterHUDProps) {
  const [timeStr, setTimeStr] = useState("");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "SYS_INIT: Quantum Core Initialized",
    "NET_MESH: 10 Tech Constellation Nodes Linked",
    "STATUS: Ready for tactical navigation",
  ]);
  const [pinging, setPinging] = useState(false);

  // Live system time clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toUTCString().replace(" GMT", " UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    "ALL",
    "Frontend",
    "Backend",
    "AI & Data",
    "DevOps & Cloud",
    "3D & Graphics",
  ];

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newLogs = [...terminalLogs, `> ${terminalInput}`];

    if (cmd === "help") {
      newLogs.push("Commands: list, ping, reset, focus <node_id>, clear");
    } else if (cmd === "list") {
      newLogs.push(`Active Nodes: ${COMMAND_NODES.map((n) => n.id).join(", ")}`);
    } else if (cmd === "clear") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    } else if (cmd === "reset") {
      onSelectNode(null);
      onSetCameraPreset("ORBIT");
      newLogs.push("Camera target reset to central orbit");
    } else if (cmd.startsWith("focus ")) {
      const nodeId = cmd.replace("focus ", "").trim();
      const match = COMMAND_NODES.find((n) => n.id.toLowerCase() === nodeId);
      if (match) {
        onSelectNode(match);
        commandAudio.playWarp();
        newLogs.push(`Warping camera target to node [${match.name}]`);
      } else {
        newLogs.push(`Node '${nodeId}' not found. Type 'list' for node IDs.`);
      }
    } else {
      newLogs.push(`Executed diagnostic payload: ${cmd}`);
    }

    setTerminalLogs(newLogs.slice(-8));
    setTerminalInput("");
  };

  const handleSimulatePing = () => {
    if (pinging || !selectedNode) return;
    setPinging(true);
    commandAudio.playWarp();
    setTimeout(() => {
      setPinging(false);
      setTerminalLogs((prev) => [
        ...prev,
        `PING [${selectedNode.id}]: RTT=${selectedNode.latency + Math.floor(Math.random() * 4)}ms STATUS=200 OK`,
      ]);
    }, 600);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-6 font-sans select-none">
      {/* ================= TOP HUD BAR ================= */}
      <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-slate-950/80 px-5 py-3 backdrop-blur-xl shadow-[0_0_20px_rgba(52,211,153,0.1)]">
        {/* Left Status Badge */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
          </div>
          <div>
            <h1 className="text-xs font-mono font-bold tracking-[0.25em] text-emerald-400 uppercase">
              Developer Galaxy // 3D Command Center
            </h1>
            <p className="text-[10px] text-slate-400 font-mono">
              STATUS: ONLINE • SECURE QUANTUM LINK
            </p>
          </div>
        </div>

        {/* Telemetry Stats */}
        <div className="hidden items-center gap-6 text-xs font-mono md:flex">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400">SYS TIME</span>
            <span className="text-emerald-300 font-semibold">{timeStr || "LOADING..."}</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400">NODES LINKED</span>
            <span className="text-emerald-300 font-semibold">{COMMAND_NODES.length} Active</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400">ENGINE FPS</span>
            <span className="text-emerald-300 font-semibold">60.0 FPS</span>
          </div>
        </div>

        {/* Audio & Grid Quick Toggles */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => {
              onToggleAudio();
              if (!audioEnabled) commandAudio.playHover();
            }}
            className={`rounded-lg border px-3 py-1.5 font-mono text-[11px] font-semibold transition ${
              audioEnabled
                ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.2)]"
                : "border-slate-800 bg-slate-900/60 text-slate-400"
            }`}
          >
            SFX: {audioEnabled ? "ON 🔊" : "MUTED 🔇"}
          </button>
        </div>
      </div>

      {/* ================= MAIN MIDDLE HUD (LEFT & RIGHT PANELS) ================= */}
      <div className="my-4 flex flex-1 flex-col gap-4 overflow-hidden md:flex-row">
        {/* LEFT PANEL: NODE DIRECTORY & CATEGORY FILTERS */}
        <div className="pointer-events-auto flex w-full flex-col rounded-2xl border border-emerald-500/20 bg-slate-950/85 p-4 backdrop-blur-xl md:w-80 shadow-2xl overflow-hidden">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <span>✦</span> Node Directory
            </h2>
            <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
              {COMMAND_NODES.length} Units
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search tech stack node..."
              value={searchQuery}
              onChange={(e) => onSetSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => onSetSearchQuery("")}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="mb-3 flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSetCategory(cat);
                  if (audioEnabled) commandAudio.playHover();
                }}
                className={`rounded-lg px-2.5 py-1 text-[10px] font-mono transition ${
                  activeCategory === cat
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(52,211,153,0.4)]"
                    : "bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-emerald-500/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Node List Scroll Container */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
            {COMMAND_NODES.filter((n) => {
              const matchCat =
                activeCategory === "ALL" || n.category === activeCategory;
              const matchSearch =
                n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.id.toLowerCase().includes(searchQuery.toLowerCase());
              return matchCat && matchSearch;
            }).map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => {
                    onSelectNode(node);
                    if (audioEnabled) commandAudio.playSelect();
                  }}
                  className={`w-full text-left rounded-xl p-2.5 transition flex items-center justify-between border ${
                    isSelected
                      ? "bg-emerald-500/20 border-emerald-400/80 text-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.2)]"
                      : "bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-900/90 hover:border-slate-700"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold font-mono flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full inline-block"
                        style={{ backgroundColor: node.color }}
                      />
                      {node.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {node.category} • {node.version}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    {node.latency}ms
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTER SPACER FOR 3D CANVAS VIEW */}
        <div className="flex-1" />

        {/* RIGHT PANEL: SELECTED NODE INSPECTOR & TELEMETRY */}
        {selectedNode ? (
          <div className="pointer-events-auto flex w-full flex-col rounded-2xl border border-emerald-500/30 bg-slate-950/90 p-5 backdrop-blur-xl md:w-96 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">
                  // Selected Node Telemetry
                </span>
                <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                  {selectedNode.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedNode.category} • {selectedNode.version}
                </p>
              </div>
              <button
                onClick={() => onSelectNode(null)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-400 hover:text-white hover:border-slate-700"
              >
                ✕ Close
              </button>
            </div>

            {/* Status & Description */}
            <div className="my-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Node Status
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                  ● {selectedNode.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedNode.description}
              </p>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 my-2 font-mono text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
                <span className="text-[9px] text-slate-400 uppercase">
                  Response Latency
                </span>
                <p className="text-sm font-bold text-emerald-400">
                  {selectedNode.latency} ms
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
                <span className="text-[9px] text-slate-400 uppercase">
                  Data Throughput
                </span>
                <p className="text-sm font-bold text-sky-400">
                  {selectedNode.throughput}
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
                <span className="text-[9px] text-slate-400 uppercase">
                  Mesh Topology
                </span>
                <p className="text-sm font-bold text-purple-400">
                  {selectedNode.connections.length} Links
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
                <span className="text-[9px] text-slate-400 uppercase">
                  3D Coordinates
                </span>
                <p className="text-xs font-bold text-amber-400">
                  [{selectedNode.position.join(", ")}]
                </p>
              </div>
            </div>

            {/* Waveform Telemetry Graphic */}
            <div className="my-2 rounded-xl border border-slate-800 bg-slate-900/40 p-3">
              <span className="text-[9px] font-mono text-slate-400 uppercase block mb-1">
                Realtime Signal Waveform
              </span>
              <svg className="w-full h-10 stroke-emerald-400 fill-none" viewBox="0 0 200 40">
                <path
                  d="M 0 20 Q 25 5, 50 20 T 100 20 T 150 35 T 200 20"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              </svg>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto flex gap-2 pt-2">
              <button
                onClick={handleSimulatePing}
                disabled={pinging}
                className="flex-1 rounded-xl border border-emerald-500/40 bg-emerald-500/15 py-2 text-xs font-mono font-bold text-emerald-300 transition hover:bg-emerald-500 hover:text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.2)] disabled:opacity-50"
              >
                {pinging ? "PINGING..." : "⚡ SIMULATE PING"}
              </button>
              <button
                onClick={() => {
                  onSetCameraPreset("ORBIT");
                  onSelectNode(null);
                  if (audioEnabled) commandAudio.playWarp();
                }}
                className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-slate-400 hover:text-white"
              >
                RESET CAMERA
              </button>
            </div>
          </div>
        ) : (
          <div className="pointer-events-auto hidden md:flex w-72 flex-col justify-center rounded-2xl border border-slate-800/60 bg-slate-950/60 p-5 backdrop-blur-md text-center text-slate-400 font-mono text-xs">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-lg">
              ✦
            </div>
            <p className="font-semibold text-slate-200">Interactive 3D Mesh</p>
            <p className="text-[11px] text-slate-400 mt-1">
              Click any glowing 3D node or choose from directory on left to inspect real-time specs.
            </p>
          </div>
        )}
      </div>

      {/* ================= BOTTOM HUD BAR (CAMERA PRESETS & TERMINAL) ================= */}
      <div className="pointer-events-auto flex flex-col gap-3 rounded-2xl border border-emerald-500/20 bg-slate-950/80 p-3.5 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Camera View Mode Presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <span className="mr-1 text-[10px] text-slate-400 uppercase">
              CAMERA VIEW:
            </span>
            {[
              { id: "ORBIT", label: "Orbital Axis" },
              { id: "CORE", label: "Core Focus" },
              { id: "NODE_WEB", label: "Node Web" },
              { id: "GRID", label: "Tactical Grid" },
            ].map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  onSetCameraPreset(preset.id as "CORE" | "ORBIT" | "GRID" | "NODE_WEB");
                  if (audioEnabled) commandAudio.playWarp();
                }}
                className={`rounded-lg px-3 py-1.5 transition ${
                  cameraPreset === preset.id
                    ? "bg-emerald-500/25 text-emerald-300 font-bold border border-emerald-400/60 shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                    : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Environmental Toggles */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => {
                onToggleParticles();
                if (audioEnabled) commandAudio.playHover();
              }}
              className={`rounded-lg border px-2.5 py-1 text-[10px] transition ${
                showParticles
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                  : "border-slate-800 text-slate-500"
              }`}
            >
              PARTICLES: {showParticles ? "ON" : "OFF"}
            </button>
            <button
              onClick={() => {
                onToggleGrid();
                if (audioEnabled) commandAudio.playHover();
              }}
              className={`rounded-lg border px-2.5 py-1 text-[10px] transition ${
                showGrid
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                  : "border-slate-800 text-slate-500"
              }`}
            >
              GRID: {showGrid ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        {/* Command Terminal Input */}
        <form onSubmit={handleTerminalSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-2 text-xs font-mono text-emerald-400">
              &gt;
            </span>
            <input
              type="text"
              placeholder="Enter command (e.g. 'focus nextjs', 'list', 'ping', 'help')..."
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-1.5 pl-7 pr-3 text-xs text-emerald-300 placeholder-slate-500 outline-none transition focus:border-emerald-500/50 font-mono"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-4 py-1.5 text-xs font-mono font-bold text-emerald-300 transition hover:bg-emerald-500 hover:text-slate-950"
          >
            EXECUTE
          </button>
        </form>
      </div>
    </div>
  );
}
