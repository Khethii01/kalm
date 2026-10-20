import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import CtaBand from "../components/CtaBand";
import AppImage from "../components/AppImage";
import { INDUSTRIES } from "../data";
import "./Industries.css";

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries We Serve | Fuel Supply for Mining, Logistics & Industry"
        description="Commercial and bulk fuel supply enquiries for mining contractors, transport and logistics fleets, construction, industrial operations, fuel retailers and agriculture in South Africa."
        path="/industries"
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

      <CtaBand
        title="Operate in a sector not listed here?"
        text="If you have a genuine commercial fuel requirement, we are happy to hear from you."
        secondaryLabel="Contact us"
        secondaryTo="/contact"
      />
    </>
  );
}
