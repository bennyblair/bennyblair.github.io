import { isDesignPreview } from "@/lib/design-preview";
import { useRef, useState } from "react";
import { useHomepageMotion } from "@/hooks/use-homepage-motion";
import ProcessJourney from "@/components/ProcessJourney";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { generateOrganizationSchema, generateLocalBusinessSchema } from "@/lib/schema-utils";
import { trackLead } from "@/lib/analytics";
import { ArrowDown, ArrowRight, Pause, Play, Phone } from "lucide-react";
import type { ArticleSummary } from "@/lib/content";
import homepageContent from "virtual:homepage-content";

const services = [
  { title: "Commercial Property Finance", description: "Property-backed pathways for commercial purchases, refinancing and business-purpose equity release.", link: "/services/commercial-property-finance" },
  { title: "Property Development Finance", description: "Construction and development funding for residential, commercial, and mixed-use projects across Australia.", link: "/services/commercial-property-development" },
  { title: "Bridging Finance", description: "Short-term funding for property acquisition, settlements, and time-sensitive commercial opportunities.", link: "/services/bridging-finance" },
  { title: "Private Lending", description: "Fast, flexible commercial lending solutions when traditional banks can't meet your timeline or requirements.", link: "/services/private-lending" },
  { title: "Asset-Backed Lending", description: "Leverage your commercial property, equipment, or business assets to secure competitive funding solutions.", link: "/services/asset-backed-lending" },
  { title: "Caveat Loans", description: "Ultra-fast property-secured funding with settlements possible within 24-72 hours for urgent business needs.", link: "/services/caveat-loans" },
  { title: "Business Acquisition", description: "Funding solutions for purchasing existing businesses, management buyouts, and strategic acquisitions.", link: "/services/business-acquisition" },
];

const homepageCaseImages: Record<string, { src: string; srcSet: string; alt: string }> = {
  "second-mortgage-working-capital-case-study": {
    src: "/images/design/home-heritage-1600.webp",
    srcSet: "/images/design/home-heritage-800.webp 800w, /images/design/home-heritage-1600.webp 1600w",
    alt: "Brick and stone facade of Broughton House in Sydney",
  },
  "case-study-bridging-loan-won-the-property-auction": {
    src: "/images/design/home-acquisition-1600.webp",
    srcSet: "/images/design/home-acquisition-800.webp 800w, /images/design/home-acquisition-1600.webp 1600w",
    alt: "Angular glass commercial building in Melbourne",
  },
};

// Keep the example's facts and conditional wording; remove repeated editorial prefixes.
const scenarioOutcome = (text: string) => text
  .replace(/^Illustrative scenario based on:\s*/i, "Potential outcome: ")
  .replace(/^Illustrative scenario showing how\s*/i, "How ");

const Homepage = () => {
  const page = useRef<HTMLDivElement>(null);
  const [motionPaused, setMotionPaused] = useState(false);
  useHomepageMotion(page, motionPaused);
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
  const { toast } = useToast();

  const { latestArticles, featuredCaseStudies } = homepageContent;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (new FormData(form).get('bot-field')) return;
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
      
      if (isDevelopment || isDesignPreview) {
        // In development, just simulate success
        // Do not log personal enquiry details.
        toast({
          title: isDesignPreview ? "Preview only" : "Development Mode",
          description: isDesignPreview ? "No enquiry was sent. This is a private design preview." : "Form submission simulated. Deploy to Netlify to test actual submission.",
        });
      } else {
        // In production, submit to Netlify
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

      trackLead("homepage-contact", formData.loanType);

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
    <div className="homepage-page" ref={page}>
      <SEO title="Commercial Lending Solutions Australia | Emet Capital"
        description="Commercial lending solutions for Australian businesses, investors, and developers, including private lending, bridging finance, and property-backed funding."
        canonical="/" keywords="commercial lending australia, business finance, private lending, bridging finance, commercial property loans, commercial finance brokers"
        schemas={[generateOrganizationSchema(), generateLocalBusinessSchema()]} />

      <section className="home-hero">
        <svg className="hero-survey" viewBox="0 0 1200 900" fill="none" aria-hidden="true" focusable="false">
          <g className="hero-survey-lines">{Array.from({length: 40}, (_, index) => {
            const angle = index * Math.PI / 20;
            return <line key={index} x1={600 + Math.cos(angle) * 180} y1={380 + Math.sin(angle) * 145} x2={600 + Math.cos(angle) * 1100} y2={380 + Math.sin(angle) * 880} />;
          })}</g>
          <path className="hero-survey-register" d="M580 380h40M600 360v40M80 80h30M80 80v30M1120 80h-30M1120 80v30" />
        </svg>
        <div className="hero-controls"><span>Commercial finance. Australia-wide.</span><button type="button" className="motion-toggle" aria-pressed={motionPaused} onClick={() => setMotionPaused(value => !value)}>{motionPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}{motionPaused ? "Play motion" : "Pause motion"}</button></div>
        <div className="hero-copy">
          <p className="eyebrow">Emet Capital / Commercial finance</p>
          <h1><span className="hero-title-line">Commercial </span><span className="hero-title-line">Lending Solutions, </span><span className="hero-title-line">Expertly Engineered</span></h1>
        </div>
        <div className="hero-aside">
          <p className="hero-description">Australia-wide, asset-backed business finance solutions from $100K to $50M+ that scale with your ambition</p>
          <div className="hero-actions">
            <Link className="action-link action-light" to="/contact">Get Your Quote <ArrowRight aria-hidden="true" /></Link>
            <a className="phone-link" href="tel:0485952651"><Phone aria-hidden="true" />0485 952 651</a>
          </div>
        </div>
        <figure className="hero-image">
          <picture>
            <source media="(max-width: 640px)" type="image/avif" srcSet="/images/design/home-commercial-mobile-600.avif 600w, /images/design/home-commercial-mobile-900.avif 900w" sizes="max(100vw, 65vh)" width="900" height="1350" />
            <source media="(max-width: 640px)" srcSet="/images/design/home-commercial-mobile-600.webp 600w, /images/design/home-commercial-mobile-900.webp 900w" sizes="max(100vw, 65vh)" width="900" height="1350" />
            <source type="image/avif" srcSet="/images/design/home-commercial-1600.avif 1600w, /images/design/home-commercial-2400.avif 2400w" sizes="100vw" />
            <img src="/images/design/home-commercial-1600.webp" srcSet="/images/design/home-commercial-1600.webp 1600w, /images/design/home-commercial-2400.webp 2400w" sizes="100vw" alt="Glass and steel commercial building in Dandenong, Australia" width="2400" height="1800" fetchPriority="high" loading="eager" />
          </picture>
        </figure>
        <a className="hero-scroll" href="#finance-overview" aria-label="Explore Emet Capital"><ArrowDown aria-hidden="true" /><span>Scroll to explore</span></a>
      </section>

      <section id="finance-overview" className="home-positioning section-pad">
        <div className="section-heading" data-motion-enter><p className="eyebrow">The right structure</p><h2>Commercial Finance Specialists for Complex Australian Transactions</h2></div>
        <div className="positioning-copy" data-motion-enter><p>Emet Capital arranges commercial finance across property, business acquisition, working capital, bridging and specialist lending. We compare suitable bank, non-bank and private-credit options against the transaction purpose, security, timing and exit rather than promising a particular approval outcome.</p>
          <div className="proof-line"><div><strong>$150M+</strong><span>Commercial Loans Facilitated</span></div><div><strong>Broker-led</strong><span>Structured Lender Comparison</span></div><div><strong>Australia-wide</strong><span>Commercial Finance Coverage</span></div><div><strong>Case-by-case</strong><span>Lender and Structure Assessment</span></div></div>
        </div>
      </section>

      <section className="home-services section-pad">
        <div className="section-heading" data-motion-enter><p className="eyebrow">Finance solutions</p><h2>Commercial Finance Solutions</h2><p>Comprehensive business lending services designed for Australian commercial property investors, developers, and business owners who need fast, flexible financing solutions.</p><Link className="text-link" to="/services">View All Services <ArrowRight aria-hidden="true" /></Link></div>
        <figure className="service-portrait" data-motion-enter><Link to="/services" aria-label="Explore commercial finance solutions"><img fetchPriority="low" src="/images/design/home-services-1200.webp" srcSet="/images/design/home-services-800.webp 800w, /images/design/home-services-1200.webp 1200w, /images/design/home-services-1800.webp 1800w" sizes="(max-width: 700px) 100vw, 50vw" alt="Curved glass facade framing the sky in Melbourne" width="1800" height="2700" loading="lazy" /></Link></figure>
        <div className="service-directory">{services.slice(0,3).map((service,index)=><Link to={service.link} className="service-row" data-motion-enter key={service.link}><span className="row-number">{String(index+1).padStart(2,'0')}</span><div><h3>{service.title}</h3><p>{service.description}</p></div><ArrowRight aria-hidden="true" /></Link>)}<details className="content-disclosure"><summary>More commercial finance solutions <span aria-hidden="true">+</span></summary><div>{services.slice(3).map((service,index)=><Link to={service.link} className="service-row" data-motion-enter key={service.link}><span className="row-number">{String(index+4).padStart(2,'0')}</span><div><h3>{service.title}</h3><p>{service.description}</p></div><ArrowRight aria-hidden="true" /></Link>)}</div></details></div>
      </section>

      <section className="home-stories section-pad">
        <div className="section-header" data-motion-enter><div><p className="eyebrow">Finance in context</p><h2>Finance in practice</h2></div><p>Explore the structures, trade-offs and potential outcomes behind commercial finance. These examples explain funding approaches; they are not completed client transactions.</p></div>
        <div className="scenario-grid">{featuredCaseStudies.slice(0,2).map((study,index)=><article className={index === 0 ? "scenario-feature" : "scenario-feature scenario-feature-light"} key={study.slug}>
          {study.featuredImage && <figure className="scenario-media" data-motion-enter><Link to={`/resources/case-studies/${study.slug}`} aria-label={`Read ${study.title}`}><picture>{homepageCaseImages[study.slug] && <source type="image/avif" srcSet={homepageCaseImages[study.slug].srcSet.replaceAll(".webp", ".avif")} sizes="(max-width: 700px) 100vw, 50vw" />}<img fetchPriority="low" src={homepageCaseImages[study.slug]?.src || study.featuredImage} srcSet={homepageCaseImages[study.slug]?.srcSet} sizes="(max-width: 700px) 100vw, 50vw" alt={homepageCaseImages[study.slug]?.alt || study.featuredImageAlt || "Commercial property"} width={1600} height={1185} loading="lazy" /></picture></Link></figure>}
          <div className="scenario-meta"><span>{study.loanType || "Business Finance"}</span></div>
          <Link to={`/resources/case-studies/${study.slug}`} className="scenario-title"><h3>{study.title}</h3><ArrowRight aria-hidden="true" /></Link>
          <div className="scenario-facts"><strong>{study.loanAmount || "Custom Solution"}</strong><span>{study.industry || "Business"}{study.location ? ` / ${study.location}` : ""}</span></div>
          {study.outcome && <p>{scenarioOutcome(study.outcome)}</p>}{study.quote && <blockquote>"{study.quote}"</blockquote>}
        </article>)}</div><details className="content-disclosure"><summary>Explore more finance scenarios <span aria-hidden="true">+</span></summary><div className="scenario-grid">{featuredCaseStudies.slice(2).map((study)=><article className={"scenario-entry"} key={study.slug}>
          <div className="scenario-meta"><span>{study.loanType || "Business Finance"}</span></div>
          <Link to={`/resources/case-studies/${study.slug}`} className="scenario-title"><h3>{study.title}</h3><ArrowRight aria-hidden="true" /></Link>
          <div className="scenario-facts"><strong>{study.loanAmount || "Custom Solution"}</strong><span>{study.industry || "Business"}{study.location ? ` / ${study.location}` : ""}</span></div>
          {study.outcome && <p>{scenarioOutcome(study.outcome)}</p>}{study.quote && <blockquote>"{study.quote}"</blockquote>}
        </article>)}</div></details>
        <Link className="text-link" to="/resources/case-studies">View All Case Studies <ArrowRight aria-hidden="true" /></Link>
      </section>

      <section id="how-it-works" className="home-process section-pad">
        <ProcessJourney paused={motionPaused} />
        <details className="content-disclosure expertise-disclosure"><summary>Why Emet Capital <span aria-hidden="true">+</span></summary>        <div className="broker-rationale"><div><h2>Why Emet Capital</h2><p>A transaction process built around evidence, lender fit and clear trade-offs</p></div><div className="rationale-list">{[
          {label:"Lender Matching",value:"Structured",detail:"Compared against purpose, security and timing"},
          {label:"Transaction Review",value:"Case-by-case",detail:"No guaranteed approval or settlement claim"},
          {label:"Broker Support",value:"Direct",detail:"Commercial-finance guidance from enquiry to settlement"}
        ].map(item=><div key={item.label}><h3>{item.label}</h3><p><strong>{item.value}.</strong> {item.detail}</p></div>)}</div></div>
      <div className="home-about">
        <div className="section-heading"><p className="eyebrow">Commercial expertise</p><h2>Founded on Expertise,<br />Driven by Results</h2><Link className="text-link" to="/about">Learn More About Us <ArrowRight aria-hidden="true" /></Link></div>
        <div className="about-copy"><p>Our team combines extensive commercial lending experience with a deep understanding of Australia's financial landscape. We've structured complex deals across diverse industries and know what it takes to secure funding when it matters most.</p><div className="about-specialisms"><span><strong>Specialist</strong> Commercial Finance Focus</span><span><strong>Complex</strong> Transaction Experience</span><span><strong>$150M+</strong> Funds Facilitated</span></div>
          <h3>Nationwide Commercial Finance Coverage</h3><p>Operating across Sydney, Melbourne, Brisbane, Perth, Adelaide, and regional centers, we understand the unique challenges of Australian commercial property markets. From CBD high-rise developments to suburban commercial acquisitions, our local expertise ensures your finance solution is tailored to Australian regulations, market conditions, and business requirements.</p>
        </div>
      </div>

</details>
      </section>

      <section className="home-articles section-pad">
        <div className="section-header" data-motion-enter><div><p className="eyebrow">Knowledge & perspective</p><h2>Latest Articles & Insights</h2></div><p>Stay informed with our latest guides, case studies, and market insights. Fresh content to help you make smarter financing decisions.</p></div>
        <div className="insight-grid">{latestArticles.slice(0,3).map(article=><article className="insight-entry" data-motion-enter key={article.slug}><div className="article-meta"><span>{article.category}</span>{isNewArticle(article.date)&&<span className="new-label">New</span>}</div><Link to={getArticleUrl(article)}><h3>{article.title}</h3></Link><p>{article.description}</p><div className="article-byline"><span>{article.author}</span><time dateTime={article.date}>{new Date(article.date).toLocaleDateString('en-AU')}</time></div></article>)}</div><details className="content-disclosure"><summary>More articles & insights <span aria-hidden="true">+</span></summary><div className="insight-grid">{latestArticles.slice(3).map(article=><article className="insight-entry" data-motion-enter key={article.slug}><div className="article-meta"><span>{article.category}</span>{isNewArticle(article.date)&&<span className="new-label">New</span>}</div><Link to={getArticleUrl(article)}><h3>{article.title}</h3></Link><p>{article.description}</p><div className="article-byline"><span>{article.author}</span><time dateTime={article.date}>{new Date(article.date).toLocaleDateString('en-AU')}</time></div></article>)}</div></details>
        <div className="resource-links"><p>Explore more resources tailored to your needs</p><Link to="/resources/guides" className="text-link">View All Guides <ArrowRight aria-hidden="true" /></Link><Link to="/resources/case-studies" className="text-link">Browse Case Studies <ArrowRight aria-hidden="true" /></Link><Link to="/resources/insights" className="text-link">Market Insights <ArrowRight aria-hidden="true" /></Link></div>
      </section>

      <section className="home-contact">
        <div className="home-contact-inner section-pad">
        <div className="contact-intro" data-motion-enter><p className="eyebrow">Your next move</p><h2>Ready to Get Started?</h2><p>Tell us about your requirements and we'll be in touch within 24 hours</p><div className="contact-details"><div><h3>Call Us</h3><a href="tel:0485952651">0485 952 651</a></div><div><h3>Email Us</h3><a href="mailto:enquiry@emetcapital.com.au">enquiry@emetcapital.com.au</a></div><div><h3>Australia Wide</h3><p>Serving all states & territories</p></div></div></div>
        <div className="home-contact-card"><form onSubmit={handleSubmit} className="home-contact-form grid md:grid-cols-2 gap-6" data-netlify="true" data-netlify-honeypot="bot-field" name="homepage-contact">
                <input type="hidden" name="form-name" value="homepage-contact" />
                <p hidden>
                  <label htmlFor="homepage-bot-field">Do not fill this out</label>
                  <input id="homepage-bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
                </p>
                <div>
                  <label htmlFor="homepage-name" className="block text-sm font-medium mb-2">Name *</label>
                  <Input 
                    id="homepage-name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="bg-background/50 border-glass-border focus:border-accent" 
                  />
                </div>
                
                <div>
                  <label htmlFor="homepage-email" className="block text-sm font-medium mb-2">Email *</label>
                  <Input 
                    id="homepage-email"
                    name="email"
                    type="email" 
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="bg-background/50 border-glass-border focus:border-accent" 
                  />
                </div>
                
                <div>
                  <label htmlFor="homepage-phone" className="block text-sm font-medium mb-2">Phone</label>
                  <Input 
                    id="homepage-phone"
                    name="phone"
                    type="tel" 
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-background/50 border-glass-border focus:border-accent" 
                  />
                </div>
                
                <div>
                  <label htmlFor="homepage-business" className="block text-sm font-medium mb-2">Business Name</label>
                  <Input 
                    id="homepage-business"
                    name="business"
                    autoComplete="organization"
                    value={formData.business}
                    onChange={(e) => handleInputChange("business", e.target.value)}
                    className="bg-background/50 border-glass-border focus:border-accent" 
                  />
                </div>

                <div>
                  <label htmlFor="homepage-loan-type" className="block text-sm font-medium mb-2">Loan Type</label>
                  <select
                    id="homepage-loan-type"
                    name="loanType"
                    value={formData.loanType}
                    onChange={(event) => handleInputChange("loanType", event.target.value)}
                    className="flex h-10 w-full rounded-md border border-glass-border bg-background/50 px-3 py-2 text-sm text-foreground ring-offset-background focus:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select loan type</option>
                    {loanTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="homepage-loan-amount" className="block text-sm font-medium mb-2">Funding Amount</label>
                  <Input 
                    id="homepage-loan-amount"
                    name="loanAmount"
                    inputMode="decimal"
                    placeholder="e.g. $500,000" 
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                    className="bg-background/50 border-glass-border focus:border-accent" 
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="homepage-message" className="block text-sm font-medium mb-2">Tell us about your requirements</label>
                  <Textarea 
                    id="homepage-message"
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
              </form></div>
        </div>
      </section>
    </div>
  );
};
export default Homepage;
