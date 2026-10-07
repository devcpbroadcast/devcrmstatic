import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tasks as seedTasks, type Task } from "@/data/crm";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/app/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks | Real-Estate Business Network" },
      { name: "description", content: "Follow-ups, documentation and escalations for the Mumbai broker desk." },
      { property: "og:title", content: "Tasks — RBN" },
      { property: "og:description", content: "Operational task list tied to leads, visits and payouts." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [title, setTitle] = useState("");

  const toggle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const open = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  const List = ({ items }: { items: Task[] }) =>
    items.length === 0 ? (
      <div className="grid place-items-center rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
        Nothing here. Enjoy the clear desk.
      </div>
    ) : (
      <div className="space-y-3">
        {items.map((t) => (
          <Card key={t.id}>
            <CardContent className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 p-4">
              <Checkbox checked={t.done} onCheckedChange={() => toggle(t.id)} aria-label={`Toggle ${t.title}`} className="mt-1" />
              <div className="min-w-0">
                <p className={`font-medium ${t.done ? "text-muted-foreground line-through" : ""}`}>{t.title}</p>
                <p className="mt-1 truncate text-xs text-muted-foreground">{t.linked} · {t.owner}</p>
              </div>
              <div className="shrink-0 text-right">
                <Badge variant={t.priority === "High" ? "destructive" : t.priority === "Medium" ? "secondary" : "outline"}>
                  {t.priority}
                </Badge>
                <p className="mt-1 text-xs text-muted-foreground">{formatDate(t.due)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );

  return (
    <AppShell title="Tasks" description={`${open.length} open · ${done.length} completed`}>
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          setTasks((prev) => [
            { id: `TK-${prev.length + 10}`, title, linked: "Unlinked", due: "2026-08-10", priority: "Medium", owner: "Aditi Sharma", done: false },
            ...prev,
          ]);
          setTitle("");
          toast.success("Task added");
        }}
      >
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a task…" aria-label="New task" />
        <Button type="submit" className="shrink-0">
          <Plus className="mr-2 h-4 w-4" /> Add task
        </Button>
      </form>

      <Tabs defaultValue="open" className="mt-6">
        <TabsList>
          <TabsTrigger value="open">Open ({open.length})</TabsTrigger>
          <TabsTrigger value="done">Completed ({done.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="open" className="mt-5"><List items={open} /></TabsContent>
        <TabsContent value="done" className="mt-5"><List items={done} /></TabsContent>
      </Tabs>
    </AppShell>
  );
}
