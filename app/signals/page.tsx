import { SiteShell } from "@/components/site-shell";
import { SignalsFeed } from "@/components/signals-feed";

export default function SignalsPage() {
  return <SiteShell><section className="mx-auto max-w-6xl px-6 pb-16 pt-12 sm:px-10"><p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Live signal feed</p><h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">The galaxy is shipping.</h1><p className="mt-5 max-w-xl text-base leading-7 text-white/55">A focused pulse of open-source activity, shaped around projects with real momentum and a clear way to join in.</p><SignalsFeed /></section></SiteShell>;
}
