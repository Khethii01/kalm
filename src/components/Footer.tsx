import { Link } from "react-router-dom";
import { NAV_LINKS, SITE } from "../site";
import { KalmLogo, PumaLogo } from "./Logo";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <KalmLogo variant="on-dark" height={72} />
            <p>
              Commercial and bulk fuel supply enquiries for mining, transport,
              construction and industrial businesses across {SITE.location}.
            </p>

            <div
              className="footer__partner"
              aria-label="Supply relationship with Puma Energy"
            >
              <span className="footer__partner-label">
                In supply relationship with
              </span>
              <PumaLogo height={40} />
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="footer__heading">Explore</h2>
            <ul className="footer__links">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/request-a-quote">Request a Quote</Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="footer__heading">Company</h2>
            <address className="footer__contact" style={{ fontStyle: "normal" }}>
              {SITE.name}
              <br />
              Reg. No. {SITE.registrationNumber}
              <br />
              {SITE.location}
              <br />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <br />
              <a href={SITE.url} target="_blank" rel="noreferrer">
                {SITE.domain}
              </a>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__reg">
            © {year} {SITE.name}. All rights reserved.
          </span>
          <div className="footer__legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <a href="/photos/CREDITS.md" target="_blank" rel="noreferrer">
              Image Credits
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
