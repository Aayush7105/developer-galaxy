import { SiteShell } from "@/frontend/components/shared/site-shell";

const contributors = [
  { id: 1, name: "Linus Torvalds", username: "torvalds", avatar: "https://avatars.githubusercontent.com/u/1024025?v=4", contributions: 14205, rank: 1, trend: "up" },
  { id: 2, name: "Dan Abramov", username: "gaearon", avatar: "https://avatars.githubusercontent.com/u/810438?v=4", contributions: 9832, rank: 2, trend: "up" },
  { id: 3, name: "Guillermo Rauch", username: "rauchg", avatar: "https://avatars.githubusercontent.com/u/13041?v=4", contributions: 8430, rank: 3, trend: "flat" },
  { id: 4, name: "Evan You", username: "yyx990803", avatar: "https://avatars.githubusercontent.com/u/499550?v=4", contributions: 7891, rank: 4, trend: "up" },
  { id: 5, name: "Sarah Drasner", username: "sdras", avatar: "https://avatars.githubusercontent.com/u/2281088?v=4", contributions: 6512, rank: 5, trend: "up" },
  { id: 6, name: "Kent C. Dodds", username: "kentcdodds", avatar: "https://avatars.githubusercontent.com/u/1500684?v=4", contributions: 5920, rank: 6, trend: "down" },
];

export default function LeaderboardPage() {
  return (
    <SiteShell>
      <section className="page-frame">
        <p className="eyebrow">Top Contributors</p>
        <h1 className="page-title">The open-source vanguard.</h1>
        <p className="page-copy">
          Discover the most active developers shaping the tools we use every day.
          This leaderboard tracks contributions across major open-source ecosystems.
        </p>
        
        <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d1c]/80 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-12 gap-4 border-b border-white/10 bg-white/5 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/50">
            <div className="col-span-2 sm:col-span-1 text-center">Rank</div>
            <div className="col-span-6 sm:col-span-7">Developer</div>
            <div className="col-span-4 text-right">Contributions</div>
          </div>
          
          <div className="divide-y divide-white/5">
            {contributors.map((contributor, index) => (
              <div 
                key={contributor.id} 
                className={`grid grid-cols-12 items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[.02] ${index < 3 ? 'bg-indigo-900/10' : ''}`}
              >
                <div className="col-span-2 sm:col-span-1 flex justify-center">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    index === 0 ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 
                    index === 1 ? 'bg-slate-300/20 text-slate-300 border border-slate-300/30' : 
                    index === 2 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/30' : 
                    'text-white/40'
                  }`}>
                    {contributor.rank}
                  </span>
                </div>
                
                <div className="col-span-6 sm:col-span-7 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={contributor.avatar} 
                    alt={`${contributor.username}'s avatar`} 
                    className="h-10 w-10 rounded-full border border-white/10"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-white">{contributor.name}</h3>
                    <p className="text-xs text-white/40">@{contributor.username}</p>
                  </div>
                </div>
                
                <div className="col-span-4 flex items-center justify-end gap-2 sm:gap-3 text-right">
                  <span className="font-mono text-sm text-indigo-200">
                    {contributor.contributions.toLocaleString()}
                  </span>
                  {contributor.trend === "up" && <span className="text-emerald-400 text-xs">↑</span>}
                  {contributor.trend === "down" && <span className="text-red-400 text-xs">↓</span>}
                  {contributor.trend === "flat" && <span className="text-white/30 text-xs">-</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
