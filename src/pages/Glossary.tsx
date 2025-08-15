import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Search, Book } from "lucide-react";

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("All");

  const alphabet = ["All", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const terms = [
    {
      term: "Asset Finance",
      definition: "A form of business lending where the asset being purchased (equipment, vehicles, machinery) serves as security for the loan. The lender retains ownership until the loan is fully repaid.",
      category: "Finance Types"
    },
    {
      term: "Bridging Finance",
      definition: "Short-term financing solution used to 'bridge' the gap between the purchase of a new property and the sale of an existing one, or to provide immediate funding while arranging permanent finance.",
      category: "Finance Types"
    },
    {
      term: "Caveat Loan", 
      definition: "A type of short-term loan secured by a caveat placed on real estate. Provides quick access to funds based on property equity, typically used for urgent financial needs.",
      category: "Finance Types"
    },
    {
      term: "Debt Service Coverage Ratio (DSCR)",
      definition: "A financial ratio that measures a company's ability to service its debt payments. Calculated by dividing net operating income by total debt service. Lenders typically require DSCR of 1.2 or higher.",
      category: "Ratios"
    },
    {
      term: "Development Finance",
      definition: "Specialized lending for property development projects, including land acquisition, construction costs, and related expenses. Usually structured with progressive draw-downs as milestones are achieved.",
      category: "Finance Types"
    },
    {
      term: "First Mortgage",
      definition: "The primary mortgage on a property that takes precedence over all other liens or claims. In case of default, the first mortgage holder has first rights to the property.",
      category: "Security"
    },
    {
      term: "General Security Agreement (GSA)",
      definition: "A legal document that gives a lender a security interest in specified personal property of the borrower to secure repayment of a loan or other obligation.",
      category: "Security"
    },
    {
      term: "Guarantee",
      definition: "A promise by one party (guarantor) to assume responsibility for another party's debt obligation if that party defaults. Personal guarantees are commonly required in commercial lending.",
      category: "Security"
    },
    {
      term: "Interest Only Period",
      definition: "A loan period where the borrower pays only the interest on the principal balance, with no principal repayments. Common in development finance and investment property loans.",
      category: "Loan Terms"
    },
    {
      term: "Invoice Finance",
      definition: "A form of asset-based lending where businesses can borrow money against the amounts due from customers. Also known as accounts receivable financing or factoring.",
      category: "Finance Types"
    },
    {
      term: "Loan to Value Ratio (LVR)",
      definition: "A financial ratio that compares the amount of a loan to the value of the asset purchased. Expressed as a percentage, it helps lenders assess lending risk.",
      category: "Ratios"
    },
    {
      term: "Line of Credit",
      definition: "A flexible borrowing arrangement that allows a business to draw funds up to a predetermined limit as needed, paying interest only on the amount used.",
      category: "Finance Types"
    },
    {
      term: "Mezzanine Finance",
      definition: "A hybrid form of financing that combines debt and equity characteristics. Often used to fund expansion or development projects when traditional debt is insufficient.",
      category: "Finance Types"
    },
    {
      term: "Non-Bank Lender",
      definition: "Financial institutions that provide loans but are not traditional banks. Includes credit unions, peer-to-peer lenders, and specialized finance companies.",
      category: "Loan Terms"
    },
    {
      term: "Personal Property Securities Register (PPSR)",
      definition: "A national online register where security interests in personal property can be registered, searched, and verified in Australia.",
      category: "Security"
    }
  ];

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLetter = selectedLetter === "All" || term.term.charAt(0).toUpperCase() === selectedLetter;
    return matchesSearch && matchesLetter;
  });

  const categories = [...new Set(terms.map(term => term.category))];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Glossary" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Commercial Lending Glossary
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive definitions of commercial lending terms, concepts, and industry terminology to help you navigate the world of business finance.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search terms and definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Alphabetical Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {alphabet.map((letter) => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLetter(letter)}
              className={`w-10 h-10 p-0 ${selectedLetter === letter ? "bg-primary" : ""}`}
            >
              {letter}
            </Button>
          ))}
        </div>

        {/* Categories Legend */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span 
                key={category} 
                className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Terms List */}
        <div className="space-y-4">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-primary">{item.term}</h3>
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.definition}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Book className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No terms found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or browse all terms.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Call to Action */}
        <section className="text-center mt-16 py-12 bg-muted rounded-2xl">
          <div className="max-w-2xl mx-auto px-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our commercial lending experts are here to explain complex terms and help you understand your financing options.
            </p>
            <Button 
              asChild 
              className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
            >
              <a href="/contact">Ask Our Experts</a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Glossary;