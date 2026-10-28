import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";
import { ARTICLES } from "../articles";
import { breadcrumbLd } from "../seo";
import "./Insights.css";

export default function Insights() {
  return (
    <>
      <Seo
        title="Insights | Commercial & Bulk Fuel Supply | KALM Group"
        description="Guides and insights on commercial and bulk diesel fuel supply for mining, transport, construction and industrial businesses in South Africa."
        path="/insights"
        keywords="bulk diesel supply South Africa, commercial fuel supplier South Africa, fuel supply for mining companies"
        jsonLd={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Insights"
        title="Practical guidance on commercial fuel supply."
        intro="Short, practical reads on bulk diesel and commercial fuel supply for mining, transport, construction and industrial businesses."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Insights" }]}
      />

      <section className="section">
        <div className="container">
          <div className="insights-grid">
            {ARTICLES.map((a) => (
              <article key={a.slug} className="insight-card">
                <div className="insight-card__meta">
                  {new Date(a.date).toLocaleDateString("en-ZA", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · {a.readMins} min read
                </div>
                <h2 className="insight-card__title">
                  <Link to={`/insights/${a.slug}`}>{a.title}</Link>
                </h2>
                <p className="insight-card__excerpt">{a.excerpt}</p>
                <Link to={`/insights/${a.slug}`} className="card__link">
                  Read article
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
