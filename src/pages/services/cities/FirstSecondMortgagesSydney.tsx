import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";

const FirstSecondMortgagesSydney = () => {
  const faqs: FAQItem[] = [
    {
      question: "What loan amounts are available for 1st and 2nd mortgages in Sydney?",
      answer: "Loan amounts typically range from $100,000 to $50M+ depending on property value, equity position, and lending policy. Sydney's high property values often support larger facilities."
    },
    {
      question: "How quickly can I access funds with a commercial mortgage in Sydney?",
      answer: "For straightforward applications with clear documentation, approval can occur within 24-48 hours. Settlement timeframes depend on valuation turnaround and legal requirements, but speed is a key advantage over traditional bank channels."
    },
    {
      question: "Do I need to own property in Sydney to qualify?",
      answer: "The property used as security must be located in Sydney or surrounding NSW areas. Borrowers can be based anywhere in Australia, though local property knowledge and experience may strengthen applications."
    },
    {
      question: "What types of properties are acceptable as security in Sydney?",
      answer: "Commercial properties including office buildings, retail premises, industrial facilities, warehouses, and investment properties across Sydney metro and greater NSW are typically acceptable."
    },
    {
      question: "Can I use a 2nd mortgage to fund renovations on my Sydney property?",
      answer: "Yes, second mortgages are commonly used for property improvements, fit-outs, and value-add renovations, particularly where existing first mortgage arrangements are favorable and shouldn't be disturbed."
    },
    {
      question: "What are the interest rates for 1st and 2nd mortgages in Sydney?",
      answer: "Rates vary based on LVR, property type, loan term, and borrower profile. First mortgages typically offer more competitive rates than second positions due to lower risk. Contact us for current indicative pricing based on your specific scenario."
    }
  ];

  return (
    <>
      <Helmet>
        <title>1st and 2nd Mortgages Sydney | Commercial Mortgage Sydney | Emet Capital</title>
        <meta 
          name="description" 
          content="Get fast 1st and 2nd mortgages in Sydney. Leverage Sydney's rising land values with flexible commercial mortgage solutions for property developers and investors. Apply now." 
        />
        <meta name="keywords" content="1st and 2nd mortgages Sydney, commercial mortgage Sydney, property finance Sydney, second mortgage Sydney, commercial property loans Sydney" />
        <link rel="canonical" href="https://emetcapital.com.au/services/first-second-mortgages/cities/sydney" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "1st & 2nd Mortgages", href: "/services/first-second-mortgages" },
            { label: "Sydney" }
          ]} />

          <article className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">1st and 2nd Mortgages in Sydney</h1>

            <p className="text-muted-foreground leading-relaxed">
              First and second mortgage finance in Sydney provides property-backed funding for businesses and investors across Australia's largest commercial property market. Whether acquiring premises, refinancing existing debt, or unlocking equity for expansion, 1st and 2nd mortgages in Sydney offer flexible solutions for property developers, SME directors, and investors capitalizing on the city's diverse property landscape and rising land values.
            </p>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Why 1st and 2nd Mortgages Matter in Sydney</h2>
            
              <p className="text-muted-foreground leading-relaxed mb-4">
                Sydney's property market presents unique opportunities and challenges for commercial borrowers. The city's diverse property sectors—spanning CBD commercial towers, suburban retail precincts, industrial estates across Western Sydney, and waterfront developments—create substantial capital requirements that traditional bank lending often struggles to accommodate at pace.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Leveraging Sydney's high rising land values, commercial mortgage finance enables businesses to access equity quickly without lengthy bank approval processes. First mortgages provide primary funding at competitive rates, while second mortgages unlock additional capital from existing property holdings without disturbing favorable first mortgage arrangements. This dual approach is particularly valuable in Sydney's fast-moving market, where renovation opportunities, strategic acquisitions, and development sites require rapid capital deployment.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Sydney's commercial property values—consistently among Australia's highest—support larger loan facilities and provide strong security positions for lenders. This value density, combined with specialist mortgage brokers who understand local market dynamics, makes Sydney an ideal environment for accessing flexible property-backed finance.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Loan Suits</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Commercial mortgage finance in Sydney is particularly well-suited for:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Property Developers</strong> acquiring sites, funding construction phases, or bridging between project stages across Sydney's suburbs and metro areas</li>
                <li><strong className="text-foreground">Business Owners</strong> purchasing owner-occupied premises, consolidating business debt against property equity, or funding fit-outs and refurbishments</li>
                <li><strong className="text-foreground">Property Investors</strong> building commercial portfolios, undertaking value-add renovations, or refinancing to release capital for additional acquisitions</li>
                <li><strong className="text-foreground">SME Directors</strong> accessing working capital secured against commercial property without disrupting existing banking relationships</li>
                <li><strong className="text-foreground">Companies in Transition</strong> requiring fast settlement funding while restructuring or awaiting alternative finance approval</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How 1st and 2nd Mortgages Work</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Accessing commercial mortgage finance in Sydney follows a straightforward process designed for speed and flexibility:
              </p>

              <ol className="space-y-3 text-muted-foreground list-decimal pl-6">
                <li><strong className="text-foreground">Initial Assessment</strong> - Contact our team to discuss your property, funding requirements, and timeframe. We'll assess your scenario and recommend whether a first or second mortgage (or both) best suits your needs.</li>
                <li><strong className="text-foreground">Property Valuation</strong> - An independent valuation establishes current market value and determines available lending capacity. Sydney's transparent property market typically enables fast valuation turnaround.</li>
                <li><strong className="text-foreground">Lender Matching</strong> - We present your application to our network of commercial and private lenders, securing competitive terms based on LVR, property type, and loan purpose.</li>
                <li><strong className="text-foreground">Documentation & Approval</strong> - Submit standard business and property documentation. For straightforward applications with clear equity positions, approval can occur within 24-48 hours.</li>
                <li><strong className="text-foreground">Settlement</strong> - Once approved, legal processes proceed to settlement, with funds typically available within 1-2 weeks for first mortgages, or faster for second mortgage top-ups where existing arrangements remain in place.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Benefits vs Going Direct to a Bank</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Working with a specialist mortgage broker for Sydney property finance offers distinct advantages over direct bank approaches:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Speed of Approval</strong> - Specialist lenders can assess and approve applications in days rather than the weeks or months typical of major bank credit committees</li>
                <li><strong className="text-foreground">Non-Bank Access</strong> - We connect you with private and specialist lenders who assess deals on commercial merit and security value, not just credit scoring and trading history</li>
                <li><strong className="text-foreground">Flexible Credit Assessment</strong> - Past credit events, business transitions, or non-standard income structures don't automatically disqualify applications as they might with banks</li>
                <li><strong className="text-foreground">Real Assessment Focus</strong> - Lending decisions prioritize property value, equity position, and clear exit strategy over rigid serviceability formulas</li>
                <li><strong className="text-foreground">Second Mortgage Specialists</strong> - Banks rarely offer second mortgage products; our lender network includes specialists comfortable with subordinated security positions</li>
                <li><strong className="text-foreground">Local Market Knowledge</strong> - Sydney-experienced brokers understand property types, locations, and value drivers that support strong lending propositions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Real Sydney Example</h2>

              <p className="text-muted-foreground leading-relaxed">
                A property development company required $1.2M to acquire a warehouse conversion opportunity in Marrickville. Their existing first mortgage on another Sydney property had favorable terms they didn't want to disturb, but they needed rapid funding to secure the acquisition before auction. We arranged a second mortgage against their existing property, providing 80% LVR combined facility with settlement in 8 business days. The client secured the warehouse, completed the conversion, and refinanced both properties under improved terms once the development was complete and generating rental income.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Requirements</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                To qualify for 1st and 2nd mortgage finance in Sydney, you'll typically need:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li>Commercial or investment property in Sydney or greater NSW as security</li>
                <li>Minimum loan amount generally $100,000 (some lenders higher)</li>
                <li>Combined LVR up to 80% for first mortgages, or up to 70-75% for second mortgage positions</li>
                <li>Clear evidence of loan purpose and exit strategy</li>
                <li>Standard business documentation: ABN registration, recent BAS statements, bank statements, identification</li>
                <li>Property documentation: rates notice, current title search, existing mortgage details (if applicable)</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-4">
                Second mortgages require consent from the existing first mortgage holder in some cases, though many lenders have established relationships that streamline this process.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <FAQSection faqs={faqs} />
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Get Started</h2>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-8 my-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Apply Now for 1st and 2nd Mortgages in Sydney</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Leverage Sydney's property market with fast, flexible commercial mortgage finance. Our team understands the Sydney market and can connect you with lenders who assess deals on merit and security value, not just credit scores.
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
                <strong>Looking for this service in your area?</strong> Explore 1st & 2nd Mortgages in{" "}
                <Link to="/services/first-second-mortgages/cities/sydney" className="text-accent hover:underline">Sydney</Link>,{" "}
                <Link to="/services/first-second-mortgages/cities/melbourne" className="text-accent hover:underline">Melbourne</Link>,{" "}
                <Link to="/services/first-second-mortgages/cities/brisbane" className="text-accent hover:underline">Brisbane</Link>,{" "}
                <Link to="/services/first-second-mortgages/cities/perth" className="text-accent hover:underline">Perth</Link>,{" "}
                <Link to="/services/first-second-mortgages/cities/adelaide" className="text-accent hover:underline">Adelaide</Link> and{" "}
                <Link to="/services/first-second-mortgages/cities/gold-coast" className="text-accent hover:underline">Gold Coast</Link>.
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default FirstSecondMortgagesSydney;
