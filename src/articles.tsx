import type { ReactNode } from "react";

/**
 * Articles / insights for content SEO. Each article targets buyer-intent
 * search phrases naturally. Add new entries here over time — the index page,
 * article pages and sitemap pick them up automatically.
 *
 * Keep claims factual and within what KALM can genuinely say. No fabricated
 * prices, customers, guarantees or capabilities.
 */
export type Article = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-10-22" */
  date: string;
  readMins: number;
  keywords: string;
  /** Short lead shown on the index page. */
  excerpt: string;
  body: ReactNode;
};

export const ARTICLES: Article[] = [
  {
    slug: "bulk-diesel-supply-for-mining-contractors-south-africa",
    title:
      "Bulk Diesel Supply for Mining Contractors in South Africa: What to Know",
    description:
      "A practical overview of how bulk diesel supply works for mining operations and mining contractors in South Africa, and what information speeds up a commercial fuel quote.",
    date: "2026-10-22",
    readMins: 4,
    keywords:
      "bulk diesel supply South Africa, fuel supply for mining companies, mining contractor diesel supply",
    excerpt:
      "Mining operations run on diesel. Here is how bulk diesel supply typically works for mines and mining contractors, and how to get an accurate commercial quote faster.",
    body: (
      <>
        <p>
          Diesel is the lifeblood of a mining operation — powering haul trucks,
          excavators, drill rigs, generators and plant equipment, often across
          remote sites and around the clock. For mining companies and mining
          contractors in South Africa, a reliable commercial fuel supply
          arrangement is a core operational concern, not an afterthought.
        </p>
        <h2>What shapes a bulk diesel supply arrangement</h2>
        <p>
          Every mine is different, but a few factors consistently determine how
          a commercial fuel supplier can respond to an enquiry:
        </p>
        <ul>
          <li>
            <strong>Volume.</strong> Estimated monthly or annual litres is the
            single most useful number to share.
          </li>
          <li>
            <strong>Delivery location.</strong> The town and province of each
            site, and whether sites are remote, affects logistics.
          </li>
          <li>
            <strong>Frequency.</strong> Whether you need recurring scheduled
            deliveries or once-off orders.
          </li>
          <li>
            <strong>Fuel type and specification.</strong> Diesel is standard for
            most mining equipment; confirm any specific requirements.
          </li>
          <li>
            <strong>Commercial terms.</strong> Pricing, availability and agreed
            terms are confirmed through a direct enquiry.
          </li>
        </ul>
        <h2>How to get an accurate quote faster</h2>
        <p>
          The more detail a supplier has up front, the quicker and more
          accurate the response. When enquiring about bulk diesel for a mining
          operation, it helps to provide your estimated volumes, the sites and
          provinces involved, your expected delivery frequency, and any
          supplier onboarding requirements your procurement team runs.
        </p>
        <h2>How KALM Group approaches mining fuel enquiries</h2>
        <p>
          KALM Group engages with mining operations, opencast mining
          contractors, plant operators and mining services businesses to
          understand their fuel requirements and explore suitable supply
          arrangements. Quotations depend on fuel type, volume, delivery
          location, prevailing pricing, product availability and agreed terms.
        </p>
      </>
    ),
  },
  {
    slug: "choosing-a-commercial-fuel-supplier-south-africa",
    title: "Choosing a Commercial Fuel Supplier in South Africa",
    description:
      "What transport, construction and industrial businesses should look for when choosing a commercial or bulk fuel supplier in South Africa.",
    date: "2026-10-22",
    readMins: 3,
    keywords:
      "commercial fuel supplier South Africa, bulk fuel supply for logistics companies, fuel supplier for industrial businesses",
    excerpt:
      "From logistics fleets to industrial plants, the right fuel supply relationship matters. Here is what to weigh up when choosing a commercial fuel supplier.",
    body: (
      <>
        <p>
          For transport and logistics fleets, construction contractors and
          industrial operations, fuel is often one of the largest operating
          costs. Choosing a commercial fuel supplier is therefore a decision
          worth making deliberately.
        </p>
        <h2>What to look for</h2>
        <ul>
          <li>
            <strong>Fit for your volumes and locations.</strong> A supplier
            should understand your operating pattern, not just sell litres.
          </li>
          <li>
            <strong>Clear, honest communication.</strong> Pricing in the fuel
            market moves; a good supplier is transparent about what is confirmed
            and what depends on availability and terms.
          </li>
          <li>
            <strong>Recurring and once-off flexibility.</strong> Your needs may
            change with seasons, projects or contracts.
          </li>
          <li>
            <strong>Straightforward onboarding.</strong> If you run a
            procurement process, the supplier should be able to work through it.
          </li>
        </ul>
        <h2>Ask the right questions</h2>
        <p>
          Be ready to share your estimated volumes, delivery towns and
          provinces, and whether you need recurring or once-off supply. These
          are the details that let a supplier give you a meaningful response.
        </p>
        <h2>Talking to KALM Group</h2>
        <p>
          KALM Group works with businesses across mining, transport,
          construction and industry to explore commercial fuel supply solutions
          aligned with their operational requirements. Share your requirement
          and we will review it against the factors that shape a quotation.
        </p>
      </>
    ),
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
