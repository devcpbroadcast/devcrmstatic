import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  Building2,
  Users,
  CalendarCheck,
  Handshake,
  LineChart,
  UsersRound,
  CheckSquare,
  Wallet,
  Bell,
  Settings,
  Globe,
  Search,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const primaryNav = [
  { label: "Overview", to: "/app", icon: LayoutGrid, exact: true },
  { label: "Projects", to: "/app/projects", icon: Building2 },
  { label: "Leads", to: "/app/leads", icon: Users },
  { label: "Site Visits", to: "/app/visits", icon: CalendarCheck },
  { label: "Opportunities", to: "/app/opportunities", icon: Handshake },
  { label: "Intelligence", to: "/app/intelligence", icon: LineChart },
];

const secondaryNav = [
  { label: "Team", to: "/app/team", icon: UsersRound },
  { label: "Tasks", to: "/app/tasks", icon: CheckSquare },
  { label: "Commissions", to: "/app/commissions", icon: Wallet },
  { label: "Notifications", to: "/app/notifications", icon: Bell },
  { label: "Settings", to: "/app/settings", icon: Settings },
];

function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-3.5">
        <Logo tone="light" to="/app" compact />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNav.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to, item.exact)} tooltip={item.label}>
                    <Link to={item.to}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to)} tooltip={item.label}>
                    <Link to={item.to}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Back to public site">
              <Link to="/">
                <Globe className="h-4 w-4" />
                <span>Public site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-surface">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background px-3 sm:px-5">
            <SidebarTrigger />
            <Logo to="/app" compact className="md:hidden" />

            <div className="relative hidden min-w-0 flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search leads, projects, units…"
                className="h-9 max-w-md pl-9"
                aria-label="Global search"
              />
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-2">
              <Button asChild variant="ghost" size="icon" aria-label="Notifications">
                <Link to="/app/notifications">
                  <Bell className="h-4 w-4" />
                </Link>
              </Button>
              <Badge variant="outline" className="hidden sm:inline-flex">
                Broker · Mumbai
              </Badge>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-xs text-primary-foreground">AS</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <div className="min-w-0 flex-1 px-3 py-6 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
                  {description && (
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  )}
                </div>
                {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
              </div>
              <div className="mt-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
