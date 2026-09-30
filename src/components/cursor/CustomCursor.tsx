"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export type CursorMode = "default" | "hover" | "view" | "drag" | "magnetic";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [mode, setMode] = useState<CursorMode>("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if touch device or reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || isReduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Mouse coordinates
    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };

    // GSAP quickTo for zero-overhead 120fps mouse following
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      dotX(mouse.x);
      dotY(mouse.y);
      ringX(mouse.x);
      ringY(mouse.y);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Dynamic cursor state detection via data attributes
    const handleElementHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        const cursorType = target.getAttribute("data-cursor") as CursorMode;
        const text = target.getAttribute("data-cursor-text") || "";
        setMode(cursorType || "hover");
        setCursorText(text);
      } else {
        const clickable = (e.target as HTMLElement)?.closest("a, button, [role='button']");
        if (clickable) {
          setMode("hover");
          setCursorText("");
        } else {
          setMode("default");
          setCursorText("");
        }
      }
    };

    window.addEventListener("mouseover", handleElementHover, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleElementHover);
    };
  }, [isVisible]);

  return (
    <div
      className={`custom-cursor-element pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full pointer-events-none transition-transform duration-200 ${
          mode === "default"
            ? "bg-[#d4ff00] shadow-[0_0_8px_#d4ff00]"
            : mode === "view"
            ? "scale-0 opacity-0"
            : "bg-[#d4ff00] scale-75"
        }`}
      />

      {/* Dynamic follower ring & badge */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          mode === "default"
            ? "w-8 h-8 rounded-full border border-white/25"
            : mode === "hover"
            ? "w-12 h-12 rounded-full border border-[#d4ff00]/60 bg-[#d4ff00]/10 backdrop-blur-[1px]"
            : mode === "view"
            ? "w-28 h-28 rounded-full bg-[#d4ff00] text-black shadow-[0_0_35px_rgba(212,255,0,0.5)] font-mono font-bold text-xs tracking-widest border border-black/20"
            : mode === "drag"
            ? "w-24 h-24 rounded-full border-2 border-dashed border-[#d4ff00] bg-black/80 backdrop-blur-sm text-[#d4ff00] font-mono text-[10px] tracking-wider"
            : "w-10 h-10 rounded-full border border-[#d4ff00]"
        }`}
      >
        {mode === "view" && (
          <div className="flex flex-col items-center justify-center text-center leading-none select-none">
            <span className="text-[10px] uppercase font-bold tracking-widest text-black">
              {cursorText || "EXPLORE"}
            </span>
            <span className="text-[8px] opacity-75 font-mono mt-1 text-black">
              PORTAL ↗
            </span>
          </div>
        )}
        {mode === "drag" && (
          <div className="flex flex-col items-center justify-center text-center leading-tight select-none">
            <span className="text-[9px] font-bold text-[#d4ff00]">DRAG</span>
            <span className="text-[7px] text-white/70">RESIDUAL</span>
          </div>
        )}
      </div>
    </div>
  );
}
