import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { date: "Jan 1", riskScore: 72, vulnerabilities: 45, compliance: 89 },
  { date: "Jan 5", riskScore: 68, vulnerabilities: 42, compliance: 91 },
  { date: "Jan 10", riskScore: 65, vulnerabilities: 38, compliance: 92 },
  { date: "Jan 15", riskScore: 71, vulnerabilities: 48, compliance: 90 },
  { date: "Jan 20", riskScore: 58, vulnerabilities: 32, compliance: 94 },
  { date: "Jan 25", riskScore: 52, vulnerabilities: 28, compliance: 95 },
  { date: "Jan 30", riskScore: 45, vulnerabilities: 22, compliance: 97 },
];

export function RiskTrendChart() {
  return (
    <Card className="p-6 shadow-card bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold">Risk Trend Over Time</h3>
          <p className="text-sm text-muted-foreground">
            Last 30 days risk assessment overview
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-destructive" />
            <span className="text-sm text-muted-foreground">Risk Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Compliance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-warning" />
            <span className="text-sm text-muted-foreground">Vulnerabilities</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="complianceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Area
              type="monotone"
              dataKey="compliance"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#complianceGradient)"
            />
            <Area
              type="monotone"
              dataKey="riskScore"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              fill="url(#riskGradient)"
            />
            <Line
              type="monotone"
              dataKey="vulnerabilities"
              stroke="hsl(var(--warning))"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
