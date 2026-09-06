export type EnquirySubmissionResult = "accepted" | "preview" | "ignored";

/** Only a successful server response is an accepted enquiry. Preview and bot paths never send. */
export async function submitEnquiry(
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
