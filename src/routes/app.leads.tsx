import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Table as TableIcon, Columns3, Plus, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { leads as seedLeads, leadStages, type Lead } from "@/data/crm";
import { projects } from "@/data/projects";
import { formatINR, formatPhone, formatDate } from "@/lib/format";

export const Route = createFileRoute("/app/leads")({
  head: () => ({
    meta: [
      { title: "Leads CRM | Real-Estate Business Network" },
      { name: "description", content: "Track Mumbai buyer leads across stages, owners, projects, budgets and follow-ups." },
      { property: "og:title", content: "Leads CRM — RBN" },
      { property: "og:description", content: "Kanban and table views for the Mumbai broker pipeline." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LeadsPage,
});

const ANY = "any";

const stageTone: Record<string, string> = {
  New: "bg-info/10 text-info",
  Contacted: "bg-muted text-muted-foreground",
  "Site Visit": "bg-warning/20 text-warning-foreground",
  Negotiation: "bg-accent text-accent-foreground",
  Booked: "bg-success/10 text-success",
  Lost: "bg-destructive/10 text-destructive",
};

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(seedLeads);
  const [q, setQ] = useState("");
  const [stage, setStage] = useState(ANY);
  const [owner, setOwner] = useState(ANY);
  const [view, setView] = useState<"table" | "kanban">("table");

  const owners = Array.from(new Set(seedLeads.map((l) => l.owner)));

  const filtered = useMemo(
    () =>
      leads.filter((l) => {
        const text = `${l.name} ${l.project} ${l.phone} ${l.email} ${l.microMarket}`.toLowerCase();
        return (
          (!q || text.includes(q.toLowerCase())) &&
          (stage === ANY || l.stage === stage) &&
          (owner === ANY || l.owner === owner)
        );
      }),
    [leads, q, stage, owner],
  );

  return (
    <AppShell
      title="Leads CRM"
      description={`${filtered.length} of ${leads.length} leads in your pipeline`}
      actions={<AddLeadDialog onAdd={(l) => setLeads((prev) => [l, ...prev])} />}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap">
        <div className="relative min-w-0 sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search leads" className="pl-9" aria-label="Search leads" />
        </div>
        <Select value={stage} onValueChange={setStage}>
          <SelectTrigger className="w-full sm:w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>All stages</SelectItem>
            {leadStages.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={owner} onValueChange={setOwner}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>All owners</SelectItem>
            {owners.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
          </SelectContent>
        </Select>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v) => v && setView(v as typeof view)}
          variant="outline"
          className="ml-auto shrink-0"
        >
          <ToggleGroupItem value="table" aria-label="Table view"><TableIcon className="h-4 w-4" /></ToggleGroupItem>
          <ToggleGroupItem value="kanban" aria-label="Kanban view"><Columns3 className="h-4 w-4" /></ToggleGroupItem>
        </ToggleGroup>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 grid place-items-center rounded-lg border border-dashed border-border p-14 text-center">
          <div>
            <h3 className="text-lg font-semibold">No leads match</h3>
            <p className="mt-1 text-sm text-muted-foreground">Adjust the search or filters to see more.</p>
          </div>
        </div>
      ) : view === "table" ? (
        <Card className="mt-6 overflow-hidden p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[980px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Next action</TableHead>
                  <TableHead>Follow-up</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell>
                      <p className="font-medium">{l.name}</p>
                      <p className="text-xs text-muted-foreground">{formatPhone(l.phone)} · {l.source}</p>
                    </TableCell>
                    <TableCell>
                      <span className={`rounded px-2 py-1 text-xs font-semibold ${stageTone[l.stage]}`}>{l.stage}</span>
                    </TableCell>
                    <TableCell>
                      <p className="max-w-48 truncate text-sm">{l.project}</p>
                      <p className="text-xs text-muted-foreground">{l.config} · {l.microMarket}</p>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm">
                      {formatINR(l.budgetMin)} – {formatINR(l.budgetMax)}
                    </TableCell>
                    <TableCell className="text-sm">{l.owner}</TableCell>
                    <TableCell className="max-w-56 text-sm">{l.nextAction}</TableCell>
                    <TableCell className="whitespace-nowrap text-sm">
                      {formatDate(l.nextActionDate)}
                      <Badge variant="outline" className="ml-2">{l.score}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      ) : (
        <div className="mt-6 grid gap-4 overflow-x-auto md:grid-cols-2 xl:grid-cols-3">
          {leadStages.map((s) => {
            const items = filtered.filter((l) => l.stage === s);
            return (
              <div key={s} className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center justify-between px-1">
                  <p className="text-sm font-semibold">{s}</p>
                  <Badge variant="secondary">{items.length}</Badge>
                </div>
                <div className="mt-3 space-y-3">
                  {items.length === 0 && (
                    <p className="rounded-md border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                      No leads in this stage
                    </p>
                  )}
                  {items.map((l) => (
                    <Card key={l.id} className="hover-lift">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                          <p className="truncate text-sm font-semibold">{l.name}</p>
                          <Badge variant="outline" className="shrink-0 text-[0.65rem]">{l.score}</Badge>
                        </div>
                        <p className="mt-1 truncate text-xs text-muted-foreground">{l.project}</p>
                        <p className="mt-2 text-xs font-medium">
                          {formatINR(l.budgetMin)} – {formatINR(l.budgetMax)} · {l.config}
                        </p>
                        <p className="mt-2 rounded bg-muted px-2 py-1.5 text-xs text-muted-foreground">
                          {l.nextAction} · {formatDate(l.nextActionDate)}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{l.owner}</span>
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" aria-label={`Call ${l.name}`} onClick={() => toast.info(formatPhone(l.phone))}>
                              <Phone className="h-3.5 w-3.5" />
                            </Button>
                            <Button size="icon" variant="ghost" aria-label={`Email ${l.name}`} onClick={() => toast.info(l.email)}>
                              <Mail className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}

function AddLeadDialog({ onAdd }: { onAdd: (l: Lead) => void }) {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(projects[0].name);
  const [stage, setStage] = useState<string>("New");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add lead
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a lead</DialogTitle>
          <DialogDescription>Captured leads are attributed to your broker ID immediately.</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.target as HTMLFormElement);
            const p = projects.find((x) => x.name === project)!;
            onAdd({
              id: `L-${Math.floor(1100 + Math.random() * 800)}`,
              name: String(f.get("name")),
              phone: String(f.get("phone")),
              email: String(f.get("email") || "—"),
              source: String(f.get("source") || "Direct"),
              stage: stage as Lead["stage"],
              owner: "Aditi Sharma",
              project: p.name,
              microMarket: p.microMarket,
              budgetMin: Number(f.get("bmin") || 0) * 100000,
              budgetMax: Number(f.get("bmax") || 0) * 100000,
              config: String(f.get("config") || "2 BHK"),
              nextAction: String(f.get("action") || "First qualification call"),
              nextActionDate: String(f.get("date") || "2026-08-01"),
              lastActivity: new Date().toISOString(),
              score: "Warm",
            });
            setOpen(false);
            toast.success("Lead added", { description: "Follow-up task created automatically." });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="phone">Mobile</Label>
              <Input id="phone" name="phone" required placeholder="9820000000" className="mt-1.5" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="bmin">Budget min (₹ lakh)</Label>
              <Input id="bmin" name="bmin" type="number" placeholder="200" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="bmax">Budget max (₹ lakh)</Label>
              <Input id="bmax" name="bmax" type="number" placeholder="260" className="mt-1.5" />
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
            <div>
              <Label>Stage</Label>
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {leadStages.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="config">Configuration</Label>
              <Input id="config" name="config" placeholder="3 BHK" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="date">Follow-up date</Label>
              <Input id="date" name="date" type="date" className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="action">Next action</Label>
            <Textarea id="action" name="action" placeholder="Share cost sheet and schedule visit" className="mt-1.5" />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Save lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
