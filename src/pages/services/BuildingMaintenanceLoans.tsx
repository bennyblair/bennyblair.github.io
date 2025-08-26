import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Wrench, Home, Shield, Phone, CheckCircle, ArrowRight } from "lucide-react";

const BuildingMaintenanceLoans = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Building Maintenance Loans" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent">Property Maintenance</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Building Maintenance Loans
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Finance essential building repairs and maintenance work for strata, commercial, and residential properties. From $25K to $5M+ with flexible repayment terms.
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
                <Wrench className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Essential Repairs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Fund critical building repairs including roof, plumbing, electrical, and structural maintenance work.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Home className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Strata Specialists</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Specialized lending for strata corporations and body corporate maintenance requirements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Asset Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Protect and maintain property values with timely maintenance and repair funding solutions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Loan Details */}
        <section className="mb-16">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-2xl">Maintenance Loan Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Loan Details</h3>
                  <ul className="space-y-3">
                    {[
                      "Loan amounts: $25K - $5M+",
                      "Terms: 1-15 years available",
                      "Interest rates: Competitive rates",
                      "Progressive drawdowns available",
                      "No early repayment penalties"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Eligible Works</h3>
                  <ul className="space-y-3">
                    {[
                      "Roof repairs and replacement",
                      "Painting and waterproofing",
                      "Plumbing and electrical work",
                      "Lift and mechanical repairs",
                      "Common area upgrades"
                    ].map((work, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{work}</span>
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
              Don't Delay Essential Maintenance
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Protect your property investment with timely maintenance funding. Our specialists understand building requirements and can arrange finance quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <Link to="/contact">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href="tel:0485952651">Speak to Specialist</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BuildingMaintenanceLoans;