export type GitHubSignal = {
  project: string;
  action: string;
  time: string;
  kind: "Code" | "Community" | "Release";
  url: string;
};

const repositories = ["vercel/next.js", "microsoft/TypeScript", "facebook/react", "rust-lang/rust", "golang/go", "python/cpython"];

type GitHubEvent = {
  type?: string;
  created_at?: string;
  repo?: { name?: string };
  payload?: { action?: string; pull_request?: { merged?: boolean }; release?: { tag_name?: string } };
};

function relativeTime(value: string | undefined) {
  if (!value) return "recently";
  const minutes = Math.max(1, Math.round((Date.now() - new Date(value).getTime()) / 60_000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  return hours < 24 ? `${hours}h ago` : `${Math.round(hours / 24)}d ago`;
}

function eventCopy(event: GitHubEvent) {
  if (event.payload?.pull_request?.merged) return { action: "merged a pull request", kind: "Code" as const };
  if (event.type === "PushEvent") return { action: "pushed new commits", kind: "Code" as const };
  if (event.type === "PullRequestEvent") return { action: `${event.payload?.action ?? "updated"} a pull request`, kind: "Code" as const };
  if (event.type === "IssuesEvent") return { action: `${event.payload?.action ?? "updated"} an issue`, kind: "Community" as const };
  if (event.type === "ReleaseEvent") return { action: `published ${event.payload?.release?.tag_name ?? "a release"}`, kind: "Release" as const };
  return { action: "recorded new GitHub activity", kind: "Community" as const };
}

export async function getGitHubSignals(): Promise<GitHubSignal[]> {
  const results = await Promise.all(repositories.map(async (repository) => {
    try {
      const response = await fetch(`https://api.github.com/repos/${repository}/events?per_page=1`, {
        headers: { Accept: "application/vnd.github+json", "User-Agent": "dev-galaxy" },
        next: { revalidate: 300 },
      });
      if (!response.ok) return null;
      const [event]: GitHubEvent[] = await response.json();
      if (!event?.repo?.name) return null;
      return { project: event.repo.name, ...eventCopy(event), time: relativeTime(event.created_at), url: `https://github.com/${event.repo.name}` };
    } catch {
      return null;
    }
  }));
  return results.filter((result): result is GitHubSignal => result !== null);
}
