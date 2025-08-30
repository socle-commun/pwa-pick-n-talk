import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/l10n";

// Import Roboto fonts for MUI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
