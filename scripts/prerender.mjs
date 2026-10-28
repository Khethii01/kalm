/**
 * Static pre-rendering step (runs after `vite build`).
 *
 * For each route it renders the React app to static HTML and writes a real
 * dist/<route>/index.html with the fully-rendered content, correct <title>,
 * meta description, canonical, Open Graph tags and JSON-LD baked in.
 *
 * Crawlers then receive complete HTML immediately (no JS execution needed),
 * while the client bundle still hydrates for full interactivity.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHead(head) {
  const tags = [];
  if (head.description)
    tags.push(`<meta name="description" content="${esc(head.description)}" />`);
  if (head.keywords)
    tags.push(`<meta name="keywords" content="${esc(head.keywords)}" />`);
  tags.push(
    `<meta name="robots" content="index,follow,max-image-preview:large" />`
  );
  tags.push(`<meta name="geo.region" content="ZA" />`);
  tags.push(`<meta name="geo.placename" content="South Africa" />`);
  if (head.canonical)
    tags.push(`<link rel="canonical" href="${esc(head.canonical)}" />`);
  tags.push(`<meta property="og:type" content="website" />`);
  tags.push(`<meta property="og:site_name" content="KALM Group" />`);
  if (head.ogTitle)
    tags.push(`<meta property="og:title" content="${esc(head.ogTitle)}" />`);
  if (head.description)
    tags.push(
      `<meta property="og:description" content="${esc(head.description)}" />`
    );
  if (head.canonical)
    tags.push(`<meta property="og:url" content="${esc(head.canonical)}" />`);
  if (head.image)
    tags.push(`<meta property="og:image" content="${esc(head.image)}" />`);
  tags.push(`<meta property="og:locale" content="en_ZA" />`);
  tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (head.ogTitle)
    tags.push(`<meta name="twitter:title" content="${esc(head.ogTitle)}" />`);
  if (head.description)
    tags.push(
      `<meta name="twitter:description" content="${esc(head.description)}" />`
    );
  if (head.image)
    tags.push(`<meta name="twitter:image" content="${esc(head.image)}" />`);
  for (const obj of head.jsonLd || []) {
    tags.push(
      `<script type="application/ld+json" data-page-jsonld="true">${JSON.stringify(
        obj
      )}</script>`
    );
  }
  return tags.join("\n    ");
}

async function main() {
  // The SSR bundle is emitted to dist-ssr by the ssr build step.
  const { render, ROUTES } = await import(
    join(root, "dist-ssr", "entry-prerender.js")
  );

  const template = readFileSync(join(distDir, "index.html"), "utf8");

  for (const url of ROUTES) {
    const { html, head } = render(url);

    let page = template;

    // Replace the default <title> with the page title.
    if (head.title) {
      page = page.replace(
        /<title>[\s\S]*?<\/title>/,
        `<title>${esc(head.title)}</title>`
      );
    }

    // Inject per-page head tags right before </head>. We first strip the
    // template's default description/keywords/canonical/og tags to avoid
    // duplicates, then add the page-specific set.
    page = page
      .replace(/\n\s*<meta name="description"[^>]*>/g, "")
      .replace(/\n\s*<meta name="keywords"[^>]*>/g, "")
      .replace(/\n\s*<link rel="canonical"[^>]*>/g, "");

    page = page.replace("</head>", `  ${buildHead(head)}\n  </head>`);

    // Inject the rendered app markup into the root div.
    page = page.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    );

    // Write dist/<route>/index.html (dist/index.html for "/").
    const outPath =
      url === "/"
        ? join(distDir, "index.html")
        : join(distDir, url.replace(/^\//, ""), "index.html");
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, page, "utf8");
    console.log(`prerendered ${url} -> ${outPath.replace(distDir, "dist")}`);
  }

  // Regenerate sitemap.xml from the route list so it never goes stale.
  const SITE = "https://kalmafrica.co.za";
  const today = new Date().toISOString().slice(0, 10);
  const priority = (u) =>
    u === "/"
      ? "1.0"
      : u === "/privacy-policy" || u === "/terms"
      ? "0.3"
      : u.startsWith("/insights/")
      ? "0.6"
      : "0.8";
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    ROUTES.map(
      (u) =>
        `  <url>\n    <loc>${SITE}${u === "/" ? "/" : u}</loc>\n` +
        `    <lastmod>${today}</lastmod>\n` +
        `    <priority>${priority(u)}</priority>\n  </url>`
    ).join("\n") +
    `\n</urlset>\n`;
  writeFileSync(join(distDir, "sitemap.xml"), sitemap, "utf8");
  console.log("regenerated sitemap.xml");

  console.log(`\nPre-rendered ${ROUTES.length} routes.`);
}

main().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
