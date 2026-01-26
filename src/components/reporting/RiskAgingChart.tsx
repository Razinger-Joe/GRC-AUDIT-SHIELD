import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell,
    ComposedChart,
    Line,
} from "recharts";
import { Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Risk Aging Buckets Data
const agingData = [
    { bucket: "0-30 days", critical: 3, high: 8, medium: 15, low: 22, total: 48 },
    { bucket: "31-60 days", critical: 2, high: 5, medium: 12, low: 18, total: 37 },
    { bucket: "61-90 days", critical: 1, high: 4, medium: 8, low: 10, total: 23 },
    { bucket: "91-180 days", critical: 2, high: 3, medium: 5, low: 6, total: 16 },
    { bucket: "180+ days", critical: 4, high: 6, medium: 3, low: 2, total: 15 },
];

// Overdue Risks by Owner
const overdueByOwner = [
    { owner: "Security Team", overdue: 8, onTrack: 24 },
    { owner: "IT Operations", overdue: 12, onTrack: 18 },
    { owner: "Development", overdue: 5, onTrack: 31 },
    { owner: "Compliance", overdue: 3, onTrack: 22 },
    { owner: "HR", overdue: 2, onTrack: 15 },
];

// Aging Trend Over Time
const agingTrend = [
    { month: "Jul", avgAge: 45, overdueCount: 18 },
    { month: "Aug", avgAge: 42, overdueCount: 15 },
    { month: "Sep", avgAge: 38, overdueCount: 12 },
    { month: "Oct", avgAge: 35, overdueCount: 14 },
    { month: "Nov", avgAge: 32, overdueCount: 11 },
    { month: "Dec", avgAge: 28, overdueCount: 9 },
];

const SEVERITY_COLORS = {
    critical: "#ef4444",
    high: "#f97316",
    medium: "#eab308",
    low: "#22c55e",
};

export const RiskAgingChart = () => {
    const totalOverdue = agingData.slice(2).reduce((sum, d) => sum + d.total, 0);
    const criticalOverdue = agingData.filter(d => d.bucket.includes("180+") || d.bucket.includes("91-180"))
        .reduce((sum, d) => sum + d.critical, 0);
    const avgAge = Math.round(agingTrend[agingTrend.length - 1].avgAge);

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="glass-card">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Avg Risk Age</p>
                                <p className="text-3xl font-bold">{avgAge} days</p>
                                <p className="text-xs text-success mt-1 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3 rotate-180" /> 12% improvement
                                </p>
                            </div>
                            <Clock className="h-10 w-10 text-info opacity-80" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-warning/30">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Overdue Risks (90+ days)</p>
                                <p className="text-3xl font-bold text-warning">{totalOverdue}</p>
                                <p className="text-xs text-muted-foreground mt-1">Requires escalation</p>
                            </div>
                            <AlertTriangle className="h-10 w-10 text-warning opacity-80" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-destructive/30">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Critical Long-Standing</p>
                                <p className="text-3xl font-bold text-destructive">{criticalOverdue}</p>
                                <p className="text-xs text-muted-foreground mt-1">90+ days old</p>
                            </div>
                            <Badge variant="destructive" className="animate-pulse">Action Required</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Aging Chart */}
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle className="text-lg">Risk Aging Distribution</CardTitle>
                    <CardDescription>Number of open risks by age bucket and severity level</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={agingData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="bucket" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    borderColor: "hsl(var(--border))",
                                    borderRadius: "8px"
                                }}
                            />
                            <Legend />
                            <Bar dataKey="critical" stackId="a" fill={SEVERITY_COLORS.critical} name="Critical" />
                            <Bar dataKey="high" stackId="a" fill={SEVERITY_COLORS.high} name="High" />
                            <Bar dataKey="medium" stackId="a" fill={SEVERITY_COLORS.medium} name="Medium" />
                            <Bar dataKey="low" stackId="a" fill={SEVERITY_COLORS.low} name="Low" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Overdue by Owner */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg">Overdue Risks by Team</CardTitle>
                        <CardDescription>Risk ownership and remediation status</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={overdueByOwner} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis type="number" />
                                <YAxis dataKey="owner" type="category" width={100} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        borderColor: "hsl(var(--border))",
                                        borderRadius: "8px"
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="onTrack" fill="#22c55e" name="On Track" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="overdue" fill="#ef4444" name="Overdue" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Aging Trend */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg">Aging Trend</CardTitle>
                        <CardDescription>Average risk age and overdue count over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={agingTrend}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" orientation="left" label={{ value: 'Avg Age (days)', angle: -90, position: 'insideLeft' }} />
                                <YAxis yAxisId="right" orientation="right" label={{ value: 'Overdue Count', angle: 90, position: 'insideRight' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        borderColor: "hsl(var(--border))",
                                        borderRadius: "8px"
                                    }}
                                />
                                <Legend />
                                <Bar yAxisId="right" dataKey="overdueCount" fill="#f97316" name="Overdue Count" opacity={0.7} />
                                <Line yAxisId="left" type="monotone" dataKey="avgAge" stroke="hsl(var(--primary))" strokeWidth={3} name="Avg Age" dot={{ r: 5 }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RiskAgingChart;
