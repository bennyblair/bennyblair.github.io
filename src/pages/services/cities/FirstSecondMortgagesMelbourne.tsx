import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";

const FirstSecondMortgagesMelbourne = () => {
  const faqs: FAQItem[] = [
    {
      question: "What loan amounts are available for 1st and 2nd mortgages in Melbourne?",
      answer: "Loan amounts typically range from $100,000 to $50M+ depending on property value, equity position, and lending policy. Melbourne's diverse property market supports facilities across all size ranges."
    },
    {
      question: "How quickly can I access funds with a commercial mortgage in Melbourne?",
      answer: "For straightforward applications with clear documentation, approval can occur within 24-48 hours. Settlement timeframes depend on valuation turnaround and legal requirements, typically 1-2 weeks for standard transactions."
    },
    {
      question: "Do I need to own property in Melbourne to qualify?",
      answer: "The property used as security must be located in Melbourne or surrounding Victoria. Borrowers can be based anywhere in Australia, though familiarity with the local market may strengthen applications."
    },
    {
      question: "What types of properties are acceptable as security in Melbourne?",
      answer: "Commercial properties including office buildings, retail premises, industrial facilities, warehouses, and investment properties across metropolitan Melbourne and regional Victoria are typically acceptable."
    },
    {
      question: "Can I use a 2nd mortgage to fund business expansion in Melbourne?",
      answer: "Yes, second mortgages are commonly used for business growth, equipment purchases, working capital, and strategic acquisitions, particularly where existing first mortgage terms are favorable."
    },
    {
      question: "What are the interest rates for 1st and 2nd mortgages in Melbourne?",
      answer: "Rates vary based on LVR, property type, loan term, and borrower profile. First mortgages typically offer more competitive rates than second positions due to lower risk. Contact us for current indicative pricing based on your specific scenario."
    }
  ];

  return (
    <>
      <Helmet>
        <title>1st and 2nd Mortgages Melbourne | Commercial Mortgage Melbourne | Emet Capital</title>
        <meta 
          name="description" 
          content="Get fast 1st and 2nd mortgages in Melbourne. Flexible commercial mortgage solutions for property developers, manufacturers, and investors across Victoria. Apply now." 
        />
        <meta name="keywords" content="1st and 2nd mortgages Melbourne, commercial mortgage Melbourne, property finance Melbourne, second mortgage Melbourne, commercial property loans Melbourne" />
        <link rel="canonical" href="https://emetcapital.com.au/services/first-second-mortgages/cities/melbourne" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "1st & 2nd Mortgages", href: "/services/first-second-mortgages" },
            { label: "Melbourne" }
          ]} />

          <article className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">1st and 2nd Mortgages in Melbourne</h1>

            <p className="text-muted-foreground leading-relaxed">
              First and second mortgage finance in Melbourne provides property-backed funding for businesses and investors across Victoria's commercial property market. Whether acquiring premises, refinancing existing debt, or unlocking equity for expansion, 1st and 2nd mortgages in Melbourne offer flexible solutions for property developers, manufacturers, and investors capitalizing on the city's diverse industrial base and stable property values.
            </p>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Why 1st and 2nd Mortgages Matter in Melbourne</h2>
            
              <p className="text-muted-foreground leading-relaxed mb-4">
                Melbourne's commercial property market offers unique opportunities for businesses requiring flexible funding. The city's extensive industrial precincts across the south-eastern suburbs, established CBD commercial district, and growing outer suburban office markets create diverse capital requirements that traditional bank lending often struggles to service efficiently.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Leveraging Melbourne's stable property values and strong manufacturing and logistics sectors, commercial mortgage finance enables businesses to access equity quickly without lengthy bank approval processes. First mortgages provide primary funding at competitive rates, while second mortgages unlock additional capital from existing property holdings without disturbing favorable first mortgage arrangements. This dual approach is particularly valuable in Melbourne's industrial property market, where warehouse upgrades, equipment purchases, and operational expansion require rapid capital deployment.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Melbourne's commercial property values—supported by strong tenant demand across industrial, office, and retail sectors—provide robust security positions for lenders. This stability, combined with specialist mortgage brokers who understand local market dynamics, makes Melbourne an ideal environment for accessing flexible property-backed finance.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Loan Suits</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Commercial mortgage finance in Melbourne is particularly well-suited for:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Property Developers</strong> acquiring development sites, funding construction phases, or bridging between project stages across Melbourne's growth corridors</li>
                <li><strong className="text-foreground">Manufacturers & Logistics Operators</strong> purchasing industrial facilities, funding fit-outs, or consolidating business debt against property equity</li>
                <li><strong className="text-foreground">Business Owners</strong> acquiring owner-occupied premises, undertaking property improvements, or accessing working capital secured against commercial property</li>
                <li><strong className="text-foreground">Property Investors</strong> building commercial portfolios, undertaking value-add renovations, or refinancing to release capital for additional acquisitions</li>
                <li><strong className="text-foreground">Growing SMEs</strong> requiring fast settlement funding for strategic opportunities without disrupting existing banking relationships</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How 1st and 2nd Mortgages Work</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Accessing commercial mortgage finance in Melbourne follows a straightforward process designed for speed and flexibility:
              </p>

              <ol className="space-y-3 text-muted-foreground list-decimal pl-6">
                <li><strong className="text-foreground">Initial Assessment</strong> - Contact our team to discuss your property, funding requirements, and timeframe. We'll assess your scenario and recommend whether a first or second mortgage (or both) best suits your needs.</li>
                <li><strong className="text-foreground">Property Valuation</strong> - An independent valuation establishes current market value and determines available lending capacity. Melbourne's established valuation networks typically enable fast turnaround.</li>
                <li><strong className="text-foreground">Lender Matching</strong> - We present your application to our network of commercial and private lenders, securing competitive terms based on LVR, property type, and loan purpose.</li>
                <li><strong className="text-foreground">Documentation & Approval</strong> - Submit standard business and property documentation. For straightforward applications with clear equity positions, approval can occur within 24-48 hours.</li>
                <li><strong className="text-foreground">Settlement</strong> - Once approved, legal processes proceed to settlement, with funds typically available within 1-2 weeks for first mortgages, or faster for second mortgage top-ups where existing arrangements remain in place.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Benefits vs Going Direct to a Bank</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Working with a specialist mortgage broker for Melbourne property finance offers distinct advantages over direct bank approaches:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Speed of Approval</strong> - Specialist lenders can assess and approve applications in days rather than the weeks or months typical of major bank credit committees</li>
                <li><strong className="text-foreground">Non-Bank Access</strong> - We connect you with private and specialist lenders who assess deals on commercial merit and security value, not just credit scoring and trading history</li>
                <li><strong className="text-foreground">Flexible Credit Assessment</strong> - Past credit events, business transitions, or seasonal trading patterns don't automatically disqualify applications as they might with banks</li>
                <li><strong className="text-foreground">Property-Focused Assessment</strong> - Lending decisions prioritize property value, equity position, and clear exit strategy over rigid serviceability formulas</li>
                <li><strong className="text-foreground">Second Mortgage Specialists</strong> - Banks rarely offer second mortgage products; our lender network includes specialists comfortable with subordinated security positions</li>
                <li><strong className="text-foreground">Local Market Knowledge</strong> - Melbourne-experienced brokers understand property types, locations, and value drivers that support strong lending propositions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Real Melbourne Example</h2>

              <p className="text-muted-foreground leading-relaxed">
                A manufacturing business required $850K to purchase new machinery and complete a warehouse fit-out at their Dandenong facility. Their existing first mortgage had favorable long-term rates they didn't want to disturb, but they needed rapid funding to secure equipment before price increases took effect. We arranged a second mortgage against their owner-occupied industrial property, providing 75% LVR combined facility with settlement in 10 business days. The client installed the equipment, increased production capacity by 40%, and secured new contracts that enabled them to refinance both mortgages under improved terms within 18 months.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Requirements</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                To qualify for 1st and 2nd mortgage finance in Melbourne, you'll typically need:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li>Commercial or investment property in Melbourne or greater Victoria as security</li>
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
                <h3 className="text-2xl font-bold text-foreground mb-4">Apply Now for 1st and 2nd Mortgages in Melbourne</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Leverage Melbourne's property market with fast, flexible commercial mortgage finance. Our team understands the Melbourne market and can connect you with lenders who assess deals on merit and security value, not just credit scores.
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

export default FirstSecondMortgagesMelbourne;
