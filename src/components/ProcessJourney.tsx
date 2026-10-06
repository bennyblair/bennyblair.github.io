import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, RotateCcw } from "lucide-react";
import "@/styles/process-architecture.css";

const steps = [
  { title: "Enquiry", description: "Outline the purpose, property security and funding date" },
  { title: "Assessment", description: "We review the file, lender fit and trade-offs" },
  { title: "Approval", description: "The lender assesses the file and sets any approval conditions" },
  { title: "Settlement", description: "Legal documents and conditions must be satisfied before funds are released" },
];

// The same four-bar mark and Manrope wordmark used in the site navigation.
function SlabBrand() {
  return <svg className="architecture-slab-detail" viewBox="0 0 166 32" fill="currentColor" aria-hidden="true" focusable="false">
    <g transform="translate(0 3) skewY(-22)"><path d="M1 10h3v14H1zM8 10h3v14H8zM15 10h3v11h-3zM22 10h3v8h-3z" /></g>
    <text x="35" y="26" fontFamily="Manrope, sans-serif" fontSize="22" fontWeight="600" letterSpacing="-1">Emet Capital</text>
  </svg>;
}

export default function ProcessJourney({ paused }: { paused: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const geometry = useRef({ top: 96, range: 0, pinned: false });
  const motion = useRef({ value: 0, target: 0 });
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(true);
  const [layout, setLayout] = useState({ top: 96, range: 0, pinned: false });
  const active = Math.min(3, Math.max(0, Math.round(progress)));

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!track.current || !panel.current) return;
    let frame = 0;
    let previousTime = 0;
    const animate = (time: number) => {
      const dt = previousTime ? Math.min(64, time - previousTime) : 16;
      previousTime = time;
      const current = motion.current;
      current.value += (current.target - current.value) * (1 - Math.exp(-dt / 65));
      const settled = Math.abs(current.target - current.value) < .002;
      if (settled) current.value = current.target;
      setProgress(current.value);
      frame = settled ? 0 : requestAnimationFrame(animate);
      if (settled) previousTime = 0;
    };
    const updateScroll = () => {
      if (reduced || paused) return;
      const { top, range, pinned } = geometry.current;
      const bounds = track.current!.getBoundingClientRect();
      // Short/zoomed viewports use natural section flow, without pinning.
      const distance = pinned ? range : Math.max(240, bounds.height * .6);
      const offset = pinned ? top - bounds.top : window.innerHeight * .35 - bounds.top;
      const raw = Math.max(0, Math.min(3, offset / distance * 3));
      const stage = Math.floor(raw);
      // A brief landing at each level, followed by a smooth journey to the next.
      const travel = Math.max(0, Math.min(1, (raw - stage - .12) / .76));
      motion.current.target = stage + travel * travel * (3 - 2 * travel);
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const measure = () => {
      const header = document.querySelector(".site-nav, header");
      const top = Math.max(16, (header?.getBoundingClientRect().height ?? 80) + 12);
      const height = panel.current!.getBoundingClientRect().height;
      const pinned = !reduced && !paused && height + top + 16 <= window.innerHeight;
      const range = pinned ? Math.round(Math.min(560, window.innerHeight * (window.innerWidth <= 760 ? .58 : .7))) : 0;
      geometry.current = { top, range, pinned };
      setLayout(geometry.current);
      updateScroll();
    };
    const scroll = () => {
      updateScroll();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(panel.current);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener("scroll", scroll); window.removeEventListener("resize", measure);
    };
  }, [reduced, paused]);

  const select = (index: number) => {
    motion.current = { value: index, target: index };
    setProgress(index);
    if (reduced || paused || !track.current) return;
    const { top, range, pinned } = geometry.current;
    const bounds = track.current.getBoundingClientRect();
    const start = window.scrollY + bounds.top - (pinned ? top : window.innerHeight * .35);
    window.scrollTo({ top: start + index / 3 * (pinned ? range : Math.max(240, bounds.height * .6)), behavior: "instant" });
  };

  return <div className="architecture-scroll-track" ref={track} data-pinned={layout.pinned} style={{ "--scroll-range": `${layout.range}px`, "--sticky-top": `${layout.top}px` } as CSSProperties}>
    <div className="architecture-journey architecture-journey--scroll" ref={panel} data-stage={active} data-enhanced="true" data-paused={paused || reduced}>
      <div className="architecture-heading"><p className="eyebrow">A clear process</p><h2>How It Works</h2><p>From the first conversation to lender assessment and settlement.</p></div>
      <div className="architecture-stage">
        <div className="architecture-model" aria-hidden="true" style={{ "--journey": progress / 3 } as CSSProperties}>
          <div className="architecture-grid" />
          <div className="architecture-ground" />
          <div className="architecture-assembly" style={{ "--active-level": progress, "--camera-turn": `${-34 + progress * 2}deg` } as CSSProperties}>
            {steps.map((step, index) => <div key={step.title} className="architecture-frame" data-lit={index <= active} data-current={index === active} style={{ "--level": 3 - index, "--illumination": Math.max(0, 1 - Math.abs(progress - index)) } as CSSProperties}><i className="architecture-crossbar" /><span>{String(index + 1).padStart(2, "0")}</span><SlabBrand /></div>)}
            <div className="architecture-light" />
          </div>
        </div>
        <div className="architecture-stage-copy" aria-live="off"><span className="architecture-counter">{String(active + 1).padStart(2, "0")} <span>/ 04</span></span><div className="architecture-captions">{steps.map((step, index) => <div key={step.title} className="architecture-caption" data-active={active === index}><h3>{step.title}</h3><p>{step.description}</p></div>)}</div></div>
      </div>
      <div className="architecture-navigation" aria-label="Finance process stages">{steps.map((step, index) => <button key={step.title} type="button" aria-pressed={active === index} onClick={() => select(index)} style={{ "--step-fill": Math.max(0, Math.min(1, progress - index + 1)) } as CSSProperties}><span>{String(index + 1).padStart(2, "0")}</span><span className="architecture-nav-label">{step.title}</span></button>)}</div>
      <div className="architecture-controls"><span><ArrowDown size={14} aria-hidden="true" />{paused || reduced ? "Select a stage to explore." : "Scroll to move through the stages."}</span><div><button type="button" onClick={() => select(0)}><RotateCcw size={14} />Back to start</button></div></div>
    </div>
  </div>;
}
