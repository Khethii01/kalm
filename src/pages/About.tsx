import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";
import Icon from "../components/Icon";
import { PumaLogo } from "../components/Logo";
import { SITE } from "../site";
import { INDUSTRIES } from "../data";

export default function About() {
  return (
    <>
      <Seo
        title="About KALM Group | Commercial Fuel Supply Business"
        description="KALM Group (Pty) Ltd is a South African business focused on commercial fuel supply opportunities, working with businesses to develop suitable, long-term supply relationships."
        path="/about"
      />

      <PageHeader
        eyebrow="About us"
        title="A commercial fuel supply business built on clear relationships."
        intro="KALM Group (Pty) Ltd is a South African business focused on commercial fuel supply opportunities. We engage with businesses to understand their fuel requirements, operating locations and purchasing needs, with the aim of developing suitable, long-term supply relationships."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />

      {/* Introduction */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gap: "var(--space-8)",
              gridTemplateColumns: "1fr",
            }}
            className="about-split"
          >
            <div className="section-head" style={{ maxWidth: 760 }}>
              <span className="eyebrow">Our focus</span>
              <h2>Understanding the requirement before anything else.</h2>
              <p className="lead" style={{ marginTop: "var(--space-5)" }}>
                We work with commercial customers to understand what they need,
                where they operate and how they buy. That understanding is the
                foundation for a supply relationship that holds up over time.
              </p>
              <p style={{ marginTop: "var(--space-4)", color: "var(--text-muted)" }}>
                Our objective is straightforward: engage seriously with genuine
                commercial fuel enquiries, be clear about what we can and cannot
                confirm, and build supply relationships that are practical and
                durable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business focus & objectives + approach */}
      <section className="section section--alt">
        <div className="container">
          <div className="grid grid--3">
            <div className="card">
              <span className="card__icon">
                <Icon name="fuel" />
              </span>
              <h3>Business focus &amp; objectives</h3>
              <p>
                Commercial and bulk fuel supply enquiries across mining,
                transport, construction and industry — with the aim of
                developing suitable, long-term supply relationships.
              </p>
            </div>
            <div className="card">
              <span className="card__icon">
                <Icon name="handshake" />
              </span>
              <h3>Our approach to relationships</h3>
              <p>
                We listen first. By understanding operating locations, volumes
                and purchasing needs, we can explore arrangements that genuinely
                fit how a business runs.
              </p>
            </div>
            <div className="card">
              <span className="card__icon">
                <Icon name="shield" />
              </span>
              <h3>Clear and honest</h3>
              <p>
                Quotations depend on fuel type, volume, location, prevailing
                pricing, availability and agreed terms. We are transparent about
                what still needs to be confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries we aim to serve */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Who we aim to serve</span>
            <h2>Industries at the centre of our commercial focus.</h2>
          </div>
          <div
            className="grid grid--2"
            style={{ marginTop: "var(--space-6)" }}
          >
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.id}
                style={{
                  display: "flex",
                  gap: "var(--space-4)",
                  alignItems: "flex-start",
                  padding: "var(--space-4) 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span className="card__icon" style={{ marginBottom: 0 }}>
                  <Icon name={ind.icon} />
                </span>
                <div>
                  <h3 style={{ fontSize: "1.15rem" }}>{ind.name}</h3>
                  <p style={{ color: "var(--text-muted)", marginTop: 4 }}>
                    {ind.short}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/industries"
            className="btn btn--secondary"
            style={{ marginTop: "var(--space-6)" }}
          >
            See how we serve each industry
          </Link>
        </div>
      </section>

      {/* Puma relationship (detailed) */}
      <section className="section section--alt">
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
              <span className="eyebrow">Partnership</span>
              <h2>A Supply Relationship with Puma Energy</h2>
              <p className="lead" style={{ marginTop: "var(--space-5)" }}>
                KALM Group engages with Puma Energy in support of commercial
                fuel supply opportunities. We work with prospective customers to
                understand their fuel requirements and explore suitable supply
                arrangements.
              </p>
              <p style={{ marginTop: "var(--space-4)", color: "var(--text-muted)" }}>
                KALM Group is an independent South African business. This
                relationship supports our commercial fuel supply activities
                within the scope of the permission provided by Puma Energy.
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

      {/* Company information */}
      <section className="section">
        <div className="container container--narrow">
          <div className="section-head section-head--center">
            <span className="eyebrow">Company information</span>
            <h2>Registered details</h2>
          </div>
          <dl
            style={{
              marginTop: "var(--space-6)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
            }}
          >
            {[
              ["Registered name", SITE.name],
              ["Registration number", SITE.registrationNumber],
              ["Website", SITE.domain],
              ["Email", SITE.email],
            ].map(([k, v], i) => (
              <div
                key={k}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(160px, 1fr) 2fr",
                  gap: "var(--space-4)",
                  padding: "var(--space-4) var(--space-5)",
                  background: i % 2 ? "var(--cool-grey)" : "var(--white)",
                }}
              >
                <dt style={{ color: "var(--text-muted)", fontWeight: 600 }}>
                  {k}
                </dt>
                <dd>
                  {k === "Email" ? (
                    <a href={`mailto:${v}`}>{v}</a>
                  ) : k === "Website" ? (
                    <a href={SITE.url} target="_blank" rel="noreferrer">
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
