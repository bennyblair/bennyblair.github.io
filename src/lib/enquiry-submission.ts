import { isDesignPreview } from "./design-preview";

export type EnquirySubmissionResult = "accepted" | "preview" | "ignored";

export function isPreviewSubmission(hostname = typeof window === "undefined" ? "" : window.location.hostname) {
  return isDesignPreview || Boolean(import.meta.env?.DEV) || ["localhost", "127.0.0.1", "[::1]"].includes(hostname);
}

/** One unguessable id per submit. Never derived from personal data. */
export function createEnquiryId() {
  return crypto.randomUUID();
}

/** Only a successful server response is an accepted Netlify form post. Preview and bot paths never send. */
export async function submitNetlifyForm(
  formData: FormData,
  preview: boolean,
  send: typeof fetch = fetch,
): Promise<EnquirySubmissionResult> {
  if (formData.get("bot-field")) return "ignored";
  if (preview) return "preview";
  const body = new URLSearchParams();
  formData.forEach((value, key) => body.append(key, String(value)));
  const response = await send("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!response.ok) throw new Error("Your enquiry could not be submitted. Please try again or call us.");
  return "accepted";
}

/** Only a successful server response is an accepted enquiry. Preview and bot paths never send. */
export async function submitEnquiry(
  formData: FormData,
  preview: boolean,
  send: typeof fetch = fetch,
): Promise<EnquirySubmissionResult> {
  return submitNetlifyForm(formData, preview, send);
}
