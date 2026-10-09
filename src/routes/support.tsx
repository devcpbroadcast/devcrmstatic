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
  ["How do I become a channel partner?", "Register using your RERA agent number and PAN. Your details are usually verified within 48 hours. Once approved, you can view available properties and commission details."],
  ["How is my site visit tracked?", "Every site visit gets a unique visit code. This code, along with the visit time and your broker ID, is recorded and used to confirm your commission later."],
  ["When will I receive my commission?", "Commission payments depend on the project and are usually paid within 21 to 60 days after registration. You can track every deal in your commission ledger—from expected to approved, invoiced and finally paid."],
  ["What if a developer disputes my commission?", "If there is a dispute, the deal is marked as Disputed in your ledger. The network team reviews the visit code, lead details and visit records to resolve it. Most disputes are resolved within 9 working days."],
  ["Do you support NRI buyers?", "Yes. Our NRI desk helps with different time zones, online property tours, FEMA and NRE/NRO documentation, and local support during registration."],
];

function SupportPage() {
  return (
    <PublicShell>
      <div className="border-b border-border bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-eyebrow">Support</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Network desk</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            The Mumbai desk is available Monday to Saturday, from 9:30 AM to 8:00 PM IST. Any issues related to visit credit or commission payments are addressed within one working day.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [Phone, "Call the desk", "+91 88550 22798"],
            [Mail, "Email", "support@cpbroadcast.com"],
            [MessageSquare, "WhatsApp", "+91 91722 67888"],
            // [BookOpen, "Knowledge base", "Guides & policies"],
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
                    <Select defaultValue="1">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Partner Registration or Join Us</SelectItem>
                        <SelectItem value="2">Inventory access</SelectItem>
                        <SelectItem value="3">Client / Lead Dispute </SelectItem>
                        <SelectItem value="4">Brokerage & Payouts </SelectItem>
                        <SelectItem value="5">Other </SelectItem>
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
