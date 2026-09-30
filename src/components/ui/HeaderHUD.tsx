"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export default function HeaderHUD() {
  const [soundActive, setSoundActive] = useState(false);
  const [timeStr, setTimeStr] = useState("10:45:00 UTC");
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "America/New_York"
        }) + " EST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const active = sound.toggleSound();
    setSoundActive(active);
  };

  const handleNavClick = (selector: string) => {
    sound.playTick();
    scrollTo(selector);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none p-4 sm:p-6 md:p-8 flex justify-between items-start select-none">
      {/* Top Left: Wordmark & Telemetry */}
      <div className="pointer-events-auto flex flex-col gap-1.5">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
          className="group flex items-center gap-2 text-white no-underline focus-visible:ring-2 focus-visible:ring-[#d4ff00] rounded-sm"
          aria-label="OBLIQUE Studio - Back to top"
        >
          <span className="font-display text-xl sm:text-2xl font-black tracking-tighter transition-colors group-hover:text-[#d4ff00]">
            OBLIQUE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00] animate-pulse" />
        </a>

        <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] tracking-widest text-white/40">
          <span>NYC // 40.7128°N 74.0060°W</span>
          <span className="text-white/20">/</span>
          <span className="text-white/70">{timeStr}</span>
        </div>
      </div>

      {/* Top Right: Status, Nav Anchors & Sound Controller */}
      <div className="pointer-events-auto flex items-center gap-3 sm:gap-4 md:gap-6">
        {/* Navigation Anchors */}
        <nav
          className="hidden md:flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/10 p-1 rounded-full font-mono text-xs"
          aria-label="Studio Navigation"
        >
          <button
            onClick={() => handleNavClick("#work")}
            className="px-3 py-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-1 focus-visible:ring-[#d4ff00]"
          >
            [01 / WORK]
          </button>
          <button
            onClick={() => handleNavClick("#manifesto")}
            className="px-3 py-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-1 focus-visible:ring-[#d4ff00]"
          >
            [02 / ETHOS]
          </button>
          <button
            onClick={() => handleNavClick("#closing")}
            className="px-3 py-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-1 focus-visible:ring-[#d4ff00]"
          >
            [03 / CONTACT]
          </button>
        </nav>

        {/* Audio Synthesis Toggle */}
        <button
          onClick={handleToggleSound}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#d4ff00] ${
            soundActive
              ? "border-[#d4ff00] bg-[#d4ff00]/10 text-[#d4ff00] shadow-[0_0_15px_rgba(212,255,0,0.25)]"
              : "border-white/15 bg-black/40 backdrop-blur-md text-white/60 hover:text-white hover:border-white/30"
          }`}
          aria-label={soundActive ? "Mute ambient audio" : "Enable synthetic ambient sound"}
          aria-pressed={soundActive}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              soundActive ? "bg-[#d4ff00] animate-ping" : "bg-white/40"
            }`}
          />
          <span className="hidden xs:inline">
            SOUND: {soundActive ? "SYNTH" : "MUTED"}
          </span>
          <span className="xs:hidden">{soundActive ? "ON" : "OFF"}</span>

          {/* Animated mini equalizer bars when active */}
          {soundActive && (
            <span className="flex items-end gap-0.5 h-3 ml-1" aria-hidden="true">
              <span className="w-0.5 h-full bg-[#d4ff00] animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-0.5 h-2/3 bg-[#d4ff00] animate-[pulse_0.4s_ease-in-out_infinite_0.1s]" />
              <span className="w-0.5 h-4/5 bg-[#d4ff00] animate-[pulse_0.8s_ease-in-out_infinite_0.2s]" />
            </span>
          )}
        </button>

        {/* Studio Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[11px] text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>STATUS: OPEN // 2026-27</span>
        </div>
      </div>
    </header>
  );
}
