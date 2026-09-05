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
      const process = page.querySelector<HTMLElement>(".home-process");
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
      const line = animate(page.querySelector(".process-track-fill"), [
        { transform: "scaleX(0)" }, { transform: "scaleX(1)" },
      ], { duration: 1000, fill: "both" });
      [camera, survey, line].forEach(animation => animation?.pause());

      const update = () => {
        frame = 0;
        if (hero) {
          const box = hero.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, -box.top / box.height));
          if (camera) camera.currentTime = progress * 1000;
          if (survey) survey.currentTime = progress * 1000;
        }
        if (process && line) {
          const box = process.getBoundingClientRect();
          line.currentTime = Math.max(0, Math.min(1, (innerHeight - box.top) / (innerHeight * .8))) * 1000;
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
