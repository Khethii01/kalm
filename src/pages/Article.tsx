import { Link, useParams, Navigate } from "react-router-dom";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";
import { getArticle } from "../articles";
import { breadcrumbLd } from "../seo";
import { SITE } from "../site";
import "./Insights.css";

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  const url = `${SITE.url}/insights/${article.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "en-ZA",
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logos/kalm-logo.jpg`,
      },
    },
  };

  return (
    <>
      <Seo
        title={`${article.title} | KALM Group`}
        description={article.description}
        path={`/insights/${article.slug}`}
        keywords={article.keywords}
        jsonLd={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: article.title, path: `/insights/${article.slug}` },
          ]),
          articleLd,
        ]}
      />

      <PageHeader
        eyebrow="Insight"
        title={article.title}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Insights", to: "/insights" },
          { label: article.title },
        ]}
      />

      <section className="section">
        <div className="container">
          <article className="article">
            <Link to="/insights" className="article__back">
              ← All insights
            </Link>
            <div className="article__meta">
              {new Date(article.date).toLocaleDateString("en-ZA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              · {article.readMins} min read
            </div>
            <div className="article__body">{article.body}</div>
          </article>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
