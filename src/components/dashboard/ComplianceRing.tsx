import { cn } from "@/lib/utils";

interface ComplianceRingProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const sizeConfig = {
  sm: { width: 48, stroke: 4, fontSize: "text-sm" },
  md: { width: 64, stroke: 5, fontSize: "text-lg" },
  lg: { width: 80, stroke: 6, fontSize: "text-2xl" },
};

export function ComplianceRing({
  percentage,
  size = "md",
  showLabel = true,
}: ComplianceRingProps) {
  const config = sizeConfig[size];
  const radius = (config.width - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 90) return "stroke-success";
    if (percentage >= 70) return "stroke-warning";
    return "stroke-destructive";
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={config.width}
        height={config.width}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={config.stroke}
        />
        {/* Progress circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          className={cn(getColor(), "transition-all duration-500")}
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {showLabel && (
        <span
          className={cn(
            "absolute font-bold",
            config.fontSize,
            percentage >= 90 && "text-success",
            percentage >= 70 && percentage < 90 && "text-warning",
            percentage < 70 && "text-destructive"
          )}
        >
          {percentage}%
        </span>
      )}
    </div>
  );
}
