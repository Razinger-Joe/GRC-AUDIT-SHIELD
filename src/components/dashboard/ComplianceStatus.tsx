import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const frameworks = [
  { name: "HIPAA", score: 98, status: "compliant" },
  { name: "PCI-DSS", score: 94, status: "compliant" },
  { name: "SOC 2", score: 96, status: "compliant" },
  { name: "SOX", score: 100, status: "compliant" },
  { name: "ISO 27001", score: 88, status: "in-progress" },
];

export function ComplianceStatus() {
  const getStatusBadge = (status: string, score: number) => {
    if (score >= 95) {
      return (
        <Badge className="bg-success/10 text-success border-success/20">
          Compliant
        </Badge>
      );
    }
    if (score >= 80) {
      return (
        <Badge className="bg-warning/10 text-warning border-warning/20">
          In Progress
        </Badge>
      );
    }
    return (
      <Badge className="bg-destructive/10 text-destructive border-destructive/20">
        Non-Compliant
      </Badge>
    );
  };

  const getProgressColor = (score: number) => {
    if (score >= 95) return "bg-success";
    if (score >= 80) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <Card className="p-6 shadow-card bg-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Compliance Status by Framework</h3>
        <Badge variant="outline" className="text-muted-foreground">
          {frameworks.length} Frameworks
        </Badge>
      </div>
      <div className="space-y-5">
        {frameworks.map((framework, index) => (
          <div
            key={framework.name}
            className="animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="font-medium">{framework.name}</span>
                {getStatusBadge(framework.status, framework.score)}
              </div>
              <span
                className={cn(
                  "text-sm font-bold",
                  framework.score >= 95 && "text-success",
                  framework.score >= 80 && framework.score < 95 && "text-warning",
                  framework.score < 80 && "text-destructive"
                )}
              >
                {framework.score}%
              </span>
            </div>
            <div className="relative h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full transition-all duration-700",
                  getProgressColor(framework.score)
                )}
                style={{ width: `${framework.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
