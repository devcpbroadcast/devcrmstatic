import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MessageSquare, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { PublicShell } from "@/components/site/PublicShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support & Network Desk | Real-Estate Business Network" },
      {
        name: "description",
        content:
          "Get help with empanelment, inventory access, site-visit tagging, attribution disputes and commission settlement.",
      },
      { property: "og:title", content: "Support — Real-Estate Business Network" },
      { property: "og:description", content: "Mumbai network desk: onboarding, attribution and payout support." },
    ],
  }),
  component: SupportPage,
});

const faqs = [
  ["How do I get empanelled as a channel partner?", "Register with your RERA agent number and PAN. Verification typically completes within 48 hours, after which live inventory and payout terms unlock."],
  ["How is site-visit attribution protected?", "Every tagged visit generates a unique code shared with the developer desk at the time of tagging. The code, timestamp and broker ID form the attribution record used at settlement."],
  ["When are commissions paid?", "Payout cycles are set per project — typically 21 to 60 days from registration. The commission ledger tracks each deal from expected through approved, invoiced and paid."],
  ["What happens if a developer disputes attribution?", "The deal moves to Disputed in your ledger and the network desk arbitrates using the tag record, lead trail and visit logs. Median resolution is 9 working days."],
  ["Do you support NRI transactions?", "Yes. The NRI desk handles time-zone aware follow-ups, remote walkthroughs, FEMA and NRE/NRO documentation checklists and local representation for registration."],
];

function SupportPage() {
  return (
    <PublicShell>
      <div className="border-b border-border bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-eyebrow">Support</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Network desk</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Mumbai desk operates Monday to Saturday, 9:30 AM to 8:00 PM IST. Attribution and payout
            escalations are handled within one working day.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Phone, "Call the desk", "+91 22 4000 8800"],
            [Mail, "Email", "desk@rbn.network"],
            [MessageSquare, "WhatsApp", "+91 98200 00000"],
            [BookOpen, "Knowledge base", "Guides & policies"],
          ].map(([Icon, t, v], i) => {
            const I = Icon as typeof Phone;
            return (
              <Card key={i} className="hover-lift">
                <CardContent className="p-5">
                  <I className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm font-semibold">{t as string}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{v as string}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Raise a request</h2>
            <Card className="mt-4">
              <CardContent className="p-6">
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Request logged", { description: "Ticket RBN-SUP-4821 created (prototype)." });
                    (e.target as HTMLFormElement).reset();
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="s-name">Name</Label>
                      <Input id="s-name" required className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="s-phone">Mobile</Label>
                      <Input id="s-phone" required placeholder="+91 98200 00000" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="s-email">Email</Label>
                    <Input id="s-email" type="email" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select defaultValue="onboarding">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onboarding">Empanelment / onboarding</SelectItem>
                        <SelectItem value="inventory">Inventory access</SelectItem>
                        <SelectItem value="attribution">Attribution dispute</SelectItem>
                        <SelectItem value="payout">Commission payout</SelectItem>
                        <SelectItem value="other">Something else</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="s-msg">Details</Label>
                    <Textarea id="s-msg" rows={4} required className="mt-1.5" />
                  </div>
                  <Button type="submit">Submit request</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">Frequently asked</h2>
            <Accordion type="single" collapsible className="mt-4">
              {faqs.map(([q, a]) => (
                <AccordionItem key={q} value={q}>
                  <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
