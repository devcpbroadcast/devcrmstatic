import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Users, Globe2, Landmark, Check } from "lucide-react";
import { PublicShell } from "@/components/site/PublicShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions for Brokers, Developers, NRI & Enterprise | RBN" },
      {
        name: "description",
        content:
          "Purpose-built modules for channel partners, developers, the NRI network and enterprise real-estate teams operating in Mumbai.",
      },
      { property: "og:title", content: "Solutions — Real-Estate Business Network" },
      {
        property: "og:description",
        content: "Broker marketplace, developer distribution, NRI desk and enterprise deployments.",
      },
    ],
  }),
  component: SolutionsPage,
});

const sections = [
  {
    id: "broker",
    icon: Users,
    title: "Brokers & Channel Partners",
    lead: "Run your entire desk — sourcing, pipeline, visits and payouts — on one network.",
    features: [
      "Verified inventory across 10+ Mumbai micro-markets with live availability",
      "Digital site-visit tagging that protects attribution end to end",
      "CRM with stages, allocation, follow-ups and team performance",
      "Commission ledger from expected to paid, with dispute trails",
      "Co-broking marketplace to monetise inventory you cannot service",
    ],
    stat: ["4,180+", "verified brokers on the network"],
  },
  {
    id: "developer",
    icon: Building2,
    title: "Developers",
    lead: "Distribution, demand signals and clean attribution in a single desk.",
    features: [
      "Publish tower, floor-band and carpet-level inventory to the network",
      "Structured payout slabs, launch overrides and spot incentives",
      "Real-time enquiry, visit and conversion analytics per micro-market",
      "Channel-partner scorecards and empanelment workflows",
      "Zero-dispute attribution with tagged visits and lead trails",
    ],
    stat: ["18,420", "units mapped across MMR"],
  },
  {
    id: "nri",
    icon: Globe2,
    title: "NRI Network",
    lead: "Serve Gulf, SEA, UK and US buyers with a remote-first closure workflow.",
    features: [
      "Time-zone aware follow-up scheduling and video walkthroughs",
      "FEMA, repatriation and NRE/NRO documentation checklists",
      "Curated investment-grade shortlists with yield estimates",
      "Dubai, Singapore and London roadshow calendar",
      "Local representation for registration and possession",
    ],
    stat: ["31%", "YoY growth in Gulf enquiries"],
  },
  {
    id: "enterprise",
    icon: Landmark,
    title: "Enterprise & Institutional",
    lead: "For large brokerages, IPCs, family offices and developer platforms.",
    features: [
      "Multi-team hierarchies with role-based access and lead routing",
      "Bulk and institutional deal rooms with document workflows",
      "Custom market intelligence packs and comparables exports",
      "API-ready data model for internal BI and finance systems",
      "Dedicated network manager and quarterly business reviews",
    ],
    stat: ["₹214 Cr", "commissions settled FY 25–26"],
  },
];

function SolutionsPage() {
  return (
    <PublicShell>
      <div className="border-b border-border bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-eyebrow">Solutions</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            One network, four ways to operate
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            The same underlying inventory, intelligence and settlement rails — configured for the
            role you play in the Mumbai market.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Tabs defaultValue="broker">
          <TabsList className="flex-wrap">
            {sections.map((s) => (
              <TabsTrigger key={s.id} value={s.id}>
                {s.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          {sections.map((s) => (
            <TabsContent key={s.id} value={s.id} className="mt-6">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <div>
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-accent text-accent-foreground">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{s.title}</h2>
                  <p className="mt-2 text-muted-foreground">{s.lead}</p>
                  <ul className="mt-6 space-y-3">
                    {s.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button asChild>
                      <Link to="/register">Get started</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/support">Talk to the network team</Link>
                    </Button>
                  </div>
                </div>
                <Card className="h-fit border-primary/25 bg-accent/50">
                  <CardContent className="p-7">
                    <p className="font-display text-4xl font-bold text-primary">{s.stat[0]}</p>
                    <p className="mt-2 text-sm text-accent-foreground">{s.stat[1]}</p>
                    <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                      {["Onboarding in 48 hours", "No setup fee during Mumbai launch", "Dedicated network manager"].map((x) => (
                        <p key={x} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" /> {x}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PublicShell>
  );
}
