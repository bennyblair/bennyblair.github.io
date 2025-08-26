import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Clock, Zap, Phone, CheckCircle, ArrowRight } from "lucide-react";

const PrivateLending = () => {
  return (
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
            Fast, flexible non-bank financing when traditional lenders can't meet your needs. From $100K to $100M+ with rapid approvals and creative structuring.
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
                <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
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
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
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
                <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
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

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">
              Need Finance Fast?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              When banks say no or take too long, private lenders can provide the solution. Our extensive network of private capital sources can fund your opportunity quickly.
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
  );
};

export default PrivateLending;