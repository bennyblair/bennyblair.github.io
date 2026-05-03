import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { 
  BookOpen, 
  FileText, 
  Calculator, 
  Book, 
  HelpCircle, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";
import SEO from "@/components/SEO";

const ResourcesHub = () => {
  const resourceSections = [
    {
      icon: BookOpen,
      title: "Guides",
      description: "Comprehensive guides covering all aspects of commercial lending in Australia.",
      href: "/resources/guides",
      features: ["Step-by-step processes", "Industry insights", "Best practices"],
      count: "15+ Guides"
    },
    {
      icon: FileText,
      title: "Case Studies",
      description: "Real-world examples of successful commercial lending solutions.",
      href: "/resources/case-studies",
      features: ["Actual loan scenarios", "Challenge solutions", "ROI outcomes"],
      count: "12+ Case Studies"
    },
    {
      icon: Calculator,
      title: "Tools & Calculators",
      description: "Interactive tools to help plan and estimate your commercial lending needs.",
      href: "/resources/tools",
      features: ["Loan calculators", "Cash flow tools", "ROI estimators"],
      count: "8+ Tools"
    },
    {
      icon: Book,
      title: "Glossary",
      description: "Complete definitions of commercial lending terms and concepts.",
      href: "/resources/glossary",
      features: ["Industry terminology", "Quick definitions", "Searchable database"],
      count: "100+ Terms"
    },
    {
      icon: HelpCircle,
      title: "FAQs",
      description: "Answers to the most common commercial lending questions.",
      href: "/resources/faqs",
      features: ["Expert answers", "Categorized topics", "Updated regularly"],
      count: "25+ Questions"
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Latest trends, rates, and analysis of the Australian commercial lending market.",
      href: "/resources/insights",
      features: ["Market analysis", "Rate updates", "Industry trends"],
      count: "Weekly Updates"
    }
  ];

  const featuredContent = [
    {
      type: "Guide",
      title: "Short-Term Property Loans: When You Need Fast Finance",
      description: "A practical guide to short-term property loans, when they fit, what lenders assess, and how timing pressure changes the funding structure.",
      readTime: "8 min read",
      href: "/resources/guides/short-term-property-loans-when-you-need-fast-finance"
    },
    {
      type: "Guide", 
      title: "Asset-Backed Lending & Asset Finance",
      description: "A practical guide to asset-backed lending and asset finance, including use cases, lender expectations, and how these facilities are typically structured.",
      readTime: "12 min read",
      href: "/resources/guides/asset-backed-lending-and-asset-finance"
    },
    {
      type: "Guide",
      title: "Second Mortgage for Business",
      description: "A practical Australian guide to second mortgages for business use, including when they fit, what lenders assess, and how layered debt should be structured.",
      readTime: "8 min read",
      href: "/resources/guides/second-mortgage-for-business"
    }
  ];

  const keyTakeaways = [
    "Compare lending structures before approaching a lender, including security position, term, exit strategy, and cash-flow fit",
    "Use practical guides to understand what commercial lenders usually assess, such as security, serviceability, business purpose, and repayment source", 
    "Review case studies to see how funding structures can work in time-sensitive property, asset, trade, and working-capital scenarios",
    "Use calculators as planning tools, then confirm assumptions with a broker before relying on them",
    "Treat all resources as general information only, not personal financial advice or a guarantee of funding"
  ];

  return (
    <div className="min-h-screen py-8">
      <SEO 
        title="Commercial Lending Resources | Guides, Tools & Insights | Emet Capital"
        description="Free commercial lending resources including guides, calculators, case studies, FAQs and market insights. Expert knowledge to help Australian businesses secure financing."
        canonical="/resources"
        keywords="commercial lending resources, business finance guides, loan calculators, case studies, commercial lending FAQs"
      />
      
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Resources" }
        ]} />

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Commercial Lending Resources
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Comprehensive insights, tools, and information to help you navigate Australia's commercial lending landscape. Everything you need to make informed financing decisions.
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
          >
            <Link to="/contact">Discuss Your Requirements</Link>
          </Button>
        </div>

        {/* Key Takeaways */}
        <Card className="mb-16 bg-secondary-blue">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-secondary-blue-foreground mb-6 flex items-center">
              <Star className="w-6 h-6 mr-3 text-accent" />
              Key Takeaways from Our Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {keyTakeaways.map((takeaway, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-blue-foreground">{takeaway}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Indexing Support Section */}
        <section className="mb-16 grid lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">How to use these commercial lending resources</h2>
              <p className="text-muted-foreground mb-4">
                Start with the finance type that matches the business problem, then compare the lender's usual assessment criteria before you enquire. A short-term property purchase, an equipment upgrade, a trade import cycle, and a debt consolidation need different evidence and different exit planning.
              </p>
              <p className="text-muted-foreground mb-4">
                For property-backed funding, compare guides such as <Link className="text-primary underline" to="/resources/guides/caveat-loans-australia-complete-guide">caveat loans in Australia</Link>, <Link className="text-primary underline" to="/resources/guides/first-mortgage-loans-primary-property-finance">first mortgage loans</Link>, and <Link className="text-primary underline" to="/resources/guides/second-mortgages-for-business-guide">second mortgages for business</Link>. For operating cash-flow needs, use the <Link className="text-primary underline" to="/resources/guides/working-capital-loans-for-smes">working capital guide</Link> and <Link className="text-primary underline" to="/resources/guides/debtor-finance-supply-chain-finance-australia">debtor and supply chain finance guide</Link>.
              </p>
              <p className="text-muted-foreground">
                These resources are general information only. They help you prepare better questions, but they do not replace professional advice or lender assessment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Most useful starting points</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link className="text-primary underline" to="/resources/guides/commercial-property-loans-australia-complete-guide">Commercial property loans</Link> for buying, refinancing, or releasing equity from business property.</li>
                <li><Link className="text-primary underline" to="/resources/guides/bridging-finance-australia-complete-property-guide">Bridging finance</Link> for settlement gaps where timing and a clear exit are central.</li>
                <li><Link className="text-primary underline" to="/resources/guides/equipment-finance-and-leasing-australia">Equipment finance</Link> for machinery, vehicles, medical equipment, and other productive assets.</li>
                <li><Link className="text-primary underline" to="/resources/guides/business-debt-consolidation-australia">Business debt consolidation</Link> for simplifying multiple facilities and reviewing cash-flow pressure.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Resource Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {resourceSections.map((section) => (
            <Card key={section.title} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <section.icon className="w-12 h-12 text-primary" />
                  <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {section.count}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {section.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {section.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full group-hover:bg-primary-light transition-colors">
                  <Link to={section.href}>
                    Explore {section.title}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Content */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Featured Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredContent.map((content, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {content.type}
                    </span>
                    <span className="text-sm text-muted-foreground">{content.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {content.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {content.description}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={content.href}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-16 py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">
              Need Bespoke Lending Solutions?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Our resources provide valuable insights, but every business is unique. Connect with our commercial lending specialists to discuss potential financing options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-accent hover:bg-accent-dark text-accent-foreground"
              >
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/resources/tools">Try Our Calculators</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResourcesHub;