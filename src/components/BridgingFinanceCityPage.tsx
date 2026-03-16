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
  { label: 'Indicative review', value: '24-48hrs', icon: Clock },
  { label: 'Common leverage', value: 'Up to 80%', icon: TrendingUp },
  { label: 'Typical term', value: '1-24 months', icon: CheckCircle },
  { label: 'Facility size', value: '$100K-$20M', icon: DollarSign }
];

const processSteps = [
  'Clarify the property, transaction purpose, timing pressure, current debt, and likely exit.',
  'Shortlist lenders that fit the asset type, leverage, legal complexity, and required turnaround.',
  'Coordinate valuation, legal, and credit items early so the deal can move without avoidable friction.',
  'Settle the bridge and manage the path to refinance, sale, project milestone, or another defined exit.'
];

const disclaimer = 'This page is for informational purposes only and does not constitute financial advice. Emet Capital provides commercial lending solutions to eligible business borrowers. Please consult a licensed financial adviser before making any financial decisions.';

export default function BridgingFinanceCityPage({ city, canonical, title, description, localIntro, localFocus, marketOverview, timingPressures, suburbCoverage, localUseCases, scenarios, relatedLinks, faqs }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        keywords={`bridging finance ${city}, bridging loan ${city}, commercial bridging finance ${city}, property finance ${city}`}
        schemas={[generateServiceSchema(`Bridging Finance ${city}`, description, `https://emetcapital.com.au${canonical}`)]}
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Bridging Finance', href: '/services/bridging-finance' },
            { label: city }
          ]}
        />

        <section className="max-w-5xl mx-auto text-center pt-4 pb-12">
          <Badge className="mb-4 bg-sky-500/15 text-sky-300 border border-sky-500/30">{city} Market</Badge>
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-sky-300" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Bridging Finance {city}</h1>
          </div>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-6">{localIntro}</p>
          <p className="text-slate-400 max-w-4xl mx-auto mb-8 leading-relaxed">{marketOverview}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <Icon className="h-5 w-5 text-sky-300 mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-slate-400">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-sky-500 hover:bg-sky-400 text-slate-950">
              <Link to="/contact">Discuss your scenario</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-slate-700 text-slate-100 hover:bg-slate-900">
              <Link to="/services/bridging-finance">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Bridging Finance
              </Link>
            </Button>
          </div>
        </section>

        <section className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">How bridging finance may fit {city} deals</h2>
            <p className="text-slate-300 leading-relaxed mb-4">{description}</p>
            <p className="text-slate-300 leading-relaxed">{localFocus}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why timing pressure shows up in {city}</h2>
            <p className="text-slate-300 leading-relaxed mb-4">{timingPressures}</p>
            <div className="space-y-4 text-slate-300">
              <p><span className="font-semibold text-white">Security quality:</span> property type, location, title position, and existing debt all matter.</p>
              <p><span className="font-semibold text-white">Exit strategy:</span> sale, refinance, project milestone, or another defined repayment event needs to be credible.</p>
              <p><span className="font-semibold text-white">Commercial purpose:</span> lenders still want to understand why a bridge is needed and what comes after it.</p>
              <p><span className="font-semibold text-white">Execution readiness:</span> valuation access, legal coordination, and clear documentation can materially affect speed.</p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Suburbs, precincts, and corridors we watch in {city}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {suburbCoverage.map((item) => (
              <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="h-5 w-5 text-sky-300" />
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Common {city} bridging finance use cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {localUseCases.map((item) => (
              <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Local {city} case studies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {scenarios.map((item) => (
              <div key={item.title} className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                <div className="space-y-4 text-slate-100">
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Scenario</div>
                    <p className="text-slate-100 leading-relaxed">{item.scenario}</p>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Solution</div>
                    <p className="text-slate-100 leading-relaxed">{item.solution}</p>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-2">Transaction snapshot</div>
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 space-y-2">
                      {item.outcomes.map((o) => (
                        <div key={o.label} className="flex items-center justify-between gap-4">
                          <span className="text-slate-400 text-sm">{o.label}</span>
                          <span className="text-white font-semibold text-right">{o.value}</span>
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
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">How the process usually works</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-slate-950 rounded-lg border border-slate-800 p-5">
                  <div className="w-10 h-10 rounded-full bg-sky-500/15 text-sky-300 flex items-center justify-center font-bold shrink-0">{idx + 1}</div>
                  <p className="text-slate-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Related guides and service pages</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedLinks.map((item) => (
                <Link key={item.href} to={item.href} className="block rounded-xl border border-slate-800 bg-slate-950 p-5 hover:border-sky-500/40 hover:bg-slate-900 transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="h-5 w-5 text-sky-300 mt-0.5" />
                    <h3 className="font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">{item.description}</p>
                  <span className="inline-flex items-center text-sky-300 text-sm font-medium">
                    Explore page <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-slate-800 bg-slate-950 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto text-center pb-12">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-6">
            <h2 className="text-3xl font-bold text-white mb-4">Need a {city} bridging finance solution?</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              If timing is the issue, the right bridging structure may help protect the transaction while the exit catches up. We can help assess lender fit, timeline pressure, and likely structure for {city} commercial and business-purpose scenarios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-sky-500 hover:bg-sky-400 text-slate-950">
                <Link to="/contact">Discuss your scenario</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-slate-700 text-slate-100 hover:bg-slate-900">
                <Link to="/services/bridging-finance">Explore bridging finance</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-left">
            <p className="text-sm text-slate-400 leading-relaxed">{disclaimer}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
