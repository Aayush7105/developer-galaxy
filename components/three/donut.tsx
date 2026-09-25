// Donut.tsx
import { ThreeElements } from "@react-three/fiber";

type DonutProps = ThreeElements["mesh"] & {
  radius?: number;
  tube?: number;
  color?: string;
};

export default function Donut({
  radius = 1,
  tube = 0.4,
  color = "#ff69b4",
  ...props
}: DonutProps) {
  return (
    <mesh {...props} castShadow receiveShadow>
      {/* radius, tube, radialSegments, tubularSegments */}
      <torusGeometry args={[radius, tube, 32, 100]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
