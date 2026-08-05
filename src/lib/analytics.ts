export const ANALYTICS_IDS = {
  ga4: "G-EWJCDYNTCG",
  googleAds: "AW-16887067533",
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
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, clean(parameters));
}

export function trackPageView(path: string, title: string) {
  const pageView = `${path}:${title}`;
  if (pageView === lastPageView) return;
  lastPageView = pageView;
  trackEvent("page_view", {
    page_location: `${window.location.origin}${path}`,
    page_path: path,
    page_title: title,
  });
  trackAiReferralLanding(path);
}

export function trackLead(formName: string, loanType?: string) {
  trackEvent("generate_lead", {
    form_name: formName,
    finance_type: loanType || "not_provided",
  });
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
      trackEvent(explicitEvent, {
        link_text: link.textContent?.trim().slice(0, 120),
        link_url: link.href,
      });
      return;
    }

    if (link.href.startsWith("tel:")) {
      trackEvent("phone_click", { contact_method: "phone" });
    } else if (link.href.startsWith("mailto:")) {
      trackEvent("email_click", { contact_method: "email" });
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
