import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/l10n";

import App from "@/App.tsx";
import { performanceMonitor } from "@/utils/performance";

import "@/style/index.css";

// Initialize performance monitoring
performanceMonitor.init();

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
