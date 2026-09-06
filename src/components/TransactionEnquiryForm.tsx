import { isDesignPreview } from "@/lib/design-preview";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getLandingAttribution, trackEnquiryStep, trackLead } from "@/lib/analytics";
import { submitEnquiry } from "@/lib/enquiry-submission";
import { ENQUIRY_RESPONSE_MESSAGE, normaliseTransactionPurpose, TRANSACTION_JOURNEYS } from "@/lib/transactions";

const selectClass = "mt-1 flex min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const emptyFields = { name: "", email: "", phone: "", business: "", loanAmount: "", timing: "", message: "", securityType: "", securityLocation: "", securityValue: "", existingDebt: "", repaymentPlan: "" };

function focusEnquiryField(field: HTMLElement | null) {
  if (!field) return;
  field.focus({ preventScroll: true });
  // Native focus can leave the first field underneath the sticky navigation
  // when the transaction fieldset is replaced by the contact fields.
  field.scrollIntoView({ block: "center", behavior: "instant" });
}

export default function TransactionEnquiryForm({ formName, className = "" }: { formName: "contact" | "homepage-contact"; className?: string }) {
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(1);
  const [purpose, setPurpose] = useState("");
  const [fields, setFields] = useState(emptyFields);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ kind: "success" | "error" | "preview"; text: string } | null>(null);
  const [attribution, setAttribution] = useState({ landing_path: "", landing_category: "" });
  const purposeRef = useRef<HTMLSelectElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const busy = useRef(false);

  useEffect(() => {
    const initial = normaliseTransactionPurpose(new URLSearchParams(window.location.search).get("purpose"));
    if (initial !== "not_provided") setPurpose(initial);
    setAttribution(getLandingAttribution());
    // The build browser also runs effects. Keep its serialized controls disabled
    // so the real browser cannot edit them before React has attached handlers.
    const runtime = window as Window & { __EMET_PRERENDER__?: boolean };
    if (!runtime.__EMET_PRERENDER__) setReady(true);
  }, []);

  const update = (key: keyof typeof fields, value: string) => setFields((previous) => ({ ...previous, [key]: value }));
  const id = (field: string) => formName + "-" + field;
  const next = () => {
    if (!ready) return;
    if (!purposeRef.current?.reportValidity()) return;
    setStep(2);
    trackEnquiryStep(formName, purpose);
    window.setTimeout(() => focusEnquiryField(contactRef.current), 0);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ready) return;
    if (step === 1) { next(); return; }
    if (busy.current) return;
    busy.current = true;
    setSubmitting(true);
    setNotice(null);
    try {
      const formData = new FormData(event.currentTarget);
      const preview = isDesignPreview || import.meta.env.DEV || ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
      const result = await submitEnquiry(formData, preview);
      if (result === "ignored") return;
      if (result === "preview") {
        setNotice({ kind: "preview", text: "Preview only: no enquiry was sent or counted." });
        return;
      }
      trackLead(formName, purpose);
      setNotice({ kind: "success", text: "Your enquiry has been submitted. " + ENQUIRY_RESPONSE_MESSAGE });
      setFields(emptyFields);
      setPurpose("");
      setStep(1);
    } catch {
      setNotice({ kind: "error", text: "Your enquiry could not be submitted. Please try again or call 0485 952 651." });
    } finally {
      busy.current = false;
      setSubmitting(false);
    }
  };

  return (
    <form name={formName} method="POST" action="/" data-netlify="true" data-netlify-honeypot="bot-field" data-enquiry-ready={ready ? "true" : "false"} aria-busy={!ready} onSubmit={handleSubmit} className={"transaction-enquiry space-y-6 " + className}>
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="loanType" value={TRANSACTION_JOURNEYS.find((journey) => journey.value === purpose)?.label || (purpose === "other" ? "Other business finance" : "")} />
      <input type="hidden" name="landingPath" value={attribution.landing_path} />
      <input type="hidden" name="landingCategory" value={attribution.landing_category} />
      <p hidden><label htmlFor={id("bot-field")}>Do not fill this out</label><input id={id("bot-field")} name="bot-field" tabIndex={-1} autoComplete="off" /></p>
      <p className="text-sm text-muted-foreground" aria-live="polite">{ready ? "Step " + step + " of 2 · " + (step === 1 ? "Your transaction" : "Your contact details") : "Preparing the enquiry form…"}</p>

      <fieldset hidden={step !== 1} disabled={!ready} className="space-y-5">
        <legend className="sr-only">Your transaction</legend>
        <div>
          <Label htmlFor={id("purpose")}>What do you need the funding for? *</Label>
          <select ref={purposeRef} id={id("purpose")} name="transactionPurpose" required value={purpose} onChange={(event) => setPurpose(event.target.value)} className={selectClass}>
            <option value="">Select a business purpose</option>
            {TRANSACTION_JOURNEYS.map((journey) => <option key={journey.value} value={journey.value}>{journey.label}</option>)}
            <option value="other">Other business finance / unsure</option>
          </select>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div><Label htmlFor={id("amount")}>Approximate funding amount (optional)</Label><Input id={id("amount")} name="loanAmount" inputMode="decimal" value={fields.loanAmount} onChange={(event) => update("loanAmount", event.target.value)} placeholder="e.g. $500,000" className="mt-1" /></div>
          <div><Label htmlFor={id("timing")}>When is funding needed? (optional)</Label><Input id={id("timing")} name="timing" value={fields.timing} onChange={(event) => update("timing", event.target.value)} placeholder="Date or approximate timeframe" className="mt-1" /></div>
        </div>
        <p className="text-sm text-muted-foreground">For business-purpose borrowing, with residential or commercial property as security. No consumer or home loans.</p>
        <Button type="button" onClick={next} className="w-full min-h-11">Continue to contact details</Button>
      </fieldset>

      <fieldset hidden={step !== 2} disabled={!ready || step !== 2} className="space-y-5">
        <legend className="sr-only">Your contact details</legend>
        <div className="grid sm:grid-cols-2 gap-5">
          <div><Label htmlFor={id("name")}>Full name *</Label><Input ref={contactRef} id={id("name")} name="name" autoComplete="name" required value={fields.name} onChange={(event) => update("name", event.target.value)} className="mt-1" /></div>
          <div><Label htmlFor={id("email")}>Email *</Label><Input id={id("email")} name="email" type="email" autoComplete="email" required value={fields.email} onChange={(event) => update("email", event.target.value)} className="mt-1" /></div>
          <div><Label htmlFor={id("phone")}>Phone (optional)</Label><Input id={id("phone")} name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={(event) => update("phone", event.target.value)} className="mt-1" /></div>
          <div><Label htmlFor={id("business")}>Business name (optional)</Label><Input id={id("business")} name="business" autoComplete="organization" value={fields.business} onChange={(event) => update("business", event.target.value)} className="mt-1" /></div>
        </div>
        <details className="rounded-lg border border-border p-4">
          <summary className="cursor-pointer font-medium">Add property and repayment details (optional)</summary>
          <p className="text-sm text-muted-foreground my-4">Approximate details are enough at this stage. Please do not include identity documents, account numbers or passwords.</p>
          <div className="grid sm:grid-cols-2 gap-5">
            <div><Label htmlFor={id("security-type")}>Property security</Label><select id={id("security-type")} name="securityType" value={fields.securityType} onChange={(event) => update("securityType", event.target.value)} className={selectClass}><option value="">Select if known</option><option value="residential">Residential property</option><option value="commercial">Commercial property</option><option value="both">Both</option><option value="unsure">Unsure / other</option></select></div>
            <div><Label htmlFor={id("security-location")}>Suburb or postcode</Label><Input id={id("security-location")} name="securityLocation" value={fields.securityLocation} onChange={(event) => update("securityLocation", event.target.value)} className="mt-1" /></div>
            <div><Label htmlFor={id("security-value")}>Approximate property value</Label><Input id={id("security-value")} name="securityValue" inputMode="decimal" value={fields.securityValue} onChange={(event) => update("securityValue", event.target.value)} className="mt-1" /></div>
            <div><Label htmlFor={id("existing-debt")}>Approximate existing secured debt</Label><Input id={id("existing-debt")} name="existingDebt" inputMode="decimal" value={fields.existingDebt} onChange={(event) => update("existingDebt", event.target.value)} className="mt-1" /></div>
          </div>
          <div className="mt-5"><Label htmlFor={id("repayment")}>How would the loan be repaid?</Label><Input id={id("repayment")} name="repaymentPlan" value={fields.repaymentPlan} onChange={(event) => update("repaymentPlan", event.target.value)} placeholder="e.g. business income, refinance or sale" className="mt-1" /></div>
        </details>
        <div><Label htmlFor={id("message")}>Anything else we should know? (optional)</Label><Textarea id={id("message")} name="message" rows={3} value={fields.message} onChange={(event) => update("message", event.target.value)} className="mt-1" /></div>
        <p className="text-sm text-muted-foreground">We will review your scenario and explain any next steps. This enquiry is not an approval or offer of finance. See our <a href="/privacy-policy" className="underline">privacy policy</a>.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button type="button" variant="outline" disabled={submitting} onClick={() => { setStep(1); window.setTimeout(() => focusEnquiryField(purposeRef.current), 0); }}>Back</Button>
          <Button type="submit" disabled={submitting} className="flex-1 min-h-11">{submitting ? "Submitting..." : "Submit business finance enquiry"}</Button>
        </div>
      </fieldset>
      {notice && <p role={notice.kind === "error" ? "alert" : "status"} className={notice.kind === "error" ? "text-destructive" : "text-foreground"}>{notice.text}</p>}
    </form>
  );
}
