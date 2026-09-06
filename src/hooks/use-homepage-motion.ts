import { useEffect, type RefObject } from "react";

/** Decorative motion never controls content visibility or serialises into prerendered HTML. */
export function useHomepageMotion(root: RefObject<HTMLDivElement>, paused: boolean) {
  useEffect(() => {
    const page = root.current;
    if (!page) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop = () => {};

    const start = () => {
      stop();
      if (paused || preference.matches || !Element.prototype.animate) return;
      const animations: Animation[] = [];
      let frame = 0;
      const animate = (element: Element | null, frames: Keyframe[], options: KeyframeAnimationOptions) => {
        if (!element) return;
        const animation = element.animate(frames, options);
        animations.push(animation);
        return animation;
      };
      const hero = page.querySelector<HTMLElement>(".home-hero");
      const process = page.querySelector<HTMLElement>(".process-visual");
      const image = page.querySelector(".hero-image img");
      // One finite camera move. The pause control also stops scroll-linked effects.
      animate(image, [{ transform: "scale(1.1)" }, { transform: "scale(1.025)" }], {
        duration: 4200, easing: "cubic-bezier(.2,.65,.3,1)",
      });
      page.querySelectorAll(".hero-title-line").forEach((line, index) => {
        animate(line, [{ transform: "translateY(18px)" }, { transform: "translateY(0)" }], {
          duration: 850, delay: index * 90, easing: "cubic-bezier(.16,1,.3,1)",
        });
      });
      const camera = animate(page.querySelector(".hero-image picture"), [
        { transform: "translateY(0) scale(1.025)" },
        { transform: "translateY(70px) scale(1.065)" },
      ], { duration: 1000, fill: "both" });
      const survey = animate(page.querySelector(".hero-survey-lines"), [
        { transform: "rotate(-7deg) scale(1.12)" },
        { transform: "rotate(8deg) scale(1)" },
      ], { duration: 1000, fill: "both" });
      const ball = animate(page.querySelector(".process-ball"), [
        { transform: "translateY(0px)" }, { transform: "translateY(420px)" },
      ], { duration: 1000, fill: "both" });
      const rings = [...page.querySelectorAll(".process-ring-glow")].map((ring, index) => {
        const center = index / 3;
        // Soft light follows the sphere as it passes each funding stage.
        const offsets = [...new Set([0, Math.max(0, center - .2), center, Math.min(1, center + .2), 1])].sort((a, b) => a - b);
        return animate(ring, offsets.map(offset => ({ offset, opacity: String(Math.max(0, 1 - Math.abs(offset - center) / .2)) })), { duration: 1000, fill: "both" });
      });
      [camera, survey, ball, ...rings].forEach(animation => animation?.pause());

      const update = () => {
        frame = 0;
        if (hero) {
          const box = hero.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, -box.top / box.height));
          if (camera) camera.currentTime = progress * 1000;
          if (survey) survey.currentTime = progress * 1000;
        }
        if (process && ball) {
          const box = process.getBoundingClientRect();
          // The disclosure below is outside this wrapper, so expanding it never shifts the timeline.
          const progress = Math.max(0, Math.min(1, (innerHeight * .7 - box.top) / Math.max(box.height * .75, innerHeight * .65)));
          ball.currentTime = progress * 1000;
          rings.forEach(ring => { if (ring) ring.currentTime = progress * 1000; });
        }
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      update();

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          // Content remains opaque and available even before it enters the viewport.
          animate(entry.target, [{ transform: "translateY(28px)" }, { transform: "translateY(0)" }], {
            duration: 900, easing: "cubic-bezier(.16,1,.3,1)",
          });
          if (entry.target.matches(".service-portrait, .scenario-media")) {
            animate(entry.target.querySelector("img"), [{ transform: "scale(1.08)" }, { transform: "scale(1)" }], {
              duration: 1400, easing: "cubic-bezier(.2,.65,.3,1)",
            });
          }
        });
      }, { threshold: .12 });
      page.querySelectorAll("[data-motion-enter]").forEach(element => observer.observe(element));
      stop = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        observer.disconnect();
        animations.forEach(animation => animation.cancel());
      };
    };
    start();
    preference.addEventListener("change", start);
    return () => { stop(); preference.removeEventListener("change", start); };
  }, [root, paused]);
}
