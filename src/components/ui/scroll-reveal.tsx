"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Animation = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const animationStyles: Record<Animation, { from: string; to: string }> = {
  "fade-up": {
    from: "opacity-0 translate-y-8",
    to: "opacity-100 translate-y-0",
  },
  "fade-down": {
    from: "opacity-0 -translate-y-8",
    to: "opacity-100 translate-y-0",
  },
  "fade-left": {
    from: "opacity-0 -translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  "fade-right": {
    from: "opacity-0 translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  "zoom-in": {
    from: "opacity-0 scale-95",
    to: "opacity-100 scale-100",
  },
  "fade": {
    from: "opacity-0",
    to: "opacity-100",
  },
};

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className = "",
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const style = animationStyles[animation];

  return (
    <div
      ref={ref}
      className={`transition-all ${isVisible ? style.to : style.from} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}
