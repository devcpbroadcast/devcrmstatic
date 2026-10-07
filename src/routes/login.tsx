import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import heroImage from "@/assets/mumbai-skyline.jpg";

const roles = ["Broker", "Developer", "Team"] as const;


export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login | Real-Estate Business Network" },
      { name: "description", content: "Sign in to the Mumbai real-estate business network workspace." },
      { property: "og:title", content: "Login — Real-Estate Business Network" },
      { property: "og:description", content: "Access your broker, developer or team member workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("Broker");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-5 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <Logo />
          <h1 className="mt-10 text-3xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Prototype login — any credentials open the dashboard.
          </p>
          <Card className="mt-6">
            <CardContent className="p-6">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success(`Signed in as ${role} (prototype)`);
                  navigate({ to: "/app" });
                }}
              >
                <div>
                  <Label>Sign in as</Label>
                  <ToggleGroup
                    type="single"
                    value={role}
                    onValueChange={(v) => v && setRole(v)}
                    className="mt-1.5 grid grid-cols-3 gap-2"
                  >
                    {roles.map((r) => (
                      <ToggleGroupItem
                        key={r}
                        value={r}
                        className="h-9 rounded-md border border-border text-xs data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
                      >
                        {r}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <div>
                  <Label htmlFor="email">Email or mobile</Label>
                  <Input id="email" required defaultValue="aditi@sharmarealty.in" className="mt-1.5" />
                </div>

                <div>
                  <Label htmlFor="pass">Password</Label>
                  <Input id="pass" type="password" required defaultValue="password" className="mt-1.5" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox defaultChecked /> Keep me signed in
                  </label>
                  <button type="button" className="text-sm text-primary hover:underline" onClick={() => toast.info("Prototype only")}>
                    Forgot password?
                  </button>
                </div>
                <Button type="submit" className="w-full">Sign in</Button>
              </form>
            </CardContent>
          </Card>
          <p className="mt-6 text-sm text-muted-foreground">
            New to the network?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">Join the network</Link>
          </p>
          <p className="mt-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">← Back to the public site</Link>
          </p>
        </div>
      </div>

      <div className="relative hidden bg-charcoal lg:block">
        <img src={heroImage} alt="Mumbai skyline" width={1600} height={1000} className="h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-charcoal-foreground">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <h2 className="mt-4 max-w-md text-3xl font-bold leading-tight">
            connect. collaborate. close.
          </h2>
          <p className="mt-3 max-w-md text-sm text-charcoal-foreground/75">
            4,180+ verified brokers, 18,420 mapped units and ₹214 Cr of settled commissions on one
            Mumbai network.
          </p>
        </div>
      </div>
    </div>
  );
}
