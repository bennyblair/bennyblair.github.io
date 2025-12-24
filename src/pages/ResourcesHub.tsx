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
      href: "/tools",
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
      title: "Commercial Bridging Finance: Short Term Property Finance — Costs, Timing, Uses",
      description: "Understanding short-term property finance options, costs, timing, and how we arrange these facilities with lenders.",
      readTime: "8 min read",
      href: "/resources/guides/short-term-property-finance"
    },
    {
      type: "Guide", 
      title: "Understanding Commercial Asset Finance in 2025",
      description: "A comprehensive guide to commercial asset finance options, rates, and approval processes for Australian businesses in 2025.",
      readTime: "12 min read",
      href: "/resources/guides/2025-09-09-commercial-asset-finance-guide"
    },
    {
      type: "Guide",
      title: "Second Mortgage for Business Use: Second Mortgage Australia",
      description: "Australian commercial guide on second mortgage australia: when to use it, eligibility, pricing and how we arrange it with lenders.",
      readTime: "8 min read",
      href: "/resources/guides/second-mortgage-australia"
    }
  ];

  const keyTakeaways = [
    "Access comprehensive commercial lending information from industry professionals",
    "Understand different loan types and their optimal use cases", 
    "Learn from real client success stories and outcomes",
    "Use professional-grade calculators and planning tools",
    "Stay updated with the latest market trends and rates"
  ];

  return (
    <div className="min-h-screen py-8">
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