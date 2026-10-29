import type { IconName } from "./components/Icon";

/**
 * Puma lubricant categories supplied by KALM Group. Overview only — detailed
 * technical specifications are provided on request via the Technical Data
 * Sheet (routed through an enquiry). Descriptions summarise the published
 * Puma Lubricants catalogue; no spec tables are republished here.
 */
export type LubeCategory = {
  id: string;
  name: string;
  group: "Automotive" | "Industrial" | "Marine" | "Cleaning";
  icon: IconName;
  summary: string;
};

export const LUBRICANT_CATEGORIES: LubeCategory[] = [
  {
    id: "heavy-duty-diesel-engine-oils",
    name: "Heavy Duty Diesel Engine Oils",
    group: "Automotive",
    icon: "truck",
    summary:
      "For on-road and off-road heavy-duty diesel engines — trucks, buses, and industrial and construction equipment. Mineral, semi-synthetic and latest-technology low-emission formulations.",
  },
  {
    id: "passenger-car-motor-oils",
    name: "Passenger Car Motor Oils",
    group: "Automotive",
    icon: "fuel",
    summary:
      "Fully synthetic, semi-synthetic, multigrade and monograde engine oils for petrol and diesel cars, designed for Africa's demanding operating conditions.",
  },
  {
    id: "motorcycle-oils",
    name: "Motor Cycle Oils",
    group: "Automotive",
    icon: "droplet",
    summary:
      "Fully synthetic, semi-synthetic and mineral 4-stroke oils plus 2-stroke oil, formulated for engine, gears and wet-clutch protection.",
  },
  {
    id: "transmissions",
    name: "Transmissions",
    group: "Automotive",
    icon: "repeat",
    summary:
      "Manual and automatic transmission fluids, CVT fluids, tractor transmission oils and heavy-duty drive-train oils for automotive, agricultural and mining equipment.",
  },
  {
    id: "automotive-gear-oils",
    name: "Automotive Gear Oils",
    group: "Automotive",
    icon: "repeat",
    summary:
      "Fully synthetic and mineral EP gear oils for axles and final drives, including limited-slip differential grades.",
  },
  {
    id: "coolants-brake-clutch-fluids",
    name: "Engine Coolants, Brake & Clutch Fluids",
    group: "Automotive",
    icon: "droplet",
    summary:
      "Heavy-duty hybrid and extended-life coolants (pre-mix and concentrate) and DOT 4 hydraulic brake and clutch fluid.",
  },
  {
    id: "automotive-special-products",
    name: "Automotive Special Products",
    group: "Automotive",
    icon: "doc",
    summary:
      "Specialist automotive products including locomotive/railroad diesel engine oils, super tractor universal oils and 2-stroke outboard oils.",
  },
  {
    id: "industrial-gear-oils",
    name: "Industrial Gear Oils",
    group: "Industrial",
    icon: "factory",
    summary:
      "Heavy-duty synthetic and mineral EP industrial gear oils, including high-performance PSF technology and synthetic wheel-motor gear oils for mining trucks.",
  },
  {
    id: "hydraulic-oils",
    name: "Hydraulic Oils",
    group: "Industrial",
    icon: "droplet",
    summary:
      "Anti-wear and high-viscosity-index hydraulic oils plus fire-resistant and biodegradable fluids, for everything from mining to precision manufacturing.",
  },
  {
    id: "compressor-oils",
    name: "Compressor Oils",
    group: "Industrial",
    icon: "factory",
    summary:
      "Synthetic and mineral rotary compressor oils, plus reciprocating and refrigeration compressor oils, built for heat and moisture resistance.",
  },
  {
    id: "lubricating-greases",
    name: "Lubricating Greases",
    group: "Industrial",
    icon: "shield",
    summary:
      "A wide range of high-performance greases — lithium, lithium-complex, calcium-sulfonate complex and anhydrous calcium — for high loads, slow speeds and wet, corrosive environments.",
  },
  {
    id: "open-gear-lubricants",
    name: "Open Gear Lubricants",
    group: "Industrial",
    icon: "pickaxe",
    summary:
      "Heavy-duty and fully synthetic open gear lubricants for draglines, mining shovels, kilns and mills, with OEM approvals for major mining equipment.",
  },
  {
    id: "turbine-gas-engine-oils",
    name: "Turbine & Gas Engine Oils",
    group: "Industrial",
    icon: "factory",
    summary:
      "High-performance steam and gas turbine oils and low-ash natural gas engine oils for power generation.",
  },
  {
    id: "industrial-special-products",
    name: "Industrial Special Products",
    group: "Industrial",
    icon: "doc",
    summary:
      "Transformer oils, heat transfer oils, wire-rope and rock-drill lubricants, soluble cutting oil, filter carts and desiccant breathers.",
  },
  {
    id: "marine-lubricants",
    name: "Marine Lubricants",
    group: "Marine",
    icon: "droplet",
    summary:
      "Marine cylinder oils, system oils and advanced trunk-piston engine oils for 2-stroke and 4-stroke marine and power-generation engines, plus marine grease.",
  },
  {
    id: "detergents-degreasers",
    name: "Detergents & Degreasers",
    group: "Cleaning",
    icon: "droplet",
    summary:
      "Water-based and environmentally friendly degreasers and cleaners suitable for mine sites, workshops and industry.",
  },
];

export const LUBE_GROUPS: LubeCategory["group"][] = [
  "Automotive",
  "Industrial",
  "Marine",
  "Cleaning",
];
