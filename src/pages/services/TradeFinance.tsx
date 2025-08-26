import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Globe, Ship, CreditCard, Phone, CheckCircle, ArrowRight } from "lucide-react";

const TradeFinance = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Trade Finance" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent">Import/Export Finance</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Trade Finance Solutions
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Comprehensive import/export financing to support your international trade operations. From $100K to $25M+ with flexible terms and global reach.
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
                <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Global Trade</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Support your international business with comprehensive trade finance solutions for imports, exports, and global operations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Ship className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Supply Chain</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Optimize your supply chain cash flow with invoice financing, inventory funding, and purchase order finance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <CreditCard className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Trade Instruments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Access letters of credit, bank guarantees, and other trade instruments to secure international transactions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Trade Services */}
        <section className="mb-16">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-2xl">Trade Finance Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Import Finance</h3>
                  <ul className="space-y-3">
                    {[
                      "Import letters of credit",
                      "Inventory and stock funding",
                      "Pre-shipment finance",
                      "Documentary collections",
                      "Foreign exchange hedging"
                    ].map((service, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Export Finance</h3>
                  <ul className="space-y-3">
                    {[
                      "Export invoice factoring",
                      "Pre-export finance",
                      "Export credit insurance",
                      "Performance guarantees",
                      "Multi-currency facilities"
                    ].map((service, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{service}</span>
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
              Expand Your Global Reach
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Don't let trade finance complexity limit your international growth. Our specialists understand global trade and can structure solutions that work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <Link to="/contact">
                  Discuss Requirements
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

export default TradeFinance;