"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { sound } from "@/lib/sound";
import { RefreshCw, Play, Volume2, Sparkles } from "lucide-react";

interface PhysicsNode {
  id: number;
  char: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  isDragging: boolean;
  color: string;
}

export default function Scene3ManifestoToy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [gravityMode, setGravityMode] = useState<"zero" | "down" | "repel">("zero");
  const [springTension, setSpringTension] = useState<number>(0.035);
  const [collisionCount, setCollisionCount] = useState<number>(0);
  const [activeHarmonic, setActiveHarmonic] = useState<string>("CYBERNETIC");

  const nodesRef = useRef<PhysicsNode[]>([]);
  const dragNodeRef = useRef<PhysicsNode | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize typographic physics nodes
  const initNodes = useCallback((width: number, height: number) => {
    const chars = ["O", "B", "L", "I", "Q", "U", "E", "✦"];
    const colors = [
      "#f4f4f0",
      "#f4f4f0",
      "#d4ff00",
      "#f4f4f0",
      "#d4ff00",
      "#f4f4f0",
      "#f4f4f0",
      "#d4ff00"
    ];

    nodesRef.current = chars.map((char, index) => {
      const angle = (index / chars.length) * Math.PI * 2;
      const radius = 32;
      return {
        id: index,
        char,
        x: width / 2 + Math.cos(angle) * (width * 0.28),
        y: height / 2 + Math.sin(angle) * (height * 0.28),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius,
        mass: char === "✦" ? 0.8 : 1.2,
        isDragging: false,
        color: colors[index % colors.length]
      };
    });
  }, []);

  // Physics animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    initNodes(width, height);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const harmonicFreqs: Record<string, number[]> = {
      CYBERNETIC: [440, 554.37, 659.25, 830.61, 987.77],
      PENTATONIC: [329.63, 392.0, 440.0, 493.88, 587.33],
      MONOLITH: [110, 164.81, 220, 277.18, 329.63]
    };

    // Main physics frame
    const updatePhysics = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle coordinate background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = step; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = step; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const nodes = nodesRef.current;

      // Draw elastic spring connection lines between nodes
      ctx.strokeStyle = "rgba(212, 255, 0, 0.15)";
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 180) {
            const alpha = 1 - dist / 180;
            ctx.strokeStyle = `rgba(212, 255, 0, ${alpha * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update node positions and handle collisions
      nodes.forEach((node, i) => {
        if (node.isDragging) {
          node.x = mouseRef.current.x;
          node.y = mouseRef.current.y;
          node.vx = 0;
          node.vy = 0;
        } else {
          // Gravity forces
          if (gravityMode === "down") node.vy += 0.25;
          if (gravityMode === "repel") {
            const dx = node.x - mouseRef.current.x;
            const dy = node.y - mouseRef.current.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 200 && dist > 1) {
              const force = (200 - dist) / 200;
              node.vx += (dx / dist) * force * 1.5;
              node.vy += (dy / dist) * force * 1.5;
            }
          }

          // Damping & speed cap
          node.vx *= 0.985;
          node.vy *= 0.985;
          node.x += node.vx;
          node.y += node.vy;

          // Boundary wall bounces
          if (node.x - node.radius < 0) {
            node.x = node.radius;
            node.vx *= -0.75;
          }
          if (node.x + node.radius > width) {
            node.x = width - node.radius;
            node.vx *= -0.75;
          }
          if (node.y - node.radius < 0) {
            node.y = node.radius;
            node.vy *= -0.75;
          }
          if (node.y + node.radius > height) {
            node.y = height - node.radius;
            node.vy *= -0.75;
          }
        }

        // Node-to-node elastic collision
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.hypot(dx, dy);
          const minDist = node.radius + other.radius;

          if (dist < minDist && dist > 0) {
            // Overlap resolution
            const overlap = (minDist - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;

            node.x -= nx * overlap;
            node.y -= ny * overlap;
            other.x += nx * overlap;
            other.y += ny * overlap;

            // Elastic impulse
            const kx = node.vx - other.vx;
            const ky = node.vy - other.vy;
            const p = 2 * (nx * kx + ny * ky) / (node.mass + other.mass);

            node.vx -= p * other.mass * nx;
            node.vy -= p * other.mass * ny;
            other.vx += p * node.mass * nx;
            other.vy += p * node.mass * ny;

            // Trigger harmonic chime sound on collision
            const freqs = harmonicFreqs[activeHarmonic] || [440, 554, 660];
            const chosenFreq = freqs[(node.id + other.id) % freqs.length];
            sound.playChime(chosenFreq);
            setCollisionCount((prev) => prev + 1);
          }
        }

        // Render node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.isDragging
          ? "rgba(212, 255, 0, 0.25)"
          : "rgba(17, 17, 20, 0.85)";
        ctx.fill();

        ctx.strokeStyle = node.isDragging
          ? "#d4ff00"
          : node.color === "#d4ff00"
          ? "rgba(212, 255, 0, 0.8)"
          : "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = node.isDragging ? 2.5 : 1.2;
        ctx.stroke();

        // Render glyph letter inside node
        ctx.font = `bold ${node.radius * 0.9}px var(--font-syne, sans-serif)`;
        ctx.fillStyle = node.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.char, node.x, node.y + 1);
      });

      animFrameIdRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameIdRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [gravityMode, activeHarmonic, initNodes]);

  // Pointer event listeners on canvas
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };

    const clickedNode = nodesRef.current.find(
      (n) => Math.hypot(n.x - x, n.y - y) <= n.radius
    );

    if (clickedNode) {
      clickedNode.isDragging = true;
      dragNodeRef.current = clickedNode;
      sound.playChime(880);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };
  };

  const handleMouseUp = () => {
    if (dragNodeRef.current) {
      // Fling momentum
      dragNodeRef.current.isDragging = false;
      dragNodeRef.current = null;
    }
  };

  const resetSimulation = () => {
    sound.playTick();
    const canvas = canvasRef.current;
    if (canvas) {
      initNodes(canvas.width, canvas.height);
      setCollisionCount(0);
    }
  };

  const burstImpulse = () => {
    sound.playThump();
    nodesRef.current.forEach((n) => {
      n.vx = (Math.random() - 0.5) * 16;
      n.vy = (Math.random() - 0.5) * 16;
    });
  };

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-14 flex flex-col justify-between border-t border-white/10 select-none overflow-hidden"
      aria-label="Studio Manifesto and Interactive Resonance Chamber"
    >
      {/* Manifesto Kinetic Statement */}
      <div className="max-w-5xl space-y-6 pb-16">
        <span className="font-mono text-xs text-[#d4ff00] tracking-widest uppercase">
          [ACT 03 // ETHOS & SENSIBILITY]
        </span>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]">
          WE REJECT THE HOMOGENEITY OF SAAS TEMPLATES.{" "}
          <span className="text-[#d4ff00]">
            EVERY PIXEL MUST EARN ITS GRAVITY.
          </span>
        </h2>

        <p className="font-mono text-xs sm:text-base text-white/60 max-w-3xl leading-relaxed">
          The modern web traded wonder for conversion metrics. We operate on the
          conviction that software should inspire awe. Through customized WebGL
          pipelines, kinetic typography, and real-time physical simulation, we
          deliver interfaces that demand reverence.
        </p>
      </div>

      {/* The Interactive Toy: The Resonance Chamber */}
      <div className="w-full rounded-xl border border-white/10 bg-[#0d0d10] p-4 sm:p-8 flex flex-col gap-6 shadow-2xl relative">
        {/* Toy Header Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
            <span className="font-bold text-white tracking-wider">
              THE RESONANCE CHAMBER // PLAYABLE KINETIC TOY
            </span>
          </div>

          <div className="flex items-center gap-4 text-white/50">
            <span>COLLISIONS: {collisionCount}</span>
            <span className="text-white/20">|</span>
            <span className="text-[#d4ff00]">DRAG & FLING NODES</span>
          </div>
        </div>

        {/* Interactive Physics Canvas */}
        <div
          className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-lg overflow-hidden bg-black/60 border border-white/5 cursor-grab active:cursor-grabbing"
          data-cursor="drag"
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="w-full h-full block"
            aria-label="Interactive physics typography spring canvas. Drag letters to collide and produce sound."
          />
        </div>

        {/* Interactive Physics & Audio Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          {/* Gravity Control Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-white/40 mr-1">GRAVITY:</span>
            {(["zero", "down", "repel"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  sound.playTick();
                  setGravityMode(mode);
                }}
                className={`px-3 py-1.5 rounded-md uppercase tracking-wider transition-colors focus-visible:ring-1 focus-visible:ring-[#d4ff00] ${
                  gravityMode === mode
                    ? "bg-[#d4ff00] text-black font-bold"
                    : "bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                {mode === "zero" ? "ZERO-G" : mode === "down" ? "EARTH" : "REPEL"}
              </button>
            ))}
          </div>

          {/* Harmonic Chord Selector */}
          <div className="flex items-center gap-2">
            <span className="text-white/40 mr-1">HARMONIC SCALE:</span>
            {["CYBERNETIC", "PENTATONIC", "MONOLITH"].map((scale) => (
              <button
                key={scale}
                onClick={() => {
                  sound.playTick();
                  setActiveHarmonic(scale);
                }}
                className={`px-2.5 py-1.5 rounded-md text-[11px] tracking-wider transition-colors focus-visible:ring-1 focus-visible:ring-[#d4ff00] ${
                  activeHarmonic === scale
                    ? "bg-white/20 text-[#d4ff00] border border-[#d4ff00]/40"
                    : "bg-white/5 text-white/50 hover:text-white"
                }`}
              >
                {scale}
              </button>
            ))}
          </div>

          {/* Action Buttons: Burst & Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={burstImpulse}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:ring-1 focus-visible:ring-[#d4ff00]"
              aria-label="Burst particle impulse"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4ff00]" />
              <span>IMPULSE</span>
            </button>

            <button
              onClick={resetSimulation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-[#d4ff00]"
              aria-label="Reset physics canvas"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
