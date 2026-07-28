# Developer Galaxy

Developer Galaxy is an interactive map for discovering open-source projects, following live repository activity, and saving contribution ideas. It pairs a polished, responsive interface with a WebGL command center built with React Three Fiber.

## Highlights

- **3D Command Center** — Explore an animated reactor, orbiting technology nodes, a stable procedural star field, and a tactical grid.
- **Live Signals** — Fetches recent public activity from selected GitHub repositories, with a five-minute revalidation window.
- **Project Constellation** — Browse curated projects by category, stack, and contribution signal.
- **Personal Launchpad** — Save projects and turn them into a focused contribution queue.
- **Responsive experience** — Includes a compact mobile navigation and a non-3D fallback while the command center loads.

## Tech stack

- Next.js 16 (App Router) and React 19
- TypeScript and Tailwind CSS v4
- Three.js, `@react-three/fiber`, and `@react-three/drei`
- Native Web Audio API for procedural command-center effects

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page and mission-control drawer |
| `/signals` | Recent public GitHub activity |
| `/constellation` | Curated project explorer |
| `/command-center` | Interactive 3D technology map |
| `/launchpad` | Saved project queue |
| `/about` | Product principles |

## Run locally

Prerequisite: Node.js 20.9 or later.

```bash
git clone https://github.com/Aayush7105/developer-galaxy.git
cd developer-galaxy
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev     # Start the local development server
npm run lint    # Run ESLint
npm run build   # Create a production build
npm run start   # Serve the production build
```

## Project structure

```text
app/                         Route pages and root layout
components/command-center/   WebGL canvas, HUD, environment, and nodes
components/landing/          Landing experience
components/                  Shared shell, feeds, globe, and project UI
lib/                         GitHub signal fetching and audio utilities
```

## Notes

The Signals page uses GitHub's public API. If the API is unavailable or rate-limited, the feed can be empty until the next successful refresh. The 3D Command Center needs a browser with WebGL support.
