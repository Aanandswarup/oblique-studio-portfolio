"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { PROJECTS, Project } from "@/lib/projects-data";
import { sound } from "@/lib/sound";
import { ArrowUpRight } from "lucide-react";

interface Scene2WorkProps {
  onSelectProject: (project: Project) => void;
}

export default function Scene2Work({ onSelectProject }: Scene2WorkProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section
      id="work"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-14 flex flex-col justify-between border-t border-white/10 select-none overflow-hidden"
      aria-label="Selected Craft Works"
    >
      {/* Floating Hover Portal Preview (Follows mouse cursor smoothly) */}
      {activeProject && (
        <div
          className="pointer-events-none fixed z-20 hidden md:block w-96 lg:w-[480px] aspect-[16/10] rounded-lg overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${mousePos.y}px`,
            left: `${mousePos.x}px`
          }}
        >
          <Image
            src={activeProject.image}
            alt={activeProject.title}
            fill
            className="object-cover scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end font-mono text-[11px] text-white">
            <span className="text-[#d4ff00] font-bold">
              {activeProject.number} // {activeProject.category}
            </span>
            <span className="text-white/60">{activeProject.year}</span>
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12 border-b border-white/10">
        <div>
          <span className="font-mono text-xs text-[#d4ff00] tracking-widest uppercase">
            [ACT 02 // REPERTORY]
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mt-2">
            SELECTED WORKS
          </h2>
        </div>
        <p className="font-mono text-xs sm:text-sm text-white/50 max-w-sm">
          Four benchmark commissions pushing the frontier of real-time shaders,
          spatial mechanics, and dynamic typography.
        </p>
      </div>

      {/* Monumental Project Portal Rows */}
      <div className="divide-y divide-white/10 my-10">
        {PROJECTS.map((project) => {
          const isHovered = activeProject?.id === project.id;
          return (
            <div
              key={project.id}
              onMouseEnter={() => {
                sound.playTick();
                setActiveProject(project);
              }}
              onMouseLeave={() => setActiveProject(null)}
              onClick={() => {
                sound.playChime();
                onSelectProject(project);
              }}
              data-cursor="view"
              data-cursor-text={`VIEW ${project.number}`}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelectProject(project);
                }
              }}
              aria-label={`Open case study: ${project.title}, ${project.client}`}
              className="group relative py-8 sm:py-12 md:py-14 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#d4ff00] px-2 rounded-sm"
            >
              {/* Background Highlight Strip */}
              <div
                className={`absolute inset-0 bg-white/[0.02] -z-10 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Left Column: Number & Monumental Title */}
              <div className="flex items-baseline gap-4 sm:gap-8">
                <span className="font-mono text-sm sm:text-base text-white/30 group-hover:text-[#d4ff00] transition-colors">
                  {project.number}
                </span>
                <h3 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white/90 group-hover:text-white group-hover:translate-x-3 transition-all duration-300">
                  {project.title}
                </h3>
              </div>

              {/* Right Column: Category, Client & Arrow */}
              <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10 font-mono text-xs text-white/50">
                <div className="text-left md:text-right">
                  <p className="text-white/80 uppercase tracking-wider font-semibold">
                    {project.category}
                  </p>
                  <p className="text-white/40 mt-1">{project.client}</p>
                </div>

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 group-hover:border-[#d4ff00] group-hover:bg-[#d4ff00] group-hover:text-black flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Mobile Inline Artwork Preview */}
              <div className="block md:hidden relative w-full aspect-video rounded-lg overflow-hidden mt-4 border border-white/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Scene Footer Telemetry */}
      <div className="flex justify-between items-center font-mono text-xs text-white/40 pt-6 border-t border-white/10">
        <span>[TOTAL ARCHIVES: 04 COMMISSIONS]</span>
        <span className="text-[#d4ff00]">CLICK ANY PROJECT TO INSPECT</span>
      </div>
    </section>
  );
}
