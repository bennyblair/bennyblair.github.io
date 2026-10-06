import ServiceChapter from "@/components/ServiceChapter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BookOpen, Phone, FileText, Building2, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { generateServiceSchema } from "@/lib/schema-utils";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";
import DiscoveryGuides from "@/components/DiscoveryGuides";
import PropertyFinanceDisclosure from "@/components/PropertyFinanceDisclosure";

const FirstSecondMortgages = () => {
  const faqs: FAQItem[] = [
    {
      question: "Can a business use a second mortgage while keeping its first mortgage?",
      answer: "It may be possible to retain the existing first mortgage and add a second mortgage for a documented business purpose. The existing facility terms, first-lender requirements, available equity, total debt, proposed security and repayment plan all need assessment."
    },
    {
      question: "Does the first lender need to consent to a second mortgage?",
      answer: "Consent or a priority arrangement may be required, depending on the existing loan documents, title position and proposed lender. Check the existing facility and ask a solicitor to explain the required documents before relying on the structure."
    },
    {
      question: "What property can support business-purpose mortgage finance?",
      answer: "Residential or commercial property may be considered, depending on the lender, borrower, business purpose, existing debt, title and repayment evidence. Offering property as security puts that property at risk if the agreed repayments are not made."
    },
    {
      question: "How should I compare a second mortgage with refinancing the first loan?",
      answer: "Compare the net funds available, interest calculation, establishment and ongoing fees, valuation and legal costs, repayment amount, maturity position, early repayment or extension provisions and the effect on the existing facility."
    },
    {
      question: "How quickly can a first or second mortgage settle?",
      answer: "Timing depends on the lender's assessment, valuation, first-lender or priority requirements, legal documents and complete borrower information. A fast initial response is not an approval or a settlement commitment."
    },
    {
      question: "Is this service limited to business-purpose borrowing?",
      answer: "Yes. Emet Capital discusses commercial and business-purpose finance. It does not offer residential home loans or personal consumer credit."
    }
  ];

  const documents = [
    "A one-page summary of the business purpose, amount required and relevant deadline",
    "Current first-mortgage statements, facility documents and available payout information",
    "Property address, ownership and title information, plus any available valuation or lease material",
    "Borrower, company, trust and guarantor details requested through a secure process",
    "Financial statements, cash-flow information and other repayment evidence requested by the lender",
    "A written repayment plan and a contingency if a sale, refinance or business receipt is delayed"
  ];

  const comparisonQuestions = [
    "What is the total amount borrowed and the net amount available after known costs?",
    "How is interest calculated, and what payments are required before maturity?",
    "Which establishment, valuation, legal, ongoing, extension and discharge costs apply?",
    "What first-lender consent, deed of priority or other legal work may be required?",
    "What events can change pricing, trigger review or require repayment?",
    "What evidence supports the proposed repayment plan, and what is the fallback?"
  ];

  return (
    <>
      <SEO
        title="First & Second Mortgage Business Loans Australia | Emet Capital"
        description="Compare first and second mortgage options for Australian business-purpose borrowing. Prepare security, consent, cost, document and repayment questions."
        canonical="/services/first-second-mortgages"
        keywords="second mortgage business loan, first mortgage commercial loan, commercial second mortgage, property-backed business loans"
        schemas={[generateServiceSchema(
          "First and Second Mortgage Business Loans",
          "General information and broker support for Australian business-purpose first and second mortgage finance secured by residential or commercial property.",
          "https://emetcapital.com.au/services/first-second-mortgages"
        )]}
      />

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "1st & 2nd Mortgages" }
          ]} />

          <div className="page-header text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Business-Purpose Property Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              First & Second Mortgage Business Loans
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              A first mortgage gives the new lender the primary mortgage position. A second mortgage may let a business investigate additional property-secured funding while retaining an existing first mortgage. The decision depends on the business purpose, existing facility, title and priority requirements, total debt, costs and repayment plan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild className="bg-accent hover:bg-accent-light text-accent-foreground">
                <Link to="/contact?purpose=equity_release" data-analytics-event="service_enquiry" data-transaction-purpose="equity_release">
                  <FileText className="mr-2 h-5 w-5" />Discuss Your Transaction
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0485952651"><Phone className="mr-2 h-5 w-5" />Call Emet Capital</a>
              </Button>
            </div>
          </div>

          <PropertyFinanceDisclosure />

          <div className="service-body max-w-4xl mx-auto space-y-12 mb-16">
            <ServiceChapter className="bg-muted/30 rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Can You Keep the First Mortgage?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A business may be able to keep its current first mortgage and investigate a second mortgage for a documented business need. That possibility is not automatic. Start by checking the existing facility terms, current balance, available equity, title position and any consent or priority requirements.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Emet Capital acts as a commercial finance broker. We can help organise the proposal and compare lender responses, but a lender must assess the application and a solicitor should explain the facility, guarantee, mortgage and priority documents. An enquiry is not an approval or a commitment to fund.
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">First Mortgage, Second Mortgage or Caveat-Supported Finance?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Product names do not describe every legal or cost consequence. Ask for the proposed facility and security documents, then compare them on the same amount and expected repayment date.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 pr-4 font-semibold">Structure to investigate</th>
                      <th className="text-left py-3 pr-4 font-semibold">When it may be discussed</th>
                      <th className="text-left py-3 pr-4 font-semibold">Questions to resolve</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-medium text-foreground">Replacement or new first mortgage</td>
                      <td className="py-3 pr-4">A property purchase, refinance or equity release where the lender will hold the primary mortgage position.</td>
                      <td className="py-3 pr-4">Does replacing the existing facility improve the total structure after all costs and conditions?</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-medium text-foreground">Second mortgage</td>
                      <td className="py-3 pr-4">Additional business-purpose funding while an existing first mortgage remains in place.</td>
                      <td className="py-3 pr-4">Are consent or priority arrangements required, and can the combined debt be repaid?</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-foreground">Caveat-supported facility</td>
                      <td className="py-3 pr-4">A short-term business proposal where the security documents and timing need specific investigation.</td>
                      <td className="py-3 pr-4">What legal interest is proposed, what does it cost for the expected period, and what repays it?</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                The effect of a mortgage, caveat, guarantee or priority agreement depends on the documents and jurisdiction. Obtain independent legal advice before signing.
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">When a Second Mortgage May Not Fit</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                More property security does not fix an unclear business purpose or repayment plan. Pause and compare alternatives if the proposal relies on an unsupported future refinance, uncertain sale proceeds, incomplete first-lender information or a repayment amount the business has not tested.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader><CardTitle className="text-lg">Compare a full refinance</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Replacing the first facility may simplify the security position. Compare break, discharge, establishment, valuation and legal costs as well as the ongoing repayments.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">Reduce or stage the requirement</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    A smaller facility, delayed expenditure or staged transaction may reduce pressure on the repayment plan. The right alternative depends on the business need.
                  </CardContent>
                </Card>
              </div>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">Prepare the Application Pack</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The Australian Government's <a href="https://business.gov.au/finance/funding/apply-for-a-business-loan" className="text-accent underline" target="_blank" rel="noopener noreferrer">business-loan preparation guide</a> identifies financial reports, cash-flow statements, forecasts, identification and relevant agreements as possible application inputs. Requirements vary, but a property-backed proposal is easier to assess when these six areas are organised.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {documents.map((item) => (
                  <Card key={item}>
                    <CardContent className="p-4 text-sm text-muted-foreground leading-relaxed">{item}</CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                Flag missing documents and conflicting balances rather than estimating them. Send identification and sensitive financial records only through an appropriate secure process.
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">Compare Total Cost and Net Proceeds</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The facility amount and headline rate do not show how much money the business receives or what it may owe at repayment. Request written terms for the same amount, expected period and repayment scenario.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                {comparisonQuestions.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Shield className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                ASIC's <a href="https://www.asic.gov.au/regulatory-resources/find-a-document/regulatory-guides/rg-234-advertising-financial-products-and-services-including-credit" className="text-accent underline" target="_blank" rel="noopener noreferrer">credit advertising guidance</a> explains that promoters must not make false or misleading statements or engage in misleading or deceptive conduct. Treat advertising about speed, ease or flexibility as a prompt for questions, not a substitute for an assessment or written terms.
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">Test the Repayment Plan</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Identify the expected source of repayment, the evidence supporting it and a contingency. If repayment depends on a property sale, calculate expected net proceeds after existing debt and sale costs. If it depends on refinancing, record the actual assessment stage and outstanding conditions rather than treating future approval as certain.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Hypothetical example:</strong> a company considers a second mortgage to fund equipment while retaining its existing property loan. Its comparison records the current payout, proposed second facility, all known costs, required monthly payments and the amount owing at the planned repayment date. It also tests a delayed business receipt. This example is not an Emet Capital customer, completed transaction or approval indication.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ASIC's <a href="https://www.asic.gov.au/about-asic/contact-us/reporting-misconduct-to-asic/disputes-about-commercial-loans" className="text-accent underline" target="_blank" rel="noopener noreferrer">commercial-loan information</a> explains that borrower protections can depend on the loan purpose and circumstances. Ask a solicitor about the proposed legal documents and an accountant or business adviser to test cash-flow assumptions.
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Emet Capital can help a business borrower organise the transaction, identify missing information, compare suitable lender responses and coordinate the application process. We focus on business-purpose finance secured by residential or commercial property.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Begin with the amount required, business purpose, property security, current debt, deadline and repayment plan. We will explain the next information needed for an initial discussion. Lender assessment, valuation, legal work and complete documentation determine whether and when a proposal can proceed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                  <Link to="/contact?purpose=equity_release" data-analytics-event="service_enquiry" data-transaction-purpose="equity_release">
                    <FileText className="mr-2 h-5 w-5" />Discuss Equity Release
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:0485952651"><Phone className="mr-2 h-5 w-5" />Speak with Emet Capital</a>
                </Button>
              </div>
            </ServiceChapter>

            <ServiceChapter className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-accent" />
                Guides & Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/resources/guides/second-mortgages-for-business-guide" className="block p-5 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all">
                  <h3 className="font-semibold text-foreground mb-2">Second Mortgages for Business</h3>
                  <p className="text-sm text-muted-foreground mb-2">Prepare the business purpose, security, consent questions, costs and repayment plan.</p>
                  <span className="text-accent text-sm inline-flex items-center">Read Guide <ArrowRight className="ml-1 h-3 w-3" /></span>
                </Link>
                <Link to="/resources/guides/caveat-loan-vs-second-mortgage-which-is-right-for-you" className="block p-5 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all">
                  <h3 className="font-semibold text-foreground mb-2">Caveat Loan vs Second Mortgage</h3>
                  <p className="text-sm text-muted-foreground mb-2">Compare the questions to ask about each proposed short-term structure.</p>
                  <span className="text-accent text-sm inline-flex items-center">Read Guide <ArrowRight className="ml-1 h-3 w-3" /></span>
                </Link>
                <Link to="/resources/guides/first-mortgage-loans-primary-property-finance" className="block p-5 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all">
                  <h3 className="font-semibold text-foreground mb-2">First Mortgage Finance</h3>
                  <p className="text-sm text-muted-foreground mb-2">Understand the primary security position and application preparation.</p>
                  <span className="text-accent text-sm inline-flex items-center">Read Guide <ArrowRight className="ml-1 h-3 w-3" /></span>
                </Link>
                <Link to="/resources/guides/business-loan-against-outright-owned-property-australia" className="block p-5 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all">
                  <h3 className="font-semibold text-foreground mb-2">Outright-Owned Property as Security</h3>
                  <p className="text-sm text-muted-foreground mb-2">Prepare a business-purpose application where the property has no existing mortgage.</p>
                  <span className="text-accent text-sm inline-flex items-center">Read Guide <ArrowRight className="ml-1 h-3 w-3" /></span>
                </Link>
              </div>
            </ServiceChapter>

            <FAQSection faqs={faqs} />
          </div>

          <DiscoveryGuides service="first-second-mortgages" />

          <RelatedReading articles={[
            { title: "First and Second Mortgages for Business", slug: "second-mortgages-for-business-guide", description: "Questions about mortgage positions, consent, costs and repayment planning" },
            { title: "Business Loan Against Outright-Owned Property", slug: "business-loan-against-outright-owned-property-australia", description: "Application preparation where there is no existing mortgage" },
            { title: "How to Find Second Mortgage Brokers in Australia", slug: "how-to-find-second-mortgage-brokers-australia", description: "Questions for comparing broker process and service" }
          ] as RelatedArticle[]} />

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Commercial Property Finance", description: "Finance preparation for a commercial property purchase or refinance", to: "/services/commercial-property-finance" },
                { title: "Caveat Loans", description: "Short-term business-purpose proposals requiring careful cost and exit review", to: "/services/caveat-loans" },
                { title: "Private Lending", description: "Non-bank property-backed business finance considerations", to: "/services/private-lending" },
                { title: "Refinancing", description: "Compare replacing an existing property-secured business facility", to: "/services/refinancing-solutions" }
              ].map((service) => (
                <Card key={service.to}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-accent" />{service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <Link to={service.to} className="text-accent hover:underline inline-flex items-center text-sm">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <div className="bg-muted/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">First & Second Mortgage Information by Location</h2>
              <p className="text-muted-foreground mb-6">
                These location pages explain the same business-purpose preparation questions with local property context. Lender assessment and legal requirements still depend on the individual transaction.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  ["Sydney", "/services/first-second-mortgages/cities/sydney"],
                  ["Melbourne", "/services/first-second-mortgages/cities/melbourne"],
                  ["Brisbane", "/services/first-second-mortgages/cities/brisbane"],
                  ["Perth", "/services/first-second-mortgages/cities/perth"],
                  ["Adelaide", "/services/first-second-mortgages/cities/adelaide"],
                  ["Gold Coast", "/services/first-second-mortgages/cities/gold-coast"]
                ].map(([label, to]) => (
                  <Link key={to} to={to} className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">
                    {label} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default FirstSecondMortgages;
