"use client";

import React, { useState } from "react";
import Globe from "../globe";

const missions = [
  { name: "Orbit UI", stack: "TypeScript · React", contributors: "18 builders", status: "3 good-first issues" },
  { name: "Prism Cache", stack: "Rust · WebAssembly", contributors: "7 builders", status: "Maintainer online" },
  { name: "Kindred", stack: "Python · AI tooling", contributors: "24 builders", status: "2 review requests" },
];

const Landing = () => {
  const [exploring, setExploring] = useState(false);
  const [selectedMission, setSelectedMission] = useState(0);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#020806] text-white selection:bg-emerald-300 selection:text-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(16,185,129,0.14),transparent_28%),radial-gradient(circle_at_8%_80%,rgba(20,184,166,0.08),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(52,211,153,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.07)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />

      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <a href="#top" className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-emerald-300/60 bg-emerald-300/10 text-sm text-emerald-300">✦</span>
          Dev Galaxy
        </a>
        <nav className="hidden items-center gap-7 text-xs font-medium text-white/55 md:flex">
          <a className="transition hover:text-emerald-300" href="#signals">Signals</a>
          <a className="transition hover:text-emerald-300" href="#constellation">Constellation</a>
          <a className="transition hover:text-emerald-300" href="#about">About</a>
        </nav>
        <button onClick={() => setExploring(true)} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur transition hover:border-emerald-300/60 hover:text-emerald-200" type="button">Join the orbit</button>
      </header>

      {/* Hero text */}
      <div id="top" className="absolute inset-x-0 top-[18%] z-10 flex flex-col items-center px-6 text-center sm:top-[20%]">
        <div className="mb-5 flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200/90 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
          8,412 builders online now
        </div>
        <h1 className="max-w-3xl text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.12em] text-white sm:text-5xl lg:text-6xl">
          Build where ideas<br /><span className="text-emerald-300">become constellations.</span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-6 tracking-wide text-white/55">
          Find your next open-source orbit. Connect with people turning curious commits into meaningful momentum.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button onClick={() => setExploring(true)} className="rounded-full bg-emerald-300 px-5 py-3 text-xs font-bold text-emerald-950 transition hover:bg-emerald-200" type="button">
            {exploring ? "Exploration started" : "Start exploring"} <span aria-hidden="true">→</span>
          </button>
          <a href="#signals" className="rounded-full border border-white/15 bg-black/20 px-5 py-3 text-xs font-bold text-white/80 backdrop-blur transition hover:border-white/35 hover:bg-white/10">View live signals</a>
        </div>
      </div>

      <section id="signals" className="absolute inset-x-0 bottom-5 z-20 mx-auto grid w-[min(92%,960px)] grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md sm:bottom-8">
        <div className="border-r border-white/10 px-3 py-3 text-center sm:px-6 sm:py-4"><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">Active repos</p><p className="mt-1 text-base font-semibold text-white sm:text-lg">24.8k</p></div>
        <div className="border-r border-white/10 px-3 py-3 text-center sm:px-6 sm:py-4"><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">Merges today</p><p className="mt-1 text-base font-semibold text-white sm:text-lg">1,384</p></div>
        <div id="constellation" className="px-3 py-3 text-center sm:px-6 sm:py-4"><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">Open missions</p><p className="mt-1 text-base font-semibold text-white sm:text-lg">392</p></div>
      </section>

      {/*
        Half globe peeking from the bottom edge.

        - Sized off viewport HEIGHT (90vh), not page width. Page width
          varies enormously between mobile and desktop, but this box's
          "reveal exactly half of me" trick (bottom-0 + translate-y-1/2)
          is relative to page height — so tying the box's size to width
          made it balloon to several times the viewport's height on wide
          desktop screens, pushing the visible slice into the box's empty
          padding and making the globe appear to vanish. Driving it off
          vh keeps the proportions consistent on any screen.
        - aspect-square keeps it circular; width auto-derives from height.
        - bottom-0 anchors the box's bottom edge to the page's bottom edge.
        - translate-y-1/2 then shifts it down by exactly half its own
          height — which always reveals exactly the top half of the box,
          flush against the bottom edge, regardless of box size.
        - height="90vh" / width="auto" on the Globe props mirror the
          className so the inline style doesn't fight the aspect-ratio.
      */}
      <Globe
        width="auto"
        height="90vh"
        className="absolute bottom-0 left-1/2 aspect-square h-[90vh] w-[150%] -translate-x-1/2 translate-y-1/2"
      />

      <p id="about" className="absolute bottom-[6.5rem] left-6 z-10 hidden max-w-[12rem] text-[10px] uppercase leading-5 tracking-[0.16em] text-white/35 lg:block">A living map of open source collaboration.</p>

      <aside aria-label="Open source missions" className={`absolute inset-y-0 right-0 z-30 w-full max-w-md border-l border-white/10 bg-[#07110d]/95 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-500 sm:p-8 ${exploring ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">Mission control</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Find your next orbit.</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">Fresh collaboration signals, picked for builders ready to contribute.</p>
          </div>
          <button onClick={() => setExploring(false)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-lg text-white/65 transition hover:border-emerald-300/60 hover:text-emerald-200" type="button" aria-label="Close mission control">×</button>
        </div>

        <div className="mt-8 space-y-3">
          {missions.map((mission, index) => (
            <button key={mission.name} onClick={() => setSelectedMission(index)} className={`w-full rounded-xl border p-4 text-left transition ${selectedMission === index ? "border-emerald-300/60 bg-emerald-300/10" : "border-white/10 bg-white/[0.03] hover:border-white/25"}`} type="button">
              <div className="flex items-center justify-between gap-3"><span className="font-semibold text-white">{mission.name}</span><span className="h-2 w-2 rounded-full bg-emerald-300" /></div>
              <p className="mt-1 text-xs text-white/45">{mission.stack}</p>
              <p className="mt-3 text-[11px] font-medium text-emerald-200/85">{mission.status} · {mission.contributors}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-emerald-300/25 bg-emerald-300/[0.04] p-4">
          <p className="text-xs font-semibold text-white">Ready to make contact?</p>
          <p className="mt-1 text-xs leading-5 text-white/50">We&apos;ll save {missions[selectedMission].name} to your launchpad.</p>
          <button className="mt-4 w-full rounded-lg bg-emerald-300 px-4 py-2.5 text-xs font-bold text-emerald-950 transition hover:bg-emerald-200" type="button">Add to launchpad</button>
        </div>
      </aside>
    </div>
  );
};

export default Landing;
