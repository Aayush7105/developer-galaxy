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
    <div className="relative min-h-full overflow-hidden bg-[#06110d] text-[#f3f7f4] selection:bg-emerald-200 selection:text-emerald-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(52,211,153,0.1),transparent_38%)]" />

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight text-white">
          Developer Galaxy<span className="text-emerald-300">.</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/60 sm:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/command-center"
          className="rounded-full border border-white/15 px-3.5 py-2 text-xs font-medium text-white/85 transition hover:border-emerald-200/60 hover:text-emerald-200"
        >
          Command center
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-6xl flex-col justify-between px-6 pb-8 pt-16 lg:px-8 lg:pt-24">
        <section className="max-w-2xl">
          <p className="mb-5 flex items-center gap-2 text-xs font-medium text-emerald-200/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            8,412 builders online
          </p>
          <h1 className="text-5xl font-medium leading-[1.02] tracking-[-0.055em] text-white sm:text-7xl">
            Find a good place to build.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/60">
            A quieter way to discover open-source projects, collaborators, and work worth contributing to.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signals" className="rounded-full bg-emerald-200 px-5 py-3 text-sm font-medium text-emerald-950 transition hover:bg-white">
              Explore signals
            </Link>
            <Link href="/launchpad" className="rounded-full px-5 py-3 text-sm font-medium text-white/70 transition hover:text-white">
              View launchpad →
            </Link>
          </div>
        </section>

        <section className="mt-16 grid max-w-xl grid-cols-3 border-t border-white/10 pt-5 sm:mt-0">
          {stats.map((stat) => (
            <div key={stat.label} className="border-r border-white/10 px-3 first:pl-0 last:border-0">
              <p className="text-lg font-medium tracking-tight text-white sm:text-xl">{stat.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/45">{stat.label}</p>
            </div>
          ))}
        </section>
      </main>

      <Globe
        width="auto"
        height="86vh"
        className="pointer-events-none absolute -bottom-[48vh] left-1/2 aspect-square h-[88vh] w-[140%] -translate-x-1/2 opacity-55 sm:-bottom-[54vh]"
      />
    </div>
  );
}
