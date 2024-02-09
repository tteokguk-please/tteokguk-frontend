import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";

import App from "./App.tsx";
import "./index.css";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [/^https:\/\/www\.tteokguk-please\.com/],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Sentry.ErrorBoundary>
    <App />
  </Sentry.ErrorBoundary>,
);
