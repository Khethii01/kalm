# KALM enquiry API

A minimal, dependency-free Node server that receives form submissions from the
website and stores them to `server/data/enquiries.jsonl`. This makes the quote,
supplier and contact forms genuinely persist data without any setup.

## Run it

```bash
npm run server        # starts the API on http://localhost:8787
```

During development, `npm run dev` proxies `/api/*` to this server automatically
(see `vite.config.ts`). You can run both at once with:

```bash
npm run dev:full
```

Submitted enquiries are appended as one JSON object per line to
`server/data/enquiries.jsonl`.

## Honest status of email + database

- **Database:** submissions are stored to a local JSONL file. This is real
  persistence suitable for development and small volumes. For production, swap
  in Supabase (or Lovable Cloud) — see the `TODO: Supabase integration` block in
  `server/index.mjs`.
- **Email:** no email is sent. The UI does **not** claim an email was delivered.
  To notify `info@kalmafrica.co.za`, wire up a provider (Resend, Amazon SES, or
  SMTP via nodemailer) in the `TODO: Email notification` block. Keep all API
  keys and SMTP credentials in server-side environment variables only — never in
  browser code.

## Upgrading to Supabase (outline)

1. Create a Supabase project and an `enquiries` table with columns matching the
   stored record (`reference`, `type`, `received_at`, `data jsonb`).
2. Enable Row Level Security and restrict read access to authorised admins.
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as server environment
   variables.
4. Uncomment the Supabase block in `server/index.mjs`.

The frontend never needs the service-role key — it only ever POSTs to `/api`.
```
