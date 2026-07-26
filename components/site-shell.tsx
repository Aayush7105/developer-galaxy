"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, type ReactNode } from "react";

const navItems = [
  { href: "/signals", label: "Signals" },
  { href: "/constellation", label: "Constellation" },
  { href: "/launchpad", label: "Launchpad" },
  { href: "/about", label: "About" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#020806] text-white selection:bg-emerald-300 selection:text-emerald-950">
      {/* Dynamic ambient lighting & grid overlay */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_45%),radial-gradient(circle_at_90%_70%,rgba(20,184,166,0.08),transparent_35%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-15 [background-image:linear-gradient(rgba(52,211,153,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />

      <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass-nav flex items-center justify-between rounded-full px-5 py-3 shadow-xl hover:border-emerald-300/30">
          <Link href="/" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-emerald-300/60 bg-emerald-300/10 text-sm text-emerald-300 transition duration-300 group-hover:scale-110 group-hover:bg-emerald-300/20 group-hover:shadow-[0_0_12px_rgba(52,211,153,0.5)]">
              ✦
            </span>
            <span className="transition duration-300 group-hover:text-emerald-300">Dev Galaxy</span>
          </Link>

          <nav className="hidden items-center gap-1.5 text-xs font-medium md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 transition-all duration-300 ${
                    isActive
                      ? "font-semibold text-emerald-300 bg-emerald-300/15 border border-emerald-300/40 shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                      : "text-white/70 hover:text-emerald-200 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_8px_#34d399]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 text-xs font-semibold text-emerald-300 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-300 hover:text-emerald-950 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] sm:inline-block"
            >
              Explore Orbit
            </Link>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-emerald-300/40 hover:text-white md:hidden"
              aria-label="Toggle navigation menu"
              type="button"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="glass-panel mt-2 rounded-2xl p-4 md:hidden">
            <nav className="flex flex-col gap-2 text-sm">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-2.5 transition ${
                      isActive
                        ? "bg-emerald-300/20 font-semibold text-emerald-300 border border-emerald-300/40 shadow-[0_0_12px_rgba(52,211,153,0.2)]"
                        : "text-white/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10">{children}</main>
    </div>
  );
}
