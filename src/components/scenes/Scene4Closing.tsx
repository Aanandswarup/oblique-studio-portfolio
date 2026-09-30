"use client";

import React, { useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { sound } from "@/lib/sound";
import { Copy, Check, ArrowUp } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export default function Scene4Closing() {
  const [copied, setCopied] = useState(false);
  const { scrollTo } = useSmoothScroll();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@oblique.studio");
    setCopied(true);
    sound.playChime(880);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleBackToTop = () => {
    sound.playTick();
    scrollTo("#hero");
  };

  return (
    <footer
      id="closing"
      className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-14 flex flex-col justify-between border-t border-white/10 select-none overflow-hidden"
      aria-label="Studio Contact and Closing Scene"
    >
      {/* Top Scene Marker */}
      <div className="flex justify-between items-center font-mono text-xs text-white/40">
        <span className="text-[#d4ff00]">[ACT 04 // CONVERGENCE]</span>
        <span>SELECTIVE PARTNERSHIPS 2026-27</span>
      </div>

      {/* Monumental Manifesto Closing Statement */}
      <div className="my-auto py-12 max-w-6xl space-y-12">
        <h2 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.9]">
          LET&apos;S BUILD SOMETHING <br />
          <span className="text-[#d4ff00] inline-block hover:scale-[1.02] transition-transform duration-300">
            IMMORTAL.
          </span>
        </h2>

        {/* Magnetic Contact CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <MagneticButton
            onClick={handleCopyEmail}
            className="group px-8 sm:px-12 py-5 sm:py-6 rounded-full bg-[#d4ff00] text-black font-display font-black text-sm sm:text-lg tracking-wider uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_rgba(212,255,0,0.6)]"
            aria-label="Copy studio email address to clipboard"
          >
            <span className="flex items-center gap-3">
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-black" />
                  <span>COMMUNICATION LINK COPIED</span>
                </>
              ) : (
                <>
                  <span>INITIATE CONTACT // HELLO@OBLIQUE.STUDIO</span>
                  <Copy className="w-4 h-4 opacity-70 group-hover:rotate-12 transition-transform" />
                </>
              )}
            </span>
          </MagneticButton>

          {/* Minimal Toast Status */}
          {copied && (
            <span className="font-mono text-xs text-[#d4ff00] animate-pulse">
              ● COPIED TO CLIPBOARD
            </span>
          )}
        </div>
      </div>

      {/* Minimal Footer Anchors (Zero SaaS Clutter) */}
      <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 font-mono text-xs text-white/40">
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          <span className="text-white/70">© 2026 OBLIQUE ATELIER</span>
          <span>ALL RIGHTS RESERVED</span>
          <span className="text-white/20">|</span>
          <span className="text-white/40">NYC // BERLIN // TOKYO</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden sm:inline text-white/30 text-[10px]">
            ENC_ID // 8F-902A-OBLQ
          </span>

          <button
            onClick={handleBackToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 hover:border-[#d4ff00] hover:text-[#d4ff00] text-white/60 transition-colors focus-visible:ring-1 focus-visible:ring-[#d4ff00]"
            aria-label="Return to top of page"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
