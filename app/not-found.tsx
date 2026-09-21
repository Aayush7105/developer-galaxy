import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6 py-16 text-white">
      <div className="site-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/15 blur-[100px]" />

      <section className="orbit-panel relative w-full max-w-2xl rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-16">
        <p className="eyebrow">Navigation anomaly · Error 404</p>
        <p className="mt-7 font-mono text-[clamp(5rem,20vw,10rem)] font-bold leading-none tracking-[-0.12em] text-indigo-200/90">
          404
        </p>
        <h1 className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
          This sector is uncharted.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-white/60">
          The page you&apos;re looking for drifted beyond our current map. Return to a known constellation and continue exploring.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="rounded-full bg-indigo-200 px-5 py-3 text-sm font-semibold text-indigo-950 transition hover:bg-white">
            Return to home
          </Link>
          <Link href="/constellation" className="rounded-full border border-white/15 bg-white/[.04] px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-indigo-200/60 hover:text-white">
            Explore constellations
          </Link>
        </div>
      </section>
    </main>
  );
}
