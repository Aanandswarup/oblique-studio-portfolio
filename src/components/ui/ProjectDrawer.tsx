"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Project } from "@/lib/projects-data";
import { sound } from "@/lib/sound";
import { X, ExternalLink, Award, Cpu, Eye } from "lucide-react";
import { gsap } from "gsap";

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    sound.playChime(780);

    // Lock body scroll while open
    document.body.style.overflow = "hidden";

    // Animate open
    if (drawerRef.current && backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.6, ease: "power3.out" }
      );
    }

    // Focus close button for accessibility
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project]);

  const handleClose = () => {
    sound.playTick();
    if (drawerRef.current && backdropRef.current) {
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
      gsap.to(drawerRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      {/* Backdrop blur overlay */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-2xl h-full bg-[#0d0d10] border-l border-white/10 overflow-y-auto z-10 flex flex-col p-6 sm:p-10 md:p-12 text-[#f4f4f0]"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3 font-mono text-xs text-[#d4ff00]">
            <span>CASE STUDY // {project.number}</span>
            <span className="text-white/30">•</span>
            <span className="text-white/60">{project.year}</span>
          </div>

          <button
            ref={closeBtnRef}
            onClick={handleClose}
            className="p-2 rounded-full border border-white/10 hover:border-[#d4ff00] hover:text-[#d4ff00] transition-colors focus-visible:ring-2 focus-visible:ring-[#d4ff00]"
            aria-label="Close case study drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Title & Category */}
        <div className="mt-8 space-y-3">
          <h2
            id="drawer-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none"
          >
            {project.title}
          </h2>
          <p className="font-mono text-xs sm:text-sm text-white/50 tracking-wider">
            {project.client}
          </p>
        </div>

        {/* Hero Artwork Image */}
        <div className="relative mt-8 w-full aspect-video rounded-lg overflow-hidden border border-white/10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent opacity-60" />
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 p-4 rounded-lg bg-white/[0.03] border border-white/5 font-mono">
          {project.metrics.map((m, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[10px] text-white/40 tracking-wider uppercase">
                {m.label}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#d4ff00] mt-1">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Technical Overview & Narrative */}
        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-white/80 font-sans">
          <div>
            <h3 className="font-mono text-xs text-[#d4ff00] uppercase tracking-wider mb-2">
              [THE ARCHITECTURE]
            </h3>
            <p>{project.overview}</p>
          </div>

          <div>
            <h3 className="font-mono text-xs text-[#d4ff00] uppercase tracking-wider mb-2">
              [TECHNICAL CHALLENGE]
            </h3>
            <p>{project.challenge}</p>
          </div>

          <div>
            <h3 className="font-mono text-xs text-[#d4ff00] uppercase tracking-wider mb-2">
              [CRAFT EXECUTION]
            </h3>
            <ul className="space-y-2 mt-2 font-mono text-xs text-white/70">
              {project.craftDetails.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#d4ff00] font-bold">↳</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <h4 className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-3">
            RECOGNITION
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.awards.map((award, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-white/80"
              >
                <Award className="w-3.5 h-3.5 text-[#d4ff00]" />
                {award}
              </span>
            ))}
          </div>
        </div>

        {/* Stack Tags */}
        <div className="mt-8 pt-6 border-t border-white/10 pb-6 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-white/50">
            {project.tags.map((t, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-white/[0.04]">
                #{t}
              </span>
            ))}
          </div>

          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-full bg-[#d4ff00] text-black font-mono text-xs font-bold hover:bg-white transition-colors"
          >
            DISMISS [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
