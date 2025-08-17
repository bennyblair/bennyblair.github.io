import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckCircle, Phone, ArrowRight, Home, Shield, Clock, DollarSign } from "lucide-react";

const FirstSecondMortgages = () => {
  const benefits = [
    "Primary and secondary mortgage options",
    "Competitive interest rates",
    "Flexible repayment terms",
    "Fast approval process",
    "Professional property valuations",
    "Interest-only payment options"
  ];

  const features = [
    "First mortgage lending up to 80% LVR",
    "Second mortgage solutions",
    "Investment property mortgages",
    "Commercial property mortgages",
    "Self-managed super fund (SMSF) lending",
    "No bank statement requirements available"
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "1st & 2nd Mortgages" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            1st & 2nd Mortgages
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Primary and secondary mortgage financing solutions for commercial and investment properties. 
            Competitive rates with flexible terms from $100K to $50M+.
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
                <Home className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">What We Offer</CardTitle>
              <CardDescription>
                Comprehensive mortgage solutions for all property types
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
                Why choose our mortgage solutions
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
                Loan <span className="gradient-text">Details</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Flexible terms designed for your property investment needs
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="p-6">
                <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Loan Amount</h3>
                <p className="text-2xl font-bold text-accent mb-1">$100K - $50M+</p>
                <p className="text-sm text-muted-foreground">Flexible loan sizes</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Terms</h3>
                <p className="text-2xl font-bold text-primary mb-1">1-30 Years</p>
                <p className="text-sm text-muted-foreground">Flexible repayment terms</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">LVR</h3>
                <p className="text-2xl font-bold text-accent mb-1">Up to 80%</p>
                <p className="text-sm text-muted-foreground">First mortgage lending</p>
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
              Ready to Secure Your Mortgage?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Contact our mortgage specialists to discuss your requirements and get competitive quotes.
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

export default FirstSecondMortgages;