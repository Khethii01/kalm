# KALM Group (Pty) Ltd — Corporate Website

A premium, multi-page corporate website for **KALM Group (Pty) Ltd**, a South
African business focused on commercial and bulk fuel supply.

Built with **Vite + React + TypeScript + React Router**. Every main navigation
item is a genuine route with its own URL, content and metadata — this is **not**
a single-page scroll site.

---

## Quick start

```bash
npm install          # install dependencies
npm run dev:full     # run the site + enquiry API together
# then open the printed localhost URL
```

Other scripts:

| Script              | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Vite dev server only (proxies `/api` to the API)     |
| `npm run server`    | Enquiry API only (http://localhost:8787)             |
| `npm run dev:full`  | Both together (recommended for testing the forms)    |
| `npm run build`     | Type-check + production build into `dist/`           |
| `npm run preview`   | Serve the production build locally                   |
| `npm run typecheck` | Type-check without emitting                          |

---

## Pages & routes

| Route                      | Page                   |
| -------------------------- | ---------------------- |
| `/`                        | Home                   |
| `/about`                   | About Us               |
| `/fuel-supply-solutions`   | Fuel Supply Solutions  |
| `/industries`              | Industries We Serve    |
| `/request-a-quote`         | Request a Fuel Quote   |
| `/supplier-enquiries`      | Supplier Enquiries     |
| `/contact`                 | Contact Us             |
| `/privacy-policy`          | Privacy Policy         |
| `/terms`                   | Terms & Conditions     |
| `*`                        | 404 Not Found          |

Each page sets its own `<title>`, meta description, canonical URL and Open Graph
tags via the lightweight `Seo` component. A `sitemap.xml` and `robots.txt` live
in `public/`.

---

## Brand & logos — ACTION REQUIRED

The design follows the KALM logo: **deep navy (#172A3B)** dominant, slate
blue-grey (#8998A7) accents, white and cool grey (#F3F5F7) backgrounds, charcoal
(#26323D) body text.

The supplied logo image files must be placed here (see
`public/logos/README.md`):

```
public/logos/kalm-logo.png     ← primary KALM GROUP lockup
public/logos/puma-energy.png   ← Puma Energy partner logo (original colours)
```

Until these files exist, the site shows an **accessible text + mark fallback**
so nothing looks broken. Drop the real files in with those exact names and they
appear automatically — no code changes needed. The logos are never redrawn,
recoloured or distorted by this project.

---

## Honest status of forms, database & email

The quote, supplier and contact forms are fully functional:

- **Validation** — required fields, email format, numeric volume, with inline
  errors and focus management.
- **Persistence** — submissions POST to the enquiry API, which stores them to
  `server/data/enquiries.jsonl` (real persistence, no faking).
- **Confirmation** — a clear success state with a reference number.
- **Error handling** — network failures fall back to saving the enquiry in the
  browser, and the UI says so honestly.
- **Duplicate prevention** — best-effort client-side de-duplication.

What is **not** yet wired (by design — nothing is faked):

- **Email notifications.** No email is sent and the UI never claims one was.
  To notify `info@kalmafrica.co.za`, add a provider (Resend / SES / SMTP) in the
  marked `TODO` block in `server/index.mjs`. Keep credentials server-side only.
- **Hosted database.** For production, swap the file store for Supabase or
  Lovable Cloud (see `server/README.md` and the `TODO` block). The frontend only
  ever POSTs to `/api` and never holds any service-role key.

---

## Deployment & domain (`kalmafrica.co.za`)

Canonical URLs and metadata are already configured for
`https://kalmafrica.co.za`.

This is a single-page-app build, so the host must serve `index.html` for all
routes (so deep links and refreshes work). Config is provided for common hosts:

- **Netlify** — `public/_redirects` is included.
- **Vercel** — `vercel.json` is included.
- Other hosts: add an equivalent SPA fallback rule.

**DNS is not connected automatically.** To go live on `kalmafrica.co.za` you
(or your host) still need to:

1. Deploy the `dist/` build (plus the enquiry API, or a serverless equivalent).
2. Point the domain's DNS records at your host per their instructions.
3. Enable HTTPS for the domain.

---

## Accessibility & performance

- Semantic HTML, labelled form fields, `aria-invalid`/`role="alert"` on errors.
- Skip-to-content link, visible focus states, keyboard-operable navigation.
- Respects `prefers-reduced-motion`.
- Descriptive `alt` text on all imagery, with a branded fallback if a photo
  fails to load.
- Lazy-loaded images and a small, dependency-light bundle.

---

## Project structure

```
public/            robots.txt, sitemap.xml, favicon, logos/
server/            zero-dependency enquiry API + docs
src/
  components/      Navbar, Footer, Layout, Seo, Logo, forms, icons, CTA…
  pages/           one file per route
  lib/             enquiry submission service
  styles/          global design system
  data.tsx         industries, solutions, process steps
  site.ts          verified company facts (single source of truth)
```

All company facts (name, registration number `2026 / 160149 / 07`, domain,
`info@kalmafrica.co.za`) live in `src/site.ts`. No phone numbers, addresses,
customer lists or company history are invented anywhere in the site.
