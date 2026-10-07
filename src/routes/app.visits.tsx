import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarPlus, MapPin, QrCode } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteVisits as seedVisits, leads, type SiteVisit } from "@/data/crm";
import { projects } from "@/data/projects";
import { formatDate, formatPhone } from "@/lib/format";

export const Route = createFileRoute("/app/visits")({
  head: () => ({
    meta: [
      { title: "Site Visits | Real-Estate Business Network" },
      { name: "description", content: "Schedule, tag and review Mumbai site visits with protected broker attribution." },
      { property: "og:title", content: "Site Visits — RBN" },
      { property: "og:description", content: "Digital site-visit tagging workflow with unique attribution codes." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VisitsPage,
});

function VisitsPage() {
  const [visits, setVisits] = useState<SiteVisit[]>(seedVisits);
  const upcoming = visits.filter((v) => v.status === "Upcoming");
  const past = visits.filter((v) => v.status !== "Upcoming");

  const [project, setProject] = useState(projects[0].name);
  const [lead, setLead] = useState(leads[0].name);

  return (
    <AppShell
      title="Site Visits"
      description={`${upcoming.length} upcoming · ${past.length} completed or closed`}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
              <TabsTrigger value="past">Completed ({past.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-5 space-y-4">
              {upcoming.length === 0 && <Empty label="No upcoming visits scheduled." />}
              {upcoming.map((v) => (
                <VisitCard key={v.id} visit={v} />
              ))}
            </TabsContent>

            <TabsContent value="past" className="mt-5 space-y-4">
              {past.map((v) => (
                <VisitCard key={v.id} visit={v} />
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <Card className="h-fit lg:sticky lg:top-20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarPlus className="h-4 w-4 text-primary" /> Tag a site visit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.target as HTMLFormElement);
                const p = projects.find((x) => x.name === project)!;
                const id = `SV-${Math.floor(3100 + Math.random() * 800)}`;
                setVisits((prev) => [
                  {
                    id,
                    leadName: lead,
                    phone: leads.find((l) => l.name === lead)?.phone ?? "9820000000",
                    project: p.name,
                    microMarket: p.microMarket,
                    date: String(f.get("date") || "2026-08-05"),
                    slot: String(f.get("slot") || "11:00 AM – 12:00 PM"),
                    status: "Upcoming",
                    taggedBy: "Aditi Sharma",
                    developerRep: `Sales Desk — ${p.developer}`,
                    tagCode: `RBN-${p.microMarket.slice(0, 3).toUpperCase()}-${id.slice(3)}`,
                  },
                  ...prev,
                ]);
                toast.success("Site visit tagged", { description: `Attribution locked · ${id}` });
                (e.target as HTMLFormElement).reset();
              }}
            >
              <div>
                <Label>Lead</Label>
                <Select value={lead} onValueChange={setLead}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {leads.map((l) => <SelectItem key={l.id} value={l.name}>{l.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Project</Label>
                <Select value={project} onValueChange={setProject}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {projects.map((p) => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="date">Visit date</Label>
                  <Input id="date" name="date" type="date" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="slot">Slot</Label>
                  <Input id="slot" name="slot" placeholder="11:00 AM – 12:00 PM" className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label htmlFor="accompany">Accompanying members</Label>
                <Input id="accompany" name="accompany" placeholder="Spouse, parent" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="notes">Requirement notes</Label>
                <Textarea id="notes" name="notes" rows={3} placeholder="3 BHK, high floor, sea view preference" className="mt-1.5" />
              </div>
              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <Checkbox required className="mt-0.5" /> I confirm the client has consented to
                sharing their contact details with the developer sales desk.
              </label>
              <Button type="submit" className="w-full">Generate tag code</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

function VisitCard({ visit }: { visit: SiteVisit }) {
  const tone =
    visit.status === "Upcoming" ? "default" : visit.status === "Completed" ? "secondary" : "destructive";
  return (
    <Card className="hover-lift">
      <CardContent className="p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <p className="truncate font-semibold">{visit.leadName}</p>
            <p className="truncate text-sm text-muted-foreground">{formatPhone(visit.phone)}</p>
          </div>
          <Badge variant={tone} className="shrink-0">{visit.status}</Badge>
        </div>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Project</p>
            <p className="truncate font-medium">{visit.project}</p>
          </div>
          <div className="min-w-0">
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> Micro-market
            </p>
            <p className="truncate font-medium">{visit.microMarket}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Schedule</p>
            <p className="font-medium">{formatDate(visit.date)} · {visit.slot}</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Tagged by</p>
            <p className="truncate font-medium">{visit.taggedBy}</p>
          </div>
        </div>
        {visit.outcome && (
          <p className="mt-4 rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">{visit.outcome}</p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <span className="inline-flex items-center gap-1.5 rounded bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
            <QrCode className="h-3.5 w-3.5" /> {visit.tagCode}
          </span>
          {visit.developerRep && (
            <span className="truncate text-xs text-muted-foreground">{visit.developerRep}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
      {label}
    </div>
  );
}
