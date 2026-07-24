import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/signals", label: "Signals" },
  { href: "/constellation", label: "Constellation" },
  { href: "/about", label: "About" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#020806] text-white selection:bg-emerald-300 selection:text-emerald-950">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-emerald-300/60 bg-emerald-300/10 text-sm text-emerald-300">*</span>
          Dev Galaxy
        </Link>
        <nav className="flex items-center gap-4 text-xs font-medium text-white/60 sm:gap-7">
          {navItems.map((item) => <Link key={item.href} className="transition hover:text-emerald-300" href={item.href}>{item.label}</Link>)}
        </nav>
      </header>
      {children}
    </main>
  );
}
