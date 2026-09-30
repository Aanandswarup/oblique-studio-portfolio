"use client";

import React, { useState, useEffect } from "react";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import HeaderHUD from "@/components/ui/HeaderHUD";
import Scene1Hero from "@/components/scenes/Scene1Hero";
import Scene2Work from "@/components/scenes/Scene2Work";
import Scene3ManifestoToy from "@/components/scenes/Scene3ManifestoToy";
import Scene4Closing from "@/components/scenes/Scene4Closing";
import ProjectDrawer from "@/components/ui/ProjectDrawer";
import { Project } from "@/lib/projects-data";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(window.scrollY / maxScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SmoothScrollProvider>
      {/* Subtle Analog Film Grain Noise */}
      <div className="film-grain" aria-hidden="true" />

      {/* 120fps Lerped Custom Cursor with Morph States */}
      <CustomCursor />

      {/* Persistent Studio Header & HUD */}
      <HeaderHUD />

      {/* Main Choreographed 4-Scene Canvas */}
      <main className="relative w-full bg-[#08080a] text-[#f4f4f0] overflow-hidden">
        {/* Scene 1: Opening Act — Kinetic Wordmark & 3D Centerpiece */}
        <Scene1Hero scrollProgress={scrollProgress} />

        {/* Scene 2: The Work — 4 Full-Bleed Portals */}
        <Scene2Work onSelectProject={setSelectedProject} />

        {/* Scene 3: Manifesto & The Playable Resonance Toy */}
        <Scene3ManifestoToy />

        {/* Scene 4: Closing & Magnetic Contact */}
        <Scene4Closing />
      </main>

      {/* Slide-over Case Study Spec Inspection Drawer */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </SmoothScrollProvider>
  );
}
