import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Clock, Zap, Phone, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

const PrivateLending = () => {
  const keyTakeaways = [
    "Private lending provides flexible non-bank finance when traditional lenders can't meet your needs",
    "Rapid approvals from 24-48 hours with streamlined documentation and quick settlements from 5 days",
    "Flexible criteria accommodate complex situations including credit-impaired borrowers and unique deals",
    "Short-term focus with terms from 3-36 months and interest-only payment options for cash flow",
    "Relationship-based decision making allows creative structuring and personalized solutions"
  ];

  const faqs = [
    {
      question: "When should I consider private lending over traditional bank finance?",
      answer: "When you need fast approvals, have been declined by banks, or have time-sensitive opportunities that require flexible terms."
    },
    {
      question: "How quickly can private lending be arranged?",
      answer: "Approvals within 24-48 hours and settlements within 5-10 business days, much faster than bank processes."
    },
    {
      question: "Can private lending help if I have credit issues?",
      answer: "Yes, private lenders focus on security and exit strategy rather than credit history alone."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Private Lending Solutions Australia | Non-Bank Finance | Emet Capital</title>
        <meta 
          name="description" 
          content="Fast private lending when banks say no. Flexible non-bank finance from $100K-$100M+ with 24-48hr approvals. Property, business & bridging finance." 
        />
        <meta name="keywords" content="private lending, non-bank finance, alternative lending, private capital, bridging finance, development finance" />
        <link rel="canonical" href="https://emetcapital.com.au/services/private-lending" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Private Lending" }
          ]} />

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Non-Bank Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Private Lending Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Fast, flexible non-bank financing when traditional lenders can't meet your needs. From $100K to $100M+ with rapid approvals, creative structuring, and relationship-based decisions.
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
                  Call Now
                </a>
              </Button>
            </div>
          </div>

          {/* What is Private Lending */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">What is Private Lending?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Private lending provides fast, flexible non-bank finance when traditional lenders can't meet your needs. 
                  With approvals in 24-48 hours and focus on security rather than credit history, private lenders enable 
                  quick access to capital for time-sensitive opportunities.
                </p>
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <p className="text-sm text-muted-foreground">
                    <strong>Learn more:</strong> Read our comprehensive <Link to="/resources/guides/what-is-private-lending-australia" className="text-accent hover:underline">Private Lending Guide</Link> for detailed information.
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
                <h2 className="text-2xl font-bold mb-6">Related Private Finance Solutions</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link to="/services/bridging-finance" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Bridging Finance</h3>
                    <p className="text-sm text-muted-foreground">Short-term property finance</p>
                  </Link>
                  <Link to="/services/commercial-property-development" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Development Finance</h3>
                    <p className="text-sm text-muted-foreground">Property development funding</p>
                  </Link>
                  <Link to="/services/business-acquisition" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Acquisition Finance</h3>
                    <p className="text-sm text-muted-foreground">Business purchase funding</p>
                  </Link>
                  <Link to="/contact" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Quick Assessment</h3>
                    <p className="text-sm text-muted-foreground">Fast pre-approval</p>
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
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Rapid Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Fast-track approvals from 24-48 hours with streamlined documentation and quick decision-making processes.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Flexible Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Accommodate complex situations that traditional banks won't consider, with creative structuring and flexible terms.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader className="text-center">
                  <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Short-Term Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Ideal for time-sensitive opportunities with terms from 3-36 months and interest-only payment options.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Private Lending Benefits */}
          <section className="mb-16">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-2xl">Private Lending Advantages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Why Choose Private Lending</h3>
                    <ul className="space-y-3">
                      {[
                        "No lengthy bank approval processes",
                        "Flexible lending criteria and terms", 
                        "Quick settlements from 5 business days",
                        "Creative deal structuring options",
                        "Relationship-based decision making"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Common Use Cases</h3>
                    <ul className="space-y-3">
                      {[
                        "Property development finance",
                        "Business acquisition funding",
                        "Cash flow and working capital",
                        "Time-sensitive opportunities",
                        "Credit-impaired borrowers"
                      ].map((useCase, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Loan Types */}
          <section className="mb-16">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-2xl">Private Lending Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Property Finance</h3>
                    <ul className="space-y-3">
                      {[
                        "Development and construction finance",
                        "Bridging and interim funding",
                        "Commercial property acquisition",
                        "Residential investment loans",
                        "Land subdivision finance"
                      ].map((loan, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{loan}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Business Finance</h3>
                    <ul className="space-y-3">
                      {[
                        "Business acquisition funding",
                        "Working capital facilities",
                        "Equipment and asset finance",
                        "Debt consolidation loans",
                        "Urgent cash flow support"
                      ].map((loan, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{loan}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
            <div className="max-w-3xl mx-auto px-8">
              <h2 className="text-3xl font-bold text-primary-foreground mb-6">
                Need Finance Fast?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                When banks say no or take too long, private lenders can provide the solution. Our extensive network of private capital sources can fund your opportunity quickly with flexible terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                  <Link to="/contact">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <a href="tel:0485952651">Urgent Enquiry</a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PrivateLending;