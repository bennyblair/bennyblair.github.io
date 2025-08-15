import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Clock, User, CheckCircle, ArrowRight, Star } from "lucide-react";

const GuideArticle = () => {
  const { slug } = useParams();

  // This would normally fetch content based on the slug
  const guide = {
    title: "Complete Guide to Bridging Finance in Australia",
    author: "Sarah Mitchell",
    readTime: "12 min",
    publishDate: "2024-01-15",
    category: "Property Finance",
    excerpt: "Master bridging loans with our comprehensive guide covering everything from basics to advanced strategies, including real examples and expert tips."
  };

  const keyTakeaways = [
    "Bridging finance is ideal for time-sensitive property transactions",
    "Typical terms range from 6-24 months with interest-only payments",
    "Rates generally range from 7-15% per annum depending on LVR and risk",
    "Clear exit strategy is essential for approval",
    "Documentation can be streamlined for faster settlement",
    "Consider both first and second mortgage options"
  ];

  const relatedGuides = [
    {
      title: "Asset Finance vs Equipment Leasing: Which is Right for You?",
      slug: "asset-finance-vs-equipment-leasing",
      readTime: "8 min"
    },
    {
      title: "Development Finance: From Application to Settlement", 
      slug: "development-finance-application-guide",
      readTime: "15 min"
    },
    {
      title: "Commercial Property Finance: Investment vs Owner-Occupied",
      slug: "commercial-property-finance-guide", 
      readTime: "11 min"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Guides", href: "/resources/guides" },
          { label: guide.title }
        ]} />

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {guide.category}
            </span>
            <div className="flex items-center text-sm text-muted-foreground space-x-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {guide.readTime} read
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {guide.author}
              </div>
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {guide.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {guide.excerpt}
          </p>
        </header>

        {/* Key Takeaways */}
        <Card className="mb-8 bg-secondary-blue">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-secondary-blue-foreground mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-accent" />
              Key Takeaways
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {keyTakeaways.map((takeaway, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-blue-foreground text-sm">{takeaway}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">What is Bridging Finance?</h2>
          <p className="text-muted-foreground mb-6">
            Bridging finance is a short-term lending solution designed to provide immediate funding while you arrange permanent financing or await the completion of a property sale. In the Australian commercial lending market, bridging loans serve as a crucial tool for businesses and investors who need to act quickly on time-sensitive opportunities.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4">When Should You Consider Bridging Finance?</h2>
          <p className="text-muted-foreground mb-4">
            Bridging finance is particularly valuable in several scenarios:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
            <li>Property development projects requiring immediate capital injection</li>
            <li>Commercial property purchases with tight settlement deadlines</li>
            <li>Refinancing existing debt while arranging long-term financing</li>
            <li>Capitalizing on investment opportunities that can't wait for traditional loan approval</li>
            <li>Covering cash flow gaps during business transitions</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mb-4">How Does Bridging Finance Work?</h2>
          <p className="text-muted-foreground mb-6">
            Bridging loans typically operate on an interest-only basis during the loan term, with the principal repaid either through refinancing to permanent finance or from the proceeds of a property sale. The loan is secured against real estate, providing lenders with tangible security while offering borrowers competitive rates compared to unsecured financing options.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4">Interest Rates and Terms</h2>
          <p className="text-muted-foreground mb-6">
            Bridging finance rates in Australia generally range from 7% to 15% per annum, depending on factors such as loan-to-value ratio, borrower profile, and the specific circumstances of the transaction. Terms typically range from 6 to 24 months, though some lenders offer extensions where appropriate exit strategies are maintained.
          </p>

          <h2 className="text-2xl font-bold text-foreground mb-4">The Application Process</h2>
          <p className="text-muted-foreground mb-6">
            The bridging finance application process is designed for speed while maintaining prudent lending standards. Key requirements typically include property valuations, clear exit strategy documentation, financial statements, and comprehensive project details where applicable. Experienced commercial lending brokers can significantly expedite this process through established lender relationships and streamlined documentation procedures.
          </p>
        </article>

        {/* CTA Section */}
        <Card className="mb-12 bg-gradient-to-r from-accent/10 to-accent-light/10 border-accent/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Explore Bridging Finance Options?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our commercial lending specialists can assess your specific situation and connect you with the right bridging finance solution. Get a custom quote today.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
            >
              <Link to="/contact">Get Your Bridging Finance Quote</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Related Guides */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedGuides.map((relatedGuide) => (
              <Card key={relatedGuide.slug} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {relatedGuide.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {relatedGuide.readTime} read
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to={`/resources/guides/${relatedGuide.slug}`}>
                      Read Guide
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GuideArticle;