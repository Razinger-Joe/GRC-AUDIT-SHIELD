import { Bell, ChevronDown, Search, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Compliance", href: "/compliance" },
  { label: "Risk Management", href: "/risk" },
  { label: "Vulnerabilities", href: "/vulnerabilities" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 shadow-sm">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg tracking-tight hidden sm:inline-block">
            GRC<span className="text-primary">Shield</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <div className="hidden md:flex relative mr-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search controls, frameworks..."
            className="w-64 pl-9 bg-muted/50 border-border/50 focus:bg-muted"
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative mr-2">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive border-2 border-background">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-popover">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Critical vulnerability detected</span>
              <span className="text-xs text-muted-foreground">CVE-2024-1234 found in production</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Compliance review due</span>
              <span className="text-xs text-muted-foreground">HIPAA assessment in 3 days</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Audit completed</span>
              <span className="text-xs text-muted-foreground">SOC 2 Type II passed</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 pl-2 pr-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="hidden sm:inline-block text-sm font-medium">John Auditor</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Team Settings</DropdownMenuItem>
            <DropdownMenuItem>Audit Log</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
