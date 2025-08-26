import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { PiggyBank, TrendingUp, Shield, Phone, CheckCircle, ArrowRight } from "lucide-react";

const SMSFLending = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "SMSF Lending" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent">Super Fund Finance</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            SMSF Property Lending
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Specialized lending for Self-Managed Super Fund property investments. From $150K to $25M+ with compliant structures and competitive rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent-light text-accent-foreground">
              <Link to="/contact">Get Quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:0485952651">
                <Phone className="mr-2 h-5 w-5" />
                Call Specialist
              </a>
            </Button>
          </div>
        </div>

        {/* Key Features */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="premium-card">
              <CardHeader className="text-center">
                <PiggyBank className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Super Fund Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Leverage your super fund to build a diversified property portfolio with tax-effective investment structures.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Compliant Structures</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Ensure full compliance with SIS Act and ATO regulations through proper Limited Recourse Borrowing Arrangements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Wealth Building</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Build long-term wealth through property investment within your super fund with potential tax advantages.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SMSF Requirements */}
        <section className="mb-16">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-2xl">SMSF Lending Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Eligibility Criteria</h3>
                  <ul className="space-y-3">
                    {[
                      "Established SMSF with minimum $200K balance",
                      "Clean audit history and compliance record",
                      "Investment strategy allowing property",
                      "Professional fund administration",
                      "Personal guarantees from members"
                    ].map((criteria, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Property Types</h3>
                  <ul className="space-y-3">
                    {[
                      "Residential investment properties",
                      "Commercial office and retail",
                      "Industrial and warehouse facilities",
                      "Vacant land for development",
                      "Strata-titled commercial units"
                    ].map((property, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{property}</span>
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
              Maximize Your Super Fund Potential
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Don't let your super fund sit idle. Our SMSF lending specialists can help you leverage property investment to build long-term wealth within your fund.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <Link to="/contact">
                  Start Planning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href="tel:0485952651">Call SMSF Expert</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SMSFLending;