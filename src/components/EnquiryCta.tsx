import { Link } from "react-router-dom";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ENQUIRY_RESPONSE_MESSAGE, type TransactionPurpose } from "@/lib/transactions";

export const EMET_PHONE_DISPLAY = "0485 952 651";
export const EMET_PHONE_HREF = "tel:+61485952651";
export const EMET_EMAIL = "enquiry@emetcapital.com.au";

type Props = {
  purpose?: TransactionPurpose;
  heading?: string;
  variant?: "card" | "band";
  enquireEvent?: "service_enquiry" | "property_pillar_enquiry";
  enquireHref?: string;
  hideEnquire?: boolean;
};

export function EnquiryCta({
  purpose,
  heading = "Talk to a broker about your transaction",
  variant = "card",
  enquireEvent,
  enquireHref,
  hideEnquire = false,
}: Props) {
  const HeadingTag = variant === "band" ? "h2" : "h3";
  const enquireUrl = enquireHref ?? ("/contact" + (purpose && purpose !== "not_provided" ? "?purpose=" + purpose : ""));
  const hashEnquire = enquireUrl.startsWith("#");
  const enquireAttrs = enquireEvent
    ? { "data-analytics-event": enquireEvent, "data-transaction-purpose": purpose }
    : undefined;
  const enquireLabel = (
    <>
      Send an enquiry
      <ArrowRight aria-hidden="true" />
    </>
  );

  return (
    <div className={variant === "band" ? "enquiry-cta enquiry-cta-band" : "enquiry-cta enquiry-cta-card"}>
      <HeadingTag className={variant === "band" ? "text-3xl font-bold text-foreground mb-4" : "text-lg font-bold text-foreground mb-3"}>
        {heading}
      </HeadingTag>
      <p className={variant === "band" ? "text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed" : "text-sm text-muted-foreground mb-4"}>
        Emet Capital is a commercial finance broker, not a lender. Share the purpose, the property and the date, and we will tell you what is missing. {ENQUIRY_RESPONSE_MESSAGE}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:flex-wrap">
        {!hideEnquire && (
          <Button asChild>
            {hashEnquire ? (
              <a href={enquireUrl} {...enquireAttrs}>{enquireLabel}</a>
            ) : (
              <Link to={enquireUrl} {...enquireAttrs}>{enquireLabel}</Link>
            )}
          </Button>
        )}
        <Button asChild variant="outline">
          <a href={EMET_PHONE_HREF}>
            <Phone aria-hidden="true" />
            Call {EMET_PHONE_DISPLAY}
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href="mailto:enquiry@emetcapital.com.au">
            <Mail aria-hidden="true" />
            Email {EMET_EMAIL}
          </a>
        </Button>
      </div>
    </div>
  );
}
