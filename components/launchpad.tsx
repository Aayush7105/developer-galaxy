"use client";

import { useCallback, useEffect, useState } from "react";

export type Project = {
  name: string;
  category: string;
  builders: number;
  stack: string;
  description: string;
  signal: string;
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

  return { projects, save, remove };
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
  const { projects, remove } = useLaunchpad();

  if (!projects.length) {
    return <div className="mt-10 rounded-2xl border border-dashed border-emerald-300/30 bg-emerald-300/[0.04] px-6 py-14 text-center"><p className="text-sm font-semibold text-white">Your launchpad is clear.</p><p className="mt-2 text-sm text-white/50">Save a mission from the constellation to keep its next step close.</p></div>;
  }

  return <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{projects.map((project, index) => <article key={project.name} className="rounded-2xl border border-emerald-300/25 bg-emerald-300/[0.05] p-5"><div className="flex items-start justify-between gap-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-300/10 text-sm font-bold text-emerald-300">{String(index + 1).padStart(2, "0")}</span><button type="button" onClick={() => remove(project.name)} className="text-xs font-semibold text-white/45 transition hover:text-rose-200" aria-label={`Remove ${project.name} from launchpad`}>Remove</button></div><h2 className="mt-8 text-lg font-semibold">{project.name}</h2><p className="mt-1 text-sm text-white/45">{project.category}</p><p className="mt-4 min-h-10 text-xs leading-5 text-white/55">{project.description}</p><div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/55"><span>{project.stack}</span><span>{project.builders} builders</span></div><p className="mt-4 text-[11px] font-medium text-emerald-200/85">{project.signal}</p></article>)}</div>;
}
