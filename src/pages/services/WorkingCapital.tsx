import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Phone, FileText, Briefcase, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FAQSection, { FAQItem } from "@/components/FAQSection";

const WorkingCapital = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of security are accepted?",
      answer: "Property, equipment, inventory, receivables, or a combination of business assets. Some lenders offer unsecured options for established businesses with strong financials."
    },
    {
      question: "How fast can approval take?",
      answer: "Initial assessments typically within 24-48 hours for straightforward applications. Approval timeframes depend on security type and documentation completeness."
    },
    {
      question: "Are these loans available Australia-wide?",
      answer: "Yes, working capital finance is available for businesses across all Australian states and territories through our national lender network."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, this is commercial lending for business operational purposes only. Consumer finance is not offered."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Working Capital Finance Solutions Australia | Emet Capital</title>
        <meta 
          name="description" 
          content="Access working capital from $50K-$20M+ with flexible credit lines and fast approval for business cash flow needs across Australia." 
        />
        <meta name="keywords" content="working capital, business cash flow, revolving credit, business finance, operational funding" />
        <link rel="canonical" href="https://emetcapital.com.au/services/working-capital" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Working Capital" }
          ]} />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Cash Flow Solutions</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Working Capital Finance
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
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Working Capital Finance?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Working capital finance provides short-term funding for day-to-day business operations, enabling companies to manage cash flow fluctuations, fund inventory purchases, cover operational expenses, and bridge timing gaps between receivables and payables. These facilities offer flexible access to capital without long-term commitments, supporting ongoing business operations through revolving credit lines, overdrafts, and short-term loans.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Funding structures include revolving credit facilities allowing repeated drawdowns and repayments, term loans for specific working capital needs, and invoice finance converting receivables to immediate cash. Security requirements vary from unsecured facilities for strong businesses to asset-backed arrangements utilizing property, equipment, inventory, or receivables. Repayment terms align with business cash flow cycles, providing operational flexibility.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Working capital finance serves business owners, companies, contractors, and operators across all industries requiring operational funding. Retailers and wholesalers utilize working capital for inventory management, while service businesses access funding for operational expenses and growth initiatives. Manufacturing businesses fund production cycles, and seasonal businesses manage cash flow fluctuations through working capital facilities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer finance is provided. Borrowers require appropriate business structures (ABN/ACN), demonstrated trading history, and capacity to service debt from business operations. Both established businesses and growing companies benefit from flexible working capital solutions tailored to commercial lending requirements and operational cash flow patterns.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we provide access to over 50 lenders nationwide, including major banks, specialist working capital providers, and alternative funders. Our lender relationships encompass traditional institutions and non-bank alternatives specializing in business cash flow solutions. We match clients with lenders offering appropriate facility structures, competitive pricing, and terms aligned with operational requirements.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We guide clients through facility structuring, lender selection, and application processes. Our expertise includes secured and unsecured options, revolving facilities, and specialized structures like invoice finance or inventory funding. Approval timeframes are significantly faster than direct applications, with streamlined processes and experienced guidance. We structure flexible arrangements compared to traditional bank constraints, accommodating diverse business models and cash flow patterns.
              </p>
            </section>

            {/* Key features & benefits */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Key Features & Benefits</h2>
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
                      Finance available from $50,000 to $20M+ with flexible terms from 6 months to 3 years. Revolving facilities provide ongoing access as needs arise.
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
                      Supports operational expenses, inventory purchases, payroll funding, seasonal cash flow management, growth initiatives, and bridging receivable timing gaps.
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
                      Security may include property, equipment, inventory, receivables, or general business assets. Unsecured options available for established businesses with strong financials.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-accent" />
                      Streamlined Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Efficient assessment and approval processes designed for operational urgency. Broker expertise ensures appropriate facility structuring and quick decision-making.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires business purpose (no consumer lending), appropriate business structure (ABN/ACN), demonstrated trading history, and capacity to service debt from business operations. Documentation typically includes business financial statements, tax returns, and cash flow projections. Security requirements vary by lender and facility size, from unsecured for strong businesses to asset-backed arrangements.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our team for an initial assessment. We'll evaluate your business operations, cash flow requirements, and circumstances to identify optimal working capital solutions. Our process includes facility recommendation, lender selection, and guidance through to facility establishment.
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

            {/* FAQs */}
            <FAQSection faqs={faqs} />
          </div>

          {/* Related Services */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trade Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Import/export financing and supply chain solutions</p>
                  <Link to="/services/trade-finance" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Debt Consolidation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Simplify multiple business debts into one facility</p>
                  <Link to="/services/debt-consolidation" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Asset Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Equipment and machinery acquisition funding</p>
                  <Link to="/services/asset-finance" className="text-accent hover:underline inline-flex items-center text-sm">
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

export default WorkingCapital;