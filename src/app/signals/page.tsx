import { SiteShell } from "@/frontend/components/shared/site-shell";
import { GitHubLiveFeed } from "@/frontend/components/signals/github-live-feed";
import { getGitHubSignals } from "@/backend/github/signals";

export default async function SignalsPage() {
  const signals = await getGitHubSignals();
  return <SiteShell><section className="page-frame"><p className="eyebrow">Live GitHub telemetry</p><h1 className="page-title">The galaxy is shipping.</h1><p className="page-copy">Real public repository activity, shaped around projects with momentum and a clear way to join in.</p><GitHubLiveFeed signals={signals} /></section></SiteShell>;
}
