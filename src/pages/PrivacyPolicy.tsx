import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Emet Capital</title>
        <meta name="description" content="Privacy Policy for Emet Capital Pty Ltd. How we collect, use, and protect your personal information in accordance with Australian privacy laws." />
        <link rel="canonical" href="https://emetcapital.com.au/privacy-policy" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" }
          ]} />

          <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-6">Last updated: {new Date().toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p>
                Emet Capital Pty Ltd ("we", "us", or "our") respects your privacy and is committed to protecting your personal information. 
                This policy outlines how we collect, use, disclose, and manage your information in accordance with the Privacy Act 1988 (Cth) 
                and the Australian Privacy Principles (APPs).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
              <p>We collect information that is reasonably necessary for us to provide our commercial lending brokerage services. This may include:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Identity data: name, contact details (email, phone number, address).</li>
                <li>Financial data: loan requirements, loan amounts, business details, and financial circumstances relevant to your application.</li>
                <li>Technical data: IP address, browser type, and usage data when you visit our website.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Collect Information</h2>
              <p>We collect information directly from you when you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Fill out forms on our website (e.g., "Get Quote" or contact forms).</li>
                <li>Communicate with us via email, phone, or other channels.</li>
                <li>Interact with our website (via cookies and analytics tools).</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Purpose of Collection</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Assess your eligibility for commercial finance products.</li>
                <li>Connect you with suitable lenders and arrange finance facilities.</li>
                <li>Respond to your enquiries and provide customer support.</li>
                <li>Comply with our legal and regulatory obligations.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Disclosure of Information</h2>
              <p>
                We may disclose your personal information to third parties for the purposes outlined above, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Lenders, banks, and financial institutions to facilitate your loan application.</li>
                <li>Service providers who assist us in operating our business (e.g., IT support, CRM systems).</li>
                <li>Regulatory bodies or law enforcement agencies if required by law.</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Security</h2>
              <p>
                We take reasonable steps to protect your personal information from misuse, interference, loss, unauthorised access, modification, or disclosure. 
                However, no data transmission over the internet is guaranteed to be 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or wish to access or correct your personal information, please contact us at:
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

export default PrivacyPolicy;
