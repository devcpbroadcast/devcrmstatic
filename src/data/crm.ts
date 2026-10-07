export const leadStages = [
  "New",
  "Contacted",
  "Site Visit",
  "Negotiation",
  "Booked",
  "Lost",
] as const;
export type LeadStage = (typeof leadStages)[number];

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  stage: LeadStage;
  owner: string;
  project: string;
  microMarket: string;
  budgetMin: number;
  budgetMax: number;
  config: string;
  nextAction: string;
  nextActionDate: string;
  lastActivity: string;
  score: "Hot" | "Warm" | "Cold";
  notes?: string;
}

export const leads: Lead[] = [
  { id: "L-1042", name: "Rohan Mehta", phone: "9820014455", email: "rohan.mehta@gmail.com", source: "Portal", stage: "Negotiation", owner: "Aditi Sharma", project: "Parel Heights Tower A & B", microMarket: "Lower Parel", budgetMin: 45000000, budgetMax: 55000000, config: "3 BHK", nextAction: "Share revised cost sheet", nextActionDate: "2026-08-01", lastActivity: "2026-07-29T11:20:00", score: "Hot" },
  { id: "L-1043", name: "Nikita Raval", phone: "9930071122", email: "nikita.raval@outlook.com", source: "Referral", stage: "Site Visit", owner: "Karan Doshi", project: "Greenscape Powai Enclave", microMarket: "Powai", budgetMin: 20000000, budgetMax: 24000000, config: "2 BHK", nextAction: "Confirm Saturday visit slot", nextActionDate: "2026-07-31", lastActivity: "2026-07-28T16:05:00", score: "Hot" },
  { id: "L-1044", name: "Imran Shaikh", phone: "9870033441", email: "imran.s@zoho.com", source: "Walk-in", stage: "Contacted", owner: "Aditi Sharma", project: "Orchid Grand Thane", microMarket: "Thane West", budgetMin: 9000000, budgetMax: 13000000, config: "1 BHK", nextAction: "Call back post salary revision", nextActionDate: "2026-08-04", lastActivity: "2026-07-27T10:00:00", score: "Warm" },
  { id: "L-1045", name: "Sanjana Iyer", phone: "9819902314", email: "sanjana.iyer@icloud.com", source: "Instagram", stage: "New", owner: "Priya Nair", project: "Seabreeze Residences", microMarket: "Worli", budgetMin: 90000000, budgetMax: 120000000, config: "3 BHK", nextAction: "First qualification call", nextActionDate: "2026-07-30", lastActivity: "2026-07-29T09:15:00", score: "Warm" },
  { id: "L-1046", name: "Devendra Patil", phone: "9769018822", email: "d.patil@rediffmail.com", source: "Channel Partner", stage: "Booked", owner: "Karan Doshi", project: "Harbour Square Vashi", microMarket: "Navi Mumbai — Vashi", budgetMin: 13000000, budgetMax: 15000000, config: "2 BHK", nextAction: "Collect registration documents", nextActionDate: "2026-08-02", lastActivity: "2026-07-26T18:40:00", score: "Hot" },
  { id: "L-1047", name: "Aarav Khanna (NRI · Dubai)", phone: "9820456677", email: "aarav.khanna@gulfmail.ae", source: "NRI Desk", stage: "Negotiation", owner: "Priya Nair", project: "Aurum BKC One", microMarket: "Bandra East (BKC)", budgetMin: 150000000, budgetMax: 200000000, config: "Office", nextAction: "Video walkthrough at 9 PM IST", nextActionDate: "2026-07-30", lastActivity: "2026-07-29T07:45:00", score: "Hot" },
  { id: "L-1048", name: "Meera Joshi", phone: "9892211003", email: "meera.joshi@gmail.com", source: "Portal", stage: "Site Visit", owner: "Aditi Sharma", project: "The Crest Chembur", microMarket: "Chembur", budgetMin: 19000000, budgetMax: 23000000, config: "2 BHK", nextAction: "Post-visit feedback call", nextActionDate: "2026-07-31", lastActivity: "2026-07-28T13:30:00", score: "Warm" },
  { id: "L-1049", name: "Faisal Merchant", phone: "9833445566", email: "faisal.m@yahoo.in", source: "Referral", stage: "Lost", owner: "Karan Doshi", project: "Vertex Andheri West", microMarket: "Andheri West", budgetMin: 18000000, budgetMax: 21000000, config: "2 BHK", nextAction: "Re-nurture in Q4", nextActionDate: "2026-10-01", lastActivity: "2026-07-20T12:00:00", score: "Cold" },
  { id: "L-1050", name: "Shalini Gupta", phone: "9004556677", email: "shalini.g@gmail.com", source: "Cold Call", stage: "Contacted", owner: "Priya Nair", project: "Greenscape Powai Enclave", microMarket: "Powai", budgetMin: 35000000, budgetMax: 42000000, config: "3 BHK", nextAction: "Send Powai comparison deck", nextActionDate: "2026-08-03", lastActivity: "2026-07-25T15:10:00", score: "Warm" },
  { id: "L-1051", name: "Vikram Bhatia", phone: "9930887744", email: "vikram.bhatia@corp.in", source: "Developer Lead", stage: "New", owner: "Aditi Sharma", project: "Parel Heights Tower A & B", microMarket: "Lower Parel", budgetMin: 70000000, budgetMax: 85000000, config: "4 BHK", nextAction: "Assign and qualify", nextActionDate: "2026-07-30", lastActivity: "2026-07-29T08:05:00", score: "Hot" },
  { id: "L-1052", name: "Pooja Rane", phone: "9820774411", email: "pooja.rane@gmail.com", source: "Portal", stage: "Booked", owner: "Priya Nair", project: "Orchid Grand Thane", microMarket: "Thane West", budgetMin: 14000000, budgetMax: 16000000, config: "2 BHK", nextAction: "Loan sanction follow-up", nextActionDate: "2026-08-05", lastActivity: "2026-07-24T11:55:00", score: "Hot" },
];

export interface SiteVisit {
  id: string;
  leadName: string;
  phone: string;
  project: string;
  microMarket: string;
  date: string;
  slot: string;
  status: "Upcoming" | "Completed" | "No-show";
  taggedBy: string;
  developerRep?: string;
  outcome?: string;
  tagCode: string;
}

export const siteVisits: SiteVisit[] = [
  { id: "SV-3011", leadName: "Nikita Raval", phone: "9930071122", project: "Greenscape Powai Enclave", microMarket: "Powai", date: "2026-08-01", slot: "11:00 AM – 12:00 PM", status: "Upcoming", taggedBy: "Karan Doshi", developerRep: "Sales Desk — Rustom Estates", tagCode: "RBN-PWI-3011" },
  { id: "SV-3012", leadName: "Vikram Bhatia", phone: "9930887744", project: "Parel Heights Tower A & B", microMarket: "Lower Parel", date: "2026-08-02", slot: "04:00 PM – 05:00 PM", status: "Upcoming", taggedBy: "Aditi Sharma", developerRep: "Sales Desk — Meridian Realty", tagCode: "RBN-LPR-3012" },
  { id: "SV-3013", leadName: "Aarav Khanna", phone: "9820456677", project: "Aurum BKC One", microMarket: "Bandra East (BKC)", date: "2026-08-04", slot: "10:30 AM – 11:30 AM", status: "Upcoming", taggedBy: "Priya Nair", developerRep: "Leasing Desk — Kalpataru Vantage", tagCode: "RBN-BKC-3013" },
  { id: "SV-3008", leadName: "Meera Joshi", phone: "9892211003", project: "The Crest Chembur", microMarket: "Chembur", date: "2026-07-28", slot: "12:00 PM – 01:00 PM", status: "Completed", taggedBy: "Aditi Sharma", outcome: "Liked 3 BHK layout, wants lower floor pricing", tagCode: "RBN-CHM-3008" },
  { id: "SV-3007", leadName: "Devendra Patil", phone: "9769018822", project: "Harbour Square Vashi", microMarket: "Navi Mumbai — Vashi", date: "2026-07-26", slot: "05:00 PM – 06:00 PM", status: "Completed", taggedBy: "Karan Doshi", outcome: "Booked 2 BHK, token collected", tagCode: "RBN-VSH-3007" },
  { id: "SV-3006", leadName: "Faisal Merchant", phone: "9833445566", project: "Vertex Andheri West", microMarket: "Andheri West", date: "2026-07-20", slot: "03:00 PM – 04:00 PM", status: "No-show", taggedBy: "Karan Doshi", outcome: "Did not turn up; rescheduling declined", tagCode: "RBN-AND-3006" },
];

export const commissionStatuses = ["Expected", "Approved", "Invoiced", "Paid", "Disputed"] as const;
export type CommissionStatus = (typeof commissionStatuses)[number];

export interface Commission {
  id: string;
  client: string;
  project: string;
  developer: string;
  unit: string;
  dealValue: number;
  ratePct: number;
  amount: number;
  status: CommissionStatus;
  bookingDate: string;
  expectedDate: string;
  owner: string;
  note?: string;
}

export const commissions: Commission[] = [
  { id: "CM-9001", client: "Devendra Patil", project: "Harbour Square Vashi", developer: "Anantara Group", unit: "T1-1204 · 2 BHK", dealValue: 13200000, ratePct: 3.5, amount: 462000, status: "Invoiced", bookingDate: "2026-07-26", expectedDate: "2026-09-09", owner: "Karan Doshi" },
  { id: "CM-9002", client: "Pooja Rane", project: "Orchid Grand Thane", developer: "Sunteck Horizon", unit: "P1-B/906 · 2 BHK", dealValue: 14800000, ratePct: 5.0, amount: 740000, status: "Approved", bookingDate: "2026-07-24", expectedDate: "2026-09-22", owner: "Priya Nair", note: "Includes 1% launch override" },
  { id: "CM-9003", client: "Rohan Mehta", project: "Parel Heights Tower A & B", developer: "Meridian Realty", unit: "A-2803 · 3 BHK", dealValue: 51500000, ratePct: 3.25, amount: 1673750, status: "Expected", bookingDate: "2026-07-29", expectedDate: "2026-09-15", owner: "Aditi Sharma" },
  { id: "CM-9004", client: "Kunal Desai", project: "Vertex Andheri West", developer: "Meridian Realty", unit: "Main-1102 · 3 BHK", dealValue: 42000000, ratePct: 2.75, amount: 1155000, status: "Paid", bookingDate: "2026-06-11", expectedDate: "2026-07-02", owner: "Karan Doshi" },
  { id: "CM-9005", client: "Anita Fernandes", project: "Greenscape Powai Enclave", developer: "Rustom Estates", unit: "D-1408 · 2 BHK", dealValue: 22400000, ratePct: 3.75, amount: 840000, status: "Paid", bookingDate: "2026-05-30", expectedDate: "2026-07-14", owner: "Aditi Sharma" },
  { id: "CM-9006", client: "Zara Kapadia", project: "Seabreeze Residences", developer: "Anantara Group", unit: "Main-2101 · 4 BHK", dealValue: 154000000, ratePct: 2.5, amount: 3850000, status: "Disputed", bookingDate: "2026-06-28", expectedDate: "2026-08-12", owner: "Priya Nair", note: "Attribution contested with developer in-house team" },
  { id: "CM-9007", client: "Harsh Vora", project: "The Crest Chembur", developer: "Rustom Estates", unit: "A-1801 · 3 BHK", dealValue: 34500000, ratePct: 3.0, amount: 1035000, status: "Expected", bookingDate: "2026-07-18", expectedDate: "2026-09-01", owner: "Aditi Sharma" },
];

export interface TeamMember {
  id: string;
  name: string;
  role: "Principal Broker" | "Sales Manager" | "Relationship Manager" | "NRI Desk" | "Analyst";
  region: string;
  leads: number;
  visits: number;
  closures: number;
  revenue: number;
  status: "Active" | "On Leave";
}

export const team: TeamMember[] = [
  { id: "T1", name: "Aditi Sharma", role: "Sales Manager", region: "South & Central Mumbai", leads: 46, visits: 21, closures: 6, revenue: 4820000, status: "Active" },
  { id: "T2", name: "Karan Doshi", role: "Relationship Manager", region: "Western Suburbs", leads: 38, visits: 17, closures: 4, revenue: 2610000, status: "Active" },
  { id: "T3", name: "Priya Nair", role: "NRI Desk", region: "Global · Gulf & SEA", leads: 24, visits: 9, closures: 3, revenue: 5390000, status: "Active" },
  { id: "T4", name: "Rahul Kadam", role: "Relationship Manager", region: "Navi Mumbai & Thane", leads: 31, visits: 14, closures: 2, revenue: 1180000, status: "On Leave" },
  { id: "T5", name: "Sneha Pillai", role: "Analyst", region: "Market Intelligence", leads: 0, visits: 0, closures: 0, revenue: 0, status: "Active" },
];

export interface Task {
  id: string;
  title: string;
  linked: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  owner: string;
  done: boolean;
}

export const tasks: Task[] = [
  { id: "TK-01", title: "Send revised cost sheet with 2% negotiation", linked: "Rohan Mehta · Parel Heights", due: "2026-07-30", priority: "High", owner: "Aditi Sharma", done: false },
  { id: "TK-02", title: "Confirm Saturday site-visit slot", linked: "Nikita Raval · Greenscape Powai", due: "2026-07-31", priority: "High", owner: "Karan Doshi", done: false },
  { id: "TK-03", title: "Upload KYC for NRI booking", linked: "Aarav Khanna · Aurum BKC One", due: "2026-08-01", priority: "Medium", owner: "Priya Nair", done: false },
  { id: "TK-04", title: "Escalate disputed commission CM-9006", linked: "Seabreeze Residences", due: "2026-08-02", priority: "High", owner: "Priya Nair", done: false },
  { id: "TK-05", title: "Refresh Thane micro-market pricing sheet", linked: "Market Intelligence", due: "2026-08-05", priority: "Low", owner: "Sneha Pillai", done: true },
  { id: "TK-06", title: "Quarterly channel-partner reconciliation", linked: "Meridian Realty", due: "2026-08-08", priority: "Medium", owner: "Aditi Sharma", done: false },
];

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  type: "lead" | "visit" | "inventory" | "commission" | "market";
  unread: boolean;
}

export const notifications: Notification[] = [
  { id: "N1", title: "New lead assigned", body: "Vikram Bhatia (4 BHK · Lower Parel) routed to you from the developer desk.", time: "2026-07-30T08:05:00", type: "lead", unread: true },
  { id: "N2", title: "Site visit confirmed", body: "Greenscape Powai — 01 Aug, 11:00 AM slot locked with the developer.", time: "2026-07-29T18:20:00", type: "visit", unread: true },
  { id: "N3", title: "Inventory alert", body: "Only 5 units left in Parel Heights Tower B 4 BHK band.", time: "2026-07-29T12:00:00", type: "inventory", unread: true },
  { id: "N4", title: "Commission approved", body: "CM-9002 (₹7.40 L) approved by Sunteck Horizon.", time: "2026-07-28T15:42:00", type: "commission", unread: false },
  { id: "N5", title: "Market signal", body: "Worli weighted average price up 1.8% QoQ; absorption steady.", time: "2026-07-28T09:10:00", type: "market", unread: false },
];

export const activityFeed = [
  { id: "A1", who: "Karan Doshi", what: "tagged a site visit for Nikita Raval at Greenscape Powai", when: "2026-07-29T16:05:00" },
  { id: "A2", who: "Priya Nair", what: "moved Aarav Khanna to Negotiation on Aurum BKC One", when: "2026-07-29T07:45:00" },
  { id: "A3", who: "Aditi Sharma", what: "added 3 new leads from the Lower Parel campaign", when: "2026-07-28T19:30:00" },
  { id: "A4", who: "Meridian Realty", what: "released 6 new units in Tower B floor band 42–58", when: "2026-07-28T11:12:00" },
  { id: "A5", who: "Karan Doshi", what: "closed Harbour Square Vashi T1-1204 · ₹1.32 Cr", when: "2026-07-26T18:40:00" },
];

export const opportunities = [
  { id: "OP-1", title: "Co-broke 4 BHK inventory — Parel Heights", partner: "Meridian Realty", type: "Co-broking", payout: "3.25% + 0.5% slab", units: 5, closing: "2026-08-31", note: "Developer seeking channel partners with HNI books." },
  { id: "OP-2", title: "NRI roadshow — Dubai, Sep 2026", partner: "RBN NRI Desk", type: "Event", payout: "Lead-share 60:40", units: 0, closing: "2026-09-12", note: "12 developers confirmed; 40 broker seats." },
  { id: "OP-3", title: "Bulk deal — 9,800 sq ft BKC floor", partner: "Kalpataru Vantage", type: "Bulk / Institutional", payout: "2% + 0.35% pre-lease", units: 4, closing: "2026-10-15", note: "GCC occupier mandate active." },
  { id: "OP-4", title: "Launch-phase override — Orchid Grand Thane", partner: "Sunteck Horizon", type: "Launch", payout: "4% + 1% override", units: 20, closing: "2026-08-20", note: "First 20 closures only." },
];
