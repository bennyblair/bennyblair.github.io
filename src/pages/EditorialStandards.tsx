import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";

const EditorialStandards = () => {
  return (
    <div className="min-h-screen py-8">
      <SEO
        title="Editorial Standards | Emet Capital"
        description="How Emet Capital prepares, reviews, updates, and corrects general commercial finance information."
        canonical="/editorial-standards"
      />

      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Editorial Standards" }
        ]} />

        <h1 className="text-4xl font-bold mb-6 text-foreground">Editorial Standards</h1>
        <div className="prose prose-lg max-w-none text-foreground">
          <p>
            Emet Capital publishes guides, case studies, and tools to help Australian business borrowers,
            property investors, developers, accountants, and advisers understand commercial finance options.
            The information on this site is general in nature and does not constitute financial, legal, tax,
            or credit advice. Decisions about finance should be made with reference to your own circumstances
            and, where appropriate, in consultation with a qualified professional.
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">Who writes our content</h2>
            <p>
              Content on emetcapital.com.au is produced by the Emet Capital team and reviewed before
              publication for factual accuracy, regulatory compliance, and clarity. Our team works directly
              with private lenders, institutional non-bank lenders, and brokers across the Australian
              commercial finance market, and our published content reflects what we observe in the deals
              we work on.
            </p>
            <p>
              We do not publish anonymous content. Where a guide or case study has a named author, that
              person was directly involved in writing or reviewing the material.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">How we research and source information</h2>
            <p>Our guides draw on three primary sources:</p>
            <ol>
              <li>
                Direct experience working on commercial finance transactions across private lending,
                bridging finance, caveat loans, development finance, asset-backed lending, and commercial
                property finance.
              </li>
              <li>
                Publicly available information from government sources (ASIC, ATO, ABS), industry bodies
                (MFAA, FBAA, CAFBA), and reputable financial publications.
              </li>
              <li>Lender-published criteria, term sheets, and product disclosure documents.</li>
            </ol>
            <p>
              We do not use information from sources we cannot verify, and we do not republish content
              from other websites without independent confirmation.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">What we will not publish</h2>
            <p>
              To stay compliant with Australian financial services and credit legislation, and because our
              content reaches readers making significant financial decisions, we do not publish:
            </p>
            <ul>
              <li>
                Specific interest rate quotes for individual lenders unless those rates are publicly
                disclosed by the lender at the time of writing.
              </li>
              <li>
                Guarantees about settlement timing, approval outcomes, or loan terms. Every transaction
                depends on the borrower, security, documents, and lender appetite at the time.
              </li>
              <li>
                Personal financial advice. We can explain how a product works; we cannot tell you whether
                it is right for your situation without understanding your circumstances.
              </li>
              <li>
                Content that compares specific lenders in ways that imply one is "best" or "worst".
                Lender suitability depends entirely on the individual transaction.
              </li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">How we keep content current</h2>
            <p>
              The commercial finance market changes: lenders enter and exit the market, criteria shift,
              and regulatory settings move. We review published guides at least every 12 months and
              update them when:
            </p>
            <ul>
              <li>Underlying regulations or industry standards change.</li>
              <li>A reader or industry contact identifies a factual error.</li>
              <li>
                Our experience shows that previously accurate content no longer reflects how the market
                operates.
              </li>
            </ul>
            <p>
              Each guide displays a "Published" date and, where applicable, a "Last updated" date.
              Material changes to a guide are reflected in the updated date.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">Corrections</h2>
            <p>
              If you find a factual error in any of our content, please email enquiry@emetcapital.com.au
              with the URL and a description of the issue. We review correction requests within five
              business days and, where the issue is verified, update the page promptly with a clear note
              of what changed and when.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">Conflicts of interest</h2>
            <p>
              Emet Capital is a commercial finance brokerage. When we arrange finance for a client, we are
              typically paid a commission by the lender. This does not affect what we publish - our guides
              are educational, not promotional - but readers should understand the commercial context in
              which the site exists.
            </p>
            <p>
              We do not accept paid placements, sponsored content, or paid links in our editorial content.
              Where we link externally, we link because the source is genuinely useful, not because of any
              commercial arrangement.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">Scope of our service</h2>
            <p>
              Emet Capital arranges commercial-purpose finance for business borrowers and property investors.
              We do not provide consumer credit, residential home loans for owner-occupiers, or personal
              loans. Our content reflects this focus and is written for a commercial audience.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">Contact</h2>
            <p>Editorial questions, correction requests, and feedback on our content can be sent to:</p>
            <p>
              <strong>Emet Capital Pty Ltd</strong><br />
              ABN 50 682 228 182<br />
              Email: <a href="mailto:enquiry@emetcapital.com.au" className="text-accent hover:underline">enquiry@emetcapital.com.au</a><br />
              Phone: <a href="tel:+61485952651" className="text-accent hover:underline">0485 952 651</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditorialStandards;
