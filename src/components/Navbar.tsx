import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../site";
import { KalmLogo } from "./Logo";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Subtle elevation once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label="KALM Group — home">
          <KalmLogo variant="on-dark" height={68} />
        </Link>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`nav__burger ${open ? "is-open" : ""}`} />
        </button>

        <nav
          id="primary-navigation"
          className={`nav__menu ${open ? "is-open" : ""}`}
          aria-label="Primary"
        >
          <ul className="nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `nav__link ${isActive ? "is-active" : ""}`
                  }
                  end={link.to === "/"}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="nav__cta-wrap">
              <Link to="/request-a-quote" className="btn btn--on-dark nav__cta">
                Request a Quote
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
