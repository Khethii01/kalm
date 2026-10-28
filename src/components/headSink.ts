/**
 * Shared "head sink" used during static pre-rendering.
 *
 * In the browser this is unused — the Seo component writes directly to
 * document.head. During the build-time pre-render (Node), there is no
 * document, so Seo pushes the head data into this sink instead, and the
 * pre-render script reads it to bake real <title>/<meta>/<script> tags into
 * each page's static HTML.
 */

export type HeadData = {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  image?: string;
  ogTitle?: string;
  jsonLd: Record<string, unknown>[];
};

export type HeadSink = {
  collected: HeadData;
};

export function createHeadSink(): HeadSink {
  return { collected: { jsonLd: [] } };
}

/** True when running in a browser (document is available). */
export const isBrowser = typeof document !== "undefined";
