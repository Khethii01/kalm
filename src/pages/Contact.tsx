import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import { TextField, TextArea } from "../components/fields";
import { submitEnquiry, type SubmitResult } from "../lib/enquiries";
import { SITE } from "../site";
import "../components/Form.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
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
    if (!form.name.trim()) next.name = "Your name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
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
      const res = await submitEnquiry("general", form);
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
        title="Contact KALM Group | Commercial Fuel Supply Enquiries"
        description="Contact KALM Group (Pty) Ltd about commercial and bulk fuel supply enquiries. Email info@kalmafrica.co.za or send us a message."
        path="/contact"
      />

      <PageHeader
        eyebrow="Contact us"
        title="Let's talk about your fuel supply needs."
        intro="Reach KALM Group with a general enquiry, or jump straight to a fuel quote or supplier enquiry."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gap: "var(--space-8)",
              gridTemplateColumns: "1fr",
            }}
            className="contact-grid"
          >
            {/* Details + CTAs */}
            <div>
              <span className="eyebrow">Company details</span>
              <h2 style={{ marginBottom: "var(--space-5)" }}>
                {SITE.name}
              </h2>
              <ul className="stack" style={{ fontSize: "1.05rem" }}>
                <li style={{ display: "flex", gap: "var(--space-3)" }}>
                  <span style={{ color: "var(--slate)" }}>
                    <Icon name="shield" size={20} />
                  </span>
                  <span>
                    <strong>Registration number</strong>
                    <br />
                    {SITE.registrationNumber}
                  </span>
                </li>
                <li style={{ display: "flex", gap: "var(--space-3)" }}>
                  <span style={{ color: "var(--slate)" }}>
                    <Icon name="mail" size={20} />
                  </span>
                  <span>
                    <strong>Email</strong>
                    <br />
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </span>
                </li>
                <li style={{ display: "flex", gap: "var(--space-3)" }}>
                  <span style={{ color: "var(--slate)" }}>
                    <Icon name="arrow" size={20} />
                  </span>
                  <span>
                    <strong>Website</strong>
                    <br />
                    <a href={SITE.url} target="_blank" rel="noreferrer">
                      {SITE.url}
                    </a>
                  </span>
                </li>
                <li style={{ display: "flex", gap: "var(--space-3)" }}>
                  <span style={{ color: "var(--slate)" }}>
                    <Icon name="building" size={20} />
                  </span>
                  <span>
                    <strong>Location</strong>
                    <br />
                    {SITE.location}
                  </span>
                </li>
              </ul>

              <div
                className="grid grid--2"
                style={{ marginTop: "var(--space-7)" }}
              >
                <Link to="/request-a-quote" className="btn btn--primary">
                  Request a Fuel Quote
                </Link>
                <Link to="/supplier-enquiries" className="btn btn--secondary">
                  Supplier Enquiries
                </Link>
              </div>
            </div>

            {/* Form */}
            <div>
              {result ? (
                <div className="form-success">
                  <span className="form-success__icon">
                    <Icon name="check" size={30} />
                  </span>
                  <h3>Message received</h3>
                  <p
                    style={{
                      marginTop: "var(--space-3)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {result.channel === "api"
                      ? "Thank you for contacting KALM Group. We will respond as soon as we can."
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
                      style={{ marginBottom: "var(--space-5)" }}
                    >
                      {submitError}
                    </div>
                  )}
                  <form className="form" onSubmit={onSubmit} noValidate>
                    <fieldset
                      className="form__section"
                      style={{ border: undefined }}
                    >
                      <legend className="form__section-title">
                        General enquiry
                      </legend>
                      <p className="form__section-hint">
                        Send us a message and we will get back to you.
                      </p>
                      <div className="form__grid form__grid--2">
                        <TextField
                          id="name"
                          label="Your name"
                          required
                          value={form.name}
                          onChange={set("name")}
                          error={errors.name}
                          autoComplete="name"
                        />
                        <TextField
                          id="company"
                          label="Company"
                          optional
                          value={form.company}
                          onChange={set("company")}
                          autoComplete="organization"
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
                          label="Message"
                          required
                          value={form.message}
                          onChange={set("message")}
                          error={errors.message}
                        />
                      </div>
                    </fieldset>
                    <button
                      type="submit"
                      className="btn btn--primary btn--lg btn--block"
                      disabled={submitting}
                      aria-busy={submitting}
                    >
                      {submitting ? "Sending…" : "Send message"}
                    </button>
                    <p className="form__footnote">
                      Prefer email? Write to{" "}
                      <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
