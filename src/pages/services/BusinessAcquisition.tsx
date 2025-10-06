import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Briefcase, TrendingUp, Target, Phone, CheckCircle, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const BusinessAcquisition = () => {
  const keyTakeaways = [
    "Business acquisition finance from $200K to $50M+ for purchasing established operating businesses",
    "Flexible deal structures including 100% funding, management buyouts, and vendor finance arrangements",
    "Strategic growth through acquisition allows rapid expansion without building from scratch",
    "Expert deal structuring with earnouts, contingent payments, and leveraged buyout options",
    "Fast approval process for time-sensitive acquisition opportunities with competitive terms"
  ];

  const faqs = [
    {
      question: "What is business acquisition finance and how does it work?",
      answer: "Business acquisition finance provides funding to purchase existing businesses, allowing you to expand operations, enter new markets, or consolidate industry positions. The finance is secured against business assets, cash flows, or additional security, enabling purchase of established operations with proven revenue streams and customer bases."
    },
    {
      question: "How much can I borrow for business acquisitions?",
      answer: "Acquisition finance ranges from $200,000 to $50M+ depending on the target business value, your financial capacity, and deal structure. Most lenders offer 60-80% of purchase price, requiring you to contribute 20-40% equity. The amount depends on target business cash flows, asset values, and your ability to service debt."
    },
    {
      question: "What types of businesses can be acquired with finance?",
      answer: "We finance acquisitions across all industries including manufacturing, retail, services, healthcare, technology, and hospitality businesses. Target businesses should have established operations, proven profitability, quality management systems, and growth potential. Distressed acquisitions and turnaround situations are also considered."
    },
    {
      question: "What deal structures are available for acquisitions?",
      answer: "Deal structures include 100% business acquisition funding, management buyouts (MBO), leveraged buyouts (LBO), vendor finance arrangements, earnout structures, and contingent payment deals. Each structure is tailored to buyer capacity, seller requirements, and business risk profile to optimize transaction success."
    },
    {
      question: "How long does acquisition finance approval take?",
      answer: "Acquisition finance approval typically takes 2-4 weeks depending on deal complexity, due diligence requirements, and documentation completeness. Time-sensitive opportunities can be fast-tracked with preliminary approvals within 48-72 hours, allowing you to proceed with confidence in competitive situations."
    },
    {
      question: "What due diligence is required for acquisition financing?",
      answer: "Due diligence includes financial audit, legal review, operational assessment, market analysis, and management evaluation. We require 3 years of target business financials, tax returns, customer/supplier analysis, lease agreements, and growth projections. Professional advisors conduct detailed reviews to identify risks and opportunities."
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Business Acquisition" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent">Growth Finance</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Business Acquisition Finance
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Secure funding to acquire established businesses and expand your operations. From $200K to $50M+ with flexible terms and strategic structuring.
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

        {/* Key Features */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="premium-card">
              <CardHeader className="text-center">
                <Briefcase className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Business Purchase</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Finance the acquisition of established businesses across all industries with proven track records and growth potential.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Strategic Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Expand your business empire through strategic acquisitions with flexible financing structures and competitive terms.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Target className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Deal Structuring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Expert deal structuring including vendor finance, earnouts, and management buyouts to optimize acquisition terms.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What is Business Acquisition Finance */}
        <section className="mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">What is Business Acquisition Finance?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Business acquisition finance provides funding to purchase existing businesses with established operations, proven 
                revenue streams, and customer bases. This enables rapid expansion into new markets or consolidation of industry 
                positions without building from scratch.
              </p>
              <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground">
                  <strong>Learn more:</strong> Read our comprehensive <Link to="/resources/guides/business-acquisition-finance-australia" className="text-accent hover:underline">Business Acquisition Guide</Link> for detailed information.
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
              <h2 className="text-2xl font-bold mb-6">Related Finance Solutions</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/services/private-lending" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Private Lending</h3>
                  <p className="text-sm text-muted-foreground">Fast non-bank finance</p>
                </Link>
                <Link to="/services/working-capital" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Working Capital</h3>
                  <p className="text-sm text-muted-foreground">Operational funding</p>
                </Link>
                <Link to="/services/asset-backed-lending" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Asset-Backed Lending</h3>
                  <p className="text-sm text-muted-foreground">Secured financing</p>
                </Link>
                <Link to="/contact" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Deal Assessment</h3>
                  <p className="text-sm text-muted-foreground">Free consultation</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Acquisition Types */}
        <section className="mb-16">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-2xl">Acquisition Finance Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Finance Structures</h3>
                  <ul className="space-y-3">
                    {[
                      "100% business acquisition funding",
                      "Management buyout finance",
                      "Leveraged buyout structures",
                      "Vendor finance arrangements",
                      "Earnout and contingent payments"
                    ].map((structure, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{structure}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Acquisition Types</h3>
                  <ul className="space-y-3">
                    {[
                      "Established operating businesses",
                      "Industry consolidation plays",
                      "Complementary business add-ons",
                      "Distressed asset acquisitions",
                      "Family business succession"
                    ].map((type, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Stats */}
        <section className="mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Acquisition Finance <span className="gradient-text">at a Glance</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="p-6">
                  <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Loan Amount</h3>
                  <p className="text-2xl font-bold text-accent mb-1">$200K - $50M+</p>
                  <p className="text-sm text-muted-foreground">Business value based</p>
                </div>
                <div className="p-6">
                  <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">LVR</h3>
                  <p className="text-2xl font-bold text-primary mb-1">60-80%</p>
                  <p className="text-sm text-muted-foreground">Of purchase price</p>
                </div>
                <div className="p-6">
                  <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Approval</h3>
                  <p className="text-2xl font-bold text-accent mb-1">2-4 Weeks</p>
                  <p className="text-sm text-muted-foreground">Standard timeline</p>
                </div>
                <div className="p-6">
                  <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Fast Track</h3>
                  <p className="text-2xl font-bold text-primary mb-1">48-72 Hours</p>
                  <p className="text-sm text-muted-foreground">Pre-approval</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">
              Ready to Grow Through Acquisition?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Don't let funding constraints limit your growth opportunities. Our acquisition finance specialists can structure deals that maximize your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <Link to="/contact">
                  Discuss Opportunity
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
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

export default BusinessAcquisition;