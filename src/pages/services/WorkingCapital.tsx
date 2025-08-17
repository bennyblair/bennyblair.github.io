import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckCircle, Phone, ArrowRight, Briefcase, Shield, Clock, DollarSign } from "lucide-react";

const WorkingCapital = () => {
  const benefits = [
    "Fast access to funds",
    "Flexible repayment terms",
    "No fixed asset security required",
    "Revolving credit facilities",
    "Seasonal funding options",
    "Competitive interest rates"
  ];

  const features = [
    "Business lines of credit",
    "Overdraft facilities",
    "Invoice finance solutions",
    "Trade finance facilities",
    "Equipment rental finance",
    "Seasonal business funding"
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Working Capital" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Working Capital
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Short-term business operational funding to support cash flow and growth. 
            Flexible working capital solutions from $50K to $20M+ with fast approval.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent-light text-accent-foreground">
              <a href="tel:0485952651">
                <Phone className="mr-2 h-5 w-5" />
                Call 0485 952 651
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Get Quote</a>
            </Button>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="premium-card">
            <CardHeader>
              <div className="p-4 bg-accent/10 rounded-xl w-fit mb-4">
                <Briefcase className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Funding Solutions</CardTitle>
              <CardDescription>
                Comprehensive working capital options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <div className="p-4 bg-primary/10 rounded-xl w-fit mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Key Benefits</CardTitle>
              <CardDescription>
                Why choose our working capital solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Loan Details */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Facility <span className="gradient-text">Details</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Flexible terms designed for business cash flow needs
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="p-6">
                <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Facility Size</h3>
                <p className="text-2xl font-bold text-accent mb-1">$50K - $20M+</p>
                <p className="text-sm text-muted-foreground">Scalable facilities</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Terms</h3>
                <p className="text-2xl font-bold text-primary mb-1">3-24 Months</p>
                <p className="text-sm text-muted-foreground">Short-term funding</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Security</h3>
                <p className="text-2xl font-bold text-accent mb-1">Flexible</p>
                <p className="text-sm text-muted-foreground">Business assets</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Approval</h3>
                <p className="text-2xl font-bold text-primary mb-1">24-48 Hours</p>
                <p className="text-sm text-muted-foreground">Fast decisions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">
              Ready to Improve Your Cash Flow?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Contact our working capital specialists to discuss your business funding needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-accent hover:bg-accent-dark text-accent-foreground"
              >
                <a href="/contact">Start Application</a>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <a href="tel:0485952651">Call Now</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WorkingCapital;