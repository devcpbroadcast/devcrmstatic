import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/site/PublicShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Network | Real-Estate Business Network" },
      {
        name: "description",
        content:
          "Why we are building one connected operating platform for Mumbai real estate — marketplace, intelligence, CRM and settlement.",
      },
      { property: "og:title", content: "About — Real-Estate Business Network" },
      {
        property: "og:description",
        content: "Building the transaction infrastructure for India's largest real-estate market.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PublicShell>
      <div className="border-b border-border bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-eyebrow">About</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Building the transaction infrastructure for Indian real estate
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            We start in Mumbai — the deepest, most complex market in the country. If the network
            works here, it works everywhere.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6">
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">The problem</h2>
            <p className="mt-3 text-muted-foreground">
              India transacts roughly ₹5 lakh crore of primary residential real estate a year, and
              almost all of it moves through relationships that are not systematised. Inventory sits
              in spreadsheets, leads in WhatsApp, attribution in arguments and commissions in
              follow-ups. Buyers experience it as opacity; brokers experience it as risk.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Our approach</h2>
            <p className="mt-3 text-muted-foreground">
              Rather than another listing portal, we are assembling the four systems a real-estate
              business actually runs on — a verified marketplace, a market-intelligence terminal, a
              CRM tuned to Indian channel-partner workflows, and settlement rails for visits,
              inventory and commissions — into one network with a shared record of truth.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Principles</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Attribution is sacred", "Whoever sourced the buyer gets paid. The system remembers, so people do not have to argue."],
              ["Data over adjectives", "Every claim about a micro-market should be traceable to a number."],
              ["Built for operators", "Designed with brokers who close deals daily, not for a demo audience."],
              ["Compliance by default", "RERA fields, documentation trails and clean audit history from day one."],
            ].map(([t, d]) => (
              <Card key={t} className="hover-lift">
                <CardContent className="p-5">
                  <h3 className="font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["2026", "Mumbai launch"],
            ["4,180+", "verified brokers"],
            ["10", "micro-markets live"],
            ["₹214 Cr", "commissions settled"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-lg border border-border bg-card p-6">
              <p className="font-display text-3xl font-bold text-primary">{v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </section>

        <section className="rounded-lg border border-border bg-charcoal p-8 text-charcoal-foreground sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight">Roadmap</h2>
          <ol className="mt-6 space-y-5">
            {[
              ["Now", "Mumbai marketplace, CRM, site-visit tagging and commission ledger"],
              ["Q4 2026", "Unit-level comparables, developer scorecards, deal rooms"],
              ["2027", "Pune, Bengaluru and NCR networks; institutional bulk desk"],
              ["Beyond", "Settlement automation, escrow partners and financing rails"],
            ].map(([when, what]) => (
              <li key={when} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                <span className="w-20 shrink-0 text-sm font-bold text-primary">{when}</span>
                <span className="text-sm text-charcoal-foreground/80">{what}</span>
              </li>
            ))}
          </ol>
          <Button asChild className="mt-8">
            <Link to="/register">Join the Network</Link>
          </Button>
        </section>
      </div>
    </PublicShell>
  );
}
