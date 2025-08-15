import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  DollarSign,
  FileText,
  Calculator
} from "lucide-react";

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: Building2,
      title: "Private Commercial Lending",
      subtitle: "Fast, flexible commercial financing",
      description: "When traditional banks can't meet your timeline or requirements, our private commercial lending solutions provide the speed and flexibility you need.",
      features: [
        "Asset-backed commercial loans",
        "Business acquisition financing", 
        "Working capital solutions",
        "Equipment and machinery finance",
        "Commercial property loans"
      ],
      benefits: [
        "24-48 hour approvals possible",
        "Flexible terms and structures",
        "Competitive rates",
        "Minimal documentation required"
      ],
      loanRange: "$100K - $50M+",
      terms: "3-36 months typically"
    },
    {
      icon: TrendingUp,
      title: "Bridging & Development Finance", 
      subtitle: "Short-term funding for opportunities",
      description: "Bridge the gap between opportunity and permanent financing with our specialized bridging and development finance solutions.",
      features: [
        "Property development funding",
        "Construction finance",
        "Settlement bridging loans",
        "Renovation and fit-out finance",
        "Land acquisition funding"
      ],
      benefits: [
        "Fast settlement capabilities",
        "Interest-only payment options",
        "Progressive funding available",
        "Exit strategy flexibility"
      ],
      loanRange: "$200K - $100M+",
      terms: "6-24 months typically"
    },
    {
      icon: Shield,
      title: "Asset-Backed Lending",
      subtitle: "Leverage your assets for growth",
      description: "Unlock the value in your commercial property, equipment, or business assets to secure competitive funding solutions.",
      features: [
        "Commercial property leverage",
        "Equipment and machinery as security",
        "Business asset financing", 
        "Portfolio property lending",
        "Refinancing solutions"
      ],
      benefits: [
        "Higher lending amounts available",
        "Competitive interest rates",
        "Flexible repayment terms",
        "Quick asset valuations"
      ],
      loanRange: "$250K - $200M+",
      terms: "1-25 years available"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "Discuss your requirements and assess your situation",
      icon: Phone
    },
    {
      step: "02", 
      title: "Proposal & Structure",
      description: "Present tailored lending options and terms",
      icon: FileText
    },
    {
      step: "03",
      title: "Application & Assessment", 
      description: "Submit application to our lending partners",
      icon: Calculator
    },
    {
      step: "04",
      title: "Settlement & Funding",
      description: "Complete documentation and release funds",
      icon: DollarSign
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Commercial Lending Services
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Comprehensive commercial finance solutions tailored to your business needs. Fast approvals, competitive rates, and flexible terms across Australia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent-light text-accent-foreground">
              <a href="tel:0485952651">
                <Phone className="mr-2 h-5 w-5" />
                Call 0485 952 651
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Get Custom Quote</a>
            </Button>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`premium-card cursor-pointer transition-all duration-300 ${
                activeService === index ? 'ring-2 ring-accent shadow-lg' : ''
              }`}
              onClick={() => setActiveService(index)}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-6 bg-accent/10 rounded-2xl w-fit">
                  <service.icon className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-accent font-medium">
                  {service.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Loan Range:</span>
                    <span className="font-medium">{service.loanRange}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Terms:</span>
                    <span className="font-medium">{service.terms}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveService(index);
                  }}
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Details */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  {services[activeService].title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {services[activeService].description}
                </p>
                
                <h4 className="font-semibold mb-3">What We Offer:</h4>
                <ul className="space-y-2 mb-6">
                  {services[activeService].features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Key Benefits:</h4>
                <ul className="space-y-2 mb-6">
                  {services[activeService].benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <div className="bg-accent/5 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-accent mb-1">
                        {services[activeService].loanRange}
                      </div>
                      <div className="text-sm text-muted-foreground">Loan Range</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent mb-1">
                        {services[activeService].terms}
                      </div>
                      <div className="text-sm text-muted-foreground">Terms</div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-accent hover:bg-accent-light text-accent-foreground">
                  Discuss This Service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, streamlined steps to get your commercial finance approved and settled
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <Card key={index} className="premium-card text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-full w-fit">
                    <step.icon className="h-8 w-8 text-accent" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2">{step.step}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">
              Ready to Explore Your Options?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Contact our commercial lending specialists to discuss your specific requirements and explore tailored financing solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-accent hover:bg-accent-dark text-accent-foreground"
              >
                <a href="/contact">Start Your Application</a>
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

export default Services;