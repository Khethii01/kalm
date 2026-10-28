import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import CtaBand from "../components/CtaBand";
import AppImage from "../components/AppImage";
import { INDUSTRIES } from "../data";
import { breadcrumbLd, faqLd, serviceLd, MINING_FAQ } from "../seo";
import "./Industries.css";

export default function Industries() {
  return (
    <>
      <Seo
        title="Bulk Fuel Supply for Mining, Logistics & Industry | KALM Group"
        description="Bulk diesel and commercial fuel supply enquiries for mining companies, mining contractors, transport fleets, construction, industrial operations and fuel retailers across South Africa."
        path="/industries"
        keywords="bulk diesel supply South Africa, fuel supply for mining companies, mining contractor diesel supply, commercial fuel supplier South Africa, bulk fuel supply for logistics companies"
        jsonLd={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
          ]),
          serviceLd({
            name: "Bulk fuel supply for mining and industry",
            description:
              "Commercial and bulk diesel fuel supply enquiries for mining operations, mining contractors, transport and logistics, construction, industrial operations, fuel retailers and agriculture in South Africa.",
            serviceType: "Commercial and bulk fuel supply",
          }),
          faqLd(MINING_FAQ),
        ]}
      />

      <PageHeader
        eyebrow="Industries we serve"
        title="Commercial fuel for the operations that keep South Africa working."
        intro="We speak directly to the businesses behind each enquiry. Explore how KALM Group approaches fuel supply across the sectors we focus on."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Industries" }]}
      />

      <section className="section">
        <div className="container">
          {INDUSTRIES.map((ind, i) => (
            <article
              key={ind.id}
              id={ind.id}
              className={`industry ${i % 2 ? "industry--reverse" : ""}`}
            >
              <AppImage
                className="industry__media"
                src={ind.photo}
                alt={ind.alt}
                ratio="4 / 3"
              />
              <div>
                <span className="industry__badge">
                  <Icon name={ind.icon} size={18} /> Sector
                </span>
                <h2>{ind.name}</h2>
                <p>{ind.body}</p>
                <Link
                  to="/request-a-quote"
                  className="btn btn--primary industry__cta"
                >
                  Request a quote for {ind.name.split(" ")[0]}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ — mirrors the FAQPage structured data for rich results */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Frequently asked</span>
            <h2>Bulk fuel supply for mining — common questions</h2>
          </div>
          <div className="faq" style={{ marginTop: "var(--space-7)" }}>
            {MINING_FAQ.map((item) => (
              <div className="faq__item" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Operate in a sector not listed here?"
        text="If you have a genuine commercial fuel requirement, we are happy to hear from you."
        secondaryLabel="Contact us"
        secondaryTo="/contact"
      />
    </>
  );
}
