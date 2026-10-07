export interface MicroMarketStat {
  market: string;
  avgPsf: number;
  qoq: number;
  yoy: number;
  absorption: number;
  unsoldMonths: number;
  demandIndex: number;
  launches: number;
}

export const microMarketStats: MicroMarketStat[] = [
  { market: "Lower Parel", avgPsf: 48500, qoq: 1.9, yoy: 8.4, absorption: 612, unsoldMonths: 14, demandIndex: 82, launches: 4 },
  { market: "Worli", avgPsf: 71000, qoq: 1.8, yoy: 9.6, absorption: 288, unsoldMonths: 18, demandIndex: 76, launches: 2 },
  { market: "Bandra East (BKC)", avgPsf: 39500, qoq: 0.9, yoy: 6.1, absorption: 431, unsoldMonths: 11, demandIndex: 88, launches: 3 },
  { market: "Powai", avgPsf: 27800, qoq: 2.4, yoy: 11.2, absorption: 895, unsoldMonths: 8, demandIndex: 91, launches: 6 },
  { market: "Andheri West", avgPsf: 31200, qoq: 1.1, yoy: 5.8, absorption: 742, unsoldMonths: 10, demandIndex: 79, launches: 5 },
  { market: "Thane West", avgPsf: 16400, qoq: 2.9, yoy: 13.5, absorption: 2184, unsoldMonths: 7, demandIndex: 94, launches: 12 },
  { market: "Chembur", avgPsf: 24100, qoq: 1.4, yoy: 7.2, absorption: 638, unsoldMonths: 9, demandIndex: 84, launches: 4 },
  { market: "Navi Mumbai — Vashi", avgPsf: 19600, qoq: 3.2, yoy: 15.1, absorption: 1520, unsoldMonths: 6, demandIndex: 96, launches: 9 },
];

export const priceTrend = [
  { quarter: "Q3 24", lowerParel: 43800, worli: 63500, powai: 24100, thane: 13900 },
  { quarter: "Q4 24", lowerParel: 44600, worli: 64900, powai: 24800, thane: 14300 },
  { quarter: "Q1 25", lowerParel: 45300, worli: 66200, powai: 25400, thane: 14800 },
  { quarter: "Q2 25", lowerParel: 45900, worli: 67100, powai: 25900, thane: 15200 },
  { quarter: "Q3 25", lowerParel: 46600, worli: 68300, powai: 26400, thane: 15600 },
  { quarter: "Q4 25", lowerParel: 47200, worli: 69100, powai: 26900, thane: 15900 },
  { quarter: "Q1 26", lowerParel: 47800, worli: 69800, powai: 27300, thane: 16100 },
  { quarter: "Q2 26", lowerParel: 48500, worli: 71000, powai: 27800, thane: 16400 },
];

export const absorptionTrend = [
  { quarter: "Q3 24", launched: 5200, absorbed: 4300 },
  { quarter: "Q4 24", launched: 6100, absorbed: 5200 },
  { quarter: "Q1 25", launched: 5800, absorbed: 5600 },
  { quarter: "Q2 25", launched: 6400, absorbed: 5900 },
  { quarter: "Q3 25", launched: 7100, absorbed: 6200 },
  { quarter: "Q4 25", launched: 6800, absorbed: 6700 },
  { quarter: "Q1 26", launched: 7400, absorbed: 6900 },
  { quarter: "Q2 26", launched: 7900, absorbed: 7310 },
];

export const demandSplit = [
  { segment: "End-user", value: 54 },
  { segment: "Investor", value: 27 },
  { segment: "NRI", value: 13 },
  { segment: "Institutional", value: 6 },
];

export const funnel = [
  { stage: "Leads", value: 248 },
  { stage: "Qualified", value: 164 },
  { stage: "Site Visits", value: 92 },
  { stage: "Negotiation", value: 41 },
  { stage: "Booked", value: 17 },
];

export const marketSignals = [
  { title: "Thane West absorption at 7-month low inventory", impact: "Positive", detail: "Ghodbunder corridor launches clearing faster than supply; pricing power shifting to developers." },
  { title: "Worli ticket sizes compress at the ₹9–12 Cr band", impact: "Watch", detail: "Buyers trading down one configuration; expect longer negotiation cycles." },
  { title: "BKC office pre-leasing up 22% YoY", impact: "Positive", detail: "GCC mandates driving Grade-A take-up; broker payouts trending higher on pre-lease assists." },
  { title: "NRI enquiry volume up 31% from Gulf markets", impact: "Positive", detail: "Rupee levels and Atal Setu connectivity narrative supporting Navi Mumbai interest." },
];
