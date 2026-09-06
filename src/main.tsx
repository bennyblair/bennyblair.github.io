import { createRoot, hydrateRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { installContactTracking, trackPageView } from "@/lib/analytics";
import App, { preloadCurrentRoute } from "./App.tsx";
import "./index.css";
import "./styles/old-tom-redesign.css";

const root = document.getElementById("root")!;
const isPrerendered = document.documentElement.dataset.prerendered === "true" && root.hasChildNodes();

async function mountApp(preload = preloadCurrentRoute(window.location.pathname)) {
  await preload;
  const app = <App />;
  if (isPrerendered && window.location.pathname === "/") {
    // Keep the fast, accessible server-rendered first paint in place and attach
    // interactions to it. Replacing this tree caused a second full-page paint
    // and incorrectly pushed LCP out to the JavaScript activation time.
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }

  let toasterContainer = document.getElementById("toaster-root");
  if (!toasterContainer) {
    toasterContainer = document.createElement("div");
    toasterContainer.id = "toaster-root";
    document.body.appendChild(toasterContainer);
  }
  toasterContainer.replaceChildren();
  createRoot(toasterContainer).render(<Toaster />);
}

if (isPrerendered && window.location.pathname === "/") {
  const removeInitialContactTracking = installContactTracking();
  window.setTimeout(() => trackPageView(window.location.pathname, document.title), 0);

  const activationEvents: Array<keyof WindowEventMap> = [
    "keydown",
    "pointerdown",
    "touchstart",
  ];
  let activated = false;
  let formObserver: IntersectionObserver | undefined;
  const activate = () => {
    if (activated) return;
    activated = true;
    formObserver?.disconnect();
    activationEvents.forEach((eventName) => window.removeEventListener(eventName, activate));
    void mountApp().then(() => {
      window.setTimeout(removeInitialContactTracking, 1000);
    });
  };
  activationEvents.forEach((eventName) =>
    window.addEventListener(eventName, activate, { passive: true, once: true }),
  );
  // Prepare the form before it reaches the viewport, without fetching the
  // homepage route during its critical first paint. The serialized form stays
  // disabled until its own mounted effect confirms that handlers are attached.
  const enquirySection = document.querySelector('form[data-enquiry-ready]')?.closest("section");
  if (enquirySection && "IntersectionObserver" in window) {
    formObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) activate();
    }, { rootMargin: "1200px 0px" });
    formObserver.observe(enquirySection);
  } else {
    activate();
  }
} else {
  void mountApp();
}
