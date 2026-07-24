import { SiteShell } from "@/components/site-shell";

const projects = [
  ["Orbit UI", "Interface systems", "18", "TypeScript"],
  ["Prism Cache", "Data infrastructure", "7", "Rust"],
  ["Kindred", "AI tooling", "24", "Python"],
  ["Open Lantern", "Accessible web", "12", "JavaScript"],
  ["Tidepool", "Climate data", "9", "Go"],
  ["Mosaic", "Creative coding", "16", "React"],
];

export default function ConstellationPage() {
  return <SiteShell><section className="mx-auto max-w-6xl px-6 pb-16 pt-12 sm:px-10"><p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Project constellation</p><div className="mt-3 flex flex-wrap items-end justify-between gap-5"><div><h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Find your people.</h1><p className="mt-5 max-w-xl leading-7 text-white/55">Clusters of projects with momentum, clear contribution paths, and maintainers who are listening.</p></div><button className="rounded-full border border-emerald-300/45 px-4 py-2 text-xs font-semibold text-emerald-200">All stacks</button></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{projects.map(([name, category, builders, stack], index) => <article key={name} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-emerald-300/45 hover:bg-emerald-300/[0.05]"><div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-300/10 text-sm font-bold text-emerald-300">0{index + 1}</span><span className="h-2 w-2 rounded-full bg-emerald-300" /></div><h2 className="mt-8 text-lg font-semibold">{name}</h2><p className="mt-1 text-sm text-white/45">{category}</p><div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/55"><span>{stack}</span><span>{builders} builders</span></div></article>)}</div></section></SiteShell>;
}
