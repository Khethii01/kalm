import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import CtaBand from "../components/CtaBand";
import { SOLUTIONS } from "../data";

const FACTORS = [
  "Fuel type",
  "Volume",
  "Delivery location",
  "Prevailing pricing",
  "Product availability",
  "Agreed terms",
];

export default function FuelSupplySolutions() {
  return (
    <>
      <Seo
        title="Fuel Supply Solutions | Bulk Diesel & Commercial Fuel | KALM Group"
        description="Commercial diesel and bulk fuel supply enquiries for South African businesses — recurring supply, once-off orders and customer-specific fuel quotation requests."
        path="/fuel-supply-solutions"
      />

      <PageHeader
        eyebrow="Fuel supply solutions"
        title="Commercial fuel supply enquiries, handled seriously."
        intro="KALM Group accepts a range of commercial fuel supply enquiries. Every requirement is reviewed against the factors that shape a quotation — there are no fixed prices or guarantees published here."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Fuel Supply Solutions" },
        ]}
      />

      {/* Solutions grid */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we accept</span>
            <h2>The enquiries we are set up to review.</h2>
          </div>
          <div className="grid grid--3" style={{ marginTop: "var(--space-7)" }}>
            {SOLUTIONS.map((sol) => (
              <div key={sol.id} id={sol.id} className="card">
                <span className="card__icon">
                  <Icon name={sol.icon} />
                </span>
                <h3>{sol.title}</h3>
                <p>{sol.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How quotations are determined */}
      <section className="section section--alt">
        <div className="container">
          <div
            style={{
              display: "grid",
              gap: "var(--space-8)",
              gridTemplateColumns: "1fr",
            }}
          >
            <div className="section-head" style={{ maxWidth: 720 }}>
              <span className="eyebrow">How quotations work</span>
              <h2>What determines a fuel quotation.</h2>
              <p className="lead" style={{ marginTop: "var(--space-5)" }}>
                Quotations depend on a combination of factors. We review each
                enquiry against these before responding, and we will tell you
                what still needs to be confirmed.
              </p>
            </div>

            <ul
              className="grid grid--3"
              style={{ gap: "var(--space-4)" }}
              aria-label="Factors that determine a quotation"
            >
              {FACTORS.map((f) => (
                <li
                  key={f}
                  className="card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    padding: "var(--space-5)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--navy)",
                      display: "inline-flex",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="check" size={20} />
                  </span>
                  <span style={{ fontWeight: 600, color: "var(--navy)" }}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="container" style={{ padding: 0 }}>
            <p
              style={{
                marginTop: "var(--space-7)",
                padding: "var(--space-5)",
                borderLeft: "3px solid var(--slate)",
                background: "var(--white)",
                borderRadius: "var(--radius)",
                color: "var(--text-muted)",
                fontSize: "0.98rem",
              }}
            >
              Please note: we do not publish prices, discounts, minimum order
              quantities, delivery guarantees, credit terms or delivery times on
              this website. These are confirmed only through a direct commercial
              enquiry and are subject to availability and agreed terms.
            </p>
          </div>
        </div>
      </section>

      {/* Prominent quote CTA */}
      <section className="section">
        <div className="container container--narrow text-center">
          <h2>Have a specific requirement in mind?</h2>
          <p className="lead" style={{ marginTop: "var(--space-4)" }}>
            Send us the details and we will review your enquiry.
          </p>
          <Link
            to="/request-a-quote"
            className="btn btn--primary btn--lg"
            style={{ marginTop: "var(--space-6)" }}
          >
            Request a Fuel Quote
          </Link>
        </div>
      </section>

      <CtaBand
        title="Not sure which category fits?"
        text="Tell us what you need and we will point your enquiry in the right direction."
        secondaryLabel="Contact us"
        secondaryTo="/contact"
      />
    </>
  );
}
