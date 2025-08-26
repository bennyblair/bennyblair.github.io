import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { RefreshCw, TrendingDown, Calculator, Phone, CheckCircle, ArrowRight } from "lucide-react";

const RefinancingSolutions = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Refinancing Solutions" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent">Cost Reduction</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Commercial Refinancing Solutions
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Reduce your borrowing costs and improve cash flow with strategic commercial property refinancing. From $250K to $100M+ with competitive rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent-light text-accent-foreground">
              <Link to="/contact">Get Assessment</Link>
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
                <TrendingDown className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Rate Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Access better interest rates and terms by leveraging current market conditions and improved property values.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <RefreshCw className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Debt Restructure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Consolidate multiple loans into a single facility with improved terms and simplified management.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Calculator className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Cash Release</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Release equity from your commercial property for business expansion or investment opportunities.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-2xl">Refinancing Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Financial Advantages</h3>
                  <ul className="space-y-3">
                    {[
                      "Reduced interest rates and fees",
                      "Improved monthly cash flow",
                      "Access to additional funding",
                      "Tax-efficient debt structuring",
                      "Better loan terms and conditions"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Strategic Options</h3>
                  <ul className="space-y-3">
                    {[
                      "Consolidate multiple properties",
                      "Switch from P&I to interest-only",
                      "Access equity for expansion",
                      "Improve loan flexibility",
                      "Remove guarantors or security"
                    ].map((option, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{option}</span>
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
              Ready to Reduce Your Borrowing Costs?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Our refinancing specialists will assess your current loans and identify opportunities to save money and improve terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <Link to="/contact">
                  Start Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href="tel:0485952651">Speak to Expert</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RefinancingSolutions;