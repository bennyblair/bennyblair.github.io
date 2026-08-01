import { createRoot, hydrateRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { installContactTracking, trackPageView } from "@/lib/analytics";
import App, { preloadCurrentRoute } from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;
const isPrerendered = document.documentElement.dataset.prerendered === "true" && root.hasChildNodes();

function initialisePrerenderedHeroVideo() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => undefined;

  const video = document.querySelector<HTMLVideoElement>('video[data-hero-video="true"]');
  const source = video?.querySelector<HTMLSourceElement>("source[data-src]");
  if (!video || !source) return () => undefined;

  let loaded = document.readyState === "complete";
  let interacted = false;
  const interactionEvents: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "scroll", "touchstart"];

  const removeInteractionListeners = () => {
    interactionEvents.forEach((eventName) => window.removeEventListener(eventName, onInteraction));
  };
  const enableVideo = () => {
    if (!loaded || !interacted || source.src) return;
    source.src = source.dataset.src || "";
    video.load();
    void video.play().catch(() => undefined);
    removeInteractionListeners();
  };
  function onInteraction() {
    interacted = true;
    enableVideo();
  }
  const onLoad = () => {
    loaded = true;
    enableVideo();
  };

  interactionEvents.forEach((eventName) =>
    window.addEventListener(eventName, onInteraction, { passive: true, once: true }),
  );
  if (!loaded) window.addEventListener("load", onLoad, { once: true });

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && source.src) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, { threshold: 0.1 });
  observer.observe(video);

  return () => {
    window.removeEventListener("load", onLoad);
    removeInteractionListeners();
    observer.disconnect();
  };
}

async function mountApp(preload = preloadCurrentRoute(window.location.pathname)) {
  await preload;
  const app = <App />;
  if (isPrerendered && window.location.pathname === "/") {
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
  const routePreload = preloadCurrentRoute(window.location.pathname);
  const removeHeroVideo = initialisePrerenderedHeroVideo();
  const removeInitialContactTracking = installContactTracking();
  window.setTimeout(() => trackPageView(window.location.pathname, document.title), 0);

  const activationEvents: Array<keyof WindowEventMap> = [
    "focusin",
    "keydown",
    "pointerover",
    "touchstart",
    "wheel",
  ];
  let activated = false;
  const activate = () => {
    if (activated) return;
    activated = true;
    activationEvents.forEach((eventName) => window.removeEventListener(eventName, activate));
    removeHeroVideo();
    void mountApp(routePreload).then(() => {
      window.setTimeout(removeInitialContactTracking, 1000);
    });
  };
  activationEvents.forEach((eventName) =>
    window.addEventListener(eventName, activate, { passive: true, once: true }),
  );
} else {
  void mountApp();
}
