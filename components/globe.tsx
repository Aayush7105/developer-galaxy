"use client";

import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const GlobeModel = () => {
  const pointsRef = useRef();

  // Use a reliable CDN or local path.
  // Added crossOrigin to fix the "Could not load" error.
  const mapTexture = useLoader(
    THREE.TextureLoader,
    "https://raw.githubusercontent.com/shuding/cobe/main/public/map.png",
    (loader) => {
      loader.setCrossOrigin("anonymous");
    },
  );

  const [pointsData, setPointsData] = useState(null);

  useEffect(() => {
    if (!mapTexture) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = mapTexture.image;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const count = 20000;
    const positions = [];
    const radius = 2.5;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const u = 0.5 + Math.atan2(x, z) / (2 * Math.PI);
      const v = 0.5 + Math.asin(y / radius) / Math.PI;

      const pixelX = Math.floor(u * (img.width - 1));
      const pixelY = Math.floor((1 - v) * (img.height - 1));
      const pixelIndex = (pixelY * img.width + pixelX) * 4;

      // Check alpha or brightness
      if (imageData[pixelIndex + 3] > 0 || imageData[pixelIndex] > 100) {
        positions.push(x, y, z);
      }
    }

    setPointsData(new Float32Array(positions));
  }, [mapTexture]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0015;
    }
  });

  if (!pointsData) return null;

  return (
    <group position={[0, -2.5, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pointsData.length / 3}
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
        />
      </points>
    </group>
  );
};

export default function Globe() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ background: "black", height: "100vh" }} />;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#000",
        position: "relative",
      }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <GlobeModel />
        </Suspense>
      </Canvas>
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          width: "100%",
          textAlign: "center",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <h1 style={{ letterSpacing: "0.2em", fontSize: "1.5rem" }}>
          DEVELOPER GALAXY
        </h1>
      </div>
    </div>
  );
}
