import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import { TextField, TextArea } from "../components/fields";
import { submitEnquiry, type SubmitResult } from "../lib/enquiries";
import { SITE } from "../site";
import "../components/Form.css";

const DOCS = [
  "Company registration documents",
  "Tax compliance information",
  "B-BBEE certificate or affidavit, where applicable",
  "Banking confirmation",
  "Relevant licences or authorisations",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SupplierEnquiries() {
  const [form, setForm] = useState({
    organisation: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  function validate() {
    const next: Record<string, string> = {};
    if (!form.organisation.trim())
      next.organisation = "Organisation name is required.";
    if (!form.contactName.trim())
      next.contactName = "Contact name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.message.trim())
      next.message = "Please tell us about your enquiry.";
    setErrors(next);
    if (Object.keys(next).length) {
      const el = document.getElementById(Object.keys(next)[0]);
      el?.focus();
      return false;
    }
    return true;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (submitting || !validate()) return;
    setSubmitting(true);
    try {
      const res = await submitEnquiry("supplier", form);
      setResult(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("Something went wrong. Please try again or email us.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Seo
        title="Supplier Enquiries & Onboarding | KALM Group"
        description="Procurement teams and businesses can enquire about supplier registration, onboarding and supporting documentation with KALM Group."
        path="/supplier-enquiries"
      />

      <PageHeader
        eyebrow="Supplier enquiries"
        title="For procurement teams and supplier onboarding."
        intro="KALM Group engages with procurement departments and businesses interested in onboarding suppliers. Let us know what you need and we will respond with the information and documentation we can provide."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Supplier Enquiries" },
        ]}
      />

      {/* Intro + onboarding */}
      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            <div className="card">
              <span className="card__icon">
                <Icon name="handshake" />
              </span>
              <h3>Supplier registration &amp; onboarding</h3>
              <p>
                If your organisation requires KALM Group to complete a supplier
                registration or onboarding process, tell us about the process
                and we will work through your requirements.
              </p>
            </div>
            <div className="card">
              <span className="card__icon">
                <Icon name="doc" />
              </span>
              <h3>Company profile access</h3>
              <p>
                A company profile can be shared once a finalised document is
                available. Request access and we will provide what we can.
              </p>
            </div>
            <div className="card">
              <span className="card__icon">
                <Icon name="shield" />
              </span>
              <h3>Supporting documentation</h3>
              <p>
                Supporting documents can be provided where available and
                applicable to your enquiry. We do not display documents we have
                not yet been provided.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documents list */}
      <section className="section section--alt">
        <div className="container container--narrow">
          <div className="section-head">
            <span className="eyebrow">Documentation</span>
            <h2>Documents that may be provided</h2>
            <p>
              Depending on your requirements and availability, supporting
              documents may include the following. These are provided on request
              where applicable — nothing here is a claim of current compliance
              status.
            </p>
          </div>
          <ul className="stack" style={{ marginTop: "var(--space-6)" }}>
            {DOCS.map((d) => (
              <li
                key={d}
                style={{
                  display: "flex",
                  gap: "var(--space-3)",
                  alignItems: "flex-start",
                  padding: "var(--space-3) 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ color: "var(--navy)", flexShrink: 0 }}>
                  <Icon name="check" size={20} />
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form */}
      <section className="section">
        <div className="container container--narrow">
          <div className="section-head">
            <span className="eyebrow">Get in touch</span>
            <h2>Supplier enquiry form</h2>
          </div>

          {result ? (
            <div
              className="form-success"
              style={{ marginTop: "var(--space-6)" }}
            >
              <span className="form-success__icon">
                <Icon name="check" size={30} />
              </span>
              <h3>Thank you — enquiry received</h3>
              <p style={{ marginTop: "var(--space-3)", color: "var(--text-muted)" }}>
                {result.channel === "api"
                  ? "We have received your supplier enquiry and will respond with the information and documentation we can provide."
                  : result.message}
              </p>
              {result.reference && (
                <p style={{ marginTop: "var(--space-3)" }}>
                  Reference:{" "}
                  <strong style={{ color: "var(--navy)" }}>
                    {result.reference}
                  </strong>
                </p>
              )}
            </div>
          ) : (
            <>
              {submitError && (
                <div
                  className="form__banner form__banner--error"
                  role="alert"
                  style={{ margin: "var(--space-5) 0" }}
                >
                  {submitError}
                </div>
              )}
              <form
                className="form"
                onSubmit={onSubmit}
                noValidate
                style={{ marginTop: "var(--space-6)" }}
              >
                <fieldset
                  className="form__section"
                  style={{ border: undefined }}
                >
                  <div className="form__grid form__grid--2">
                    <TextField
                      id="organisation"
                      label="Organisation name"
                      required
                      value={form.organisation}
                      onChange={set("organisation")}
                      error={errors.organisation}
                      autoComplete="organization"
                    />
                    <TextField
                      id="contactName"
                      label="Contact name"
                      required
                      value={form.contactName}
                      onChange={set("contactName")}
                      error={errors.contactName}
                      autoComplete="name"
                    />
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      error={errors.email}
                      autoComplete="email"
                      inputMode="email"
                    />
                    <TextField
                      id="phone"
                      label="Telephone number"
                      type="tel"
                      optional
                      value={form.phone}
                      onChange={set("phone")}
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>
                  <div style={{ marginTop: "var(--space-4)" }}>
                    <TextArea
                      id="message"
                      label="Your enquiry"
                      required
                      value={form.message}
                      onChange={set("message")}
                      error={errors.message}
                      placeholder="Tell us about your onboarding process, the documents you need, or your supplier registration requirements."
                    />
                  </div>
                </fieldset>
                <button
                  type="submit"
                  className="btn btn--primary btn--lg btn--block"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? "Submitting…" : "Submit supplier enquiry"}
                </button>
                <p className="form__footnote">
                  You can also email us at{" "}
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      <section className="section section--dark section--tight">
        <div className="container text-center">
          <h2>Looking for a fuel quote instead?</h2>
          <p className="lead" style={{ marginTop: "var(--space-4)" }}>
            If your enquiry is about buying fuel, our quote form is the fastest
            route.
          </p>
          <Link
            to="/request-a-quote"
            className="btn btn--on-dark btn--lg"
            style={{ marginTop: "var(--space-5)" }}
          >
            Request a Fuel Quote
          </Link>
        </div>
      </section>
    </>
  );
}
