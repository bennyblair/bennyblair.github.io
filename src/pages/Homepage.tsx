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
      title: "Private Lending",
      description: "Quick access to funds with flexible terms tailored to your needs as an alternative to traditional bank loans.",
      gradient: "from-primary to-primary-light"
    },
    {
      icon: FileText,
      title: "Bridging Finance",
      description: "Short-term financing to help you cover the gap between buying a new property and selling your current one.",
      gradient: "from-primary-light to-primary"
    },
    {
      icon: TrendingUp,
      title: "Asset-Based Lending",
      description: "Use your assets to get the funding you need to drive growth, improve cash flow, or seize new opportunities.",
      gradient: "from-primary to-primary-dark"
    }
  ];

  const achievements = [
    { 
      icon: Zap, 
      value: "24hrs", 
      label: "Credit Decision",
      progress: 95 
    },
    { 
      icon: Timer, 
      value: "48hrs", 
      label: "Funding Available",
      progress: 88 
    },
    { 
      icon: CheckCircle, 
      value: "Flexible", 
      label: "Terms",
      progress: 98 
    },
    { 
      icon: Shield, 
      value: "Asset", 
      label: "Backed",
      progress: 92 
    }
  ];

  const processSteps = [
    {
      icon: Handshake,
      title: "Step 1 - Fact Find",
      description: "We start with a detailed consultation to understand your financial needs and goals."
    },
    {
      icon: BarChart3,
      title: "Step 2 - Customised Proposal",
      description: "Based on our discussion, we'll provide a customized financing proposal outlining the loan terms and benefits."
    },
    {
      icon: CheckCircle,
      title: "Step 3 - Fast Approval and Funding",
      description: "Once you approve the proposal, we'll expedite the approval process so you receive the funds as quickly as possible."
    }
  ];

  const testimonials = [
    {
      quote: "Emet Capital provided us with a fast and flexible private loan when we needed it most. Their professionalism and efficiency made the entire process seamless. Thanks to them, we expanded our business ahead of schedule.",
      client: "Sydney Fridges",
      deal: "Small Business Owner"
    },
    {
      quote: "Using Emet Capital for a bridging loan, I secured my new property without waiting for the old one to settle. Their team understood the urgency and delivered exactly what they promised. Highly recommended!",
      client: "Michael T.",
      deal: "Property Investor"
    },
    {
      quote: "Emet Capital exceeded our expectations with quick, reliable loan funding for our new build. Their attentive team guided us expertly, helping us successfully seize a vital growth opportunity.",
      client: "James R.",
      deal: "Property Developer"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-background">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'fade-in-up' : ''}`}>
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-card border border-border rounded-2xl text-primary font-medium text-sm mb-6">
                Private Lending Solutions Across Australia
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-foreground">Flexible Private Lending Solutions</span>
              <br />
              <span className="text-primary">Across Australia</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Empowering your financial journey with fast, tailored financing options. 
              Alternative solutions when traditional banks can't meet your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                asChild 
                size="lg"
                className="bg-primary hover:bg-primary-dark hover:scale-105 transition-all duration-300 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-2xl"
              >
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 px-8 py-6 text-lg rounded-2xl"
              >
                <Link to="/resources">Explore Resources</Link>
              </Button>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24hrs</div>
                <div className="text-muted-foreground">Credit Decision</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">48hrs</div>
                <div className="text-muted-foreground">Funding Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">0485 952 651</div>
                <div className="text-muted-foreground">Call Us Today</div>
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
              Why Choose Emet Capital?
            </h2>
            <p className="text-xl text-muted-foreground">
              Fast, flexible, and tailored financing solutions designed for your unique needs.
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
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
                    <span className="font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-32 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Fast & Reliable Service
            </h2>
            <p className="text-xl text-muted-foreground">
              We prioritize speed, reliability, and transparent service to meet your financial requirements efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card 
                key={achievement.label} 
                className="glass-card border-0 text-center group hover-lift"
              >
                <CardContent className="p-8">
                  <achievement.icon className="w-12 h-12 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-4xl font-bold text-foreground mb-2">{achievement.value}</div>
                  <div className="text-muted-foreground mb-4">{achievement.label}</div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-8 px-8 py-4 bg-card border border-border rounded-2xl">
              <span className="text-muted-foreground">Expertise in:</span>
              <div className="flex items-center space-x-6 text-primary">
                <Building2 className="w-6 h-6" />
                <span className="text-sm font-medium">Non-Bank Lending</span>
                <div className="w-1 h-6 bg-border"></div>
                <Globe className="w-6 h-6" />
                <span className="text-sm font-medium">Asset-Backed Finance</span>
                <div className="w-1 h-6 bg-border"></div>
                <Shield className="w-6 h-6" />
                <span className="text-sm font-medium">Flexible Terms</span>
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
              How We Work
            </h2>
            <p className="text-xl text-muted-foreground">
              Our streamlined three-step process gets you the funding you need quickly.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto">
                        <step.icon className="w-10 h-10 text-primary-foreground" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent transform translate-x-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-muted relative overflow-hidden">
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
                      <Star key={i} className="w-5 h-5 text-primary fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t border-border pt-6">
                    <div className="font-semibold text-primary">{testimonial.client}</div>
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
            <Card className="bg-card border border-border">
              <CardContent className="p-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Talk to us today!
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Ready to explore your financing options? Contact us now for a free, no-obligation chat.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-primary hover:bg-primary-dark hover:scale-105 transition-all duration-300 text-primary-foreground font-semibold px-8 py-6 rounded-2xl"
                  >
                    <Link to="/contact">
                      Contact Us
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  
                  <div className="text-2xl font-bold text-primary">
                    📞 0485 952 651
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Timer className="w-4 h-4 mr-2 text-primary" />
                    24hr Credit Decision
                  </div>
                  <div className="w-1 h-4 bg-border"></div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-primary" />
                    48hr Funding
                  </div>
                  <div className="w-1 h-4 bg-border"></div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    No Obligation Chat
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