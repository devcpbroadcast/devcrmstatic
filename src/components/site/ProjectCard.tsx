import { Link } from "@tanstack/react-router";
import { MapPin, ShieldCheck, TrendingUp, Layers } from "lucide-react";
import type { Project } from "@/data/projects";
import { formatINR } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  view = "grid",
  selectable,
  selected,
  onSelect,
}: {
  project: Project;
  view?: "grid" | "list";
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: string) => void;
}) {
  const image = (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        view === "grid" ? "h-48 w-full" : "h-44 w-full sm:h-full sm:w-64 sm:shrink-0",
      )}
    >
      <img
        src={project.images[0]}
        alt={`${project.name} in ${project.microMarket}, Mumbai`}
        loading="lazy"
        width={1200}
        height={800}
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <Badge className="absolute left-3 top-3 bg-charcoal text-charcoal-foreground">
        {project.status}
      </Badge>
      {project.reraStatus === "Registered" && (
        <Badge variant="secondary" className="absolute right-3 top-3 gap-1">
          <ShieldCheck className="h-3 w-3" /> RERA
        </Badge>
      )}
    </div>
  );

  const body = (
    <div className="flex min-w-0 flex-1 flex-col p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {project.developer}
          </p>
          <h3 className="mt-1 truncate text-lg font-semibold">{project.name}</h3>
          <p className="mt-1 flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{project.microMarket}</span>
          </p>
        </div>
        {selectable && (
          <label className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
            <Checkbox
              checked={selected}
              onCheckedChange={() => onSelect?.(project.id)}
              aria-label={`Compare ${project.name}`}
            />
            Compare
          </label>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.configs.map((c) => (
          <Badge key={c} variant="outline" className="font-normal">
            {c}
          </Badge>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Price band</p>
          <p className="font-semibold text-foreground">
            {formatINR(project.priceMin)} – {formatINR(project.priceMax)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Possession</p>
          <p className="font-semibold">{project.possession}</p>
        </div>
        <div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Layers className="h-3 w-3" /> Inventory
          </p>
          <p className="font-semibold">
            {project.availableUnits}/{project.totalUnits} available
          </p>
        </div>
        <div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" /> Payout
          </p>
          <p className="font-semibold text-primary">{project.commissionPct}%</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button asChild size="sm">
          <Link to="/" params={{ slug: project.slug }}>
            View project
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link to="/">Tag site visit</Link>
        </Button>
      </div>
    </div>
  );

  return (
    <Card
      className={cn(
        "hover-lift overflow-hidden p-0",
        view === "list" ? "flex flex-col sm:flex-row" : "flex flex-col",
        selected && "border-primary ring-1 ring-primary",
      )}
    >
      {image}
      {body}
    </Card>
  );
}
