import { ArrowRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import {
  discoveryGuidesByService,
  type DiscoveryService,
} from "@/config/discovery-guides";

interface DiscoveryGuidesProps {
  service: DiscoveryService;
}

const DiscoveryGuides = ({ service }: DiscoveryGuidesProps) => {
  const guides = discoveryGuidesByService[service];
  const headingId = `decision-guides-${service}`;

  return (
    <section className="mb-12" aria-labelledby={headingId}>
      <h2 id={headingId} className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Compass className="h-6 w-6 text-accent" />
        Decision guides for common scenarios
      </h2>
      <p className="text-muted-foreground mb-6">
        Use these focused guides to prepare the facts, documents and questions that matter before comparing finance.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            to={guide.href}
            className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
          >
            <h3 className="font-semibold text-foreground mb-2">{guide.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
            <span className="text-accent text-sm inline-flex items-center font-medium">
              Read decision guide <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DiscoveryGuides;
