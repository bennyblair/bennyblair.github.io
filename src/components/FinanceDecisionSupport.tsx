import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type EvidenceItem = {
  label: string;
  detail: string;
};

type DecisionRow = {
  question: string;
  whyItMatters: string;
};

type FinanceDecisionSupportProps = {
  heading: string;
  summary: string;
  suitable: string[];
  unsuitable: string[];
  evidence: EvidenceItem[];
  process: string[];
  decisionRows: DecisionRow[];
};

const TickList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 text-sm text-muted-foreground">
    {items.map((item) => (
      <li key={item} className="flex gap-2">
        <span aria-hidden="true" className="mt-0.5 text-accent">•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const FinanceDecisionSupport = ({
  heading,
  summary,
  suitable,
  unsuitable,
  evidence,
  process,
  decisionRows,
}: FinanceDecisionSupportProps) => (
  <section aria-labelledby="finance-decision-heading" className="space-y-6">
    <div>
      <h2 id="finance-decision-heading" className="text-3xl font-bold text-foreground mb-4">
        {heading}
      </h2>
      <p className="text-muted-foreground leading-relaxed">{summary}</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Situations that may fit</CardTitle></CardHeader>
        <CardContent><TickList items={suitable} /></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-lg">Pause and compare alternatives when</CardTitle></CardHeader>
        <CardContent><TickList items={unsuitable} /></CardContent>
      </Card>
    </div>

    <div>
      <h3 className="text-xl font-semibold text-foreground mb-3">Evidence that helps an assessment</h3>
      <dl className="grid md:grid-cols-2 gap-4">
        {evidence.map((item) => (
          <div key={item.label} className="rounded-lg border border-border p-4">
            <dt className="font-semibold text-foreground">{item.label}</dt>
            <dd className="mt-1 text-sm text-muted-foreground">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </div>

    <div>
      <h3 className="text-xl font-semibold text-foreground mb-3">Assessment pathway</h3>
      <ol className="grid gap-3">
        {process.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm text-muted-foreground">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 font-semibold text-accent">
              {index + 1}
            </span>
            <span className="pt-1">{step}</span>
          </li>
        ))}
      </ol>
    </div>

    <div className="overflow-x-auto">
      <h3 className="text-xl font-semibold text-foreground mb-3">Questions to answer before choosing a facility</h3>
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-3 pr-4 font-semibold text-foreground">Decision question</th>
            <th scope="col" className="py-3 font-semibold text-foreground">Why it matters</th>
          </tr>
        </thead>
        <tbody>
          {decisionRows.map((row) => (
            <tr key={row.question} className="border-b border-border align-top">
              <th scope="row" className="py-3 pr-4 font-medium text-foreground">{row.question}</th>
              <td className="py-3 text-muted-foreground">{row.whyItMatters}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default FinanceDecisionSupport;
