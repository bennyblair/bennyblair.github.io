import { useEffect, useRef, useState, type RefObject } from "react";

const DURATION = 5200;
const ARRIVALS = [0, 1450, 2900, 4350];
const HOLD = 850;

/** A finite, visibility-aware sequence. Native scrolling never advances its clock. */
export function useProcessSequence(root: RefObject<HTMLDivElement>, globallyPaused: boolean) {
  const [activeStage, setActiveStage] = useState(0);
  const [locallyPaused, setLocallyPaused] = useState(false);
  const controls = useRef({ pause: (_value: boolean) => {}, global: (_value: boolean) => {}, replay: () => {}, select: (_stage: number) => {} });
  const global = useRef(globallyPaused);
  global.current = globallyPaused;

  useEffect(() => {
    const node = root.current;
    if (!node || !Element.prototype.animate) return;
    const ball = node.querySelector(".process-ball");
    const visual = node.querySelector(".process-visual");
    if (!ball || !visual) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const frames: Keyframe[] = ARRIVALS.flatMap((time, stage) => [
      { offset: time / DURATION, transform: `translateY(${stage * 140}px)` },
      { offset: (time + HOLD) / DURATION, transform: `translateY(${stage * 140}px)`, easing: "cubic-bezier(.65,0,.25,1)" },
    ]);
    const master = ball.animate(frames, { duration: DURATION, fill: "both" });
    master.pause(); master.currentTime = 0;
    const accents = [...node.querySelectorAll(".process-ring-glow")].map((ring, stage) => {
      const points = [...new Set([0, Math.max(0, ARRIVALS[stage] - 450), ARRIVALS[stage], ARRIVALS[stage] + HOLD, Math.min(DURATION, ARRIVALS[stage] + HOLD + 450), DURATION])].sort((a, b) => a - b);
      const effect = ring.animate(points.map(time => ({
        offset: time / DURATION,
        opacity: time >= ARRIVALS[stage] && time <= ARRIVALS[stage] + HOLD ? 1 : 0,
      })), { duration: DURATION, fill: "both" });
      effect.pause(); effect.currentTime = 0;
      return effect;
    });
    const progress = node.querySelector(".process-sequence-progress span")?.animate([
      { transform: "scaleX(0)" }, { transform: "scaleX(1)" },
    ], { duration: DURATION, fill: "both" });
    progress?.pause();
    const effects = [...accents, ...(progress ? [progress] : [])];
    let frame = 0, visible = false, started = false, paused = false, reducedMotion = preference.matches;
    let target: number | null = null;

    const sync = () => {
      const time = Math.max(0, Math.min(DURATION, Number(master.currentTime) || 0));
      effects.forEach(effect => { effect.currentTime = time; });
      setActiveStage(Math.min(3, Math.floor((time + .5) / 1450)));
    };
    const tick = () => {
      frame = 0;
      const time = Number(master.currentTime) || 0;
      if (target !== null && (master.playbackRate > 0 ? time >= target : time <= target)) {
        master.pause(); master.currentTime = target; target = null;
        paused = true; setLocallyPaused(true);
      }
      sync();
      if (master.playState === "running") frame = requestAnimationFrame(tick);
    };
    const reconcile = () => {
      cancelAnimationFrame(frame); frame = 0;
      if (!started || !visible || document.hidden || global.current || paused || reducedMotion) master.pause();
      else if (master.playState !== "finished") master.play();
      sync();
      if (master.playState === "running") frame = requestAnimationFrame(tick);
    };
    controls.current = {
      global: () => reconcile(),
      pause: value => {
        if (!value) {
          if (Number(master.currentTime) >= DURATION) master.currentTime = 0;
          master.playbackRate = 1; target = null;
        }
        paused = value; setLocallyPaused(value); reconcile();
      },
      replay: () => {
        target = null; master.pause(); master.playbackRate = 1; master.currentTime = 0;
        paused = false; started = true; setLocallyPaused(false); reconcile();
      },
      select: stage => {
        target = ARRIVALS[stage]; started = true;
        if (reducedMotion || global.current || !visible || Math.abs(Number(master.currentTime) - target) < 1) {
          master.pause(); master.currentTime = target; target = null; paused = true; setLocallyPaused(true); reconcile();
        } else {
          master.pause();
          master.playbackRate = Number(master.currentTime) > target ? -1 : 1;
          paused = false; setLocallyPaused(false); reconcile();
        }
      },
    };
    master.onfinish = () => { sync(); paused = true; setLocallyPaused(true); };
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      visible = entry.isIntersecting && entry.intersectionRatio >= .15;
      if (entry.intersectionRatio >= .55) started = true;
      reconcile();
    }, { threshold: [0, .15, .55] });
    observer.observe(visual);
    const updatePreference = () => {
      reducedMotion = preference.matches; reconcile();
    };
    sync();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", reconcile);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); master.cancel(); effects.forEach(effect => effect.cancel());
      preference.removeEventListener("change", updatePreference); document.removeEventListener("visibilitychange", reconcile);
    };
  }, [root]);

  useEffect(() => { controls.current.global(globallyPaused); }, [globallyPaused]);
  return {
    activeStage, paused: globallyPaused || locallyPaused,
    toggle: () => controls.current.pause(!locallyPaused),
    replay: () => controls.current.replay(),
    select: (stage: number) => controls.current.select(stage),
  };
}
