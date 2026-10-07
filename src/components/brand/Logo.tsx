import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "dark",
  to = "/",
  compact = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  to?: string;
  compact?: boolean;
}) {
  return (
    <Link to={to} className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <img
        src="/cp-logo.png"
        alt="CP Logo"
        width={44}
        height={40}
        className="h-10 w-auto shrink-0 object-contain"
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "font-display text-[0.95rem] font-extrabold leading-[1.1] tracking-tight",
            tone === "light" ? "text-sidebar-foreground" : "text-foreground",
          )}
        >
          Real-Estate <span className="text-primary">Business</span>
          <br />
          <span className="text-primary">Network</span>
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1.5 truncate text-[0.55rem] font-semibold uppercase tracking-[0.16em]",
              tone === "light" ? "text-sidebar-foreground/60" : "text-muted-foreground",
            )}
          >
            one network. every opportunity.
          </span>
        )}
      </span>

    </Link>
  );
}
