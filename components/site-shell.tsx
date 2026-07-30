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
    <div className="relative min-h-screen bg-[#080b0a] text-white selection:bg-emerald-300 selection:text-emerald-950">
      <header className="relative z-50 mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex items-center justify-between border-b border-white/10 py-5">
          <Link href="/" className="text-sm font-medium tracking-tight text-white">Developer Galaxy<span className="text-emerald-300">.</span></Link>
          <nav className="hidden items-center gap-6 text-xs md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`transition-colors ${pathname === item.href ? "text-emerald-200" : "text-white/55 hover:text-white"}`}>{item.label}</Link>
            ))}
          </nav>
          <button onClick={() => setMobileMenuOpen((open) => !open)} className="text-sm text-white/70 transition hover:text-white md:hidden" aria-label="Toggle navigation menu" type="button">
            {mobileMenuOpen ? "×" : "Menu"}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-b border-white/10 py-4 md:hidden">
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
