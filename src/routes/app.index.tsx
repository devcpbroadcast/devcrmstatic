import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  CalendarCheck,
  Building2,
  Wallet,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { StatCard } from "@/components/app/StatCard";
import { FunnelChart, PriceTrendChart } from "@/components/market/MarketCharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { activityFeed, commissions, leads, siteVisits, tasks } from "@/data/crm";
import { marketSignals } from "@/data/market";
import { formatINR, formatDate, formatDateTime, initials } from "@/lib/format";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Broker Dashboard | Real-Estate Business Network" },
      { name: "description", content: "Pipeline, site visits, live projects and expected commissions in one Mumbai broker workspace." },
      { property: "og:title", content: "Broker Dashboard — RBN" },
      { property: "og:description", content: "KPIs, funnel, tasks and market intelligence for Mumbai brokers." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const activeLeads = leads.filter((l) => !["Booked", "Lost"].includes(l.stage)).length;
  const upcoming = siteVisits.filter((v) => v.status === "Upcoming").length;
  const expected = commissions
    .filter((c) => c.status !== "Paid" && c.status !== "Disputed")
    .reduce((s, c) => s + c.amount, 0);

  return (
    <AppShell
      title="Overview"
      description="Thursday, 30 July 2026 · Mumbai desk"
      actions={
        <>
          <Button asChild variant="outline">
            <Link to="/app/visits">Tag site visit</Link>
          </Button>
          <Button asChild>
            <Link to="/app/leads">Add lead</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active leads" value={String(activeLeads)} delta={12} hint="vs last month" icon={<Users className="h-4 w-4" />} />
        <StatCard label="Scheduled visits" value={String(upcoming)} delta={8} hint="next 7 days" icon={<CalendarCheck className="h-4 w-4" />} />
        <StatCard label="Live projects" value="8" delta={0} hint="across 8 micro-markets" icon={<Building2 className="h-4 w-4" />} />
        <StatCard label="Expected commissions" value={formatINR(expected)} delta={-4} hint="pipeline value" icon={<Wallet className="h-4 w-4" />} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <FunnelChart />
        <PriceTrendChart />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Recent activity</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/notifications">
                All <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityFeed.map((a) => (
              <div key={a.id} className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  {initials(a.who)}
                </span>
                <div className="min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.what}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(a.when)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Today's tasks</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/tasks">All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.filter((t) => !t.done).slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-start gap-3 rounded-md border border-border p-3">
                <Checkbox aria-label={`Complete ${t.title}`} className="mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug">{t.title}</p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">{t.linked}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Badge variant={t.priority === "High" ? "destructive" : "secondary"} className="text-[0.65rem]">
                      {t.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(t.due)}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming site visits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {siteVisits.filter((v) => v.status === "Upcoming").map((v) => (
              <div key={v.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{v.leadName}</p>
                  <p className="truncate text-xs text-muted-foreground">{v.project} · {v.microMarket}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-medium">{formatDate(v.date)}</p>
                  <p className="text-xs text-muted-foreground">{v.slot}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Market intelligence</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/intelligence">Terminal</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {marketSignals.slice(0, 3).map((s) => (
              <div key={s.title} className="flex gap-3 rounded-md border border-border p-3">
                {s.impact === "Positive" ? (
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                ) : (
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug">{s.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
