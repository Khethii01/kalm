import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import CtaBand from "../components/CtaBand";
import { PumaLogo } from "../components/Logo";
import { LUBRICANT_CATEGORIES, LUBE_GROUPS } from "../lubricants";
import { breadcrumbLd, serviceLd } from "../seo";

export default function Lubricants() {
  return (
    <>
      <Seo
        title="Puma Lubricants Supplier South Africa | KALM Group"
        description="KALM Group supplies the full Puma lubricants range in South Africa — heavy duty diesel engine oils, hydraulic oils, industrial and open gear oils, greases, marine lubricants and more for mining, transport and industry."
        path="/lubricants"
        keywords="Puma lubricants supplier South Africa, industrial lubricants supplier, hydraulic oil supplier mining, open gear lubricant supplier, heavy duty diesel engine oil South Africa, grease supplier South Africa"
        jsonLd={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Lubricants", path: "/lubricants" },
          ]),
          serviceLd({
            name: "Puma lubricants supply",
            description:
              "Supply of the Puma lubricants range — engine oils, transmission and gear oils, hydraulic oils, compressor oils, greases, open gear lubricants, turbine and marine lubricants — for mining, transport, construction and industrial customers in South Africa.",
            serviceType: "Lubricants supply",
          }),
        ]}
      />

      <PageHeader
        eyebrow="Lubricants"
        title="The full Puma lubricants range, supplied by KALM Group."
        intro="Beyond fuel, KALM Group supplies Puma lubricants for mining, transport, construction, industrial, marine and power-generation applications. Tell us your equipment and application and we will help you select the right product and provide a quote."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Lubricants" }]}
      />

      {/* Puma lubricants intro */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gap: "var(--space-7)",
              gridTemplateColumns: "1fr",
              alignItems: "center",
            }}
            className="puma-split"
          >
            <div>
              <span className="eyebrow">Designed in Switzerland</span>
              <h2>Premium lubricants for severe applications.</h2>
              <p className="lead" style={{ marginTop: "var(--space-5)" }}>
                Puma lubricants are designed in Switzerland using premium base
                oils and the latest additive technologies, formulated to perform
                in the most severe applications — mining, cement, transport,
                construction equipment, power generation and more.
              </p>
              <p
                style={{ marginTop: "var(--space-4)", color: "var(--text-muted)" }}
              >
                The range covers monograde, multigrade, semi-synthetic and fully
                synthetic products, meeting or exceeding leading automotive and
                industrial specifications and OEM approvals. Through our supply
                relationship with Puma Energy, KALM Group can supply these
                products to your operation.
              </p>
            </div>
            <div
              style={{
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-7)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PumaLogo height={96} />
            </div>
          </div>
        </div>
      </section>

      {/* Categories grouped */}
      {LUBE_GROUPS.map((group, gi) => {
        const items = LUBRICANT_CATEGORIES.filter((c) => c.group === group);
        return (
          <section
            key={group}
            className={`section ${gi % 2 === 0 ? "section--alt" : ""}`}
          >
            <div className="container">
              <div className="section-head">
                <span className="eyebrow">{group}</span>
                <h2>{group} lubricants</h2>
              </div>
              <div
                className="grid grid--3"
                style={{ marginTop: "var(--space-7)" }}
              >
                {items.map((c) => (
                  <div key={c.id} id={c.id} className="card">
                    <span className="card__icon">
                      <Icon name={c.icon} />
                    </span>
                    <h3>{c.name}</h3>
                    <p>{c.summary}</p>
                    <Link to="/request-a-quote" className="card__link">
                      Enquire about this range
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Technical data note */}
      <section className="section">
        <div className="container container--narrow">
          <p
            style={{
              padding: "var(--space-5)",
              borderLeft: "3px solid var(--slate)",
              background: "var(--cool-grey)",
              borderRadius: "var(--radius)",
              color: "var(--text-muted)",
              fontSize: "0.98rem",
            }}
          >
            Detailed technical data sheets — including viscosity grades, OEM
            approvals and full specifications — are available on request. Tell us
            your equipment, application and the specification you need, and we
            will provide the relevant product details and a quote.
          </p>
        </div>
      </section>

      <CtaBand
        title="Need the right lubricant for your equipment?"
        text="Share your application, equipment and volumes and we will help you select the correct Puma product and provide a quote."
        primaryLabel="Request a Quote"
        secondaryLabel="Contact us"
        secondaryTo="/contact"
      />
    </>
  );
}
