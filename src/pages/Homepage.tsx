import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
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
import sydneySkyline from "@/assets/sydney-skyline-hero.jpg";
import { getContentFiles, type Article } from "@/lib/content";

const Homepage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    loanType: "",
    loanAmount: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestArticles, setLatestArticles] = useState<(Article & { contentType: 'guides' | 'case-studies' | 'insights' })[]>([]);
  const [featuredCaseStudies, setFeaturedCaseStudies] = useState<Article[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadLatestArticles = async () => {
      try {
        const [guides, caseStudies, insights] = await Promise.all([
          getContentFiles('guides'),
          getContentFiles('case-studies'),
          getContentFiles('insights')
        ]);
        
        // Set featured case studies for success stories (latest 2)
        const sortedCaseStudies = caseStudies.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setFeaturedCaseStudies(sortedCaseStudies.slice(0, 2));
        
        // Add content type to articles for proper URL generation
        const guidesWithType = guides.map(article => ({ ...article, contentType: 'guides' as const }));
        const caseStudiesWithType = caseStudies.map(article => ({ ...article, contentType: 'case-studies' as const }));
        const insightsWithType = insights.map(article => ({ ...article, contentType: 'insights' as const }));
        
        // Combine all articles and sort by date (newest first)
        const allArticles = [...guidesWithType, ...caseStudiesWithType, ...insightsWithType];
        const sortedArticles = allArticles.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        // Take the latest 6 articles
        setLatestArticles(sortedArticles.slice(0, 6));
      } catch (error) {
        console.error('Error loading latest articles:', error);
      }
    };

    loadLatestArticles();
  }, []);

  // Helper function to check if article is new (within 7 days)
  const isNewArticle = (date: string) => {
    const articleDate = new Date(date);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return articleDate > sevenDaysAgo;
  };

  // Helper function to generate correct article URL based on content type
  const getArticleUrl = (article: Article & { contentType: 'guides' | 'case-studies' | 'insights' }) => {
    return `/resources/${article.contentType}/${article.slug}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name and Email)",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Check if we're in development mode
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isDevelopment) {
        // In development, just simulate success
        console.log('Development mode - form data:', formData);
        toast({
          title: "Development Mode",
          description: "Form submission simulated. Deploy to Netlify to test actual submission.",
        });
      } else {
        // In production, submit to Netlify
        const form = e.target as HTMLFormElement;
        const netlifyFormData = new FormData(form);
        
        // Convert FormData to URLSearchParams compatible format
        const formParams = new URLSearchParams();
        for (const [key, value] of netlifyFormData.entries()) {
          formParams.append(key, value.toString());
        }

        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formParams.toString()
        });

        if (!response.ok) {
          throw new Error(`Form submission failed: ${response.status}`);
        }

        toast({
          title: "Form submitted successfully!",
          description: "We'll get back to you within 24-48 hours.",
        });
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        business: "",
        loanType: "",
        loanAmount: "",
        message: ""
      });

    } catch (error: unknown) {
      console.error('Form submission error:', error);
      
      toast({
        title: "Error submitting form",
        description: error instanceof Error ? error.message : "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const loanTypes = [
    "Asset Finance",
    "Development Finance",
    "Bridging Finance", 
    "Working Capital",
    "Invoice Finance",
    "Trade Finance",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO 
        title="Commercial Lending Solutions | Fast Business Finance | Emet Capital"
        description="Australia's leading commercial finance brokers. Fast approval on business loans $100K-$50M+. Expert property development finance."
        canonical="/"
        keywords="commercial lending, business loans, commercial finance, private lending, bridging finance, commercial property loans, business finance brokers, Sydney Australia"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-relaxed pb-4">
              Commercial Lending Solutions,
              <span className="gradient-text block mt-2 leading-normal">
                Expertly Engineered
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
              Australia-wide, asset-backed business finance solutions from $100K to $50M+ that scale with your ambition
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="group bg-accent hover:bg-accent-light text-accent-foreground px-10 py-7 text-lg rounded-2xl hover-lift">
                <Link to="/contact">
                  Get Your Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-2 border-accent/30 text-accent hover:bg-accent/10 px-10 py-7 text-lg rounded-2xl">
                <a href="tel:0485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  0485 952 651
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Finance Expertise Overview */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Australia's Leading Commercial Finance Specialists
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              With over 15 years of expertise in Australian commercial lending, we've facilitated over $2 billion in business finance across all major markets. 
              Our specialized team delivers fast settlements on complex deals that traditional banks won't touch, offering competitive rates 
              for property development, business acquisition, working capital, bridging finance, and specialized commercial lending solutions.
            </p>
          </div>
          
          {/* Market Expertise Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center fade-in-up">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">$2B+</div>
              <div className="text-sm text-muted-foreground">Commercial Loans Facilitated</div>
            </div>
            <div className="text-center fade-in-up">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">48HR</div>
              <div className="text-sm text-muted-foreground">Fast Approval Process</div>
            </div>
            <div className="text-center fade-in-up">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Years Industry Experience</div>
            </div>
            <div className="text-center fade-in-up">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Client Success Rate</div>
            </div>
          </div>

          {/* Australian Market Focus */}
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center">Nationwide Commercial Finance Coverage</h3>
            <p className="text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
              Operating across Sydney, Melbourne, Brisbane, Perth, Adelaide, and regional centers, we understand the unique challenges 
              of Australian commercial property markets. From CBD high-rise developments to suburban commercial acquisitions, 
              our local expertise ensures your finance solution is tailored to Australian regulations, market conditions, and business requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Core Commercial Finance Services */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Commercial Finance <span className="gradient-text">Solutions</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive business lending services designed for Australian commercial property investors, 
              developers, and business owners who need fast, flexible financing solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Private Lending",
                description: "Fast, flexible commercial lending solutions when traditional banks can't meet your timeline or requirements.",
                link: "/services/private-lending"
              },
              {
                icon: TrendingUp,
                title: "Bridging Finance",
                description: "Short-term funding for property acquisition, settlements, and time-sensitive commercial opportunities.",
                link: "/services/bridging-finance"
              },
              {
                icon: Shield,
                title: "Asset-Backed Lending",
                description: "Leverage your commercial property, equipment, or business assets to secure competitive funding solutions.",
                link: "/services/asset-backed-lending"
              },
              {
                icon: Building2,
                title: "Property Development Finance",
                description: "Construction and development funding for residential, commercial, and mixed-use projects across Australia.",
                link: "/services/commercial-property-development"
              },
              {
                icon: Zap,
                title: "Caveat Loans",
                description: "Ultra-fast property-secured funding with settlements possible within 24-72 hours for urgent business needs.",
                link: "/services/caveat-loans"
              },
              {
                icon: Target,
                title: "Business Acquisition",
                description: "Funding solutions for purchasing existing businesses, management buyouts, and strategic acquisitions.",
                link: "/services/business-acquisition"
              }
            ].map((service, index) => (
              <Link key={index} to={service.link}>
                <Card className="premium-card group h-full hover:border-accent/50 transition-colors">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-6 p-6 bg-accent/10 rounded-2xl w-fit group-hover:bg-accent/20 transition-colors">
                      <service.icon className="h-10 w-10 text-accent" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl mb-4 group-hover:text-accent transition-colors">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground text-base md:text-lg leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-accent/30 hover:bg-accent/10">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
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
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { label: "Approval Speed", value: 90, suffix: "% within 48hrs" },
              { label: "Deal Success Rate", value: 87, suffix: "% approved" },
              { label: "Google Rating", value: 5, suffix: " stars (18 reviews)" }
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
            {featuredCaseStudies.map((study) => (
              <Link 
                key={study.slug} 
                to={`/resources/case-studies/${study.slug}`}
                className="block transition-transform hover:scale-[1.02]"
              >
                <Card className="premium-card h-full cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <Badge className="bg-accent/20 text-accent">
                        {study.loanType || "Business Finance"}
                      </Badge>
                      <Badge variant="outline">
                        {study.industry || "Business"}
                      </Badge>
                    </div>
                    <CardTitle className="text-3xl gradient-text">
                      {study.loanAmount || "Custom Solution"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium mb-4">{study.outcome || study.title}</p>
                    {study.quote && (
                      <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
                        "{study.quote}"
                      </blockquote>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12 fade-in-up">
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
            >
              <Link to="/resources/case-studies">
                View All Case Studies
              </Link>
            </Button>
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

      {/* Latest Articles */}
      <section className="py-24 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                Latest Articles & Insights
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Stay informed with our latest guides, case studies, and market insights. 
                Fresh content to help you make smarter financing decisions.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article, index) => (
              <div key={article.slug} className={`fade-in-up delay-${index * 100}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <Badge variant="outline" className="text-xs font-medium border-slate-600 text-slate-300">
                        {article.category}
                      </Badge>
                      {isNewArticle(article.date) && (
                        <Badge className="bg-green-900/50 text-green-300 border-green-700 hover:bg-green-900/70 text-xs font-medium">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg line-clamp-2 leading-tight text-white hover:text-blue-400 transition-colors">
                      <Link 
                        to={getArticleUrl(article)}
                        className="block"
                      >
                        {article.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-slate-300 line-clamp-3 mb-4">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{article.author}</span>
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="fade-in-up delay-600">
              <p className="text-slate-300 mb-6">
                Explore more resources tailored to your needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="min-w-[160px] bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to="/resources/guides">
                    View All Guides
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-w-[160px] border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                  <Link to="/resources/case-studies">
                    Browse Case Studies
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-w-[160px] border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                  <Link to="/resources/insights">
                    Market Insights
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Founded on Expertise,
                <span className="gradient-text block">
                  Driven by Results
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Our team combines extensive commercial lending experience with a deep understanding 
                of Australia's financial landscape. We've structured complex deals across diverse 
                industries and know what it takes to secure funding when it matters most.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-8 mb-12">
                {[
                  { icon: Award, label: "15+ Years", description: "Industry Experience" },
                  { icon: Users, label: "300+", description: "Successful Deals" },
                  { icon: DollarSign, label: "$150M+", description: "Funds Facilitated" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="h-10 w-10 text-accent mx-auto mb-4" />
                    <div className="text-3xl font-bold gradient-text">{stat.label}</div>
                    <div className="text-base text-muted-foreground">{stat.description}</div>
                  </div>
                ))}
              </div>
              
              <Button asChild className="bg-accent hover:bg-accent-light text-accent-foreground hover-lift">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6" data-netlify="true" name="homepage-contact">
                <input type="hidden" name="form-name" value="homepage-contact" />
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="bg-background/50 border-glass-border focus:border-accent" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="bg-background/50 border-glass-border focus:border-accent" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input 
                    name="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-background/50 border-glass-border focus:border-accent" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Business Name</label>
                  <Input 
                    name="business"
                    value={formData.business}
                    onChange={(e) => handleInputChange("business", e.target.value)}
                    className="bg-background/50 border-glass-border focus:border-accent" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Loan Type</label>
                  <Select onValueChange={(value) => handleInputChange("loanType", value)} name="loanType">
                    <SelectTrigger className="bg-background/50 border-glass-border focus:border-accent">
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      {loanTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Funding Amount</label>
                  <Input 
                    name="loanAmount"
                    placeholder="e.g. $500,000" 
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                    className="bg-background/50 border-glass-border focus:border-accent" 
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Tell us about your requirements</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="bg-background/50 border-glass-border focus:border-accent min-h-[120px]" 
                    placeholder="Describe your funding needs, timeline, and any specific requirements..."
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent-light text-accent-foreground py-6 text-lg hover-lift"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Your Enquiry"}
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