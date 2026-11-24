import ServiceChapter from "@/components/ServiceChapter";
import TransactionJourneys from "@/components/TransactionJourneys";
import SEO from "@/components/SEO";
import { generateFAQPageSchema, generateServiceSchema } from "@/lib/schema-utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  FileText,
  Landmark,
  Phone,
  Shield,
} from "lucide-react";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";
import DiscoveryGuides from "@/components/DiscoveryGuides";
import PropertyFinanceDisclosure from "@/components/PropertyFinanceDisclosure";

const processSteps = [
  {
    title: "Purpose and property brief",
    detail:
      "We record what the loan is for, the property, who occupies it, the buying or borrowing entity, the deadline and the existing debt. Unknowns are written down as unknowns. This is a broker conversation, not a lender application or an approval.",
  },
  {
    title: "Valuation and lease readiness",
    detail:
      "Before a lender is approached we check what a valuer and a lender's solicitor will ask for: the contract or title, leases and rent evidence for an investment property, and trading evidence for an owner-occupier. Gaps found now are cheaper than gaps found after a valuation is ordered.",
  },
  {
    title: "Lender selection",
    detail:
      "We shortlist the bank, non-bank or private lenders whose policy fits this property type, location, occupancy and purpose. A specialised or regional property narrows the list; we say so rather than sending the file everywhere.",
  },
  {
    title: "Terms side by side",
    detail:
      "Indicative responses are compared on one sheet: net funds after known costs, the interest basis, the term and review dates, covenants, and what happens at maturity. Indicative terms are not an approval.",
  },
  {
    title: "Credit, legal and settlement",
    detail:
      "If you proceed, the lender assesses the file, instructs its valuation and issues its documents. We track conditions with your solicitor and accountant. The lender decides whether and when funds settle.",
  },
];

const CommercialPropertyFinance = () => {
  const faqs: FAQItem[] = [
    {
      question: "Does Emet Capital lend money for commercial property?",
      answer:
        "No. Emet Capital is a commercial finance broker, not a lender. We prepare the transaction, compare suitable bank, non-bank and private lenders, and coordinate the file. The lender decides whether to approve, sets the terms and controls settlement.",
    },
    {
      question: "What types of commercial property can be financed?",
      answer:
        "Offices, warehouses and industrial units, shops, medical and professional suites, mixed-use buildings and owner-occupied business premises may be considered. Specialised, vacant or single-tenant properties and some regional locations narrow the lender pool and can change the terms. Residential property can also be offered as security for a business-purpose loan, subject to the lender.",
    },
    {
      question: "How much deposit or equity do lenders expect?",
      answer:
        "There is no single figure. Lenders set the maximum loan by property type, location, lease or trading income, borrower strength, purpose and the valuation they accept. Specialised or vacant property usually needs more equity. Budget separately for duty, legal, valuation and other purchase costs.",
    },
    {
      question: "Does it matter whether my business will occupy the property?",
      answer:
        "Yes. For owner-occupied premises, lenders look mainly at whether the trading business can meet the repayments. For an investment property, they look at the lease, the tenant, the remaining lease term and vacancy risk. The same building can be assessed differently depending on who occupies it.",
    },
    {
      question: "What if my bank approval will not be ready before settlement?",
      answer:
        "Some borrowers use a short-term bridge or a private first or second mortgage while the longer-term loan finishes. That only works when the bank process is genuinely under way and the delay is about timing, not about whether the loan can be repaid. We compare the cost of a short-term loan with the cost of a settlement extension before suggesting one.",
    },
    {
      question: "What documents should I have ready?",
      answer:
        "Useful documents include the contract of sale, title or rates notice, current loan payout figures, company or trust documents, ID, details of the security property, solicitor contacts, and evidence of the planned exit such as a sale, refinance, or business event.",
    },
    {
      question: "Do you arrange home loans or personal borrowing?",
      answer:
        "No. Emet Capital discusses business-purpose and commercial investment finance only. It does not offer residential home loans or personal consumer credit.",
    },
  ];

  return (
    <>
      <SEO
        title="Commercial Property Finance Broker Australia | Emet Capital"
        description="Finance for business premises and commercial investment property, arranged by a broker. Bank, non-bank and private lenders compared on one sheet."
        canonical="/services/commercial-property-finance"
        keywords="commercial property finance broker, commercial property loan, commercial mortgage broker, owner-occupier commercial loan, commercial investment property finance"
        schemas={[
          generateServiceSchema(
            "Commercial Property Finance",
            "Emet Capital is a commercial finance broker that arranges finance for business premises and commercial investment property in Australia. It is not a lender and does not fund loans.",
            "https://emetcapital.com.au/services/commercial-property-finance"
          ),
          generateFAQPageSchema(faqs),
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

          <div className="page-header text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Commercial Property Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Commercial property finance, arranged by a broker
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Emet Capital is a commercial finance broker, not a lender. We arrange finance to buy, refinance or release equity from business premises and commercial investment property, comparing bank, non-bank and private lenders on the same assumptions. Residential or commercial property may be offered as security for a business-purpose loan, subject to the lender.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link to="/contact?purpose=purchase" data-analytics-event="property_pillar_enquiry" data-transaction-purpose="purchase">
                  <FileText className="mr-2 h-5 w-5" />
                  Discuss Scenario
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+61485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Specialist
                </a>
              </Button>
            </div>
          </div>

          <PropertyFinanceDisclosure />
          <TransactionJourneys />
          <div className="service-body max-w-4xl mx-auto space-y-12 mb-16">
            <ServiceChapter className="bg-muted/30 rounded-2xl p-6 border border-border">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                What commercial property finance covers
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Commercial property finance is business-purpose lending secured by property: buying premises for your own business, buying or refinancing a leased investment property, or releasing equity from property you already own for a business use. It can include offices, warehouses and industrial units, shops, medical and professional suites, and mixed-use buildings.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The right structure depends on the property, who occupies it, the borrower entity, the income that will repay the loan, the equity available and the deadline. A longer-term bank facility, a non-bank loan and a short-term private loan solve different problems. We compare them on the same amount and the same dates so the trade-offs are visible before you choose.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Land subdivision and construction funding is a separate service: see{" "}
                <Link to="/services/commercial-property-development" className="text-accent hover:underline">
                  commercial property development finance
                </Link>
                . Property-backed business funding behind an existing loan is covered on{" "}
                <Link to="/services/first-second-mortgages" className="text-accent hover:underline">
                  first and second mortgages
                </Link>
                .
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Owner-occupied premises or investment property?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Lenders assess the same building differently depending on who occupies it. Knowing which side of this line your purchase sits on tells you which evidence matters most.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 pr-4 font-semibold">Question</th>
                      <th className="text-left py-3 pr-4 font-semibold">Owner-occupied premises</th>
                      <th className="text-left py-3 font-semibold">Investment property</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-medium text-foreground">What repays the loan?</td>
                      <td className="py-3 pr-4">The trading business that occupies the premises</td>
                      <td className="py-3">Rent from the tenant or tenants</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-medium text-foreground">What the lender reads first</td>
                      <td className="py-3 pr-4">Business financial statements, BAS and trading history</td>
                      <td className="py-3">The lease, tenant quality, remaining lease term and vacancy risk</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-medium text-foreground">What weakens the file</td>
                      <td className="py-3 pr-4">Uneven trading, recent losses or an unclear link between the business and the buying entity</td>
                      <td className="py-3">A short remaining lease, a single tenant, a vacancy or a specialised use with few alternative tenants</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-foreground">Common entity question</td>
                      <td className="py-3 pr-4">Whether the property sits in the operating company, a related trust or a self-managed fund</td>
                      <td className="py-3">Whether guarantees from directors or a related trading entity will be required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-6 mb-4">
                If the business will occupy part of the building and lease the rest, say so at the start. Lenders treat mixed occupancy in different ways, and it changes both the evidence and the shortlist.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For deposit and serviceability questions on a premises purchase, see the{" "}
                <Link to="/resources/guides/owner-occupier-commercial-loans-buy-your-business-premises" className="text-accent hover:underline">
                  owner-occupier commercial loans guide
                </Link>
                .
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                How Emet works a commercial property file
              </h2>
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
              <p className="text-muted-foreground leading-relaxed">
                Files are reviewed by{" "}
                <Link to="/about/ben" className="text-accent hover:underline">
                  Ben
                </Link>
                , a commercial finance broker at Emet Capital.
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Property types lenders treat differently
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Lender appetite changes with the asset. These are the patterns that most often change the shortlist or the terms.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li>Industrial units and warehouses: usually the widest lender appetite when the building suits more than one type of tenant.</li>
                <li>Retail shops and strip retail: location, tenant mix and lease length carry a lot of weight.</li>
                <li>Offices: vacancy and the cost of re-leasing are tested closely, especially for older or smaller buildings.</li>
                <li>Medical, childcare and other specialised premises: fewer lenders, and the operator's business is often assessed alongside the property.</li>
                <li>Mixed-use buildings: residential parts may be assessed under different policy from the commercial parts.</li>
                <li>Vacant land and development sites: usually a development finance question rather than a commercial property loan.</li>
              </ul>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                When the settlement date is the problem
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Sometimes the property and the borrower are sound but the timetable is not: a bank approval will not finish before settlement, a valuation or lease review has delayed the main lender, or an outgoing lender needs repayment first. A short-term structure can hold the transaction while the longer-term loan finishes, but only when the delay is about timing, not about whether the loan can be repaid.
              </p>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li>A bank approval is close but will not complete before the settlement date.</li>
                <li>A valuation, lease review, or legal condition has delayed the permanent lender.</li>
                <li>A vendor, liquidator, or auction contract will not allow more time.</li>
                <li>An outgoing lender needs repayment before a replacement facility settles.</li>
                <li>A developer or investor needs to hold control of the asset while an exit catches up.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A complete file moves faster than a fast lender. Have these ready:
              </p>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li>Contract of sale, settlement date, and solicitor details</li>
                <li>Security property details, title search, rates notice, or valuation support</li>
                <li>Existing debt and payout figures for any secured loans</li>
                <li>Company, trust, ABN/ACN, director, and ID documents</li>
                <li>Clear use of funds and amount required to settle</li>
                <li>Exit evidence such as sale proceeds, refinance pathway, or other repayment event</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A lender may pause or decline when any of these cannot be cleared in time:
              </p>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li>Unclear title, ownership, trust, or corporate authority.</li>
                <li>Existing debts or caveats that reduce usable equity.</li>
                <li>A requested loan amount that is too high for the available security.</li>
                <li>No practical exit strategy or repayment pathway.</li>
                <li>Incomplete documents close to settlement.</li>
                <li>Consumer-purpose use, personal advice needs, or legal issues outside lender appetite.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                For the timetable itself, see the{" "}
                <Link to="/resources/guides/commercial-property-settlement-process-finance-timeline" className="text-accent hover:underline">
                  commercial property settlement timeline
                </Link>
                . Where a dated sale or refinance repays the short-term loan, compare{" "}
                <Link to="/services/bridging-finance" className="text-accent hover:underline">
                  commercial bridging finance
                </Link>
                .
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">Illustrative scenarios</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                These scenarios illustrate how we work a file. They are not Emet Capital clients, completed transactions or indications that a lender would approve similar facts.
              </p>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Illustrative scenario</Badge>
                    </div>
                    <CardTitle className="text-lg">Buying the warehouse the business already leases</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      <span className="font-semibold text-foreground">Situation: </span>
                      A manufacturing business has the chance to buy the warehouse it rents. Its bank is interested, but the business had one weaker trading year during a plant upgrade.
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">What we checked: </span>
                      Whether the weaker year has a documented cause and recovery, which entity should own the property, and whether a related-party lease from the operating company to the property owner would be put in place.
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">What decided the path: </span>
                      If recent trading supports repayments, a bank facility is compared first. If the bank wants more history, a non-bank loan with a planned refinance is compared against waiting another year, including the cost of each.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Illustrative scenario</Badge>
                    </div>
                    <CardTitle className="text-lg">Investment property with a lease expiring soon</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      <span className="font-semibold text-foreground">Situation: </span>
                      An investor wants to refinance a strip shop whose main tenant has less than a year left on its lease.
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">What we checked: </span>
                      Whether the tenant has an option to renew, what rent the market supports if it leaves, and whether the borrower can carry the loan through a vacancy.
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">What decided the path: </span>
                      Lenders treat a short remaining lease as a risk. A renewed or extended lease before refinancing can widen the shortlist more than any lender comparison can.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Illustrative scenario</Badge>
                    </div>
                    <CardTitle className="text-lg">Bank approval running late for settlement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      <span className="font-semibold text-foreground">Situation: </span>
                      A business has exchanged on premises. Its bank has the application, but a valuation query means approval will not arrive by the settlement date.
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">What we checked: </span>
                      Whether the bank's query is about timing or about the loan itself, the cost of a settlement extension from the vendor, and whether a short-term loan could be repaid by the bank facility.
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">What decided the path: </span>
                      A short-term loan is only compared when the bank process is genuinely under way. If the query is about the borrower's ability to repay, a bridge would just move the problem.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ServiceChapter>

            <ServiceChapter>
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
                      Working Capital
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Short-term funding for operations, inventory, or cash-flow timing when the business
                      purpose and repayment path are clear.
                    </p>
                    <Link to="/services/working-capital" className="text-accent hover:underline text-sm inline-flex items-center">
                      Working capital <ArrowRight className="ml-1 h-4 w-4" />
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
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Emet Capital helps borrowers and advisers frame the transaction in lender-ready terms:
                security, amount, timing, purpose, exit, and the critical path to settlement. The goal is to
                match the file with an appropriate lender category rather than sending an urgent scenario to
                a lender that is unlikely to fit the timetable or security position.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                That may involve comparing a bridge with a direct refinance, considering whether private
                lending is more suitable than bank debt, or identifying whether a second mortgage
                is even appropriate. Emet does not provide personal financial advice and does not
                guarantee funding outcomes.
              </p>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Commercial Property Finance Pathways to Compare
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The useful question is rarely only how fast a loan can be assessed. It is which structure fits the asset, the occupancy, the deadline, the existing debt and the exit. These guides cover the comparison in more depth.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    label: "Commercial property loans guide",
                    href: "/resources/guides/commercial-property-loans-australia-complete-guide",
                    text: "Broader lending options, deposits, LVR, assessment, and lender selection.",
                  },
                  {
                    label: "Commercial property loan after a bank decline",
                    href: "/resources/guides/commercial-property-loan-after-bank-decline-non-bank-options-australia",
                    text: "Non-bank options when a bank will not fund the property or the borrower.",
                  },
                  {
                    label: "Owner-occupier commercial loans",
                    href: "/resources/guides/owner-occupier-commercial-loans-buy-your-business-premises",
                    text: "Deposit, serviceability and ownership structure when buying premises for your business.",
                  },
                  {
                    label: "Short-term property-backed business loans",
                    href: "/services/asset-backed-lending",
                    text: "How property or other assets may support a defined business funding need.",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
                  >
                    <h3 className="font-semibold text-foreground mb-2">{item.label}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.text}</p>
                    <span className="text-accent text-sm inline-flex items-center">
                      View resource <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </ServiceChapter>

            <ServiceChapter>
              <h2 className="text-3xl font-bold text-foreground mb-4">Risks and Disclaimers</h2>
              <div className="bg-muted/30 rounded-lg p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Short-term and private commercial property loans can be useful where timing is the real problem, but they may involve higher costs, shorter terms, more concentrated exit risk and stricter legal or security requirements than standard commercial lending.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This page is general information only and does not take into account your objectives,
                  financial situation, or needs. Borrowers should obtain legal, tax, accounting, and financial
                  advice before entering any commercial finance arrangement.
                </p>
              </div>
            </ServiceChapter>

            <ServiceChapter>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                  <Link to="/contact?purpose=purchase" data-analytics-event="property_pillar_enquiry" data-transaction-purpose="purchase">
                    <FileText className="mr-2 h-5 w-5" />
                    Start Assessment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+61485952651">
                    <Phone className="mr-2 h-5 w-5" />
                    Speak with Emet
                  </a>
                </Button>
              </div>
            </ServiceChapter>

            <FAQSection faqs={faqs} />

            <ServiceChapter className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Reviewed by Ben, Commercial Finance Broker</p>
              <p className="mt-2">
                Reviewed 25 November 2026. General commercial finance information only, not personal financial, legal, tax or credit advice. Criteria and availability vary by lender and transaction.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link to="/about/ben" className="text-accent hover:underline">Reviewer credentials</Link>
                <Link to="/editorial-standards" className="text-accent hover:underline">Editorial standards</Link>
                <Link to="/resources/tools" className="text-accent hover:underline">Property calculators</Link>
                <Link to="/resources/case-studies" className="text-accent hover:underline">Property scenarios</Link>
              </div>
            </ServiceChapter>
          </div>

          <DiscoveryGuides service="commercial-property-finance" />

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
                title: "Commercial Property Refinance After a Bank Decline",
                slug: "commercial-property-refinance-after-a-bank-decline-in-australia",
                description: "When a direct refinance or a transitional structure may fit after a bank decline.",
              },
            ] as RelatedArticle[]}
          />
        </div>
      </div>
    </>
  );
};

export default CommercialPropertyFinance;
