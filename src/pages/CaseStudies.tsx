import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { DollarSign, Building2, Clock, Filter, Star, TrendingUp } from "lucide-react";
import { getContentFiles, type Article } from "@/lib/content";
import { generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/schema-utils";

const CaseStudies = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Case Studies" }
  ];

  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [latestCaseStudy, setLatestCaseStudy] = useState<Article | null>(null);
  const [publishedCaseStudies, setPublishedCaseStudies] = useState<Article[]>([]);

  useEffect(() => {
    // Load published case studies from content system
    const caseStudies = getContentFiles('case-studies');
    setPublishedCaseStudies(caseStudies);
    
    // Get the most recent case study for hero section
    if (caseStudies.length > 0) {
      const latest = caseStudies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      setLatestCaseStudy(latest);
    }
  }, []);

  // Helper function to check if case study is "new" (within 7 days)
  const isNewCaseStudy = (date: string) => {
    const articleDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - articleDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const industries = [
    "All",
    "Property Development", 
    "Residential Development",
    "Hospitality Development",
    "Commercial Property",
    "Property Finance"
  ];

  // Filter case studies by industry
  const filteredCaseStudies = selectedIndustry === "All" 
    ? publishedCaseStudies 
    : publishedCaseStudies.filter(study => study.industry === selectedIndustry);

  // Featured case study (first one)
  const featuredCase = publishedCaseStudies[0];

  return (
    <div className="min-h-screen py-8">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateCollectionPageSchema(
          "Commercial Lending Case Studies",
          "Real success stories from Australian businesses that achieved their goals with our commercial lending solutions",
          "https://emetcapital.com.au/resources/case-studies",
          publishedCaseStudies.length
        ))}
      </script>
      
      <div className="container mx-auto px-4">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Commercial Lending Case Studies
          </h1>
          <p className="text-xl text-muted-foreground">
            Real success stories from Australian businesses that achieved their goals with our commercial lending solutions.
          </p>
        </div>

        {/* Latest Case Study Hero Section */}
        {latestCaseStudy && (
          <Card className="mb-8 bg-gradient-to-r from-accent/10 to-accent-light/10 border-accent/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                {isNewCaseStudy(latestCaseStudy.date) && (
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mr-3">
                    NEW
                  </span>
                )}
                <Star className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm font-medium text-accent">Latest Case Study</span>
              </div>
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {latestCaseStudy.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {latestCaseStudy.description}
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {latestCaseStudy.readingTime} min read
                    </div>
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full">
                      {latestCaseStudy.category}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(latestCaseStudy.date).toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
                  >
                    <Link to={`/resources/case-studies/${latestCaseStudy.slug}`}>
                      Read Latest Case Study
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
                  {featuredCase.challenge && (
                    <p className="text-lg text-muted-foreground mb-6">
                      Challenge: {featuredCase.challenge}
                    </p>
                  )}
                  {featuredCase.outcome && (
                    <p className="text-lg text-foreground font-medium mb-6">
                      Outcome: {featuredCase.outcome}
                    </p>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 p-4 rounded-lg text-center">
                      <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">{featuredCase.loanAmount || "N/A"}</div>
                      <div className="text-sm text-muted-foreground">Loan Amount</div>
                    </div>
                    <div className="bg-secondary-blue p-4 rounded-lg text-center">
                      <Building2 className="w-8 h-8 text-secondary-blue-foreground mx-auto mb-2" />
                      <div className="text-lg font-bold text-secondary-blue-foreground">{featuredCase.industry || featuredCase.category}</div>
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
          {filteredCaseStudies.slice(1).map((study) => (
            <Card key={study.slug} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg text-center">
                    <DollarSign className="w-6 h-6 text-primary mx-auto mb-1" />
                    <div className="text-lg font-bold text-primary">{study.loanAmount || "N/A"}</div>
                    <div className="text-xs text-muted-foreground">Amount</div>
                  </div>
                  <div className="bg-secondary-blue p-3 rounded-lg text-center">
                    <Clock className="w-6 h-6 text-secondary-blue-foreground mx-auto mb-1" />
                    <div className="text-sm font-bold text-secondary-blue-foreground">{study.duration || "N/A"}</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                </div>
                
                <span className="inline-block text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
                  {study.industry || study.category}
                </span>
                
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {study.title}
                </h3>
                
                <div className="space-y-3 mb-4">
                  {study.challenge && (
                    <div>
                      <div className="text-sm font-medium text-foreground">Challenge:</div>
                      <div className="text-sm text-muted-foreground">{study.challenge}</div>
                    </div>
                  )}
                  {study.outcome && (
                    <div>
                      <div className="text-sm font-medium text-foreground">Outcome:</div>
                      <div className="text-sm text-foreground font-medium">{study.outcome}</div>
                    </div>
                  )}
                  {study.location && (
                    <div>
                      <div className="text-sm font-medium text-foreground">Location:</div>
                      <div className="text-sm text-muted-foreground">{study.location}</div>
                    </div>
                  )}
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