import { Link } from "react-router-dom";
import "./PageHeader.css";

type Crumb = { label: string; to?: string };

export default function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs?: Crumb[];
}) {
  return (
    <header className="page-header section--dark">
      <div className="container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="page-header__crumbs" aria-label="Breadcrumb">
            <ol>
              {breadcrumbs.map((c, i) => (
                <li key={`${c.label}-${i}`}>
                  {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {intro && <p className="lead page-header__intro">{intro}</p>}
      </div>
    </header>
  );
}
