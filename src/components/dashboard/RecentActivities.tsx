import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  AlertTriangle,
  FileSearch,
  Shield,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "audit",
    title: "SOC 2 Type II Audit Completed",
    description: "Annual audit passed with zero findings",
    time: "2 hours ago",
    icon: CheckCircle2,
    iconColor: "text-success",
    iconBg: "bg-success/10",
  },
  {
    id: 2,
    type: "alert",
    title: "New Vulnerability Detected",
    description: "CVE-2024-1234 identified in production",
    time: "4 hours ago",
    icon: AlertTriangle,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
  },
  {
    id: 3,
    type: "review",
    title: "Access Control Review Started",
    description: "Quarterly IAM policy assessment",
    time: "6 hours ago",
    icon: FileSearch,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    id: 4,
    type: "update",
    title: "HIPAA Control Updated",
    description: "Encryption policy v2.1 deployed",
    time: "Yesterday",
    icon: Shield,
    iconColor: "text-info",
    iconBg: "bg-info/10",
  },
  {
    id: 5,
    type: "evidence",
    title: "Evidence Uploaded",
    description: "Q4 backup verification logs",
    time: "2 days ago",
    icon: Upload,
    iconColor: "text-muted-foreground",
    iconBg: "bg-muted",
  },
];

export function RecentActivities() {
  return (
    <Card className="p-6 shadow-card bg-card h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Audit Activities</h3>
        <Badge variant="outline" className="text-muted-foreground cursor-pointer hover:bg-muted">
          View All
        </Badge>
      </div>
      <ScrollArea className="h-[320px] pr-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="relative flex gap-4 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={cn(
                    "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    activity.iconBg
                  )}
                >
                  <activity.icon className={cn("h-5 w-5", activity.iconColor)} />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
