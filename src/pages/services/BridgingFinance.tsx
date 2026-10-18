import ServiceChapter from "@/components/ServiceChapter";
import SEO from "@/components/SEO";
import { generateFAQPageSchema, generateServiceSchema } from "@/lib/schema-utils";
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
  ClipboardList,
  FileText,
  Phone,
  Scale,
  Shield,
} from "lucide-react";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";
import DiscoveryGuides from "@/components/DiscoveryGuides";
import PropertyFinanceDisclosure from "@/components/PropertyFinanceDisclosure";

const BridgingFinance = () => {
  const faqs: FAQItem[] = [
    {
      question: "Does Emet Capital fund bridging loans?",
      answer:
        "No. Emet Capital is a commercial finance broker, not a lender, and it does not fund loans. It structures the transaction, compares third-party lender responses on the same assumptions, and coordinates the application. Approval, terms and settlement remain with the lender and its advisers.",
    },
    {
      question: "Why use a bridging finance broker instead of approaching a lender directly?",
      answer:
        "A broker can test whether the exit is open or closed, write a delayed-exit plan and compare net proceeds before a file is circulated. That reduces applications to lenders that cannot assess the security, timing or repayment event. A direct approach can still work when the borrower already knows a suitable lender and the file is complete.",
    },
    {
      question: "How should I compare bridging finance brokers?",
      answer:
        "Compare how each broker will test the exit, delayed-exit plan and net proceeds; what they charge and when it becomes payable; which documents they need first; and whether they will explain remaining lender conditions. business.gov.au notes that a business loan broker can help compare options and that you should confirm who you are dealing with. Speed claims are not a substitute for a complete file.",
    },
    {
      question: "What should a broker test before sending a bridging file to lenders?",
      answer:
        "Before approaching lenders, a broker should map the amount, date and business purpose; classify the exit as open or closed on today's evidence; calculate peak debt if that exit is delayed; and list missing documents. If the delayed-exit plan cannot cover interest, known fees and a later repayment, the file should pause rather than be circulated.",
    },
    {
      question: "What happens if the planned bridging exit is delayed?",
      answer:
        "A delayed sale, refinance or registration can increase the amount owing if interest is capitalised, and it can trigger extension or default provisions in the facility documents. The delayed-exit plan should say how peak debt will still be repaid and which fallback is realistic. Timing still depends on valuation, legal work, lender assessment and third parties; no broker can promise a settlement date.",
    },
  ];

  const serviceSchema = generateServiceSchema(
    "Commercial Bridging Finance Broker",
    "Emet Capital is a commercial finance broker that structures and arranges Australian commercial bridging finance. It is not a lender and does not fund loans.",
    "https://emetcapital.com.au/services/bridging-finance",
    "Australia",
  );

  const documents = [
    "Identification and entity documents for the borrower, trustees and guarantors",
    "The contract, maturity notice or other document that shows the amount and the required date",
    "Title, ownership, valuation evidence and statements for existing secured debt",
    "A one-page summary of the business purpose, net funds required and proposed security",
    "Sale-exit evidence such as an agency agreement, campaign status or an exchanged contract",
    "Refinance-exit evidence such as the actual assessment stage and outstanding conditions",
    "A delayed-exit plan that tests peak debt if the primary event slips",
    "Solicitor details and, where relevant, financial reports, cash-flow information and lease material",
  ];

  const processSteps = [
    {
      title: "Map the transaction",
      detail:
        "Record the amount, required date, business purpose, security, existing debt and the exact shortfall to be funded. Flag unknowns instead of estimating them.",
    },
    {
      title: "Run the open versus closed exit test",
      detail:
        "Classify the repayment event on today's evidence, not on the hoped-for date. Note every condition that still sits with a valuer, incoming lender, purchaser or authority.",
    },
    {
      title: "Write the delayed-exit plan",
      detail:
        "State the fallback if the sale, refinance or registration is late, and calculate peak debt including capitalised interest and known fees.",
    },
    {
      title: "Compare net proceeds on the same assumptions",
      detail:
        "Put eligible lender responses on one sheet covering net cash at settlement, amount owing at the planned exit, and amount owing at the delayed-exit date.",
    },
    {
      title: "Assemble the document pack",
      detail:
        "Collect identity, entity, title, debt, transaction and exit evidence. Identify gaps before a lender, valuer or lawyer has to ask for them.",
    },
    {
      title: "Approach lenders that can assess this file",
      detail:
        "Circulate a decision-ready summary to lenders whose appetite matches the security, purpose and exit type. Indicative terms are not an approval.",
    },
    {
      title: "Coordinate conditions, legal work and settlement",
      detail:
        "Track valuation, legal documents, consents and discharge mechanics. The lender and its advisers still control assessment and settlement.",
    },
  ];

  return (
    <>
      <SEO
        title="Commercial Bridging Finance Broker Australia | Emet Capital"
        description="Emet Capital is a commercial finance broker, not a lender. We structure commercial bridging finance around the exit test, delayed-exit plan and documents."
        canonical="/services/bridging-finance"
        keywords="commercial bridging finance broker Australia, arrange bridging finance, open vs closed bridging loan, bridging loan exit plan, commercial bridging finance"
        geo={false}
        schemas={[
          {
            ...serviceSchema,
            provider: {
              ...serviceSchema.provider,
              "@type": "Organization",
              description: "Commercial finance broker. Emet Capital does not fund loans.",
            },
            serviceType: "Commercial bridging finance brokerage",
          },
          generateFAQPageSchema(faqs),
        ]}
      />

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Bridging Finance" },
          ]} />

          <div className="page-header text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Commercial finance broker</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Commercial bridging finance, arranged by a broker
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Emet Capital is a commercial finance broker, not a lender, and it does not fund loans.
              We structure and arrange business-purpose bridging finance when a commercial purchase,
              refinance or other property-backed obligation has a date, and repayment depends on a
              documented sale, refinance or similar event. It may suit a business owner, investor or
              developer with usable property security and an evidenced repayment path. Consumer bridging
              and home loans are not offered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link to="/contact?purpose=bridge" data-analytics-event="service_enquiry" data-transaction-purpose="bridge">
                  <FileText className="mr-2 h-5 w-5" />
                  Discuss your bridging transaction
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

          <PropertyFinanceDisclosure />

          <div className="service-body max-w-4xl mx-auto space-y-12 mb-16">
            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">What this service page answers</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The reader question here is not “what is bridging finance?” It is “who arranges a
                commercial bridging loan, and how would they structure mine?” Emet Capital packages the
                transaction, tests the exit, and approaches third-party lenders. It does not advance the
                money.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Definitions sit on{" "}
                <Link to="/resources/guides/what-is-bridging-finance" className="text-accent underline">
                  what bridging finance is
                </Link>
                . Lender-type comparison sits on the{" "}
                <Link to="/resources/guides/best-bridging-loan-lenders-companies-2025" className="text-accent underline">
                  bridging loan lenders guide
                </Link>
                . Education on peak debt, cost components and alternatives sits on the{" "}
                <Link to="/resources/guides/bridging-finance-australia-complete-property-guide" className="text-accent underline">
                  complete bridging finance guide
                </Link>
                . This page explains the broker method: the open versus closed exit test, the delayed-exit
                plan, net proceeds, documents and the process steps we actually run.
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet structures a commercial bridge</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A bridging file is a timing problem attached to a repayment event. The structure follows
                the quality of that event, not a product name.{" "}
                <Link to="/about/ben" className="text-accent underline">
                  Ben
                </Link>
                , a commercial finance broker at Emet Capital with 10 years&apos; experience in private
                lending, works bridging files around three tests before any lender is approached.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Scale className="mr-2 h-5 w-5 text-accent" />
                      1. Open versus closed exit test
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      Classify the exit on evidence available today. A closed exit has a contracted sale
                      with a settlement date, or a refinance that has a documented completion path.
                      An open exit is expected but not locked: the property is still being marketed, the
                      incoming lender has not finished credit, or a subdivision plan is not registered.
                    </p>
                    <p>
                      The test is practical. What remaining conditions sit outside the borrower&apos;s
                      control? Valuation, purchaser finance, incoming-lender policy, council or titles
                      office timing can all move a supposedly closed file back to open. Labels do not
                      change the risk. The{" "}
                      <Link to="/resources/guides/open-vs-closed-bridging-loan-complete-comparison" className="text-accent underline">
                        open versus closed comparison guide
                      </Link>{" "}
                      explains the education; this page uses the test to decide how the file is packaged.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <AlertTriangle className="mr-2 h-5 w-5 text-accent" />
                      2. Delayed-exit plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      Write what happens if the primary event is late. A delayed-exit plan is a working
                      note, not a hope that “it should be fine”. It should name the primary exit, the
                      evidence, the conditions still outstanding, the fallback, and how peak debt is paid
                      if interest is capitalised during the delay.
                    </p>
                    <p>
                      Fallback examples include a later refinance of the same asset, sale of another
                      holding, a partial discharge, or injecting equity. If none of those can be evidenced,
                      the file should pause. See the{" "}
                      <Link to="/resources/guides/bridging-loan-exit-strategies-plan-your-repayment-path" className="text-accent underline">
                        bridging loan exit-strategy guide
                      </Link>{" "}
                      for the education layer, and the{" "}
                      <Link to="/resources/guides/bridging-loan-exit-strategy-broker-take" className="text-accent underline">
                        broker-take exit checklist
                      </Link>{" "}
                      for the questions we still ask when a plan looks tidy on paper.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <ClipboardList className="mr-2 h-5 w-5 text-accent" />
                      3. Net proceeds on the same assumptions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      Compare facilities as cash, not as a headline rate. Net proceeds is the amount
                      available at settlement after prepaid or capitalised interest, establishment,
                      valuation, legal, brokerage and any amount used to discharge existing debt.
                      Peak debt is the amount owing at the planned exit and at the delayed-exit date.
                    </p>
                    <p>
                      Put every indicative response on one assumptions sheet: same amount, same security,
                      same exit date, same delay scenario. A cheaper-looking rate can leave less cash at
                      settlement or a higher balance if the exit slips. Extension, default and control
                      rights belong on that sheet as well. Emet does not quote a standard price; costs
                      depend on the lender and the transaction.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who this service suits, and who it does not</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Emet discusses commercial and business-purpose bridging only, secured by residential or
                commercial property, subject to lender assessment. Consumer bridging and home loans are
                not offered. A consumer-style purchase-before-sale of a home is a different product and
                is outside this service.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">It may suit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {[
                        "A commercial purchase or auction settlement with a fixed date and a documented repayment event.",
                        "A refinance that cannot complete by an existing maturity, with evidence of the incoming path.",
                        "A subdivision or residual-stock timing gap where registration or lot settlement is delayed.",
                        "A borrower who can evidence title, existing debt, business purpose and a delayed-exit fallback.",
                        "A comparison of the cost of bridging with the commercial cost of missing the transaction.",
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="mt-0.5 text-accent">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">It is a poor fit when</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {[
                        "The purpose is personal, domestic or a consumer home-loan bridge.",
                        "There is no defined repayment event, only an aspiration that something will sell or refinance.",
                        "Peak debt after a delay cannot be absorbed from equity, cash or another evidenced source.",
                        "Title, existing mortgages or authority to borrow have not been checked.",
                        "A conventional facility can meet the date at lower risk, or the transaction should not proceed.",
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="mt-0.5 text-accent">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">Process steps, without a promised timetable</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Timing depends on valuation, legal work, lender appetite, third parties and how complete
                the file is. A broker can sequence the work. No responsible party can promise a decision
                or settlement date. The steps below are the order we use, not a turnaround claim.
              </p>
              <ol className="grid gap-4">
                {processSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 font-semibold text-accent">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">Documents for a bridging assessment</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The Australian Government&apos;s{" "}
                <a
                  href="https://business.gov.au/finance/funding/apply-for-a-business-loan"
                  className="text-accent underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  business-loan preparation guide
                </a>{" "}
                lists identification, a business plan, financial reports, cash-flow information, forecasts
                and lease agreements as possible application inputs. A property-backed bridge also needs
                the transaction, title, existing debt and exit evidence. Requirements vary by lender;
                missing items delay assessment more often than extra items do.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {documents.map((item) => (
                  <Card key={item}>
                    <CardContent className="p-4 text-sm text-muted-foreground leading-relaxed flex gap-3">
                      <Shield className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                Send identification and sensitive financial records only through an appropriate secure
                process. Flag conflicting balances rather than smoothing them.
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">HYPOTHETICAL scenarios</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The three illustrations below are labelled HYPOTHETICAL. They are not Emet Capital
                clients, completed transactions, case studies or indications of approval. They show how
                the exit test, delayed-exit plan and net-proceeds comparison change the file.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">HYPOTHETICAL</Badge>
                    </div>
                    <CardTitle className="text-lg">HYPOTHETICAL: auction settlement before sale</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      A company buys a commercial property at auction while another holding is still
                      being marketed. The purchase date is fixed. The sale is not contracted, so the
                      exit test returns open. The delayed-exit plan asks what peak debt looks like if
                      the sale campaign runs longer, and whether another property or a later refinance
                      can repay the bridge. Net proceeds must still leave enough cash to settle after
                      known costs.
                    </p>
                    <p>
                      This HYPOTHETICAL is an illustration of the method, not a result. For the education
                      layer, see the{" "}
                      <Link to="/resources/guides/commercial-bridging-loans-for-property-auctions-expert-guide" className="text-accent underline">
                        commercial bridging for auctions guide
                      </Link>{" "}
                      and the{" "}
                      <Link to="/resources/guides/bridging-finance-auction-settlement-case-study" className="text-accent underline">
                        auction-settlement case-study pattern
                      </Link>
                      .
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">HYPOTHETICAL</Badge>
                    </div>
                    <CardTitle className="text-lg">HYPOTHETICAL: commercial purchase before refinance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      A business exchanges on a premises purchase while a longer-term commercial
                      refinance of the same or another property is still in credit. If the incoming
                      lender has outstanding valuation or legal conditions, the exit is open even when
                      everyone expects it to complete. The delayed-exit plan records those conditions
                      and tests peak debt if the refinance slips past the purchase date. Net proceeds
                      compare a short-term bridge against the cost of missing settlement.
                    </p>
                    <p>
                      This HYPOTHETICAL is not a completed Emet file. Compare the refinance pathway on{" "}
                      <Link to="/services/refinancing-solutions" className="text-accent underline">
                        commercial property refinancing
                      </Link>{" "}
                      and the{" "}
                      <Link to="/resources/guides/bridging-loan-exit-strategies-plan-your-repayment-path" className="text-accent underline">
                        exit-strategy guide
                      </Link>
                      . A dedicated case-study guide for this exact purchase-before-refinance pattern is
                      not published; those two pages are the live resources.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">HYPOTHETICAL</Badge>
                    </div>
                    <CardTitle className="text-lg">HYPOTHETICAL: subdivision registration delay</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      A developer needs to hold or complete a facility while plan registration is late
                      and lot settlements cannot occur. The primary exit is registration plus lot
                      settlements, which is open until the plan is actually registered. The delayed-exit
                      plan tests residual-stock timing, whether an incumbent extension is available, and
                      how peak debt behaves if further lots are delayed. Net proceeds must still cover
                      holding costs without treating unsold lots as cash.
                    </p>
                    <p>
                      This HYPOTHETICAL is an illustration only. The existing{" "}
                      <Link to="/resources/guides/bridging-finance-subdivision-registration-delay-australia" className="text-accent underline">
                        subdivision registration delay guide
                      </Link>{" "}
                      covers the education, evidence and option comparison for that pattern.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we provide access to over 50 lenders nationwide, including
                major banks, regional lenders, and private capital providers. Availability and lender
                appetite vary by transaction. We do not fund the loan and we do not choose a lender
                until the exit test, delayed-exit plan and document gaps are visible.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Begin with the amount, required date, security, existing debt and the evidence for the
                repayment event. We will say what is missing for an initial discussion. Lender
                assessment, valuation, legal work and complete documentation determine whether and when
                a proposal can proceed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                  <Link to="/contact?purpose=bridge" data-analytics-event="service_enquiry" data-transaction-purpose="bridge">
                    <FileText className="mr-2 h-5 w-5" />
                    Discuss your bridging transaction
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:0485952651">
                    <Phone className="mr-2 h-5 w-5" />
                    Speak with Specialist
                  </a>
                </Button>
              </div>
            </ServiceChapter>

            <ServiceChapter className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-accent" />
                Guides that answer neighbouring questions
              </h2>
              <p className="text-muted-foreground mb-6">
                Use these pages for definition, lender comparison, education and broker-selection
                detail. This service page stays on how Emet structures and arranges the file.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="md:col-span-2 lg:col-span-3">
                  <Link
                    to="/resources/guides/bridging-finance-australia-complete-property-guide"
                    className="block p-6 bg-accent/5 border-2 border-accent/20 rounded-lg hover:border-accent/40 hover:bg-accent/10 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <BookOpen className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Complete Bridging Finance Guide</h3>
                        <p className="text-muted-foreground mb-3">
                          Education on peak debt, total cost, delayed-settlement risk and alternatives.
                        </p>
                        <span className="text-accent font-medium inline-flex items-center">
                          Read Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <Link
                  to="/resources/guides/what-is-bridging-finance"
                  className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
                >
                  <h3 className="font-semibold text-foreground mb-2">What is Bridging Finance?</h3>
                  <p className="text-sm text-muted-foreground mb-2">Definition, common uses, risks and alternatives.</p>
                  <span className="text-accent text-sm inline-flex items-center">
                    Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </Link>
                <Link
                  to="/resources/guides/best-bridging-loan-lenders-companies-2025"
                  className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
                >
                  <h3 className="font-semibold text-foreground mb-2">Bridging Loan Lenders Guide</h3>
                  <p className="text-sm text-muted-foreground mb-2">Compare lender types, criteria, security and timing considerations.</p>
                  <span className="text-accent text-sm inline-flex items-center">
                    Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </Link>
                <Link
                  to="/resources/guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide"
                  className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
                >
                  <h3 className="font-semibold text-foreground mb-2">How to Choose a Bridging Loan Broker</h3>
                  <p className="text-sm text-muted-foreground mb-2">Questions, warning signs and how to assess broker fit.</p>
                  <span className="text-accent text-sm inline-flex items-center">
                    Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </Link>
              </div>
            </ServiceChapter>

            <FAQSection faqs={faqs} />
          </div>

          <DiscoveryGuides service="bridging-finance" />

          <RelatedReading articles={[
            {
              title: "Bridging Finance Australia: Complete Property Guide",
              slug: "bridging-finance-australia-complete-property-guide",
              description: "Peak debt, exit evidence, total cost, timing risk and alternatives",
            },
            {
              title: "Commercial Bridging Finance for Auction Purchases",
              slug: "commercial-bridging-loans-for-property-auctions-expert-guide",
              description: "How to assess an auction bridge before making an unconditional commitment",
            },
            {
              title: "How to Choose a Bridging Loan Broker in Australia",
              slug: "how-to-choose-a-bridging-loan-broker-expert-selection-guide",
              description: "Questions to ask when comparing brokers who arrange commercial bridges",
            },
          ] as RelatedArticle[]} />

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Bridging Finance by City</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Review property-location considerations for major Australian markets. Finance remains subject
              to the transaction, security, borrower and lender rather than the city label alone.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                ["Sydney", "/services/bridging-finance/cities/sydney", "Commercial auction, commercial or business purchase-before-sale and development timing scenarios involving Sydney property."],
                ["Melbourne", "/services/bridging-finance/cities/melbourne", "Valuation, title, legal and lender-coverage considerations for bridging scenarios involving Melbourne property."],
                ["Brisbane", "/services/bridging-finance/cities/brisbane", "Valuation, title, legal and lender-coverage considerations for bridging scenarios involving Brisbane property."],
                ["Perth", "/services/bridging-finance/cities/perth", "Valuation, title, legal and lender-coverage considerations for bridging scenarios involving Perth property."],
                ["Adelaide", "/services/bridging-finance/cities/adelaide", "Valuation, title, legal and lender-coverage considerations for bridging scenarios involving Adelaide property."],
                ["Gold Coast", "/services/bridging-finance/cities/gold-coast", "Valuation, title, legal and lender-coverage considerations for bridging scenarios involving Gold Coast property."],
              ].map(([city, href, copy]) => (
                <Card key={href} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{city}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{copy}</p>
                    <Link to={href} className="text-accent hover:underline inline-flex items-center text-sm font-semibold">
                      {city} Bridging Finance <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-accent" />
                    Commercial Property Finance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Commercial property settlement, purchase, and refinance structures</p>
                  <Link to="/services/commercial-property-finance" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Caveat Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Short-term business-purpose finance supported by a workable property and title position</p>
                  <Link to="/services/caveat-loans" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Refinancing Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Compare a longer-term refinance when that is the planned bridging exit</p>
                  <Link to="/services/refinancing-solutions" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BridgingFinance;
