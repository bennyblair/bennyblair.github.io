import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, TrendingUp, CheckCircle, Building2, FileText, ArrowRight, Briefcase } from 'lucide-react';
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
  { label: 'Indicative review', value: '5-15 days', icon: Clock },
  { label: 'Common term', value: '3-7 years', icon: TrendingUp },
  { label: 'Typical equity', value: '20-40%', icon: CheckCircle },
  { label: 'Facility size', value: '$250K-$20M+', icon: DollarSign }
];

const lenderPoints = [
  'Acquisition lenders usually look at the target business, buyer experience, industry quality, and whether the proposed debt structure leaves enough room for the business to keep operating well after settlement.',
  'The strongest files explain earnings quality, customer concentration, transition risk, and exactly how the buyer will manage handover rather than relying on headline revenue alone.',
  'Security can involve business assets, property support, personal guarantees, or a blended structure depending on the deal size and lender appetite.',
  'Timing matters because seller expectations, exclusivity periods, due diligence, and legal milestones can all move faster than a conventional bank process.'
];

const processSteps = [
  'Clarify the target business, purchase structure, equity contribution, and whether the transaction needs a bank, specialist, or blended funding path.',
  'Assess the business financials, buyer capability, industry profile, and transaction risks so lender fit reflects the real deal rather than a generic acquisition template.',
  'Coordinate accountants, solicitors, financial information, and due diligence material early so credit, legal, and settlement timing stay aligned.',
  'Settle the acquisition with a structure that supports the handover period, post-settlement cash flow, and the next stage of business growth.'
];

const disclaimer = 'This page is for informational purposes only and does not constitute financial advice. Emet Capital provides commercial lending solutions to eligible business borrowers. Please consult a licensed financial adviser before making any financial decisions.';

export default function BusinessAcquisitionCityPage({ city, canonical, title, description, localIntro, localFocus, marketOverview, timingPressures, suburbCoverage, localUseCases, scenarios, relatedLinks, faqs }: Props) {
  return (
    <div className="location-page min-h-screen bg-background text-foreground">
      <SEO title={title} description={description} canonical={canonical} keywords={`business acquisition finance ${city}, buy a business ${city}, acquisition funding ${city}, business purchase loans ${city}`} schemas={[generateServiceSchema(`Business Acquisition Finance ${city}`, description, `https://emetcapital.com.au${canonical}`)]} />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Business Acquisition', href: '/services/business-acquisition' }, { label: city }]} />
        <section className="page-header location-header max-w-5xl mx-auto text-center pt-4 pb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border border-border">{city} Business Acquisition</Badge>
          <div className="flex items-center justify-center gap-3 mb-4"><MapPin className="h-8 w-8 text-primary" /><h1 className="text-4xl lg:text-5xl font-bold text-foreground">Business Acquisition Finance {city}</h1></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-6">{localIntro}</p>
          <p className="text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">{marketOverview}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">{stats.map(({ label, value, icon: Icon }) => <div key={label} className="bg-card border border-border rounded-xl p-4"><Icon className="h-5 w-5 text-primary mb-3" /><div className="text-2xl font-bold text-foreground mb-1">{value}</div><div className="text-sm text-muted-foreground">{label}</div></div>)}</div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center"><Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground"><Link to="/contact">Discuss your acquisition</Link></Button><Button size="lg" variant="outline" asChild className="border-border text-foreground hover:bg-card"><Link to="/services/business-acquisition"><ArrowLeft className="mr-2 h-5 w-5" />Back to Business Acquisition</Link></Button></div>
        </section>
        <section className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6 mb-12"><div className="bg-card border border-border rounded-xl p-8"><h2 className="text-2xl font-bold text-foreground mb-4">How acquisition finance may fit {city} buyers</h2><p className="text-muted-foreground leading-relaxed mb-4">{description}</p><p className="text-muted-foreground leading-relaxed">{localFocus}</p></div><div className="bg-card border border-border rounded-xl p-8"><h2 className="text-2xl font-bold text-foreground mb-4">Why timing and structure matter in {city}</h2><p className="text-muted-foreground leading-relaxed mb-4">{timingPressures}</p><div className="space-y-4 text-muted-foreground"><p><span className="font-semibold text-foreground">Deal quality:</span> lenders want to understand the business being bought, not just the amount being borrowed.</p><p><span className="font-semibold text-foreground">Buyer fit:</span> relevant industry experience, management depth, and post-settlement plans often influence terms.</p><p><span className="font-semibold text-foreground">Structure choice:</span> cash flow, security, guarantees, and equity contribution all affect lender appetite.</p><p><span className="font-semibold text-foreground">Execution:</span> delays in due diligence or legal work can cost a buyer exclusivity, leverage, or the deal itself.</p></div></div></section>
        <section className="max-w-5xl mx-auto mb-12"><h2 className="text-3xl font-bold text-foreground mb-8 text-center">Suburbs, precincts, and business corridors we watch in {city}</h2><div className="grid md:grid-cols-3 gap-6">{suburbCoverage.map((item) => <div key={item.title} className="bg-card border border-border rounded-xl p-6"><div className="flex items-center gap-3 mb-3"><Building2 className="h-5 w-5 text-primary" /><h3 className="text-xl font-semibold text-foreground">{item.title}</h3></div><p className="text-muted-foreground leading-relaxed">{item.text}</p></div>)}</div></section>
        <section className="max-w-5xl mx-auto mb-12"><div className="bg-card border border-border rounded-xl p-8"><h2 className="text-3xl font-bold text-foreground mb-8 text-center">What acquisition lenders usually care about in {city}</h2><div className="grid md:grid-cols-2 gap-6">{lenderPoints.map((item) => <div key={item} className="flex gap-4 items-start bg-background rounded-lg border border-border p-5"><Briefcase className="h-5 w-5 text-primary mt-0.5 shrink-0" /><p className="text-muted-foreground leading-relaxed">{item}</p></div>)}</div></div></section>
        <section className="max-w-5xl mx-auto mb-12"><h2 className="text-3xl font-bold text-foreground mb-8 text-center">Common {city} acquisition-finance use cases</h2><div className="grid md:grid-cols-2 gap-6">{localUseCases.map((item) => <div key={item.title} className="bg-card border border-border rounded-xl p-6"><h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3><p className="text-muted-foreground leading-relaxed">{item.text}</p></div>)}</div></section>
        <section className="max-w-5xl mx-auto mb-12"><h2 className="text-3xl font-bold text-foreground mb-8 text-center">Local {city} case studies</h2><div className="grid md:grid-cols-2 gap-6">{scenarios.map((item) => <div key={item.title} className="bg-muted border border-border rounded-xl p-6 shadow-sm"><h3 className="text-xl font-semibold text-foreground mb-4">{item.title}</h3><div className="space-y-4 text-foreground"><div><div className="text-muted-foreground text-sm mb-1">Scenario</div><p className="text-foreground leading-relaxed">{item.scenario}</p></div><div><div className="text-muted-foreground text-sm mb-1">Solution</div><p className="text-foreground leading-relaxed">{item.solution}</p></div><div><div className="text-muted-foreground text-sm mb-2">Transaction snapshot</div><div className="bg-card border border-border rounded-lg p-4 space-y-2">{item.outcomes.map((o) => <div key={o.label} className="flex items-center justify-between gap-4"><span className="text-muted-foreground text-sm">{o.label}</span><span className="text-foreground font-semibold text-right">{o.value}</span></div>)}</div></div></div></div>)}</div></section>
        <section className="max-w-5xl mx-auto mb-12"><div className="bg-card border border-border rounded-xl p-8"><h2 className="text-3xl font-bold text-foreground mb-8 text-center">How the process usually works</h2><div className="grid md:grid-cols-2 gap-6">{processSteps.map((step, idx) => <div key={idx} className="flex gap-4 items-start bg-background rounded-lg border border-border p-5"><div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">{idx + 1}</div><p className="text-muted-foreground leading-relaxed">{step}</p></div>)}</div></div></section>
        <section className="max-w-5xl mx-auto mb-12"><div className="bg-card border border-border rounded-xl p-8"><h2 className="text-3xl font-bold text-foreground mb-8 text-center">Related guides and service pages</h2><div className="grid md:grid-cols-3 gap-4">{relatedLinks.map((item) => <Link key={item.href} to={item.href} className="block rounded-xl border border-border bg-background p-5 hover:border-border hover:bg-card transition-colors"><div className="flex items-start gap-3 mb-3"><FileText className="h-5 w-5 text-primary mt-0.5" /><h3 className="font-semibold text-foreground">{item.title}</h3></div><p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.description}</p><span className="inline-flex items-center text-primary text-sm font-medium">Explore page <ArrowRight className="ml-2 h-4 w-4" /></span></Link>)}</div></div></section>
        <section className="max-w-5xl mx-auto mb-12"><div className="bg-card border border-border rounded-xl p-8"><h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently asked questions</h2><div className="space-y-4">{faqs.map((faq) => <div key={faq.question} className="rounded-xl border border-border bg-background p-6"><h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3><p className="text-muted-foreground leading-relaxed">{faq.answer}</p></div>)}</div></div></section>
        <section className="max-w-4xl mx-auto text-center pb-12"><div className="bg-card border border-border rounded-xl p-8 mb-6"><h2 className="text-3xl font-bold text-foreground mb-4">Need acquisition-finance support in {city}?</h2><p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">If you are buying an established business and need a structure that works for timing, risk, and post-settlement cash flow, we can help assess lender fit and likely acquisition-funding pathways.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground"><Link to="/contact">Discuss your scenario</Link></Button><Button size="lg" variant="outline" asChild className="border-border text-foreground hover:bg-card"><Link to="/services/business-acquisition">Explore business acquisition</Link></Button></div></div><div className="rounded-xl border border-border bg-background p-5 text-left"><p className="text-sm text-muted-foreground leading-relaxed">{disclaimer}</p></div></section>
      </div>
    </div>
  );
}
