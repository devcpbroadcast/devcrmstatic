import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  LineChart,
  Users,
  Wallet,
  ShieldCheck,
  Globe2,
  CalendarCheck,
  Layers,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { PublicShell } from "@/components/site/PublicShell";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projects } from "@/data/projects";
import { microMarketStats } from "@/data/market";
import { formatIndianNumber } from "@/lib/format";
import heroImage from "@/assets/mumbai-skyline.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Real-Estate Business Network — Mumbai's Broker & Developer Platform" },
      {
        name: "description",
        content:
          "One network. Every opportunity. Mumbai's connected platform for broker marketplace, market intelligence, CRM, site visits and commission settlement.",
      },
      { property: "og:title", content: "Real-Estate Business Network — one network. every opportunity." },
      {
        property: "og:description",
        content:
          "Marketplace, Bloomberg-style intelligence, broker CRM and commission infrastructure for Mumbai real estate.",
      },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    icon: Building2,
    title: "Broker Marketplace",
    body: "A Dubai-style, verified inventory marketplace where developers publish live stock and brokers transact with clear attribution.",
  },
  {
    icon: LineChart,
    title: "Market Intelligence",
    body: "Micro-market pricing, absorption, unsold inventory and demand indicators — updated like a trading terminal, not a brochure.",
  },
  {
    icon: Users,
    title: "Broker CRM",
    body: "Leads, stages, allocation, follow-ups and team performance built for Indian channel-partner workflows.",
  },
  {
    icon: Wallet,
    title: "Settlement Infrastructure",
    body: "Site-visit tagging, inventory locks and a commission ledger from expected to paid — with dispute trails.",
  },
];

const searchTabs = ["Buy", "Invest", "Lease"] as const;

function Home() {
  const featured = projects.filter((p) => p.featured);
  const [tab, setTab] = useState<(typeof searchTabs)[number]>("Buy");
  const [keyword, setKeyword] = useState("");
  const [market, setMarket] = useState("all");

  return (
    <PublicShell>
      {/* Hero / live map */}
      <section className="bg-surface px-4 pb-12 pt-8 sm:px-6 lg:pb-16 lg:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="map-grid relative overflow-hidden rounded-[2rem] border border-border p-6 shadow-[var(--shadow-float)] sm:p-10 lg:min-h-[34rem] lg:p-12">
            <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[46%] overflow-hidden lg:block">
              <img src={heroImage} alt="Mumbai skyline at dusk" className="h-full w-full object-cover opacity-25 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/40 to-transparent" />
            </div>
            {[
              "right-[18%] top-[18%]",
              "right-[30%] top-[40%]",
              "right-[10%] top-[58%]",
              "right-[38%] bottom-[16%]",
            ].map((position) => (
              <span key={position} className={`absolute hidden h-4 w-4 rounded-full border-4 border-background bg-primary shadow-md lg:block ${position}`} />
            ))}
            <div className="relative max-w-2xl">
              <p className="text-eyebrow">Mumbai · live network intelligence</p>
              <h1 className="mt-4 max-w-xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                Find the opportunity behind every Mumbai address.
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                One connected operating platform for verified inventory, demand signals, broker workflows and commission certainty.
              </p>
              <div className="mt-7 inline-flex rounded-full bg-charcoal p-1">
                {searchTabs.map((t) => (
                  <Button
                    key={t}
                    type="button"
                    variant="ghost"
                    onClick={() => setTab(t)}
                    className={`h-9 rounded-full px-5 font-display text-sm font-bold ${tab === t ? "bg-background text-foreground hover:bg-background" : "text-charcoal-foreground hover:bg-charcoal-foreground/10 hover:text-charcoal-foreground"}`}
                  >
                    {t}
                  </Button>
                ))}
              </div>
              <div className="mt-3 flex max-w-2xl flex-col gap-2 rounded-2xl border border-border bg-background p-2 shadow-[var(--shadow-float)] sm:flex-row sm:items-center">
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search project, developer or locality" aria-label="Search keyword" className="h-11 border-0 pl-9 shadow-none focus-visible:ring-0" />
                </div>
                <Select value={market} onValueChange={setMarket}>
                  <SelectTrigger className="h-11 w-full border-0 bg-muted sm:w-44" aria-label="Micro-market"><SelectValue placeholder="Micro-market" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All micro-markets</SelectItem>
                    {microMarketStats.map((m) => <SelectItem key={m.market} value={m.market}>{m.market}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button asChild className="h-11 rounded-xl bg-charcoal px-6 font-display font-bold text-charcoal-foreground hover:bg-charcoal/90">
                  <Link to="/projects"><Search className="mr-2 h-4 w-4" /> Search</Link>
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Try “2 BHK in Powai” or browse by micro-market.</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["Mumbai", "Lower Parel", "Worli", "BKC", "Powai", "Thane West"].map((place) => (
                  <Button key={place} type="button" variant={place === "Mumbai" ? "default" : "secondary"} size="sm" className="rounded-full" onClick={() => setMarket(place === "Mumbai" ? "all" : place)}>
                    {place}
                  </Button>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full bg-gradient-primary px-7 font-display font-bold">
                  <Link to="/projects">Explore live inventory <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
                </Button>
                <Link to="/register" className="inline-flex items-center gap-1 text-sm font-bold text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary">Join the network <ArrowRight className="h-4 w-4" /></Link>
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-primary">connect. collaborate. close.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              { k: "Live inventory", v: formatIndianNumber(18420), s: "units mapped across MMR", tone: "bg-accent" },
              { k: "RERA-linked projects", v: "41,868", s: "records available for diligence", tone: "bg-primary/10" },
              { k: "Commissions settled", v: "₹214 Cr", s: "tracked in FY 25–26", tone: "bg-background" },
            ].map((m) => (
              <div key={m.k} className={`relative min-h-32 rounded-2xl border border-border px-6 py-5 ${m.tone}`}>
                <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-foreground/60" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{m.k}</p>
                <p className="mt-2 font-display text-3xl font-extrabold tracking-tight">{m.v}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Value proposition */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <p className="text-eyebrow">Why the network exists</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Mumbai's transaction stack is fragmented. We consolidate it.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Inventory lives in spreadsheets, leads in WhatsApp, attribution in arguments and
              commissions in follow-ups. The network replaces that with one system of record shared
              by developers, channel partners and their teams.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, t: "Verified attribution", d: "Every lead and site visit carries a tag code, so payouts are never contested." },
              { icon: Layers, t: "Live inventory truth", d: "Tower, floor band, carpet area and availability sync from the developer desk." },
              { icon: Globe2, t: "NRI-ready", d: "Gulf and SEA desks with time-zone aware follow-ups and remote closure workflows." },
              { icon: CalendarCheck, t: "Operational cadence", d: "Tasks, visits and follow-ups drive the funnel instead of memory." },
            ].map((f) => (
              <Card key={f.t} className="hover-lift">
                <CardContent className="p-5">
                  <f.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-base font-semibold">{f.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <div className="min-w-0">
              <p className="text-eyebrow">Featured Mumbai projects</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Live inventory, verified payouts</h2>
            </div>
            <Button asChild variant="outline" className="shrink-0 rounded-full border-2 font-display font-bold hover:border-primary hover:text-primary">
              <Link to="/projects">All projects</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Four pillars */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-eyebrow">The platform</p>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Four systems. One network.
        </h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div key={p.title} className="bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                  <p.icon className="h-4.5 w-4.5" />
                </span>
                <span className="font-display text-sm font-bold text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-charcoal py-16 text-charcoal-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          {[
            {
              t: "For brokers & channel partners",
              points: [
                "Access verified inventory across 10+ Mumbai micro-markets",
                "Tag site visits digitally and protect your attribution",
                "Run your team, leads and follow-ups in one CRM",
                "Track every rupee from expected to paid commission",
              ],
              cta: { label: "Join as broker", to: "/register" },
            },
            {
              t: "For developers",
              points: [
                "Distribute inventory to 4,180+ verified channel partners",
                "See real demand signals before you price the next phase",
                "Zero-dispute attribution with tagged visits and lead trails",
                "Structured payout slabs, overrides and launch incentives",
              ],
              cta: { label: "Partner with us", to: "/solutions" },
            },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-charcoal-foreground/15 p-7">
              <h3 className="text-2xl font-bold">{b.t}</h3>
              <ul className="mt-5 space-y-3">
                {b.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-charcoal-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 rounded-full bg-gradient-primary px-6 font-display font-bold">
                <Link to={b.cta.to}>{b.cta.label}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Intelligence preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <p className="text-eyebrow">Market intelligence</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Mumbai micro-markets, at a glance</h2>
          </div>
          <Button asChild variant="outline" className="shrink-0 rounded-full border-2 font-display font-bold hover:border-primary hover:text-primary">
            <Link to="/">Open terminal</Link>
          </Button>
        </div>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Micro-market</th>
                <th className="px-4 py-3 font-semibold">Avg ₹/sq ft</th>
                <th className="px-4 py-3 font-semibold">QoQ</th>
                <th className="px-4 py-3 font-semibold">YoY</th>
                <th className="px-4 py-3 font-semibold">Absorption (units)</th>
                <th className="px-4 py-3 font-semibold">Demand index</th>
              </tr>
            </thead>
            <tbody>
              {microMarketStats.slice(0, 6).map((m) => (
                <tr key={m.market} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{m.market}</td>
                  <td className="px-4 py-3">{formatIndianNumber(m.avgPsf)}</td>
                  <td className="px-4 py-3 font-semibold text-success">+{m.qoq}%</td>
                  <td className="px-4 py-3 font-semibold text-success">+{m.yoy}%</td>
                  <td className="px-4 py-3">{formatIndianNumber(m.absorption)}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                      {m.demandIndex}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <div className="grid items-center gap-6 rounded-3xl border border-border bg-accent p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
              Join the network powering Mumbai's next 10,000 closures
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Free for verified brokers during the Mumbai launch phase. Developers onboard inventory
              with a dedicated network manager.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-gradient-primary px-7 font-display font-bold">
              <Link to="/register">Join the Network</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-2 px-7 font-display font-bold">
              <Link to="/">See the dashboard</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

