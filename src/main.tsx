import { createRoot, hydrateRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import App, { preloadCurrentRoute } from "./App.tsx";
import { captureNavigationState } from "./lib/navigation-state";
import "./index.css";
import "./styles/architectural.css";

const root = document.getElementById("root")!;
const isPrerendered = document.documentElement.dataset.prerendered === "true" && root.hasChildNodes();

async function mountApp(preload = preloadCurrentRoute(window.location.pathname)) {
  await preload;
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
