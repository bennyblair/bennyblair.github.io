import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TRANSACTION_JOURNEYS } from "@/lib/transactions";

export default function TransactionJourneys() {
  return (
    <section aria-labelledby="transaction-journeys-heading" className="py-12">
      <h2 id="transaction-journeys-heading" className="text-3xl font-bold text-center mb-4">What do you need the funding to do?</h2>
      <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
        Business-purpose finance secured by residential or commercial property. Start with the transaction; we help compare the lending structures.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRANSACTION_JOURNEYS.map((journey) => (
          <Link key={journey.value} to={journey.path} data-analytics-event="transaction_journey_select" data-transaction-purpose={journey.value}
            className="rounded-xl border border-border bg-card p-6 flex flex-col hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <h3 className="text-xl font-semibold mb-3">{journey.label}</h3>
            <p className="text-sm text-muted-foreground mb-5 flex-1">{journey.description}</p>
            <span className="text-foreground text-sm font-medium flex items-center gap-2">Explore options <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
