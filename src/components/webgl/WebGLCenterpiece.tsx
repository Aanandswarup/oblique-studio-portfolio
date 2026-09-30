"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import WebGLFallback from "./WebGLFallback";

// Dynamically import Canvas to avoid SSR issues
const DynamicCanvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const SpatialSculpture = dynamic(() => import("./SpatialSculpture"), {
  ssr: false
});

interface WebGLCenterpieceProps {
  scrollProgress?: number;
}

export default function WebGLCenterpiece({
  scrollProgress = 0
}: WebGLCenterpieceProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Feature detect WebGL
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-transparent" />;
  }

  if (hasWebGL === false) {
    return <WebGLFallback />;
  }

  return (
    <div
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
      data-cursor="drag"
    >
      <Suspense fallback={<WebGLFallback />}>
        <DynamicCanvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 2, 2)]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          className="w-full h-full"
        >
          <SpatialSculpture scrollProgress={scrollProgress} />
        </DynamicCanvas>
      </Suspense>
    </div>
  );
}
