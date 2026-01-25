import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ComplianceRing } from "@/components/dashboard/ComplianceRing";
import { ComplianceStatus } from "@/components/dashboard/ComplianceStatus";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { RiskTrendChart } from "@/components/dashboard/RiskTrendChart";
import { ShieldCheck, Activity, AlertTriangle, Gauge } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-up">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back. Here's your GRC overview for today.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
            <KPICard
              title="Total Controls Monitored"
              value="1,284"
              trend={{ value: 12, direction: "up" }}
              subtitle="Across 5 frameworks"
              icon={<ShieldCheck className="h-6 w-6" />}
              variant="primary"
            />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <KPICard
              title="Compliance Score"
              value="96%"
              trend={{ value: 3, direction: "up" }}
              subtitle="Overall average"
              icon={<Activity className="h-6 w-6" />}
              variant="success"
              chart={<ComplianceRing percentage={96} size="sm" />}
            />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
            <KPICard
              title="Critical Vulnerabilities"
              value="3"
              trend={{ value: 2, direction: "down" }}
              subtitle="Requires immediate action"
              icon={<AlertTriangle className="h-6 w-6" />}
              variant="danger"
            />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "400ms" }}>
            <KPICard
              title="Risk Score"
              value="Low"
              trend={{ value: 15, direction: "down" }}
              subtitle="45/100 - Improved"
              icon={<Gauge className="h-6 w-6" />}
              variant="success"
            />
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="animate-fade-up" style={{ animationDelay: "500ms" }}>
            <ComplianceStatus />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "600ms" }}>
            <RecentActivities />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="animate-fade-up" style={{ animationDelay: "700ms" }}>
          <RiskTrendChart />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
