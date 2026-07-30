"use client";

import Link from "next/link";
import Globe from "../globe";

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
    <div className="relative min-h-full overflow-hidden bg-[#080b0a] text-[#f4f6f4] selection:bg-emerald-200 selection:text-emerald-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_78%,rgba(52,211,153,0.07),transparent_28%)]" />

      <header className="relative z-20 mx-auto flex max-w-5xl items-center justify-between px-6 py-7 lg:px-8">
        <Link href="/" className="text-sm font-medium tracking-tight text-white">
          Developer Galaxy<span className="text-emerald-300">.</span>
        </Link>

        <nav className="hidden items-center gap-6 text-xs text-white/55 sm:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/command-center" className="border-b border-white/20 pb-1 text-xs text-white/70 transition hover:border-emerald-200 hover:text-emerald-200">
          Command center
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-5xl flex-col justify-between px-6 pb-10 pt-20 lg:px-8 lg:pt-28">
        <section className="max-w-xl">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-200/75">A home for open source</p>
          <h1 className="text-5xl font-medium leading-[1] tracking-[-0.06em] text-white sm:text-7xl">Find a good place to build.</h1>
          <p className="mt-7 max-w-md text-base leading-7 text-white/55">A quieter way to discover open-source projects, collaborators, and work worth contributing to.</p>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link href="/signals" className="rounded-full bg-emerald-200 px-5 py-2.5 text-sm font-medium text-emerald-950 transition hover:bg-white">Explore signals</Link>
            <Link href="/launchpad" className="text-sm text-white/60 transition hover:text-white">View launchpad <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="mt-20 grid max-w-xl grid-cols-3 border-t border-white/10 pt-5 sm:mt-0">
          {stats.map((stat) => (
            <div key={stat.label} className="border-r border-white/10 px-3 first:pl-0 last:border-0">
              <p className="text-base font-medium tracking-tight text-white sm:text-lg">{stat.value}</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-white/40">{stat.label}</p>
            </div>
          ))}
        </section>
      </main>

      <Globe width="auto" height="86vh" className="pointer-events-none absolute -bottom-[59vh] left-[77%] aspect-square h-[76vh] w-[76vh] -translate-x-1/2 opacity-40 sm:-bottom-[54vh]" />
    </div>
  );
}
