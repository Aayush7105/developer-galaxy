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

## Data and persistence

No environment variables are required to start the app.

- The **Signals** feed requests the public GitHub Events API for a small, fixed set of popular repositories. Responses are revalidated every five minutes.
- Saved Launchpad missions, progress states, and notes stay in the browser's `localStorage` under `dev-galaxy-launchpad`. They are not synced to a server or shared between devices.
- Command-center audio is generated in the browser through the Web Audio API after user interaction; no audio assets are downloaded.

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

## Troubleshooting

| Symptom | What to try |
| --- | --- |
| The 3D scene is blank | Use a current browser with WebGL enabled, then reload the page. |
| The Signals feed has no entries | GitHub may be temporarily unavailable or rate-limited; wait for a later refresh. |
| A saved mission is missing | Launchpad data is local to the current browser profile. Check that browser storage has not been cleared. |
| The dev server behaves unexpectedly | Remove `.next`, reinstall dependencies, and run `npm run dev` again. |

## Contributing

1. Create a branch for the change.
2. Keep interactive browser behavior in focused Client Components; routes and static content can remain Server Components.
3. Run `npm run lint` before opening a pull request.
4. Include a short description and screenshots for visible UI changes.
