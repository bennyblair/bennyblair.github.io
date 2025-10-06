import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Cog, Truck, Building2, AlertTriangle, FileText, Phone, TrendingUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";

const EquipmentFinance = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Equipment Finance" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "Equipment Finance Australia | Flexible Loans for Business Growth",
        "description": "Equipment finance helps Australian businesses purchase or lease specialised tools, vehicles, and machinery. Learn how it works, benefits, and apply online today.",
        "author": {
          "@type": "Organization",
          "name": "Emet Capital"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Emet Capital"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "/services/equipment-finance"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I finance second-hand equipment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, subject to condition and lender acceptance. The age and condition will affect terms and rates."
            }
          },
          {
            "@type": "Question",
            "name": "What term lengths are available?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Usually 2–7 years depending on the equipment type and value."
            }
          },
          {
            "@type": "Question",
            "name": "Do I own the equipment during finance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Depends on product type — some provide ownership, others don't until final payment."
            }
          },
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Equipment Finance Australia | Flexible Loans for Business Growth</title>
        <meta name="description" content="Equipment finance helps Australian businesses purchase or lease specialised tools, vehicles, and machinery. Learn how it works, benefits, and apply online today." />
        <meta name="keywords" content="Equipment Finance Australia, equipment loan, business equipment finance, machinery finance, technology leasing, business equipment loan" />
        <link rel="canonical" href="/services/equipment-finance" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-4">
                <Cog className="w-4 h-4 mr-2" />
                Business Growth
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Equipment Finance Australia
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Flexible loans for specialised business equipment and machinery. Finance from $10,000 to $5 million with terms from 2-7 years across all industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <FileText className="w-5 h-5 mr-2" />
                  Apply for Equipment Finance
                </Button>
                <Button variant="outline" size="lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Expert
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-primary" />
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              Equipment finance provides funding for specialised business equipment and machinery.
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              Can be structured as a loan, lease, or rental.
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              Preserves cash flow while enabling business expansion.
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              Terms range from 2–7 years depending on asset type.
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              Available across industries: healthcare, manufacturing, transport, agriculture, and technology.
            </li>
          </ul>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Equipment Finance Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Cog className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>All Equipment Types</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Finance any type of business equipment including manufacturing, construction, medical, and technology equipment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Truck className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Fleet Finance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive vehicle financing solutions for cars, trucks, commercial vehicles, and complete fleet management.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Industrial Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Heavy machinery and industrial equipment financing for construction, mining, and manufacturing sectors.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What Is Section */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What Is Equipment Finance?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Equipment finance is a loan or lease that enables businesses to purchase or upgrade the tools they need to operate. The equipment itself is the security for the loan, reducing lender risk. Terms typically range from 2-7 years with flexible structures including hire purchase, finance lease, or chattel mortgage.
              </p>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Learn more:</strong> For detailed information on equipment finance structures, tax benefits, and industry-specific applications, see our <Link to="/resources/guides/equipment-finance-and-leasing-australia" className="text-primary hover:underline">comprehensive Equipment Finance guide</Link>.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">$10K+</div>
                <p className="text-sm text-muted-foreground">Minimum Amount</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">2-7 yrs</div>
                <p className="text-sm text-muted-foreground">Typical Terms</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">24-48h</div>
                <p className="text-sm text-muted-foreground">Approval Time</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">All</div>
                <p className="text-sm text-muted-foreground">Industries</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <Card className="premium-card">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "Can I finance second-hand equipment?",
                    answer: "Yes, subject to condition and lender acceptance. The age and condition will affect terms and rates."
                  },
                  {
                    question: "What term lengths are available?",
                    answer: "Usually 2–7 years depending on the equipment type and value."
                  },
                  {
                    question: "Do I own the equipment during finance?",
                    answer: "Depends on product type — some provide ownership, others don't until final payment."
                  }
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Related Services */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/services/asset-finance" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-semibold">Asset Finance</h3>
                  <p className="text-sm text-muted-foreground">Broader asset types and financing options</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/services/working-capital" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-semibold">Working Capital</h3>
                  <p className="text-sm text-muted-foreground">General business funding for operations</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/services/asset-backed-lending" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-semibold">Asset Backed Lending</h3>
                  <p className="text-sm text-muted-foreground">Leverage business assets</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/services/bridging-finance" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-semibold">Bridging Finance</h3>
                  <p className="text-sm text-muted-foreground">Short-term property finance</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Apply for Equipment Finance Today</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Upgrade your machinery and technology with flexible finance tailored to your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Apply Now for Equipment Finance
            </Button>
            <Button variant="outline" size="lg">
              Speak to Expert
            </Button>
          </div>
        </section>
      </main>
    </>
  );

};

export default EquipmentFinance;