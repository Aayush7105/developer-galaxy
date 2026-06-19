"use client";

import React, { useRef, useEffect, useState, Suspense, Component } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Fix #4: useLoader throws a real error (not just a pending Suspense promise)
// when the texture fails to load (e.g. a 404). Suspense alone does NOT catch
// that — it only handles the "still loading" state. Without this boundary,
// a missing/misnamed image file crashes the entire React tree.
// ---------------------------------------------------------------------------
class GlobeErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error("Globe failed to render:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9ca3af",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "0.875rem",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          Couldn&apos;t load the globe (check that /public/earth-mask.png
          exists).
        </div>
      );
    }
    return this.props.children;
  }
}

const GlobeModel = () => {
  const pointsRef = useRef(null);

  // Fix #1: must be root-relative ("/earth-mask.png") to resolve correctly
  // from /public on every route. "./earth-mask.png" resolves relative to
  // the current page URL and breaks on any non-root route.
  const mapTexture = useLoader(THREE.TextureLoader, "/earth-mask.png");

  const [pointsData, setPointsData] = useState(null);
  const [pointCount, setPointCount] = useState(0);

  useEffect(() => {
    if (!mapTexture || !mapTexture.image) return;

    const img = mapTexture.image;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    // Fix #2: auto-detect whether the mask encodes land via real alpha
    // transparency or via pixel brightness on an opaque image, instead of
    // OR-ing both checks together (which silently selects every pixel
    // whenever the source has no real transparency).
    let hasTransparency = false;
    for (let i = 3; i < imageData.length; i += 4 * 97) {
      if (imageData[i] < 250) {
        hasTransparency = true;
        break;
      }
    }

    const count = 25000;
    const radius = 2.5;
    const positions = [];

    // Fix #3: proper golden-angle Fibonacci sphere distribution. This
    // parameterizes y linearly from 1 to -1 (no pole singularities) and
    // spaces points using the golden angle, which is what actually
    // produces an even distribution — the original "sqrt(count*PI)*phi"
    // formula wasn't a real spiral formula at all.
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const yUnit = count === 1 ? 0 : 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
      const theta = goldenAngle * i;

      const xUnit = Math.cos(theta) * radiusAtY;
      const zUnit = Math.sin(theta) * radiusAtY;

      // Standard equirectangular UV mapping (matches three.js SphereGeometry).
      const u = 0.5 + Math.atan2(zUnit, xUnit) / (2 * Math.PI);
      const yClamped = Math.min(1, Math.max(-1, yUnit)); // guard asin domain
      const v = 0.5 - Math.asin(yClamped) / Math.PI;

      const pixelX = Math.min(img.width - 1, Math.floor(u * img.width));
      const pixelY = Math.min(img.height - 1, Math.floor(v * img.height));
      const pixelIndex = (pixelY * img.width + pixelX) * 4;

      const alpha = imageData[pixelIndex + 3];
      const brightness =
        (imageData[pixelIndex] +
          imageData[pixelIndex + 1] +
          imageData[pixelIndex + 2]) /
        3;

      const isLand = hasTransparency ? alpha > 128 : brightness > 128;

      if (isLand) {
        positions.push(xUnit * radius, yUnit * radius, zUnit * radius);
      }
    }

    setPointsData(new Float32Array(positions));
    setPointCount(positions.length / 3);
  }, [mapTexture]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
    }
  });

  if (!pointsData) return null;

  // Fix #5: if the mask check yields nothing, fail loudly in the console
  // instead of silently rendering an empty scene with no clue why.
  if (pointCount === 0) {
    console.warn(
      "Globe: no points matched the mask. Check earth-mask.png contrast/format.",
    );
    return null;
  }

  return (
    <group position={[0, -2.5, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            key={pointsData.length}
            attach="attributes-position"
            count={pointCount}
            array={pointsData}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#34d399"
          size={0.02}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Subtle glow inside to give it volume */}
      <mesh>
        <sphereGeometry args={[2.48, 32, 32]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export default function Globe() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevents the canvas/three.js code from rendering during SSR.
  if (!mounted) {
    return (
      <div style={{ width: "100%", height: "100vh", background: "#000" }} />
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GlobeErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <GlobeModel />
          </Suspense>
        </Canvas>
      </GlobeErrorBoundary>

      {/* Hero Text Overlay */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          width: "100%",
          textAlign: "center",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            letterSpacing: "0.4em",
            fontSize: "clamp(1.5rem, 5vw, 3rem)",
            fontWeight: "800",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Developer Galaxy
        </h1>
        <p style={{ opacity: 0.5, letterSpacing: "0.1em", marginTop: "1rem" }}>
          Explore the open source universe
        </p>
      </div>
    </div>
  );
}
