import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, TrendingUp, CheckCircle, Building2, FileText, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { generateServiceSchema } from '@/lib/schema-utils';

type DetailedScenario = {
  title: string;
  scenario: string;
  solution: string;
  outcomes: { label: string; value: string }[];
};

type LocalPoint = {
  title: string;
  text: string;
};

type LinkItem = {
  title: string;
  href: string;
  description: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  city: string;
  state: string;
  canonical: string;
  title: string;
  description: string;
  localIntro: string;
  localFocus: string;
  marketOverview: string;
  timingPressures: string;
  suburbCoverage: LocalPoint[];
  localUseCases: LocalPoint[];
  scenarios: DetailedScenario[];
  relatedLinks: LinkItem[];
  faqs: FAQItem[];
};

const stats = [
  { label: 'Assessment basis', value: 'Security + exit', icon: Clock },
  { label: 'Typical leverage', value: 'Case-by-case', icon: TrendingUp },
  { label: 'Common term', value: '3-24 months', icon: CheckCircle },
  { label: 'Facility size', value: '$100K-$20M+', icon: DollarSign }
];

const processSteps = [
  'Clarify the security, commercial purpose, time pressure, borrower structure, and expected exit before approaching lenders.',
  'Shortlist private credit, non-bank, or specialist lenders that actually like the asset type, leverage, and turnaround required.',
  'Coordinate valuation, legal, and entity documents early so the file can move cleanly instead of stalling in due diligence.',
  'Settle the facility and manage the next step clearly, whether that is sale, refinance, project completion, or another defined liquidity event.'
];

const disclaimer = 'This page is for informational purposes only and does not constitute financial advice. Emet Capital provides commercial lending solutions to eligible business borrowers. Please consult a licensed financial adviser before making any financial decisions.';

export default function PrivateLendingCityPage({ city, canonical, title, description, localIntro, localFocus, marketOverview, timingPressures, suburbCoverage, localUseCases, scenarios, relatedLinks, faqs }: Props) {
  return (
    <div className="location-page min-h-screen bg-background text-foreground">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        keywords={`private lending ${city}, private lender ${city}, commercial private lender ${city}, non-bank lender ${city}`}
        schemas={[generateServiceSchema(`Private Lending ${city}`, description, `https://emetcapital.com.au${canonical}`)]}
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Private Lending', href: '/services/private-lending' },
            { label: city }
          ]}
        />

        <section className="page-header location-header max-w-5xl mx-auto text-center pt-4 pb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border border-border">{city} Private Credit Market</Badge>
          <div className="location-title-row flex items-center justify-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">Private Lending {city}</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-6">{localIntro}</p>
          <p className="text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">{marketOverview}</p>
          <div className="location-facts grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-card border border-border rounded-xl p-4">
                <Icon className="h-5 w-5 text-primary mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/contact">Discuss your scenario</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-border text-foreground hover:bg-card">
              <Link to="/services/private-lending">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Private Lending
              </Link>
            </Button>
          </div>
        </section>

        <section className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">How private lending may fit {city} deals</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>
            <p className="text-muted-foreground leading-relaxed">{localFocus}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Why timing and structure matter in {city}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{timingPressures}</p>
            <div className="space-y-4 text-muted-foreground">
              <p><span className="font-semibold text-foreground">Security quality:</span> property type, title position, existing debt, and marketability still drive lender appetite.</p>
              <p><span className="font-semibold text-foreground">Commercial purpose:</span> private lenders still want to know exactly why the funds are needed and what they are enabling.</p>
              <p><span className="font-semibold text-foreground">Exit strategy:</span> sale, refinance, project milestone, or another defined repayment event needs to be believable.</p>
              <p><span className="font-semibold text-foreground">Execution readiness:</span> in private credit, the deals that settle fastest are usually the deals prepared best.</p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Suburbs, precincts, and corridors we watch in {city}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {suburbCoverage.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Common {city} private lending use cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {localUseCases.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Local {city} case studies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {scenarios.map((item) => (
              <div key={item.title} className="bg-muted border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-4">{item.title}</h3>
                <div className="space-y-4 text-foreground">
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Scenario</div>
                    <p className="text-foreground leading-relaxed">{item.scenario}</p>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Solution</div>
                    <p className="text-foreground leading-relaxed">{item.solution}</p>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-2">Transaction snapshot</div>
                    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                      {item.outcomes.map((o) => (
                        <div key={o.label} className="flex items-center justify-between gap-4">
                          <span className="text-muted-foreground text-sm">{o.label}</span>
                          <span className="text-foreground font-semibold text-right">{o.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">How the process usually works</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-background rounded-lg border border-border p-5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">{idx + 1}</div>
                  <p className="text-muted-foreground leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Related guides and service pages</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedLinks.map((item) => (
                <Link key={item.href} to={item.href} className="block rounded-xl border border-border bg-background p-5 hover:border-border hover:bg-card transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5" />
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.description}</p>
                  <span className="inline-flex items-center text-primary text-sm font-medium">
                    Explore page <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-border bg-background p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto text-center pb-12">
          <div className="bg-card border border-border rounded-xl p-8 mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-4">Need a {city} private lending solution?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              If the transaction is commercial, the timing is real, and the structure needs to fit the asset rather than a generic policy box, private lending may be worth exploring. We can help assess lender fit, execution risk, and likely pathways.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/contact">Discuss your scenario</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-border text-foreground hover:bg-card">
                <Link to="/services/private-lending">Explore private lending</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background p-5 text-left">
            <p className="text-sm text-muted-foreground leading-relaxed">{disclaimer}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
