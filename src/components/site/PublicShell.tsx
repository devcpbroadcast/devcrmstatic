import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, LayoutDashboard, X, ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const nav = [
  { label: "Home", to: "/" },
  // { label: "Projects", to: "/projects" },
  { label: "Solutions", to: "/solutions" },
  // { label: "Market Intelligence", to: "/market-intelligence" },
  { label: "About", to: "/about" },
  { label: "Support", to: "/support" },
] as const;

export function PublicShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:flex lg:justify-between">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="rounded-full px-3.5 py-2 font-display text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="ghost" size="sm" className="gap-1.5 rounded-full">
              {/* <Link to="/app">
                <LayoutDashboard className="h-3.5 w-3.5" /> Workspace
              </Link> */}
            </Button>
            {/* <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link to="/login">Login</Link>
            </Button> */}
            <Button
              asChild
              size="sm"
              variant="outline"
              className="group rounded-full border-2 border-foreground/15 px-5 font-display text-xs font-bold uppercase tracking-[0.12em] hover:border-primary hover:bg-background hover:text-primary"
            >
              <Link to="/register">
                Join Network
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        {open && (
          <div className="border-t border-border bg-background px-4 py-3 lg:hidden">
            <nav className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  className="rounded-md px-2 py-2.5 font-display text-sm font-semibold text-foreground/80 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Separator className="my-3" />
            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1 rounded-full" onClick={() => setOpen(false)}>
                <Link to="/app"><LayoutDashboard className="mr-1.5 h-4 w-4" /> Workspace</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 rounded-full" onClick={() => setOpen(false)}>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="flex-1 rounded-full bg-gradient-primary" onClick={() => setOpen(false)}>
                <Link to="/register">Join Network</Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-16 border-t border-border bg-charcoal text-charcoal-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm text-charcoal-foreground/70">
              One connected operating platform for Mumbai's brokers, developers and capital —
              marketplace, intelligence, CRM and settlement in a single network.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-charcoal-foreground/70">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Built for the Mumbai market
            </div>
          </div>
          {[
            { title: "Platform", links: [["Projects"], ["Market Intelligence"], ["Solutions" ], ["Dashboard"]] },
            { title: "Network", links: [["Join Network"], ["Login"], ["About"], ["Support"]] },
            { title: "Coverage", links: [["Lower Parel"], ["Worli"], ["BKC"], ["Thane & Navi Mumbai"]] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-eyebrow">{col.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-charcoal-foreground/75 transition-colors hover:text-primary">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-charcoal-foreground/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-charcoal-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>© 2026 Real-Estate Business Network. Prototype — sample data only.</p>
            <p>MahaRERA-linked listings · Mumbai Metropolitan Region</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
