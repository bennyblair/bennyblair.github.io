"use client";

import { type ReactNode } from "react";

type Animation = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const animationNames: Record<Animation, string> = {
  "fade-up": "scrollRevealFadeUp",
  "fade-down": "scrollRevealFadeDown",
  "fade-left": "scrollRevealFadeLeft",
  "fade-right": "scrollRevealFadeRight",
  "zoom-in": "scrollRevealZoomIn",
  "fade": "scrollRevealFade",
};

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className = "",
}: ScrollRevealProps) {
  return (
    <div
      className={className}
      style={{
        animationName: animationNames[animation],
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}
