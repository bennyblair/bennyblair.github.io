import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, TrendingUp, CheckCircle, Building2, FileText, ArrowRight, Globe } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { generateServiceSchema } from '@/lib/schema-utils';

type DetailedScenario = { title: string; scenario: string; solution: string; outcomes: { label: string; value: string }[] };
type LocalPoint = { title: string; text: string };
type LinkItem = { title: string; href: string; description: string };
type FAQItem = { question: string; answer: string };

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
  { label: 'Indicative review', value: '2-10 days', icon: Clock },
  { label: 'Common term', value: '30-180 days', icon: TrendingUp },
  { label: 'Typical use', value: 'Import / export cycle', icon: CheckCircle },
  { label: 'Facility size', value: '$100K-$25M+', icon: DollarSign }
];

const lenderPoints = [
  'Trade-finance structures can include import funding, export funding, letters of credit, invoice factoring, debtor-backed facilities, and stock or supply-chain support.',
  'The right lender usually depends on the transaction type, goods profile, supplier/customer quality, and whether the business needs transactional support or an ongoing revolving facility.',
  'Lenders generally care about the trade cycle, counterparties, margin strength, and whether the facility is supporting real commercial trade rather than plugging an unrelated balance-sheet problem.',
  'Execution timing matters because supplier payments, shipment deadlines, customs timing, and receivable collection windows often leave little room for admin delay.'
];

const processSteps = [
  'Clarify whether the need is import finance, export finance, receivables funding, letters of credit, or a broader trade-cycle facility.',
  'Assess the goods, counterparties, payment terms, margins, and business profile so the lender fit matches the commercial reality.',
  'Prepare the key information such as trade history, supplier or customer details, invoices, debtor data, and facility purpose early to avoid delays.',
  'Settle the facility and manage it in line with shipment timing, collections, and the expected trade cycle.'
];

const disclaimer = 'This page is for informational purposes only and does not constitute financial advice. Emet Capital provides commercial lending solutions to eligible business borrowers. Please consult a licensed financial adviser before making any financial decisions.';

export default function TradeFinanceCityPage({ city, canonical, title, description, localIntro, localFocus, marketOverview, timingPressures, suburbCoverage, localUseCases, scenarios, relatedLinks, faqs }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SEO title={title} description={description} canonical={canonical} keywords={`trade finance ${city}, import finance ${city}, export finance ${city}, business trade funding ${city}`} schemas={[generateServiceSchema(`Trade Finance ${city}`, description, `https://emetcapital.com.au${canonical}`)]} />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Trade Finance', href: '/services/trade-finance' }, { label: city }]} />
        <section className="max-w-5xl mx-auto text-center pt-4 pb-12">
          <Badge className="mb-4 bg-sky-500/15 text-sky-300 border border-sky-500/30">{city} Trade Finance</Badge>
          <div className="flex items-center justify-center gap-3 mb-4"><MapPin className="h-8 w-8 text-sky-300" /><h1 className="text-4xl lg:text-5xl font-bold text-white">Trade Finance {city}</h1></div>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-6">{localIntro}</p><p className="text-slate-400 max-w-4xl mx-auto mb-8 leading-relaxed">{marketOverview}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">{stats.map(({ label, value, icon: Icon }) => <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-4"><Icon className="h-5 w-5 text-sky-300 mb-3" /><div className="text-2xl font-bold text-white mb-1">{value}</div><div className="text-sm text-slate-400">{label}</div></div>)}</div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center"><Button size="lg" asChild className="bg-sky-500 hover:bg-sky-400 text-slate-950"><Link to="/contact">Discuss your trade cycle</Link></Button><Button size="lg" variant="outline" asChild className="border-slate-700 text-slate-100 hover:bg-slate-900"><Link to="/services/trade-finance"><ArrowLeft className="mr-2 h-5 w-5" />Back to Trade Finance</Link></Button></div>
        </section>
        <section className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6 mb-12"><div className="bg-slate-900 border border-slate-800 rounded-xl p-8"><h2 className="text-2xl font-bold text-white mb-4">How trade finance may fit {city} businesses</h2><p className="text-slate-300 leading-relaxed mb-4">{description}</p><p className="text-slate-300 leading-relaxed">{localFocus}</p></div><div className="bg-slate-900 border border-slate-800 rounded-xl p-8"><h2 className="text-2xl font-bold text-white mb-4">Why timing pressure shows up in {city}</h2><p className="text-slate-300 leading-relaxed mb-4">{timingPressures}</p><div className="space-y-4 text-slate-300"><p><span className="font-semibold text-white">Trade timing:</span> supplier payments, shipment deadlines, customs timing, and customer payment cycles can all create funding gaps.</p><p><span className="font-semibold text-white">Facility fit:</span> the right structure depends on whether the pressure sits in imports, exports, receivables, inventory, or counterpart risk.</p><p><span className="font-semibold text-white">Commercial purpose:</span> trade lenders still want to understand the trade cycle and the economic purpose of the transaction.</p><p><span className="font-semibold text-white">Execution:</span> missing shipment windows or supplier deadlines can cost more than the finance itself if timing is handled poorly.</p></div></div></section>
        <section className="max-w-5xl mx-auto mb-12"><h2 className="text-3xl font-bold text-white mb-8 text-center">Suburbs, precincts, and trade corridors we watch in {city}</h2><div className="grid md:grid-cols-3 gap-6">{suburbCoverage.map((item) => <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6"><div className="flex items-center gap-3 mb-3"><Building2 className="h-5 w-5 text-sky-300" /><h3 className="text-xl font-semibold text-white">{item.title}</h3></div><p className="text-slate-300 leading-relaxed">{item.text}</p></div>)}</div></section>
        <section className="max-w-5xl mx-auto mb-12"><div className="bg-slate-900 border border-slate-800 rounded-xl p-8"><h2 className="text-3xl font-bold text-white mb-8 text-center">What trade-finance lenders usually care about in {city}</h2><div className="grid md:grid-cols-2 gap-6">{lenderPoints.map((item) => <div key={item} className="flex gap-4 items-start bg-slate-950 rounded-lg border border-slate-800 p-5"><Globe className="h-5 w-5 text-sky-300 mt-0.5 shrink-0" /><p className="text-slate-300 leading-relaxed">{item}</p></div>)}</div></div></section>
        <section className="max-w-5xl mx-auto mb-12"><h2 className="text-3xl font-bold text-white mb-8 text-center">Common {city} trade-finance use cases</h2><div className="grid md:grid-cols-2 gap-6">{localUseCases.map((item) => <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6"><h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3><p className="text-slate-300 leading-relaxed">{item.text}</p></div>)}</div></section>
        <section className="max-w-5xl mx-auto mb-12"><h2 className="text-3xl font-bold text-white mb-8 text-center">Local {city} case studies</h2><div className="grid md:grid-cols-2 gap-6">{scenarios.map((item) => <div key={item.title} className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm"><h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3><div className="space-y-4 text-slate-100"><div><div className="text-slate-400 text-sm mb-1">Scenario</div><p className="text-slate-100 leading-relaxed">{item.scenario}</p></div><div><div className="text-slate-400 text-sm mb-1">Solution</div><p className="text-slate-100 leading-relaxed">{item.solution}</p></div><div><div className="text-slate-400 text-sm mb-2">Transaction snapshot</div><div className="bg-slate-900 border border-slate-700 rounded-lg p-4 space-y-2">{item.outcomes.map((o) => <div key={o.label} className="flex items-center justify-between gap-4"><span className="text-slate-400 text-sm">{o.label}</span><span className="text-white font-semibold text-right">{o.value}</span></div>)}</div></div></div></div>)}</div></section>
        <section className="max-w-5xl mx-auto mb-12"><div className="bg-slate-900 border border-slate-800 rounded-xl p-8"><h2 className="text-3xl font-bold text-white mb-8 text-center">How the process usually works</h2><div className="grid md:grid-cols-2 gap-6">{processSteps.map((step, idx) => <div key={idx} className="flex gap-4 items-start bg-slate-950 rounded-lg border border-slate-800 p-5"><div className="w-10 h-10 rounded-full bg-sky-500/15 text-sky-300 flex items-center justify-center font-bold shrink-0">{idx + 1}</div><p className="text-slate-300 leading-relaxed">{step}</p></div>)}</div></div></section>
        <section className="max-w-5xl mx-auto mb-12"><div className="bg-slate-900 border border-slate-800 rounded-xl p-8"><h2 className="text-3xl font-bold text-white mb-8 text-center">Related guides and service pages</h2><div className="grid md:grid-cols-3 gap-4">{relatedLinks.map((item) => <Link key={item.href} to={item.href} className="block rounded-xl border border-slate-800 bg-slate-950 p-5 hover:border-sky-500/40 hover:bg-slate-900 transition-colors"><div className="flex items-start gap-3 mb-3"><FileText className="h-5 w-5 text-sky-300 mt-0.5" /><h3 className="font-semibold text-white">{item.title}</h3></div><p className="text-sm text-slate-400 leading-relaxed mb-3">{item.description}</p><span className="inline-flex items-center text-sky-300 text-sm font-medium">Explore page <ArrowRight className="ml-2 h-4 w-4" /></span></Link>)}</div></div></section>
        <section className="max-w-5xl mx-auto mb-12"><div className="bg-slate-900 border border-slate-800 rounded-xl p-8"><h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently asked questions</h2><div className="space-y-4">{faqs.map((faq) => <div key={faq.question} className="rounded-xl border border-slate-800 bg-slate-950 p-6"><h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3><p className="text-slate-300 leading-relaxed">{faq.answer}</p></div>)}</div></div></section>
        <section className="max-w-4xl mx-auto text-center pb-12"><div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-6"><h2 className="text-3xl font-bold text-white mb-4">Need trade-finance support in {city}?</h2><p className="text-slate-300 mb-6 max-w-2xl mx-auto leading-relaxed">If the business needs a cleaner way to manage import, export, supplier, receivable, or inventory timing, we can help assess which trade-finance structure and lender type may fit best.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Button size="lg" asChild className="bg-sky-500 hover:bg-sky-400 text-slate-950"><Link to="/contact">Discuss your scenario</Link></Button><Button size="lg" variant="outline" asChild className="border-slate-700 text-slate-100 hover:bg-slate-900"><Link to="/services/trade-finance">Explore trade finance</Link></Button></div></div><div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-left"><p className="text-sm text-slate-400 leading-relaxed">{disclaimer}</p></div></section>
      </div>
    </div>
  );
}
