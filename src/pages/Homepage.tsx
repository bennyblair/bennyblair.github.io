import TransactionEnquiryForm from "@/components/TransactionEnquiryForm";
import TransactionJourneys from "@/components/TransactionJourneys";
import { ENQUIRY_RESPONSE_MESSAGE } from "@/lib/transactions";
import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import SEO from "@/components/SEO";
import { generateOrganizationSchema, generateLocalBusinessSchema } from "@/lib/schema-utils";
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowLeft,
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

import { getContentSummaries, isRoutableContentArticle, type ArticleSummary } from "@/lib/content";

const Homepage = () => {
  const storiesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const [processActive, setProcessActive] = useState(false);
  const { latestArticles, featuredCaseStudies } = useMemo(() => {
    const guides = getContentSummaries('guides');
    const caseStudies = getContentSummaries('case-studies');
    const latest = [
      ...guides
        .filter(article => isRoutableContentArticle('guides', article.slug))
        .map(article => ({ ...article, contentType: 'guides' as const })),
      ...caseStudies
        .filter(article => isRoutableContentArticle('case-studies', article.slug))
        .map(article => ({ ...article, contentType: 'case-studies' as const })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);

    return {
      latestArticles: latest,
      featuredCaseStudies: caseStudies
        .filter(article => isRoutableContentArticle('case-studies', article.slug))
        .slice(0, 8),
    };
  }, []);

  useEffect(() => {
    const section = processRef.current;
    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setProcessActive(true);
      observer.unobserve(section);
    }, { threshold: 0.28 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollStories = (direction: -1 | 1) => {
    const rail = storiesRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * Math.max(320, rail.clientWidth * 0.82),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  // Helper function to check if article is new (within 7 days)
  const isNewArticle = (date: string) => {
    const articleDate = new Date(date);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return articleDate > sevenDaysAgo;
  };

  // Helper function to generate correct article URL based on content type
  const getArticleUrl = (article: ArticleSummary & { contentType: 'guides' | 'case-studies' }) => {
    return `/resources/${article.contentType}/${article.slug}`;
  };

  return (
    <div className="homepage-page min-h-screen bg-background text-foreground">
      <SEO 
        title="Commercial Lending Solutions Australia | Emet Capital"
        description="Commercial lending solutions for Australian businesses, investors, and developers, including private lending, bridging finance, and property-backed funding."
        canonical="/"
        keywords="commercial lending australia, business finance, private lending, bridging finance, commercial property loans, commercial finance brokers"
        schemas={[generateOrganizationSchema(), generateLocalBusinessSchema()]}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        {/* The visible hero artwork is the LCP asset. Render it directly so the
            browser does not download a competing poster and video first. */}
        <div className="absolute inset-0">
          <picture aria-hidden="true">
            <source media="(max-width: 560px)" srcSet="/images/emet-abstract-hero-mobile.jpg" />
            <img
              src="/images/emet-abstract-hero.jpg"
              alt=""
              width="1600"
              height="900"
              loading="eager"
              decoding="sync"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        </div>
        
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/60" />
        
        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-relaxed pb-4">
              Property-Backed
              <span className="gradient-text block mt-2 leading-normal">
                Business Finance
              </span>
            </h1>
          </div>
          
          <div className="fade-in-up" style={{ animationDelay: '700ms' }}>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
              Purchases, refinances, bridging and equity release for business purposes. Residential or commercial property security, Australia-wide, from $100K to $50M+.
            </p>
          </div>
          
          <div className="scale-in" style={{ animationDelay: '1200ms' }}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="group bg-accent hover:bg-accent-light text-accent-foreground px-10 py-7 text-lg rounded-2xl hover-lift">
                <Link to="/contact">
                  Discuss Your Transaction
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

      <div className="max-w-7xl mx-auto px-4"><TransactionJourneys /></div>

      {/* Commercial Finance Expertise Overview */}
      <section className="home-expertise py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Commercial Finance Specialists for Complex Australian Transactions
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Emet Capital arranges commercial finance across property, business acquisition, working capital, bridging and specialist lending.
                We compare suitable bank, non-bank and private-credit options against the transaction purpose, security, timing and exit rather than promising a particular approval outcome.
              </p>
            </div>
          </ScrollReveal>
          
          {/* Market Expertise Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  $150M+
                </div>
                <div className="text-sm text-muted-foreground">Commercial Loans Facilitated</div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  Broker-led
                </div>
                <div className="text-sm text-muted-foreground">Structured Lender Comparison</div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  Australia-wide
                </div>
                <div className="text-sm text-muted-foreground">Commercial Finance Coverage</div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  Case-by-case
                </div>
                <div className="text-sm text-muted-foreground">Lender and Structure Assessment</div>
              </div>
            </ScrollReveal>
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
      <section className="home-services py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Commercial Finance <span className="gradient-text">Solutions</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Comprehensive business lending services designed for Australian commercial property investors, 
                developers, and business owners who need fast, flexible financing solutions.
              </p>
            </div>
          </ScrollReveal>
          
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
                description: "Short-term property-backed business funding assessed against title, equity, timing and a clear repayment plan.",
                link: "/services/caveat-loans"
              },
              {
                icon: Target,
                title: "Business Acquisition",
                description: "Funding solutions for purchasing existing businesses, management buyouts, and strategic acquisitions.",
                link: "/services/business-acquisition"
              }
            ].map((service, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <TiltCard className="rounded-2xl h-full">
                  <Link to={service.link}>
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
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-muted hover:text-foreground">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Emet Capital */}
      <section className="home-performance py-20 px-4 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Why <span className="gradient-text">Emet Capital</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A transaction process built around evidence, lender fit and clear trade-offs
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { label: "Lender Matching", value: "Structured", detail: "Compared against purpose, security and timing" },
              { label: "Transaction Review", value: "Case-by-case", detail: "No guaranteed approval or settlement claim" },
              { label: "Broker Support", value: "Direct", detail: "Commercial-finance guidance from enquiry to settlement" }
            ].map((metric, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 150}>
                <TiltCard className="rounded-2xl h-full">
                  <Card className="premium-card text-center h-full">
                    <CardHeader>
                      <CardTitle className="text-lg text-muted-foreground">{metric.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold gradient-text mb-4">
                        {metric.value}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {metric.detail}
                      </p>
                    </CardContent>
                  </Card>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
          
        </div>
      </section>

      {/* Case Studies */}
      <section className="home-stories py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Finance <span className="gradient-text">Scenarios</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore how funding structures may work. Illustrative scenarios explain a possible approach and are not evidence of a completed client transaction.
              </p>
            </div>
          </ScrollReveal>
          
          <div
            ref={storiesRef}
            className="grid success-stories-rail"
            role="region"
            aria-label="Success stories"
          >
            {featuredCaseStudies.map((study, index) => (
              <ScrollReveal key={study.slug} animation="fade-up" delay={index * 150}>
                <TiltCard className="rounded-2xl h-full">
                  <Link 
                    to={`/resources/case-studies/${study.slug}`}
                    className="block h-full"
                    aria-label={`${study.title} — ${study.loanAmount || "Custom solution"}`}
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
                    <CardTitle className="text-3xl gradient-text mb-2">
                      {study.loanAmount && study.loanAmount !== "N/A" ? study.loanAmount : "Funding scenario"}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{study.location || ""}</p>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-3">{study.title}</h3>
                    <p className="text-base text-muted-foreground mb-4">{study.description}</p>

                  </CardContent>
                </Card>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <div className="success-stories-controls" aria-label="Success story controls">
            <button type="button" onClick={() => scrollStories(-1)} aria-label="View previous success stories">
              <ArrowLeft aria-hidden="true" />
            </button>
            <span>Scroll to explore more</span>
            <button type="button" onClick={() => scrollStories(1)} aria-label="View more success stories">
              <ArrowRight aria-hidden="true" />
            </button>
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
      <section
        ref={processRef}
        className={`home-process emet-funnel-section py-24 px-4 bg-gradient-to-b from-transparent to-primary/5 ${processActive ? "is-funnel-active" : ""}`}
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From the first conversation to lender assessment and settlement
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Enquiry", description: "Outline the purpose, property security and funding date" },
              { step: "02", title: "Assessment", description: "We review the file, lender fit and trade-offs" },
              { step: "03", title: "Approval", description: "The lender assesses the file and sets any approval conditions" },
              { step: "04", title: "Settlement", description: "Legal documents and conditions must be satisfied before funds are released" }
            ].map((step, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <div className="text-center group">
                  <TiltCard className="rounded-2xl">
                    <div className="premium-card p-8 mb-4">
                      <div className="text-4xl font-bold mb-4">{step.step}</div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </TiltCard>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="home-articles py-24 px-4 bg-background text-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Latest Articles & Insights
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stay informed with our latest guides, case studies, and market insights. 
                Fresh content to help you make smarter financing decisions.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article, index) => (
              <div key={article.slug} className={`fade-in-up delay-${index * 100}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-border bg-transparent text-card-foreground">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <Badge variant="outline" className="text-xs font-medium border-border text-muted-foreground">
                        {article.category}
                      </Badge>
                      {isNewArticle(article.date) && (
                        <Badge variant="outline" className="home-new-badge border-border text-foreground text-xs font-medium">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg line-clamp-2 leading-tight text-foreground transition-colors">
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
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.author}</span>
                      <span>{new Date(article.date).toLocaleDateString('en-AU')}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="home-article-cta text-center mt-12">
            <div className="fade-in-up delay-600">
              <p className="text-muted-foreground mb-6">
                Explore more resources tailored to your needs
              </p>
              <div className="home-article-actions flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="min-w-[160px] bg-accent hover:bg-accent-dark text-accent-foreground">
                  <Link to="/resources/guides">
                    View All Guides
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-w-[160px] border-border text-foreground hover:bg-muted hover:text-foreground">
                  <Link to="/resources/case-studies">
                    Browse Case Studies
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-w-[160px] border-border text-foreground hover:bg-muted hover:text-foreground">
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
      <section className="home-about py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="fade-up">
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
            </ScrollReveal>
              
              <div className="grid sm:grid-cols-3 gap-8 mb-12">
                {[
                  { icon: Award, label: "Specialist", description: "Commercial Finance Focus" },
                  { icon: Users, label: "Complex", description: "Transaction Experience" },
                  { icon: DollarSign, label: "$150M+", description: "Funds Facilitated" }
                ].map((stat, index) => (
                  <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                    <div className="text-center">
                      <stat.icon className="h-10 w-10 text-accent mx-auto mb-4" />
                      <div className="text-3xl font-bold gradient-text">{stat.label}</div>
                      <div className="text-base text-muted-foreground">{stat.description}</div>
                    </div>
                  </ScrollReveal>
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
      </section>

      {/* Contact Form */}
      <section className="home-contact py-24 px-4 bg-gradient-to-b from-transparent to-primary/10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="gradient-text">Get Started?</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                {ENQUIRY_RESPONSE_MESSAGE}
              </p>
            </div>
          </ScrollReveal>
          
          <Card className="home-contact-card premium-card">
            <CardContent className="p-8">
              <TransactionEnquiryForm formName="homepage-contact" className="home-contact-form" />
            </CardContent>
          </Card>
          
          {/* Contact Info */}
          <div className="home-contact-details grid md:grid-cols-3 gap-8 mt-16 text-center">
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
