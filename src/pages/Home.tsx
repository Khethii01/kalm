import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import CtaBand from "../components/CtaBand";
import AppImage, { PHOTOS } from "../components/AppImage";
import { PumaLogo } from "../components/Logo";
import { INDUSTRIES, SOLUTIONS, STEPS } from "../data";
import { serviceLd } from "../seo";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Seo
        title="KALM Group | Commercial & Bulk Fuel Supply South Africa"
        description="KALM Group (Pty) Ltd supplies commercial and bulk diesel fuel enquiries for mining, logistics, construction and industrial businesses across South Africa. Request a fuel quote."
        path="/"
        keywords="commercial fuel supplier South Africa, bulk diesel supply South Africa, fuel supply for mining companies, bulk fuel supply for logistics companies, fuel supplier for industrial businesses"
        jsonLd={[
          serviceLd({
            name: "Commercial and bulk fuel supply",
            description:
              "Commercial and bulk diesel fuel supply for mining, transport and logistics, construction, industrial operations, fuel retailers and agriculture across South Africa.",
            serviceType: "Commercial and bulk fuel supply",
          }),
        ]}
      />

      {/* Hero */}
      <section className="hero">
        <div className="hero__media">
          <AppImage
            src={PHOTOS.heroLogistics}
            alt="Commercial fuel logistics operation with heavy transport vehicles at dusk."
            loading="eager"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="container hero__inner">
          <h1>Commercial Fuel Supply. Built Around Your Business.</h1>
          <p className="hero__sub">
            KALM Group works with businesses across mining, transport,
            construction and industry to explore commercial fuel supply
            solutions aligned with their operational requirements.
          </p>
          <div className="hero__actions">
            <Link to="/request-a-quote" className="btn btn--on-dark btn--lg">
              Request a Fuel Quote
            </Link>
            <Link
              to="/fuel-supply-solutions"
              className="btn btn--ghost-on-dark btn--lg"
            >
              Explore Our Solutions
            </Link>
          </div>

          <div className="hero__trust">
            <div className="hero__trust-item">
              <b>Diesel &amp; bulk fuel</b>
              <span>Commercial supply enquiries</span>
            </div>
            <div className="hero__trust-item">
              <b>Mining to industry</b>
              <span>Six commercial sectors served</span>
            </div>
            <div className="hero__trust-item">
              <b>Puma Energy</b>
              <span>A supply relationship</span>
            </div>
          </div>
        </div>
      </section>

      {/* Company introduction */}
      <section className="section">
        <div className="container">
          <div className="intro-split">
            <div>
              <span className="eyebrow">Who we are</span>
              <h2>
                A South African business focused on commercial fuel supply.
              </h2>
              <p className="lead" style={{ marginTop: "var(--space-5)" }}>
                KALM Group (Pty) Ltd engages with businesses to understand their
                fuel requirements, operating locations and purchasing needs,
                with the aim of developing suitable, long-term supply
                relationships.
              </p>
              <p style={{ marginTop: "var(--space-4)", color: "var(--text-muted)" }}>
                We keep our approach straightforward: understand the
                requirement, review what is possible, and respond clearly.
              </p>
              <Link
                to="/about"
                className="btn btn--secondary"
                style={{ marginTop: "var(--space-6)" }}
              >
                More about KALM Group
              </Link>
            </div>
            <AppImage
              className="intro-split__media"
              src={PHOTOS.tanker}
              alt="A commercial fuel tanker on the road serving industrial customers."
              ratio="4 / 3"
            />
          </div>
        </div>
      </section>

      {/* Puma partnership (discreet) */}
      <section className="section section--alt section--tight">
        <div className="container">
          <div className="partner">
            <div className="partner__logo">
              <PumaLogo height={64} />
            </div>
            <span className="partner__rule" aria-hidden="true" />
            <div>
              <span className="eyebrow">Partnership</span>
              <h3 style={{ marginBottom: "var(--space-3)" }}>
                A Supply Relationship with Puma Energy
              </h3>
              <p style={{ color: "var(--text-muted)" }}>
                KALM Group engages with Puma Energy in support of commercial
                fuel supply opportunities. We work with prospective customers to
                understand their fuel requirements and explore suitable supply
                arrangements.
              </p>
              <Link
                to="/about"
                className="card__link"
                style={{ marginTop: "var(--space-4)" }}
              >
                Read more on our About page
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries overview */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Industries we serve</span>
            <h2>Commercial fuel for the sectors that keep moving.</h2>
            <p>
              We speak directly to the operations behind the enquiry — from
              opencast mines to logistics fleets and industrial plants.
            </p>
          </div>

          <div className="grid grid--3" style={{ marginTop: "var(--space-7)" }}>
            {INDUSTRIES.slice(0, 6).map((ind) => (
              <Link
                key={ind.id}
                to={`/industries#${ind.id}`}
                className="card card--link"
              >
                <span className="card__icon">
                  <Icon name={ind.icon} />
                </span>
                <h3>{ind.name}</h3>
                <p>{ind.short}</p>
                <span className="card__link">Learn more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions overview */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Fuel supply solutions</span>
            <h2>The commercial enquiries we accept.</h2>
            <p>
              Quotations depend on fuel type, volume, delivery location,
              prevailing pricing, product availability and agreed terms.
            </p>
          </div>

          <div className="grid grid--3" style={{ marginTop: "var(--space-7)" }}>
            {SOLUTIONS.map((sol) => (
              <div key={sol.id} className="card">
                <span className="card__icon">
                  <Icon name={sol.icon} />
                </span>
                <h3>{sol.title}</h3>
                <p>{sol.body}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "var(--space-7)",
              display: "flex",
              gap: "var(--space-4)",
              flexWrap: "wrap",
            }}
          >
            <Link to="/fuel-supply-solutions" className="btn btn--primary">
              Explore fuel supply solutions
            </Link>
            <Link to="/lubricants" className="btn btn--secondary">
              View lubricants
            </Link>
          </div>
        </div>
      </section>

      {/* Four-step process */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>A clear four-step supply enquiry process.</h2>
          </div>

          <div className="steps" style={{ marginTop: "var(--space-7)" }}>
            {STEPS.map((step) => (
              <div key={step.n} className="step">
                <span className="step__num">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBand
        secondaryLabel="Talk to us"
        secondaryTo="/contact"
      />
    </>
  );
}
