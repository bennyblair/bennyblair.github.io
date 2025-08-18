import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
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
  Calculator,
  Home,
  Briefcase,
  ChevronDown,
  ChevronRight
} from "lucide-react";

const Services = () => {
  const [openSections, setOpenSections] = useState<string[]>(['property-finance']);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const serviceCategories = [
    {
      id: 'property-finance',
      title: 'Property Finance',
      icon: Building2,
      description: 'Comprehensive property financing solutions',
      services: [
        {
          title: '1st & 2nd Mortgages',
          description: 'Primary and secondary mortgage financing',
          link: '/services/first-second-mortgages',
          loanRange: '$100K - $50M+',
          terms: '1-30 years'
        },
        {
          title: 'Commercial Property Development',
          description: 'Development and construction financing',
          link: '/services/commercial-property-development',
          loanRange: '$500K - $100M+',
          terms: '6-24 months'
        },
        {
          title: 'Bridging Finance',
          description: 'Short-term property bridging loans',
          link: '/services/bridging-finance',
          loanRange: '$200K - $50M+',
          terms: '3-18 months'
        },
        {
          title: 'Refinancing Solutions',
          description: 'Property refinance and restructure',
          link: '/services/refinancing',
          loanRange: '$250K - $100M+',
          terms: '1-25 years'
        }
      ]
    },
    {
      id: 'strata-finance',
      title: 'Strata Finance',
      icon: Home,
      description: 'Specialized strata and community financing',
      services: [
        {
          title: 'Strata Finance',
          description: 'Strata corporation and body corporate loans',
          link: '/services/strata-finance',
          loanRange: '$50K - $10M+',
          terms: '1-20 years'
        },
        {
          title: 'Building Maintenance Loans',
          description: 'Major repairs and maintenance funding',
          link: '/services/maintenance-loans',
          loanRange: '$25K - $5M+',
          terms: '1-15 years'
        },
        {
          title: 'Capital Works Finance',
          description: 'Major building improvements and upgrades',
          link: '/services/capital-works',
          loanRange: '$100K - $20M+',
          terms: '2-25 years'
        }
      ]
    },
    {
      id: 'business-finance',
      title: 'Business Finance',
      icon: Briefcase,
      description: 'Business growth and operational financing',
      services: [
        {
          title: 'Working Capital',
          description: 'Short-term business operational funding',
          link: '/services/working-capital',
          loanRange: '$50K - $20M+',
          terms: '3-24 months'
        },
        {
          title: 'Equipment Finance',
          description: 'Machinery and equipment funding',
          link: '/services/equipment-finance',
          loanRange: '$25K - $10M+',
          terms: '1-10 years'
        },
        {
          title: 'Business Acquisition',
          description: 'Business purchase and expansion loans',
          link: '/services/business-acquisition',
          loanRange: '$200K - $50M+',
          terms: '1-15 years'
        },
        {
          title: 'Trade Finance',
          description: 'Import/export and trade financing',
          link: '/services/trade-finance',
          loanRange: '$100K - $25M+',
          terms: '30 days - 2 years'
        }
      ]
    },
    {
      id: 'specialized-finance',
      title: 'Specialized Finance',
      icon: Shield,
      description: 'Unique and complex financing solutions',
      services: [
        {
          title: 'Asset-Backed Lending',
          description: 'Loans secured by business assets',
          link: '/services/asset-backed-lending',
          loanRange: '$250K - $200M+',
          terms: '1-25 years'
        },
        {
          title: 'Private Lending',
          description: 'Non-bank private financing solutions',
          link: '/services/private-lending',
          loanRange: '$100K - $100M+',
          terms: '3-36 months'
        },
        {
          title: 'SMSF Lending',
          description: 'Self-managed super fund property loans',
          link: '/services/smsf-lending',
          loanRange: '$150K - $25M+',
          terms: '5-30 years'
        },
        {
          title: 'Debt Consolidation',
          description: 'Business debt restructure and consolidation',
          link: '/services/debt-consolidation',
          loanRange: '$100K - $50M+',
          terms: '1-20 years'
        }
      ]
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

        {/* Services Directory */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our <span className="gradient-text">Service Directory</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Browse our comprehensive range of commercial finance solutions. Click on any service to learn more about specific lending options.
            </p>
          </div>

          <div className="space-y-6">
            {serviceCategories.map((category) => (
              <Collapsible 
                key={category.id}
                open={openSections.includes(category.id)}
                onOpenChange={() => toggleSection(category.id)}
              >
                <Card className="premium-card">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-accent/5 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-accent/10 rounded-xl">
                            <category.icon className="h-8 w-8 text-accent" />
                          </div>
                          <div className="text-left">
                            <CardTitle className="text-2xl">{category.title}</CardTitle>
                            <CardDescription className="text-base mt-1">
                              {category.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-accent/10 text-accent">
                            {category.services.length} Services
                          </Badge>
                          {openSections.includes(category.id) ? (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.services.map((service, index) => (
                          <Card key={index} className="border-accent/20 hover:border-accent/40 transition-colors group">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-lg group-hover:text-accent transition-colors">
                                  {service.title}
                                </h4>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                              </div>
                              <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                                {service.description}
                              </p>
                              <div className="space-y-1 mb-4">
                                <div className="flex justify-between text-xs">
                                  <span className="text-muted-foreground">Range:</span>
                                  <span className="font-medium">{service.loanRange}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-muted-foreground">Terms:</span>
                                  <span className="font-medium">{service.terms}</span>
                                </div>
                              </div>
                              <Link 
                                to={service.link}
                                className="block w-full"
                              >
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full text-xs group-hover:bg-accent group-hover:text-accent-foreground"
                                >
                                  Learn More
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>

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