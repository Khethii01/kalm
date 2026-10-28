/**
 * Single source of truth for company facts and site-wide constants.
 * Only verified details from the client brief are included here — no
 * fabricated phone numbers, addresses, histories or customer claims.
 */
export const SITE = {
  name: "KALM Group (Pty) Ltd",
  shortName: "KALM Group",
  registrationNumber: "2026 / 160149 / 07",
  domain: "kalmafrica.co.za",
  url: "https://kalmafrica.co.za",
  email: "info@kalmafrica.co.za",
  location: "South Africa",
  partner: "Puma Energy",
} as const;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Fuel Supply Solutions", to: "/fuel-supply-solutions" },
  { label: "Industries", to: "/industries" },
  { label: "Insights", to: "/insights" },
  { label: "Supplier Enquiries", to: "/supplier-enquiries" },
  { label: "Contact", to: "/contact" },
] as const;
