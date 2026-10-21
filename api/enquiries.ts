/**
 * Vercel serverless function — POST /api/enquiries
 *
 * Receives a form submission from the website and emails it to KALM Group via
 * Resend (https://resend.com). No standalone server is required on Vercel;
 * this file is detected and deployed automatically.
 *
 * Environment variables (set these in the Vercel dashboard, Project → Settings
 * → Environment Variables — never commit them):
 *   RESEND_API_KEY    (required)  Your Resend API key, e.g. re_xxx
 *   ENQUIRY_TO        (optional)  Recipient. Defaults to info@kalmafrica.co.za
 *   ENQUIRY_FROM      (optional)  Verified sender on your domain.
 *                                 Defaults to "KALM Group <enquiries@kalmafrica.co.za>"
 *
 * If RESEND_API_KEY is not set, the function still accepts the submission and
 * returns a reference, but logs that email was not sent — it never pretends an
 * email was delivered.
 */

export const config = { runtime: "nodejs" };

type EnquiryType = "quote" | "general" | "supplier";
const VALID_TYPES = new Set<EnquiryType>(["quote", "general", "supplier"]);

const TO = process.env.ENQUIRY_TO || "info@kalmafrica.co.za";
const FROM = process.env.ENQUIRY_FROM || "KALM Group <enquiries@kalmafrica.co.za>";

const SUBJECTS: Record<EnquiryType, string> = {
  quote: "New fuel quote request",
  supplier: "New supplier enquiry",
  general: "New general enquiry",
};

/** Human-friendly labels for the known form fields. */
const LABELS: Record<string, string> = {
  companyName: "Company name",
  contactName: "Contact person",
  jobTitle: "Job title",
  email: "Email",
  phone: "Telephone",
  industry: "Industry",
  fuelType: "Fuel type",
  volume: "Estimated volume (litres)",
  frequencyType: "Once-off or recurring",
  supplyFrequency: "Supply frequency",
  deliveryTown: "Delivery town",
  province: "Province",
  deliveryAddress: "Delivery site / address",
  timeframe: "Delivery timeframe",
  comments: "Additional comments",
  onboarding: "Requires supplier onboarding",
  existingRfq: "Existing RFQ / tender",
  creditTerms: "Discuss credit terms",
  organisation: "Organisation",
  message: "Message",
  name: "Name",
  company: "Company",
};

function reference(): string {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `KALM-${stamp}-${rand}`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function clean(v: unknown): string {
  return String(v ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, 2000);
}

function buildEmail(
  type: EnquiryType,
  ref: string,
  data: Record<string, string>
): { subject: string; html: string; text: string } {
  const rows = Object.entries(data)
    .filter(([k]) => k !== "type" && k !== "submittedAt")
    .filter(([, v]) => v !== "");

  const subject = `${SUBJECTS[type]} — ${ref}`;

  const htmlRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#5a6872;font:600 13px sans-serif;white-space:nowrap;vertical-align:top">${esc(
          LABELS[k] || k
        )}</td><td style="padding:6px 12px;font:14px sans-serif;color:#26323d">${esc(
          v
        ).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  const html = `<div style="max-width:640px;margin:auto;font-family:sans-serif">
    <div style="background:#172A3B;color:#fff;padding:20px 24px;border-radius:8px 8px 0 0">
      <div style="font:600 18px sans-serif">${esc(SUBJECTS[type])}</div>
      <div style="font:13px sans-serif;color:#9fb0bd;margin-top:4px">Reference ${esc(
        ref
      )}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e6eaee;border-top:0;border-radius:0 0 8px 8px">
      ${htmlRows}
    </table>
    <p style="font:12px sans-serif;color:#8998a7;margin-top:16px">
      Submitted via kalmafrica.co.za on ${esc(data.submittedAt || new Date().toISOString())}.
    </p>
  </div>`;

  const text =
    `${SUBJECTS[type]} — ${ref}\n\n` +
    rows.map(([k, v]) => `${LABELS[k] || k}: ${v}`).join("\n");

  return { subject, html, text };
}

async function sendEmail(
  args: { subject: string; html: string; text: string; idempotencyKey: string },
  replyTo?: string
): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[enquiries] RESEND_API_KEY not set — email not sent.");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        // Prevents a duplicate email if the same enquiry is retried.
        "Idempotency-Key": args.idempotencyKey,
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: args.subject,
        html: args.html,
        text: args.text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[enquiries] Resend error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[enquiries] Resend request failed:", err);
    return false;
  }
}

// Minimal request/response typing so we don't need @vercel/node as a dep.
type Req = {
  method?: string;
  body?: unknown;
  on?: (event: string, cb: (chunk?: unknown) => void) => void;
};
type Res = {
  status: (code: number) => Res;
  setHeader: (k: string, v: string) => void;
  json: (body: unknown) => void;
  end: () => void;
};

async function readBody(req: Req): Promise<Record<string, unknown>> {
  // Vercel usually parses JSON into req.body; fall back to reading the stream.
  if (req.body && typeof req.body === "object") {
    return req.body as Record<string, unknown>;
  }
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    if (!req.on) return resolve({});
    req.on("data", (c) => chunks.push(c as Buffer));
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        resolve({});
      }
    });
  });
}

export default async function handler(req: Req, res: Res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed." });
    return;
  }

  const raw = await readBody(req);
  const type = String(raw.type || "") as EnquiryType;
  if (!VALID_TYPES.has(type)) {
    res.status(400).json({ ok: false, error: "Invalid enquiry type." });
    return;
  }

  // Sanitise all fields.
  const data: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (k === "type") continue;
    data[clean(k).slice(0, 60)] = clean(v);
  }

  const ref = reference();
  const email = buildEmail(type, ref, data);
  const emailed = await sendEmail(
    { ...email, idempotencyKey: ref },
    data.email || undefined
  );

  // The submission is always accepted. Email delivery is best-effort; if it
  // fails, the reference is still returned and the failure is logged so it can
  // be investigated. (The submitter is not told an email was sent.)
  res.status(201).json({ ok: true, reference: ref, emailed });
}
