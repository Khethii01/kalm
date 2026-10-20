/**
 * KALM Group — minimal enquiry API (zero dependencies).
 *
 * Stores submitted enquiries to server/data/enquiries.jsonl so the quote,
 * supplier and contact forms genuinely persist data out-of-the-box.
 *
 * This is intentionally simple and self-contained. For production you should
 * swap the storage layer for Supabase (or Lovable Cloud) and add an email
 * notification integration — see server/README.md for exactly how, and the
 * marked TODO blocks below for where.
 *
 * Secrets note: never place service-role keys or SMTP credentials in frontend
 * code. They belong in environment variables read only here, on the server.
 */
import { createServer } from "node:http";
import { appendFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "data");
const DATA_FILE = join(DATA_DIR, "enquiries.jsonl");
const PORT = process.env.ENQUIRY_API_PORT || 8787;

const VALID_TYPES = new Set(["quote", "general", "supplier"]);
const MAX_BODY = 64 * 1024; // 64 KB cap

function reference() {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `KALM-${stamp}-${rand}`;
}

function sanitiseString(v) {
  if (typeof v !== "string") return "";
  // Trim and strip control chars; cap length.
  return v.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, 2000);
}

function sanitisePayload(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (k === "type" || k === "submittedAt") continue;
    out[sanitiseString(k).slice(0, 60)] = sanitiseString(String(v ?? ""));
  }
  return out;
}

function send(res, status, body) {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(json);
}

async function saveEnquiry(record) {
  if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true });
  await appendFile(DATA_FILE, JSON.stringify(record) + "\n", "utf8");

  // --- TODO: Supabase integration -------------------------------------
  // import { createClient } from "@supabase/supabase-js";
  // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  // await supabase.from("enquiries").insert(record);
  // --------------------------------------------------------------------

  // --- TODO: Email notification ---------------------------------------
  // Use a provider (e.g. Resend / SES / SMTP via nodemailer) to notify
  // info@kalmafrica.co.za. Do NOT claim an email was sent unless this is
  // configured and tested. Keep credentials in env vars only.
  // --------------------------------------------------------------------
}

const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") return send(res, 204, {});

  if (req.method === "GET" && req.url === "/api/health") {
    return send(res, 200, { ok: true, service: "kalm-enquiry-api" });
  }

  if (req.method === "POST" && req.url === "/api/enquiries") {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_BODY) req.destroy();
      else chunks.push(c);
    });
    req.on("end", async () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        const parsed = JSON.parse(raw);
        const type = String(parsed.type || "");
        if (!VALID_TYPES.has(type)) {
          return send(res, 400, { ok: false, error: "Invalid enquiry type." });
        }
        const record = {
          reference: reference(),
          type,
          receivedAt: new Date().toISOString(),
          ip:
            req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() ||
            req.socket.remoteAddress ||
            null,
          data: sanitisePayload(parsed),
        };
        await saveEnquiry(record);
        return send(res, 201, { ok: true, reference: record.reference });
      } catch {
        return send(res, 400, { ok: false, error: "Malformed request." });
      }
    });
    return;
  }

  send(res, 404, { ok: false, error: "Not found." });
});

server.listen(PORT, () => {
  console.log(`KALM enquiry API listening on http://localhost:${PORT}`);
  console.log(`Enquiries are stored in ${DATA_FILE}`);
});
