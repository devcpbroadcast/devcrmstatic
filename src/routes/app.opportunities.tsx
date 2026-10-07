import { createFileRoute, Link } from "@tanstack/react-router";
import { Handshake, Layers, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { opportunities } from "@/data/crm";
import { projects } from "@/data/projects";
import { formatINR, formatIndianNumber, formatDate } from "@/lib/format";

export const Route = createFileRoute("/app/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunities & Inventory | RBN" },
      { name: "description", content: "Available Mumbai inventory and co-broking, launch and institutional collaboration opportunities." },
      { property: "og:title", content: "Opportunities & Inventory — RBN" },
      { property: "og:description", content: "Live unit availability and network collaboration deals." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OpportunitiesPage,
});

function OpportunitiesPage() {
  const units = projects.flatMap((p) =>
    p.inventory.map((u) => ({ ...u, project: p.name, slug: p.slug, market: p.microMarket, payout: p.commissionPct })),
  );

  return (
    <AppShell title="Opportunities" description="Live inventory and network collaborations">
      <Tabs defaultValue="inventory">
        <TabsList>
          <TabsTrigger value="inventory">Inventory ({units.length})</TabsTrigger>
          <TabsTrigger value="collab">Collaborations ({opportunities.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="mt-5">
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Tower / config</TableHead>
                    <TableHead>Carpet</TableHead>
                    <TableHead>Floors</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Payout</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {units.map((u, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <p className="max-w-52 truncate font-medium">{u.project}</p>
                        <p className="text-xs text-muted-foreground">{u.market}</p>
                      </TableCell>
                      <TableCell>Tower {u.tower} · {u.config}</TableCell>
                      <TableCell>{formatIndianNumber(u.carpet)} sq ft</TableCell>
                      <TableCell>{u.floorBand}</TableCell>
                      <TableCell className="whitespace-nowrap font-medium">{formatINR(u.price)}</TableCell>
                      <TableCell>
                        <Badge variant={u.available <= 5 ? "destructive" : "secondary"}>
                          {u.available}/{u.total}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-primary">{u.payout}%</TableCell>
                      <TableCell className="text-right">
                        <Button asChild size="sm" variant="ghost">
                          <Link to="/projects/$slug" params={{ slug: u.slug }}>Open</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="collab" className="mt-5">
          <div className="grid gap-5 md:grid-cols-2">
            {opportunities.map((o) => (
              <Card key={o.id} className="hover-lift">
                <CardContent className="p-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <div className="min-w-0">
                      <Badge variant="outline">{o.type}</Badge>
                      <h3 className="mt-2 text-lg font-semibold leading-snug">{o.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{o.partner}</p>
                    </div>
                    <Handshake className="h-5 w-5 shrink-0 text-primary" />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{o.note}</p>
                  <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Payout</p>
                      <p className="font-semibold text-primary">{o.payout}</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground"><Layers className="h-3 w-3" /> Units</p>
                      <p className="font-semibold">{o.units || "—"}</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground"><CalendarDays className="h-3 w-3" /> Closes</p>
                      <p className="font-semibold">{formatDate(o.closing)}</p>
                    </div>
                  </div>
                  <Button
                    className="mt-4"
                    size="sm"
                    onClick={() => toast.success("Interest registered", { description: `${o.partner} desk notified.` })}
                  >
                    Express interest
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
