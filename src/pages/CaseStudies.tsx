import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { DollarSign, Building2, Clock, Filter, Star, TrendingUp } from "lucide-react";

const CaseStudies = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const industries = [
    "All",
    "Property Development",
    "Manufacturing",
    "Retail",
    "Healthcare",
    "Construction",
    "Technology"
  ];

  const caseStudies = [
    {
      title: "$2.5M Development Finance Success Story",
      loanAmount: "$2.5M",
      loanType: "Development Finance",
      industry: "Property Development",
      duration: "18 months",
      outcome: "35% profit margin achieved",
      challenge: "Time-sensitive acquisition with complex zoning requirements",
      featured: true,
      slug: "2-5m-development-finance"
    },
    {
      title: "Manufacturing Equipment Finance Breakthrough",
      loanAmount: "$850K",
      loanType: "Asset Finance",
      industry: "Manufacturing",
      duration: "5 years",
      outcome: "40% production increase",
      challenge: "Upgrading aging equipment while maintaining cash flow",
      featured: false,
      slug: "manufacturing-equipment-finance"
    },
    {
      title: "Retail Chain Working Capital Solution",
      loanAmount: "$1.2M",
      loanType: "Working Capital",
      industry: "Retail",
      duration: "Revolving facility",
      outcome: "Expanded to 3 new locations",
      challenge: "Seasonal cash flow fluctuations impacting growth",
      featured: false,
      slug: "retail-working-capital"
    },
    {
      title: "Medical Practice Bridging Finance",
      loanAmount: "$650K",
      loanType: "Bridging Finance",
      industry: "Healthcare",
      duration: "12 months",
      outcome: "Practice value increased 25%",
      challenge: "Quick settlement needed for prime location",
      featured: false,
      slug: "medical-practice-bridging"
    },
    {
      title: "Construction Company Cash Flow Recovery",
      loanAmount: "$1.8M",
      loanType: "Invoice Finance",
      industry: "Construction",
      duration: "24 months",
      outcome: "Projects completed on time",
      challenge: "Large projects with delayed payment terms",
      featured: false,
      slug: "construction-cash-flow"
    },
    {
      title: "Tech Startup Growth Capital",
      loanAmount: "$500K",
      loanType: "Working Capital",
      industry: "Technology",
      duration: "3 years",
      outcome: "Revenue growth 300%",
      challenge: "High growth requiring immediate capital injection",
      featured: false,
      slug: "tech-startup-growth"
    }
  ];

  const filteredCaseStudies = selectedIndustry === "All" 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === selectedIndustry);

  const featuredCase = caseStudies.find(study => study.featured);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Case Studies" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Commercial Lending Case Studies
          </h1>
          <p className="text-xl text-muted-foreground">
            Real success stories from Australian businesses that achieved their goals with our commercial lending solutions.
          </p>
        </div>

        {/* Featured Case Study */}
        {featuredCase && (
          <Card className="mb-12 bg-gradient-to-r from-accent/5 to-accent-light/5 border-accent/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm font-medium text-accent">Featured Case Study</span>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {featuredCase.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Challenge: {featuredCase.challenge}
                  </p>
                  <p className="text-lg text-foreground font-medium mb-6">
                    Outcome: {featuredCase.outcome}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 p-4 rounded-lg text-center">
                      <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">{featuredCase.loanAmount}</div>
                      <div className="text-sm text-muted-foreground">Loan Amount</div>
                    </div>
                    <div className="bg-secondary-blue p-4 rounded-lg text-center">
                      <Building2 className="w-8 h-8 text-secondary-blue-foreground mx-auto mb-2" />
                      <div className="text-lg font-bold text-secondary-blue-foreground">{featuredCase.industry}</div>
                      <div className="text-sm text-muted-foreground">Industry</div>
                    </div>
                  </div>
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
                  >
                    <Link to={`/resources/case-studies/${featuredCase.slug}`}>
                      Read Full Case Study
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Industry Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Filter className="w-5 h-5 text-muted-foreground mt-2 mr-2" />
          {industries.map((industry) => (
            <Button
              key={industry}
              variant={selectedIndustry === industry ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedIndustry(industry)}
              className={selectedIndustry === industry ? "bg-primary" : ""}
            >
              {industry}
            </Button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaseStudies.filter(study => !study.featured).map((study) => (
            <Card key={study.slug} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg text-center">
                    <DollarSign className="w-6 h-6 text-primary mx-auto mb-1" />
                    <div className="text-lg font-bold text-primary">{study.loanAmount}</div>
                    <div className="text-xs text-muted-foreground">Amount</div>
                  </div>
                  <div className="bg-secondary-blue p-3 rounded-lg text-center">
                    <Clock className="w-6 h-6 text-secondary-blue-foreground mx-auto mb-1" />
                    <div className="text-sm font-bold text-secondary-blue-foreground">{study.duration}</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                </div>
                
                <span className="inline-block text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
                  {study.industry}
                </span>
                
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {study.title}
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">Challenge:</div>
                    <div className="text-sm text-muted-foreground">{study.challenge}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Outcome:</div>
                    <div className="text-sm text-foreground font-medium">{study.outcome}</div>
                  </div>
                </div>

                <Button asChild variant="outline" className="w-full">
                  <Link to={`/resources/case-studies/${study.slug}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Summary */}
        <section className="mt-16 py-12 bg-muted rounded-2xl">
          <div className="text-center max-w-4xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Success by the Numbers
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">$25M+</div>
                <div className="text-muted-foreground">Total Loans Facilitated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Client Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">14 Days</div>
                <div className="text-muted-foreground">Average Approval Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Industries Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-16 py-12 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-2xl mx-auto px-8">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-primary-foreground/90 mb-6">
              Join the hundreds of Australian businesses that have achieved their goals with our commercial lending expertise.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-accent hover:bg-accent-dark text-accent-foreground"
            >
              <Link to="/contact">Start Your Application</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CaseStudies;