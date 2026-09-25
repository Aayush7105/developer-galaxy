import Link from "next/link";
import { SiteShell } from "@/components/shared/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="page-frame">
        <p className="eyebrow">Navigation signal · 404</p>
        <div className="mt-5 flex items-end gap-4 sm:gap-6">
          <p className="font-mono text-6xl font-bold leading-none tracking-[-0.1em] text-emerald-300 sm:text-8xl">404</p>
          <div className="mb-1 hidden h-px flex-1 bg-gradient-to-r from-emerald-300/50 to-transparent sm:block" />
          <p className="mb-0.5 font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-200/70">ROUTE LOST</p>
        </div>
        <h1 className="page-title max-w-3xl">This sector is uncharted.</h1>
        <p className="page-copy">The route you followed is not part of the current Developer Galaxy map. Choose a live signal below and continue exploring open source.</p>

        <div className="mt-12 grid gap-4 md:grid-cols-[1.3fr_.7fr]">
          <div className="orbit-panel rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <p className="text-sm font-semibold text-white">Recovery coordinates</p>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-emerald-200">ONLINE</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href="/" className="glass-card rounded-xl p-5 text-left">
                <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-emerald-200/70">01 · BASE</p>
                <p className="mt-4 text-base font-semibold">Return home</p>
                <p className="mt-2 text-sm leading-6 text-white/50">Start a new exploration from the galaxy overview.</p>
              </Link>
              <Link href="/constellation" className="glass-card rounded-xl p-5 text-left">
                <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-emerald-200/70">02 · DISCOVER</p>
                <p className="mt-4 text-base font-semibold">Browse constellations</p>
                <p className="mt-2 text-sm leading-6 text-white/50">Find projects with a clear path to contribute.</p>
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.045] p-6 sm:p-8">
            <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-200/70">SYSTEM STATUS</p>
            <div className="mt-7 space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-3"><span className="text-white/55">Galaxy map</span><span className="font-mono text-xs text-emerald-200">ACTIVE</span></div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3"><span className="text-white/55">Route lookup</span><span className="font-mono text-xs text-rose-200">NOT FOUND</span></div>
              <div className="flex items-center justify-between"><span className="text-white/55">Next move</span><span className="font-mono text-xs text-indigo-200">READY</span></div>
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
