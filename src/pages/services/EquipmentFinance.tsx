import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Settings, Truck, Factory, Phone, CheckCircle, ArrowRight } from "lucide-react";

const EquipmentFinance = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Equipment Finance" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent">Asset Finance</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Equipment Finance Solutions
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Finance business equipment, machinery, and vehicles with flexible terms. From $25K to $10M+ across all industries with competitive rates and fast approvals.
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
                <Settings className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>All Equipment Types</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Finance any business equipment including machinery, vehicles, IT equipment, and specialized industry tools.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Truck className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Fleet Finance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Comprehensive vehicle and fleet financing solutions for commercial vehicles, trucks, and specialized transport equipment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Factory className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Industrial Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Heavy machinery, manufacturing equipment, and industrial plant financing with flexible terms and competitive rates.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Finance Options */}
        <section className="mb-16">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-2xl">Equipment Finance Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Finance Types</h3>
                  <ul className="space-y-3">
                    {[
                      "Chattel mortgage (ownership)",
                      "Equipment lease (operating lease)",
                      "Finance lease (capital lease)",
                      "Hire purchase agreements",
                      "Novated leasing for vehicles"
                    ].map((type, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Equipment Categories</h3>
                  <ul className="space-y-3">
                    {[
                      "Manufacturing and production equipment",
                      "Construction and earthmoving machinery",
                      "Commercial vehicles and trucks",
                      "Medical and healthcare equipment",
                      "IT and office equipment"
                    ].map((category, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{category}</span>
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
              Ready to Upgrade Your Equipment?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Don't let equipment costs hold back your business growth. Our equipment finance specialists can structure the right solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <Link to="/contact">
                  Apply Now
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

export default EquipmentFinance;