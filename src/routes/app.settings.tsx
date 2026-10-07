import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Profile & Settings | Real-Estate Business Network" },
      { name: "description", content: "Manage your broker profile, RERA credentials, payout details and notification preferences." },
      { property: "og:title", content: "Profile & Settings — RBN" },
      { property: "og:description", content: "Broker profile, compliance and preferences." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell title="Profile & Settings" description="Broker ID RBN-MUM-10428 · verified">
      <Tabs defaultValue="profile">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="firm">Firm & compliance</TabsTrigger>
          <TabsTrigger value="payout">Payout</TabsTrigger>
          <TabsTrigger value="prefs">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-5">
          <Card>
            <CardHeader><CardTitle className="text-base">Personal details</CardTitle></CardHeader>
            <CardContent>
              <form
                className="grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Profile saved");
                }}
              >
                <div><Label htmlFor="fn">Full name</Label><Input id="fn" defaultValue="Aditi Sharma" className="mt-1.5" /></div>
                <div><Label htmlFor="ph">Mobile</Label><Input id="ph" defaultValue="+91 98200 44112" className="mt-1.5" /></div>
                <div><Label htmlFor="em">Email</Label><Input id="em" type="email" defaultValue="aditi@sharmarealty.in" className="mt-1.5" /></div>
                <div>
                  <Label>Primary role</Label>
                  <Select defaultValue="broker">
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="broker">Broker / Channel Partner</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="member">Team Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2"><Button type="submit">Save changes</Button></div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="firm" className="mt-5">
          <Card>
            <CardHeader><CardTitle className="text-base">Firm & RERA compliance</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label htmlFor="firm">Firm name</Label><Input id="firm" defaultValue="Sharma Realty Advisors LLP" className="mt-1.5" /></div>
                <div><Label htmlFor="rera">MahaRERA agent no.</Label><Input id="rera" defaultValue="A51900012345" className="mt-1.5" /></div>
                <div><Label htmlFor="gst">GSTIN</Label><Input id="gst" defaultValue="27AAECS1234F1Z5" className="mt-1.5" /></div>
                <div><Label htmlFor="pan">PAN</Label><Input id="pan" defaultValue="AAECS1234F" className="mt-1.5" /></div>
              </div>
              <Separator />
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary">RERA verified</Badge>
                <Badge variant="secondary">PAN verified</Badge>
                <Badge variant="outline">GST pending re-verification</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payout" className="mt-5">
          <Card>
            <CardHeader><CardTitle className="text-base">Payout account</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div><Label htmlFor="bank">Bank</Label><Input id="bank" defaultValue="HDFC Bank — Worli Branch" className="mt-1.5" /></div>
              <div><Label htmlFor="acc">Account number</Label><Input id="acc" defaultValue="XXXX XXXX 4821" className="mt-1.5" /></div>
              <div><Label htmlFor="ifsc">IFSC</Label><Input id="ifsc" defaultValue="HDFC0000123" className="mt-1.5" /></div>
              <div>
                <Label>TDS treatment</Label>
                <Select defaultValue="5">
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5% (194H)</SelectItem>
                    <SelectItem value="2">2% (194C)</SelectItem>
                    <SelectItem value="0">Lower deduction certificate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground sm:col-span-2">
                Payment processing is not enabled in this prototype. Details are illustrative.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prefs" className="mt-5">
          <Card>
            <CardHeader><CardTitle className="text-base">Notifications</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                ["New lead assignments", true],
                ["Site-visit confirmations and reminders", true],
                ["Inventory scarcity alerts", true],
                ["Commission status changes", true],
                ["Weekly market intelligence digest", false],
              ].map(([label, on]) => (
                <div key={label as string} className="flex items-center justify-between gap-4">
                  <Label className="font-normal">{label as string}</Label>
                  <Switch defaultChecked={on as boolean} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
