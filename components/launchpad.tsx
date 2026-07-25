"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

export type Project = {
  name: string;
  category: string;
  builders: number;
  stack: string;
  description: string;
  signal: string;
  stage?: "Saved" | "Researching" | "Ready to contribute";
  note?: string;
};

const storageKey = "dev-galaxy-launchpad";
const launchpadEvent = "dev-galaxy-launchpad-change";

function readLaunchpad(): Project[] {
  try {
    const value = window.localStorage.getItem(storageKey);
    const projects: unknown = value ? JSON.parse(value) : [];
    return Array.isArray(projects) ? projects.filter((project): project is Project =>
      typeof project === "object" && project !== null && "name" in project && typeof project.name === "string"
    ) : [];
  } catch {
    return [];
  }
}

function writeLaunchpad(projects: Project[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(projects));
  window.dispatchEvent(new Event(launchpadEvent));
}

export function useLaunchpad() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const refresh = () => setProjects(readLaunchpad());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(launchpadEvent, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(launchpadEvent, refresh);
    };
  }, []);

  const save = useCallback((project: Project) => {
    const current = readLaunchpad();
    if (!current.some((item) => item.name === project.name)) writeLaunchpad([...current, project]);
  }, []);

  const remove = useCallback((name: string) => writeLaunchpad(readLaunchpad().filter((project) => project.name !== name)), []);
  const update = useCallback((name: string, changes: Partial<Project>) => writeLaunchpad(readLaunchpad().map((project) => project.name === name ? { ...project, ...changes } : project)), []);
  const clear = useCallback(() => writeLaunchpad([]), []);

  return { projects, save, remove, update, clear };
}

export function SaveToLaunchpadButton({ project, className = "" }: { project: Project; className?: string }) {
  const { projects, save, remove } = useLaunchpad();
  const isSaved = projects.some((item) => item.name === project.name);

  return (
    <button
      type="button"
      aria-pressed={isSaved}
      onClick={() => isSaved ? remove(project.name) : save(project)}
      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${isSaved ? "border-emerald-300/60 bg-emerald-300/10 text-emerald-200" : "border-white/15 text-white/70 hover:border-emerald-300/60 hover:text-emerald-200"} ${className}`}
    >
      {isSaved ? "Saved to launchpad" : "Save to launchpad"}
    </button>
  );
}

export function Launchpad() {
  const { projects, remove, update, clear } = useLaunchpad();
  const [filter, setFilter] = useState<"All" | "Saved" | "Researching" | "Ready to contribute">("All");
  const visibleProjects = filter === "All" ? projects : projects.filter((project) => (project.stage ?? "Saved") === filter);

  if (!projects.length) {
    return <div className="mt-10 rounded-2xl border border-dashed border-emerald-300/30 bg-emerald-300/[0.04] px-6 py-14 text-center"><p className="text-sm font-semibold text-white">Your launchpad is clear.</p><p className="mt-2 text-sm text-white/50">Save a mission from the constellation, then use this space to decide what to do next.</p><Link href="/constellation" className="mt-6 inline-flex rounded-full bg-emerald-300 px-4 py-2.5 text-xs font-bold text-emerald-950 transition hover:bg-emerald-200">Explore missions</Link></div>;
  }

  return <>
    <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div><p className="text-sm font-semibold text-white">{projects.length} saved {projects.length === 1 ? "mission" : "missions"}</p><p className="mt-1 text-xs text-white/45">Keep the list small enough to make a real next move.</p></div>
      <div className="flex flex-wrap items-center gap-2">{(["All", "Saved", "Researching", "Ready to contribute"] as const).map((stage) => <button type="button" key={stage} onClick={() => setFilter(stage)} className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${filter === stage ? "bg-emerald-300 text-emerald-950" : "bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"}`}>{stage}</button>)}<button type="button" onClick={() => { if (window.confirm("Clear every saved mission from your launchpad?")) clear(); }} className="ml-1 text-xs font-semibold text-white/40 transition hover:text-rose-200">Clear all</button></div>
    </div>
    {visibleProjects.length ? <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visibleProjects.map((project, index) => <article key={project.name} className="rounded-2xl border border-emerald-300/25 bg-emerald-300/[0.05] p-5"><div className="flex items-start justify-between gap-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-300/10 text-sm font-bold text-emerald-300">{String(index + 1).padStart(2, "0")}</span><button type="button" onClick={() => remove(project.name)} className="text-xs font-semibold text-white/45 transition hover:text-rose-200" aria-label={`Remove ${project.name} from launchpad`}>Remove</button></div><h2 className="mt-8 text-lg font-semibold">{project.name}</h2><p className="mt-1 text-sm text-white/45">{project.category}</p><p className="mt-4 min-h-10 text-xs leading-5 text-white/55">{project.description}</p><div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/55"><span>{project.stack}</span><span>{project.builders} builders</span></div><p className="mt-4 text-[11px] font-medium text-emerald-200/85">{project.signal}</p><label className="mt-5 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">Progress<select value={project.stage ?? "Saved"} onChange={(event) => update(project.name, { stage: event.target.value as Project["stage"] })} className="mt-2 block w-full rounded-lg border border-white/10 bg-[#07110d] px-3 py-2 text-xs font-medium text-white outline-none focus:border-emerald-300/60"><option>Saved</option><option>Researching</option><option>Ready to contribute</option></select></label><label className="mt-4 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">Your next step<textarea value={project.note ?? ""} onChange={(event) => update(project.name, { note: event.target.value })} placeholder="e.g. Read contribution guide on Saturday" className="mt-2 block min-h-20 w-full resize-y rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs normal-case tracking-normal text-white outline-none placeholder:text-white/25 focus:border-emerald-300/60" /></label></article>)}</div> : <div className="mt-5 rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center text-sm text-white/50">No projects are in the “{filter}” stage yet.</div>}
  </>;
}
