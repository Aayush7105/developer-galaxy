"use client";

import { useMemo, useState } from "react";

type SignalKind = "Code" | "Community" | "Release";

type Signal = {
  project: string;
  action: string;
  time: string;
  kind: SignalKind;
  accent: string;
  detail: string;
  nextStep: string;
  people: string;
};

const signals: Signal[] = [
  { project: "Orbit UI", action: "opened three good-first issues", time: "2m ago", kind: "Code", accent: "bg-emerald-300", detail: "A new accessibility pass needs help with keyboard navigation and documentation examples.", nextStep: "Browse the issue brief and pick a component.", people: "18 builders active" },
  { project: "Prism Cache", action: "merged a WebAssembly performance patch", time: "8m ago", kind: "Code", accent: "bg-cyan-300", detail: "The maintainers published profiling notes and are asking for benchmark verification across browsers.", nextStep: "Run the benchmark guide on your machine.", people: "7 builders active" },
  { project: "Kindred", action: "welcomed four new contributors", time: "14m ago", kind: "Community", accent: "bg-violet-300", detail: "A maintainer is hosting a short orientation thread for people interested in the evaluation toolkit.", nextStep: "Introduce yourself in the newcomer thread.", people: "24 builders active" },
  { project: "Open Lantern", action: "published its accessibility roadmap", time: "22m ago", kind: "Release", accent: "bg-amber-300", detail: "The roadmap is split into small, well-scoped audits for forms, navigation, and content patterns.", nextStep: "Choose an audit that matches your experience.", people: "12 builders active" },
  { project: "Tidepool", action: "asked for help validating ocean data", time: "31m ago", kind: "Community", accent: "bg-sky-300", detail: "The dataset has a new coastal coverage layer that needs regional review before release.", nextStep: "Claim a region and verify the source notes.", people: "9 builders active" },
  { project: "Mosaic", action: "shipped a collaborative canvas update", time: "46m ago", kind: "Release", accent: "bg-pink-300", detail: "The release introduces multiplayer cursors and a compact list of follow-up visual bugs.", nextStep: "Try the demo and report a focused visual issue.", people: "16 builders active" },
];

const filters: Array<"All" | SignalKind> = ["All", "Code", "Community", "Release"];

export function SignalsFeed() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selectedProject, setSelectedProject] = useState(signals[0].project);
  const visibleSignals = useMemo(() => filter === "All" ? signals : signals.filter((signal) => signal.kind === filter), [filter]);
  const selectedSignal = signals.find((signal) => signal.project === selectedProject) ?? visibleSignals[0];

  return <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem]">
    <section>
      <div className="rounded-2xl border border-emerald-300/25 bg-emerald-300/[0.06] p-5 sm:flex sm:items-center sm:justify-between">
        <div><p className="text-sm font-semibold text-emerald-100">24 contribution-ready signals in the last hour</p><p className="mt-1 text-xs leading-5 text-emerald-100/55">Prioritised for clear scope, active maintainers, and an obvious first move.</p></div><div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-200 sm:mt-0"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" /> Refreshing pulse</div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2" aria-label="Filter signals">{filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${filter === item ? "bg-emerald-300 text-emerald-950" : "border border-white/10 bg-white/[0.03] text-white/55 hover:border-emerald-300/45 hover:text-emerald-200"}`}>{item === "All" ? "All signals" : item}</button>)}</div>
      <div className="mt-5 space-y-3">{visibleSignals.map((signal) => <button key={signal.project} type="button" onClick={() => setSelectedProject(signal.project)} className={`flex w-full items-center gap-4 rounded-xl border p-5 text-left transition ${selectedSignal.project === signal.project ? "border-emerald-300/55 bg-emerald-300/[0.08]" : "border-white/10 bg-white/[0.03] hover:border-white/25"}`}><span className={`h-2.5 w-2.5 shrink-0 rounded-full ${signal.accent}`} /><div className="min-w-0 flex-1"><p className="text-sm text-white"><span className="font-semibold">{signal.project}</span> <span className="text-white/55">{signal.action}</span></p><p className="mt-1 text-xs text-white/35">{signal.kind} signal · {signal.people}</p></div><time className="shrink-0 text-xs text-white/35">{signal.time}</time></button>)}</div>
    </section>
    <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:sticky lg:top-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">Signal inspector</p><div className="mt-5 flex items-center gap-3"><span className={`h-3 w-3 rounded-full ${selectedSignal.accent}`} /><div><h2 className="font-semibold text-white">{selectedSignal.project}</h2><p className="mt-0.5 text-xs text-white/40">{selectedSignal.kind} · {selectedSignal.time}</p></div></div><p className="mt-6 text-sm leading-6 text-white/60">{selectedSignal.detail}</p><div className="mt-6 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.05] p-4"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300">Suggested first move</p><p className="mt-2 text-sm font-medium leading-6 text-emerald-50">{selectedSignal.nextStep}</p></div><a href="/constellation" className="mt-6 inline-flex w-full items-center justify-center rounded-lg border border-white/15 px-4 py-2.5 text-xs font-bold text-white/75 transition hover:border-emerald-300/60 hover:text-emerald-200">Explore project constellation</a></aside>
  </div>;
}
