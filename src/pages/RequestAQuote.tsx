import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import { TextField, TextArea, SelectField, ChoiceGroup } from "../components/fields";
import { submitEnquiry, type SubmitResult } from "../lib/enquiries";
import { INDUSTRIES } from "../data";
import { SITE } from "../site";
import "../components/Form.css";

type FormState = {
  companyName: string;
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  industry: string;
  fuelType: string;
  volume: string;
  frequencyType: string;
  supplyFrequency: string;
  deliveryTown: string;
  province: string;
  deliveryAddress: string;
  timeframe: string;
  comments: string;
  onboarding: string;
  existingRfq: string;
  creditTerms: string;
};

const EMPTY: FormState = {
  companyName: "",
  contactName: "",
  jobTitle: "",
  email: "",
  phone: "",
  industry: "",
  fuelType: "",
  volume: "",
  frequencyType: "",
  supplyFrequency: "",
  deliveryTown: "",
  province: "",
  deliveryAddress: "",
  timeframe: "",
  comments: "",
  onboarding: "",
  existingRfq: "",
  creditTerms: "",
};

const PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RequestAQuote() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.companyName.trim()) next.companyName = "Company name is required.";
    if (!form.contactName.trim())
      next.contactName = "Contact person's name is required.";
    if (!form.email.trim()) next.email = "Business email is required.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Telephone number is required.";
    if (!form.industry) next.industry = "Please select an industry.";
    if (!form.fuelType) next.fuelType = "Please select a fuel type.";
    if (!form.volume.trim())
      next.volume = "Please provide an estimated volume in litres.";
    else if (!/^\d[\d\s,]*$/.test(form.volume.trim()))
      next.volume = "Please enter a numeric volume (litres).";
    if (!form.frequencyType)
      next.frequencyType = "Please tell us if this is once-off or recurring.";
    if (!form.deliveryTown.trim())
      next.deliveryTown = "Delivery town is required.";
    if (!form.province) next.province = "Please select a province.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Move focus to the first invalid field for accessibility.
      const firstKey = Object.keys(next)[0];
      const el = document.getElementById(firstKey);
      el?.focus();
      el?.scrollIntoView({ block: "center" });
      return false;
    }
    return true;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (submitting) return;
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await submitEnquiry("quote", form);
      if (res.ok) {
        setResult(res);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitError(res.message);
      }
    } catch {
      setSubmitError(
        "Something went wrong submitting your enquiry. Please try again, or email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const industryOptions = INDUSTRIES.map((i) => ({
    value: i.id,
    label: i.name,
  }));

  if (result) {
    return (
      <>
        <Seo
          title="Enquiry Received | KALM Group"
          description="Thank you — your commercial fuel supply enquiry has been received by KALM Group."
          path="/request-a-quote"
        />
        <section className="section">
          <div className="container container--narrow">
            <div className="form-success">
              <span className="form-success__icon">
                <Icon name="check" size={30} />
              </span>
              <h1 style={{ fontSize: "2rem" }}>Thank you — enquiry received</h1>
              <p className="lead" style={{ marginTop: "var(--space-4)" }}>
                {result.channel === "api"
                  ? "We have received your commercial fuel supply enquiry and will review it against fuel type, volume, location, availability and prevailing commercial factors."
                  : result.message}
              </p>
              {result.reference && (
                <p style={{ marginTop: "var(--space-4)" }}>
                  Your reference:{" "}
                  <strong style={{ color: "var(--navy)" }}>
                    {result.reference}
                  </strong>
                </p>
              )}
              <p
                className="form__footnote"
                style={{ marginTop: "var(--space-5)" }}
              >
                You can also reach us directly at{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
              <div
                style={{
                  marginTop: "var(--space-6)",
                  display: "flex",
                  gap: "var(--space-4)",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link to="/" className="btn btn--primary">
                  Back to home
                </Link>
                <button
                  className="btn btn--secondary"
                  onClick={() => {
                    setForm(EMPTY);
                    setResult(null);
                  }}
                >
                  Submit another enquiry
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Request a Fuel Quote | KALM Group Commercial Fuel Supply"
        description="Request a commercial or bulk fuel quote from KALM Group. Tell us your fuel type, volume, delivery location and requirements and we will review your enquiry."
        path="/request-a-quote"
      />

      <PageHeader
        eyebrow="Request a fuel quote"
        title="Tell us about your fuel supply requirement."
        intro="Complete the form below. The more detail you provide, the more accurately we can review your enquiry. Fields marked with an asterisk are required."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Request a Quote" },
        ]}
      />

      <section className="section">
        <div className="container container--narrow">
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
            {/* Contact information */}
            <fieldset className="form__section" style={{ border: undefined }}>
              <legend className="form__section-title">Contact information</legend>
              <p className="form__section-hint">
                So we know who to respond to.
              </p>
              <div className="form__grid form__grid--2">
                <TextField
                  id="companyName"
                  label="Company name"
                  required
                  value={form.companyName}
                  onChange={set("companyName")}
                  error={errors.companyName}
                  autoComplete="organization"
                />
                <TextField
                  id="contactName"
                  label="Contact person's name"
                  required
                  value={form.contactName}
                  onChange={set("contactName")}
                  error={errors.contactName}
                  autoComplete="name"
                />
                <TextField
                  id="jobTitle"
                  label="Job title"
                  optional
                  value={form.jobTitle}
                  onChange={set("jobTitle")}
                  autoComplete="organization-title"
                />
                <TextField
                  id="email"
                  label="Business email"
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
                  required
                  value={form.phone}
                  onChange={set("phone")}
                  error={errors.phone}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
            </fieldset>

            {/* Fuel requirements */}
            <fieldset className="form__section" style={{ border: undefined }}>
              <legend className="form__section-title">Fuel requirements</legend>
              <p className="form__section-hint">
                Help us understand what you need and where.
              </p>
              <div className="form__grid form__grid--2">
                <SelectField
                  id="industry"
                  label="Industry"
                  required
                  value={form.industry}
                  onChange={set("industry")}
                  options={industryOptions}
                  error={errors.industry}
                />
                <TextField
                  id="volume"
                  label="Estimated volume (litres)"
                  required
                  value={form.volume}
                  onChange={set("volume")}
                  error={errors.volume}
                  inputMode="numeric"
                  placeholder="e.g. 20000"
                />
              </div>

              <div style={{ marginTop: "var(--space-5)" }}>
                <ChoiceGroup
                  legend="Fuel type"
                  name="fuelType"
                  required
                  value={form.fuelType}
                  onChange={set("fuelType")}
                  error={errors.fuelType}
                  options={[
                    { value: "diesel", label: "Diesel" },
                    { value: "petrol", label: "Petrol" },
                    { value: "both", label: "Both" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </div>

              <div style={{ marginTop: "var(--space-5)" }}>
                <ChoiceGroup
                  legend="Is this a once-off or recurring requirement?"
                  name="frequencyType"
                  required
                  value={form.frequencyType}
                  onChange={set("frequencyType")}
                  error={errors.frequencyType}
                  options={[
                    { value: "once-off", label: "Once-off" },
                    { value: "recurring", label: "Recurring" },
                  ]}
                />
              </div>

              <div
                className="form__grid form__grid--2"
                style={{ marginTop: "var(--space-5)" }}
              >
                <TextField
                  id="supplyFrequency"
                  label="Expected supply frequency"
                  optional
                  value={form.supplyFrequency}
                  onChange={set("supplyFrequency")}
                  placeholder="e.g. weekly, monthly"
                />
                <TextField
                  id="timeframe"
                  label="Desired delivery timeframe"
                  optional
                  value={form.timeframe}
                  onChange={set("timeframe")}
                  placeholder="e.g. within 2 weeks"
                />
                <TextField
                  id="deliveryTown"
                  label="Delivery town"
                  required
                  value={form.deliveryTown}
                  onChange={set("deliveryTown")}
                  error={errors.deliveryTown}
                />
                <SelectField
                  id="province"
                  label="Province"
                  required
                  value={form.province}
                  onChange={set("province")}
                  error={errors.province}
                  options={PROVINCES.map((p) => ({ value: p, label: p }))}
                />
                <TextField
                  id="deliveryAddress"
                  label="Delivery site or address, if known"
                  optional
                  full
                  value={form.deliveryAddress}
                  onChange={set("deliveryAddress")}
                />
              </div>

              <div style={{ marginTop: "var(--space-4)" }}>
                <TextArea
                  id="comments"
                  label="Additional comments"
                  optional
                  value={form.comments}
                  onChange={set("comments")}
                  placeholder="Anything else that would help us review your enquiry."
                />
              </div>
            </fieldset>

            {/* Additional commercial questions */}
            <fieldset className="form__section" style={{ border: undefined }}>
              <legend className="form__section-title">
                Additional commercial questions
              </legend>
              <p className="form__section-hint">
                Optional, but useful for a faster, more relevant response.
              </p>
              <div className="stack">
                <ChoiceGroup
                  legend="Do you require supplier onboarding?"
                  name="onboarding"
                  value={form.onboarding}
                  onChange={set("onboarding")}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                    { value: "unsure", label: "Not sure" },
                  ]}
                />
                <ChoiceGroup
                  legend="Is there an existing RFQ or tender document?"
                  name="existingRfq"
                  value={form.existingRfq}
                  onChange={set("existingRfq")}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <ChoiceGroup
                  legend="Would you like to discuss credit terms?"
                  name="creditTerms"
                  value={form.creditTerms}
                  onChange={set("creditTerms")}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>
            </fieldset>

            <div>
              <button
                type="submit"
                className="btn btn--primary btn--lg btn--block"
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? "Submitting…" : "Submit fuel quote request"}
              </button>
              <p className="form__footnote" style={{ marginTop: "var(--space-4)" }}>
                Submitting a quotation request does not constitute an accepted
                order or a guarantee of supply. By submitting, you agree to our{" "}
                <Link to="/privacy-policy">Privacy Policy</Link>.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
