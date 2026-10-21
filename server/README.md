# Enquiry handling

Form submissions (quote / supplier / general) are sent to `/api/enquiries` by
the website. How that endpoint behaves depends on where the site runs.

## Production on Vercel (what you're using)

In production the endpoint is a **Vercel serverless function** at
`api/enquiries.ts`. Vercel detects the `api/` folder automatically — there is
no separate server to deploy or keep running.

On each submission the function emails the enquiry to KALM Group via
[Resend](https://resend.com) and returns a reference number to the visitor.

### One-time setup

1. **Create a Resend account** at https://resend.com and add your domain
   `kalmafrica.co.za`.
2. **Verify the domain** by adding the DNS records Resend shows you (SPF/DKIM)
   at your domain registrar. This proves you own the domain so email doesn't
   land in spam. You'll be adding DNS records for the domain anyway.
3. **Create an API key** in Resend (starts with `re_`).
4. In the **Vercel dashboard** → your project → **Settings → Environment
   Variables**, add:

   | Name             | Value                                             | Required |
   | ---------------- | ------------------------------------------------- | -------- |
   | `RESEND_API_KEY` | your Resend key (`re_...`)                        | yes      |
   | `ENQUIRY_TO`     | where enquiries are sent (default `info@kalmafrica.co.za`) | no |
   | `ENQUIRY_FROM`   | verified sender, e.g. `KALM Group <enquiries@kalmafrica.co.za>` | no |

5. **Redeploy.** From then on, every enquiry is emailed to `ENQUIRY_TO`.

### Behaviour notes

- The visitor's email address is set as the **reply-to**, so you can reply to
  an enquiry directly from your inbox.
- Email is **best-effort**: the submission is always accepted and a reference
  returned, and if email delivery fails it is logged (visible in Vercel's
  function logs) rather than losing the enquiry. The visitor is never told an
  email was sent — only that the enquiry was received.
- If `RESEND_API_KEY` is missing, the endpoint still accepts submissions but no
  email goes out (and it logs a warning). So nothing breaks before you add the
  key — you just won't get emails yet.

## Local development

The Vercel function also runs locally with the Vercel CLI:

```bash
npm i -g vercel
vercel dev          # serves the site + /api function together
```

Create a `.env` (copy from `.env.example`) with `RESEND_API_KEY` to test real
emails locally, or leave it unset to test the flow without sending.

### Alternative: the standalone Node server

`server/index.mjs` is a zero-dependency Node server that stores submissions to
`server/data/enquiries.jsonl`. It predates the Vercel setup and is handy for
offline/local testing without the Vercel CLI:

```bash
npm run dev:full    # Vite + the local Node server, proxied at /api
```

It does **not** send email — it only writes to the JSONL file. Production on
Vercel uses `api/enquiries.ts` (with Resend), not this file.

## Want a database too?

Email alone is usually enough for enquiries. If you also want every enquiry
stored in a database (searchable, exportable), the cleanest fit alongside
Vercel is Supabase: create an `enquiries` table and add an insert call in
`api/enquiries.ts` next to the email send. Keep the service key in Vercel env
vars only — never in browser code. Say the word and I'll wire it in.
