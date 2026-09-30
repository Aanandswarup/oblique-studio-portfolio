"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function SpatialSculpture({
  scrollProgress = 0
}: {
  scrollProgress?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  // Generate orbital particle field around sculpture
  const particlesCount = 900;
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const sc = new Float32Array(particlesCount);
    for (let i = 0; i < particlesCount; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      const r = 2.4 + Math.random() * 2.8;

      pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(theta);
      sc[i] = Math.random() * 0.8 + 0.2;
    }
    return [pos, sc];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Mouse influence with gentle damping
    const targetX = (mouse.x * viewport.width) / 6;
    const targetY = (mouse.y * viewport.height) / 6;

    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        time * 0.25 + targetY * 0.4 + scrollProgress * Math.PI,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        time * 0.35 + targetX * 0.4 + scrollProgress * Math.PI * 1.5,
        0.05
      );
      // Subtle organic breathing scale
      const breath = 1 + Math.sin(time * 1.5) * 0.04;
      meshRef.current.scale.set(breath, breath, breath);
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = meshRef.current?.rotation.x || 0;
      wireframeRef.current.rotation.y = meshRef.current?.rotation.y || 0;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.08 + targetX * 0.15;
      pointsRef.current.rotation.x = time * 0.04 + targetY * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Solid Faceted Core */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <octahedronGeometry args={[1.7, 3]} />
        <meshPhysicalMaterial
          color="#0d0d12"
          roughness={0.12}
          metalness={0.92}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          transmission={0.35}
          ior={1.55}
          thickness={1.2}
          wireframe={false}
        />
      </mesh>

      {/* Exterior Precision Wireframe Halo */}
      <lineSegments ref={wireframeRef}>
        <wireframeGeometry args={[new THREE.OctahedronGeometry(1.72, 3)]} />
        <lineBasicMaterial
          color="#d4ff00"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Dynamic Stardust / Cloud Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#f4f4f0"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Precision Accent Light Field */}
      <pointLight
        position={[4, 3, 5]}
        intensity={28}
        color="#ffffff"
        distance={20}
      />
      <pointLight
        position={[-4, -3, 3]}
        intensity={35}
        color="#d4ff00"
        distance={18}
      />
      <pointLight
        position={[0, 5, -4]}
        intensity={20}
        color="#4f46e5"
        distance={15}
      />
      <ambientLight intensity={0.65} />
    </group>
  );
}
