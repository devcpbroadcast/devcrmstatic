import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LayoutGrid, List, Map, Search, SlidersHorizontal, X } from "lucide-react";
import { PublicShell } from "@/components/site/PublicShell";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  configurations,
  developers,
  microMarkets,
  possessionOptions,
  projects,
  propertyTypes,
  reraStatuses,
} from "@/data/projects";
import { formatINR } from "@/lib/format";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Mumbai Project Catalogue | Real-Estate Business Network" },
      {
        name: "description",
        content:
          "Search verified Mumbai projects by micro-market, property type, configuration, budget, possession, developer and RERA status.",
      },
      { property: "og:title", content: "Mumbai Project Catalogue — Real-Estate Business Network" },
      {
        property: "og:description",
        content: "Filter live Mumbai inventory across Lower Parel, Worli, BKC, Powai, Thane and Navi Mumbai.",
      },
    ],
  }),
  component: ProjectsPage,
});

const ANY = "any";

function ProjectsPage() {
  const [q, setQ] = useState("");
  const [market, setMarket] = useState(ANY);
  const [type, setType] = useState(ANY);
  const [config, setConfig] = useState(ANY);
  const [possession, setPossession] = useState(ANY);
  const [developer, setDeveloper] = useState(ANY);
  const [rera, setRera] = useState(ANY);
  const [budget, setBudget] = useState<number[]>([250000000]);
  const [view, setView] = useState<"grid" | "list" | "map">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(
    () =>
      projects.filter((p) => {
        const text = `${p.name} ${p.developer} ${p.microMarket} ${p.address}`.toLowerCase();
        return (
          (!q || text.includes(q.toLowerCase())) &&
          (market === ANY || p.microMarket === market) &&
          (type === ANY || p.type === type) &&
          (config === ANY || p.configs.includes(config)) &&
          (possession === ANY || p.possession === possession) &&
          (developer === ANY || p.developer === developer) &&
          (rera === ANY || p.reraStatus === rera) &&
          p.priceMin <= budget[0]
        );
      }),
    [q, market, type, config, possession, developer, rera, budget],
  );

  const activeFilters = [market, type, config, possession, developer, rera].filter((v) => v !== ANY).length;

  const reset = () => {
    setQ("");
    setMarket(ANY);
    setType(ANY);
    setConfig(ANY);
    setPossession(ANY);
    setDeveloper(ANY);
    setRera(ANY);
    setBudget([250000000]);
  };

  const filterFields = (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <Field label="Micro-market" value={market} onChange={setMarket} options={[...microMarkets]} anyLabel="All Mumbai" />
      <Field label="Property type" value={type} onChange={setType} options={[...propertyTypes]} anyLabel="All types" />
      <Field label="Configuration" value={config} onChange={setConfig} options={[...configurations]} anyLabel="Any config" />
      <Field label="Possession" value={possession} onChange={setPossession} options={[...possessionOptions]} anyLabel="Any timeline" />
      <Field label="Developer" value={developer} onChange={setDeveloper} options={developers} anyLabel="All developers" />
      <Field label="RERA status" value={rera} onChange={setRera} options={[...reraStatuses]} anyLabel="Any status" />
      <div className="lg:col-span-1">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Max budget — {formatINR(budget[0])}
        </Label>
        <Slider
          className="mt-4"
          value={budget}
          min={8000000}
          max={250000000}
          step={2500000}
          onValueChange={setBudget}
          aria-label="Maximum budget"
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>₹80 L</span>
          <span>₹25 Cr</span>
        </div>
      </div>
    </div>
  );

  return (
    <PublicShell>
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <p className="text-eyebrow">Project catalogue</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Verified Mumbai inventory
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {projects.length} projects across MMR micro-markets with live availability, RERA details
            and broker payout terms.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:flex">
        {/* Filters */}
        <aside className="lg:w-72 lg:shrink-0">
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <Button variant="outline" onClick={() => setShowFilters((v) => !v)}>
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
              {activeFilters > 0 && <Badge className="ml-2">{activeFilters}</Badge>}
            </Button>
            {activeFilters > 0 && (
              <Button variant="ghost" size="sm" onClick={reset}>
                <X className="mr-1 h-3.5 w-3.5" /> Clear
              </Button>
            )}
          </div>
          <Card className={`mt-4 lg:mt-0 lg:sticky lg:top-24 ${showFilters ? "" : "hidden lg:block"}`}>
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={reset} disabled={activeFilters === 0}>
                  Reset
                </Button>
              </div>
              {filterFields}
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
            <div className="relative min-w-0 sm:max-w-sm sm:flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search project, developer, locality"
                className="pl-9"
                aria-label="Search projects"
              />
            </div>
            <ToggleGroup
              type="single"
              value={view}
              onValueChange={(v) => v && setView(v as typeof view)}
              variant="outline"
              className="shrink-0"
            >
              <ToggleGroupItem value="grid" aria-label="Grid view"><LayoutGrid className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view"><List className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="map" aria-label="Map view"><Map className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{results.length}</span> of{" "}
            {projects.length} projects
          </p>

          {view === "map" ? (
            <div className="mt-6 grid min-h-[26rem] place-items-center rounded-lg border border-dashed border-border bg-muted/40 p-10 text-center">
              <div>
                <Map className="mx-auto h-9 w-9 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Map view</h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Micro-market map with clustered inventory pins is planned for the next release.
                  {results.length} matching projects would plot across MMR.
                </p>
                <Button className="mt-5" variant="outline" onClick={() => setView("grid")}>
                  Back to grid
                </Button>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="mt-6 grid place-items-center rounded-lg border border-dashed border-border p-14 text-center">
              <div>
                <h3 className="text-lg font-semibold">No projects match these filters</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try widening the budget or clearing the micro-market filter.
                </p>
                <Button className="mt-5" onClick={reset}>Reset filters</Button>
              </div>
            </div>
          ) : (
            <div className={view === "grid" ? "mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "mt-6 flex flex-col gap-5"}>
              {results.map((p) => (
                <ProjectCard key={p.id} project={p} view={view} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicShell>
  );
}

function Field({
  label,
  value,
  onChange,
  options,
  anyLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  anyLabel: string;
}) {
  return (
    <div>
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mt-1.5 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ANY}>{anyLabel}</SelectItem>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
