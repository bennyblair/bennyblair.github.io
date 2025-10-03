import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Car, Cog, Building2, AlertTriangle, FileText, Phone, TrendingUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";

const AssetFinance = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Asset Finance" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "Asset Finance Australia | Fund Vehicles, Machinery & Equipment",
        "description": "Asset finance in Australia helps businesses purchase vehicles, equipment, and machinery without upfront costs. Learn benefits, types, and how to apply today.",
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
          "@id": "/services/asset-finance"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I finance used equipment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, subject to lender approval and valuation."
            }
          },
          {
            "@type": "Question",
            "name": "What is the maximum term?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Usually up to 7 years depending on the asset type and value."
            }
          },
          {
            "@type": "Question",
            "name": "Is a deposit required?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Often no, but some lenders require 10–20% depending on the asset and borrower profile."
            }
          },
          {
            "@type": "Question",
            "name": "Do I own the asset during finance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Depends on structure: ownership varies between chattel mortgage, hire purchase, and leasing arrangements."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Asset Finance Australia | Fund Vehicles, Machinery & Equipment</title>
        <meta name="description" content="Asset finance in Australia helps businesses purchase vehicles, equipment, and machinery without upfront costs. Learn benefits, types, and how to apply today." />
        <meta name="keywords" content="Asset Finance Australia, asset finance, vehicle finance, equipment loan, business asset loan, machinery finance" />
        <link rel="canonical" href="/services/asset-finance" />
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
                <Building2 className="w-4 h-4 mr-2" />
                Business Growth
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Asset Finance Australia
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Fund vehicles, machinery, and equipment without upfront costs. Flexible asset finance solutions from $10,000 to $5 million with terms up to 7 years.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <FileText className="w-5 h-5 mr-2" />
                  Apply for Asset Finance
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
              Asset finance helps businesses acquire vehicles, machinery, or equipment without paying upfront.
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              Structures include chattel mortgage, hire purchase, finance lease, and operating lease.
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              Loan terms usually range from 2–7 years.
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              Improves cash flow while enabling business growth.
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              Suitable for cars, trucks, construction, medical, agricultural, and IT equipment.
            </li>
          </ul>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Asset Finance Solutions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Car className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Vehicle Finance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cars, trucks, buses, and commercial fleets. Flexible terms and structures to suit your business needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Cog className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Machinery & Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Construction, manufacturing, agricultural, and medical equipment. Finance the tools your business needs to grow.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Technology Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  IT equipment, software, and office technology. Keep your business at the cutting edge without capital outlay.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What Is Section */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What Is Asset Finance?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Asset finance allows businesses to access essential equipment while spreading the cost over time. The asset itself serves as security for the loan or lease, reducing risk for the lender and making finance more accessible.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-4">How Asset Finance Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Business chooses an asset to purchase.</li>
                <li>Lender pays the supplier directly.</li>
                <li>Business repays the lender via fixed instalments.</li>
                <li>At the end of the term, ownership is transferred, renewed, or the asset is upgraded depending on finance type.</li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Finance Types */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Types of Asset Finance</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Chattel Mortgage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Borrower owns the asset, lender takes mortgage over it. Full ownership from day one with tax benefits.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    Immediate ownership and control
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    Tax depreciation benefits
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    GST benefits available
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hire Purchase</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Lender owns asset until last payment. Lower monthly repayments with ownership at the end.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    Lower monthly payments
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    Ownership at completion
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    Fixed interest rates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Finance Lease</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Lender owns asset, business leases it long term. Option to purchase at fair market value.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    100% tax deductible payments
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    Off-balance sheet financing
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    Flexible end-of-term options
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operating Lease</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Short-term rental, no ownership. Ideal for businesses wanting flexibility without ownership.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    Maximum flexibility
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    Regular upgrades available
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    Lower monthly costs
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
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
                    Access critical business tools without large upfront payments
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Repayments aligned with asset life
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Preserves working capital
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Potential tax deductions for interest and depreciation
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
                    Missed payments may result in repossession
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Total cost over term may exceed upfront purchase
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Restrictions on usage depending on structure
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Eligible Assets */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Eligible Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Vehicles & Transport</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Commercial vehicles and fleets
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Cars, trucks, and buses
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Trailers and specialty vehicles
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Machinery & Equipment</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Construction and mining machinery
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Agricultural tractors and harvesters
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Medical and dental technology
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      IT and office equipment
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
              <CardTitle className="text-2xl">Case Study: Fleet Upgrade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                A logistics company needed 10 new delivery vans worth $600,000. Using asset finance, they acquired the fleet with no upfront outlay, paying fixed monthly instalments over 5 years. The business preserved working capital while modernising its operations.
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
                    question: "Can I finance used equipment?",
                    answer: "Yes, subject to lender approval and valuation. The age and condition of the asset will affect terms."
                  },
                  {
                    question: "What is the maximum term?",
                    answer: "Usually up to 7 years depending on the asset type and value."
                  },
                  {
                    question: "Is a deposit required?",
                    answer: "Often no, but some lenders require 10–20% depending on the asset and borrower profile."
                  },
                  {
                    question: "Do I own the asset during finance?",
                    answer: "Depends on structure: ownership varies between chattel mortgage, hire purchase, and leasing arrangements."
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
            <Link to="/services/equipment-finance" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-semibold">Equipment Finance</h3>
                  <p className="text-sm text-muted-foreground">Specialised equipment financing solutions</p>
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
          <h2 className="text-3xl font-bold mb-4">Apply for Asset Finance Today</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Need vehicles, machinery, or equipment? Asset finance makes growth affordable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Apply Now for Asset Finance
            </Button>
            <Button variant="outline" size="lg">
              Speak to Specialist
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default AssetFinance;