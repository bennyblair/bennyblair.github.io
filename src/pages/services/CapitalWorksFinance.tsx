import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Construction, TrendingUp, Building, Phone, CheckCircle, ArrowRight } from "lucide-react";

const CapitalWorksFinance = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Capital Works Finance" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent">Property Improvement</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Capital Works Finance
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Finance major building improvements, upgrades, and capital works projects. From $100K to $20M+ for strata, commercial, and investment properties.
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

        {/* Key Features */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="premium-card">
              <CardHeader className="text-center">
                <Construction className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Major Upgrades</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Fund significant building improvements including façade upgrades, common area renovations, and infrastructure projects.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Value Enhancement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Increase property values and rental yields through strategic capital improvements and modernization projects.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Building className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Strata Specialists</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Specialized expertise in strata capital works funding with flexible drawdown and repayment structures.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Project Types */}
        <section className="mb-16">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-2xl">Capital Works Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Building Improvements</h3>
                  <ul className="space-y-3">
                    {[
                      "Façade renovation and modernization",
                      "Common area upgrades and fit-outs",
                      "Energy efficiency improvements",
                      "Accessibility compliance upgrades",
                      "Fire safety system installations"
                    ].map((improvement, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Infrastructure Projects</h3>
                  <ul className="space-y-3">
                    {[
                      "Lift replacement and modernization",
                      "Pool and recreational facility upgrades",
                      "Car park improvements and security",
                      "Garden and landscaping projects",
                      "Building services and plant upgrades"
                    ].map((project, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{project}</span>
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
              Transform Your Property with Capital Works
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Don't let funding constraints limit your property improvement plans. Our capital works specialists can structure flexible finance for any project size.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <Link to="/contact">
                  Discuss Project
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
  );
};

export default CapitalWorksFinance;