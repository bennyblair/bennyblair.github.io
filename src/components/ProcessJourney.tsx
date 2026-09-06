import { useRef, type CSSProperties } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import ProcessCylinder from "./ProcessCylinder";
import { useProcessSequence } from "@/hooks/use-process-sequence";

const steps = [
  { title: "Enquiry", description: "Tell us about your funding requirements" },
  { title: "Assessment", description: "We evaluate your proposal and present options" },
  { title: "Approval", description: "Fast-track approval with our lender network" },
  { title: "Settlement", description: "Quick settlement and funding deployment" },
];

export default function ProcessJourney({ paused }: { paused: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const sequence = useProcessSequence(root, paused);
  return (
    <div ref={root} className="process-journey" data-stage={sequence.activeStage}>
      <div className="section-header"><div><p className="eyebrow">A clear process</p><h2>How It Works</h2></div><p>Four simple steps to funding success</p></div>
      <ProcessCylinder />
      <div className="process-steps">{steps.map((step, index) => <div className="process-step" key={step.title} data-active={sequence.activeStage === index} style={{ "--process-stage": index + 1 } as CSSProperties}>
        <button className="process-stage-button" type="button" aria-label={`Show ${step.title} stage`} aria-pressed={sequence.activeStage === index} onClick={() => sequence.select(index)}>{String(index + 1).padStart(2, "0")}</button>
        <div className="process-step-copy"><h3>{step.title}</h3><p>{step.description}</p></div>
      </div>)}</div>
      <div className="process-player">
        <div className="process-sequence-progress" aria-hidden="true"><span /></div>
        <div className="process-player-controls">
          {/* Prerender uses reduced motion. Keep native disabled tied only to explicit user state. */}
          <button className="process-motion-toggle" type="button" disabled={paused} aria-pressed={sequence.paused} onClick={sequence.toggle}>{sequence.paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}{sequence.paused ? "Play sequence" : "Pause sequence"}</button>
          <button className="process-replay" type="button" onClick={sequence.replay}><RotateCcw aria-hidden="true" />Replay sequence</button>
        </div>
      </div>
    </div>
  );
}
