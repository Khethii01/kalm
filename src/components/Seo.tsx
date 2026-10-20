import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "../site";

type SeoProps = {
  title: string;
  description: string;
  /** Canonical path, e.g. "/about". Defaults to the current path. */
  path?: string;
  /** Open Graph image absolute or root-relative URL. */
  image?: string;
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

/**
 * Lightweight head manager — sets per-page title, meta description,
 * canonical URL and Open Graph / Twitter tags without external deps.
 */
export default function Seo({ title, description, path, image }: SeoProps) {
  const location = useLocation();

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
    upsertLink("canonical", canonical);

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
  }, [title, description, path, image, location.pathname]);

  return null;
}
