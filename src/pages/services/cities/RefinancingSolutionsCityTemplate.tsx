import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Building2, Clock3, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateServiceSchema } from "@/lib/schema-utils";

type Scenario = {
  title: string;
  summary: string;
  figures: { label: string; value: string }[];
};

type CityPageData = {
  city: string;
  state: string;
  title: string;
  description: string;
  canonical: string;
  keywords: string;
  heroStats: { label: string; value: string }[];
  marketOverview: string[];
  timingPressures: string[];
  precinctGroups: { name: string; areas: string; note: string }[];
  useCases: { title: string; body: string }[];
  caseStudies: Scenario[];
  processSteps: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  relatedLinks: { label: string; to: string }[];
};

const RefinancingSolutionsCityTemplate: React.FC<{ data: CityPageData }> = ({ data }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <SEO
        title={data.title}
        description={data.description}
        canonical={data.canonical}
        keywords={data.keywords}
        schemas={[
          generateServiceSchema(data.title, data.description, `https://emetcapital.com.au${data.canonical}`),
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Refinancing Solutions", href: "/services/refinancing-solutions" },
            { label: data.city },
          ]}
        />

        <section className="text-center max-w-5xl mx-auto mb-16 pt-4">
          <Badge className="mb-4 bg-accent/10 text-accent">{data.city} Commercial Finance</Badge>
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-accent" />
            <h1 className="text-4xl lg:text-5xl font-bold">{data.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">{data.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {data.heroStats.map((stat) => (
              <div key={stat.label} className="bg-muted/40 p-4 rounded-lg border">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-foreground/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
              <Link to="/contact">Get Quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/services/refinancing-solutions">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Refinancing Solutions
              </Link>
            </Button>
          </div>
        </section>
      </div>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center">{data.city} market overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-lg border p-6">
              <h3 className="text-xl font-semibold mb-4">Where refinancing fits locally</h3>
              <div className="space-y-4 text-muted-foreground">
                {data.marketOverview.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div className="bg-background rounded-lg border p-6">
              <h3 className="text-xl font-semibold mb-4">Timing pressures borrowers often face</h3>
              <ul className="space-y-3 text-muted-foreground">
                {data.timingPressures.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Clock3 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Suburbs and precincts we regularly discuss</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.precinctGroups.map((group) => (
              <div key={group.name} className="bg-background rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-3">{group.name}</h3>
                <p className="text-sm font-medium text-foreground mb-2">{group.areas}</p>
                <p className="text-muted-foreground text-sm">{group.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Common {data.city} refinancing use cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.useCases.map((item) => (
              <div key={item.title} className="bg-muted/20 rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Local case studies and scenarios</h2>
          <div className="space-y-8">
            {data.caseStudies.map((item) => (
              <div key={item.title} className="bg-background rounded-lg border p-8">
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <p className="text-muted-foreground">{item.summary}</p>
                  <div className="bg-muted/20 rounded-lg p-6 border">
                    <h4 className="font-semibold mb-3">Illustrative scenario numbers</h4>
                    <div className="space-y-3 text-sm">
                      {item.figures.map((figure) => (
                        <div key={figure.label} className="flex justify-between gap-4 border-b border-border/60 pb-2 last:border-0 last:pb-0">
                          <span className="text-muted-foreground">{figure.label}</span>
                          <span className="font-semibold text-right">{figure.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center">How the refinancing process usually works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {data.processSteps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="bg-accent/10 text-accent w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Related guides and service pages</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.relatedLinks.map((link) => (
              <Link key={link.to} to={link.to} className="flex items-center justify-between rounded-lg border bg-background p-5 hover:border-accent/50 hover:bg-accent/5 transition-colors">
                <span className="font-medium">{link.label}</span>
                <ArrowRight className="h-5 w-5 text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center">{data.city}-specific FAQs</h2>
          <div className="space-y-6">
            {data.faqs.map((faq) => (
              <div key={faq.q} className="bg-muted/20 rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-3">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Need to review a {data.city} refinance scenario?</h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Emet Capital helps business owners, investors, and developers compare commercial refinance options across bank, non-bank, and private lending channels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
              <Link to="/contact">Request a funding review</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/services/refinancing-solutions">Learn more about refinancing solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10 bg-background border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-lg border bg-muted/20 p-6">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                This page is for informational purposes only and does not constitute financial advice. Emet Capital provides commercial lending solutions to eligible business borrowers. Lending structure, timing, leverage, and approval outcomes depend on lender policy, security, and scenario-specific due diligence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefinancingSolutionsCityTemplate;
