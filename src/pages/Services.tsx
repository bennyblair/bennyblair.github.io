import { useState } from "react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  ChevronRight,
  Users,
  Target,
  Award
} from "lucide-react";

const Services = () => {
  // All sections expanded by default
  const [openSections, setOpenSections] = useState<string[]>(['property-finance', 'business-finance', 'specialized-finance']);

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
          link: '/services/refinancing-solutions',
          loanRange: '$250K - $100M+',
          terms: '1-25 years'
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
          title: 'Asset Finance',
          description: 'Comprehensive asset and equipment financing',
          link: '/services/asset-finance',
          loanRange: '$50K - $10M+',
          terms: '2-7 years'
        },
        {
          title: 'Caveat Loans',
          description: 'Fast secured loans against property equity',
          link: '/services/caveat-loans',
          loanRange: '$100K - $20M+',
          terms: '1-12 months'
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

  const faqs = [
    {
      question: "What is a commercial loan?",
      answer: "A commercial loan is financing designed for business purposes, including property development, equipment purchases, working capital, and business expansion. Unlike personal loans, commercial loans are secured against business assets or property."
    },
    {
      question: "How fast can I get approved for commercial finance?",
      answer: "Approval times vary by loan type and complexity. Simple working capital loans can be approved within 24-48 hours, while complex development finance may take 2-4 weeks. Our streamlined process ensures the fastest possible approvals."
    },
    {
      question: "Do you work with private lenders?",
      answer: "Yes, we have access to 50+ lenders including major banks, non-bank lenders, private lenders, and specialist finance companies. This extensive network helps us secure competitive rates and flexible terms."
    },
    {
      question: "What security is required for commercial loans?",
      answer: "Security requirements depend on the loan type and amount. Options include property mortgages, business assets, equipment, debentures, or personal guarantees. We'll structure the most suitable security arrangement for your situation."
    },
    {
      question: "Can startups access commercial finance?",
      answer: "Yes, though requirements are stricter. New businesses typically need stronger personal guarantees, higher deposits, or additional security. We specialize in helping startups navigate commercial lending requirements."
    },
    {
      question: "What industries do you serve?",
      answer: "We work across all industries including property development, manufacturing, healthcare, professional services, retail, hospitality, construction, and technology. Our brokers understand industry-specific financing needs."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        "name": "Commercial Lending Services Australia",
        "description": "Professional commercial finance brokers providing business loans, property finance, and specialist lending solutions across Australia.",
        "url": "/services",
        "telephone": "0485952651",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "AU"
        },
        "serviceArea": {
          "@type": "Country",
          "name": "Australia"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Commercial Finance Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "FinancialProduct",
                "name": "Property Finance",
                "description": "Commercial property loans and development finance"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "FinancialProduct",
                "name": "Business Finance",
                "description": "Working capital, equipment finance, and business loans"
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

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
    <>
      <SEO 
        title="Commercial Lending Services Australia | Business Finance & Property Loans"
        description="Expert commercial finance brokers in Australia. Fast approvals on property finance, business funding, and specialist loans. Access 50+ lenders with competitive rates."
        canonical="/services"
        keywords="commercial lending Australia, business finance brokers, commercial loans, property finance, private lending solutions, development finance Australia"
        schemas={[structuredData]}
      />

      <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Commercial Lending Services in Australia | Business & Property Finance
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Professional commercial finance brokers with access to 50+ lenders across Australia. 
            Fast approvals, competitive rates, and flexible terms for all your business financing needs.
          </p>
          
          {/* Key Takeaways */}
          <div className="bg-accent/5 rounded-2xl p-8 mb-8 text-left max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              <Target className="inline-block w-6 h-6 mr-2 text-accent" />
              Key Benefits of Our Commercial Lending Services
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span>Access $50K–$200M+ funding across all loan types</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span>Loans for property, business, equipment, trade, and SMSF</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span>Fast approvals with private lending options</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span>Flexible terms from 30 days to 30 years</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span>Trusted by Australian businesses nationwide</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span>Expert brokers with 15+ years experience</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent-light text-accent-foreground">
              <a href="tel:0485952651">
                <Phone className="mr-2 h-5 w-5" />
                Call 0485 952 651
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Get Custom Quote</Link>
            </Button>
          </div>
        </div>

        {/* SEO Overview */}
        <div className="bg-muted/30 rounded-lg p-8 mb-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Commercial Finance Broking Services</h2>
          <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            As commercial finance brokers, we connect Australian businesses with the right lending solutions across 
            property finance, business funding, and specialized commercial loans. Our extensive lender network enables 
            us to secure competitive rates and flexible terms for businesses of all sizes. From property development 
            finance to working capital solutions, we streamline the commercial lending process with fast approvals 
            and expert guidance throughout your financing journey.
          </p>
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
                               <div className="flex gap-2">
                                 <Link 
                                   to={service.link}
                                   className="flex-1"
                                 >
                                   <Button 
                                     variant="outline" 
                                     size="sm" 
                                     className="w-full text-xs group-hover:bg-accent group-hover:text-accent-foreground"
                                   >
                                     Details
                                   </Button>
                                 </Link>
                                  <Button 
                                    asChild
                                    size="sm" 
                                    className="flex-1 text-xs bg-accent hover:bg-accent-dark text-accent-foreground"
                                  >
                                    <Link to="/contact">Apply</Link>
                                  </Button>
                               </div>
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

        {/* Industry Use Cases */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <Building2 className="inline-block w-8 h-8 mr-3 text-accent" />
              Industries We <span className="gradient-text">Serve</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commercial finance brokers understand the unique requirements of different industries across Australia
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                industry: "Property Developers",
                description: "Development finance, bridging loans, and construction funding solutions",
                useCases: ["Site acquisition", "Construction finance", "Pre-sales funding"]
              },
              {
                industry: "Manufacturing & SMEs", 
                description: "Equipment finance, working capital, and business expansion loans",
                useCases: ["Machinery purchases", "Cash flow support", "Business acquisition"]
              },
              {
                industry: "Healthcare & Medical",
                description: "Practice loans, equipment finance, and medical fitout funding",
                useCases: ["Medical equipment", "Practice acquisition", "Clinic expansion"]
              },
              {
                industry: "Professional Services",
                description: "Office fitouts, working capital, and business acquisition finance",
                useCases: ["Office expansion", "Technology upgrades", "Partner buyouts"]
              }
            ].map((industry, index) => (
              <Card key={index} className="premium-card">
                <CardContent className="p-6">
                  <div className="p-3 bg-accent/10 rounded-xl w-fit mb-4">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{industry.industry}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{industry.description}</p>
                  <ul className="space-y-1">
                    {industry.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-center text-xs">
                        <CheckCircle className="w-3 h-3 text-accent mr-2 flex-shrink-0" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-16 bg-gradient-to-r from-accent/5 to-primary/5 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <Users className="inline-block w-8 h-8 mr-3 text-accent" />
              Commercial Lending <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real Australian businesses we've helped secure the right commercial finance solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                amount: "$15M",
                type: "Development Finance",
                industry: "Property Development",
                outcome: "Multi-stage residential development funding secured within 3 weeks",
                challenge: "Complex staged funding requirements",
                link: "/services/commercial-property-development"
              },
              {
                amount: "$2.8M", 
                type: "Equipment Finance",
                industry: "Manufacturing",
                outcome: "Production line upgrade with flexible repayment terms",
                challenge: "Seasonal cash flow variations",
                link: "/services/equipment-finance"
              },
              {
                amount: "$850K",
                type: "Working Capital",
                industry: "Professional Services",
                outcome: "Business expansion across 3 new locations",
                challenge: "Rapid growth funding needs",
                link: "/services/working-capital"
              }
            ].map((story, index) => (
              <Link to={story.link} key={index} className="block">
                <Card className="premium-card h-full hover:border-accent/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold gradient-text mb-2">{story.amount}</div>
                      <Badge className="bg-accent/20 text-accent mb-2">{story.type}</Badge>
                      <div className="text-sm text-muted-foreground">{story.industry}</div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-sm">Challenge:</span>
                        <p className="text-sm text-muted-foreground">{story.challenge}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">Outcome:</span>
                        <p className="text-sm text-muted-foreground">{story.outcome}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-accent/20 text-center">
                      <span className="text-accent text-sm font-medium inline-flex items-center">
                        Learn about {story.type} <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Bank vs Private Lender <span className="gradient-text">Comparison</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding your commercial lending options in the Australian market
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="premium-card">
                  <CardHeader className="text-center">
                    <CardTitle className="text-accent">Traditional Banks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Approval Time:</span>
                        <span className="text-sm">4-8 weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Interest Rates:</span>
                        <span className="text-sm">Lower (3-8%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Documentation:</span>
                        <span className="text-sm">Extensive</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Flexibility:</span>
                        <span className="text-sm">Limited</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Best For:</span>
                        <span className="text-sm">Established businesses</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="premium-card border-accent/50">
                  <CardHeader className="text-center bg-accent/10">
                    <CardTitle className="text-accent">Our Broker Network</CardTitle>
                    <Badge className="bg-accent text-accent-foreground">Recommended</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Approval Time:</span>
                        <span className="text-sm font-bold text-accent">1-3 weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Interest Rates:</span>
                        <span className="text-sm">Competitive (varies)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Documentation:</span>
                        <span className="text-sm">Streamlined</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Flexibility:</span>
                        <span className="text-sm font-bold text-accent">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Best For:</span>
                        <span className="text-sm">All business types</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="premium-card">
                  <CardHeader className="text-center">
                    <CardTitle className="text-primary">Private Lenders</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Approval Time:</span>
                        <span className="text-sm">24-48 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Interest Rates:</span>
                        <span className="text-sm">Higher (8-15%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Documentation:</span>
                        <span className="text-sm">Minimal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Flexibility:</span>
                        <span className="text-sm">Very High</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Best For:</span>
                        <span className="text-sm">Urgent funding</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        {/* Process Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              How Does Our Commercial Lending <span className="gradient-text">Process Work?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple, streamlined steps to get your commercial finance approved and settled across Australia
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

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Common questions about commercial lending and our brokerage services in Australia
            </p>
          </div>
          
          <Card className="premium-card max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Enhanced CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-accent to-accent-light rounded-2xl mb-8">
          <div className="max-w-4xl mx-auto px-8">
            <h2 className="text-4xl font-bold text-accent-foreground mb-4">
              Looking for Flexible Commercial Lending in Australia?
            </h2>
            <p className="text-xl text-accent-foreground/90 mb-6">
              Our expert commercial finance brokers will secure the right solution for your business needs.
            </p>
            <div className="bg-accent-foreground/10 rounded-xl p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-4 text-accent-foreground">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Access to 50+ Lenders</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">15+ Years Experience</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Trusted Nationwide</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-white hover:bg-gray-100 text-accent px-8 py-4 text-lg"
              >
                <Link to="/contact">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Start Your Application Today
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent px-8 py-4 text-lg"
              >
                <a href="tel:0485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  Call us on 0485 952 651
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default Services;