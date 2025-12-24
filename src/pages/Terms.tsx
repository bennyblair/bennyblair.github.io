import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Emet Capital</title>
        <meta name="description" content="Terms of Service for Emet Capital Pty Ltd. Conditions of use for our website and commercial brokerage services." />
        <link rel="canonical" href="https://emetcapital.com.au/terms" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Terms of Service" }
          ]} />

          <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-6">Last updated: {new Date().toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the website of Emet Capital Pty Ltd ("we", "us", "our"), you agree to comply with and be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Nature of Services</h2>
              <p>
                Emet Capital Pty Ltd operates as a commercial finance broker. We act as an intermediary between borrowers and lenders to arrange commercial finance facilities.
              </p>
              <p className="mt-2">
                <strong>Business Purpose Only:</strong> Our services and the products we arrange are strictly for business and commercial purposes. 
                We do not provide consumer credit or loans for personal, domestic, or household purposes regulated by the National Consumer Credit Protection Act 2009 (NCCP).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. No Financial Advice</h2>
              <p>
                The content on this website is for general information purposes only and does not constitute financial, legal, or tax advice. 
                While we strive to ensure the accuracy of the information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information.
              </p>
              <p className="mt-2">
                You should seek independent professional advice appropriate to your specific circumstances before making any financial decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Emet Capital Pty Ltd excludes all liability for any loss or damage (including indirect or consequential loss) 
                arising from your use of this website or reliance on any information provided herein.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property</h2>
              <p>
                The content, design, and layout of this website are owned by or licensed to Emet Capital Pty Ltd. 
                You may not reproduce, distribute, or create derivative works from any part of this website without our prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. These links are provided for convenience only and do not signify our endorsement of those websites. 
                We have no control over the content of third-party sites and accept no responsibility for them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of New South Wales, Australia. 
                You agree to submit to the exclusive jurisdiction of the courts of New South Wales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact</h2>
              <p>
                For any enquiries regarding these Terms of Service, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Emet Capital Pty Ltd</strong><br />
                Email: <a href="mailto:enquiry@emetcapital.com.au" className="text-accent hover:underline">enquiry@emetcapital.com.au</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
