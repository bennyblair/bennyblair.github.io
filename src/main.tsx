import { createRoot, hydrateRoot } from "react-dom/client";
import App, { preloadCurrentRoute } from "./App.tsx";
import { captureNavigationState } from "./lib/navigation-state";
import "./index.css";
import "./styles/architectural.css";

const root = document.getElementById("root")!;
const isPrerendered = document.documentElement.dataset.prerendered === "true" && root.hasChildNodes();

async function mountApp(preload = preloadCurrentRoute(window.location.pathname)) {
  await preload;
  if (isPrerendered && window.location.pathname === "/") {
    // Give the browser one paint of the existing HTML before hydration work.
    // Native navigation is already usable; no gesture or timer activates it.
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  }
  captureNavigationState();
  const app = <App />;
  if (isPrerendered && window.location.pathname === "/") {
    // Keep the fast, accessible server-rendered first paint in place and attach
    // interactions to it. Replacing this tree caused a second full-page paint
    // and incorrectly pushed LCP out to the JavaScript activation time.
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }

  const { Toaster } = await import("@/components/ui/toaster");
  let toasterContainer = document.getElementById("toaster-root");
  if (!toasterContainer) {
    toasterContainer = document.createElement("div");
    toasterContainer.id = "toaster-root";
    document.body.appendChild(toasterContainer);
  }
  toasterContainer.replaceChildren();
  createRoot(toasterContainer).render(<Toaster />);
}

void mountApp();
