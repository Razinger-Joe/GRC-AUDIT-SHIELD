import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  icon: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "primary";
  chart?: ReactNode;
}

const variantStyles = {
  default: "border-border",
  success: "border-success/30 glow-success",
  warning: "border-warning/30 glow-warning",
  danger: "border-destructive/30 glow-danger",
  primary: "border-primary/30 glow-primary",
};

const iconBgStyles = {
  default: "bg-muted",
  success: "bg-success/10",
  warning: "bg-warning/10",
  danger: "bg-destructive/10",
  primary: "bg-primary/10",
};

const iconColorStyles = {
  default: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
  primary: "text-primary",
};

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  icon,
  variant = "default",
  chart,
}: KPICardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden p-6 transition-all duration-300 hover:shadow-card-hover shadow-card bg-card",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight">{value}</span>
            {trend && (
              <span
                className={cn(
                  "flex items-center gap-0.5 text-sm font-medium",
                  trend.direction === "up" && "text-success",
                  trend.direction === "down" && "text-destructive",
                  trend.direction === "neutral" && "text-muted-foreground"
                )}
              >
                {trend.direction === "up" && <TrendingUp className="h-4 w-4" />}
                {trend.direction === "down" && <TrendingDown className="h-4 w-4" />}
                {trend.direction === "neutral" && <Minus className="h-4 w-4" />}
                {trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            iconBgStyles[variant]
          )}
        >
          <div className={iconColorStyles[variant]}>{icon}</div>
        </div>
      </div>
      {chart && <div className="mt-4">{chart}</div>}
    </Card>
  );
}
