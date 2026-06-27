import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Briefcase, Calculator, FileText, Phone, Shield, TrendingUp } from "lucide-react";
import FAQSection, { FAQItem } from "@/components/FAQSection";

const businessFinanceOptions = [
  {
    title: "Working capital",
    description: "Cash-flow support for stock, payroll, tax timing, supplier payments, and temporary operating gaps.",
    link: "/services/working-capital",
  },
  {
    title: "Trade finance",
    description: "Import, supplier, purchase order, inventory, and receivables funding for businesses managing trade cycles.",
    link: "/services/trade-finance",
  },
  {
    title: "Equipment finance",
    description: "Funding for vehicles, machinery, fitout, plant, medical equipment, technology, and productive business assets.",
    link: "/services/equipment-finance",
  },
  {
    title: "Business acquisition finance",
    description: "Finance structures for buying a business, funding succession, acquiring a competitor, or completing a partner buyout.",
    link: "/services/business-acquisition",
  },
  {
    title: "Business debt consolidation",
    description: "Refinance multiple business debts, tax arrangements, equipment facilities, or short-term loans into a clearer structure.",
    link: "/services/debt-consolidation",
  },
  {
    title: "Asset-backed lending",
    description: "Business-purpose lending supported by property, equipment, receivables, inventory, or other commercial assets.",
    link: "/services/asset-backed-lending",
  },
];

const guides = [
  {
    title: "Working Capital Loans for SMEs",
    description: "Main business finance guide for cash-flow facilities, lender assessment, and business funding options.",
    href: "/resources/guides/working-capital-loans-for-smes",
  },
  {
    title: "Purchase Order Finance vs Trade Finance",
    description: "Compare confirmed-order funding with broader supplier, import, and trade-cycle facilities.",
    href: "/resources/guides/purchase-order-finance-vs-trade-finance-in-australia",
  },
  {
    title: "Equipment Finance and Leasing Australia",
    description: "How asset-specific finance can preserve operating cash while funding productive equipment.",
    href: "/resources/guides/equipment-finance-and-leasing-australia",
  },
  {
    title: "Business Acquisition Finance Australia",
    description: "Funding structures for buying, expanding, or transitioning an established business.",
    href: "/resources/guides/business-acquisition-finance-australia",
  },
  {
    title: "Business Debt Consolidation Australia",
    description: "When consolidation may simplify commercial debt, and when it may simply delay a deeper issue.",
    href: "/resources/guides/business-debt-consolidation-australia",
  },
  {
    title: "Working Capital Calculator",
    description: "Estimate operating funding needs before comparing working capital, invoice, trade, or asset-backed options.",
    href: "/resources/tools/working-capital-calculator",
  },
];

const faqs: FAQItem[] = [
  {
    question: "What does business finance include?",
    answer: "Business finance can include working capital, trade finance, equipment finance, acquisition finance, debt consolidation, asset-backed lending, invoice finance, and property-backed commercial funding. The right structure depends on the business purpose, security, documents, repayment pathway, and lender appetite.",
  },
  {
    question: "Is business finance different from a personal loan?",
    answer: "Yes. Emet Capital focuses on commercial and business-purpose finance only. The funding purpose should relate to a business, commercial asset, investment, acquisition, refinance, supplier payment, equipment purchase, or operating cash-flow need. Consumer or personal-purpose lending is not offered.",
  },
  {
    question: "Can business finance be secured by property or business assets?",
    answer: "Yes. Depending on the facility, lenders may consider commercial property, residential property used for business-purpose security, equipment, vehicles, inventory, receivables, purchase orders, or a general security agreement over business assets. Security does not remove the need for serviceability and a clear exit strategy.",
  },
  {
    question: "How does Emet Capital choose which facility to compare first?",
    answer: "The broker process starts with the funding purpose, urgency, security, documents, cash-flow cycle, and repayment path. A stock timing gap may suit trade or working capital finance, equipment purchases may suit asset finance, and multiple expensive debts may need a consolidation or refinance review.",
  },
  {
    question: "Does Emet Capital guarantee approval or rates?",
    answer: "No. Emet Capital is a commercial finance brokerage, not a direct lender, and does not guarantee approval, rates, timeframes, or lender appetite. All lending is subject to assessment, security, documents, borrower circumstances, and lender criteria.",
  },
];

const BusinessFinance = () => {
  return (
    <>
      <Helmet>
        <title>Business Finance Australia | Working Capital, Trade & Equipment Finance | Emet Capital</title>
        <meta
          name="description"
          content="Business finance hub for Australian SMEs comparing working capital, trade finance, equipment finance, acquisition funding, debt consolidation, and asset-backed lending."
        />
        <meta
          name="keywords"
          content="business finance Australia, working capital finance, trade finance, equipment finance, business acquisition finance, business debt consolidation, asset-backed lending"
        />
        <link rel="canonical" href="https://emetcapital.com.au/services/business-finance" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Business Finance" },
          ]} />

          <section className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Business Finance Hub</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Business Finance for Australian SMEs
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              Business finance is funding for commercial purposes such as cash-flow timing, supplier payments, equipment, acquisitions, debt restructure, and asset-backed growth. Emet Capital helps business borrowers compare lender options across working capital, trade finance, equipment finance, acquisition finance, consolidation, private lending, and secured business loans.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              This page is a starting hub for the business finance pillar. It is general information only and not financial advice. Emet Capital is a commercial finance brokerage, not a bank or direct lender, and no approval, rate, or settlement timeframe is guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link to="/contact">
                  <FileText className="mr-2 h-5 w-5" />
                  Discuss Business Finance
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Emet Capital
                </a>
              </Button>
            </div>
          </section>

          <main className="max-w-5xl mx-auto space-y-14 mb-16">
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">What is business finance?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Business finance refers to commercial-purpose funding used to support a business activity, asset, transaction, or cash-flow requirement. It may be unsecured, secured by business assets, secured by property, linked to receivables, tied to equipment, or structured around a defined trade or acquisition event.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The practical question is not simply whether a business can borrow. The stronger question is which structure fits the actual funding need. A temporary debtor timing gap may need a different facility from an equipment purchase, tax payment, supplier deposit, business acquisition, or refinance after bank delay.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Business finance options Emet Capital can help compare</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessFinanceOptions.map((option) => (
                  <Card key={option.link} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start gap-2">
                        <Briefcase className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        {option.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                      <Link to={option.link} className="text-accent hover:underline inline-flex items-center text-sm font-medium">
                        View service <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How to choose the right business finance structure</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-accent" /> Funding purpose</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Separate operating cash flow, equipment, supplier payments, acquisition funding, tax timing, settlement gaps, and consolidation. The stated use of funds drives lender fit.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Shield className="h-5 w-5 text-accent" /> Security and evidence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Lenders may assess property equity, equipment, receivables, inventory, purchase orders, tax debt, bank statements, contracts, and financial accounts. Clear evidence usually improves the conversation.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Calculator className="h-5 w-5 text-accent" /> Repayment pathway</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">A strong file explains how the facility will be repaid, whether through trading cash flow, debtor receipts, asset sale, refinance, settlement proceeds, or another verified commercial event.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Where business finance overlaps with private lending</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Some business finance files are suited to mainstream bank or non-bank lenders. Others need a private lending or asset-backed pathway because the file is urgent, documentation is incomplete, the borrower has been delayed by a bank, or the security position is unusual.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Emet Capital can compare business finance with <Link to="/services/private-lending" className="text-accent hover:underline">private lending</Link>, <Link to="/services/first-second-mortgages" className="text-accent hover:underline">first and second mortgages</Link>, and <Link to="/services/commercial-property-finance" className="text-accent hover:underline">commercial property finance</Link> where property-backed funding may be relevant. The aim is to match the structure to the risk, purpose, documents, security, and exit, not to force every business need into one product.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Business finance guides and tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.map((guide) => (
                  <a key={guide.href} href={guide.href} className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all">
                    <h3 className="font-semibold text-foreground mb-2">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                    <span className="text-accent text-sm inline-flex items-center font-medium">
                      Open resource <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </a>
                ))}
              </div>
            </section>

            <FAQSection faqs={faqs} />
          </main>
        </div>
      </div>
    </>
  );
};

export default BusinessFinance;
