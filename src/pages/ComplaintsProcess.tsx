import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";

const ComplaintsProcess = () => {
  return (
    <div className="min-h-screen py-8">
      <SEO
        title="Complaints Process | Emet Capital"
        description="How to raise a complaint with Emet Capital and what happens after we receive it."
        canonical="/complaints-process"
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Complaints Process", href: "/complaints-process" },
          ]}
        />
        <article className="prose prose-slate max-w-none">
          <h1>Complaints Process</h1>

          <p>
            Emet Capital is committed to handling complaints fairly, transparently,
            and within reasonable timeframes. If you are unhappy with any aspect of
            our service, please raise it with us using the process below.
          </p>

          <h2>How to make a complaint</h2>
          <p>Complaints can be made by either of the following methods:</p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:enquiry@emetcapital.com.au">enquiry@emetcapital.com.au</a>
            </li>
            <li>
              <strong>Phone:</strong> <a href="tel:0485952651">0485 952 651</a>
            </li>
          </ul>

          <p>When making a complaint, please include:</p>
          <ul>
            <li>Your full name and preferred contact details.</li>
            <li>A clear description of what happened, including dates where possible.</li>
            <li>The outcome you are seeking.</li>
            <li>Copies of any relevant documents or correspondence.</li>
          </ul>

          <h2>What happens after you complain</h2>
          <p>
            <strong>Acknowledgement:</strong> We will acknowledge your complaint within
            five business days of receiving it.
          </p>
          <p>
            <strong>Investigation:</strong> We will review the complaint, gather any
            relevant information from our records, and where appropriate, speak with the
            team members involved. Most complaints are resolved within 21 calendar days.
          </p>
          <p>
            <strong>Response:</strong> We will provide a written response setting out:
          </p>
          <ul>
            <li>Our findings on what occurred.</li>
            <li>The reasons for our decision.</li>
            <li>Any actions we propose to take.</li>
            <li>
              Information about your right to escalate the complaint if you are not
              satisfied with our response.
            </li>
          </ul>
          <p>
            <strong>Complex matters:</strong> Where a complaint involves complex
            circumstances or requires information from third parties, our response may
            take longer than 21 days. If this is the case, we will keep you informed of
            progress and provide an estimated resolution date.
          </p>

          <h2>If you are not satisfied with our response</h2>
          <p>
            If you are not satisfied with how we have handled your complaint, or with our
            final response, external dispute resolution options for commercial finance
            complaints depend on the nature of the matter and the specific facts of your
            situation.
          </p>
          <p>Avenues that may be available to you include:</p>
          <ul>
            <li>
              The relevant industry body for your matter (such as MFAA, FBAA, or CAFBA,
              depending on the broker channel involved).
            </li>
            <li>
              Independent legal advice from a commercial litigation or financial services
              lawyer.
            </li>
            <li>
              Regulatory bodies where the matter relates to misconduct or regulatory
              breach.
            </li>
          </ul>
          <p>
            We are happy to provide guidance on appropriate avenues based on the specifics
            of your complaint.
          </p>

          <h2>Scope</h2>
          <p>
            Emet Capital arranges commercial-purpose finance only. We do not provide
            consumer credit services. Complaints relating to consumer credit, residential
            home loans, or other regulated consumer financial products fall outside our
            scope of service.
          </p>

          <h2>Records</h2>
          <p>
            We keep records of complaints and our responses for at least seven years, in
            line with standard recordkeeping practice. These records help us identify
            recurring issues and improve our service over time.
          </p>

          <h2>Contact details</h2>
          <p>
            <strong>Emet Capital Pty Ltd</strong>
            <br />
            ABN 50 682 228 182
            <br />
            Email:{" "}
            <a href="mailto:enquiry@emetcapital.com.au">enquiry@emetcapital.com.au</a>
            <br />
            Phone: <a href="tel:0485952651">0485 952 651</a>
          </p>
        </article>
      </div>
    </div>
  );
};

export default ComplaintsProcess;
