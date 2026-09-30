"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { sound } from "@/lib/sound";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MagneticButton({
  children,
  strength = 0.35,
  className = "",
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || isReduced) return;

    const btn = buttonRef.current;
    const text = textRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.35,
        ease: "power2.out"
      });

      if (text) {
        gsap.to(text, {
          x: relX * (strength * 0.4),
          y: relY * (strength * 0.4),
          duration: 0.35,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
      if (text) {
        gsap.to(text, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        });
      }
    };

    const handleMouseEnter = () => {
      sound.playTick();
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    btn.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
      btn.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [strength]);

  return (
    <button
      ref={buttonRef}
      onClick={(e) => {
        sound.playThump();
        onClick?.(e);
      }}
      className={`relative inline-flex items-center justify-center select-none outline-none focus-visible:ring-2 focus-visible:ring-[#d4ff00] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
      {...props}
    >
      <span ref={textRef} className="relative z-10 block pointer-events-none">
        {children}
      </span>
    </button>
  );
}
