import { Launchpad } from "@/components/launchpad";
import { SiteShell } from "@/components/site-shell";

export default function LaunchpadPage() {
  return <SiteShell><section className="mx-auto max-w-6xl px-6 pb-16 pt-12 sm:px-10"><p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Your saved missions</p><h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">Launchpad.</h1><p className="mt-5 max-w-xl leading-7 text-white/55">Turn interesting projects into a focused contribution queue. Track where you are, capture your next move, and come back ready to act.</p><Launchpad /></section></SiteShell>;
}
