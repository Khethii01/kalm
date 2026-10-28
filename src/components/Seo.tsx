import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "../site";
import { HeadContext } from "./HeadContext";
import { isBrowser } from "./headSink";

type SeoProps = {
  title: string;
  description: string;
  /** Canonical path, e.g. "/about". Defaults to the current path. */
  path?: string;
  /** Open Graph image absolute or root-relative URL. */
  image?: string;
  /** Comma-separated keywords for this page (light SEO signal). */
  keywords?: string;
  /** Optional JSON-LD structured data objects to inject for this page. */
  jsonLd?: Record<string, unknown>[];
};

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string
): void {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSONLD_ATTR = "data-page-jsonld";

/**
 * Lightweight head manager — sets per-page title, meta description,
 * canonical URL, Open Graph / Twitter tags, geo tags and JSON-LD structured
 * data without external deps.
 */
export default function Seo({
  title,
  description,
  path,
  image,
  keywords,
  jsonLd,
}: SeoProps) {
  const location = useLocation();
  const sink = useContext(HeadContext);

  // During static pre-render (Node, no document) collect the head data so the
  // build script can bake it into the static HTML. Runs during render, not in
  // an effect, because effects don't fire on the server.
  if (!isBrowser && sink) {
    const canonicalPath = path ?? location.pathname;
    const canonical = `${SITE.url}${canonicalPath === "/" ? "" : canonicalPath}`;
    const ogImage = image
      ? image.startsWith("http")
        ? image
        : `${SITE.url}${image}`
      : `${SITE.url}/logos/kalm-logo.jpg`;
    sink.collected = {
      title,
      description,
      canonical,
      keywords,
      image: ogImage,
      ogTitle: title,
      jsonLd: jsonLd ?? [],
    };
  }

  useEffect(() => {
    const canonicalPath = path ?? location.pathname;
    const canonical = `${SITE.url}${canonicalPath === "/" ? "" : canonicalPath}`;
    const ogImage = image
      ? image.startsWith("http")
        ? image
        : `${SITE.url}${image}`
      : `${SITE.url}/logos/kalm-logo.jpg`;

    document.title = title;

    upsertMeta("name", "description", description);
    if (keywords) upsertMeta("name", "keywords", keywords);
    upsertMeta("name", "robots", "index,follow,max-image-preview:large");
    upsertLink("canonical", canonical);

    // Geo targeting — signals a South African business.
    upsertMeta("name", "geo.region", "ZA");
    upsertMeta("name", "geo.placename", "South Africa");

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE.shortName);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:locale", "en_ZA");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);

    // Remove any JSON-LD this component previously injected, then add current.
    document.head
      .querySelectorAll(`script[${JSONLD_ATTR}]`)
      .forEach((n) => n.remove());
    (jsonLd ?? []).forEach((obj) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute(JSONLD_ATTR, "true");
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    });

    return () => {
      document.head
        .querySelectorAll(`script[${JSONLD_ATTR}]`)
        .forEach((n) => n.remove());
    };
  }, [title, description, path, image, keywords, jsonLd, location.pathname]);

  return null;
}
