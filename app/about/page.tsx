import { SiteShell } from "@/components/site-shell";

const principles = [
  ["Make a clear first move", "Every project should show newcomers where they can help."],
  ["Celebrate momentum", "Small merges and generous reviews are how durable communities grow."],
  ["Build in public", "The best constellations are visible, welcoming, and shared."],
];

export default function AboutPage() {
  return <SiteShell><section className="mx-auto max-w-6xl px-6 pb-16 pt-12 sm:px-10"><p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">About Dev Galaxy</p><h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Open source feels better when you know where to begin.</h1><p className="mt-6 max-w-2xl text-base leading-8 text-white/60">Dev Galaxy is a living map for people who want to turn a spark of curiosity into a meaningful contribution. We surface communities with real momentum and make the next step feel obvious.</p><div className="mt-14 grid gap-4 md:grid-cols-3">{principles.map(([title, copy], index) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><p className="text-xs font-bold text-emerald-300">0{index + 1}</p><h2 className="mt-8 text-lg font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-white/50">{copy}</p></article>)}</div></section></SiteShell>;
}
