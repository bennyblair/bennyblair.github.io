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
  DollarSign,
  Star,
  Zap,
  Trophy,
  Target,
  Handshake,
  BarChart3,
  Globe,
  Timer
} from "lucide-react";
import { useState, useEffect } from "react";

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: Building2,
      title: "Asset Finance",
      description: "Premium equipment, vehicle, and machinery financing solutions engineered for scale.",
      gradient: "from-accent to-accent-light"
    },
    {
      icon: FileText,
      title: "Debtor Funding",
      description: "Sophisticated accounts receivable and invoice factoring for immediate liquidity.",
      gradient: "from-accent-light to-accent"
    },
    {
      icon: TrendingUp,
      title: "Structured Lending",
      description: "Bespoke development, construction, and working capital solutions.",
      gradient: "from-accent to-accent-metallic"
    }
  ];

  const achievements = [
    { 
      icon: DollarSign, 
      value: "$500M+", 
      label: "Loans Facilitated",
      progress: 95 
    },
    { 
      icon: Zap, 
      value: "72hrs", 
      label: "Average Approval",
      progress: 88 
    },
    { 
      icon: Trophy, 
      value: "98%", 
      label: "Success Rate",
      progress: 98 
    },
    { 
      icon: Target, 
      value: "100+", 
      label: "Lender Partners",
      progress: 92 
    }
  ];

  const processSteps = [
    {
      icon: Handshake,
      title: "Initial Consultation",
      description: "Deep-dive analysis of your requirements and strategic objectives"
    },
    {
      icon: BarChart3,
      title: "Market Analysis",
      description: "Comprehensive lender mapping and rate optimization"
    },
    {
      icon: Shield,
      title: "Structured Proposal",
      description: "Bespoke lending solution with competitive terms"
    },
    {
      icon: CheckCircle,
      title: "Seamless Settlement",
      description: "White-glove execution and ongoing relationship management"
    }
  ];

  const testimonials = [
    {
      quote: "Emet Capital secured $2.5M development finance when our bank declined. Their expertise and network are unmatched.",
      client: "Property Development Group",
      deal: "$2.5M Development Finance"
    },
    {
      quote: "The team's deep market knowledge saved us 1.2% on our equipment financing. Exceptional service.",
      client: "Manufacturing Specialist",
      deal: "$1.8M Asset Finance"
    },
    {
      quote: "Complex import/export structure completed in 48 hours. True professionals.",
      client: "International Trader",
      deal: "$3.2M Trade Finance"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary-dark to-primary">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'fade-in-up' : ''}`}>
            <div className="mb-8">
              <span className="inline-block px-6 py-2 glass-card border border-glass-border rounded-2xl text-accent-light font-medium text-sm mb-6">
                Australia's Premier Commercial Lending Specialists
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-foreground">Bespoke Commercial Lending,</span>
              <br />
              <span className="bg-gradient-gold bg-clip-text text-transparent">Expertly Engineered</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Australia-wide, asset-backed solutions that scale with your ambition. 
              Connect with industry-leading expertise and an exclusive network of premium lenders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-gold hover:scale-105 transition-all duration-300 gold-glow text-accent-foreground font-semibold px-8 py-6 text-lg rounded-2xl"
              >
                <Link to="/contact">
                  Get Your Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="glass-card hover:scale-105 transition-all duration-300 border-glass-border text-foreground hover:bg-glass px-8 py-6 text-lg rounded-2xl"
              >
                <Link to="/resources">Explore Resources</Link>
              </Button>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">$500M+</div>
                <div className="text-muted-foreground">Loans Facilitated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">15+ Years</div>
                <div className="text-muted-foreground">Industry Expertise</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">100+ Lenders</div>
                <div className="text-muted-foreground">Premium Network</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Precision-Engineered Financing Solutions
            </h2>
            <p className="text-xl text-muted-foreground">
              Three core pillars of commercial lending excellence, designed for ambitious Australian businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card 
                key={service.title} 
                className={`glass-card hover-lift group cursor-pointer border-0 ${isVisible ? 'scale-in' : ''}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-primary-dark" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center text-accent group-hover:translate-x-2 transition-transform duration-300">
                    <span className="font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Emet Capital */}
      <section className="py-32 bg-gradient-to-br from-secondary to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Unmatched Industry Excellence
            </h2>
            <p className="text-xl text-muted-foreground">
              Track record of delivering results through deep expertise and strategic partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card 
                key={achievement.label} 
                className="glass-card border-0 text-center group hover-lift"
              >
                <CardContent className="p-8">
                  <achievement.icon className="w-12 h-12 text-accent mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-4xl font-bold text-foreground mb-2">{achievement.value}</div>
                  <div className="text-muted-foreground mb-4">{achievement.label}</div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-gradient-gold h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-8 px-8 py-4 glass-card rounded-2xl">
              <span className="text-muted-foreground">Trusted by:</span>
              <div className="flex items-center space-x-6 text-accent">
                <Building2 className="w-6 h-6" />
                <span className="text-sm font-medium">Major Banks</span>
                <div className="w-1 h-6 bg-glass-border"></div>
                <Globe className="w-6 h-6" />
                <span className="text-sm font-medium">Non-Bank Lenders</span>
                <div className="w-1 h-6 bg-glass-border"></div>
                <Shield className="w-6 h-6" />
                <span className="text-sm font-medium">Private Funders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Streamlined Excellence in Four Steps
            </h2>
            <p className="text-xl text-muted-foreground">
              Our proven methodology delivers optimal outcomes through strategic precision.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto shadow-glow">
                        <step.icon className="w-10 h-10 text-primary-dark" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-primary-dark rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-accent to-transparent transform translate-x-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Client Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results from real partnerships across diverse industry sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="glass-card border-0 hover-lift"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t border-glass-border pt-6">
                    <div className="font-semibold text-accent">{testimonial.client}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.deal}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="glass-card border-0 shadow-elegant">
              <CardContent className="p-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Ready to Engineer Your Success?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Connect with Australia's premier commercial lending specialists. 
                  Receive a bespoke proposal crafted for your unique requirements.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-gradient-gold hover:scale-105 transition-all duration-300 gold-glow text-accent-foreground font-semibold px-8 py-6 rounded-2xl"
                  >
                    <Link to="/contact">
                      Get Your Bespoke Quote
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild 
                    size="lg" 
                    variant="outline"
                    className="glass-card border-glass-border text-foreground hover:bg-glass px-8 py-6 rounded-2xl"
                  >
                    <Link to="/resources">Explore Our Expertise</Link>
                  </Button>
                </div>
                
                <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Timer className="w-4 h-4 mr-2 text-accent" />
                    72hr Response
                  </div>
                  <div className="w-1 h-4 bg-glass-border"></div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-accent" />
                    No Upfront Fees
                  </div>
                  <div className="w-1 h-4 bg-glass-border"></div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-accent" />
                    Confidential Process
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;