import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    loanType: "",
    loanAmount: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('=== FORM SUBMIT STARTED ===');
    e.preventDefault();
    console.log('preventDefault called');
    setIsSubmitting(true);
    console.log('isSubmitting set to true');

    try {
      console.log('Form data being submitted:', formData);
      
      // Basic validation
      if (!formData.name || !formData.email) {
        throw new Error('Name and email are required fields');
      }
      
      console.log('Basic validation passed');
      
      // Prepare insert data, removing empty strings for optional fields
      const insertData = {
        full_name: formData.name.trim(),
        email_address: formData.email.trim(),
        phone_number: formData.phone?.trim() || null,
        business_name: formData.business?.trim() || null,
        loan_type: formData.loanType || null,
        approximate_loan_amount: formData.loanAmount?.trim() || null,
        financing_needs: formData.message?.trim() || null,
      };

      console.log('Insert data prepared:', insertData);
      
      // Test Supabase connection first
      console.log('Testing Supabase connection...');
      const { data: testData, error: testError } = await supabase
        .from("form_submissions")
        .select('count', { count: 'exact', head: true });
      
      console.log('Supabase connection test:', { testData, testError });
      
      if (testError) {
        throw new Error(`Database connection failed: ${testError.message}`);
      }
      
      console.log('Supabase connection successful, proceeding with insert...');
      
      // Submit to Supabase
      const { data, error } = await supabase
        .from("form_submissions")
        .insert(insertData);

      console.log('Supabase insert result:', { data, error });

      if (error) {
        console.error('Detailed Supabase error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('Database insert successful, calling edge function with:', formData);
      
      // Send notification email
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-form-notification', {
        body: formData
      });

      console.log('Edge function result:', { emailData, emailError });

      if (emailError) {
        console.error('Edge function error:', emailError);
        console.warn('Email notification failed, but form submission was successful');
      }

      // Reset form and show success message
      setFormData({
        name: "",
        email: "",
        phone: "",
        business: "",
        loanType: "",
        loanAmount: "",
        message: ""
      });

      toast({
        title: "Form submitted successfully!",
        description: "We'll get back to you within 24-48 hours.",
      });

      console.log('=== FORM SUBMIT COMPLETED SUCCESSFULLY ===');

    } catch (error: any) {
      console.error('=== FORM SUBMIT ERROR ===');
      console.error('Error submitting form:', error);
      console.error('Error details:', {
        name: error?.name,
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
        code: error?.code,
        stack: error?.stack
      });
      
      let errorMessage = "Please try again or contact us directly.";
      if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error submitting form",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      console.log('Setting isSubmitting to false');
      setIsSubmitting(false);
      console.log('=== FORM SUBMIT ENDED ===');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const loanTypes = [
    "Asset Finance",
    "Development Finance",
    "Bridging Finance", 
    "Working Capital",
    "Invoice Finance",
    "Trade Finance",
    "Other"
  ];

  const benefits = [
    "No upfront fees - we only get paid when you do",
    "Access to 100+ commercial lenders",
    "Expert guidance through the entire process",
    "Competitive rates and terms",
    "Fast approval and settlement times",
    "Ongoing support and relationship management"
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Get Your Commercial Lending Quote
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to explore your commercial lending options? Our expert team is here to help you secure the right financing solution for your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Request Your Free Consultation
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6" netlify name="contact">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="business">Business Name</Label>
                      <Input
                        id="business"
                        name="business"
                        value={formData.business}
                        onChange={(e) => handleInputChange("business", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Loan Type</Label>
                      <Select onValueChange={(value) => handleInputChange("loanType", value)} name="loanType">
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                          {loanTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="loanAmount">Approximate Loan Amount</Label>
                      <Input
                        id="loanAmount"
                        name="loanAmount"
                        placeholder="e.g., $500,000"
                        value={formData.loanAmount}
                        onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Tell us about your financing needs</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Describe your business, financing requirements, timeline, and any specific questions..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
                  >
                    {isSubmitting ? "Submitting..." : "Get Your Free Quote"}
                  </Button>
                </form>
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
                      <div className="font-medium text-foreground">0485 952 651</div>
                      <div className="text-sm text-muted-foreground">Monday to Friday, 8:00 AM - 6:00 PM</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">enquiry@emetcapital.com.au</div>
                      <div className="text-sm text-muted-foreground">We respond within 2 hours</div>
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
                      <div className="font-medium text-foreground">24-48 Hour Response</div>
                      <div className="text-sm text-muted-foreground">Initial assessment and feedback</div>
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
                  For time-sensitive opportunities, call us directly for immediate assistance.
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