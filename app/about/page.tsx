import { SiteShell } from "@/components/shared/site-shell";

const principles = [
  ["Make a clear first move", "Every project should show newcomers where they can help."],
  ["Celebrate momentum", "Small merges and generous reviews are how durable communities grow."],
  ["Build in public", "The best constellations are visible, welcoming, and shared."],
];

export default function AboutPage() {
  return <SiteShell><section className="page-frame"><p className="eyebrow">About Dev Galaxy</p><h1 className="page-title">Open source feels better when you know where to begin.</h1><p className="page-copy">Dev Galaxy is a living map for people who want to turn a spark of curiosity into a meaningful contribution. We surface communities with real momentum and make the next step feel obvious.</p><div className="mt-14 grid gap-4 md:grid-cols-3">{principles.map(([title, copy], index) => <article key={title} className="orbit-panel rounded-2xl p-6"><p className="text-xs font-bold text-indigo-200">0{index + 1}</p><h2 className="mt-8 text-lg font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-white/50">{copy}</p></article>)}</div></section></SiteShell>;
}
