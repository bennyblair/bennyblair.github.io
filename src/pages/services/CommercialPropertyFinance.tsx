import SEO from "@/components/SEO";
import { generateServiceSchema } from "@/lib/schema-utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  FileText,
  Landmark,
  Phone,
  Shield,
} from "lucide-react";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";

const CommercialPropertyFinance = () => {
  const faqs: FAQItem[] = [
    {
      question: "Can commercial property settlement finance be arranged quickly?",
      answer:
        "It may be possible where the security, ownership structure, documents, and exit strategy are clear. Timing depends on lender appetite, valuation, legal requirements, and how complete the file is. Fast settlement is never guaranteed.",
    },
    {
      question: "What documents are usually needed for urgent commercial property finance?",
      answer:
        "Useful documents include the contract of sale, title or rates notice, current loan payout figures, company or trust documents, ID, details of the security property, solicitor contacts, and evidence of the planned exit such as a sale, refinance, or business event.",
    },
    {
      question: "What if my bank approval will not be ready before settlement?",
      answer:
        "Some borrowers use a short-term bridge, private mortgage, second mortgage, caveat loan, or other property-backed facility while the longer-term refinance or bank loan continues. The right structure depends on the asset, timing, leverage, and exit plan.",
    },
    {
      question: "Can a business owner use property-backed finance to settle a commercial purchase?",
      answer:
        "Yes, eligible business-purpose borrowers may be able to use commercial or residential property security to support a commercial premises purchase or settlement shortfall, subject to assessment and legal suitability.",
    },
    {
      question: "What can stop urgent commercial property finance from working?",
      answer:
        "Common blockers include unclear title, incomplete documents, insufficient equity, unresolved existing debt, a weak exit strategy, complex ownership issues, consumer-purpose use, or a timeframe that is too compressed for legal and lender checks.",
    },
    {
      question: "Is urgent settlement finance more expensive than standard commercial finance?",
      answer:
        "Short-term and private facilities can cost more than standard bank finance because they are designed for speed, flexibility, or non-standard scenarios. Borrowers should weigh the cost against the transaction risk and obtain professional advice where needed.",
    },
  ];

  return (
    <>
      <SEO
        title="Urgent Commercial Property Settlement Finance Australia | Emet Capital"
        description="Commercial property finance for urgent settlements, bank delays, business premises purchases, and short-term property-backed funding. General information only."
        canonical="/services/commercial-property-finance"
        keywords="commercial property finance, urgent commercial property settlement, business premises finance, private lending, bridging finance, caveat loans"
        schemas={[
          generateServiceSchema(
            "Commercial Property Finance",
            "Commercial property finance for urgent settlements, business premises purchases, refinancing transitions, and property-backed business funding.",
            "https://emetcapital.com.au/services/commercial-property-finance"
          ),
        ]}
      />

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Commercial Property Finance" },
            ]}
          />

          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Commercial Property Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Urgent Commercial Property Settlement Finance
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Property-backed commercial finance for business owners, investors, and developers facing
              settlement pressure, bank delays, refinance timing gaps, or short-term funding needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link to="/contact">
                  <FileText className="mr-2 h-5 w-5" />
                  Discuss Scenario
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Specialist
                </a>
              </Button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12 mb-16">
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Urgent Commercial Property Settlement
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Commercial property settlement finance is used when a business-purpose property transaction
                needs funding before a standard bank or refinance process can finish. It may support a
                purchase, settlement shortfall, outgoing lender deadline, refinance transition, or other
                property-backed commercial funding requirement.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The aim is to create a practical funding bridge around a defined commercial event. It is not
                a shortcut around credit assessment, legal checks, or exit planning. Lenders still need to
                understand the security, borrower, purpose, and repayment pathway before funds can be made
                available.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">When Settlement Becomes Urgent</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "A bank approval is close but will not complete before the settlement date.",
                  "A valuation, lease review, or legal condition has delayed the permanent lender.",
                  "A vendor, liquidator, or auction contract will not allow more time.",
                  "An outgoing lender needs repayment before a replacement facility settles.",
                  "A business owner is buying premises and needs a short-term structure first.",
                  "A developer or investor needs to hold control of the asset while an exit catches up.",
                ].map((item) => (
                  <Card key={item}>
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                        <p className="text-sm text-muted-foreground">{item}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">What Lenders Need Quickly</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A fast file is usually a complete file. The fewer unknowns a lender has to resolve, the
                more realistic an urgent assessment becomes.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Contract of sale, settlement date, and solicitor details",
                  "Security property details, title search, rates notice, or valuation support",
                  "Existing debt and payout figures for any secured loans",
                  "Company, trust, ABN/ACN, director, and ID documents",
                  "Clear use of funds and amount required to settle",
                  "Exit evidence such as sale proceeds, refinance pathway, or other repayment event",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Common Structures</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Building2 className="mr-2 h-5 w-5 text-accent" />
                      Bridging Finance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Short-term funding used to bridge a settlement, sale, refinance, or another defined
                      timing gap.
                    </p>
                    <Link to="/services/bridging-finance" className="text-accent hover:underline text-sm inline-flex items-center">
                      Bridging finance <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Landmark className="mr-2 h-5 w-5 text-accent" />
                      Private Lending
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Non-bank or private credit where property security and commercial rationale may carry
                      more weight than standard bank policy.
                    </p>
                    <Link to="/services/private-lending" className="text-accent hover:underline text-sm inline-flex items-center">
                      Private lending <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Shield className="mr-2 h-5 w-5 text-accent" />
                      Second Mortgage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Additional property-backed funding behind an existing first mortgage where the first
                      facility should not be disturbed.
                    </p>
                    <Link to="/services/first-second-mortgages" className="text-accent hover:underline text-sm inline-flex items-center">
                      First and second mortgages <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-accent" />
                      Caveat Loan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      A short-term property-backed option sometimes considered when timing is compressed and
                      the security position is straightforward.
                    </p>
                    <Link to="/services/caveat-loans" className="text-accent hover:underline text-sm inline-flex items-center">
                      Caveat loans <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Building2 className="mr-2 h-5 w-5 text-accent" />
                      Development Finance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Project funding for land, construction, stalled works, or development timing gaps
                      where feasibility and exit need to be assessed together.
                    </p>
                    <Link to="/services/commercial-property-development" className="text-accent hover:underline text-sm inline-flex items-center">
                      Commercial property development <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                What Makes Fast Settlement Realistic
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Clear Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      The property type, value, ownership, title, and current debt position can be understood
                      quickly.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Defined Exit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Repayment is tied to a credible event such as refinance, sale, settlement proceeds, or
                      another documented commercial outcome.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Complete File</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Borrower, entity, loan purpose, payout, legal, and settlement documents are available
                      early.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Commercial Purpose</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      The funding is for a business or investment purpose and fits commercial lending
                      requirements.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">What Can Stop Urgent Finance</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Urgency does not remove the need for a sound transaction. A lender may pause or decline a
                file if key risks cannot be clarified quickly enough.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li>Unclear title, ownership, trust, or corporate authority.</li>
                <li>Existing debts or caveats that reduce usable equity.</li>
                <li>A requested loan amount that is too high for the available security.</li>
                <li>No practical exit strategy or repayment pathway.</li>
                <li>Incomplete documents close to settlement.</li>
                <li>Consumer-purpose use, personal advice needs, or legal issues outside lender appetite.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Emet Capital helps borrowers and advisers frame the transaction in lender-ready terms:
                security, amount, timing, purpose, exit, and the critical path to settlement. The goal is to
                match the file with an appropriate lender category rather than sending an urgent scenario to
                a lender that cannot move in time.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                That may involve comparing a bridge with a direct refinance, considering whether private
                lending is more suitable than bank debt, or identifying whether a second mortgage or caveat
                structure is even appropriate. Emet does not provide personal financial advice and does not
                guarantee funding outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Risks and Disclaimers</h2>
              <div className="bg-muted/30 rounded-lg p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Urgent commercial property finance can be useful where timing is the real problem, but it
                  may involve higher costs, shorter terms, more concentrated exit risk, and stricter legal or
                  security requirements than standard commercial lending.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This page is general information only and does not take into account your objectives,
                  financial situation, or needs. Borrowers should obtain legal, tax, accounting, and financial
                  advice before entering any commercial finance arrangement.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-accent" />
                Useful Guides
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  to="/resources/guides/commercial-property-settlement-process-finance-timeline"
                  className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
                >
                  <h3 className="font-semibold text-foreground mb-2">Commercial Property Settlement Timeline</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Finance timing, documentation, and common settlement pressure points.
                  </p>
                  <span className="text-accent text-sm inline-flex items-center">
                    Read guide <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </Link>
                <Link
                  to="/services/refinancing-solutions"
                  className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
                >
                  <h3 className="font-semibold text-foreground mb-2">Refinancing Solutions</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Compare a direct refinance with a short-term bridge-to-refinance structure.
                  </p>
                  <span className="text-accent text-sm inline-flex items-center">
                    View service <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </Link>
              </div>
            </section>

            <section>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                  <Link to="/contact">
                    <FileText className="mr-2 h-5 w-5" />
                    Start Assessment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:0485952651">
                    <Phone className="mr-2 h-5 w-5" />
                    Speak with Emet
                  </a>
                </Button>
              </div>
            </section>

            <FAQSection faqs={faqs} />
          </div>

          <RelatedReading
            articles={[
              {
                title: "Commercial Property Settlement Process: Finance Timeline",
                slug: "commercial-property-settlement-process-finance-timeline",
                description: "Understand the commercial settlement timeline and finance coordination milestones.",
              },
              {
                title: "Bridging Finance Australia: Complete Property Guide",
                slug: "bridging-finance-australia-complete-property-guide",
                description: "How bridging finance works for commercial and investment property timing gaps.",
              },
              {
                title: "Commercial Property Refinancing Solutions",
                slug: "commercial-property-refinancing-solutions",
                description: "When refinancing may be a direct alternative to short-term settlement finance.",
              },
            ] as RelatedArticle[]}
          />
        </div>
      </div>
    </>
  );
};

export default CommercialPropertyFinance;
