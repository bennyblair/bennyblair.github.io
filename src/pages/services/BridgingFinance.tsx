import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Building2, Clock, DollarSign, Phone, CheckCircle, ArrowRight } from "lucide-react";

const BridgingFinance = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Bridging Finance" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent">Short-Term Finance</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Bridging Finance Solutions
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Fast, flexible bridging loans to help you secure property opportunities without waiting for existing sales. From $200K to $50M+ with quick settlements.
          </p>
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

        {/* Key Features */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="premium-card">
              <CardHeader className="text-center">
                <Building2 className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Property Bridging</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Bridge the gap between property purchases and sales with fast, flexible short-term finance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Quick Settlement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Settlements from 5 business days with pre-approved facilities available for repeat clients.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <DollarSign className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Flexible Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Terms from 3-18 months with interest-only payments and flexible exit strategies.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Loan Details */}
        <section className="mb-16">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-2xl">Loan Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Key Details</h3>
                  <ul className="space-y-3">
                    {[
                      "Loan amounts: $200K - $50M+",
                      "Terms: 3-18 months typically",
                      "Interest rates: From 7.5% p.a.",
                      "LVR: Up to 80% of property value",
                      "Settlement: From 5 business days"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Common Uses</h3>
                  <ul className="space-y-3">
                    {[
                      "Property purchase before sale",
                      "Auction finance",
                      "Development site acquisition",
                      "Refinancing existing debt",
                      "Time-sensitive opportunities"
                    ].map((use, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{use}</span>
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
              Need Bridging Finance Fast?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Don't let timing stop you from securing the right property. Our bridging finance experts can structure a solution within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <Link to="/contact">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href="tel:0485952651">Call Expert</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BridgingFinance;