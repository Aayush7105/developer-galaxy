"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

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
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState("");
  const commandInputRef = useRef<HTMLInputElement>(null);
  const quickJumpButtonRef = useRef<HTMLButtonElement>(null);
  const visibleItems = navItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!commandOpen) return;
    commandInputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const dialog = commandInputRef.current?.closest("section");
      const focusable = dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [commandOpen, visibleItems.length]);

  const closeCommand = () => {
    setCommandOpen(false);
    setQuery("");
    requestAnimationFrame(() => quickJumpButtonRef.current?.focus());
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050711] text-white selection:bg-indigo-300 selection:text-indigo-950">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="site-grid pointer-events-none absolute inset-0 opacity-60" />
      <header className="relative z-50 mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex items-center justify-between border-b border-white/10 py-5">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white"><span className="grid h-6 w-6 place-items-center rounded-full border border-indigo-300/60 text-[10px] text-indigo-200">✦</span>Developer Galaxy</Link>
          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[.035] p-1 text-xs md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`rounded-full px-3 py-2 transition-colors ${pathname === item.href ? "bg-white/10 text-white" : "text-white/55 hover:text-white"}`}>{item.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setCommandOpen(true)} className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[.035] px-2.5 py-1.5 text-[11px] text-white/45 transition hover:border-indigo-200/50 hover:text-white sm:flex" type="button" aria-label="Open quick navigation"><span>Quick jump</span><kbd className="rounded border border-white/10 px-1 font-mono text-[9px] text-white/45">⌘ K</kbd></button>
            <button onClick={() => setMobileMenuOpen((open) => !open)} className="text-sm text-white/70 transition hover:text-white md:hidden" aria-label="Toggle navigation menu" type="button">
              {mobileMenuOpen ? "×" : "Menu"}
            </button>
          </div>
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
      {commandOpen && (
        <div className="fixed inset-0 z-[100] grid place-items-start bg-[#02030a]/75 px-4 pt-[18vh] backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Quick navigation">
          <button className="absolute inset-0 cursor-default" onClick={closeCommand} aria-label="Close quick navigation" type="button" />
          <section className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-indigo-200/20 bg-[#0a0d1c] shadow-2xl shadow-black/60">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3"><span className="text-indigo-200">⌕</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Jump to a destination..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35" /><kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/40">ESC</kbd></div>
            <div className="p-2"><p className="px-2 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[.15em] text-white/35">Navigate</p>{visibleItems.length ? visibleItems.map((item, index) => <Link key={item.href} href={item.href} onClick={closeCommand} className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm transition ${pathname === item.href ? "bg-indigo-300/10 text-indigo-100" : "text-white/70 hover:bg-white/[.06] hover:text-white"}`}><span className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-md border border-white/10 text-[10px] text-white/45">{String(index + 1).padStart(2, "0")}</span>{item.label}</span><span className="text-xs text-white/30">Open →</span></Link>) : <p className="px-3 py-8 text-center text-sm text-white/45">No destination found.</p>}</div>
            <div className="flex justify-between border-t border-white/10 px-4 py-2.5 text-[10px] text-white/35"><span>Developer Galaxy navigation</span><span>Type to filter</span></div>
          </section>
        </div>
      )}
      <main id="main-content" tabIndex={-1} className="relative z-10">{children}</main>
    </div>
  );
}
