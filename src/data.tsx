import type { IconName } from "./components/Icon";
import { PHOTOS } from "./components/AppImage";

export type Industry = {
  id: string;
  name: string;
  icon: IconName;
  photo: string;
  alt: string;
  short: string;
  body: string;
};

export const INDUSTRIES: Industry[] = [
  {
    id: "mining",
    name: "Mining & Mining Contractors",
    icon: "pickaxe",
    photo: PHOTOS.mining,
    alt: "Heavy excavation machinery working at an opencast mining operation.",
    short:
      "Bulk fuel enquiries from mining operations, opencast contractors, plant operators and mining services businesses.",
    body: "We welcome bulk fuel enquiries from mining operations, opencast mining contractors, plant operators and mining services businesses. Share your sites, equipment profile and expected volumes and we will work to understand how a commercial supply arrangement could fit your operations.",
  },
  {
    id: "transport",
    name: "Transport & Logistics",
    icon: "truck",
    photo: PHOTOS.transport,
    alt: "A line of heavy-duty freight trucks at a logistics depot.",
    short:
      "Fuel requirements for commercial transport fleets, heavy vehicles and logistics operators.",
    body: "Commercial transport fleets, heavy-vehicle operators and logistics businesses can enquire about fuel supply aligned to their routes and operating patterns. Tell us about your fleet size, consumption and depots so we can explore a suitable arrangement.",
  },
  {
    id: "construction",
    name: "Construction & Infrastructure",
    icon: "building",
    photo: PHOTOS.construction,
    alt: "Construction site with cranes and earthmoving equipment at work.",
    short:
      "Fuel enquiries from civil engineering contractors, construction businesses and infrastructure projects.",
    body: "Civil engineering contractors, construction businesses and infrastructure projects often have fuel requirements that change with project phases. We are happy to discuss supply enquiries based on your project locations, timelines and equipment.",
  },
  {
    id: "industrial",
    name: "Industrial Operations",
    icon: "factory",
    photo: PHOTOS.industrial,
    alt: "Industrial plant facility with processing equipment and storage tanks.",
    short:
      "Commercial fuel requirements for industrial facilities, machinery and backup power applications.",
    body: "Industrial facilities with fuel requirements for machinery or backup power applications can enquire about appropriate commercial supply. Provide your usage profile and site details and we will review what may be possible.",
  },
  {
    id: "retailers",
    name: "Fuel Retailers",
    icon: "store",
    photo: PHOTOS.retailer,
    alt: "An independent fuel service station forecourt with pumps.",
    short:
      "Commercial supply enquiries from independent petrol stations and qualifying fuel retailers.",
    body: "Independent petrol stations and qualifying fuel retailers can submit commercial supply enquiries, subject to the agreed supply arrangement and applicable requirements. We will discuss what information is needed to take an enquiry forward.",
  },
  {
    id: "agriculture",
    name: "Agriculture & Other Commercial Sectors",
    icon: "wheat",
    photo: PHOTOS.agriculture,
    alt: "Agricultural machinery operating across farmland at harvest.",
    short:
      "Fuel requirements from suitable agricultural and other commercial operations.",
    body: "Agricultural operations and other suitable commercial sectors with genuine fuel requirements are welcome to enquire. Share your operation type, volumes and locations so we can consider an appropriate supply discussion.",
  },
];

export type Solution = {
  id: string;
  title: string;
  icon: IconName;
  body: string;
};

export const SOLUTIONS: Solution[] = [
  {
    id: "diesel",
    title: "Diesel Supply Enquiries",
    icon: "fuel",
    body: "Diesel is central to mining, transport, construction and industrial operations. We accept commercial diesel supply enquiries and work to understand the volumes, locations and frequency behind each requirement.",
  },
  {
    id: "petrol",
    title: "Petrol Supply Enquiries",
    icon: "droplet",
    body: "Petrol supply enquiries are considered subject to confirmed product availability and commercial arrangements. Tell us your requirement and we will advise on what can be explored.",
  },
  {
    id: "bulk",
    title: "Bulk Fuel Requirements",
    icon: "truck",
    body: "For larger-volume commercial requirements, we engage on bulk fuel enquiries and work through the details that shape a potential supply arrangement.",
  },
  {
    id: "recurring",
    title: "Recurring Supply Requirements",
    icon: "repeat",
    body: "Where your operation needs ongoing supply, we can discuss recurring requirements and the information needed to develop a longer-term supply relationship.",
  },
  {
    id: "onceoff",
    title: "Once-off Commercial Orders",
    icon: "doc",
    body: "Once-off commercial orders are welcome. Provide the fuel type, volume and delivery location and we will review the enquiry.",
  },
  {
    id: "quotation",
    title: "Customer-specific Quotation Requests",
    icon: "check",
    body: "Every business is different. Submit a customer-specific quotation request and we will assess it against the factors that determine commercial supply.",
  },
];

export const STEPS = [
  {
    n: 1,
    title: "Submit your enquiry",
    text: "Complete the quote request form with your fuel type, estimated volume and delivery location.",
  },
  {
    n: 2,
    title: "We review your requirement",
    text: "We assess the enquiry against fuel type, volume, location, availability and prevailing commercial factors.",
  },
  {
    n: 3,
    title: "We respond with next steps",
    text: "We come back to you with the information we can provide and any details we need to progress.",
  },
  {
    n: 4,
    title: "Explore a supply arrangement",
    text: "Where there is a fit, we work towards a suitable, long-term commercial supply relationship.",
  },
];
