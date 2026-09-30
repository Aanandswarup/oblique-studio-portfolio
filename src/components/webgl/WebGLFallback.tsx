"use client";

import React from "react";

export default function WebGLFallback() {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      aria-label="Interactive 3D geometry representation"
    >
      {/* Background Radial Glow */}
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#d4ff00]/10 blur-[90px] pointer-events-none" />

      {/* SVG Geometric Polyhedron Wireframe */}
      <svg
        viewBox="0 0 400 400"
        className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 text-white/40 animate-[spin_40s_linear_infinite]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <polygon
          points="200,40 340,120 340,280 200,360 60,280 60,120"
          stroke="rgba(255,255,255,0.35)"
        />
        <polygon
          points="200,90 300,150 300,250 200,310 100,250 100,150"
          stroke="#d4ff00"
          strokeOpacity="0.6"
          strokeDasharray="4 3"
        />
        <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(255,255,255,0.2)" />
        <line x1="60" y1="120" x2="340" y2="280" stroke="rgba(255,255,255,0.2)" />
        <line x1="60" y1="280" x2="340" y2="120" stroke="rgba(255,255,255,0.2)" />
        <circle cx="200" cy="200" r="12" fill="#d4ff00" className="animate-ping" />
        <circle cx="200" cy="200" r="6" fill="#f4f4f0" />
      </svg>
    </div>
  );
}
