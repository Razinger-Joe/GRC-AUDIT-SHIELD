import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    Cell,
} from "recharts";
import { Shield, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// Control Domain Effectiveness Data
const domainData = [
    { domain: "Access Control", effectiveness: 85, fullMark: 100 },
    { domain: "Audit & Accountability", effectiveness: 78, fullMark: 100 },
    { domain: "Security Assessment", effectiveness: 92, fullMark: 100 },
    { domain: "Config Management", effectiveness: 71, fullMark: 100 },
    { domain: "Incident Response", effectiveness: 88, fullMark: 100 },
    { domain: "Risk Assessment", effectiveness: 82, fullMark: 100 },
    { domain: "System Protection", effectiveness: 76, fullMark: 100 },
    { domain: "Media Protection", effectiveness: 94, fullMark: 100 },
];

// Control Pass/Fail Data
const passFailData = [
    { control: "AC-001", passed: 45, failed: 3, name: "Access Control Policy" },
    { control: "AU-002", passed: 38, failed: 7, name: "Audit Events" },
    { control: "CA-007", passed: 52, failed: 1, name: "Continuous Monitoring" },
    { control: "CM-002", passed: 41, failed: 5, name: "Baseline Configuration" },
    { control: "IR-004", passed: 48, failed: 2, name: "Incident Handling" },
    { control: "RA-003", passed: 36, failed: 8, name: "Risk Assessment" },
];

// Control Heatmap Data
const heatmapData = [
    { category: "Preventive", automated: 92, manual: 78, detective: 85 },
    { category: "Detective", automated: 88, manual: 72, detective: 91 },
    { category: "Corrective", automated: 75, manual: 68, detective: 82 },
    { category: "Compensating", automated: 70, manual: 85, detective: 77 },
];

const getEffectivenessColor = (value: number) => {
    if (value >= 90) return "text-success";
    if (value >= 75) return "text-info";
    if (value >= 60) return "text-warning";
    return "text-destructive";
};

const getEffectivenessLabel = (value: number) => {
    if (value >= 90) return "Excellent";
    if (value >= 75) return "Good";
    if (value >= 60) return "Fair";
    return "Poor";
};

export const ControlEffectivenessChart = () => {
    const avgEffectiveness = Math.round(domainData.reduce((sum, d) => sum + d.effectiveness, 0) / domainData.length);
    const totalPassed = passFailData.reduce((sum, c) => sum + c.passed, 0);
    const totalFailed = passFailData.reduce((sum, c) => sum + c.failed, 0);
    const passRate = Math.round((totalPassed / (totalPassed + totalFailed)) * 100);

    return (
        <div className="space-y-6">
            {/* KPI Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="glass-card">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Overall Effectiveness</p>
                                <p className={cn("text-3xl font-bold", getEffectivenessColor(avgEffectiveness))}>
                                    {avgEffectiveness}%
                                </p>
                                <Badge variant="outline" className={cn("mt-1", getEffectivenessColor(avgEffectiveness))}>
                                    {getEffectivenessLabel(avgEffectiveness)}
                                </Badge>
                            </div>
                            <Shield className="h-10 w-10 text-primary opacity-80" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Control Pass Rate</p>
                                <p className="text-3xl font-bold text-success">{passRate}%</p>
                                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                    <CheckCircle2 className="h-3 w-3 text-success" /> {totalPassed} passed
                                    <XCircle className="h-3 w-3 text-destructive ml-2" /> {totalFailed} failed
                                </div>
                            </div>
                            <CheckCircle2 className="h-10 w-10 text-success opacity-80" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Controls Needing Attention</p>
                                <p className="text-3xl font-bold text-warning">
                                    {domainData.filter(d => d.effectiveness < 80).length}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">Below 80% effectiveness</p>
                            </div>
                            <AlertTriangle className="h-10 w-10 text-warning opacity-80" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Radar Chart */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg">Control Domain Effectiveness</CardTitle>
                        <CardDescription>Effectiveness score by security control domain</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={domainData}>
                                <PolarGrid className="stroke-muted" />
                                <PolarAngleAxis
                                    dataKey="domain"
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                                />
                                <PolarRadiusAxis
                                    angle={90}
                                    domain={[0, 100]}
                                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                />
                                <Radar
                                    name="Effectiveness"
                                    dataKey="effectiveness"
                                    stroke="hsl(var(--primary))"
                                    fill="hsl(var(--primary))"
                                    fillOpacity={0.3}
                                    strokeWidth={2}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        borderColor: "hsl(var(--border))",
                                        borderRadius: "8px"
                                    }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Pass/Fail Bar Chart */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg">Control Test Results</CardTitle>
                        <CardDescription>Pass vs fail rates for key controls</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={passFailData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis type="number" />
                                <YAxis dataKey="control" type="category" width={60} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        borderColor: "hsl(var(--border))",
                                        borderRadius: "8px"
                                    }}
                                    formatter={(value, name, props) => [value, name]}
                                    labelFormatter={(label) => {
                                        const item = passFailData.find(d => d.control === label);
                                        return item?.name || label;
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="passed" stackId="a" fill="#22c55e" name="Passed" />
                                <Bar dataKey="failed" stackId="a" fill="#ef4444" name="Failed" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Control Categories Breakdown */}
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle className="text-lg">Control Categories Performance</CardTitle>
                    <CardDescription>Effectiveness breakdown by control type and implementation</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {heatmapData.map((cat) => (
                            <div key={cat.category} className="space-y-3">
                                <h4 className="font-medium text-sm">{cat.category} Controls</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Automated</span>
                                        <span className={cn("font-medium", getEffectivenessColor(cat.automated))}>
                                            {cat.automated}%
                                        </span>
                                    </div>
                                    <Progress value={cat.automated} className="h-2" />

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Manual</span>
                                        <span className={cn("font-medium", getEffectivenessColor(cat.manual))}>
                                            {cat.manual}%
                                        </span>
                                    </div>
                                    <Progress value={cat.manual} className="h-2" />

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Detective</span>
                                        <span className={cn("font-medium", getEffectivenessColor(cat.detective))}>
                                            {cat.detective}%
                                        </span>
                                    </div>
                                    <Progress value={cat.detective} className="h-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ControlEffectivenessChart;
