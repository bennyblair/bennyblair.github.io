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
          {
            "@type": "Question",
            "name": "Can start-ups access equipment finance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, though stricter conditions or guarantees may apply for new businesses."
            }
          }
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
                Equipment finance is a loan or lease that enables businesses to purchase or upgrade the tools they need to operate. The equipment itself is the security for the loan, reducing lender risk.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-4">How It Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Choose the required equipment.</li>
                <li>Lender funds purchase directly.</li>
                <li>Repayments spread across the asset's useful life.</li>
                <li>End-of-term options: ownership, renewal, or upgrade.</li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Benefits & Risks */}
        <section className="mb-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-xl text-green-800">Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Access modern technology without upfront capital
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Match repayments to asset productivity
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Tax advantages through depreciation and deductions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Flexible structures tailored to asset type
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-xl text-orange-800">Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-orange-700">
                  <li className="flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Equipment may depreciate faster than the loan term
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Missed payments risk repossession
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Leasing may cost more than outright purchase long term
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Eligible Equipment */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Eligible Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Heavy Machinery</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Construction equipment
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Mining machinery
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Manufacturing equipment
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Transport & Technology</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Trucks, buses, and transport fleets
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Medical and dental equipment
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Office and IT technology
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Agricultural tools
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Case Study */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">Case Study: Medical Equipment Upgrade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                A Sydney dental clinic needed to replace X-ray machines costing $300,000. With equipment finance, the lender funded the purchase, and repayments were spread over 5 years. The clinic upgraded its services without depleting cash reserves.
              </p>
            </CardContent>
          </Card>
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
                  },
                  {
                    question: "Can start-ups access equipment finance?",
                    answer: "Yes, though stricter conditions or guarantees may apply for new businesses."
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