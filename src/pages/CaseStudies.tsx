import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { DollarSign, Building2, Clock, Filter, Star, TrendingUp, MapPin, ArrowRight, BookOpen } from "lucide-react";
import { getContentFiles, type Article } from "@/lib/content";
import { generateCollectionPageSchema } from "@/lib/schema-utils";
import SEO from "@/components/SEO";

// Define category groupings with related services and guides
interface CaseStudyCategory {
  id: string;
  title: string;
  description: string;
  loanTypes: string[];
  relatedService: string;
  relatedServiceTitle: string;
  relatedGuide: string;
  relatedGuideTitle: string;
}

const caseStudyCategories: CaseStudyCategory[] = [
  {
    id: "bridging",
    title: "Bridging Finance",
    description: "Time-sensitive funding for property purchases, auctions, and settlement gaps.",
    loanTypes: ["Bridging Loan", "Bridging Finance", "Short-Term Property Loan"],
    relatedService: "/services/bridging-finance",
    relatedServiceTitle: "Bridging Finance Services",
    relatedGuide: "/resources/guides/bridging-finance-australia-complete-property-guide",
    relatedGuideTitle: "Complete Bridging Finance Guide"
  },
  {
    id: "asset-backed",
    title: "Asset Backed Lending",
    description: "Leveraging existing property or business assets for funding.",
    loanTypes: ["Asset Backed Lending", "Asset Finance", "Asset Backed Loan"],
    relatedService: "/services/asset-backed-lending",
    relatedServiceTitle: "Asset Backed Lending Services",
    relatedGuide: "/resources/guides/asset-backed-lending-and-asset-finance",
    relatedGuideTitle: "Asset Backed Lending Guide"
  },
  {
    id: "commercial-property",
    title: "Commercial Property Finance",
    description: "Financing for commercial office, retail, and mixed-use developments.",
    loanTypes: ["Commercial Property Loan", "Development Finance", "Commercial Development"],
    relatedService: "/services/commercial-property-development",
    relatedServiceTitle: "Commercial Property Services",
    relatedGuide: "/resources/guides/commercial-property-loans-australia-complete-guide",
    relatedGuideTitle: "Commercial Property Loans Guide"
  },
  {
    id: "mortgages",
    title: "First & Second Mortgages",
    description: "Mortgage solutions for business and investment purposes.",
    loanTypes: ["First Mortgage", "Second Mortgage", "1st Mortgage", "2nd Mortgage"],
    relatedService: "/services/first-second-mortgages",
    relatedServiceTitle: "First & Second Mortgage Services",
    relatedGuide: "/resources/guides/first-and-second-mortgages-for-business",
    relatedGuideTitle: "First & Second Mortgages Guide"
  },
  {
    id: "working-capital",
    title: "Working Capital & Business Finance",
    description: "Cash flow and operational funding for Australian businesses.",
    loanTypes: ["Working Capital", "Business Loan", "Trade Finance", "Business Acquisition"],
    relatedService: "/services/working-capital",
    relatedServiceTitle: "Working Capital Services",
    relatedGuide: "/resources/guides/working-capital-loans-for-smes",
    relatedGuideTitle: "Working Capital Loans Guide"
  },
  {
    id: "refinancing",
    title: "Refinancing & Debt Consolidation",
    description: "Restructuring existing debt for better rates or released equity.",
    loanTypes: ["Refinancing", "Debt Consolidation", "Portfolio Refinance"],
    relatedService: "/services/refinancing-solutions",
    relatedServiceTitle: "Refinancing Services",
    relatedGuide: "/resources/guides/business-debt-consolidation-australia",
    relatedGuideTitle: "Debt Consolidation Guide"
  },
  {
    id: "smsf",
    title: "SMSF Lending",
    description: "Property finance for self-managed superannuation funds.",
    loanTypes: ["SMSF Lending", "SMSF Loan", "Superannuation Property"],
    relatedService: "/services/smsf-lending",
    relatedServiceTitle: "SMSF Lending Services",
    relatedGuide: "/resources/guides/smsf-loans-for-commercial-property",
    relatedGuideTitle: "SMSF Commercial Property Guide"
  },
  {
    id: "equipment",
    title: "Equipment & Asset Finance",
    description: "Financing for business equipment, vehicles, and machinery.",
    loanTypes: ["Equipment Finance", "Equipment Loan", "Machinery Finance"],
    relatedService: "/services/equipment-finance",
    relatedServiceTitle: "Equipment Finance Services",
    relatedGuide: "/resources/guides/equipment-finance-and-leasing-australia",
    relatedGuideTitle: "Equipment Finance Guide"
  }
];

const CaseStudies = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Case Studies" }
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [publishedCaseStudies, setPublishedCaseStudies] = useState<Article[]>([]);

  useEffect(() => {
    const caseStudies = getContentFiles('case-studies');
    setPublishedCaseStudies(caseStudies);
  }, []);

  // Extract unique locations from case studies
  const locations = ["All", ...Array.from(new Set(
    publishedCaseStudies
      .map(cs => {
        // Extract city/state from location field
        const loc = cs.location || "";
        if (loc.includes("Sydney")) return "Sydney";
        if (loc.includes("Melbourne")) return "Melbourne";
        if (loc.includes("Brisbane")) return "Brisbane";
        if (loc.includes("Perth")) return "Perth";
        if (loc.includes("Adelaide")) return "Adelaide";
        if (loc.includes("Gold Coast")) return "Gold Coast";
        if (loc.includes("Newcastle")) return "Newcastle";
        return "Other";
      })
      .filter(Boolean)
  ))].sort();

  // Filter case studies
  const filteredCaseStudies = publishedCaseStudies.filter(study => {
    const categoryMatch = selectedCategory === "All" || 
      caseStudyCategories.find(c => c.id === selectedCategory)?.loanTypes.some(
        type => study.loanType?.toLowerCase().includes(type.toLowerCase())
      );
    
    const locationMatch = selectedLocation === "All" || 
      (study.location && study.location.includes(selectedLocation));
    
    return categoryMatch && locationMatch;
  });

  // Get category for a case study
  const getCategoryForStudy = (study: Article): CaseStudyCategory | undefined => {
    return caseStudyCategories.find(cat => 
      cat.loanTypes.some(type => 
        study.loanType?.toLowerCase().includes(type.toLowerCase())
      )
    );
  };

  // Get featured case study (most recent with high loan amount)
  const featuredStudy = publishedCaseStudies
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return (
    <div className="min-h-screen py-8">
      <SEO 
        title="Commercial Lending Case Studies | Real Success Stories | Emet Capital"
        description="Discover how Australian businesses secured bridging loans, asset finance, commercial mortgages, and more. Real case studies with loan amounts, timelines, and outcomes."
        canonical="/resources/case-studies"
        keywords="commercial lending case studies, business loan success stories, bridging finance examples, asset finance case study, Australian business loans, property development finance"
        schemas={[generateCollectionPageSchema(
          "Commercial Lending Case Studies",
          "Real success stories from Australian businesses that achieved their goals with commercial lending solutions",
          "https://emetcapital.com.au/resources/case-studies",
          publishedCaseStudies.length
        )]}
      />
      
      <div className="container mx-auto px-4">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header Section */}
        <header className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-center">
            Commercial Lending Case Studies
          </h1>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-xl text-center mb-6">
              Real-world examples of how Australian businesses secured the finance they needed to grow, acquire, develop, and succeed.
            </p>
            <p className="text-center">
              Each case study showcases a genuine lending scenario—from urgent bridging loans for property settlements 
              to multi-million dollar development facilities. Learn how businesses similar to yours navigated funding challenges 
              and achieved their goals with tailored commercial finance solutions.
            </p>
            <p className="text-center mt-4 text-sm">
              <strong>{publishedCaseStudies.length} case studies</strong> covering bridging finance, asset-backed lending, 
              commercial property, working capital, and more across Australia.
            </p>
          </div>
        </header>

        {/* Featured Case Study */}
        {featuredStudy && (
          <Card className="mb-12 bg-gradient-to-r from-accent/10 to-accent-light/10 border-accent/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold text-accent">Featured Case Study</span>
              </div>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {featuredStudy.title}
                  </h2>
                  {featuredStudy.challenge && (
                    <p className="text-muted-foreground mb-4">
                      <strong className="text-foreground">Challenge:</strong> {featuredStudy.challenge}
                    </p>
                  )}
                  {featuredStudy.outcome && (
                    <p className="text-foreground font-medium mb-4">
                      <strong>Outcome:</strong> {featuredStudy.outcome}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    {featuredStudy.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {featuredStudy.location}
                      </span>
                    )}
                    {featuredStudy.loanType && (
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {featuredStudy.loanType}
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 p-4 rounded-lg text-center">
                      <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-xl font-bold text-primary">{featuredStudy.loanAmount || "N/A"}</div>
                      <div className="text-xs text-muted-foreground">Loan Amount</div>
                    </div>
                    <div className="bg-secondary-blue p-4 rounded-lg text-center">
                      <Clock className="w-8 h-8 text-secondary-blue-foreground mx-auto mb-2" />
                      <div className="text-lg font-bold text-secondary-blue-foreground">{featuredStudy.duration || "N/A"}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                  </div>
                  <Button asChild size="lg" className="w-full bg-accent hover:bg-accent-dark text-accent-foreground">
                    <Link to={`/resources/case-studies/${featuredStudy.slug}`}>
                      Read Full Case Study
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="mb-8 p-6 bg-muted rounded-xl">
          <div className="flex flex-wrap items-center gap-6">
            {/* Category Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter by Loan Type
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button
                  variant={selectedCategory === "All" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("All")}
                >
                  All Types
                </Button>
                {caseStudyCategories.slice(0, 5).map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.title}
                  </Button>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {locations.slice(0, 6).map((location) => (
                  <Button
                    key={location}
                    variant={selectedLocation === location ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLocation(location)}
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-muted-foreground mb-6">
          Showing {filteredCaseStudies.length} of {publishedCaseStudies.length} case studies
          {selectedCategory !== "All" && ` in ${caseStudyCategories.find(c => c.id === selectedCategory)?.title}`}
          {selectedLocation !== "All" && ` from ${selectedLocation}`}
        </p>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaseStudies.map((study) => {
            const category = getCategoryForStudy(study);
            
            return (
              <Card key={study.slug} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col">
                <CardContent className="p-6 flex flex-col flex-1">
                  {/* Loan metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-center">
                      <DollarSign className="w-5 h-5 text-primary mx-auto mb-1" />
                      <div className="text-lg font-bold text-primary">{study.loanAmount || "N/A"}</div>
                      <div className="text-xs text-muted-foreground">Amount</div>
                    </div>
                    <div className="bg-muted p-3 rounded-lg text-center">
                      <Clock className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                      <div className="text-sm font-bold text-foreground">{study.duration || "N/A"}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {study.loanType && (
                      <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                        {study.loanType}
                      </span>
                    )}
                    {study.location && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {study.location.split(',')[0]}
                      </span>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {study.title}
                  </h3>
                  
                  {/* Challenge & Outcome */}
                  <div className="space-y-2 mb-4 flex-1">
                    {study.challenge && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        <strong className="text-foreground">Challenge:</strong> {study.challenge}
                      </p>
                    )}
                    {study.outcome && (
                      <p className="text-sm text-foreground font-medium line-clamp-2">
                        <strong>Outcome:</strong> {study.outcome}
                      </p>
                    )}
                  </div>

                  {/* Links */}
                  <div className="space-y-2 mt-auto">
                    <Button asChild variant="default" className="w-full">
                      <Link to={`/resources/case-studies/${study.slug}`}>
                        View Case Study
                      </Link>
                    </Button>
                    {category && (
                      <div className="flex gap-2 text-xs">
                        <Link 
                          to={category.relatedService}
                          className="flex-1 text-center py-1.5 text-primary hover:underline"
                        >
                          Related Service →
                        </Link>
                        <Link 
                          to={category.relatedGuide}
                          className="flex-1 text-center py-1.5 text-primary hover:underline"
                        >
                          Related Guide →
                        </Link>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No results message */}
        {filteredCaseStudies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No case studies match your filters.</p>
            <Button variant="outline" onClick={() => { setSelectedCategory("All"); setSelectedLocation("All"); }}>
              Clear Filters
            </Button>
          </div>
        )}

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
                <div className="text-3xl font-bold text-primary mb-2">{publishedCaseStudies.length}+</div>
                <div className="text-muted-foreground">Industries Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-links to Related Resources */}
        <section className="mt-16 py-12 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Explore Related Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                to="/resources/guides" 
                className="p-6 bg-muted rounded-xl border hover:border-primary hover:shadow-lg transition-all group"
              >
                <BookOpen className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary">Lending Guides</h3>
                <p className="text-sm text-muted-foreground">
                  In-depth guides on every type of commercial finance, from bridging loans to SMSF lending.
                </p>
              </Link>
              <Link 
                to="/services" 
                className="p-6 bg-muted rounded-xl border hover:border-primary hover:shadow-lg transition-all group"
              >
                <Building2 className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary">Our Services</h3>
                <p className="text-sm text-muted-foreground">
                  Explore our full range of commercial lending solutions for Australian businesses.
                </p>
              </Link>
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
              Let's discuss your funding needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-accent hover:bg-accent-dark text-accent-foreground"
              >
                <Link to="/contact">Start Your Application</Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <a href="tel:0485952651">Call 0485 952 651</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CaseStudies;
