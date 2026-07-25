"use client";

import React, { useState } from "react";
import Link from "next/link";
import Globe from "../globe";
import { SaveToLaunchpadButton, type Project } from "../launchpad";

const missions = [
  { name: "Orbit UI", stack: "TypeScript · React", contributors: "18 builders", status: "3 good-first issues" },
  { name: "Prism Cache", stack: "Rust · WebAssembly", contributors: "7 builders", status: "Maintainer online" },
  { name: "Kindred", stack: "Python · AI tooling", contributors: "24 builders", status: "2 review requests" },
];

const launchpadMissions: Project[] = [
  { name: "Orbit UI", category: "Interface systems", builders: 18, stack: "TypeScript", description: "A thoughtful toolkit for product teams building calm, capable interfaces.", signal: "3 good-first issues" },
  { name: "Prism Cache", category: "Data infrastructure", builders: 7, stack: "Rust", description: "Fast, inspectable caching primitives for the edge and beyond.", signal: "Maintainer online" },
  { name: "Kindred", category: "AI tooling", builders: 24, stack: "Python", description: "Small, composable tools for teams making AI useful in the real world.", signal: "2 review requests" },
];

const Landing = () => {
  const [exploring, setExploring] = useState(false);
  const [selectedMission, setSelectedMission] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#020806] text-white selection:bg-emerald-300 selection:text-black">
      {/* Dynamic backdrop glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_12%_75%,rgba(20,184,166,0.12),transparent_30%),radial-gradient(circle_at_88%_30%,rgba(52,211,153,0.08),transparent_25%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(52,211,153,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />

      {/* Floating Header */}
      <header className="absolute inset-x-0 top-4 z-30 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass-nav flex items-center justify-between rounded-full px-5 py-3 shadow-xl">
          <Link href="/" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-emerald-300/60 bg-emerald-300/10 text-sm text-emerald-300 transition duration-300 group-hover:scale-110 group-hover:bg-emerald-300/20">
              ✦
            </span>
            <span className="transition group-hover:text-emerald-300">Dev Galaxy</span>
          </Link>

          <nav className="hidden items-center gap-6 text-xs font-medium text-white/60 md:flex">
            <Link className="transition hover:text-emerald-300" href="/signals">Signals</Link>
            <Link className="transition hover:text-emerald-300" href="/constellation">Constellation</Link>
            <Link className="transition hover:text-emerald-300" href="/launchpad">Launchpad</Link>
            <Link className="transition hover:text-emerald-300" href="/about">About</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setExploring(true)}
              className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 text-xs font-semibold text-emerald-300 backdrop-blur transition hover:border-emerald-300 hover:bg-emerald-300 hover:text-emerald-950 shadow-sm hover:shadow-emerald-300/20"
              type="button"
            >
              Join the orbit
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-emerald-300/40 md:hidden"
              aria-label="Toggle navigation menu"
              type="button"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="glass-panel mt-2 rounded-2xl p-4 md:hidden">
            <nav className="flex flex-col gap-2 text-sm">
              <Link className="rounded-xl px-4 py-2 transition hover:bg-white/5 text-white/80 hover:text-emerald-300" href="/signals" onClick={() => setMobileMenuOpen(false)}>Signals</Link>
              <Link className="rounded-xl px-4 py-2 transition hover:bg-white/5 text-white/80 hover:text-emerald-300" href="/constellation" onClick={() => setMobileMenuOpen(false)}>Constellation</Link>
              <Link className="rounded-xl px-4 py-2 transition hover:bg-white/5 text-white/80 hover:text-emerald-300" href="/launchpad" onClick={() => setMobileMenuOpen(false)}>Launchpad</Link>
              <Link className="rounded-xl px-4 py-2 transition hover:bg-white/5 text-white/80 hover:text-emerald-300" href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Content */}
      <div id="top" className="absolute inset-x-0 top-[18%] z-10 flex flex-col items-center px-6 text-center sm:top-[20%]">
        <div className="mb-5 flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-200 backdrop-blur-md emerald-glow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_8px_#34d399]" />
          8,412 builders online now
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.1em] text-white sm:text-6xl lg:text-7xl">
          Build where ideas<br />
          <span className="text-gradient-emerald drop-shadow-sm">become constellations.</span>
        </h1>

        <p className="mt-6 max-w-lg text-sm leading-6 tracking-wide text-white/65 sm:text-base">
          Find your next open-source orbit. Connect with builders turning curious commits into meaningful momentum.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setExploring(true)}
            className="group rounded-full bg-emerald-300 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-emerald-950 transition hover:bg-emerald-200 emerald-glow-sm hover:scale-105"
            type="button"
          >
            {exploring ? "Exploration active" : "Start exploring"}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </button>
          <Link
            href="/signals"
            className="glass-card rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white/90 hover:text-emerald-200 hover:scale-105"
          >
            View live signals
          </Link>
        </div>
      </div>

      {/* Floating Glass Stats Bar */}
      <section id="signals" className="glass-panel absolute inset-x-0 bottom-5 z-20 mx-auto grid w-[min(92%,960px)] grid-cols-3 overflow-hidden rounded-2xl sm:bottom-8">
        <div className="border-r border-white/10 px-3 py-3 text-center sm:px-6 sm:py-4 transition hover:bg-white/[0.03]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">Active repos</p>
          <p className="mt-1 text-lg font-extrabold text-white sm:text-2xl">24.8k</p>
        </div>
        <div className="border-r border-white/10 px-3 py-3 text-center sm:px-6 sm:py-4 transition hover:bg-white/[0.03]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">Merges today</p>
          <p className="mt-1 text-lg font-extrabold text-white sm:text-2xl">1,384</p>
        </div>
        <div id="constellation" className="px-3 py-3 text-center sm:px-6 sm:py-4 transition hover:bg-white/[0.03]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">Open missions</p>
          <p className="mt-1 text-lg font-extrabold text-white sm:text-2xl">392</p>
        </div>
      </section>

      {/* 3D Globe */}
      <Globe
        width="auto"
        height="90vh"
        className="absolute bottom-0 left-1/2 aspect-square h-[90vh] w-[150%] -translate-x-1/2 translate-y-1/2"
      />

      <p id="about" className="absolute bottom-[6.5rem] left-6 z-10 hidden max-w-[12rem] text-[10px] uppercase leading-5 tracking-[0.18em] text-white/40 lg:block">
        A living map of open source collaboration.
      </p>

      {/* Mission Control Drawer */}
      <aside
        aria-label="Open source missions"
        className={`glass-panel absolute inset-y-0 right-0 z-40 w-full max-w-md border-l border-white/15 p-6 shadow-2xl transition-transform duration-500 ease-out sm:p-8 ${
          exploring ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
              ✦ Mission control
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">Find your next orbit.</h2>
            <p className="mt-1.5 text-sm leading-6 text-white/60">Fresh collaboration signals, picked for builders ready to contribute.</p>
          </div>
          <button
            onClick={() => setExploring(false)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-lg text-white/70 transition hover:border-emerald-300/60 hover:bg-white/10 hover:text-emerald-200"
            type="button"
            aria-label="Close mission control"
          >
            ×
          </button>
        </div>

        <div className="mt-7 space-y-3">
          {missions.map((mission, index) => (
            <button
              key={mission.name}
              onClick={() => setSelectedMission(index)}
              className={`w-full rounded-2xl border p-4 text-left transition-all ${
                selectedMission === index
                  ? "border-emerald-300/60 bg-emerald-300/15 shadow-lg shadow-emerald-300/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
              }`}
              type="button"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-white">{mission.name}</span>
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_6px_#34d399]" />
              </div>
              <p className="mt-1 text-xs text-white/50">{mission.stack}</p>
              <p className="mt-3 text-[11px] font-medium text-emerald-200/90">{mission.status} · {mission.contributors}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-emerald-300/30 bg-emerald-300/[0.06] p-5 backdrop-blur-md">
          <p className="text-xs font-semibold text-white">Ready to make contact?</p>
          <p className="mt-1 text-xs leading-5 text-white/60">
            We&apos;ll save <span className="font-medium text-emerald-300">{missions[selectedMission].name}</span> to your launchpad.
          </p>
          <SaveToLaunchpadButton
            project={launchpadMissions[selectedMission]}
            className="mt-4 w-full border-0 bg-emerald-300 text-emerald-950 font-bold hover:bg-emerald-200 hover:text-emerald-950 shadow-md hover:shadow-emerald-300/30 transition"
          />
        </div>
      </aside>
    </div>
  );
};

export default Landing;
