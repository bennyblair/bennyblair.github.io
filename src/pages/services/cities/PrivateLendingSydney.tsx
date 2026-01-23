import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";

const PrivateLendingSydney = () => {
  const faqs: FAQItem[] = [
    {
      question: "How do you qualify for a first mortgage private loan in Sydney?",
      answer: "Sydney private first-mortgage lenders are typically asset-first underwriters. They focus primarily on: (1) Security (the property: type, location/saleability, clean title, valuation, and confirmed 1st ranking mortgage position), (2) Leverage (LVR, commonly in the ~65–75% range depending on the scenario), and (3) Exit strategy (a clear, realistic path to repay within a short term such as refinance after a trigger, sale of the asset, or completion + refinance). They also assess the borrower structure (individual/company/trust, guarantees) and serviceability during the term, often supported by bank statements, income evidence, and/or an interest reserve if interest is capitalised."
    },
    {
      question: "What do private lenders in Sydney actually look for when assessing a first mortgage deal?",
      answer: "Most private lenders assess deals using three core pillars: Security (property quality, liquidity, title/encumbrances, valuation, and ability to register a first mortgage), LVR (risk-adjusted leverage with tighter LVRs for complex scenarios), and Exit (how the loan will be repaid within the agreed short term, including Plan B). They also look at how quickly the deal can settle and whether documentation is complete (contract/leases, rates/strata, insurance, and development documents if applicable)."
    },
    {
      question: "What documents do you typically need for a Sydney private first mortgage application?",
      answer: "Common requirements include: borrower/entity details (ID, ABN/ACN, directors/shareholders, trust deed if applicable, and guarantees), AML/KYC, purpose of funds and requested terms (amount, term, settlement date, interest structure), serviceability evidence (bank statements, income proof, liabilities schedule), and property/legal documents (contract, lease schedule, rates notices, strata report if applicable, insurance). For development, lenders often request DA, plans, builder contract, costings/QS, feasibility, and presales (if any)."
    },
    {
      question: "What improves approval odds for a private first mortgage in Sydney?",
      answer: "Practically, the fastest 'yes' at better pricing usually comes from: (1) a tight 1–2 page credit memo outlining security, conservative LVR, use of funds, timeline, and a clear exit with a Plan B; (2) a clean settlement path (payout figures, title search, caveat checks, solicitor ready, insurance prepared); and (3) conservative leverage paired with a credible, time-bound exit strategy."
    },
    {
      question: "What are typical interest rates for private first mortgage loans in Sydney?",
      answer: "Indicatively, many private first-mortgage deals in Australia/Sydney are commonly seen in the ~8%–14% p.a. range, with cleaner, low-LVR metro residential scenarios toward the lower end and urgent/complex/commercial scenarios toward the higher end (sometimes higher). Pricing depends heavily on LVR, asset quality, scenario complexity, term, whether interest is capitalised, and speed requirements."
    },
    {
      question: "What fees do Sydney private lenders commonly charge on first mortgage loans?",
      answer: "Private loans often have higher upfront costs than banks. Typical fees can include: establishment/origination (often ~1%–3% and sometimes higher), line/admin fees, valuation fees (borrower-paid), lender and borrower legal fees (borrower often pays lender's legal costs), settlement/admin fees, default interest and enforcement costs if in arrears, minimum interest periods (e.g., 3 months), and exit/discharge fees (fixed or %)."
    },
    {
      question: "How does private lending compare to bank lending for property development in Sydney?",
      answer: "Banks typically offer lower pricing and longer terms but are stricter on documentation, serviceability, presales (for many residential projects), QS monitoring, builder diligence, and credit committee timelines. Private lenders tend to be faster and more bespoke, focusing more on asset value, downside protection via LVR, feasibility/exit, and sponsor track record—often allowing short terms (e.g., 3–36 months) and structures like capitalised interest or interest reserves. The trade-off is higher cost (rates + fees)."
    },
    {
      question: "What due diligence should a borrower do when dealing with a Sydney family office lender?",
      answer: "Borrower diligence should cover: (1) counterparty legitimacy (legal entity name, ABN/ACN, authority to sign, proof they can fund, track record/references), (2) economics clarity (written term sheet stating rate basis, default interest, all fees, minimum interest, early repayment treatment, and capitalised interest mechanics), (3) legal review (first-ranking registration mechanics, PPSR/general security deed if applicable, guarantees, covenants, events of default, cure periods, and enforcement/receiver provisions), and (4) operational execution (panel solicitors, valuation ordering speed, willingness to use PEXA, and any unusual conditions)."
    },
    {
      question: "What are red flags to watch for in Sydney private lending?",
      answer: "Common red flags include: refusing to provide a clear written term sheet, vague or shifting fee descriptions, requests for large upfront payments before documentation (beyond normal valuation/legal deposits), unclear lender identity or signing authority, and pressure to use only the lender's lawyer without independent review."
    },
    {
      question: "What templates should I use to request loan terms from a private lender in Sydney?",
      answer: "Useful templates include: (A) a short 'Term Sheet Request' email with property details, estimated value, requested facility/LVR, term, purpose, settlement date, and exit; (B) a one-page 'Borrower Information Pack' summarising borrower, transaction, security, valuation/LVR, servicing approach, exit strategy, and documents available; (C) a due diligence questionnaire covering lender identity/process, proof of funds, economics, conditions/covenants, and security requirements; and (D) a 'Request for Formal Offer/Letter of Offer' once indicative terms are acceptable."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you qualify for a first mortgage private loan in Sydney?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sydney private first-mortgage lenders are typically asset-first underwriters. They focus primarily on: (1) Security (the property: type, location/saleability, clean title, valuation, and confirmed 1st ranking mortgage position), (2) Leverage (LVR, commonly in the ~65–75% range depending on the scenario), and (3) Exit strategy (a clear, realistic path to repay within a short term such as refinance after a trigger, sale of the asset, or completion + refinance). They also assess the borrower structure (individual/company/trust, guarantees) and serviceability during the term, often supported by bank statements, income evidence, and/or an interest reserve if interest is capitalised."
        }
      },
      {
        "@type": "Question",
        "name": "What do private lenders in Sydney actually look for when assessing a first mortgage deal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most private lenders assess deals using three core pillars: Security (property quality, liquidity, title/encumbrances, valuation, and ability to register a first mortgage), LVR (risk-adjusted leverage with tighter LVRs for complex scenarios), and Exit (how the loan will be repaid within the agreed short term, including Plan B). They also look at how quickly the deal can settle and whether documentation is complete (contract/leases, rates/strata, insurance, and development documents if applicable)."
        }
      },
      {
        "@type": "Question",
        "name": "What documents do you typically need for a Sydney private first mortgage application?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Common requirements include: borrower/entity details (ID, ABN/ACN, directors/shareholders, trust deed if applicable, and guarantees), AML/KYC, purpose of funds and requested terms (amount, term, settlement date, interest structure), serviceability evidence (bank statements, income proof, liabilities schedule), and property/legal documents (contract, lease schedule, rates notices, strata report if applicable, insurance). For development, lenders often request DA, plans, builder contract, costings/QS, feasibility, and presales (if any)."
        }
      },
      {
        "@type": "Question",
        "name": "What improves approval odds for a private first mortgage in Sydney?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Practically, the fastest 'yes' at better pricing usually comes from: (1) a tight 1–2 page credit memo outlining security, conservative LVR, use of funds, timeline, and a clear exit with a Plan B; (2) a clean settlement path (payout figures, title search, caveat checks, solicitor ready, insurance prepared); and (3) conservative leverage paired with a credible, time-bound exit strategy."
        }
      },
      {
        "@type": "Question",
        "name": "What are typical interest rates for private first mortgage loans in Sydney?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Indicatively, many private first-mortgage deals in Australia/Sydney are commonly seen in the ~8%–14% p.a. range, with cleaner, low-LVR metro residential scenarios toward the lower end and urgent/complex/commercial scenarios toward the higher end (sometimes higher). Pricing depends heavily on LVR, asset quality, scenario complexity, term, whether interest is capitalised, and speed requirements."
        }
      },
      {
        "@type": "Question",
        "name": "What fees do Sydney private lenders commonly charge on first mortgage loans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Private loans often have higher upfront costs than banks. Typical fees can include: establishment/origination (often ~1%–3% and sometimes higher), line/admin fees, valuation fees (borrower-paid), lender and borrower legal fees (borrower often pays lender's legal costs), settlement/admin fees, default interest and enforcement costs if in arrears, minimum interest periods (e.g., 3 months), and exit/discharge fees (fixed or %)."
        }
      },
      {
        "@type": "Question",
        "name": "How does private lending compare to bank lending for property development in Sydney?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Banks typically offer lower pricing and longer terms but are stricter on documentation, serviceability, presales (for many residential projects), QS monitoring, builder diligence, and credit committee timelines. Private lenders tend to be faster and more bespoke, focusing more on asset value, downside protection via LVR, feasibility/exit, and sponsor track record—often allowing short terms (e.g., 3–36 months) and structures like capitalised interest or interest reserves. The trade-off is higher cost (rates + fees)."
        }
      },
      {
        "@type": "Question",
        "name": "What due diligence should a borrower do when dealing with a Sydney family office lender?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Borrower diligence should cover: (1) counterparty legitimacy (legal entity name, ABN/ACN, authority to sign, proof they can fund, track record/references), (2) economics clarity (written term sheet stating rate basis, default interest, all fees, minimum interest, early repayment treatment, and capitalised interest mechanics), (3) legal review (first-ranking registration mechanics, PPSR/general security deed if applicable, guarantees, covenants, events of default, cure periods, and enforcement/receiver provisions), and (4) operational execution (panel solicitors, valuation ordering speed, willingness to use PEXA, and any unusual conditions)."
        }
      },
      {
        "@type": "Question",
        "name": "What are red flags to watch for in Sydney private lending?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Common red flags include: refusing to provide a clear written term sheet, vague or shifting fee descriptions, requests for large upfront payments before documentation (beyond normal valuation/legal deposits), unclear lender identity or signing authority, and pressure to use only the lender's lawyer without independent review."
        }
      },
      {
        "@type": "Question",
        "name": "What templates should I use to request loan terms from a private lender in Sydney?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Useful templates include: (A) a short 'Term Sheet Request' email with property details, estimated value, requested facility/LVR, term, purpose, settlement date, and exit; (B) a one-page 'Borrower Information Pack' summarising borrower, transaction, security, valuation/LVR, servicing approach, exit strategy, and documents available; (C) a due diligence questionnaire covering lender identity/process, proof of funds, economics, conditions/covenants, and security requirements; and (D) a 'Request for Formal Offer/Letter of Offer' once indicative terms are acceptable."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Private Lending Sydney | First Mortgage Private Loans | Emet Capital</title>
        <meta 
          name="description" 
          content="Access private first mortgage loans in Sydney from family offices and non-bank lenders. Fast approval, flexible terms, asset-focused underwriting for property developers and investors."
        />
        <meta name="keywords" content="private lending Sydney, first mortgage Sydney, private lender Sydney, non-bank loans Sydney, family office lending Sydney, private mortgage Sydney" />
        <link rel="canonical" href="https://emetcapital.com.au/services/private-lending/cities/sydney" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Private Lending", href: "/services/private-lending" },
            { label: "Sydney" }
          ]} />

          <article className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Private Lending in Sydney</h1>
            
            <p className="text-muted-foreground leading-relaxed">
              Private lending in Sydney connects property developers, investors, and business owners with non-bank finance from family offices, private credit funds, and specialist lenders. These asset-focused lenders assess deals based on security strength, LVR, and exit strategy rather than rigid bank criteria—enabling faster approvals and flexible structures for Sydney's dynamic property market.
            </p>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Private Lending in Sydney?</h2>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Sydney's property market moves fast. Whether you're acquiring a development site before auction, bridging between settlements, or funding construction while awaiting bank refinance, private lenders offer the speed and flexibility that traditional banks often can't match.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Private first mortgage lenders in Sydney typically focus on three core pillars: the quality and liquidity of the security property, conservative leverage (commonly 65–75% LVR), and a clear, realistic exit strategy. This asset-first approach means borrowers with non-standard circumstances—business transitions, past credit events, or complex structures—can still access finance based on deal merit.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Sydney's high property values and transparent market support larger facilities and provide strong security positions. Combined with specialist brokers who understand local dynamics, private lending offers a powerful alternative to traditional bank channels.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who Uses Private Lending in Sydney</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Private lending in Sydney is particularly suited for:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Property Developers</strong> requiring fast settlement for site acquisitions, construction funding, or bridging between project stages</li>
                <li><strong className="text-foreground">Property Investors</strong> building portfolios, undertaking value-add projects, or refinancing to release capital for new opportunities</li>
                <li><strong className="text-foreground">Business Owners</strong> accessing working capital secured against commercial property without lengthy bank approval processes</li>
                <li><strong className="text-foreground">Companies in Transition</strong> needing bridge finance while restructuring or awaiting alternative finance approval</li>
                <li><strong className="text-foreground">Borrowers with Non-Standard Circumstances</strong> including past credit events, complex income structures, or situations outside standard bank policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Private Lending vs Bank Lending</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Banks typically offer lower pricing and longer terms but are stricter on documentation, serviceability calculations, presales requirements, and credit committee timelines. Private lenders trade off higher costs (rates typically 8–14% p.a. plus fees) for speed, flexibility, and asset-focused assessment.
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Speed</strong> - Private lenders can approve in days rather than weeks or months</li>
                <li><strong className="text-foreground">Flexibility</strong> - Short terms (3–36 months), capitalised interest, interest reserves</li>
                <li><strong className="text-foreground">Assessment Focus</strong> - Security value and exit strategy over rigid serviceability formulas</li>
                <li><strong className="text-foreground">Structure</strong> - Bespoke arrangements for complex scenarios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Typical Costs</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Private first mortgage loans in Sydney commonly range from ~8%–14% p.a. interest, with cleaner, low-LVR metro residential scenarios toward the lower end and urgent or complex scenarios toward the higher end.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Fees typically include:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li>Establishment/origination: often ~1%–3%</li>
                <li>Valuation fees (borrower-paid)</li>
                <li>Legal fees (borrower often pays lender's legal costs)</li>
                <li>Settlement/admin fees</li>
                <li>Minimum interest periods (e.g., 3 months)</li>
                <li>Exit/discharge fees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <FAQSection faqs={faqs} />
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Get Started</h2>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-8 my-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Apply for Private Lending in Sydney</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Access Sydney's private lending market through our network of family offices, private credit funds, and specialist lenders. We'll match your scenario with lenders who assess deals on security strength and exit strategy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="bg-accent hover:bg-accent-dark text-accent-foreground">
                    <Link to="/contact">
                      Apply Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="tel:0485952651">
                      <Phone className="mr-2 h-5 w-5" />
                      Call 0485 952 651
                    </a>
                  </Button>
                </div>
              </div>
            </section>

            <div className="mt-12 p-6 bg-muted/30 rounded-lg">
              <p className="text-sm text-foreground">
                <strong>Looking for other services?</strong> Explore{" "}
                <Link to="/services/private-lending" className="text-accent hover:underline">Private Lending (National)</Link>,{" "}
                <Link to="/services/first-second-mortgages/cities/sydney" className="text-accent hover:underline">1st & 2nd Mortgages Sydney</Link>,{" "}
                <Link to="/services/bridging-finance/cities/sydney" className="text-accent hover:underline">Bridging Finance Sydney</Link>, or{" "}
                <Link to="/services/commercial-property-development/cities/sydney" className="text-accent hover:underline">Commercial Development Sydney</Link>.
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default PrivateLendingSydney;
