import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";

const CommercialDevelopmentPerth = () => {
  const faqs: FAQItem[] = [
    {
      question: "What development types can be financed in Perth?",
      answer: "Residential subdivisions, townhouse developments, apartment buildings, commercial offices, industrial warehouses, retail centers, and mining accommodation facilities across greater Perth and regional Western Australia are commonly financed."
    },
    {
      question: "How quickly can development finance be approved in Perth?",
      answer: "Simple developments with clear feasibility can receive indicative approval within 2-3 weeks. Complex projects or regional locations may require 4-6 weeks for full approval and documentation."
    },
    {
      question: "Do I need Western Australian planning approvals before applying?",
      answer: "Either approved development applications or clear pathways to approval are typically required. Some lenders offer pre-approval land facilities that convert to construction finance once development approval is received."
    },
    {
      question: "What equity contribution is required for Perth developments?",
      answer: "Typical equity requirements range from 20-35% of total development costs. Factors include project type, developer experience, location, and overall project risk. Experienced developers with proven track records may access lower equity requirements."
    },
    {
      question: "Are presales required for Perth residential developments?",
      answer: "Presale requirements vary by lender and project. Traditional banks often require 50-70% presales, while specialist lenders may assess on end-value with reduced or no presale requirements, particularly for established locations or experienced developers."
    },
    {
      question: "Can development finance cover land acquisition in Perth?",
      answer: "Yes, integrated development finance structures typically include land acquisition funding, either as combined facilities or as land loans converting to construction finance upon development approval and construction commencement."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Commercial Development Finance Perth | Property Development Loans Perth | Emet Capital</title>
        <meta 
          name="description" 
          content="Get development finance for construction projects in Perth. Fund residential, commercial, and industrial developments across Western Australia's resource-driven property market. Apply today."
        />
        <meta name="keywords" content="development finance Perth, construction loans Perth, property development Perth, development funding Perth, construction finance Perth" />
        <link rel="canonical" href="https://emetcapital.com.au/services/commercial-property-development/cities/perth" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Property Development", href: "/services/commercial-property-development" },
            { label: "Perth" }
          ]} />

          <article className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Commercial Development Finance in Perth</h1>

            <p className="text-muted-foreground leading-relaxed">
              Development finance in Perth provides funding for construction and development projects across Western Australia's resource-driven property market. From residential subdivisions in Perth's northern and southern growth corridors to commercial developments serving the mining sector, industrial facilities in strategic logistics hubs, and regional mining accommodation projects, Perth development finance enables developers, builders, and investors to capitalize on Western Australia's resource sector cycles, population growth, and infrastructure investment in transport and employment precincts.
            </p>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Development Finance Matters in Perth</h2>
            
              <p className="text-muted-foreground leading-relaxed mb-4">
                Perth's property development landscape is uniquely influenced by resource sector cycles, with mining industry employment and investment driving population growth, housing demand, and commercial property requirements. The city's planning framework supports urban consolidation in established areas while accommodating expansion in northern corridors toward Two Rocks and southern growth areas extending to Mandurah and Pinjarra. Recent infrastructure investment including Metronet rail extensions, Perth Stadium precinct development, and industrial estate expansions creates development opportunities across residential, commercial, and industrial sectors.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Development finance addresses the capital requirements unique to Perth projects—land acquisition costs influenced by resource sector cycles, construction expenses in a competitive building environment with skilled labor often deployed to mining projects, extended development timelines, and the need for progressive capital deployment aligned with planning and construction milestones. Traditional bank development finance often imposes extensive presale requirements and applies conservative assessment during resource sector downturns. Specialist development financiers offer more flexible assessment, faster approvals, and structures accommodating diverse project types and resource sector exposure.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Perth's transparent property market, strong demand fundamentals during resource sector upturns, and growing construction industry capacity create an environment where well-structured development projects can access competitive finance. The city's diverse submarkets—from inner-city urban renewal precincts and established suburbs to outer growth corridors and regional mining centers—provide development opportunities across different price points, product types, and buyer demographics, with particularly strong demand for family housing, mining accommodation, and industrial facilities serving the resource sector.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Loan Suits</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Development finance in Perth is particularly well-suited for:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Property Developers</strong> undertaking residential subdivisions in growth corridors, townhouse or apartment developments near transport infrastructure, or commercial construction across Perth's metro and regional areas</li>
                <li><strong className="text-foreground">Builders</strong> constructing spec projects, display homes, or volume residential developments in outer suburban expansion areas or regional mining centers</li>
                <li><strong className="text-foreground">Investors</strong> funding industrial warehouse construction in logistics hubs, mining accommodation facilities, or building income-producing commercial or residential assets</li>
                <li><strong className="text-foreground">Business Owners</strong> developing owner-occupied premises, constructing industrial facilities serving the mining sector, or building retail or commercial premises in employment precincts</li>
                <li><strong className="text-foreground">Joint Ventures</strong> combining land holdings with development capital, partnering between established landowners and experienced developers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Development Finance Works</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Accessing development finance in Perth follows a structured process designed to assess feasibility and manage risk:
              </p>

              <ol className="space-y-3 text-muted-foreground list-decimal pl-6">
                <li><strong className="text-foreground">Project Assessment</strong> - Contact our team to discuss your development concept, site details, planning status, and funding requirements. We'll assess project feasibility and recommend appropriate lenders and finance structures.</li>
                <li><strong className="text-foreground">Feasibility Preparation</strong> - Prepare detailed project feasibility including quantity surveyor cost estimates, development timelines, market analysis considering resource sector exposure, and exit strategy. We can coordinate professional advisors as needed.</li>
                <li><strong className="text-foreground">Planning Status</strong> - Development finance requires either approved development applications or clear pathways to approval. We can structure pre-approval facilities for sites pending development approval.</li>
                <li><strong className="text-foreground">Lender Presentation</strong> - We present your project to specialist development financiers, securing competitive terms based on project type, location, developer track record, and equity contribution.</li>
                <li><strong className="text-foreground">Approval & Documentation</strong> - Lenders conduct independent valuations (land and "as if complete" assessments), assess feasibility, and issue formal approval subject to conditions. Legal documentation proceeds once conditions are satisfied.</li>
                <li><strong className="text-foreground">Progressive Drawdowns</strong> - Funds release progressively as construction milestones are achieved and verified by independent quantity surveyors or building certifiers. Interest typically capitalizes during construction.</li>
                <li><strong className="text-foreground">Project Exit</strong> - Upon completion, developments are sold (with proceeds repaying the facility) or refinanced to long-term investment funding if retained for rental income.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Benefits vs Going Direct to a Bank</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Working with a specialist development finance broker for Perth projects offers distinct advantages over direct bank approaches:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Faster Approvals</strong> - Specialist lenders assess projects in weeks rather than months, with streamlined credit processes focused on project feasibility and commercial merit</li>
                <li><strong className="text-foreground">Resource Sector Understanding</strong> - Non-bank lenders understand Perth's resource sector cycles and can assess developments on fundamentals rather than applying blanket conservative policies during sector downturns</li>
                <li><strong className="text-foreground">Flexible Presales</strong> - Many specialist lenders assess developments on end-value and market fundamentals rather than rigid presale percentages, particularly for established locations or experienced developers</li>
                <li><strong className="text-foreground">New Developer Access</strong> - First-time developers with strong professional teams, clear feasibility, and appropriate equity can access finance where banks typically require extensive track records</li>
                <li><strong className="text-foreground">Regional Project Capability</strong> - Mining accommodation, regional industrial developments, or projects in resource sector locations can be assessed on merit where banks apply conservative frameworks</li>
                <li><strong className="text-foreground">Perth Market Expertise</strong> - Brokers with Perth development experience understand local planning systems, resource sector dynamics, and feasibility drivers that support strong lending propositions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Real Perth Example</h2>

              <p className="text-muted-foreground leading-relaxed">
                A Perth developer identified a 4,000sqm infill site in Baldivis within the southern growth corridor, with approved DA for 16 townhouses targeting young families and mining sector workers. With construction costs of $4.2M and land valued at $1.6M, they required $4.8M development finance (having $1M equity). Traditional banks required 60% presales and were hesitant about resource sector exposure despite strong local employment from nearby industrial estates and mining service companies. We arranged specialist development finance with 25% presale requirements, approved in 3 weeks based on end-value assessment and strong local demand fundamentals. The development achieved 75% sold off-the-plan with remaining stock selling within 3 months of completion, delivering the developer 31% return on equity and positioning them for their next project in the northern corridor.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Requirements</h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                To qualify for development finance in Perth, you'll typically need:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li>Development site in Perth or regional Western Australia (owned or under contract)</li>
                <li>Approved development application or clear pathway to approval</li>
                <li>Detailed project feasibility: quantity surveyor cost estimates, timelines, market analysis, exit strategy</li>
                <li>Experienced development team: licensed builder, project manager, design professionals</li>
                <li>Equity contribution typically 20-35% of total development costs</li>
                <li>Evidence of developer experience or strong professional support team (particularly important for first-time developers)</li>
                <li>Standard business documentation: ABN registration, financial statements, bank statements, identification</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-4">
                Presale requirements vary by lender, project type, location, and developer experience. We can match you with lenders whose requirements align with your project stage and capability.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <FAQSection faqs={faqs} />
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Get Started</h2>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-8 my-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Apply Now for Development Finance in Perth</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Capitalize on Perth's development opportunities driven by resource sector growth, infrastructure investment, and population expansion. Our team understands Perth's unique market dynamics and can connect you with lenders who assess projects on feasibility and potential.
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
                <strong>Looking for this service in your area?</strong> Explore Commercial Development Finance in{" "}
                <Link to="/services/commercial-property-development/cities/sydney" className="text-accent hover:underline">Sydney</Link>,{" "}
                <Link to="/services/commercial-property-development/cities/melbourne" className="text-accent hover:underline">Melbourne</Link>,{" "}
                <Link to="/services/commercial-property-development/cities/brisbane" className="text-accent hover:underline">Brisbane</Link>,{" "}
                <Link to="/services/commercial-property-development/cities/perth" className="text-accent hover:underline">Perth</Link>,{" "}
                <Link to="/services/commercial-property-development/cities/adelaide" className="text-accent hover:underline">Adelaide</Link> and{" "}
                <Link to="/services/commercial-property-development/cities/gold-coast" className="text-accent hover:underline">Gold Coast</Link>.
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default CommercialDevelopmentPerth;
