"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

const navItems = [
  { href: "/signals", label: "Signals" },
  { href: "/constellation", label: "Constellation" },
  { href: "/command-center", label: "3D Command" },
  { href: "/launchpad", label: "Launchpad" },
  { href: "/about", label: "About" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050711] text-white selection:bg-indigo-300 selection:text-indigo-950">
      <div className="site-grid pointer-events-none absolute inset-0 opacity-60" />
      <header className="relative z-50 mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex items-center justify-between border-b border-white/10 py-5">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white"><span className="grid h-6 w-6 place-items-center rounded-full border border-indigo-300/60 text-[10px] text-indigo-200">✦</span>Developer Galaxy</Link>
          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[.035] p-1 text-xs md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`rounded-full px-3 py-2 transition-colors ${pathname === item.href ? "bg-white/10 text-white" : "text-white/55 hover:text-white"}`}>{item.label}</Link>
            ))}
          </nav>
          <button onClick={() => setMobileMenuOpen((open) => !open)} className="text-sm text-white/70 transition hover:text-white md:hidden" aria-label="Toggle navigation menu" type="button">
            {mobileMenuOpen ? "×" : "Menu"}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="orbit-panel border-x border-b border-white/10 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-1 text-sm">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`px-1 py-2.5 transition ${pathname === item.href ? "text-emerald-200" : "text-white/60 hover:text-white"}`}>{item.label}</Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      <main className="relative z-10">{children}</main>
    </div>
  );
}
