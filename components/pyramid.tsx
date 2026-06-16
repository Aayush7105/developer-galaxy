import { ThreeElements } from "@react-three/fiber";

type PyramidProps = ThreeElements["mesh"] & {
  size?: number;
  color?: string;
};

export default function Pyramid({
  size = 1,
  color = "#f59e0b",
  ...props
}: PyramidProps) {
  return (
    <mesh {...props}>
      <coneGeometry args={[size, size * 1.5, 4]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
