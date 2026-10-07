import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { StatCard } from "@/components/app/StatCard";
import { AbsorptionChart, DemandSplitChart, PriceTrendChart, FunnelChart } from "@/components/market/MarketCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { microMarketStats, marketSignals } from "@/data/market";
import { formatIndianNumber } from "@/lib/format";

export const Route = createFileRoute("/app/intelligence")({
  head: () => ({
    meta: [
      { title: "Market Intelligence Terminal | RBN" },
      { name: "description", content: "Mumbai micro-market price movement, absorption, inventory and demand indicators." },
      { property: "og:title", content: "Market Intelligence Terminal — RBN" },
      { property: "og:description", content: "Quarterly Mumbai pricing, absorption and demand analytics for brokers." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: IntelligencePage,
});

function IntelligencePage() {
  return (
    <AppShell title="Market Intelligence" description="Mumbai Metropolitan Region · Q2 FY 2026 refresh">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="MMR weighted price" value="₹28,940 / sq ft" delta={2.1} hint="QoQ" />
        <StatCard label="Quarterly absorption" value="7,310 units" delta={6.0} hint="vs Q1 26" />
        <StatCard label="Unsold inventory" value="10.4 months" delta={-8} hint="improving" />
        <StatCard label="New launches" value="7,900 units" delta={6.8} hint="Q2 26" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <PriceTrendChart />
        <AbsorptionChart />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <DemandSplitChart />
        <FunnelChart />
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <CardHeader className="p-5">
          <CardTitle className="text-base">Micro-market scorecard</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[880px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Micro-market</TableHead>
                  <TableHead>₹/sq ft</TableHead>
                  <TableHead>QoQ</TableHead>
                  <TableHead>YoY</TableHead>
                  <TableHead>Absorption</TableHead>
                  <TableHead>Unsold (months)</TableHead>
                  <TableHead>Launches</TableHead>
                  <TableHead className="w-40">Demand index</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {microMarketStats.map((m) => (
                  <TableRow key={m.market}>
                    <TableCell className="font-medium">{m.market}</TableCell>
                    <TableCell>{formatIndianNumber(m.avgPsf)}</TableCell>
                    <TableCell className="text-success">+{m.qoq}%</TableCell>
                    <TableCell className="text-success">+{m.yoy}%</TableCell>
                    <TableCell>{formatIndianNumber(m.absorption)}</TableCell>
                    <TableCell>{m.unsoldMonths}</TableCell>
                    <TableCell>{m.launches}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={m.demandIndex} className="h-2" />
                        <span className="w-8 text-xs font-semibold">{m.demandIndex}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {marketSignals.map((s) => (
          <Card key={s.title} className="hover-lift">
            <CardContent className="p-5">
              <Badge variant={s.impact === "Positive" ? "default" : "secondary"}>{s.impact}</Badge>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
