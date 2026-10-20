import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { NAV_LINKS } from "../site";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found | KALM Group"
        description="The page you are looking for could not be found."
        path="/404"
      />
      <section className="section section--dark" style={{ minHeight: "60vh" }}>
        <div className="container container--narrow text-center">
          <span className="eyebrow">Error 404</span>
          <h1 style={{ color: "var(--white)" }}>This page could not be found.</h1>
          <p className="lead" style={{ marginTop: "var(--space-4)" }}>
            The link may be broken or the page may have moved. Try one of these
            instead.
          </p>
          <div
            style={{
              marginTop: "var(--space-6)",
              display: "flex",
              gap: "var(--space-3)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="btn btn--ghost-on-dark">
                {l.label}
              </Link>
            ))}
            <Link to="/request-a-quote" className="btn btn--on-dark">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
