import {
  LayoutDashboard,
  ShieldCheck,
  Server,
  AlertTriangle,
  Scan,
  History,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Activity
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/" },
  { icon: ShieldCheck, label: "Compliance", href: "/compliance", badge: "5 Active" },
  { icon: Server, label: "IT Controls", href: "/itgc" },
  { icon: AlertTriangle, label: "Risk Assessment", href: "/risk-assessment" },
  { icon: Scan, label: "Vulnerabilities", href: "/vulnerabilities" },
  { icon: History, label: "Audit Trail", href: "/audit-trail" },
  { icon: BarChart3, label: "Reporting", href: "/reporting" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-white/10 glass-panel transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border border-white/10 bg-card shadow-lg hover:bg-primary/20 hover:text-primary transition-all"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* App Logo / Brand (Optional in sidebar if not in navbar) */}
      {!collapsed && (
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center mr-3 shadow-glow-primary">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Audit<span className="text-primary">Shield</span></span>
        </div>
      )}
      {collapsed && (
        <div className="h-16 flex items-center justify-center border-b border-white/5">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
      )}

      <ScrollArea className="flex-1 py-4">
        <nav className="flex flex-col gap-1 px-3">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden",
                  isActive
                    ? "text-white shadow-lg"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 gradient-primary opacity-20 pointer-events-none" />
                )}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 gradient-primary shadow-glow-primary" />
                )}

                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-all duration-300 z-10",
                    isActive ? "text-primary drop-shadow-md" : "text-muted-foreground group-hover:text-primary group-hover:scale-110"
                  )}
                />
                {!collapsed && (
                  <>
                    <span className="flex-1 z-10">{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20 text-[10px] px-2 h-5 z-10"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {!collapsed && (
        <div className="p-4 border-t border-white/5 bg-black/20">
          <div className="rounded-xl border border-white/5 bg-gradient-to-br from-card/50 to-card/10 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-muted-foreground">System Status</p>
              <Activity className="h-3 w-3 text-success animate-pulse" />
            </div>

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success shadow-glow-success"></span>
              </span>
              <span className="text-xs font-medium text-success">All Systems Operational</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
