import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  MapPin,
  ShieldCheck,
  Download,
  CalendarPlus,
  UserPlus,
  Building2,
  ArrowLeft,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { PublicShell } from "@/components/site/PublicShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getProject, type Project } from "@/data/projects";
import { formatINR, formatIndianNumber } from "@/lib/format";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.project;
    const title = `${p.name}, ${p.microMarket} | Real-Estate Business Network`;
    const description = `${p.name} by ${p.developer} — ${p.configs.join(", ")} in ${p.microMarket}. ${formatINR(p.priceMin)} onwards, ${p.possession}, RERA ${p.reraId}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <p className="mt-2 text-muted-foreground">This project may have been delisted.</p>
        <Button asChild className="mt-6">
          <Link to="/projects">Back to catalogue</Link>
        </Button>
      </div>
    </PublicShell>
  );
}

function ProjectDetail() {
  const { slug } = Route.useParams();
  const project = getProject(slug) as Project;
  const [active, setActive] = useState(0);
  const sold = project.totalUnits - project.availableUnits;
  const soldPct = Math.round((sold / project.totalUnits) * 100);

  return (
    <PublicShell>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        {/* Header */}
        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-charcoal text-charcoal-foreground">{project.status}</Badge>
              <Badge variant="secondary" className="gap-1">
                <ShieldCheck className="h-3 w-3" /> RERA {project.reraStatus}
              </Badge>
              <span className="text-xs text-muted-foreground">{project.reraId}</span>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{project.name}</h1>
            <p className="mt-2 flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{project.address}</span>
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <TagVisitDialog projectName={project.name} />
            <AddLeadDialog projectName={project.name} />
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-lg border border-border bg-muted">
            <img
              src={project.images[active]}
              alt={`${project.name} — view ${active + 1}`}
              width={1200}
              height={800}
              className="h-64 w-full object-cover sm:h-[26rem]"
            />
          </div>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
            {project.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                className={`overflow-hidden rounded-md border ${i === active ? "border-primary ring-1 ring-primary" : "border-border"}`}
              >
                <img src={img} alt="" loading="lazy" width={400} height={280} className="h-20 w-full object-cover lg:h-[8.1rem]" />
              </button>
            ))}
          </div>
        </div>

        {/* Key stats */}
        <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Price band", `${formatINR(project.priceMin)} – ${formatINR(project.priceMax)}`],
            ["Rate", `₹${formatIndianNumber(project.pricePerSqft)} / sq ft`],
            ["Possession", project.possession],
            ["Broker payout", `${project.commissionPct}%`],
          ].map(([k, v]) => (
            <div key={k} className="bg-card px-5 py-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{k}</p>
              <p className="mt-1 font-display text-xl font-bold">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <Tabs defaultValue="overview">
              <TabsList className="flex-wrap">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="pricing">Pricing & config</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="rera">RERA</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-5 space-y-5">
                <p className="text-muted-foreground">{project.overview}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {project.highlights.map((h) => (
                    <Card key={h}>
                      <CardContent className="p-4 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <p className="mt-2">{h}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="mt-5">
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full min-w-[560px] text-sm">
                    <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3">Configuration</th>
                        <th className="px-4 py-3">Carpet (sq ft)</th>
                        <th className="px-4 py-3">Floor band</th>
                        <th className="px-4 py-3">All-inclusive price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.inventory.map((u, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="px-4 py-3 font-medium">{u.config}</td>
                          <td className="px-4 py-3">{formatIndianNumber(u.carpet)}</td>
                          <td className="px-4 py-3">{u.floorBand}</td>
                          <td className="px-4 py-3 font-semibold">{formatINR(u.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Prices exclude stamp duty (6%), registration and GST where applicable. Indicative
                  sample data.
                </p>
              </TabsContent>

              <TabsContent value="inventory" className="mt-5 space-y-4">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold">Inventory snapshot</p>
                      <p className="text-sm text-muted-foreground">
                        {sold} sold · {project.availableUnits} available · velocity {project.velocity}
                      </p>
                    </div>
                    <Progress value={soldPct} className="mt-3" />
                    <p className="mt-2 text-xs text-muted-foreground">{soldPct}% of {project.totalUnits} units sold</p>
                  </CardContent>
                </Card>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.inventory.map((u, i) => (
                    <Card key={i} className="hover-lift">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">Tower {u.tower} · {u.config}</p>
                          <Badge variant={u.available <= 5 ? "destructive" : "secondary"}>
                            {u.available} left
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {formatIndianNumber(u.carpet)} sq ft carpet · floors {u.floorBand}
                        </p>
                        <p className="mt-2 font-semibold text-primary">{formatINR(u.price)}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="location" className="mt-5 space-y-4">
                <div className="grid min-h-56 place-items-center rounded-lg border border-dashed border-border bg-muted/40 text-center">
                  <div className="p-6">
                    <MapPin className="mx-auto h-7 w-7 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium">{project.microMarket}, Mumbai</p>
                    <p className="text-xs text-muted-foreground">Interactive map placeholder</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.connectivity.map((c) => (
                    <div key={c.label} className="flex items-center justify-between rounded-md border border-border px-4 py-3 text-sm">
                      <span>{c.label}</span>
                      <span className="font-semibold">{c.distance}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="mt-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  {project.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 rounded-md border border-border px-4 py-3 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary" /> {a}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rera" className="mt-5">
                <Card>
                  <CardContent className="space-y-3 p-5 text-sm">
                    {[
                      ["MahaRERA status", project.reraStatus],
                      ["Registration number", project.reraId],
                      ["Promoter", project.developer],
                      ["Project type", project.type],
                      ["Declared possession", project.possession],
                      ["Registered units", `${project.totalUnits}`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex flex-wrap justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0">
                        <span className="text-muted-foreground">{k}</span>
                        <span className="font-medium">{v}</span>
                      </div>
                    ))}
                    <p className="pt-2 text-xs text-muted-foreground">
                      Verify all details on the MahaRERA portal before transacting. Sample data shown.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <Card>
              <CardContent className="p-5">
                <p className="text-eyebrow">Developer</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                    <Building2 className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{project.developer}</p>
                    <p className="text-xs text-muted-foreground">
                      Since {project.developerSince} · {project.developerProjects} projects
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-accent/60">
              <CardContent className="p-5">
                <p className="text-eyebrow">Broker payout</p>
                <p className="mt-2 font-display text-3xl font-bold text-primary">{project.commissionPct}%</p>
                <p className="mt-1 text-sm text-accent-foreground">{project.commissionBonus}</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payout cycle</span>
                    <span className="font-medium">{project.payoutCycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">On ₹1 Cr deal</span>
                    <span className="font-medium">{formatINR(10000000 * (project.commissionPct / 100))}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <p className="text-eyebrow">Broker assets</p>
                <div className="mt-3 space-y-2">
                  {["Project e-brochure (PDF)", "Cost sheet template (XLSX)", "Floor plans (ZIP)", "RERA certificate (PDF)"].map((d) => (
                    <button
                      key={d}
                      onClick={() => toast.info("Prototype", { description: `${d} download is not wired in this prototype.` })}
                      className="flex w-full items-center justify-between rounded-md border border-border px-3 py-2.5 text-left text-sm transition-colors hover:border-primary hover:bg-accent"
                    >
                      <span className="truncate">{d}</span>
                      <Download className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </PublicShell>
  );
}

function TagVisitDialog({ projectName }: { projectName: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CalendarPlus className="mr-2 h-4 w-4" /> Tag Site Visit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tag a site visit</DialogTitle>
          <DialogDescription>{projectName} — attribution is locked to your broker ID.</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
            toast.success("Site visit tagged", {
              description: `Tag code RBN-${Math.floor(1000 + Math.random() * 8999)} generated.`,
            });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="v-name">Client name</Label>
              <Input id="v-name" required placeholder="Rohan Mehta" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="v-phone">Mobile</Label>
              <Input id="v-phone" required placeholder="+91 98200 14455" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="v-date">Visit date</Label>
              <Input id="v-date" type="date" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="v-slot">Slot</Label>
              <Input id="v-slot" placeholder="11:00 AM – 12:00 PM" className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="v-notes">Notes</Label>
            <Textarea id="v-notes" placeholder="Requirement, budget, accompanying family…" className="mt-1.5" />
          </div>
          <DialogFooter>
            <Button type="submit">Generate tag</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddLeadDialog({ projectName }: { projectName: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="mr-2 h-4 w-4" /> Add Lead
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add lead</DialogTitle>
          <DialogDescription>Linked to {projectName}.</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
            toast.success("Lead added to your CRM");
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="l-name">Name</Label>
              <Input id="l-name" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="l-phone">Mobile</Label>
              <Input id="l-phone" required placeholder="+91 " className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="l-budget">Budget</Label>
              <Input id="l-budget" placeholder="₹3.5 Cr – ₹4.2 Cr" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="l-config">Configuration</Label>
              <Input id="l-config" placeholder="3 BHK" className="mt-1.5" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
