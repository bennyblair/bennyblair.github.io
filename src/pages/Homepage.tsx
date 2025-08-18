import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Star,
  Zap,
  Target,
  Award,
  Users,
  DollarSign
} from "lucide-react";
import sydneySkyline from "@/assets/sydney-skyline-hd.jpg";

const Homepage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Sydney Skyline Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${sydneySkyline})`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/60" />
        
        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Bespoke Commercial Lending,
              <span className="gradient-text block mt-2">
                Expertly Engineered
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
              Australia-wide, asset-backed solutions that scale with your ambition
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="group bg-accent hover:bg-accent-light text-accent-foreground px-10 py-7 text-lg rounded-2xl hover-lift">
                Get Your Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="border-2 border-accent/30 text-accent hover:bg-accent/10 px-10 py-7 text-lg rounded-2xl">
                <Phone className="mr-2 h-5 w-5" />
                0485 952 651
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              What We <span className="gradient-text">Do</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Three core pillars of commercial finance excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Private Commercial Lending",
                description: "Fast, flexible commercial lending solutions when traditional banks can't meet your timeline or requirements."
              },
              {
                icon: TrendingUp,
                title: "Bridging & Development Finance",
                description: "Short-term funding for property development, bridging finance, and time-sensitive commercial opportunities."
              },
              {
                icon: Shield,
                title: "Asset-Backed Lending",
                description: "Leverage your commercial property, equipment, or business assets to secure competitive funding solutions."
              }
            ].map((service, index) => (
              <Card key={index} className="premium-card group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-6 p-6 bg-accent/10 rounded-2xl w-fit group-hover:bg-accent/20 transition-colors">
                    <service.icon className="h-10 w-10 text-accent" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl mb-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground text-base md:text-lg leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Emet Capital */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Why <span className="gradient-text">Emet Capital</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Industry-leading metrics that speak to our expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { label: "Approval Speed", value: 95, suffix: "% within 24hrs" },
              { label: "Deal Success Rate", value: 87, suffix: "% approved" },
              { label: "Google Rating", value: 5, suffix: " stars (18 reviews)" },
              { label: "Client Satisfaction", value: 98, suffix: "% rating" }
            ].map((metric, index) => (
              <Card key={index} className="premium-card text-center">
                <CardHeader>
                  <CardTitle className="text-lg text-muted-foreground">{metric.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold gradient-text mb-4">
                    {metric.value}{metric.suffix.includes('stars') ? '' : '%'}
                  </div>
                  <div className="progress-bar mb-4">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${metric.value === 5 ? 100 : metric.value}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {metric.suffix.replace('%', '')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* As Seen In */}
          <div className="text-center">
            <p className="text-muted-foreground mb-8">Trusted by industry leaders</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 w-24 bg-muted/30 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real deals, real results, real growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                amount: "$2.4M",
                type: "Equipment Finance",
                industry: "Manufacturing",
                result: "Enabled 40% production increase",
                quote: "Emet Capital understood our unique needs and delivered exactly what we required."
              },
              {
                amount: "$850K",
                type: "Debtor Finance",
                industry: "Logistics",
                result: "Improved cash flow by 60%",
                quote: "The speed of approval meant we could take on contracts we would have missed."
              }
            ].map((study, index) => (
              <Card key={index} className="premium-card">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-accent/20 text-accent">
                      {study.type}
                    </Badge>
                    <Badge variant="outline">
                      {study.industry}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl gradient-text">{study.amount}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium mb-4">{study.result}</p>
                  <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
                    "{study.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Four simple steps to funding success
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Enquiry", description: "Tell us about your funding requirements" },
              { step: "02", title: "Assessment", description: "We evaluate your proposal and present options" },
              { step: "03", title: "Approval", description: "Fast-track approval with our lender network" },
              { step: "04", title: "Settlement", description: "Quick settlement and funding deployment" }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="premium-card p-8 mb-4">
                  <div className="text-4xl font-bold gradient-text mb-4">{step.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 h-6 w-6 text-accent opacity-50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Built by Industry Insiders, 
                <span className="gradient-text block">
                  Backed by Deep Expertise
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Our founding team brings decades of combined experience from Australia's leading 
                financial institutions. We understand the complexities of commercial lending 
                because we've lived them.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: Award, label: "20+ Years", description: "Combined Experience" },
                  { icon: Users, label: "500+", description: "Deals Completed" },
                  { icon: DollarSign, label: "$250M+", description: "Funds Deployed" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="h-8 w-8 text-accent mx-auto mb-2" />
                    <div className="text-2xl font-bold gradient-text">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                ))}
              </div>
              
              <Button className="bg-accent hover:bg-accent-light text-accent-foreground hover-lift">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="premium-card p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-primary/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="gradient-text">Get Started?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tell us about your requirements and we'll be in touch within 24 hours
            </p>
          </div>
          
          <Card className="premium-card">
            <CardContent className="p-8">
              <form className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input className="bg-background/50 border-glass-border focus:border-accent" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" className="bg-background/50 border-glass-border focus:border-accent" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input type="tel" className="bg-background/50 border-glass-border focus:border-accent" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Funding Amount</label>
                  <Input placeholder="e.g. $500,000" className="bg-background/50 border-glass-border focus:border-accent" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Tell us about your requirements</label>
                  <Textarea 
                    className="bg-background/50 border-glass-border focus:border-accent min-h-[120px]" 
                    placeholder="Describe your funding needs, timeline, and any specific requirements..."
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Button className="w-full bg-accent hover:bg-accent-light text-accent-foreground py-6 text-lg hover-lift">
                    Submit Your Enquiry
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
            {[
              { icon: Phone, title: "Call Us", content: "0485 952 651" },
              { icon: Mail, title: "Email Us", content: "enquiry@emetcapital.com.au" },
              { icon: MapPin, title: "Australia Wide", content: "Serving all states & territories" }
            ].map((contact, index) => (
              <div key={index} className="premium-card p-6 hover-lift">
                <contact.icon className="h-8 w-8 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{contact.title}</h3>
                <p className="text-muted-foreground">{contact.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;