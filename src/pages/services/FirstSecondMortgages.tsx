import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckCircle, Phone, ArrowRight, Home, Shield, Clock, DollarSign, TrendingUp, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const FirstSecondMortgages = () => {
  const keyTakeaways = [
    "First mortgages offer up to 80% LVR with competitive rates for commercial property acquisitions",
    "Second mortgages provide additional funding against existing property equity for business expansion",
    "Flexible terms from 1-30 years with options for interest-only periods during business growth phases",
    "Fast approval process typically 24-48 hours with experienced commercial mortgage specialists",
    "Multiple property types accepted including office, retail, industrial, and investment properties"
  ];

  const benefits = [
    "Primary and secondary commercial mortgage options",
    "Competitive commercial interest rates", 
    "Flexible business-oriented repayment terms",
    "Fast commercial approval process",
    "Professional commercial property valuations",
    "Interest-only payment options for businesses"
  ];

  const features = [
    "First mortgage lending up to 80% LVR for commercial properties",
    "Second mortgage solutions for business expansion", 
    "Investment property mortgages for portfolio growth",
    "Commercial property mortgages across all sectors",
    "Self-managed super fund (SMSF) commercial lending",
    "Alternative documentation commercial loans"
  ];

  const faqs = [
    {
      question: "What's the difference between first and second mortgages?",
      answer: "A first mortgage is the primary loan on a property with lower rates (up to 80% LVR). A second mortgage provides additional funding against remaining equity without refinancing the first."
    },
    {
      question: "How quickly can commercial mortgages be approved?",
      answer: "Pre-approval typically takes 24-48 hours, with full settlement possible within 5-10 business days."
    },
    {
      question: "What commercial property types are acceptable?",
      answer: "We accept office, retail, industrial, mixed-use, and investment properties with clear title and adequate valuation."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Commercial 1st & 2nd Mortgages Australia | Emet Capital</title>
        <meta 
          name="description" 
          content="Secure commercial first and second mortgages from $100K-$50M+. Fast approval, competitive rates, flexible terms for business property finance." 
        />
        <meta name="keywords" content="commercial mortgage, first mortgage, second mortgage, commercial property finance, business property loans" />
        <link rel="canonical" href="https://emetcapital.com.au/services/first-second-mortgages" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "1st & 2nd Mortgages" }
          ]} />

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Commercial Property Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Commercial 1st & 2nd Mortgages
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Specialized commercial mortgage financing for first and second mortgages on investment and business properties. 
              Fast approval commercial lending from $100K to $50M+ across Australia.
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

        {/* Key Benefits */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl">Key Benefits</CardTitle>
            <CardDescription>
              Professional commercial mortgage solutions for your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Loan Details */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Loan <span className="gradient-text">Details</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Flexible terms designed for your property investment needs
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="p-6">
                <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Loan Amount</h3>
                <p className="text-2xl font-bold text-accent mb-1">$100K - $50M+</p>
                <p className="text-sm text-muted-foreground">Flexible loan sizes</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Terms</h3>
                <p className="text-2xl font-bold text-primary mb-1">1-30 Years</p>
                <p className="text-sm text-muted-foreground">Flexible repayment terms</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">LVR</h3>
                <p className="text-2xl font-bold text-accent mb-1">Up to 80%</p>
                <p className="text-sm text-muted-foreground">First mortgage lending</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Approval</h3>
                <p className="text-2xl font-bold text-primary mb-1">24-48 Hours</p>
                <p className="text-sm text-muted-foreground">Fast decisions</p>
              </div>
            </div>
          </CardContent>
        </Card>

          {/* What are Commercial Mortgages */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">What are Commercial 1st & 2nd Mortgages?</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Commercial first and second mortgages are specialized lending products secured against commercial or investment properties. 
                First mortgages offer up to 80% LVR with competitive rates, while second mortgages provide additional funding against 
                remaining equity without refinancing the first mortgage.
              </p>
              <Button asChild variant="outline">
                <Link to="/resources/guides/first-and-second-mortgages-for-business">
                  Read Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Internal Links Section */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Related Commercial Finance Solutions</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link to="/services/refinancing-solutions" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Refinancing Solutions</h3>
                    <p className="text-sm text-muted-foreground">Reduce costs with better mortgage terms</p>
                  </Link>
                  <Link to="/services/commercial-property-development" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Development Finance</h3>
                    <p className="text-sm text-muted-foreground">Fund commercial property projects</p>
                  </Link>
                  <Link to="/services/smsf-lending" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">SMSF Lending</h3>
                    <p className="text-sm text-muted-foreground">Super fund property investments</p>
                  </Link>
                  <Link to="/contact" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Learn About Your Options</h3>
                    <p className="text-sm text-muted-foreground">Discuss your requirements</p>
                  </Link>
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

          {/* CTA Section */}
          <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
            <div className="max-w-3xl mx-auto px-8">
              <h2 className="text-3xl font-bold text-primary-foreground mb-6">
                Ready to Secure Your Commercial Mortgage?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Our experienced commercial mortgage brokers will assess your needs and connect you with competitive lenders. 
                From first mortgages to second mortgage solutions, we'll structure the right financing for your business goals.
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
                  <a href="tel:0485952651">Call Specialist</a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default FirstSecondMortgages;