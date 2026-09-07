import { isDesignPreview } from "./design-preview";
import { normaliseTransactionPurpose } from "./transactions";

export const ANALYTICS_IDS = {
  ga4: "G-EWJCDYNTCG",
  googleAds: "AW-16887067533",
  googleAdsLead: "AW-16887067533/w2SACJ7PzssaEI3nsPQ-",
} as const;

type AnalyticsParameters = Record<string, string | number | boolean | undefined>;

let lastPageView = "";
let aiLandingTracked = false;
let contactTrackingConsumers = 0;
let removeContactTracking: (() => void) | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "event" | "config", name: string, parameters?: AnalyticsParameters) => void;
  }
}

function clean(parameters: AnalyticsParameters) {
  return Object.fromEntries(Object.entries(parameters).filter(([, value]) => value !== undefined));
}

export type AiReferralSource = "chatgpt" | "perplexity" | "copilot" | "gemini" | "claude" | "unknown";

export type AiReferralClassification = {
  aiSource: AiReferralSource;
  detectionMethod: "campaign" | "referrer";
};

const AI_CAMPAIGN_SOURCES: Array<[RegExp, AiReferralSource]> = [
  [/(?:^|[-_.])(?:chatgpt|openai)(?:$|[-_.])/, "chatgpt"],
  [/(?:^|[-_.])perplexity(?:$|[-_.])/, "perplexity"],
  [/(?:^|[-_.])(?:copilot|bingchat)(?:$|[-_.])/, "copilot"],
  [/(?:^|[-_.])(?:gemini|bard)(?:$|[-_.])/, "gemini"],
  [/(?:^|[-_.])claude(?:$|[-_.])/, "claude"],
];

export function classifyAiReferral(referrer = "", search = ""): AiReferralClassification | null {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const campaignSource = [params.get("utm_source"), params.get("source"), params.get("ref")]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  for (const [pattern, aiSource] of AI_CAMPAIGN_SOURCES) {
    if (pattern.test(campaignSource)) return { aiSource, detectionMethod: "campaign" };
  }

  const medium = (params.get("utm_medium") || "").toLowerCase();
  if (["ai", "generative-ai", "generative_ai", "llm"].includes(medium)) {
    return { aiSource: "unknown", detectionMethod: "campaign" };
  }

  if (!referrer) return null;
  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (host === "chatgpt.com" || host === "chat.openai.com") {
      return { aiSource: "chatgpt", detectionMethod: "referrer" };
    }
    if (host === "perplexity.ai" || host.endsWith(".perplexity.ai")) {
      return { aiSource: "perplexity", detectionMethod: "referrer" };
    }
    if (host === "copilot.microsoft.com" || (host.endsWith("bing.com") && url.pathname.startsWith("/chat"))) {
      return { aiSource: "copilot", detectionMethod: "referrer" };
    }
    if (host === "gemini.google.com") return { aiSource: "gemini", detectionMethod: "referrer" };
    if (host === "claude.ai") return { aiSource: "claude", detectionMethod: "referrer" };
  } catch {
    return null;
  }
  return null;
}

function trackAiReferralLanding(path: string) {
  if (aiLandingTracked || typeof window === "undefined") return;
  aiLandingTracked = true;
  const classification = classifyAiReferral(document.referrer, window.location.search);
  if (!classification) return;
  trackEvent("ai_referral_landing", {
    ai_source: classification.aiSource,
    landing_path: path.split(/[?#]/, 1)[0],
    detection_method: classification.detectionMethod,
  });
}

export function trackEvent(name: string, parameters: AnalyticsParameters = {}) {
  if (isDesignPreview || typeof window === "undefined" || typeof window.gtag !== "function") return;
  let referrerOrigin = "";
  try { if (document.referrer) referrerOrigin = new URL(document.referrer).origin; } catch { /* Ignore malformed referrers. */ }
  try {
    window.gtag("event", name, clean({
      page_location: window.location.origin + safeAnalyticsPath(window.location.pathname),
      page_referrer: referrerOrigin,
      ...parameters,
    }));
  } catch { /* Analytics must never turn an accepted enquiry into a submission error. */ }
}

const publicAnalyticsPaths = new Set(["/", "/contact"]);
const landingKey = "emet_landing_v1";
let landingAttribution: { landing_path: string; landing_category: string } | undefined;

export function registerAnalyticsPaths(paths: string[]) {
  paths.filter((path) => path.startsWith("/") && !/[?#:*]/.test(path)).forEach((path) => publicAnalyticsPaths.add(path));
}

/** Retain published route paths only; never query strings, fragments or arbitrary user input. */
export function safeAnalyticsPath(value: string) {
  const path = value.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";
  return publicAnalyticsPaths.has(path) ? path : "/unknown";
}

export function landingCategory(path: string) {
  if (path === "/") return "home";
  if (path === "/contact") return "contact";
  if (/caveat/.test(path)) return "caveat";
  if (/second-mortgage|first-second-mortgage/.test(path)) return "mortgages";
  if (/bridg/.test(path)) return "bridging";
  if (/refinanc/.test(path)) return "refinancing";
  if (/commercial-property|property-development/.test(path)) return "property";
  if (/private-lend|private-mortgage/.test(path)) return "private_lending";
  if (path.startsWith("/services/") || path.startsWith("/resources/")) return "other_business_finance";
  return "other";
}

export function getLandingAttribution() {
  if (landingAttribution) return landingAttribution;
  if (typeof window === "undefined") return { landing_path: "/unknown", landing_category: "other" };
  let path = safeAnalyticsPath(window.location.pathname);
  try {
    const saved = window.sessionStorage.getItem(landingKey);
    if (saved && safeAnalyticsPath(saved) !== "/unknown") path = safeAnalyticsPath(saved);
    window.sessionStorage.setItem(landingKey, path);
  } catch { /* Storage may be unavailable; keep attribution for this page session. */ }
  landingAttribution = { landing_path: path, landing_category: landingCategory(path) };
  return landingAttribution;
}

function enquiryParameters(formName: string, purpose?: string) {
  return {
    ...getLandingAttribution(),
    form_name: formName === "homepage-contact" ? "homepage-contact" : "contact",
    transaction_purpose: normaliseTransactionPurpose(purpose),
    enquiry_path: typeof window === "undefined" ? "/unknown" : safeAnalyticsPath(window.location.pathname),
  };
}

export function trackPageView(path: string, title: string) {
  if (typeof window === "undefined") return;
  const safePath = safeAnalyticsPath(path);
  const pageView = safePath + ":" + title;
  if (pageView === lastPageView) return;
  lastPageView = pageView;
  getLandingAttribution();
  trackEvent("page_view", {
    page_location: window.location.origin + safePath,
    page_path: safePath,
    page_title: title,
  });
  trackAiReferralLanding(safePath);
}

export function trackEnquiryStep(formName: string, purpose?: string) {
  trackEvent("enquiry_contact_step", enquiryParameters(formName, purpose));
}

/** Call only after the form endpoint accepts the submission. Clicks and preview runs are not leads. */
export function trackLead(formName: string, purpose?: string) {
  trackEvent("generate_lead", enquiryParameters(formName, purpose));
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", "conversion", {
      send_to: ANALYTICS_IDS.googleAdsLead,
      value: 1,
      currency: "AUD",
    });
  } catch { /* Ads measurement must never turn an accepted enquiry into a submission error. */ }
}

export function installContactTracking() {
  contactTrackingConsumers += 1;
  if (removeContactTracking) {
    let active = true;
    return () => {
      if (!active) return;
      active = false;
      contactTrackingConsumers -= 1;
      if (contactTrackingConsumers === 0) {
        removeContactTracking?.();
        removeContactTracking = undefined;
      }
    };
  }

  const onClick = (event: MouseEvent) => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>("button");
    if (button && window.location.pathname.startsWith("/resources/tools/")) {
      const action = button.textContent?.replace(/\s+/g, " ").trim().slice(0, 80) || "calculator_interaction";
      if (/calculat|compar|repayment|result|estimate/i.test(action)) {
        trackEvent("calculator_use", {
          calculator: window.location.pathname.split("/").at(-1),
          action,
        });
      }
    }

    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a");
    if (!link) return;

    const explicitEvent = link.dataset.analyticsEvent;
    if (explicitEvent) {
      const url = new URL(link.href);
      trackEvent(explicitEvent, {
        ...getLandingAttribution(),
        link_path: url.origin === window.location.origin ? safeAnalyticsPath(url.pathname) : undefined,
        transaction_purpose: normaliseTransactionPurpose(link.dataset.transactionPurpose),
      });
      return;
    }

    if (link.href.startsWith("tel:")) {
      trackEvent("phone_click", { ...getLandingAttribution(), contact_method: "phone" });
    } else if (link.href.startsWith("mailto:")) {
      trackEvent("email_click", { ...getLandingAttribution(), contact_method: "email" });
    }
  };

  document.addEventListener("click", onClick);
  removeContactTracking = () => document.removeEventListener("click", onClick);
  let active = true;
  return () => {
    if (!active) return;
    active = false;
    contactTrackingConsumers -= 1;
    if (contactTrackingConsumers === 0) {
      removeContactTracking?.();
      removeContactTracking = undefined;
    }
  };
}
