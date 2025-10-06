import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckCircle, Phone, ArrowRight, Home, Shield, Clock, DollarSign, TrendingUp, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const FirstSecondMortgages = () => {
  const benefits = [
    "First mortgages up to 80% LVR with competitive rates for commercial acquisitions",
    "Second mortgages for additional funding against existing property equity",
    "Flexible terms from 1-30 years with interest-only options available",
    "Fast approval typically 24-48 hours with experienced specialists",
    "Multiple property types: office, retail, industrial, investment properties",
    "Professional valuations and alternative documentation options"
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

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <DollarSign className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">$100K - $50M+</p>
              <p className="text-sm text-muted-foreground">Loan Amount</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">1-30 Years</p>
              <p className="text-sm text-muted-foreground">Terms</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">Up to 80%</p>
              <p className="text-sm text-muted-foreground">LVR (1st Mortgage)</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">24-48 Hours</p>
              <p className="text-sm text-muted-foreground">Approval Time</p>
            </CardContent>
          </Card>
        </div>

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
          <Card className="text-center bg-accent/5 border-accent/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Secure Your Commercial Mortgage?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get competitive first and second mortgage solutions tailored to your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:0485952651">Call Now</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FirstSecondMortgages;