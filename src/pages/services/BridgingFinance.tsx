import ServiceChapter from "@/components/ServiceChapter";
import SEO from "@/components/SEO";
import { generateFAQPageSchema, generateServiceSchema } from "@/lib/schema-utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Building2,
  FileText,
  Phone,
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
        "No. Emet Capital is a commercial finance broker, not a lender, and it does not fund loans. It maps the transaction, tests security and the exit, compares third-party lender responses on the same assumptions, and coordinates the file. Approval, terms and settlement remain with the lender and its advisers.",
    },
    {
      question: "What should I have ready for a first bridging discussion?",
      answer:
        "Bring the amount, required date, business purpose, proposed security, existing debt and the evidence you already have for the repayment event. Identification, entity papers, the contract or maturity notice, title and current loan statements are enough to start. Missing items are normal at intake; the first conversation is to see whether the file is ready to assemble, not to submit a lender application.",
    },
    {
      question: "Who issues indicative terms, approval and settlement?",
      answer:
        "A third-party lender may issue indicative terms after it has seen a decision-ready summary. Indicative terms are not an approval, a valuation or a commitment to settle. If you proceed, the same lender assesses the file, instructs valuation on its terms, and controls whether and when funds can settle. Emet Capital coordinates the pack and the conditions; it does not approve credit or advance money.",
    },
    {
      question: "What happens after we discuss indicative terms?",
      answer:
        "You decide whether the compared responses are worth proceeding with. If you go ahead, the next work is usually the lender's valuation, the remaining document pack, legal documents and outstanding conditions. Valuation outcomes can change the amount, conditions or whether the proposal continues. Timing still depends on those third parties and on how complete the file is.",
    },
    {
      question: "When does Emet pause a bridging file instead of circulating it?",
      answer:
        "The file should pause when the purpose is not commercial, the security or existing debt cannot be explained, the repayment event is only hoped for, or a delayed-exit plan cannot cover interest, known fees and a later repayment. Circulating an incomplete file wastes lender time and does not create an exit. A conventional facility, a smaller requirement or not proceeding can be the clearer outcome.",
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
      title: "Intake",
      detail:
        "The first conversation maps the transaction: amount, required date, business purpose, proposed security, existing debt and the exact shortfall to be funded. We record what is known and flag unknowns instead of estimating them. This is a broker discussion, not a lender application and not an approval.",
    },
    {
      title: "Security and exit test",
      detail:
        "Before any lender is approached, we test whether the property, title and existing mortgages can be explained, and whether the repayment event is evidenced today rather than hoped for. A delayed-exit plan sits on the file so peak debt can still be repaid if the sale, refinance or registration is late. If either test fails, the file pauses here.",
    },
    {
      title: "Lender shortlist and compare",
      detail:
        "The shortlist is the subset of lenders that can assess this security, purpose and exit type, not a blast of the same pack to every name. Eligible responses are compared on one assumptions sheet: net cash at settlement, amount owing at the planned exit, and amount owing if that exit is delayed. Some files never leave this step because no suitable appetite is identified.",
    },
    {
      title: "Indicative terms discussion",
      detail:
        "Where a lender is willing to consider the scenario, indicative terms may be issued. Indicative terms are not an approval, a valuation or a commitment to settle. We walk through costs, outstanding conditions and remaining unknowns with you so you can decide whether to proceed.",
    },
    {
      title: "Valuation and documents",
      detail:
        "Most commercial bridges need a valuation on terms the lender will accept, plus identity, entity, title, debt, transaction and exit evidence. We coordinate the pack and flag gaps before a lender, valuer or lawyer has to ask twice. The valuer, instructions and reliance are usually the lender's. A borrower-supplied appraisal does not replace that step.",
    },
    {
      title: "Settlement coordination",
      detail:
        "If the lender issues terms and you proceed, we track conditions, legal documents, consents and discharge mechanics. The lender and its advisers still control assessment and settlement. Timing depends on valuation, legal work, third parties and how complete the file is. No broker can promise a settlement date.",
    },
  ];

  return (
    <>
      <SEO
        title="Commercial Bridging Finance Broker Australia | Emet Capital"
        description="Emet Capital is a commercial finance broker, not a lender. We structure commercial bridging finance from intake through settlement coordination."
        canonical="/services/bridging-finance"
        keywords="commercial bridging finance broker Australia, arrange bridging finance, commercial bridging service, bridging loan exit plan, commercial bridging finance"
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
              developer with usable property security and an evidenced repayment path who is ready to
              discuss a transaction. Consumer bridging and home loans are not offered.
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
                  Call Emet Capital
                </a>
              </Button>
            </div>
          </div>

          <PropertyFinanceDisclosure />

          <div className="service-body max-w-4xl mx-auto space-y-12 mb-16">
            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">How we arrange a commercial bridge</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Emet Capital packages the transaction, tests security and the exit, compares third-party
                lenders and coordinates the work through to settlement. It does not advance the money.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For the definition, read{" "}
                <Link to="/resources/guides/what-is-bridging-finance" className="text-accent underline">
                  what bridging finance is
                </Link>
                . For fit, and when a bridge is the wrong tool, see{" "}
                <Link to="/resources/guides/when-commercial-bridging-finance-makes-sense-in-australia-and-when-it-does-not" className="text-accent underline">
                  when commercial bridging finance makes sense
                </Link>
                . Peak debt, cost components and alternatives are in the{" "}
                <Link to="/resources/guides/bridging-finance-australia-complete-property-guide" className="text-accent underline">
                  complete bridging finance guide
                </Link>
                . Lender-type comparison is in the{" "}
                <Link to="/resources/guides/best-bridging-loan-lenders-companies-2025" className="text-accent underline">
                  bridging loan lenders guide
                </Link>
                . On a live file we run intake, the security and exit test, the shortlist, indicative
                terms, valuation, documents and settlement coordination.
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet works a commercial bridging file</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Files are reviewed by{" "}
                <Link to="/about/ben" className="text-accent underline">
                  Ben
                </Link>
                , a commercial finance broker at Emet Capital. The sequence below is the working order
                for a typical commercial bridge. Steps can overlap, restart or stop. None of them is a
                promise of terms, valuation outcome or settlement date.
              </p>
              <ol className="grid gap-4 mb-8">
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
              <p className="text-muted-foreground leading-relaxed mb-4">
                Two working tests sit inside that sequence and decide whether we circulate the file.
                The{" "}
                <Link to="/resources/guides/open-vs-closed-bridging-loan-complete-comparison" className="text-accent underline">
                  open versus closed comparison
                </Link>{" "}
                explains how to classify the exit on today&apos;s evidence. The{" "}
                <Link to="/resources/guides/bridging-loan-exit-strategies-plan-your-repayment-path" className="text-accent underline">
                  bridging loan exit-strategy guide
                </Link>{" "}
                and the{" "}
                <Link to="/resources/guides/bridging-loan-exit-strategy-broker-take" className="text-accent underline">
                  broker-take exit checklist
                </Link>{" "}
                cover how a delayed-exit plan is written. We apply those tests to the file before any
                lender sees it.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 pr-4 font-semibold">Work on the file</th>
                      <th className="text-left py-3 pr-4 font-semibold">You</th>
                      <th className="text-left py-3 pr-4 font-semibold">Emet (broker)</th>
                      <th className="text-left py-3 font-semibold">Lender</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-medium text-foreground">Intake</td>
                      <td className="py-3 pr-4">Facts, dates and documents already on hand</td>
                      <td className="py-3 pr-4">Map the transaction and flag gaps</td>
                      <td className="py-3">Not involved yet</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-medium text-foreground">Security and exit</td>
                      <td className="py-3 pr-4">Evidence of the sale, refinance or other repayment event</td>
                      <td className="py-3 pr-4">Test security, classify the exit and write the delayed-exit plan</td>
                      <td className="py-3">Not involved yet</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-medium text-foreground">Shortlist and terms</td>
                      <td className="py-3 pr-4">Confirm assumptions and decide whether to proceed</td>
                      <td className="py-3 pr-4">Compare indicative responses on the same sheet</td>
                      <td className="py-3">May issue indicative terms</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-foreground">Valuation to settlement</td>
                      <td className="py-3 pr-4">Valuation access, solicitor and remaining items</td>
                      <td className="py-3 pr-4">Coordinate the pack and outstanding conditions</td>
                      <td className="py-3">Assesses, values, approves or declines, and settles if proceeding</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who this service suits, and who it does not</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Emet discusses commercial and business-purpose bridging only, secured by residential or commercial
                property, subject to lender assessment. Consumer bridging and home loans are
                not offered. A consumer-style purchase-before-sale of a home is a different product and
                is outside this service. The list below is who we will discuss a live file with.
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
              <h2 className="text-3xl font-bold text-foreground mb-4">Documents we ask for at intake</h2>
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
                intake, the security and exit test and the shortlist comparison change the file.
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
                      being marketed. Intake records the purchase date and the shortfall. The security
                      and exit test finds a fixed purchase and an uncontracted sale, so the file is not
                      ready to treat the sale as certain. The delayed-exit plan asks what peak debt looks
                      like if the campaign runs longer, and whether another property or a later refinance
                      can repay the bridge. Only then would a shortlist compare net proceeds.
                    </p>
                    <p>
                      This HYPOTHETICAL is an illustration of the method, not a result. For auction
                      settlement detail, see the{" "}
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
                      refinance of the same or another property is still in credit. Intake captures the
                      settlement date and what the incoming lender has actually issued. If valuation or
                      legal conditions are still outstanding, the exit test treats the refinance as
                      unconfirmed even when everyone expects it to complete. The delayed-exit plan tests
                      peak debt if that refinance slips past the purchase date. Net proceeds then compare
                      a short-term bridge against the cost of missing settlement.
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
                      .
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
                      and lot settlements cannot occur. Intake records the facility that is maturing and
                      the registration status actually on file. The primary exit is registration plus lot
                      settlements, which remains unconfirmed until the plan is registered. The delayed-exit
                      plan tests residual-stock timing, whether an incumbent extension is available, and
                      how peak debt behaves if further lots are delayed. A shortlist is only useful if
                      those numbers still close.
                    </p>
                    <p>
                      This HYPOTHETICAL is an illustration only. The existing{" "}
                      <Link to="/resources/guides/bridging-finance-subdivision-registration-delay-australia" className="text-accent underline">
                        subdivision registration delay guide
                      </Link>{" "}
                      covers evidence and option comparison for that pattern.
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
                    Speak with a broker
                  </a>
                </Button>
              </div>
            </ServiceChapter>

            <ServiceChapter className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-accent" />
                Guides for definitions and comparison
              </h2>
              <p className="text-muted-foreground mb-6">
                Use these pages for definition, fit, lender comparison and broker-selection questions.
                If you are comparing brokers rather than discussing a file, start with the selection
                guide.
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
                          Peak debt, total cost, delayed-settlement risk and alternatives.
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
                  to="/resources/guides/when-commercial-bridging-finance-makes-sense-in-australia-and-when-it-does-not"
                  className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
                >
                  <h3 className="font-semibold text-foreground mb-2">When Bridging Finance Makes Sense</h3>
                  <p className="text-sm text-muted-foreground mb-2">When a commercial bridge fits, and when it does not.</p>
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
              title: "Open versus closed bridging loans",
              slug: "open-vs-closed-bridging-loan-complete-comparison",
              description: "How exit certainty changes the way a bridging file is packaged",
            },
            {
              title: "Commercial Bridging Finance for Auction Purchases",
              slug: "commercial-bridging-loans-for-property-auctions-expert-guide",
              description: "How to assess an auction bridge before making an unconditional commitment",
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
                  <CardTitle className="text-lg">First and Second Mortgages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Property-backed business finance structured as a first or second ranking mortgage</p>
                  <Link to="/services/first-second-mortgages" className="text-accent hover:underline inline-flex items-center text-sm">
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
