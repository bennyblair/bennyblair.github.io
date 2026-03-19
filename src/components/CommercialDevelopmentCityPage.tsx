import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, TrendingUp, CheckCircle, Building2, FileText, ArrowRight, Home, Users, Calendar, Shield } from 'lucide-react';
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
  { label: 'Indicative review', value: '2-4 weeks', icon: Clock },
  { label: 'Typical LVR', value: '60-80%', icon: TrendingUp },
  { label: 'Construction term', value: '12-36 months', icon: Calendar },
  { label: 'Facility size', value: '$500K-$50M', icon: DollarSign }
];

const processSteps = [
  'Complete detailed feasibility including cost estimates, timeline, market analysis, and exit strategy.',
  'Submit comprehensive application with builder contracts, planning approvals, and professional team credentials.',
  'Undergo lender due diligence on project viability, developer experience, security quality, and market conditions.',
  'Receive approval and settle facility, then draw down progressively against certified construction milestones.',
  'Complete construction, obtain occupancy certificate, and execute exit strategy (sale or refinance).'
];

const disclaimer = 'This page is for informational purposes only and does not constitute financial advice. Emet Capital provides commercial lending solutions to eligible business borrowers. Please consult a licensed financial adviser before making any financial decisions.';

export default function CommercialDevelopmentCityPage({ city, canonical, title, description, localIntro, localFocus, marketOverview, timingPressures, suburbCoverage, localUseCases, scenarios, relatedLinks, faqs }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        keywords={`development finance ${city}, construction loans ${city}, property development ${city}, development funding ${city}`}
        schemas={[generateServiceSchema(`Commercial Development Finance ${city}`, description, `https://emetcapital.com.au${canonical}`)]}
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Property Development', href: '/services/commercial-property-development' },
            { label: city }
          ]}
        />

        <section className="max-w-5xl mx-auto text-center pt-4 pb-12">
          <Badge className="mb-4 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">{city} Development Market</Badge>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="h-8 w-8 text-emerald-300" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Commercial Development Finance {city}</h1>
          </div>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-6">{localIntro}</p>
          <p className="text-slate-400 max-w-4xl mx-auto mb-8 leading-relaxed">{marketOverview}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <Icon className="h-5 w-5 text-emerald-300 mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-slate-400">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Link to="/contact"><FileText className="mr-2 h-5 w-5" />Get Development Quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <a href="tel:0485952651"><ArrowRight className="mr-2 h-5 w-5" />Call Development Expert</a>
            </Button>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Why Development Finance Matters in {city}</h2>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
            <p className="text-slate-300 leading-relaxed mb-4">{localFocus}</p>
            <p className="text-slate-300 leading-relaxed">{timingPressures}</p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">{city} Suburb & Precinct Coverage</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {suburbCoverage.map((point, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{point.title}</h3>
                <p className="text-slate-400 leading-relaxed">{point.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Local Development Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {localUseCases.map((useCase, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{useCase.title}</h3>
                <p className="text-slate-400 leading-relaxed">{useCase.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">{city} Development Scenarios</h2>
          <div className="space-y-8">
            {scenarios.map((scenario, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">{scenario.title}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-300 mb-2">Scenario</h4>
                    <p className="text-slate-400 mb-4">{scenario.scenario}</p>
                    <h4 className="text-lg font-semibold text-emerald-300 mb-2">Solution</h4>
                    <p className="text-slate-400">{scenario.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-300 mb-2">Outcomes</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {scenario.outcomes.map((outcome, idx) => (
                        <div key={idx} className="bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-400 mb-1">{outcome.label}</div>
                          <div className="text-lg font-bold text-white">{outcome.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Development Finance Process</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <ol className="space-y-4">
              {processSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-900 text-emerald-300 rounded-full flex items-center justify-center mr-4 mt-1">
                    {index + 1}
                  </div>
                  <p className="text-slate-300 pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Related Reading</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedLinks.map((link, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">{link.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{link.description}</p>
                <Link to={link.href} className="inline-flex items-center text-emerald-400 hover:text-emerald-300">
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="pb-6 border-b border-slate-800 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-16">
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Important Disclaimer</h3>
                <p className="text-slate-400">{disclaimer}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto text-center">
          <Button size="lg" asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Link to="/contact">
              <FileText className="mr-2 h-5 w-5" />
              Discuss Your {city} Development Project
            </Link>
          </Button>
          <p className="text-slate-400 mt-4">
            Return to <Link to="/services/commercial-property-development" className="text-emerald-400 hover:text-emerald-300">Property Development service page</Link>
          </p>
        </section>
      </div>
    </div>
  );
}