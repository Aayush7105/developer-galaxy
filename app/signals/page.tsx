import { SiteShell } from "@/components/site-shell";

const activity = [
  ["Orbit UI", "opened a good-first issue", "2m ago", "bg-emerald-300"],
  ["Prism Cache", "merged a WebAssembly performance patch", "8m ago", "bg-cyan-300"],
  ["Kindred", "welcomed 4 new contributors", "14m ago", "bg-violet-300"],
  ["Open Lantern", "published its accessibility roadmap", "22m ago", "bg-amber-300"],
] as const;

export default function SignalsPage() {
  return <SiteShell><section className="mx-auto max-w-6xl px-6 pb-16 pt-12 sm:px-10"><p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Live signal feed</p><h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">The galaxy is shipping.</h1><p className="mt-5 max-w-xl text-base leading-7 text-white/55">A focused pulse of open-source activity from projects looking for collaborators right now.</p><div className="mt-10 grid gap-4"><div className="flex items-center justify-between rounded-xl border border-emerald-300/25 bg-emerald-300/[0.06] px-5 py-4"><span className="text-sm font-medium text-emerald-100">1,384 merges across the network today</span><span className="text-xs text-emerald-300">Live</span></div>{activity.map(([project, event, time, color]) => <article key={project} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25"><span className={`h-2.5 w-2.5 shrink-0 rounded-full ${color}`} /><div className="min-w-0 flex-1"><p className="text-sm text-white"><span className="font-semibold">{project}</span> <span className="text-white/55">{event}</span></p></div><time className="text-xs text-white/35">{time}</time></article>)}</div></section></SiteShell>;
}
