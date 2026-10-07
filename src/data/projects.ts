import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

export const microMarkets = [
  "Lower Parel",
  "Bandra East (BKC)",
  "Worli",
  "Andheri West",
  "Powai",
  "Thane West",
  "Chembur",
  "Malad West",
  "Navi Mumbai — Vashi",
  "Goregaon East",
] as const;

export const propertyTypes = ["Apartment", "Penthouse", "Villa", "Commercial", "Plot"] as const;
export const configurations = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK+", "Office"] as const;
export const possessionOptions = [
  "Ready to Move",
  "Dec 2026",
  "Jun 2027",
  "Dec 2027",
  "2028+",
] as const;
export const reraStatuses = ["Registered", "Applied", "Exempt"] as const;

export type ProjectImage = string;

export interface InventoryUnit {
  tower: string;
  config: string;
  carpet: number;
  floorBand: string;
  available: number;
  total: number;
  price: number;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  developer: string;
  developerSince: number;
  developerProjects: number;
  microMarket: string;
  address: string;
  type: (typeof propertyTypes)[number];
  configs: string[];
  priceMin: number;
  priceMax: number;
  pricePerSqft: number;
  possession: string;
  reraStatus: (typeof reraStatuses)[number];
  reraId: string;
  status: "New Launch" | "Under Construction" | "Ready to Move" | "Nearing Possession";
  images: ProjectImage[];
  overview: string;
  amenities: string[];
  highlights: string[];
  connectivity: { label: string; distance: string }[];
  inventory: InventoryUnit[];
  commissionPct: number;
  commissionBonus: string;
  payoutCycle: string;
  totalUnits: number;
  availableUnits: number;
  velocity: string;
  featured: boolean;
}

const amenityPool = [
  "Infinity Pool",
  "Sky Lounge",
  "Clubhouse",
  "Multipurpose Court",
  "Yoga Deck",
  "Kids' Play Zone",
  "Co-working Lounge",
  "EV Charging",
  "Jogging Track",
  "Banquet Hall",
  "Landscaped Podium",
  "24x7 Security",
];

export const projects: Project[] = [
  {
    id: "p1",
    slug: "lodha-parel-heights",
    name: "Parel Heights Tower A & B",
    developer: "Meridian Realty",
    developerSince: 1994,
    developerProjects: 42,
    microMarket: "Lower Parel",
    address: "Senapati Bapat Marg, Lower Parel, Mumbai 400013",
    type: "Apartment",
    configs: ["2 BHK", "3 BHK", "4 BHK"],
    priceMin: 32000000,
    priceMax: 78500000,
    pricePerSqft: 48500,
    possession: "Dec 2027",
    reraStatus: "Registered",
    reraId: "P51900045821",
    status: "Under Construction",
    images: [project1, project2, project3],
    overview:
      "A 58-storey twin-tower development on Senapati Bapat Marg with direct access to the Lower Parel business district. Designed for CXO-grade buyers seeking walk-to-work luxury with panoramic sea and racecourse views.",
    amenities: amenityPool.slice(0, 10),
    highlights: [
      "Walk to Phoenix Palladium & One Lodha Place",
      "Double-height sky lounge on 41st floor",
      "3-side open apartments with 10ft ceilings",
    ],
    connectivity: [
      { label: "Lower Parel Station", distance: "0.9 km" },
      { label: "Metro Line 3 — Worli", distance: "1.8 km" },
      { label: "BKC", distance: "7.4 km" },
      { label: "CSMIA Airport", distance: "17 km" },
    ],
    inventory: [
      { tower: "A", config: "2 BHK", carpet: 742, floorBand: "8–24", available: 14, total: 48, price: 32000000 },
      { tower: "A", config: "3 BHK", carpet: 1108, floorBand: "25–41", available: 9, total: 34, price: 51500000 },
      { tower: "B", config: "3 BHK", carpet: 1180, floorBand: "12–36", available: 21, total: 52, price: 54900000 },
      { tower: "B", config: "4 BHK", carpet: 1685, floorBand: "42–58", available: 5, total: 16, price: 78500000 },
    ],
    commissionPct: 3.25,
    commissionBonus: "+0.5% slab bonus on 3rd closure per quarter",
    payoutCycle: "45 days from registration",
    totalUnits: 150,
    availableUnits: 49,
    velocity: "11 units / month",
    featured: true,
  },
  {
    id: "p2",
    slug: "seabreeze-worli",
    name: "Seabreeze Residences",
    developer: "Anantara Group",
    developerSince: 2001,
    developerProjects: 18,
    microMarket: "Worli",
    address: "Dr. Annie Besant Road, Worli, Mumbai 400018",
    type: "Penthouse",
    configs: ["3 BHK", "4 BHK", "5 BHK+"],
    priceMin: 96000000,
    priceMax: 245000000,
    pricePerSqft: 71000,
    possession: "Ready to Move",
    reraStatus: "Registered",
    reraId: "P51900031204",
    status: "Ready to Move",
    images: [project2, project1, project4],
    overview:
      "Twenty-two ultra-luxury sea-facing residences on Worli seaface, with private plunge pools on upper floors and a dedicated concierge floor. Positioned for HNI and NRI capital.",
    amenities: amenityPool.slice(2, 12),
    highlights: [
      "180° Arabian Sea views from every residence",
      "Private lift lobby per apartment",
      "Concierge, valet and curated F&B partnerships",
    ],
    connectivity: [
      { label: "Worli Sea Link", distance: "1.2 km" },
      { label: "Metro Line 3 — Worli", distance: "1.0 km" },
      { label: "BKC", distance: "8.1 km" },
      { label: "CSMIA Airport", distance: "19 km" },
    ],
    inventory: [
      { tower: "Main", config: "3 BHK", carpet: 1620, floorBand: "6–14", available: 3, total: 9, price: 96000000 },
      { tower: "Main", config: "4 BHK", carpet: 2410, floorBand: "15–24", available: 4, total: 10, price: 154000000 },
      { tower: "Main", config: "5 BHK+", carpet: 3980, floorBand: "25–28", available: 1, total: 3, price: 245000000 },
    ],
    commissionPct: 2.5,
    commissionBonus: "+₹5L flat bonus on penthouse closures",
    payoutCycle: "30 days from registration",
    totalUnits: 22,
    availableUnits: 8,
    velocity: "2 units / month",
    featured: true,
  },
  {
    id: "p3",
    slug: "aurum-bkc-one",
    name: "Aurum BKC One",
    developer: "Kalpataru Vantage",
    developerSince: 1988,
    developerProjects: 63,
    microMarket: "Bandra East (BKC)",
    address: "G Block, Bandra Kurla Complex, Mumbai 400051",
    type: "Commercial",
    configs: ["Office"],
    priceMin: 42000000,
    priceMax: 380000000,
    pricePerSqft: 39500,
    possession: "Jun 2027",
    reraStatus: "Registered",
    reraId: "P51800029917",
    status: "Nearing Possession",
    images: [project4, project1, project3],
    overview:
      "Grade-A LEED Platinum office tower in BKC's G Block offering 2,000–48,000 sq ft floor plates, ideal for BFSI and GCC occupiers. Strong fit for institutional and family-office investors.",
    amenities: ["Grade-A Lobby", "Double Basement Parking", "100% Power Backup", "Cafeteria Zone", "Smart Access", "Green Terraces"],
    highlights: [
      "LEED Platinum pre-certified",
      "Rental yield estimated at 7.2%",
      "Anchor tenant LOIs on 3 floors",
    ],
    connectivity: [
      { label: "Bandra Station", distance: "3.4 km" },
      { label: "Metro Line 2B — MTNL", distance: "0.8 km" },
      { label: "CSMIA Airport", distance: "6.9 km" },
      { label: "Eastern Express Hwy", distance: "2.1 km" },
    ],
    inventory: [
      { tower: "North", config: "Office", carpet: 2050, floorBand: "3–8", available: 6, total: 12, price: 42000000 },
      { tower: "North", config: "Office", carpet: 9800, floorBand: "9–16", available: 4, total: 8, price: 186000000 },
      { tower: "South", config: "Office", carpet: 19500, floorBand: "17–22", available: 2, total: 6, price: 380000000 },
    ],
    commissionPct: 2.0,
    commissionBonus: "+0.35% on pre-lease assisted deals",
    payoutCycle: "60 days from agreement",
    totalUnits: 26,
    availableUnits: 12,
    velocity: "1.5 floors / month",
    featured: true,
  },
  {
    id: "p4",
    slug: "greenscape-powai",
    name: "Greenscape Powai Enclave",
    developer: "Rustom Estates",
    developerSince: 2006,
    developerProjects: 27,
    microMarket: "Powai",
    address: "Central Avenue, Hiranandani Gardens, Powai, Mumbai 400076",
    type: "Apartment",
    configs: ["1 BHK", "2 BHK", "3 BHK"],
    priceMin: 14500000,
    priceMax: 39000000,
    pricePerSqft: 27800,
    possession: "Dec 2026",
    reraStatus: "Registered",
    reraId: "P51800026310",
    status: "Under Construction",
    images: [project3, project1, project2],
    overview:
      "Lake-adjacent family housing in Powai with a 1.2-acre central garden, IB-curriculum schools within 1 km and strong IT-corridor rental demand.",
    amenities: amenityPool.slice(1, 10),
    highlights: [
      "Powai lake views from D & E wings",
      "Walk to Hiranandani business park",
      "Highest rental absorption in the micro-market",
    ],
    connectivity: [
      { label: "Metro Line 6 — Powai", distance: "1.4 km" },
      { label: "JVLR", distance: "0.6 km" },
      { label: "CSMIA Airport", distance: "8.2 km" },
      { label: "BKC", distance: "13 km" },
    ],
    inventory: [
      { tower: "C", config: "1 BHK", carpet: 445, floorBand: "3–11", available: 18, total: 60, price: 14500000 },
      { tower: "D", config: "2 BHK", carpet: 690, floorBand: "4–18", available: 26, total: 90, price: 22400000 },
      { tower: "E", config: "3 BHK", carpet: 1015, floorBand: "8–22", available: 11, total: 45, price: 39000000 },
    ],
    commissionPct: 3.75,
    commissionBonus: "+₹1.5L spot bonus during launch window",
    payoutCycle: "45 days from registration",
    totalUnits: 195,
    availableUnits: 55,
    velocity: "18 units / month",
    featured: true,
  },
  {
    id: "p5",
    slug: "orchid-thane-west",
    name: "Orchid Grand Thane",
    developer: "Sunteck Horizon",
    developerSince: 1999,
    developerProjects: 35,
    microMarket: "Thane West",
    address: "Ghodbunder Road, Thane West 400607",
    type: "Apartment",
    configs: ["1 BHK", "2 BHK", "3 BHK"],
    priceMin: 8900000,
    priceMax: 24500000,
    pricePerSqft: 16400,
    possession: "2028+",
    reraStatus: "Applied",
    reraId: "Application 2026/TH/0912",
    status: "New Launch",
    images: [project3, project4, project1],
    overview:
      "A 9-acre township launch on Ghodbunder Road with three phases, targeting first-time buyers and upgraders from Mulund and Bhandup.",
    amenities: amenityPool.slice(3, 12),
    highlights: [
      "Launch pricing locked for first 100 bookings",
      "Metro Line 4 extension 1.1 km away",
      "Township with retail high-street",
    ],
    connectivity: [
      { label: "Thane Station", distance: "6.5 km" },
      { label: "Metro Line 4 (u/c)", distance: "1.1 km" },
      { label: "Eastern Express Hwy", distance: "3.0 km" },
      { label: "Airoli Bridge", distance: "9.4 km" },
    ],
    inventory: [
      { tower: "P1-A", config: "1 BHK", carpet: 398, floorBand: "2–14", available: 44, total: 120, price: 8900000 },
      { tower: "P1-B", config: "2 BHK", carpet: 628, floorBand: "3–20", available: 61, total: 160, price: 14800000 },
      { tower: "P1-C", config: "3 BHK", carpet: 902, floorBand: "6–22", available: 19, total: 70, price: 24500000 },
    ],
    commissionPct: 4.0,
    commissionBonus: "+1% launch-phase override for first 20 closures",
    payoutCycle: "60 days from registration",
    totalUnits: 350,
    availableUnits: 124,
    velocity: "34 units / month",
    featured: false,
  },
  {
    id: "p6",
    slug: "vertex-andheri-west",
    name: "Vertex Andheri West",
    developer: "Meridian Realty",
    developerSince: 1994,
    developerProjects: 42,
    microMarket: "Andheri West",
    address: "Lokhandwala Complex, Andheri West, Mumbai 400053",
    type: "Apartment",
    configs: ["2 BHK", "3 BHK"],
    priceMin: 21500000,
    priceMax: 42000000,
    pricePerSqft: 31200,
    possession: "Ready to Move",
    reraStatus: "Registered",
    reraId: "P51800021166",
    status: "Ready to Move",
    images: [project1, project3, project2],
    overview:
      "Completed OC-received boutique tower in Lokhandwala with 34 residences, popular with media-industry buyers and short-cycle investors.",
    amenities: amenityPool.slice(0, 8),
    highlights: ["OC received — immediate registration", "Only 3 apartments per floor", "Strong resale comparables"],
    connectivity: [
      { label: "DN Nagar Metro", distance: "1.0 km" },
      { label: "Andheri Station", distance: "3.2 km" },
      { label: "Versova Beach", distance: "2.5 km" },
      { label: "CSMIA Airport", distance: "6.8 km" },
    ],
    inventory: [
      { tower: "Main", config: "2 BHK", carpet: 705, floorBand: "2–9", available: 5, total: 18, price: 21500000 },
      { tower: "Main", config: "3 BHK", carpet: 1055, floorBand: "10–17", available: 4, total: 16, price: 42000000 },
    ],
    commissionPct: 2.75,
    commissionBonus: "Ready inventory — instant payout track",
    payoutCycle: "21 days from registration",
    totalUnits: 34,
    availableUnits: 9,
    velocity: "3 units / month",
    featured: false,
  },
  {
    id: "p7",
    slug: "harbour-vashi",
    name: "Harbour Square Vashi",
    developer: "Anantara Group",
    developerSince: 2001,
    developerProjects: 18,
    microMarket: "Navi Mumbai — Vashi",
    address: "Sector 17, Vashi, Navi Mumbai 400703",
    type: "Apartment",
    configs: ["2 BHK", "3 BHK", "4 BHK"],
    priceMin: 13200000,
    priceMax: 32800000,
    pricePerSqft: 19600,
    possession: "Jun 2027",
    reraStatus: "Registered",
    reraId: "P52000034408",
    status: "Under Construction",
    images: [project4, project3, project1],
    overview:
      "Navi Mumbai airport-corridor play in Sector 17 Vashi, with capital-appreciation narrative tied to NMIA commissioning and the Atal Setu corridor.",
    amenities: amenityPool.slice(2, 11),
    highlights: ["25 min to NMIA via Atal Setu", "Harbour line 700 m", "Investor-grade entry pricing"],
    connectivity: [
      { label: "Vashi Station", distance: "0.7 km" },
      { label: "Atal Setu Entry", distance: "4.2 km" },
      { label: "NMIA (u/c)", distance: "21 km" },
      { label: "BKC", distance: "24 km" },
    ],
    inventory: [
      { tower: "T1", config: "2 BHK", carpet: 655, floorBand: "3–16", available: 22, total: 80, price: 13200000 },
      { tower: "T2", config: "3 BHK", carpet: 940, floorBand: "5–20", available: 17, total: 64, price: 21900000 },
      { tower: "T2", config: "4 BHK", carpet: 1380, floorBand: "18–24", available: 6, total: 24, price: 32800000 },
    ],
    commissionPct: 3.5,
    commissionBonus: "+0.4% for NRI-sourced bookings",
    payoutCycle: "45 days from registration",
    totalUnits: 168,
    availableUnits: 45,
    velocity: "14 units / month",
    featured: false,
  },
  {
    id: "p8",
    slug: "the-crest-chembur",
    name: "The Crest Chembur",
    developer: "Rustom Estates",
    developerSince: 2006,
    developerProjects: 27,
    microMarket: "Chembur",
    address: "Central Avenue Road, Chembur, Mumbai 400071",
    type: "Apartment",
    configs: ["2 BHK", "3 BHK"],
    priceMin: 19800000,
    priceMax: 34500000,
    pricePerSqft: 24100,
    possession: "Dec 2027",
    reraStatus: "Registered",
    reraId: "P51800028774",
    status: "Under Construction",
    images: [project1, project4, project2],
    overview:
      "Redevelopment-led tower in Chembur with monorail and Eastern Freeway access, drawing upgraders from Ghatkopar and Sion.",
    amenities: amenityPool.slice(1, 9),
    highlights: ["Eastern Freeway 1.5 km", "Redevelopment with clean title", "High end-user share"],
    connectivity: [
      { label: "Chembur Monorail", distance: "0.9 km" },
      { label: "Eastern Freeway", distance: "1.5 km" },
      { label: "BKC", distance: "9.6 km" },
      { label: "CSMIA Airport", distance: "10.5 km" },
    ],
    inventory: [
      { tower: "A", config: "2 BHK", carpet: 690, floorBand: "4–15", available: 12, total: 44, price: 19800000 },
      { tower: "A", config: "3 BHK", carpet: 985, floorBand: "16–26", available: 8, total: 33, price: 34500000 },
    ],
    commissionPct: 3.0,
    commissionBonus: "+₹75k per closure above 2 per quarter",
    payoutCycle: "45 days from registration",
    totalUnits: 77,
    availableUnits: 20,
    velocity: "7 units / month",
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const developers = Array.from(new Set(projects.map((p) => p.developer))).sort();
