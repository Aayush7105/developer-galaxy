"use client";

import {
  useRef,
  useEffect,
  useState,
  Suspense,
  Component,
  type ReactNode,
} from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  type RootState,
} from "@react-three/fiber";
import * as THREE from "three";

/* eslint-disable react/no-unknown-property */
// react-three-fiber's JSX props (position, args, attach, depthWrite, etc.)
// aren't real DOM attributes, so ESLint's default react/no-unknown-property
// rule flags every one of them as a false positive. Disabling it for this
// file is the quick fix. The permanent, project-wide fix is to extend your
// eslint config instead, e.g. in eslint.config.js / .eslintrc.json:
//
//   {
//     rules: {
//       "react/no-unknown-property": ["error", {
//         ignore: ["args", "attach", "position", "rotation", "scale",
//                  "intensity", "dpr", "gl", "side", "depthWrite", "blending"]
//       }]
//     }
//   }

interface GlobeErrorBoundaryProps {
  children: ReactNode;
}
interface GlobeErrorBoundaryState {
  hasError: boolean;
}

// ---------------------------------------------------------------------------
// GlobeErrorBoundary: Handles texture load failures.
// ---------------------------------------------------------------------------
class GlobeErrorBoundary extends Component<
  GlobeErrorBoundaryProps,
  GlobeErrorBoundaryState
> {
  constructor(props: GlobeErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): GlobeErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
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

interface GlobePointsData {
  land: Float32Array;
  ocean: Float32Array;
}

// ---------------------------------------------------------------------------
// ResponsiveCamera: keeps the whole globe (radius 2.5 + ring 2.53, plus a
// little padding) fully in view no matter what aspect ratio the container
// ends up with — like CSS `object-fit: contain`. A PerspectiveCamera's
// vertical fit only depends on fov + distance, but its horizontal fit
// shrinks as the container gets narrower than it is tall, so we pull the
// camera back further whenever aspect < 1 to compensate.
// ---------------------------------------------------------------------------
function ResponsiveCamera({
  targetRadius = 2.9,
  fov = 45,
}: {
  targetRadius?: number;
  fov?: number;
}) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const aspect = size.width / size.height;
    const fovRad = (fov * Math.PI) / 180;
    const tanHalfFov = Math.tan(fovRad / 2);
    const distance = targetRadius / (tanHalfFov * Math.min(aspect, 1));

    camera.fov = fov;
    camera.position.set(0, 0, distance);
    camera.updateProjectionMatrix();
  }, [camera, size, targetRadius, fov]);

  return null;
}

const GlobeModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Path preserved as requested
  const mapTexture = useLoader(THREE.TextureLoader, "/earth-mask.png");

  const [pointsData, setPointsData] = useState<GlobePointsData | null>(null);
  const [landCount, setLandCount] = useState(0);
  const [oceanCount, setOceanCount] = useState(0);

  useEffect(() => {
    if (!mapTexture || !mapTexture.image) return;

    // Guards against setting state after this effect's owner has
    // unmounted (e.g. fast route changes, React Strict Mode's
    // mount -> unmount -> remount cycle in dev).
    let active = true;

    const img = mapTexture.image as HTMLImageElement;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // getContext can return null — must check before use

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let hasTransparency = false;
    for (let i = 3; i < imageData.length; i += 4 * 97) {
      if (imageData[i] < 250) {
        hasTransparency = true;
        break;
      }
    }

    const count = 25000;
    const radius = 2.5;
    const landPositions: number[] = [];
    const oceanPositions: number[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const yUnit = count === 1 ? 0 : 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
      const theta = goldenAngle * i;

      const xUnit = Math.cos(theta) * radiusAtY;
      const zUnit = Math.sin(theta) * radiusAtY;

      const u = 0.5 + Math.atan2(zUnit, xUnit) / (2 * Math.PI);
      const yClamped = Math.min(1, Math.max(-1, yUnit));
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
        landPositions.push(xUnit * radius, yUnit * radius, zUnit * radius);
      } else {
        oceanPositions.push(xUnit * radius, yUnit * radius, zUnit * radius);
      }
    }

    if (active) {
      setPointsData({
        land: new Float32Array(landPositions),
        ocean: new Float32Array(oceanPositions),
      });
      setLandCount(landPositions.length / 3);
      setOceanCount(oceanPositions.length / 3);
    }

    return () => {
      active = false;
    };
  }, [mapTexture]);

  useFrame((state: RootState) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
    // Make the ring outline always face the camera (billboarding)
    if (ringRef.current) {
      ringRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  if (!pointsData || landCount === 0) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* Container for rotating elements */}
      <group ref={groupRef}>
        {/* Ocean Layer */}
        {oceanCount > 0 && (
          <points>
            <bufferGeometry>
              <bufferAttribute
                key={`ocean-${pointsData.ocean.length}`}
                attach="attributes-position"
                count={oceanCount}
                array={pointsData.ocean}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              color="#34d399"
              size={0.012}
              transparent
              opacity={0.15}
              depthWrite={false}
            />
          </points>
        )}

        {/* Land Layer */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              key={`land-${pointsData.land.length}`}
              attach="attributes-position"
              count={landCount}
              array={pointsData.land}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#34d399"
            size={0.02}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        {/* Inner shadow/mask sphere to avoid backside clutter */}
        <mesh>
          <sphereGeometry args={[2.48, 32, 32]} />
          <meshBasicMaterial color="#000" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* SHARP OUTLINE: Stays external to group rotation to remain a perfect circle */}
      <mesh ref={ringRef}>
        {/* Inner radius 2.51 (just outside globe), outer 2.53 (thin stroke) */}
        <ringGeometry args={[2.51, 2.53, 128]} />
        <meshBasicMaterial
          color="#34d399"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

interface GlobeProps {
  /** Any valid CSS width value, e.g. "100%", "600px", "40vw" */
  width?: string | number;
  /** Any valid CSS height value, e.g. "100vh", "600px", "50vh" */
  height?: string | number;
  /** Optional extra class names for the wrapper div */
  className?: string;
}

export default function Globe({
  width = "100%",
  height = "100vh",
  className,
}: GlobeProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={className}
        style={{ width, height, background: "#000" }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        width,
        height,
        backgroundColor: "#000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GlobeErrorBoundary>
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
          <ResponsiveCamera />
          <Suspense fallback={null}>
            <GlobeModel />
          </Suspense>
        </Canvas>
      </GlobeErrorBoundary>

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
      />
    </div>
  );
}
