import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Bookmark, GitCompare, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { microMarkets, possessionOptions, projects, propertyTypes } from "@/data/projects";
import { formatINR, formatIndianNumber } from "@/lib/format";

export const Route = createFileRoute("/app/projects")({
  head: () => ({
    meta: [
      { title: "Project Discovery | Real-Estate Business Network" },
      { name: "description", content: "Advanced discovery across Mumbai inventory with saved projects and side-by-side comparison." },
      { property: "og:title", content: "Project Discovery — RBN" },
      { property: "og:description", content: "Filter, save and compare Mumbai projects inside the broker workspace." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DiscoveryPage,
});

const ANY = "any";

function DiscoveryPage() {
  const [q, setQ] = useState("");
  const [market, setMarket] = useState(ANY);
  const [type, setType] = useState(ANY);
  const [possession, setPossession] = useState(ANY);
  const [saved, setSaved] = useState<string[]>(["p1", "p4"]);
  const [compare, setCompare] = useState<string[]>([]);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (!q || `${p.name} ${p.developer} ${p.microMarket}`.toLowerCase().includes(q.toLowerCase())) &&
          (market === ANY || p.microMarket === market) &&
          (type === ANY || p.type === type) &&
          (possession === ANY || p.possession === possession),
      ),
    [q, market, type, possession],
  );

  const toggleCompare = (id: string) =>
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) {
        toast.warning("Compare up to 3 projects at a time");
        return prev;
      }
      return [...prev, id];
    });

  const compared = projects.filter((p) => compare.includes(p.id));
  const savedProjects = projects.filter((p) => saved.includes(p.id));

  return (
    <AppShell
      title="Project Discovery"
      description={`${filtered.length} projects match your filters`}
      actions={
        <Button
          variant="outline"
          onClick={() => setSaved(filtered.map((p) => p.id))}
          disabled={filtered.length === 0}
        >
          <Bookmark className="mr-2 h-4 w-4" /> Save results
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search inventory" className="pl-9" aria-label="Search projects" />
        </div>
        <Select value={market} onValueChange={setMarket}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>All micro-markets</SelectItem>
            {microMarkets.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>All property types</SelectItem>
            {propertyTypes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={possession} onValueChange={setPossession}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Any possession</SelectItem>
            {possessionOptions.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
          <TabsTrigger value="saved">Saved ({savedProjects.length})</TabsTrigger>
          <TabsTrigger value="compare">Compare ({compare.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-5">
          {filtered.length === 0 ? (
            <Empty label="No projects match these filters." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  selectable
                  selected={compare.includes(p.id)}
                  onSelect={toggleCompare}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="mt-5">
          {savedProjects.length === 0 ? (
            <Empty label="Nothing saved yet. Save results to build your shortlist." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {savedProjects.map((p) => (
                <div key={p.id} className="relative">
                  <ProjectCard project={p} selectable selected={compare.includes(p.id)} onSelect={toggleCompare} />
                  <Button
                    size="icon"
                    variant="secondary"
                    aria-label={`Remove ${p.name} from saved`}
                    className="absolute right-2 top-2"
                    onClick={() => setSaved((s) => s.filter((x) => x !== p.id))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="compare" className="mt-5">
          {compared.length < 2 ? (
            <Empty label="Select at least two projects using the Compare checkbox." />
          ) : (
            <Card className="overflow-hidden p-0">
              <CardContent className="overflow-x-auto p-0">
                <table className="w-full min-w-[720px] text-sm">
                  <thead>
                    <tr className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="px-4 py-3">Attribute</th>
                      {compared.map((p) => (
                        <th key={p.id} className="px-4 py-3">{p.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {([
                      ["Developer", (p: typeof compared[number]) => p.developer],
                      ["Micro-market", (p: typeof compared[number]) => p.microMarket],
                      ["Configurations", (p: typeof compared[number]) => p.configs.join(", ")],
                      ["Price band", (p: typeof compared[number]) => `${formatINR(p.priceMin)} – ${formatINR(p.priceMax)}`],
                      ["Rate (₹/sq ft)", (p: typeof compared[number]) => formatIndianNumber(p.pricePerSqft)],
                      ["Possession", (p: typeof compared[number]) => p.possession],
                      ["RERA", (p: typeof compared[number]) => `${p.reraStatus} · ${p.reraId}`],
                      ["Availability", (p: typeof compared[number]) => `${p.availableUnits}/${p.totalUnits}`],
                      ["Velocity", (p: typeof compared[number]) => p.velocity],
                      ["Broker payout", (p: typeof compared[number]) => `${p.commissionPct}%`],
                      ["Payout cycle", (p: typeof compared[number]) => p.payoutCycle],
                    ] as const).map(([label, fn]) => (
                      <tr key={label} className="border-t border-border">
                        <td className="px-4 py-3 font-medium text-muted-foreground">{label}</td>
                        {compared.map((p) => (
                          <td key={p.id} className="px-4 py-3">{fn(p)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
          {compare.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <GitCompare className="h-4 w-4 text-muted-foreground" />
              {compared.map((p) => (
                <Badge key={p.id} variant="secondary" className="gap-1">
                  {p.name}
                  <button onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.name} from compare`}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={() => setCompare([])}>Clear</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-border p-14 text-center text-sm text-muted-foreground">
      {label}
    </div>
  );
}
