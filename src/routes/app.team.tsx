import { createFileRoute } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { StatCard } from "@/components/app/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { team, leads } from "@/data/crm";
import { formatINR, initials } from "@/lib/format";

export const Route = createFileRoute("/app/team")({
  head: () => ({
    meta: [
      { title: "Team & Allocation | Real-Estate Business Network" },
      { name: "description", content: "Team roster, roles, lead allocation and closure performance for the Mumbai desk." },
      { property: "og:title", content: "Team — RBN" },
      { property: "og:description", content: "Roles, allocation and performance across the broker team." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  const totalRevenue = team.reduce((s, t) => s + t.revenue, 0);
  const maxLeads = Math.max(...team.map((t) => t.leads));

  return (
    <AppShell
      title="Team"
      description="Roster, allocation and performance"
      actions={
        <Button onClick={() => toast.info("Invite flow is a prototype")}>
          <UserPlus className="mr-2 h-4 w-4" /> Invite member
        </Button>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Team members" value={String(team.length)} hint="4 active · 1 on leave" />
        <StatCard label="Leads allocated" value={String(leads.length)} delta={9} />
        <StatCard label="Closures (FY)" value={String(team.reduce((s, t) => s + t.closures, 0))} delta={22} />
        <StatCard label="Brokerage earned" value={formatINR(totalRevenue)} delta={15} />
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <CardHeader className="p-5">
          <CardTitle className="text-base">Members</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[880px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead className="w-44">Lead allocation</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Closures</TableHead>
                  <TableHead>Brokerage</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {team.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                          {initials(m.name)}
                        </span>
                        <span className="font-medium">{m.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{m.role}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{m.region}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={maxLeads ? (m.leads / maxLeads) * 100 : 0} className="h-2" />
                        <span className="w-6 text-xs font-semibold">{m.leads}</span>
                      </div>
                    </TableCell>
                    <TableCell>{m.visits}</TableCell>
                    <TableCell>{m.closures}</TableCell>
                    <TableCell className="whitespace-nowrap font-medium">{m.revenue ? formatINR(m.revenue) : "—"}</TableCell>
                    <TableCell>
                      <Badge variant={m.status === "Active" ? "secondary" : "outline"}>{m.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
