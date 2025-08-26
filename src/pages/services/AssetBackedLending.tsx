import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Shield, Building, Coins, Phone, CheckCircle, ArrowRight } from "lucide-react";

const AssetBackedLending = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Asset-Backed Lending" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent">Secured Finance</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Asset-Backed Lending
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Unlock the value in your business assets with secured lending solutions. From $250K to $200M+ against property, equipment, inventory, and receivables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent-light text-accent-foreground">
              <Link to="/contact">Get Valuation</Link>
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
                <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Secured Lending</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Leverage your valuable business assets as security for competitive interest rates and flexible terms.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Building className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Multiple Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Use property, equipment, inventory, receivables, or business goodwill as security for your loan facility.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Coins className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Higher Leverage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Access higher loan amounts and better terms by utilizing the full value of your business asset portfolio.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Asset Types */}
        <section className="mb-16">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-2xl">Acceptable Security Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Tangible Assets</h3>
                  <ul className="space-y-3">
                    {[
                      "Commercial real estate properties",
                      "Manufacturing and production equipment",
                      "Vehicle fleets and specialized transport",
                      "Inventory and stock holdings",
                      "Plant and machinery"
                    ].map((asset, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{asset}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Financial Assets</h3>
                  <ul className="space-y-3">
                    {[
                      "Accounts receivable and invoices",
                      "Contract revenue streams",
                      "Investment portfolios",
                      "Business goodwill and intangibles",
                      "Future cash flows and royalties"
                    ].map((asset, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{asset}</span>
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
              Unlock Your Asset Value Today
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Your business assets could be the key to accessing significant funding. Let our specialists assess your assets and structure the optimal lending solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <Link to="/contact">
                  Asset Assessment
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

export default AssetBackedLending;