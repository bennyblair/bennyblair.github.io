import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import "@/styles/process-architecture.css";

const steps = [
  { title: "Enquiry", description: "Outline the purpose, property security and funding date" },
  { title: "Assessment", description: "We review the file, lender fit and trade-offs" },
  { title: "Approval", description: "The lender assesses the file and sets any approval conditions" },
  { title: "Settlement", description: "Legal documents and conditions must be satisfied before funds are released" },
];

export default function ProcessJourney({ paused }: { paused: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [localPause, setLocalPause] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [foreground, setForeground] = useState(true);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    const updateVisibility = () => setForeground(!document.hidden);
    updateVisibility(); document.addEventListener("visibilitychange", updateVisibility);
    update(); media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (root.current) observer.observe(root.current);
    return () => { document.removeEventListener("visibilitychange", updateVisibility); observer.disconnect(); media.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    if (paused || localPause || reduced || !visible || !foreground || active === 3) return;
    const timer = window.setTimeout(() => setActive(value => value + 1), 1200);
    return () => window.clearTimeout(timer);
  }, [paused, localPause, reduced, visible, foreground, active]);
  const isPaused = paused || localPause || reduced || active === 3;
  return <div className="architecture-journey" ref={root} data-stage={active} data-paused={isPaused}>
    <noscript><style>{`.architecture-caption[data-active="false"]{display:block!important;margin-top:24px}.architecture-controls,.architecture-navigation{display:none!important}`}</style></noscript>
    <div className="architecture-heading"><p className="eyebrow">A clear process</p><h2>How It Works</h2><p>From the first conversation to lender assessment and settlement</p></div>
    <div className="architecture-stage">
      <div className="architecture-model" aria-hidden="true">
        <div className="architecture-grid" />
        <div className="architecture-assembly" style={{ "--active-level": active } as CSSProperties}>
          {steps.map((step, index) => <div key={step.title} className="architecture-frame" data-lit={index <= active} data-current={index === active} style={{ "--level": index } as CSSProperties}><i className="architecture-crossbar" /><span>{String(index + 1).padStart(2, "0")}</span></div>)}
          <div className="architecture-light" />
        </div>
        <span className="architecture-coordinate">EMET / STRUCTURE</span>
      </div>
      <div className="architecture-stage-copy" aria-live="off"><span className="architecture-counter">{String(active + 1).padStart(2, "0")} <span>/ 04</span></span><div className="architecture-captions">{steps.map((step,index) => <div key={step.title} className="architecture-caption" data-active={active === index}><h3>{step.title}</h3><p>{step.description}</p></div>)}</div></div>
    </div>
    <div className="architecture-navigation" aria-label="Finance process stages">{steps.map((step, index) => <button key={step.title} type="button" aria-pressed={active === index} onClick={() => {setActive(index); setLocalPause(true);}}><span>{String(index + 1).padStart(2, "0")}</span><span className="architecture-nav-label">{step.title}</span><i /></button>)}</div>
    <div className="architecture-controls"><span>One stage at a time.</span><div><button type="button" disabled={paused || reduced} aria-pressed={isPaused} onClick={() => { if(active === 3) setActive(0); setLocalPause(!isPaused); }}>{isPaused ? <Play size={14} /> : <Pause size={14} />}{isPaused ? "Play" : "Pause"}</button><button type="button" onClick={() => {setActive(0); setLocalPause(false);}}><RotateCcw size={14} />Replay</button></div></div>
  </div>;
}


