import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { HeadContext } from "./components/HeadContext";
import { createHeadSink, type HeadData } from "./components/headSink";
import { ARTICLES } from "./articles";

/**
 * Render a single route to static HTML + collect its head data.
 * Called by scripts/prerender.mjs for each route at build time.
 */
export function render(url: string): { html: string; head: HeadData } {
  const sink = createHeadSink();
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={sink}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>
  );
  return { html, head: sink.collected };
}

/** The list of routes to pre-render into static HTML. */
export const ROUTES = [
  "/",
  "/about",
  "/fuel-supply-solutions",
  "/lubricants",
  "/industries",
  "/request-a-quote",
  "/supplier-enquiries",
  "/contact",
  "/insights",
  ...ARTICLES.map((a) => `/insights/${a.slug}`),
  "/privacy-policy",
  "/terms",
];
