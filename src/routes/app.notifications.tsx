import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, CalendarCheck, Layers, Users, Wallet, TrendingUp, CheckCheck } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notifications as seed, type Notification } from "@/data/crm";
import { formatDateTime } from "@/lib/format";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications | Real-Estate Business Network" },
      { name: "description", content: "Lead assignments, visit confirmations, inventory alerts and payout updates." },
      { property: "og:title", content: "Notifications — RBN" },
      { property: "og:description", content: "Real-time network alerts for the Mumbai broker desk." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotificationsPage,
});

const icons = {
  lead: Users,
  visit: CalendarCheck,
  inventory: Layers,
  commission: Wallet,
  market: TrendingUp,
};

function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(seed);
  const unread = items.filter((n) => n.unread);

  const List = ({ data }: { data: Notification[] }) =>
    data.length === 0 ? (
      <div className="grid place-items-center rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
        <div>
          <Bell className="mx-auto h-6 w-6" />
          <p className="mt-2">You are all caught up.</p>
        </div>
      </div>
    ) : (
      <div className="space-y-3">
        {data.map((n) => {
          const Icon = icons[n.type];
          return (
            <Card key={n.id} className={n.unread ? "border-primary/40" : undefined}>
              <CardContent className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-medium">{n.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatDateTime(n.time)}</p>
                </div>
                {n.unread && <Badge className="shrink-0">New</Badge>}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );

  return (
    <AppShell
      title="Notifications"
      description={`${unread.length} unread`}
      actions={
        <Button
          variant="outline"
          onClick={() => setItems((p) => p.map((n) => ({ ...n, unread: false })))}
          disabled={unread.length === 0}
        >
          <CheckCheck className="mr-2 h-4 w-4" /> Mark all read
        </Button>
      }
    >
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({items.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unread.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-5"><List data={items} /></TabsContent>
        <TabsContent value="unread" className="mt-5"><List data={unread} /></TabsContent>
      </Tabs>
    </AppShell>
  );
}
