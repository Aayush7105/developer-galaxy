"use client";

import Link from "next/link";
import Globe from "./globe";

const navItems = [
  { href: "/signals", label: "Signals" },
  { href: "/constellation", label: "Constellation" },
  { href: "/launchpad", label: "Launchpad" },
  { href: "/about", label: "About" },
];

const stats = [
  { label: "Active repositories", value: "24.8k" },
  { label: "Merges today", value: "1,384" },
  { label: "Open missions", value: "392" },
];

export default function Landing() {
  return (
    <div className="relative min-h-full overflow-hidden bg-[#050711] text-[#f4f6f4] selection:bg-indigo-200 selection:text-indigo-950">
      <div className="site-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(99,102,241,0.24),transparent_25%),radial-gradient(circle_at_20%_85%,rgba(52,211,153,0.1),transparent_25%)]" />

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-7 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
          <span className="grid h-6 w-6 place-items-center rounded-full border border-indigo-300/60 text-[10px] text-indigo-200">✦</span> Developer Galaxy
        </Link>

        <nav className="hidden items-center gap-6 text-xs text-white/55 sm:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/command-center" className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 text-xs text-white/70 transition hover:border-indigo-200 hover:text-indigo-100">
          Open command center
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl flex-col justify-between px-6 pb-10 pt-16 sm:pt-20 lg:px-8 lg:pt-28">
        <section className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-200/85"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,.9)]" />Open-source intelligence layer</div>
          <h1 className="text-5xl font-semibold leading-[.92] tracking-[-0.07em] text-white sm:text-7xl">A better orbit for <span className="text-indigo-200">builders.</span></h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-white/60">Find communities with real momentum, clear contribution paths, and room for your next useful idea.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/signals" className="rounded-full bg-indigo-200 px-5 py-2.5 text-sm font-semibold text-indigo-950 transition hover:bg-white">Explore signals</Link>
            <Link href="/launchpad" className="text-sm text-white/60 transition hover:text-white">View launchpad <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section aria-label="Developer Galaxy activity" className="orbit-panel mt-16 grid max-w-2xl grid-cols-3 rounded-2xl p-4 sm:mt-0 sm:p-5">
          {stats.map((stat) => (
            <div key={stat.label} className="border-r border-white/10 px-3 first:pl-0 last:border-0">
              <p className="text-base font-medium tracking-tight text-white sm:text-lg">{stat.value}</p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.1em] text-white/45 sm:text-[9px] sm:tracking-[0.12em]">{stat.label}</p>
            </div>
          ))}
        </section>
      </main>

      <Globe width="auto" height="86vh" className="pointer-events-none absolute -bottom-[59vh] left-[77%] aspect-square h-[76vh] w-[76vh] -translate-x-1/2 opacity-50 sm:-bottom-[54vh]" />
    </div>
  );
}
