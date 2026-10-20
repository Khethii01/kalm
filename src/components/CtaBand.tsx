import { Link } from "react-router-dom";

/** Reusable call-to-action band. Used site-wide to drive quote enquiries. */
export default function CtaBand({
  title = "Ready to discuss your fuel supply requirements?",
  text = "Tell us about your fuel type, volumes and delivery locations. We will review your enquiry and respond with the information we can provide.",
  primaryLabel = "Request a Fuel Quote",
  primaryTo = "/request-a-quote",
  secondaryLabel,
  secondaryTo,
}: {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}) {
  return (
    <section className="section section--dark">
      <div className="container">
        <div
          style={{
            display: "grid",
            gap: "var(--space-6)",
            alignItems: "center",
            gridTemplateColumns: "1fr",
          }}
        >
          <div className="section-head" style={{ maxWidth: 680 }}>
            <h2>{title}</h2>
            <p className="lead" style={{ marginTop: "var(--space-4)" }}>
              {text}
            </p>
          </div>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <Link to={primaryTo} className="btn btn--on-dark btn--lg">
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryTo && (
              <Link to={secondaryTo} className="btn btn--ghost-on-dark btn--lg">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
