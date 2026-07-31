export const ANALYTICS_IDS = {
  ga4: "G-EWJCDYNTCG",
  googleAds: "AW-16887067533",
} as const;

type AnalyticsParameters = Record<string, string | number | boolean | undefined>;

let lastPageView = "";
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
