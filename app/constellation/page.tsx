import { SiteShell } from "@/components/site-shell";
import { ConstellationBrowser, type Project } from "@/components/constellation-browser";

const projects: Project[] = [
  { name: "Orbit UI", category: "Interface systems", builders: 18, stack: "TypeScript", description: "A thoughtful toolkit for product teams building calm, capable interfaces.", signal: "3 good-first issues" },
  { name: "Prism Cache", category: "Data infrastructure", builders: 7, stack: "Rust", description: "Fast, inspectable caching primitives for the edge and beyond.", signal: "Maintainer online" },
  { name: "Kindred", category: "AI tooling", builders: 24, stack: "Python", description: "Small, composable tools for teams making AI useful in the real world.", signal: "2 review requests" },
  { name: "Open Lantern", category: "Accessible web", builders: 12, stack: "JavaScript", description: "A practical accessibility layer for sites that want to welcome everyone.", signal: "Accessibility sprint live" },
  { name: "Tidepool", category: "Climate data", builders: 9, stack: "Go", description: "Open ocean data made easier to understand, share, and act upon.", signal: "Seeking data contributors" },
  { name: "Mosaic", category: "Creative coding", builders: 16, stack: "React", description: "A shared canvas for artists and engineers exploring the web as a medium.", signal: "4 newcomer tasks" },
];

export default function ConstellationPage() {
  return <SiteShell><section className="page-frame"><p className="eyebrow">Project constellation</p><h1 className="page-title">Find your people.</h1><p className="page-copy">Clusters of projects with momentum, clear contribution paths, and maintainers who are listening.</p><ConstellationBrowser projects={projects} /></section></SiteShell>;
}
