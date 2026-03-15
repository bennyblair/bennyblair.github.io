import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import FAQSection from '@/components/FAQSection';
import { generateServiceSchema } from '@/lib/schema-utils';

type CityScenario = { title: string; text: string };

type Props = {
  city: string;
  state: string;
  canonical: string;
  title: string;
  description: string;
  localIntro: string;
  localFocus: string;
  scenarios: CityScenario[];
};

const faqs = (city: string) => [
  {
    question: `When might bridging finance be used in ${city}?`,
    answer:
      `Bridging finance may be used in ${city} when timing matters more than a standard bank timeline. Common examples include auction purchases, refinance deadlines, site acquisitions, property upgrades, and short-term settlement gaps.`
  },
  {
    question: `How fast can ${city} bridging finance move?`,
    answer:
      'Timing depends on security, legal readiness, valuation, and lender fit. In stronger scenarios, private and specialist lenders may move much faster than mainstream bank processes.'
  },
  {
    question: 'What do lenders usually focus on?',
    answer:
      'Lenders typically focus on security quality, combined leverage, transaction purpose, and the exit strategy. The clearer the exit, the easier a short-term facility may be to assess.'
  },
  {
    question: `Can bridging finance work for commercial property in ${city}?`,
    answer:
      'Yes. It may be used for commercial acquisitions, time-sensitive refinance events, residual stock situations, and certain development-related transitions where there is a clear repayment path.'
  }
];

const stats = [
  { label: 'Approval Time', value: '24-48hrs', icon: Clock },
  { label: 'Indicative LVR', value: 'Up to 80%', icon: TrendingUp },
  { label: 'Terms', value: '1-24 months', icon: CheckCircle },
  { label: 'Loan Range', value: '$100K-$20M', icon: DollarSign }
];

const useCases = [
  {
    title: 'Auction settlements',
    text: 'Bridging finance may help buyers settle quickly where an auction contract is unconditional and long-form refinance funding is still in progress.'
  },
  {
    title: 'Commercial refinance deadlines',
    text: 'Where an existing facility is expiring before a replacement loan is ready, a bridge may help protect the asset position and buy time for a cleaner refinance.'
  },
  {
    title: 'Development and site transitions',
    text: 'Developers may use short-term funding for site acquisition, residual stock, or a transition between one facility and the next stage of project funding.'
  },
  {
    title: 'Business and property timing gaps',
    text: 'Business owners may use a bridge where a settlement, sale, or restructure is moving on a different timeline from the funding needed today.'
  }
];

const processSteps = [
  'Clarify the property, transaction purpose, timing pressure, and likely exit.',
  'Match the deal to lenders that may suit the asset, leverage, and time frame.',
  'Coordinate valuation, legal, and credit requirements for a fast decision path.',
  'Settle the facility and manage the transition toward sale, refinance, or the next funding stage.'
];

export default function BridgingFinanceCityPage({ city, state, canonical, title, description, localIntro, localFocus, scenarios }: Props) {
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
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-8">{localIntro}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <Card key={label} className="bg-slate-900/80 border-slate-800">
                <CardContent className="p-4">
                  <Icon className="h-5 w-5 text-sky-300 mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{value}</div>
                  <div className="text-sm text-slate-400">{label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-sky-500 hover:bg-sky-400 text-slate-950">
              <Link to="/contact">Get Quote</Link>
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
          <Card className="bg-slate-900/80 border-slate-800">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">How bridging finance may fit {city} deals</h2>
              <p className="text-slate-300 leading-relaxed mb-4">{description}</p>
              <p className="text-slate-300 leading-relaxed">{localFocus}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/80 border-slate-800">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">What lenders usually want to see</h2>
              <div className="space-y-4 text-slate-300">
                <p><span className="font-semibold text-white">Security quality:</span> property type, location, value, and existing debt all matter.</p>
                <p><span className="font-semibold text-white">Time frame:</span> bridging works best when the short-term need is clear and realistic.</p>
                <p><span className="font-semibold text-white">Exit strategy:</span> sale, refinance, project milestone, or another defined repayment event.</p>
                <p><span className="font-semibold text-white">Commercial fit:</span> the lender still wants to know why the bridge exists and what happens if timing slips.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{city} Bridging Finance Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((item) => (
              <Card key={item.title} className="bg-slate-900/80 border-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Local {city} scenarios</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {scenarios.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/95 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <Card className="bg-slate-900/80 border-slate-800">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">How the process usually works</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {processSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-slate-950/70 rounded-lg border border-slate-800 p-5">
                    <div className="w-10 h-10 rounded-full bg-sky-500/15 text-sky-300 flex items-center justify-center font-bold shrink-0">{idx + 1}</div>
                    <p className="text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="max-w-5xl mx-auto mb-12">
          <FAQSection faqs={faqs(city)} />
        </section>

        <section className="max-w-4xl mx-auto text-center pb-12">
          <Card className="bg-slate-900/80 border-slate-800">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Need a {city} bridging finance solution?</h2>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                If timing is the issue, the right bridging structure may help protect the transaction while the exit catches up. We can help assess lender fit, timing, and likely structure for {city} scenarios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-sky-500 hover:bg-sky-400 text-slate-950">
                  <Link to="/contact">Discuss your scenario</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-slate-700 text-slate-100 hover:bg-slate-900">
                  <Link to="/services/bridging-finance">Explore bridging finance</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
