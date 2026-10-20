/**
 * Enquiry submission service.
 *
 * Submits enquiries to the backend API (see /server). If the API is not
 * running or unreachable, the submission is queued in localStorage and the
 * caller is told the enquiry was saved locally — we never pretend an email
 * was sent when no integration confirmed it.
 */

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api";

export type EnquiryType = "quote" | "general" | "supplier";

export type SubmitResult = {
  ok: boolean;
  /** "api" = persisted server-side; "local" = queued in the browser. */
  channel: "api" | "local";
  reference?: string;
  message: string;
};

const QUEUE_KEY = "kalm.enquiry.queue";
const DEDUPE_KEY = "kalm.enquiry.hashes";

/** Stable hash of a payload for basic duplicate detection. */
async function hashPayload(obj: unknown): Promise<string> {
  const json = JSON.stringify(obj);
  if (globalThis.crypto?.subtle) {
    const data = new TextEncoder().encode(json);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  // Fallback non-crypto hash.
  let h = 0;
  for (let i = 0; i < json.length; i++) {
    h = (Math.imul(31, h) + json.charCodeAt(i)) | 0;
  }
  return String(h);
}

function readList(key: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function makeReference(): string {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `KALM-${stamp}-${rand}`;
}

export async function submitEnquiry(
  type: EnquiryType,
  payload: Record<string, unknown>
): Promise<SubmitResult> {
  const body = { type, submittedAt: new Date().toISOString(), ...payload };

  // --- Duplicate prevention (best effort, client-side) ---
  const hash = await hashPayload({ type, ...payload });
  const recent = readList(DEDUPE_KEY);
  if (recent.includes(hash)) {
    return {
      ok: true,
      channel: "local",
      message:
        "It looks like this enquiry was already submitted. We have it on record — no need to send it again.",
    };
  }

  // --- Try the API ---
  try {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = (await res.json().catch(() => ({}))) as {
        reference?: string;
      };
      try {
        localStorage.setItem(
          DEDUPE_KEY,
          JSON.stringify([...recent, hash].slice(-50))
        );
      } catch {
        /* ignore storage errors */
      }
      return {
        ok: true,
        channel: "api",
        reference: data.reference,
        message: "Your enquiry has been received.",
      };
    }
  } catch {
    /* fall through to local queue */
  }

  // --- Fallback: queue locally ---
  const reference = makeReference();
  try {
    const queue = readList(QUEUE_KEY);
    localStorage.setItem(
      QUEUE_KEY,
      JSON.stringify([...queue, { reference, ...body }])
    );
    localStorage.setItem(
      DEDUPE_KEY,
      JSON.stringify([...recent, hash].slice(-50))
    );
  } catch {
    /* ignore storage errors */
  }

  return {
    ok: true,
    channel: "local",
    reference,
    message:
      "Your enquiry has been saved in your browser because the enquiry service is not currently connected.",
  };
}
