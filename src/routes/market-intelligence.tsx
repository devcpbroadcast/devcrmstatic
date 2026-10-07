import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { PublicShell } from "@/components/site/PublicShell";
import { AbsorptionChart, DemandSplitChart, PriceTrendChart } from "@/components/market/MarketCharts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { microMarketStats, marketSignals } from "@/data/market";
import { formatIndianNumber } from "@/lib/format";

export const Route = createFileRoute("/market-intelligence")({
  head: () => ({
    meta: [
      { title: "Mumbai Real-Estate Market Intelligence | RBN" },
      {
        name: "description",
        content:
          "Micro-market price movement, absorption, unsold inventory and demand indicators across Mumbai — Lower Parel, Worli, BKC, Powai, Thane and Navi Mumbai.",
      },
      { property: "og:title", content: "Mumbai Market Intelligence — Real-Estate Business Network" },
      {
        property: "og:description",
        content: "Bloomberg-style intelligence for Mumbai real estate: pricing, absorption and demand signals.",
      },
    ],
  }),
  component: MarketIntelligencePage,
});

function MarketIntelligencePage() {
  return (
    <PublicShell>
      <div className="border-b border-border bg-charcoal py-12 text-charcoal-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-eyebrow">Intelligence terminal</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Mumbai micro-market intelligence
          </h1>
          <p className="mt-3 max-w-2xl text-charcoal-foreground/75">
            Pricing, absorption, unsold inventory and demand signals — refreshed quarterly from
            registration data, developer feeds and network transactions. Sample data shown.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <PriceTrendChart />
          <AbsorptionChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <DemandSplitChart />
          <Card className="min-w-0 overflow-hidden">
            <CardContent className="min-w-0 p-0">
              <div className="w-full max-w-full overflow-x-auto">

                <table className="w-full min-w-[640px] text-sm">
                  <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">Micro-market</th>
                      <th className="px-4 py-3">₹/sq ft</th>
                      <th className="px-4 py-3">QoQ</th>
                      <th className="px-4 py-3">YoY</th>
                      <th className="px-4 py-3">Unsold (months)</th>
                      <th className="px-4 py-3">Demand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {microMarketStats.map((m) => (
                      <tr key={m.market} className="border-t border-border">
                        <td className="px-4 py-3 font-medium">{m.market}</td>
                        <td className="px-4 py-3">{formatIndianNumber(m.avgPsf)}</td>
                        <td className="px-4 py-3 text-success">+{m.qoq}%</td>
                        <td className="px-4 py-3 text-success">+{m.yoy}%</td>
                        <td className="px-4 py-3">{m.unsoldMonths}</td>
                        <td className="px-4 py-3">
                          <Badge variant={m.demandIndex > 88 ? "default" : "secondary"}>{m.demandIndex}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight">Signals this quarter</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {marketSignals.map((s) => (
              <Card key={s.title} className="hover-lift">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2">
                    {s.impact === "Positive" ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    )}
                    <Badge variant="outline">{s.impact}</Badge>
                  </div>
                  <h3 className="mt-3 font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-accent p-6">
          <p className="min-w-0 text-sm font-medium">
            Full terminal — unit-level comparables, developer scorecards and demand heatmaps — is
            available inside the network.
          </p>
          <Button asChild>
            <Link to="/app/intelligence">Open in dashboard</Link>
          </Button>
        </div>
      </div>
    </PublicShell>
  );
}
