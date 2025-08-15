import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { 
  Award,
  Users,
  DollarSign,
  Target,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Star,
  Building2,
  TrendingUp
} from "lucide-react";

const About = () => {
  const stats = [
    { icon: Award, label: "Years Experience", value: "20+", description: "Combined team experience" },
    { icon: Users, label: "Deals Completed", value: "500+", description: "Successful transactions" },
    { icon: DollarSign, label: "Funds Facilitated", value: "$250M+", description: "Total lending arranged" },
    { icon: Star, label: "Google Rating", value: "5.0", description: "18 client reviews" }
  ];

  const values = [
    {
      icon: Target,
      title: "Client-Focused",
      description: "Every solution is tailored to your unique business requirements and circumstances."
    },
    {
      icon: Clock,
      title: "Speed & Efficiency", 
      description: "Fast turnaround times with approvals possible within 24-48 hours."
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Clear communication, transparent processes, and honest guidance throughout."
    },
    {
      icon: Building2,
      title: "Industry Expertise",
      description: "Deep understanding of commercial lending markets and lending partner requirements."
    }
  ];

  const whyChooseUs = [
    "Extensive network of private and institutional lenders",
    "No upfront fees - we're paid by successful settlements only",
    "Competitive rates negotiated through our lending relationships", 
    "Streamlined application and approval processes",
    "Australia-wide service coverage",
    "Flexible lending criteria and creative structuring",
    "Ongoing support throughout the loan lifecycle",
    "5-star Google rating from satisfied clients"
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "About Us" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About Emet Capital
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Australia's trusted commercial lending specialists. We connect businesses with the right financing solutions through our extensive network of private and institutional lenders.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="premium-card text-center">
              <CardContent className="p-6">
                <stat.icon className="h-10 w-10 text-accent mx-auto mb-4" />
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Built by Industry Insiders, 
              <span className="gradient-text block">
                Backed by Deep Expertise
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Emet Capital was founded by commercial lending professionals who understood the gap between what businesses need and what traditional banks can deliver. Our founding team brings decades of combined experience from Australia's leading financial institutions.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We've lived the complexities of commercial lending from both sides - as practitioners within major institutions and as brokers helping businesses access the finance they need. This unique perspective allows us to navigate challenges and structure solutions that work.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Today, we maintain relationships with a diverse network of private lenders, non-bank institutions, and alternative funding sources across Australia, ensuring we can match the right solution to your specific requirements.
            </p>
            <Button className="bg-accent hover:bg-accent-light text-accent-foreground hover-lift">
              <Phone className="mr-2 h-4 w-4" />
              Discuss Your Requirements
            </Button>
          </div>
          
          <div className="relative">
            <Card className="premium-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Our Mission</h3>
                <blockquote className="border-l-4 border-accent pl-6 italic text-muted-foreground mb-6">
                  "To bridge the gap between business opportunity and traditional finance by providing fast, flexible, and transparent commercial lending solutions."
                </blockquote>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <span className="text-sm">Fast access to commercial finance when opportunities arise</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <span className="text-sm">Transparent processes with clear communication</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <span className="text-sm">Tailored solutions for unique business requirements</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide how we work with our clients and lending partners
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="premium-card text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-2xl w-fit">
                    <value.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Why Choose <span className="gradient-text">Emet Capital</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                As an independent commercial lending broker, we work exclusively for our clients' interests. We're not tied to any single lender, which means we can source the most competitive terms from our extensive network.
              </p>
              
              <div className="space-y-3">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-accent mr-3" />
                  Our Commitment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-4 bg-accent/5 rounded-lg">
                    <div className="text-2xl font-bold text-accent mb-1">No Success, No Fee</div>
                    <div className="text-sm text-muted-foreground">We only get paid when you get funded</div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">What This Means:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-2" />
                        No upfront application fees
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-2" />
                        No ongoing management fees
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-2" />
                        Commission paid by successful settlement only
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-2" />
                        100% aligned with your success
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Connect with our commercial lending specialists to discuss your requirements and discover how we can help achieve your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-accent hover:bg-accent-dark text-accent-foreground"
              >
                <a href="/contact">
                  Start Your Application
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <a href="tel:0485952651">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 0485 952 651
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;