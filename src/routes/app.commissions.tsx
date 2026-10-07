import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Wallet, CheckCircle2, FileText, IndianRupee, AlertOctagon } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { StatCard } from "@/components/app/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { commissions, commissionStatuses } from "@/data/crm";
import { formatINR, formatDate } from "@/lib/format";

export const Route = createFileRoute("/app/commissions")({
  head: () => ({
    meta: [
      { title: "Commissions Ledger | Real-Estate Business Network" },
      { name: "description", content: "Track expected, approved, invoiced, paid and disputed brokerage across Mumbai deals." },
      { property: "og:title", content: "Commissions Ledger — RBN" },
      { property: "og:description", content: "Deal-level brokerage tracking from booking to payout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CommissionsPage,
});

const tone: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Expected: "outline",
  Approved: "secondary",
  Invoiced: "secondary",
  Paid: "default",
  Disputed: "destructive",
};

function CommissionsPage() {
  const [tab, setTab] = useState("All");
  const totals = useMemo(() => {
    const by = (s: string) => commissions.filter((c) => c.status === s).reduce((a, c) => a + c.amount, 0);
    return {
      expected: by("Expected"),
      approved: by("Approved"),
      invoiced: by("Invoiced"),
      paid: by("Paid"),
      disputed: by("Disputed"),
    };
  }, []);

  const rows = tab === "All" ? commissions : commissions.filter((c) => c.status === tab);

  return (
    <AppShell
      title="Commissions"
      description="Deal-level brokerage from booking through payout"
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Expected" value={formatINR(totals.expected)} icon={<Wallet className="h-4 w-4" />} hint="pipeline" />
        <StatCard label="Approved" value={formatINR(totals.approved)} icon={<CheckCircle2 className="h-4 w-4" />} hint="awaiting invoice" />
        <StatCard label="Invoiced" value={formatINR(totals.invoiced)} icon={<FileText className="h-4 w-4" />} hint="in payout cycle" />
        <StatCard label="Paid (FY)" value={formatINR(totals.paid)} icon={<IndianRupee className="h-4 w-4" />} delta={18} />
        <StatCard label="Disputed" value={formatINR(totals.disputed)} icon={<AlertOctagon className="h-4 w-4" />} hint="1 case open" />
      </div>

      <Tabs value={tab} onValueChange={setTab} className="mt-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="All">All</TabsTrigger>
          {commissionStatuses.map((s) => (
            <TabsTrigger key={s} value={s}>{s}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {rows.length === 0 ? (
        <div className="mt-6 grid place-items-center rounded-lg border border-dashed border-border p-14 text-center text-sm text-muted-foreground">
          No commission records with this status.
        </div>
      ) : (
        <Card className="mt-5 overflow-hidden p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Ref</TableHead>
                  <TableHead>Client & unit</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Deal value</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Brokerage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expected on</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono text-xs">{c.id}</TableCell>
                    <TableCell>
                      <p className="font-medium">{c.client}</p>
                      <p className="text-xs text-muted-foreground">{c.unit}</p>
                    </TableCell>
                    <TableCell>
                      <p className="max-w-52 truncate text-sm">{c.project}</p>
                      <p className="text-xs text-muted-foreground">{c.developer}</p>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{formatINR(c.dealValue)}</TableCell>
                    <TableCell>{c.ratePct}%</TableCell>
                    <TableCell className="whitespace-nowrap font-semibold text-primary">{formatINR(c.amount)}</TableCell>
                    <TableCell>
                      <Badge variant={tone[c.status]}>{c.status}</Badge>
                      {c.note && <p className="mt-1 max-w-48 text-xs text-muted-foreground">{c.note}</p>}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm">
                      {formatDate(c.expectedDate)}
                      <p className="text-xs text-muted-foreground">booked {formatDate(c.bookingDate)}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Payout cycles run per project (21–60 days from registration). Disputed records are arbitrated
        by the network desk using tagged visit and lead records.
      </p>
    </AppShell>
  );
}
