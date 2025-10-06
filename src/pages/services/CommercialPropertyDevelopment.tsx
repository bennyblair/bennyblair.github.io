import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckCircle, Phone, ArrowRight, Building2, Shield, Clock, DollarSign, TrendingUp, Hammer } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CommercialPropertyDevelopment = () => {
  const keyTakeaways = [
    "Development finance from $500K to $100M+ for land acquisition through to project completion",
    "Progressive funding releases aligned with construction milestones to optimize cash flow management",
    "Interest-only payment periods during construction with flexible exit strategies upon completion",
    "Professional project monitoring and quantity surveyor oversight for risk management",
    "Multiple development types supported including office, retail, industrial, and mixed-use projects"
  ];

  const faqs = [
    {
      question: "What is commercial property development finance?",
      answer: "Funding for commercial property projects from land acquisition through construction to completion, released progressively."
    },
    {
      question: "How much can I borrow for development projects?",
      answer: "From $500K to $100M+ with up to 75% of total development costs, requiring 25-30% equity contribution."
    },
    {
      question: "What types of commercial developments can be financed?",
      answer: "Office buildings, retail centers, industrial facilities, mixed-use projects, and subdivision developments."
    }
  ];

  const benefits = [
    "Progressive funding releases",
    "Interest-only during construction",
    "Professional project monitoring",
    "Flexible settlement terms",
    "Competitive development rates",
    "Experienced development team"
  ];

  const features = [
    "Land acquisition finance",
    "Construction and development funding",
    "Multi-stage project funding",
    "Pre-sales and off-the-plan finance",
    "Mixed-use development projects",
    "Subdivision and land development"
  ];

  return (
    <>
      <Helmet>
        <title>Commercial Property Development Finance Australia | Emet Capital</title>
        <meta 
          name="description" 
          content="Fund commercial property developments $500K-$100M+. Progressive releases, competitive rates, expert project monitoring across Australia." 
        />
        <meta name="keywords" content="commercial development finance, property development loans, construction finance, development funding" />
        <link rel="canonical" href="https://emetcapital.com.au/services/commercial-property-development" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Commercial Property Development" }
          ]} />

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Development Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Commercial Property Development Finance
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive development finance for commercial property projects from concept to completion. 
              Progressive funding from $500K to $100M+ with expert project monitoring and competitive terms.
            </p>
            
            {/* Key Takeaways */}
            <Card className="bg-muted/30 mb-8 text-left">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                  Key Takeaways
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-accent hover:bg-accent-light text-accent-foreground">
                <Link to="/contact">Get Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Expert
                </a>
              </Button>
            </div>
          </div>

          {/* What is Development Finance */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">What is Commercial Property Development Finance?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Commercial property development finance provides funding from land acquisition through construction to completion, 
                  with progressive releases aligned to verified milestones. This optimizes cash flow while managing risk throughout 
                  the development phase.
                </p>
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <p className="text-sm text-muted-foreground">
                    <strong>Learn more:</strong> Read our comprehensive <Link to="/resources/guides/commercial-property-development-finance" className="text-accent hover:underline">Development Finance Guide</Link> for detailed information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </section>

          {/* Internal Links */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Related Development Services</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link to="/services/bridging-finance" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Bridging Finance</h3>
                    <p className="text-sm text-muted-foreground">Short-term funding solutions</p>
                  </Link>
                  <Link to="/services/first-second-mortgages" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Commercial Mortgages</h3>
                    <p className="text-sm text-muted-foreground">Long-term property finance</p>
                  </Link>
                  <Link to="/services/working-capital" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Working Capital</h3>
                    <p className="text-sm text-muted-foreground">Operational funding needs</p>
                  </Link>
                  <Link to="/contact" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Expert Consultation</h3>
                    <p className="text-sm text-muted-foreground">Discuss your project</p>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Key Features */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="premium-card">
                <CardHeader className="text-center">
                  <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Land to Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Comprehensive funding from land acquisition through construction to project completion and settlement.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader className="text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Progressive Releases</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Funds released at verified construction milestones with professional quantity surveyor oversight.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader className="text-center">
                  <Hammer className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>All Project Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Office, retail, industrial, mixed-use, and subdivision developments across Australia.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

        {/* Loan Details */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Finance <span className="gradient-text">Details</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Structured financing for successful development projects
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="p-6">
                <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Loan Amount</h3>
                <p className="text-2xl font-bold text-accent mb-1">$500K - $100M+</p>
                <p className="text-sm text-muted-foreground">Development scale</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Terms</h3>
                <p className="text-2xl font-bold text-primary mb-1">6-24 Months</p>
                <p className="text-sm text-muted-foreground">Development duration</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">LVR</h3>
                <p className="text-2xl font-bold text-accent mb-1">Up to 75%</p>
                <p className="text-sm text-muted-foreground">Of total project cost</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Approval</h3>
                <p className="text-2xl font-bold text-primary mb-1">5-10 Days</p>
                <p className="text-sm text-muted-foreground">From submission</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">
              Ready to Fund Your Development Project?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Our development finance specialists understand the complexities of commercial property development. 
              We'll structure competitive funding with progressive releases to support your project from concept to completion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-accent hover:bg-accent-dark text-accent-foreground"
              >
                <Link to="/contact">
                  Start Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <a href="tel:0485952651">Call Development Specialist</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default CommercialPropertyDevelopment;