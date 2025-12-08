import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Globe, Phone, FileText, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";

const TradeFinance = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of security are accepted?",
      answer: "Goods being imported/exported, receivables from trade transactions, purchase orders, property, or business assets. Security requirements vary by facility type and lender."
    },
    {
      question: "How fast can approval take?",
      answer: "Invoice factoring within 5-10 days typically. Letters of credit establishment takes 2-4 weeks depending on complexity and bank requirements."
    },
    {
      question: "Are these loans available Australia-wide?",
      answer: "Yes, trade finance facilities are available for Australian businesses conducting international trade across all states and territories."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, this is commercial lending for business import/export operations only. Consumer finance is not offered."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Trade Finance Solutions Australia | Import Export Funding | Emet Capital</title>
        <meta 
          name="description" 
          content="Comprehensive trade finance for Australian importers & exporters. Letters of credit, invoice factoring & working capital from $100K-$25M+." 
        />
        <meta name="keywords" content="trade finance, import finance, export finance, letters of credit, invoice factoring, international trade" />
        <link rel="canonical" href="https://emetcapital.com.au/services/trade-finance" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Trade Finance" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent">Import/Export Finance</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Trade Finance Solutions
          </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link to="/contact">
                  <FileText className="mr-2 h-5 w-5" />
                  Get Quote
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Expert
                </a>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-12 mb-16">
            {/* What this service is */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Trade Finance?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Trade finance provides specialized funding for businesses engaged in international import and export operations. These facilities bridge timing gaps between goods payment and receipt, enabling businesses to manage cash flow while conducting cross-border trade. Trade finance encompasses various instruments including letters of credit, documentary collections, invoice factoring, inventory funding, and working capital facilities specifically structured for import/export operations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Facilities support the entire trade cycle from order placement through goods delivery and payment receipt. Letters of credit provide payment security for international suppliers, while invoice factoring converts export receivables to immediate cash. Inventory and pre-shipment finance fund goods purchase and production before sales completion. Currency management and foreign exchange hedging protect against exchange rate fluctuations in international transactions.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Trade finance serves importers, exporters, distributors, manufacturers, and wholesalers engaged in international commerce. Importers utilize letters of credit and inventory funding to manage supplier payments and goods acquisition. Exporters access invoice factoring and pre-shipment finance to fund production and bridge payment timing gaps. Both trading businesses and manufacturers with international supply chains benefit from specialized trade finance solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer finance is provided. Borrowers require appropriate business structures (ABN/ACN), demonstrated trading history with international suppliers or customers, and capacity to service facilities from trading operations. Both established trading businesses and those expanding international operations benefit from trade finance solutions tailored to cross-border commerce requirements.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers with trade finance expertise, we provide access to specialist lenders and banks offering international trade facilities nationwide. Our lender relationships include major banks with trade finance divisions, specialist trade financiers, and alternative providers understanding import/export operational requirements. We match businesses with appropriate facilities including letters of credit, invoice factoring, and inventory funding structures.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We guide clients through facility selection, documentation preparation, and establishment processes. Our expertise includes both traditional banking instruments and alternative trade finance solutions. Approval processes consider trade-specific criteria including supplier/customer relationships, trade documentation, and transaction security. We structure facilities accommodating international trade timing characteristics while managing currency and payment risks inherent in cross-border commerce.
              </p>
            </section>

            {/* Key features & benefits */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Key Features & Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Globe className="mr-2 h-5 w-5 text-accent" />
                      Loan Ranges & Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Finance available from $100,000 to $25M+ with terms aligned to trade cycles. Revolving facilities provide ongoing access for continuous trading operations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                      Suitable Use Cases
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Supports import payment, export receivables, inventory funding, pre-shipment finance, letters of credit, and working capital for international trading operations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Shield className="mr-2 h-5 w-5 text-accent" />
                      Trade-Specific Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Secured by goods being traded, export receivables, purchase orders, or business assets. Structure depends on facility type and trading arrangements.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-accent" />
                      Expert Guidance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Specialized expertise in international trade finance requirements. Guidance through complex documentation and banking arrangements for cross-border transactions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires business purpose (no consumer lending), appropriate business structure (ABN/ACN), demonstrated international trading activity with suppliers or customers, and capacity to service facilities from trading operations. Documentation includes business financials, trade documentation, supplier/customer details, and transaction specifics. Both established traders and businesses expanding internationally are considered.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our trade finance specialists for initial assessment. We'll evaluate your trading operations, facility requirements, and transaction structures to identify optimal solutions. Our process includes facility recommendation, lender selection, and guidance through establishment of appropriate trade finance arrangements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                  <Link to="/contact"><FileText className="mr-2 h-5 w-5" />Start Application</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:0485952651"><Phone className="mr-2 h-5 w-5" />Speak with Specialist</a>
                </Button>
              </div>
            </section>

            {/* FAQs */}
            <FAQSection faqs={faqs} />
          </div>

          {/* Related Reading */}
          <RelatedReading articles={[
            { title: "Trade Finance in Australia: Managing Imports", slug: "trade-finance-in-australia-how-it-helps-businesses-manage-imports", description: "How trade finance supports import operations" },
            { title: "Debtor Finance & Supply Chain Finance Australia", slug: "debtor-finance-supply-chain-finance-australia", description: "Managing cash flow through supply chain financing" }
          ] as RelatedArticle[]} />

          {/* Related Services */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Working Capital</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Operational funding for business cash flow needs</p>
                  <Link to="/services/working-capital" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Asset Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Equipment and machinery acquisition funding</p>
                  <Link to="/services/asset-finance" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Debt Consolidation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Simplify multiple business debts into one facility</p>
                  <Link to="/services/debt-consolidation" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default TradeFinance;