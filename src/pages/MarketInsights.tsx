import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Breadcrumbs from "@/components/Breadcrumbs";
import { TrendingUp, Calendar, Clock, Filter, Star, Mail, ChevronRight } from "lucide-react";

const MarketInsights = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");

  const categories = [
    "All",
    "Market Trends",
    "Regulation", 
    "Industry Analysis",
    "Interest Rates",
    "Economic Updates"
  ];

  const insights = [
    {
      title: "Australian Commercial Lending Market Update: Q4 2024",
      excerpt: "Comprehensive analysis of current market conditions, rate trends, and lending appetite across major Australian commercial lenders.",
      category: "Market Trends",
      readTime: "8 min",
      publishDate: "2024-01-15",
      featured: true,
      slug: "commercial-lending-market-q4-2024"
    },
    {
      title: "RBA Rate Decisions Impact on Commercial Lending",
      excerpt: "How recent Reserve Bank decisions are affecting commercial lending rates and what businesses should expect in the coming months.",
      category: "Interest Rates",
      readTime: "6 min",
      publishDate: "2024-01-12",
      featured: false,
      slug: "rba-impact-commercial-lending"
    },
    {
      title: "New APRA Regulations for Commercial Property Finance",
      excerpt: "Understanding the latest regulatory changes and their implications for commercial property development financing.",
      category: "Regulation",
      readTime: "10 min",
      publishDate: "2024-01-10",
      featured: false,
      slug: "apra-commercial-property-regulations"
    },
    {
      title: "Construction Industry Financing Trends 2024",
      excerpt: "Deep dive into construction and development finance market conditions, including regional variations and sector-specific insights.",
      category: "Industry Analysis",
      readTime: "12 min",
      publishDate: "2024-01-08",
      featured: false,
      slug: "construction-financing-trends-2024"
    },
    {
      title: "SME Lending Recovery: Post-COVID Market Analysis",
      excerpt: "How small and medium enterprise lending has evolved since COVID-19, including new opportunities and challenges.",
      category: "Market Trends",
      readTime: "9 min",
      publishDate: "2024-01-05",
      featured: false,
      slug: "sme-lending-recovery-analysis"
    },
    {
      title: "Alternative Lenders Gaining Market Share",
      excerpt: "The rise of non-bank lenders and how they're changing the commercial lending landscape in Australia.",
      category: "Market Trends",
      readTime: "7 min",
      publishDate: "2024-01-03",
      featured: false,
      slug: "alternative-lenders-market-share"
    },
    {
      title: "Infrastructure Spending and Commercial Opportunities",
      excerpt: "Government infrastructure investment creating new opportunities for commercial lending across construction and related sectors.",
      category: "Economic Updates",
      readTime: "11 min",
      publishDate: "2023-12-28",
      featured: false,
      slug: "infrastructure-commercial-opportunities"
    },
    {
      title: "ESG Factors in Commercial Lending Decisions",
      excerpt: "How Environmental, Social, and Governance considerations are increasingly influencing commercial lending approvals and terms.",
      category: "Industry Analysis",
      readTime: "8 min",
      publishDate: "2023-12-25",
      featured: false,
      slug: "esg-commercial-lending"
    }
  ];

  const filteredInsights = selectedCategory === "All" 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory);

  const featuredInsight = insights.find(insight => insight.featured);

  const marketSummary = {
    currentRates: "6.5% - 12.5%",
    marketActivity: "Moderate",
    lenderAppetite: "Selective",
    averageApproval: "14-21 days"
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Market Insights" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Commercial Lending Market Insights
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay informed with the latest trends, analysis, and insights from Australia's commercial lending market. Expert commentary to guide your financing decisions.
          </p>
        </div>

        {/* Market Summary */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 to-primary-light/5 border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-accent" />
              Current Market Summary
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{marketSummary.currentRates}</div>
                <div className="text-sm text-muted-foreground">Interest Rate Range</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{marketSummary.marketActivity}</div>
                <div className="text-sm text-muted-foreground">Market Activity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{marketSummary.lenderAppetite}</div>
                <div className="text-sm text-muted-foreground">Lender Appetite</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{marketSummary.averageApproval}</div>
                <div className="text-sm text-muted-foreground">Avg. Approval Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Insight */}
        {featuredInsight && (
          <Card className="mb-12 bg-gradient-to-r from-accent/5 to-accent-light/5 border-accent/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm font-medium text-accent">Featured Insight</span>
              </div>
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {featuredInsight.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {featuredInsight.excerpt}
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredInsight.publishDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredInsight.readTime} read
                    </div>
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">
                      {featuredInsight.category}
                    </span>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
                  >
                    <Link to={`/resources/insights/${featuredInsight.slug}`}>
                      Read Full Analysis
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Filter className="w-5 h-5 text-muted-foreground mt-2 mr-2" />
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-primary" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredInsights.filter(insight => !insight.featured).map((insight) => (
            <Card key={insight.slug} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {insight.category}
                  </span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {insight.readTime}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {insight.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {insight.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(insight.publishDate).toLocaleDateString()}
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/resources/insights/${insight.slug}`}>
                    Read More
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mb-12">
          <CardContent className="p-8 text-center">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated with Market Insights
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get weekly market updates, rate alerts, and expert analysis delivered directly to your inbox. Stay ahead of market changes that could impact your business.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="email" className="sr-only">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <section className="text-center py-12 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-2xl mx-auto px-8">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">
              Need Market-Specific Advice?
            </h2>
            <p className="text-primary-foreground/90 mb-6">
              Our market insights provide general trends, but your specific situation deserves personalized analysis. Get expert advice tailored to your industry and financing needs.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-accent hover:bg-accent-dark text-accent-foreground"
            >
              <Link to="/contact">Get Expert Market Analysis</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MarketInsights;