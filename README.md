# 🌌 Developer Galaxy

> **An Immersive 3D Sci-Fi Command Center & Developer Telemetry Dashboard**

Developer Galaxy is a futuristic, highly interactive 3D web application built with **Next.js 16**, **React 19**, **Three.js**, and **React Three Fiber**. It presents a sci-fi command center interface featuring real-time telemetry visualizers, dynamic 3D constellations, live GitHub activity feeds, synthesized spatial audio FX, and sci-fi HUD controls.

---

## ✨ Features

- 🛸 **Sci-Fi 3D Command Center**: Core reactor animations, space starfield particle environments, and interactive orbital node networks rendered via `@react-three/fiber` and `@react-three/drei`.
- 🛰️ **Constellation Browser**: Interactive 3D node network exploring developer technologies, module relationships, and system architecture.
- 📡 **Live Signals Feed & GitHub Stream**: Real-time event monitor detailing developer pulses, commit logs, build metrics, and live activity feeds.
- 🚀 **Interactive Launchpad**: Mission control dashboard for initiating sub-modules, inspecting active projects, and triggering system diagnostics.
- 🌍 **Interactive 3D Telemetry Globe**: Rotating 3D WebGL globe visualizing global developer nodes, signal hotspots, and orbital telemetry data.
- 🔊 **Synthesized Spatial Audio (Web Audio API)**: Built-in procedural audio engine providing sci-fi click FX, ambient hums, scan sweeps, and reactor state sound effects without external audio files.
- 🎨 **Modern Futuristic UI/UX**: Dark mode sci-fi HUD aesthetics with glassmorphism, glowing telemetry indicators, dynamic hover mechanics, and responsive layouts.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **3D Graphics & Canvas**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Audio Engine**: Native Web Audio API (Procedural sound synthesis)

---

## 📂 Project Structure

```
developer-galaxy/
├── app/                      # Next.js App Router routes & layouts
│   ├── command-center/       # 3D Sci-Fi Command Center page
│   ├── constellation/        # Interactive 3D constellation browser
│   ├── launchpad/            # Mission launchpad dashboard
│   ├── signals/              # Real-time telemetry signals feed
│   ├── about/                # Mission background & overview
│   ├── layout.tsx            # Root layout wrapper
│   └── page.tsx              # Landing page entry point
├── components/               # React & R3F visual components
│   ├── command-center/       # Core reactor, HUD panels, canvas & space env
│   ├── landing/              # Interactive hero landing visualizer
│   ├── constellation-browser.tsx
│   ├── github-live-feed.tsx
│   ├── globe.tsx             # Interactive WebGL 3D Globe
│   ├── launchpad.tsx
│   ├── signals-feed.tsx
│   └── site-shell.tsx        # Navigation & shell frame
├── lib/                      # Audio synth & data providers
│   ├── command-center-audio.ts # Web Audio API sound FX synth engine
│   └── github-signals.ts      # Live activity mock & signal data stream
└── public/                   # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (version 18.x or higher recommended) installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aayush7105/developer-galaxy.git
   cd developer-galaxy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000` to access the application.

---

## 📜 Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Compiles and builds the production bundle.
- `npm run start`: Runs the compiled production build locally.
- `npm run lint`: Executes ESLint checks across the codebase.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

