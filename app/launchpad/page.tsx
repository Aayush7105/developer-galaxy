import { Launchpad } from "@/components/launchpad/launchpad";
import { SiteShell } from "@/components/shared/site-shell";

export default function LaunchpadPage() {
  return <SiteShell><section className="page-frame"><p className="eyebrow">Your saved missions</p><h1 className="page-title">Launchpad.</h1><p className="page-copy">Turn interesting projects into a focused contribution queue. Track where you are, capture your next move, and come back ready to act.</p><Launchpad /></section></SiteShell>;
}
