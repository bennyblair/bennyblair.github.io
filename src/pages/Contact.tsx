import TransactionEnquiryForm from "@/components/TransactionEnquiryForm";
import { ENQUIRY_RESPONSE_MESSAGE } from "@/lib/transactions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { generateContactPageSchema } from "@/lib/schema-utils";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

const Contact = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact" }
  ];

  const benefits = [
    "Success-based fee structure - We'll discuss our complete fee approach upfront",
    "Access to 100+ commercial lenders",
    "Expert guidance through the entire process",
    "Competitive rates and terms",
    "Coordination through lender assessment and settlement",
    "Ongoing support and relationship management"
  ];

  return (
    <div className="min-h-screen py-8">
      <SEO 
        title="Contact Emet Capital | Commercial Finance Quote"
        description="Contact Emet Capital to discuss commercial finance, private lending, bridging finance, or property-backed business funding in Australia."
        canonical="/contact"
        keywords="contact emet capital, commercial finance quote, business finance enquiry, bridging finance contact, private lending enquiry"
        schemas={[generateContactPageSchema()]}
      />
      
      <div className="container mx-auto px-4">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Discuss Your Business Finance Transaction
          </h1>
          <p className="text-xl text-muted-foreground">
            Tell us about a purchase, refinance, bridging gap or equity release for business. Residential or commercial property may support the borrowing, subject to lender assessment.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Start with Your Transaction
                </h2>
                <TransactionEnquiryForm formName="contact" />
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & Benefits */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <a className="font-medium text-foreground hover:text-accent" href="tel:+61485952651">
                        0485 952 651
                      </a>
                      <div className="text-sm text-muted-foreground">Monday to Friday, 8:00 AM - 6:00 PM</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <a
                        className="font-medium text-foreground hover:text-accent"
                        href="mailto:enquiry@emetcapital.com.au"
                      >
                        enquiry@emetcapital.com.au
                      </a>
                      <div className="text-sm text-muted-foreground">{ENQUIRY_RESPONSE_MESSAGE}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">Sydney, Australia</div>
                      <div className="text-sm text-muted-foreground">Serving all Australian states</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">What happens next</div>
                      <div className="text-sm text-muted-foreground">A broker reviews the purpose, security and timing, then explains the information needed to assess options.</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">Why Choose Emet Capital?</h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Urgent Financing */}
            <Card className="bg-gradient-to-r from-accent/10 to-accent-light/10 border-accent/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold text-foreground mb-4">Need Urgent Financing?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For a time-sensitive transaction, call us to discuss the deadline and the documents available.
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
                  asChild
                >
                  <a href="tel:0485952651">Call Now: 0485 952 651</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
