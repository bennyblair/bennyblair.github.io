import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ChevronDown, ChevronUp, HelpCircle, Star } from "lucide-react";

const FAQs = () => {
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const categories = [
    "General",
    "Asset Finance", 
    "Development Finance",
    "Bridging Finance",
    "Working Capital"
  ];

  const faqs = {
    "General": [
      {
        id: "gen-1",
        question: "What types of commercial lending do you facilitate?",
        answer: "We facilitate a comprehensive range of commercial lending solutions including asset finance, development and construction finance, bridging and caveat loans, working capital facilities, trade and import/export finance, and specialized non-bank lending. We work exclusively with commercial lending - no residential or consumer finance."
      },
      {
        id: "gen-2", 
        question: "How long does the commercial loan approval process take?",
        answer: "Approval timeframes vary by loan type and complexity. Simple asset finance can be approved in 24-48 hours, while development finance may take 2-4 weeks. Bridging finance is typically faster at 5-10 business days. We work closely with lenders to expedite applications wherever possible."
      },
      {
        id: "gen-3",
        question: "What is the minimum loan amount you handle?",
        answer: "We typically handle commercial loans from $100,000 upwards, though this can vary by loan type. For smaller amounts, we may refer you to appropriate lenders directly. Our expertise is most valuable for complex or larger commercial financing requirements."
      },
      {
        id: "gen-4",
        question: "Do you charge upfront fees for your brokerage services?",
        answer: "No, we don't charge any upfront fees. We're only paid when your loan successfully settles, which means our interests are completely aligned with yours. Our commission comes from the lender, not from you."
      }
    ],
    "Asset Finance": [
      {
        id: "asset-1",
        question: "What types of assets can be financed?",
        answer: "We can arrange finance for virtually any business asset including vehicles, machinery, equipment, technology, furniture, and specialized industry equipment. The asset must be used for business purposes and typically needs to retain value over the loan term."
      },
      {
        id: "asset-2",
        question: "What's the difference between a hire purchase and a finance lease?",
        answer: "With hire purchase, you own the asset at the end of the term after making all payments. With a finance lease, you lease the asset and can either return it, upgrade, or purchase it at market value at the end. Lease payments may offer better tax benefits as they're typically fully deductible."
      },
      {
        id: "asset-3",
        question: "Can I finance used equipment?", 
        answer: "Yes, we can arrange finance for quality used equipment. Lenders typically prefer equipment that's less than 5-7 years old, depending on the type. Used equipment may require larger deposits and have shorter loan terms than new equipment."
      },
      {
        id: "asset-4",
        question: "What deposit is required for asset finance?",
        answer: "Deposits typically range from 10-30% depending on the asset type, age, your business's financial position, and the lender's requirements. New equipment often requires smaller deposits than used equipment."
      }
    ],
    "Development Finance": [
      {
        id: "dev-1",
        question: "What is development finance and who needs it?",
        answer: "Development finance provides funding for property development projects including land acquisition, construction costs, and related expenses. It's used by property developers, builders, and investors undertaking residential, commercial, or industrial development projects."
      },
      {
        id: "dev-2",
        question: "How are development finance repayments structured?",
        answer: "Development finance typically features interest-only payments during the construction phase, with principal and interest repayments beginning after completion. Some facilities include a sales period allowing interest-only payments while units are sold."
      },
      {
        id: "dev-3",
        question: "What security is required for development finance?",
        answer: "Security typically includes the development site itself, plus additional security may be required such as other real estate or guarantees. Lenders often require comprehensive insurance coverage throughout the development period."
      },
      {
        id: "dev-4",
        question: "How are funds released during construction?",
        answer: "Funds are typically released in stages based on construction milestones, verified by independent quantity surveyors or building inspectors. This protects both the lender and borrower by ensuring funds are used appropriately."
      }
    ],
    "Bridging Finance": [
      {
        id: "bridge-1",
        question: "When would I use bridging finance?",
        answer: "Bridging finance is ideal for time-sensitive property transactions, such as buying before selling, property development bridging, refinancing urgent situations, or capitalizing on investment opportunities that require quick settlement."
      },
      {
        id: "bridge-2",
        question: "How quickly can bridging finance be arranged?",
        answer: "Bridging finance can often be arranged within 5-10 business days for straightforward applications. In urgent situations, we've arranged approval and settlement within 48 hours, though this requires all documentation to be immediately available."
      },
      {
        id: "bridge-3",
        question: "What are typical bridging finance interest rates?",
        answer: "Bridging finance rates are typically higher than standard commercial rates due to the short-term nature and flexibility. Rates generally range from 7-15% per annum depending on the loan-to-value ratio, borrower profile, and specific circumstances."
      },
      {
        id: "bridge-4",
        question: "What exit strategy is required for bridging finance?",
        answer: "Lenders require a clear exit strategy such as property sale, refinancing to permanent finance, or business cash flow. The exit strategy must be realistic and achievable within the loan term, typically 6-24 months."
      }
    ],
    "Working Capital": [
      {
        id: "wc-1",
        question: "What working capital solutions are available?",
        answer: "We arrange various working capital solutions including business lines of credit, overdraft facilities, invoice finance, trade finance, equipment rental finance, and seasonal funding facilities. Each solution is tailored to specific cash flow patterns and business needs."
      },
      {
        id: "wc-2",
        question: "How does invoice finance work?",
        answer: "Invoice finance allows you to access up to 80-90% of outstanding invoice values immediately. You sell your invoices to a financier who collects payment from your customers. This provides immediate cash flow while your customers take their normal payment terms."
      },
      {
        id: "wc-3",
        question: "What's the difference between confidential and disclosed invoice finance?",
        answer: "With confidential invoice finance, your customers don't know their invoices have been financed - payments come to you first. With disclosed finance, customers pay the financier directly. Confidential facilities typically cost slightly more but maintain your customer relationships."
      },
      {
        id: "wc-4",
        question: "How is a business line of credit different from a term loan?",
        answer: "A line of credit provides flexible access to funds up to an approved limit - you only pay interest on what you use. Term loans provide a lump sum with regular repayments. Lines of credit are ideal for fluctuating working capital needs, while term loans suit specific asset purchases."
      }
    ]
  };

  const popularQuestions = [
    "What types of commercial lending do you facilitate?",
    "How long does the commercial loan approval process take?", 
    "When would I use bridging finance?",
    "How does invoice finance work?"
  ];

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "FAQs" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Get instant answers to the most common commercial lending questions. Expert insights to help you make informed financing decisions.
          </p>
        </div>

        {/* Popular Questions */}
        <Card className="mb-12 bg-secondary-blue">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-secondary-blue-foreground mb-6 flex items-center">
              <Star className="w-6 h-6 mr-3 text-accent" />
              Most Popular Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {popularQuestions.map((question, index) => (
                <div key={index} className="flex items-center text-secondary-blue-foreground">
                  <HelpCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm">{question}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-primary" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs[selectedCategory as keyof typeof faqs].map((faq) => (
            <Card key={faq.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  {openFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFAQ === faq.id && (
                  <div className="px-6 pb-6 border-t border-border">
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <section className="text-center mt-16 py-12 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-2xl mx-auto px-8">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">
              Didn't Find Your Answer?
            </h2>
            <p className="text-primary-foreground/90 mb-6">
              Our commercial lending specialists are ready to discuss your specific questions and circumstances.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-accent hover:bg-accent-dark text-accent-foreground"
            >
              <a href="/contact">Ask Our Experts</a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQs;