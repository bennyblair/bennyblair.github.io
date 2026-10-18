import ServiceChapter from "@/components/ServiceChapter";
import { isDesignPreview } from "@/lib/design-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { AlertTriangle, ArrowRight, BookOpen, CheckCircle2, FileText, Phone, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { generateFAQPageSchema, generateServiceSchema } from "@/lib/schema-utils";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";
import DiscoveryGuides from "@/components/DiscoveryGuides";
import PropertyFinanceDisclosure from "@/components/PropertyFinanceDisclosure";
import { getClaim } from "@/lib/claims";

const lenderNetwork = getClaim("lender-network-50");

const PrivateLending = () => {
  const faqs: FAQItem[] = [
    {
      question: "Does Emet Capital lend the money?",
      answer: "No. Emet Capital is a commercial finance broker. It compares private and non-bank lenders, helps package the file, and coordinates the process. It is not a lender and does not fund loans. The lender that issues a facility, if any, is a third party, and that lender decides whether to offer terms."
    },
    {
      question: "How should I choose a commercial finance broker for private property-secured lending?",
      answer: "Ask whether the firm is a broker or a lender, who reviews the file, how lenders are shortlisted, and how indicative terms will be compared on the same amount, period and exit. Ask which costs are paid to the broker, to the lender and to third parties, and when each amount becomes payable. A useful broker will test security and exit before approaching lenders, and will say when private lending is the wrong tool."
    },
    {
      question: "What should I compare besides a headline interest rate?",
      answer: "Compare net funds received after known costs, how interest is charged, establishment, valuation, legal, registration, brokerage, ongoing, exit and extension costs, security ranking, conditions, default provisions and the amount likely to be owing on the planned repayment date. Two proposals with different fee shapes can produce very different total cost for the same facility size."
    },
    {
      question: "When is private lending the wrong tool for a business?",
      answer: "It is a poor fit where the purpose is not commercial, there is no usable property security, the exit is only hoped for, or the business cannot absorb a delayed sale or refinance. A second mortgage or a defined bridging facility may be the clearer structure. Emet does not offer consumer-purpose or residential home loans."
    },
    {
      question: "Is this service limited to business-purpose borrowing?",
      answer: "Yes. The property-backed funding discussed here is for business purposes only, secured by residential or commercial property. Having an ABN does not by itself establish eligibility. The borrower, use of funds, security and repayment plan still need assessment for the specific transaction."
    }
  ];

  const processSteps = [
    {
      title: "Initial call",
      body: "The first conversation is a transaction briefing, not a lender submission. Expect questions on the business purpose, amount required, required date, borrower entity, property offered as security, existing debt, and what a bank has already said if a bank has been involved. Incomplete answers are normal at this stage; the aim is to see whether the file is worth assembling."
    },
    {
      title: "Security and exit test",
      body: "Before any lender is approached, the broker tests two constraints. First, is there identifiable residential or commercial property, with a title position and existing debt that can be explained? Second, what event is meant to repay the facility—a refinance, a sale, a contracted business receipt, or another supportable path—and what happens if that event is late? If either answer is missing, the file is not ready for a private-lender shortlist."
    },
    {
      title: "Lender shortlist",
      body: `Emet acts only as a broker and can provide ${lenderNetwork.statement.toLowerCase()}. ${lenderNetwork.displayQualification} The shortlist is a subset that can consider this security, ranking, purpose and exit—not a blast of the same pack to every name. Some files never leave this step because no suitable appetite is identified.`
    },
    {
      title: "Indicative terms",
      body: "Where a lender is willing to consider the scenario, indicative terms may be issued. Indicative terms are not an approval, a valuation, or a commitment to settle. They should be compared on the same amount, the same expected period and the same exit assumption, including fees that sit outside the headline rate."
    },
    {
      title: "Valuation",
      body: "Most property-secured private facilities require a valuation on terms the lender will accept. The valuer, instructions and reliance are usually the lender's. A borrower-supplied appraisal does not replace that step. Valuation outcomes can change the amount, conditions or whether the proposal proceeds at all."
    },
    {
      title: "Documents",
      body: "Identity, entity, title, debt, purpose and exit evidence are completed to the lender's list. Missing or conflicting documents are flagged rather than estimated. Sensitive records should move through a secure process. Legal documents—facility, mortgage or other security, guarantees and any priority arrangements—are explained by the borrower's solicitor, not by a brochure."
    },
    {
      title: "Settlement",
      body: "If the lender issues final terms and the borrower proceeds, solicitors, the valuer and the lender's requirements determine when funds can settle. Emet Capital does not fund the loan. Timing depends on third parties, complete information and the lender's credit process. No turnaround is promised from the initial call."
    }
  ];

  const documentItems = [
    "Borrower, company, trust and guarantor identity for the people who will sign",
    "A written business-purpose use of funds and the amount actually required",
    "Property address, ownership, title position, valuation evidence and current secured debt",
    "Existing loan statements, payout figures and any known priority or consent issues",
    "The required date and the contract, tax, payout or legal deadline behind it",
    "Exit evidence for the sale, refinance or other event that is meant to repay the facility"
  ];

  const costQuestions = [
    "What net amount would the business receive after known establishment, brokerage, valuation and legal costs?",
    "How is interest charged—serviced, prepaid, or capitalised—and what would be owing on the planned repayment date?",
    "Which valuation, solicitor, registration, discharge, priority and search costs sit outside the lender's headline figure?",
    "What brokerage is payable, who pays it, and when does it become due?",
    "What happens to cost if the exit is late: extension, default interest, or a requirement to refinance on new terms?",
    "Which conditions, security ranking and guarantee requirements would still apply after indicative terms?"
  ];

  const serviceSchema = generateServiceSchema(
    "Private Lending Broker",
    "Commercial finance broker arranging private and non-bank property-secured business loans in Australia. Emet Capital is not a lender and does not fund loans.",
    "https://emetcapital.com.au/services/private-lending"
  );

  return (
    <>
      <SEO
        title="Private Lending Broker for Property-Secured Business Loans | Emet Capital"
        description="Emet Capital is a broker, not a lender. Compare private and non-bank property-secured business loans after a bank decline or timing mismatch, then discuss the transaction with a broker."
        canonical="/services/private-lending"
        keywords="private lending broker Australia, private mortgage business loan, non-bank commercial lending, property-backed business finance"
        noindex={isDesignPreview}
        geo={false}
        schemas={[
          {
            ...serviceSchema,
            provider: {
              ...serviceSchema.provider,
              description: "Commercial finance broker",
            },
          },
          generateFAQPageSchema(faqs),
        ]}
      />

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Private Lending" }
          ]} />

          <div className="page-header text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Broker-arranged private lending</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Private lending for business borrowers, arranged by a broker
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Emet Capital is a commercial finance broker. We compare private and non-bank lenders for
              property-secured business loans. Emet is not a lender and does not fund loans. This service
              suits Australian businesses that can offer residential or commercial property as security when
              a bank has declined the file, cannot meet the required date, or will not consider the structure.
              An enquiry starts a broker discussion of the transaction; it is not a lender application and not
              an approval.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link to="/contact?purpose=private_lending" data-analytics-event="service_enquiry" data-transaction-purpose="private_lending">
                  <FileText className="mr-2 h-5 w-5" />
                  Discuss your transaction with a broker
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
              <h2 className="text-3xl font-bold text-foreground mb-4">A broker-run file, not a product explainer</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Guides on this site define private lending, compare bank and non-bank paths, and list
                documents. This service is narrower: it is how Emet Capital, as a broker, works a
                private-lending file for a business that can offer property as security. For the product
                definition, read{" "}
                <Link to="/resources/guides/what-is-private-lending-australia" className="text-accent underline">
                  what private lending is in Australia
                </Link>
                .
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Files are reviewed by{" "}
                <Link to="/about/ben" className="text-accent underline">Ben</Link>, a commercial
                finance broker at Emet Capital with 10 years' experience in private lending. The review looks
                at purpose, security, existing debt and exit before any lender sees the pack. A broker can
                organise and compare; a lender still decides whether to offer terms, and a solicitor should
                explain the documents before anyone signs.
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet works a private-lending file</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The sequence below is the working order for a typical property-secured business file. Steps
                can overlap, restart, or stop. None of them is a promise of terms, valuation outcome, or
                settlement date.
              </p>
              <ol className="space-y-6">
                {processSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">Private-lender documents checklist</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Private lenders still need to understand who is borrowing, why the funds are required, what
                property supports the loan, what debt already sits on title, and how the facility is meant to
                be repaid. The full pack, section by section, is in the{" "}
                <Link to="/resources/guides/private-lender-document-pack-broker-take" className="text-accent underline">
                  private lender document pack
                </Link>
                . Do not treat that guide as a substitute for the lender's own list.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {documentItems.map((item) => (
                  <Card key={item}>
                    <CardContent className="p-4 text-sm text-muted-foreground leading-relaxed flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                Flag gaps and conflicting balances instead of guessing them. Low-doc language does not remove
                identity, security, purpose or exit checks. Send identification and financial records only
                through an appropriate secure process.
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">Hypothetical scenarios</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Each scenario below is labelled hypothetical. None is an Emet Capital customer, a completed
                transaction, or an indication that similar facts would be approved.
              </p>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-1">
                      <Badge variant="outline">HYPOTHETICAL</Badge>
                    </div>
                    <CardTitle className="text-lg">Bank decline with a clear exit</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      A trading company is declined by its bank on a business-purpose refinance because the
                      income presentation or property type sits outside that bank's policy. The company can
                      offer a freehold property with an existing first mortgage, and another refinance file is
                      already underway that will not be ready by the current maturity date.
                    </p>
                    <p>
                      A broker would test whether the decline is a policy mismatch rather than a weak asset,
                      whether the takeout refinance is real work-in-progress, and whether a private facility
                      would only cover a dated gap. If the takeout is only an intention, private lending is
                      the wrong tool. This example is hypothetical and is not a customer or approval case.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-1">
                      <Badge variant="outline">HYPOTHETICAL</Badge>
                    </div>
                    <CardTitle className="text-lg">ATO debt with property security</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      A company faces pressure on a business tax debt and has unused equity in a property used
                      in the business. Directors want to know whether a private, property-secured facility
                      could stand behind a commercial repayment plan.
                    </p>
                    <p>
                      A broker would still need a commercial purpose, usable security, a complete tax and
                      debt picture, and a repayment event that does not assume an unassessed refinance. This
                      is not tax, legal or insolvency advice. If the liability is personal, the exit is only
                      hoped for, or the business cannot absorb a failed refinance, the file should stop.
                      This example is hypothetical and is not a customer or approval case.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-1">
                      <Badge variant="outline">HYPOTHETICAL</Badge>
                    </div>
                    <CardTitle className="text-lg">Settlement deadline the bank will not meet</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      A business has exchanged on a commercial purchase. The remaining funds and security can
                      be explained, but the bank credit process will not be complete by the contracted
                      settlement date. The borrower can point to a later refinance or another dated source
                      that is meant to repay a short facility.
                    </p>
                    <p>
                      A broker would compare a private first or second mortgage with{" "}
                      <Link to="/services/bridging-finance" className="text-accent underline">
                        bridging finance
                      </Link>
                      {" "}where the gap is a true timing bridge. If the purchase cannot be completed without
                      stretching the exit past a supportable date, the transaction should be renegotiated or
                      paused rather than forced into private credit. This example is hypothetical and is not
                      a customer or approval case.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">When private lending is the wrong tool</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Private credit is not a way to bypass a weak asset, an unexplained purpose, or a missing
                repayment plan. It often costs more and runs for a shorter term than bank debt. Use a
                different path, or pause, when the facts below apply.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-accent" />
                      Keep the first mortgage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    If the need is extra business funding while an existing first mortgage stays in place,
                    start with{" "}
                    <Link to="/services/first-second-mortgages" className="text-accent underline">
                      first and second mortgages
                    </Link>
                    . That path is about ranking, consent and combined debt, not about shopping a private
                    label.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-accent" />
                      A dated sale or refinance gap
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    If the only problem is a defined timing gap before an evidenced sale or refinance,
                    compare{" "}
                    <Link to="/services/bridging-finance" className="text-accent underline">
                      bridging finance
                    </Link>
                    {" "}on the same exit and cost questions. A private mortgage is not automatically the
                    better bridge.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">No usable security or exit</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    If there is no identifiable property equity, the title cannot be explained, or repayment
                    depends on an unassessed future refinance, a private lender is unlikely to repair the
                    file. Packaging will not create an exit.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Consumer or home-loan purpose</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Emet Capital discusses commercial and business-purpose finance only. It does not offer
                    residential home loans or personal consumer credit, including where the security happens
                    to be a house.
                  </CardContent>
                </Card>
              </div>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">Cost components and how to compare total cost</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                There is no single private-lending rate on this page, and a headline rate is not the cost of
                the facility. Ask for written terms on the same amount, expected period and repayment
                scenario, then compare the net money received against the amount likely to be repaid.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                {costQuestions.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Shield className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Brokerage, lender fees and third-party costs are separate lines. Ask who receives each
                payment and when it becomes payable before deciding to proceed. Indicative terms can still
                change after valuation, legal review and final credit conditions.
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who this service is for</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                It is for Australian business owners, companies, trusts and property investors with a
                commercial purpose and residential or commercial property that can be offered as security.
                Typical prompts are a bank decline, a policy or structure mismatch, or a date a bank process
                cannot meet. Complex income or non-standard property can still be discussed; they are not a
                substitute for security, purpose and exit.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Bring the amount, purpose, property, current debt, deadline and intended repayment path to
                the first discussion.{" "}
                <Link to="/about/ben" className="text-accent underline">Ben</Link> will say which
                information is still missing, and whether a private-lender shortlist is even the next step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                  <Link to="/contact?purpose=private_lending" data-analytics-event="service_enquiry" data-transaction-purpose="private_lending">
                    <FileText className="mr-2 h-5 w-5" />
                    Discuss your transaction with a broker
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
                Guides & Resources
              </h2>
              <p className="text-muted-foreground mb-6">
                Use these guides for definitions, document detail and bank-versus-private comparison. This
                service page stays on how the broker file is run.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/resources/guides/what-is-private-lending-australia" className="block p-5 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all">
                  <h3 className="font-semibold text-foreground mb-2">What is private lending in Australia?</h3>
                  <p className="text-sm text-muted-foreground mb-2">The definition, fit, cost questions and limits—kept off this service page on purpose.</p>
                  <span className="text-accent text-sm inline-flex items-center">Read Guide <ArrowRight className="ml-1 h-3 w-3" /></span>
                </Link>
                <Link to="/resources/guides/private-lender-document-pack-broker-take" className="block p-5 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all">
                  <h3 className="font-semibold text-foreground mb-2">Private lender document pack</h3>
                  <p className="text-sm text-muted-foreground mb-2">The full evidence list a broker uses before a lender is asked for terms.</p>
                  <span className="text-accent text-sm inline-flex items-center">Read Guide <ArrowRight className="ml-1 h-3 w-3" /></span>
                </Link>
                <Link to="/resources/guides/private-lending-vs-bank-lending-which-is-better" className="block p-5 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all">
                  <h3 className="font-semibold text-foreground mb-2">Private lending vs bank lending</h3>
                  <p className="text-sm text-muted-foreground mb-2">Compare assessment style, flexibility and trade-offs beyond the product name.</p>
                  <span className="text-accent text-sm inline-flex items-center">Read Guide <ArrowRight className="ml-1 h-3 w-3" /></span>
                </Link>
                <Link to="/resources/guides/private-commercial-loans-after-bank-decline" className="block p-5 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all">
                  <h3 className="font-semibold text-foreground mb-2">Private commercial loans after a bank decline</h3>
                  <p className="text-sm text-muted-foreground mb-2">Diagnose a decline before another lender is asked to read the same file.</p>
                  <span className="text-accent text-sm inline-flex items-center">Read Guide <ArrowRight className="ml-1 h-3 w-3" /></span>
                </Link>
              </div>
            </ServiceChapter>

            <FAQSection faqs={faqs} />
          </div>

          <DiscoveryGuides service="private-lending" />

          <RelatedReading articles={[
            { title: "Private Credit Broker vs Direct Private Credit Fund", slug: "private-credit-broker-vs-direct-private-credit-fund-australia", description: "When comparing lenders through a broker is useful, and when a single fund may be enough" },
            { title: "Finding and comparing private lenders", slug: "finding-comparing-private-lenders-loans-2025-guide", description: "How to evaluate private-lender fit without treating a directory as an approval" },
            { title: "Bank vs non-bank commercial lending", slug: "bank-vs-non-bank-commercial-lending-in-australia-which-borrowers-get-approved", description: "Which borrowers may fit bank, non-bank, or private assessment" }
          ] as RelatedArticle[]} />

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "First & Second Mortgages", description: "Property-backed business lending when ranking and an existing first mortgage matter", to: "/services/first-second-mortgages" },
                { title: "Bridging Finance", description: "Short-term property-backed funding for a dated sale, refinance or settlement gap", to: "/services/bridging-finance" },
                { title: "Commercial Property Finance", description: "Purchase, settlement and refinance structures for business-purpose property", to: "/services/commercial-property-finance" },
                { title: "Refinancing Solutions", description: "Commercial refinance and bank-decline pathways for business borrowers", to: "/services/refinancing-solutions" }
              ].map((service) => (
                <Card key={service.to}>
                  <CardHeader>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
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
              <h2 className="text-2xl font-bold text-foreground mb-4">Private Lending by Location</h2>
              <p className="text-muted-foreground mb-6">
                City pages add local market context. Lender assessment still depends on the individual
                transaction, security and exit—not on the suburb name.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  ["Sydney", "/services/private-lending/cities/sydney"],
                  ["Melbourne", "/services/private-lending/cities/melbourne"],
                  ["Brisbane", "/services/private-lending/cities/brisbane"],
                  ["Perth", "/services/private-lending/cities/perth"],
                  ["Adelaide", "/services/private-lending/cities/adelaide"],
                  ["Gold Coast", "/services/private-lending/cities/gold-coast"]
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

export default PrivateLending;
