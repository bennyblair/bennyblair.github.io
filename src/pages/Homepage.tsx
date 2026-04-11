import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { generateOrganizationSchema, generateLocalBusinessSchema } from "@/lib/schema-utils";
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Zap,
  Target,
  Award,
  Users,
  DollarSign
} from "lucide-react";
import sydneySkyline from "@/assets/sydney-skyline-hero.jpg";
import { getContentFiles, isRoutableContentArticle, type Article } from "@/lib/content";

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
  const [latestArticles, setLatestArticles] = useState<(Article & { contentType: 'guides' | 'case-studies' })[]>([]);
  const [featuredCaseStudies, setFeaturedCaseStudies] = useState<Article[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-triggered reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [latestArticles, featuredCaseStudies]);

  useEffect(() => {
    const loadLatestArticles = async () => {
      try {
        const [guides, caseStudies] = await Promise.all([
          getContentFiles('guides'),
          getContentFiles('case-studies')
        ]);
        
        // Set featured case studies for success stories (latest 2)
        const sortedCaseStudies = caseStudies.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setFeaturedCaseStudies(sortedCaseStudies.slice(0, 2));
        
        // Only surface articles that exist in the generated SEO route manifest
        const guidesWithType = guides
          .filter(article => isRoutableContentArticle('guides', article.slug))
          .map(article => ({ ...article, contentType: 'guides' as const }));
        const caseStudiesWithType = caseStudies
          .filter(article => isRoutableContentArticle('case-studies', article.slug))
          .map(article => ({ ...article, contentType: 'case-studies' as const }));
        
        // Combine only routable article types and sort by date (newest first)
        const allArticles = [...guidesWithType, ...caseStudiesWithType];
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
  const getArticleUrl = (article: Article & { contentType: 'guides' | 'case-studies' }) => {
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
        title="Commercial Lending Solutions Australia | Emet Capital"
        description="Commercial lending solutions for Australian businesses, investors, and developers, including private lending, bridging finance, and property-backed funding."
        canonical="/"
        keywords="commercial lending australia, business finance, private lending, bridging finance, commercial property loans, commercial finance brokers"
        schemas={[generateOrganizationSchema(), generateLocalBusinessSchema()]}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden pt-16 pb-24">
        {/* Sydney Skyline Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${sydneySkyline})`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        {/* Cinematic overlay — dark vignette + gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        
        {/* Hero content — left aligned */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="w-16 h-1 bg-accent mb-8 rounded-full" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
              Commercial Lending Solutions,
              <span className="gradient-text block mt-2">
                Expertly Engineered
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Australia-wide, asset-backed business finance solutions from $100K to $50M+ that scale with your ambition
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button asChild size="lg" className="group bg-accent hover:bg-accent-light text-accent-foreground px-10 py-7 text-lg rounded-2xl hover-lift">
                <Link to="/contact">
                  Get Your Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-2 border-white/20 text-white/90 hover:bg-white/10 px-10 py-7 text-lg rounded-2xl">
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Left column — narrative */}
            <div className="lg:col-span-3 reveal-left">
              <div className="w-12 h-1 bg-accent mb-6 rounded-full" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Australia's Leading Commercial Finance Specialists
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                With over 15 years of expertise in Australian commercial lending, we've facilitated over $2 billion in business finance across all major markets. 
                Our specialized team delivers fast settlements on complex deals that traditional banks won't touch, offering competitive rates 
                for property development, business acquisition, working capital, bridging finance, and specialized commercial lending solutions.
              </p>
              <p className="text-base text-muted-foreground/80 leading-relaxed">
                Operating across Sydney, Melbourne, Brisbane, Perth, Adelaide, and regional centers, we understand the unique challenges 
                of Australian commercial property markets. From CBD high-rise developments to suburban commercial acquisitions, 
                our local expertise ensures your finance solution is tailored to Australian regulations, market conditions, and business requirements.
              </p>
            </div>
            
            {/* Right column — stats grid */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-6">
              {[
                { value: "$2B+", label: "Commercial Loans Facilitated" },
                { value: "48HR", label: "Fast Approval Process" },
                { value: "15+", label: "Years Industry Experience" },
                { value: "95%", label: "Client Success Rate" }
              ].map((stat, index) => (
                <div key={index} className={`reveal-scale reveal-d${index + 1} p-6 rounded-2xl bg-card/60 border border-glass-border`}>
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Commercial Finance Services */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16 reveal">
            <div className="w-12 h-1 bg-accent mb-6 rounded-full" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Commercial Finance Solutions
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Comprehensive business lending services designed for Australian commercial property investors, 
              developers, and business owners who need fast, flexible financing solutions.
            </p>
          </div>
          
          {/* Featured services — two large cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
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
              }
            ].map((service, index) => (
              <Link key={index} to={service.link} className={`reveal reveal-d${index + 1}`}>
                <Card className="group h-full border-glass-border bg-card/60 hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
                  <CardContent className="p-8 flex items-start gap-6">
                    <div className="p-4 bg-accent/10 rounded-2xl shrink-0 group-hover:bg-accent/20 transition-colors">
                      <service.icon className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
                      <p className="text-muted-foreground text-base leading-relaxed">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Remaining services — compact 2x2 grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
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
              <Link key={index} to={service.link} className={`reveal reveal-d${index + 1}`}>
                <Card className="group h-full border-glass-border bg-card/40 hover:border-accent/40 transition-all duration-500 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <service.icon className="h-6 w-6 text-accent mb-4" />
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 reveal">
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-glass-border">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16 reveal">
            <div className="w-12 h-1 bg-accent mb-6 rounded-full" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Why Emet Capital
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Industry-leading metrics that speak to our expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-glass-border">
            {[
              { value: "90%", label: "Approval Speed", detail: "within 48hrs" },
              { value: "87%", label: "Deal Success Rate", detail: "approved" },
              { value: "5★", label: "Google Rating", detail: "18 reviews" }
            ].map((metric, index) => (
              <div key={index} className={`reveal reveal-d${index + 1} py-8 md:py-0 md:px-10 ${index === 0 ? 'md:pl-0' : ''} ${index === 2 ? 'md:pr-0' : ''}`}>
                <div className="text-5xl md:text-6xl font-bold text-accent mb-2 tracking-tight">{metric.value}</div>
                <div className="text-lg font-medium mb-1">{metric.label}</div>
                <div className="text-sm text-muted-foreground">{metric.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div className="max-w-xl reveal">
              <div className="w-12 h-1 bg-accent mb-6 rounded-full" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Success Stories
              </h2>
              <p className="text-lg text-muted-foreground">
                Real deals, real results, real growth
              </p>
            </div>
            <div className="reveal reveal-d2">
              <Button 
                asChild 
                size="lg"
                className="bg-accent hover:bg-accent-light text-accent-foreground"
              >
                <Link to="/resources/case-studies">
                  View All Case Studies
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            {featuredCaseStudies.map((study, i) => (
              <Link 
                key={study.slug} 
                to={`/resources/case-studies/${study.slug}`}
                className={`block ${i === 0 ? 'md:col-span-3' : 'md:col-span-2'} reveal reveal-d${i + 1}`}
              >
                <Card className="h-full border-glass-border bg-card/60 hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-accent/20 text-accent border-0">
                        {study.loanType || "Business Finance"}
                      </Badge>
                      <Badge variant="outline" className="border-glass-border">
                        {study.industry || "Business"}
                      </Badge>
                    </div>
                    <CardTitle className="text-3xl gradient-text mb-2">
                      {study.loanAmount || "Custom Solution"}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{study.location || ""}</p>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-3">{study.title}</h3>
                    <p className="text-base text-muted-foreground mb-4">{study.outcome}</p>
                    {study.quote && (
                      <blockquote className="border-l-2 border-accent/40 pl-4 italic text-muted-foreground text-sm">
                        "{study.quote}"
                      </blockquote>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Four simple steps to funding success
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0" />
            
            {[
              { step: "01", title: "Enquiry", description: "Tell us about your funding requirements" },
              { step: "02", title: "Assessment", description: "We evaluate your proposal and present options" },
              { step: "03", title: "Approval", description: "Fast-track approval with our lender network" },
              { step: "04", title: "Settlement", description: "Quick settlement and funding deployment" }
            ].map((step, index) => (
              <div key={index} className={`reveal reveal-d${index + 1} text-center relative`}>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border-2 border-accent/30 mb-6 relative z-10">
                  <span className="text-2xl font-bold text-accent">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50 border-y border-glass-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div className="max-w-xl reveal">
              <div className="w-12 h-1 bg-accent mb-6 rounded-full" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Latest Articles & Insights
              </h2>
              <p className="text-lg text-muted-foreground">
                Stay informed with our latest guides, case studies, and market insights. 
                Fresh content to help you make smarter financing decisions.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article, index) => (
              <div key={article.slug} className={`reveal reveal-d${Math.min(index + 1, 5)}`}>
                <Card className="h-full border-glass-border bg-card/60 hover:border-accent/30 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <Badge variant="outline" className="text-xs font-medium border-glass-border">
                        {article.category}
                      </Badge>
                      {isNewArticle(article.date) && (
                        <Badge className="bg-green-900/50 text-green-300 border-green-700 hover:bg-green-900/70 text-xs font-medium">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg line-clamp-2 leading-tight hover:text-accent transition-colors">
                      <Link 
                        to={getArticleUrl(article)}
                        className="block"
                      >
                        {article.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground/70">
                      <span>{article.author}</span>
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4 reveal">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-light text-accent-foreground">
              <Link to="/resources/guides">
                View All Guides
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-glass-border hover:bg-card">
              <Link to="/resources/case-studies">
                Browse Case Studies
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-glass-border hover:bg-card">
              <Link to="/resources/insights">
                Market Insights
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — editorial text */}
            <div className="reveal-left">
              <div className="w-12 h-1 bg-accent mb-6 rounded-full" />
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Founded on Expertise,
                <span className="block text-accent mt-1">
                  Driven by Results
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our team combines extensive commercial lending experience with a deep understanding 
                of Australia's financial landscape. We've structured complex deals across diverse 
                industries and know what it takes to secure funding when it matters most.
              </p>
              
              <Button asChild className="bg-accent hover:bg-accent-light text-accent-foreground">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {/* Right — stacked stats */}
            <div className="space-y-6 reveal-right">
              {[
                { icon: Award, value: "15+", label: "Years", sublabel: "Industry Experience" },
                { icon: Users, value: "300+", label: "Deals", sublabel: "Successful Settlements" },
                { icon: DollarSign, value: "$150M+", label: "Funded", sublabel: "Capital Facilitated" }
              ].map((stat, index) => (
                <div key={index} className={`reveal reveal-d${index + 1} flex items-center gap-6 p-6 rounded-2xl bg-card/40 border border-glass-border`}>
                  <stat.icon className="h-8 w-8 text-accent shrink-0" />
                  <div>
                    <span className="text-3xl font-bold text-accent">{stat.value}</span>
                    <span className="text-lg font-medium ml-2">{stat.label}</span>
                    <p className="text-sm text-muted-foreground">{stat.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 reveal">
            <div className="w-12 h-1 bg-accent mb-6 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Tell us about your requirements and we'll be in touch within 24 hours
            </p>
          </div>
          
          <Card className="border-glass-border bg-card/60 reveal reveal-d1">
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
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: Phone, title: "Call Us", content: "0485 952 651" },
              { icon: Mail, title: "Email Us", content: "enquiry@emetcapital.com.au" },
              { icon: MapPin, title: "Australia Wide", content: "Serving all states & territories" }
            ].map((contact, index) => (
              <div key={index} className={`reveal reveal-d${index + 1} flex items-center gap-4 p-5 rounded-2xl bg-card/40 border border-glass-border`}>
                <contact.icon className="h-6 w-6 text-accent shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm">{contact.title}</h3>
                  <p className="text-muted-foreground text-sm">{contact.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;