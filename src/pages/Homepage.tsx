import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  FileText, 
  Banknote, 
  TrendingUp, 
  Shield, 
  Truck,
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  DollarSign
} from "lucide-react";

const Homepage = () => {
  const services = [
    {
      icon: Building2,
      title: "Asset Finance",
      description: "Equipment, vehicle, and machinery financing solutions for Australian businesses.",
      features: ["Equipment Loans", "Vehicle Finance", "Plant & Machinery"]
    },
    {
      icon: FileText,
      title: "Debtor/Invoice Finance",
      description: "Unlock cash flow with accounts receivable and invoice factoring.",
      features: ["Invoice Factoring", "Debtor Finance", "Cash Flow Solutions"]
    },
    {
      icon: Banknote,
      title: "Bridging & Caveat Loans",
      description: "Short-term property finance for time-sensitive opportunities.",
      features: ["Bridging Finance", "Caveat Loans", "Quick Settlement"]
    },
    {
      icon: TrendingUp,
      title: "Working Capital",
      description: "Flexible funding to support day-to-day business operations.",
      features: ["Line of Credit", "Overdraft", "Trade Finance"]
    },
    {
      icon: Shield,
      title: "Development & Construction",
      description: "Specialized finance for property development and construction projects.",
      features: ["Development Finance", "Construction Loans", "Progress Payments"]
    },
    {
      icon: Truck,
      title: "Trade & Import/Export",
      description: "International trade finance and import/export funding solutions.",
      features: ["Trade Finance", "Letters of Credit", "Import/Export Loans"]
    }
  ];

  const stats = [
    {
      icon: DollarSign,
      value: "$500M+",
      label: "Loans Facilitated"
    },
    {
      icon: Users,
      value: "2,000+",
      label: "Happy Clients"
    },
    {
      icon: Clock,
      value: "15+ Years",
      label: "Industry Experience"
    },
    {
      icon: Building2,
      value: "100+",
      label: "Lender Partners"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Australia's Leading Commercial Lending Specialists
            </h1>
            <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-8">
              Expert commercial finance brokerage connecting Australian businesses with the right funding solutions. From asset finance to development loans, we secure competitive rates and terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-accent hover:bg-accent-dark text-accent-foreground font-semibold"
              >
                <Link to="/contact">Get Your Quote Today</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/resources">Explore Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Comprehensive Commercial Lending Solutions
            </h2>
            <p className="text-lg text-muted-foreground">
              As Australia's trusted commercial lending brokers, we specialize in non-retail finance solutions across all major business sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <service.icon className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Why Australian Businesses Choose Emet Capital
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Expert Market Knowledge</h3>
                    <p className="text-muted-foreground">15+ years of commercial lending experience across all Australian markets and industries.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Extensive Lender Network</h3>
                    <p className="text-muted-foreground">Access to 100+ lenders including banks, non-banks, and private funders for competitive rates.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Fast Approvals</h3>
                    <p className="text-muted-foreground">Streamlined processes and strong lender relationships mean faster decisions and settlements.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">No Upfront Fees</h3>
                    <p className="text-muted-foreground">We only get paid when your loan settles - our success depends on yours.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:text-center">
              <Card className="p-8 bg-card">
                <CardContent className="space-y-6">
                  <h3 className="text-2xl font-bold text-foreground">Ready to Get Started?</h3>
                  <p className="text-muted-foreground">
                    Get a free consultation and quote for your commercial lending needs. Our experts are standing by to help.
                  </p>
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
                  >
                    <Link to="/contact">
                      Contact Our Team
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Or explore our comprehensive resources library
                    </p>
                    <Button asChild variant="outline" className="mt-2">
                      <Link to="/resources">Browse Resources</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;