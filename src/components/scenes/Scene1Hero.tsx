"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import WebGLCenterpiece from "@/components/webgl/WebGLCenterpiece";
import { ArrowDown } from "lucide-react";
import { sound } from "@/lib/sound";

interface Scene1HeroProps {
  scrollProgress: number;
}

export default function Scene1Hero({ scrollProgress }: Scene1HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const titleLetters = ["O", "B", "L", "I", "Q", "U", "E"];

  useEffect(() => {
    // Check reduced motion
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Character-by-character wordmark reveal
      tl.fromTo(
        ".hero-char",
        { y: "130%", rotateX: -45, opacity: 0 },
        {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: 1.3,
          stagger: 0.05,
          delay: 0.2
        }
      );

      // Manifesto line word reveal
      tl.fromTo(
        ".manifesto-word",
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          stagger: 0.02
        },
        "-=0.7"
      );

      // Bottom scroll indicator fade in
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const manifestoText =
    "WE SCULPT THE UNSEEN EDGE OF COMPUTATIONAL CRAFT. AN INDEPENDENT ATELIER AT THE COLLISION OF SPATIAL FORM, RECTIFIED LIGHT, AND KINETIC INTELLECT.";

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-14 pt-28 sm:pt-32 overflow-hidden select-none"
      aria-label="Studio Introduction Act"
    >
      {/* 3D WebGL Spatial Sculpture Centerpiece */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-85 transition-opacity pointer-events-auto">
        <WebGLCenterpiece scrollProgress={scrollProgress} />
      </div>

      {/* Top manifesto teaser */}
      <div className="relative z-10 max-w-2xl mt-4 sm:mt-6 pointer-events-none">
        <div className="overflow-hidden">
          <p
            ref={manifestoRef}
            className="font-mono text-xs sm:text-sm tracking-widest text-white/60 leading-relaxed uppercase flex flex-wrap gap-x-2"
          >
            {manifestoText.split(" ").map((word, idx) => (
              <span key={idx} className="overflow-hidden inline-block py-0.5">
                <span className="manifesto-word inline-block text-white/80">
                  {word}
                </span>
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Massive Kinetic Wordmark */}
      <div
        ref={wordmarkRef}
        className="relative z-10 my-auto py-12 flex items-center justify-center pointer-events-none"
      >
        <h1
          className="font-display font-black text-[18vw] sm:text-[19vw] leading-[0.8] tracking-[-0.05em] text-white flex justify-center w-full mix-blend-difference"
          aria-label="OBLIQUE"
        >
          {titleLetters.map((char, index) => (
            <span
              key={index}
              className="inline-block overflow-hidden py-2 sm:py-4"
            >
              <span className="hero-char inline-block will-change-transform drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                {char}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* Bottom Telemetry & Scroll Cue */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 font-mono text-xs text-white/50 border-t border-white/10 pt-6 pointer-events-none">
        <div className="flex items-center gap-4">
          <span className="text-[#d4ff00] font-bold">[ACT 01]</span>
          <span>SPATIAL CORE & SENSORIUM</span>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="pointer-events-auto flex items-center gap-3 text-white/70 hover:text-[#d4ff00] transition-colors cursor-pointer"
          onClick={() => {
            sound.playTick();
            const workSection = document.getElementById("work");
            workSection?.scrollIntoView({ behavior: "smooth" });
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              const workSection = document.getElementById("work");
              workSection?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          aria-label="Scroll down to Selected Works"
        >
          <span className="tracking-widest text-[11px] uppercase">
            SCROLL TO ENGAGE
          </span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3.5 h-3.5 text-[#d4ff00]" />
          </div>
        </div>
      </div>
    </section>
  );
}
