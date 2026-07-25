"use client";

import { useMemo, useState } from "react";
import { SaveToLaunchpadButton, type Project } from "@/components/launchpad";

export type { Project } from "@/components/launchpad";

const stacks = ["All stacks", "TypeScript", "Rust", "Python", "JavaScript", "Go", "React"];

export function ConstellationBrowser({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [stack, setStack] = useState("All stacks");

  const visibleProjects = useMemo(() => {
    const term = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesStack = stack === "All stacks" || project.stack === stack;
      const matchesQuery = !term || [project.name, project.category, project.stack, project.description]
        .some((value) => value.toLowerCase().includes(term));
      return matchesStack && matchesQuery;
    });
  }, [projects, query, stack]);

  return (
    <>
      <div className="mt-10 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 focus-within:border-emerald-300/60">
          <span className="text-emerald-300" aria-hidden="true">⌕</span>
          <span className="sr-only">Search projects</span>
          <input
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search missions, stacks, or interests"
          />
          {query && <button type="button" onClick={() => setQuery("")} className="text-xs text-white/45 transition hover:text-emerald-200">Clear</button>}
        </label>
        <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/65 focus-within:border-emerald-300/60">
          <span className="sr-only">Filter by stack</span>
          <select value={stack} onChange={(event) => setStack(event.target.value)} className="min-w-36 bg-transparent text-sm text-white outline-none">
            {stacks.map((item) => <option className="bg-[#07110d]" key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-white/45">
        <p>{visibleProjects.length} {visibleProjects.length === 1 ? "mission" : "missions"} in view</p>
        {(query || stack !== "All stacks") && <button type="button" onClick={() => { setQuery(""); setStack("All stacks"); }} className="text-emerald-300 transition hover:text-emerald-200">Reset filters</button>}
      </div>

      {visibleProjects.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => {
            const index = projects.indexOf(project) + 1;
            return <article key={project.name} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-emerald-300/45 hover:bg-emerald-300/[0.05]">
              <div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-300/10 text-sm font-bold text-emerald-300">{String(index).padStart(2, "0")}</span><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.9)]" /></div>
              <h2 className="mt-8 text-lg font-semibold">{project.name}</h2>
              <p className="mt-1 text-sm text-white/45">{project.category}</p>
              <p className="mt-4 min-h-10 text-xs leading-5 text-white/55">{project.description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/55"><span>{project.stack}</span><span>{project.builders} builders</span></div>
              <p className="mt-4 text-[11px] font-medium text-emerald-200/85">{project.signal}</p>
              <SaveToLaunchpadButton project={project} className="mt-5 w-full" />
            </article>;
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-emerald-300/30 bg-emerald-300/[0.04] px-6 py-14 text-center">
          <p className="text-sm font-semibold text-white">No missions in this sector yet.</p>
          <p className="mt-2 text-sm text-white/50">Try another search or clear the active filters.</p>
        </div>
      )}
    </>
  );
}
