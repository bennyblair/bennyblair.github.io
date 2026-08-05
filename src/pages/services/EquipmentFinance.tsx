import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BookOpen, Phone, FileText, Briefcase, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { generateServiceSchema } from "@/lib/schema-utils";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";
import DiscoveryGuides from "@/components/DiscoveryGuides";
import FinanceDecisionSupport from "@/components/FinanceDecisionSupport";

const EquipmentFinance = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of equipment can be financed?",
      answer: "Most commercial equipment including machinery, vehicles, technology, manufacturing equipment, medical equipment, hospitality assets, and construction equipment can be financed."
    },
    {
      question: "How fast can equipment finance be approved?",
      answer: "Timing depends on the lender, borrower, asset, vendor, documents and any valuation or inspection. A complete application for a readily identifiable asset may be simpler to assess, but approval and settlement dates are never guaranteed."
    },
    {
      question: "Are these solutions available Australia-wide?",
      answer: "Emet Capital can assess business equipment-finance enquiries from across Australia. Actual lender coverage depends on the asset, vendor, borrower, location, structure and complete application."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, this is commercial lending for business equipment and asset acquisition only. Consumer finance is not offered."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Equipment Finance Australia for Business | Emet Capital</title>
        <meta 
          name="description" 
          content="Compare equipment finance for Australian businesses. Understand loans and leases, ownership, cash flow, residuals, fees, asset fit and lender evidence."
        />
        <meta name="keywords" content="equipment finance, asset finance, equipment leasing, business equipment loans, machinery finance" />
        <link rel="canonical" href="https://emetcapital.com.au/services/equipment-finance" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Equipment Finance" }
          ]} />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Asset Acquisition</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Equipment Finance
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link to="/contact">
                  <FileText className="mr-2 h-5 w-5" />
                  Get Quote
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Expert
                </a>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-12 mb-16">
            {/* What this service is */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Equipment Finance?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Equipment finance can fund an identifiable business asset through a loan, lease or other asset-finance contract rather than paying the full purchase price upfront. Structures can include equipment loans, chattel mortgages, hire purchase and leases. Ownership, security, repayment profile, residual obligations and end-of-term options differ, so product labels should not be treated as interchangeable.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Financing structures range from ownership-oriented loans to arrangements where the financier retains ownership and the business pays for use. Security, guarantees, deposits and residual payments vary. Tax and accounting outcomes depend on the contract and the business's circumstances, so they should be confirmed with a registered tax professional rather than inferred from the product label.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Equipment finance may suit businesses acquiring productive machinery, vehicles, technology, medical, hospitality or construction assets with a defined operational use. The proposed term and repayment structure should reflect expected useful life, utilisation, maintenance, replacement plans and the business's capacity under a conservative scenario.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer finance is provided. Requirements vary: established businesses may evidence performance through financial statements and bank activity, while newer businesses may need stronger forecasts, deposits, guarantees or supporting experience. The asset itself does not replace the need to demonstrate a viable business purpose and repayment capacity.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                If the asset purchase also creates a cash-flow, supplier, tax, or acquisition requirement, review the <Link to="/services/business-finance" className="text-accent hover:underline">business finance hub</Link> to compare equipment finance with working capital, trade finance, consolidation, and asset-backed lending.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we compare lenders and structures that fit the asset, vendor, borrower profile, cash-flow pattern and intended ownership outcome. The comparison should use the same purchase price, deposit, term and residual assumptions so a lower repayment is not mistaken for a lower total cost.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We help assemble asset and business evidence, identify contract differences and coordinate with the vendor and lender. We do not provide tax advice or promise faster approval; an accountant or tax adviser should confirm tax treatment, and the lender controls its assessment and conditions.
              </p>
            </section>

            {/* Key decision factors */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Key Decision Factors</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Briefcase className="mr-2 h-5 w-5 text-accent" />
                      Loan Ranges & Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Facility size, term, deposit and any balloon or residual depend on the asset, useful life, resale market, borrower strength and lender policy.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                      Suitable Use Cases
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Machinery acquisition, vehicle fleets, technology equipment, manufacturing assets, medical equipment, hospitality assets, and construction machinery.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Shield className="mr-2 h-5 w-5 text-accent" />
                      Flexible Security Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Security is typically the financed equipment itself. Additional security may include property or business assets for larger facilities.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-accent" />
                      Decision-ready process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                       A complete asset quote, vendor details and financial pack can reduce avoidable questions. The lender still controls assessment, conditions and settlement timing.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <FinanceDecisionSupport
              heading="Choose Equipment Finance by Asset Use, Not Repayment Alone"
              summary="The right comparison starts with how long the business will use the asset, whether ownership matters and what the contract leaves payable at the end."
              suitable={[
                "The equipment has a defined business use and a supportable productivity or revenue case.",
                "The proposed term is no longer than a realistic useful-life and replacement horizon.",
                "Cash flow can absorb repayments under a conservative utilisation scenario.",
                "The business has compared ownership, maintenance, end-of-term and early-exit obligations.",
              ]}
              unsuitable={[
                "The asset is speculative, unproven or likely to become obsolete well before the finance term ends.",
                "The business needs unrestricted working capital rather than funding for an identifiable asset.",
                "A low periodic repayment depends on a residual the business has not planned to pay or refinance.",
                "Tax deductions are the sole reason for the purchase without independent tax advice and a commercial need.",
              ]}
              evidence={[
                { label: "Asset and vendor", detail: "Formal quote or invoice, serial or identifying details, age and condition, vendor details and delivery timetable." },
                { label: "Business performance", detail: "Recent financial statements, bank statements or management accounts showing repayment capacity and seasonality." },
                { label: "Use and useful life", detail: "Operational purpose, expected utilisation, maintenance plan, replacement cycle and likely resale market." },
                { label: "Entity and tax review", detail: "ABN/ACN and entity documents, with the proposed structure reviewed by the business's accountant where tax treatment matters." },
              ]}
              process={[
                "Define the required asset, operational benefit, delivery date and ownership preference.",
                "Set one comparison scenario: price, deposit, term, repayment timing and residual.",
                "Compare total contractual payments, fees, security, guarantees and early-exit terms.",
                "Stress-test repayments against downtime, lower utilisation and maintenance costs.",
                "Confirm legal, accounting and tax treatment before signing the final contract.",
              ]}
              decisionRows={[
                { question: "Who owns the asset during and after the term?", whyItMatters: "Ownership affects control, end-of-term choices, accounting and potential tax treatment." },
                { question: "Is there a balloon, residual or purchase option?", whyItMatters: "A lower periodic repayment can leave a material amount payable or exposed to asset-value risk." },
                { question: "Which costs sit outside the repayment?", whyItMatters: "Maintenance, insurance, registration, documentation and early-exit costs can change the economic comparison." },
                { question: "Can the contract adapt if the asset is sold or replaced early?", whyItMatters: "Payout calculations and transfer restrictions matter when equipment needs change before maturity." },
              ]}
            />

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A lender may require an ABN or ACN and entity documents, an asset quote, vendor details, financial statements, bank activity, tax information or forecasts, depending on the applicant and facility. Security may include the financed asset and, in some cases, deposits, guarantees or additional support. Requirements and approval remain lender-specific.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our team for an equipment finance assessment. We'll review the equipment requirement, business cash flow and stated objectives, then explain structures that may fit and the trade-offs involved. Tax outcomes should be confirmed with a registered tax professional. Any recommendation, lender decision, equipment delivery and settlement remain subject to the complete application and relevant third parties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                  <Link to="/contact"><FileText className="mr-2 h-5 w-5" />Start Application</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:0485952651"><Phone className="mr-2 h-5 w-5" />Speak with Specialist</a>
                </Button>
              </div>
            </section>

            {/* Guides & Resources Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-accent" />
                Guides & Resources
              </h2>
              <p className="text-muted-foreground mb-6">
                Explore our in-depth guides to learn more about this financing option before you apply.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Pillar Guide - Featured */}
              <div className="md:col-span-2 lg:col-span-3">
                <a 
                  href="/resources/guides/asset-backed-lending-and-asset-finance"
                  className="block p-6 bg-accent/5 border-2 border-accent/20 rounded-lg hover:border-accent/40 hover:bg-accent/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <BookOpen className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Complete Asset Finance Guide</h3>
                      <p className="text-muted-foreground mb-3">Compare asset-backed structures, evidence, security, total cost and end-of-term obligations.</p>
                      <span className="text-accent font-medium inline-flex items-center">
                        Read Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <a 
                href="/resources/guides/equipment-finance-and-leasing-australia"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Equipment Finance & Leasing</h3>
                <p className="text-sm text-muted-foreground mb-2">In-depth guide to financing equipment, vehicles, and machinery.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/working-capital-loans-for-smes"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Working Capital Loans</h3>
                <p className="text-sm text-muted-foreground mb-2">Maintain operational cash flow while funding equipment purchases.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/business-acquisition-finance-australia"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Business Acquisition Finance</h3>
                <p className="text-sm text-muted-foreground mb-2">Financing equipment as part of buying an existing business.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              </div>
            </section>


            {/* FAQs */}
            <FAQSection faqs={faqs} />
          </div>

          <DiscoveryGuides service="equipment-finance" />

          {/* Related Reading */}
          <RelatedReading articles={[
            { title: "Equipment Finance and Leasing Australia", slug: "equipment-finance-and-leasing-australia", description: "Complete guide to equipment finance options" },
            { title: "Asset-Backed Lending and Asset Finance", slug: "asset-backed-lending-and-asset-finance", description: "Understanding asset-secured business funding" }
          ] as RelatedArticle[]} />

          {/* Related Services */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Asset Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Business funding supported by identifiable equipment or other eligible assets</p>
                  <Link to="/services/asset-finance" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Working Capital</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Business operations and cash flow funding</p>
                  <Link to="/services/working-capital" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Asset-Backed Lending</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Business finance secured by commercial assets</p>
                  <Link to="/services/asset-backed-lending" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Equipment Finance in Major Cities</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/services/equipment-finance/cities/sydney" className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">Sydney <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link to="/services/equipment-finance/cities/melbourne" className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">Melbourne <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link to="/services/equipment-finance/cities/brisbane" className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">Brisbane <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link to="/services/equipment-finance/cities/perth" className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">Perth <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link to="/services/equipment-finance/cities/adelaide" className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">Adelaide <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link to="/services/equipment-finance/cities/gold-coast" className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">Gold Coast <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default EquipmentFinance;
