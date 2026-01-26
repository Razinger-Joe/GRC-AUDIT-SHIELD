import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    RadialBarChart,
    RadialBar,
    ResponsiveContainer,
    Legend,
    Tooltip,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { Shield, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Target, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

// Overall Score Data
const scoreData = [
    { name: "Score", value: 78, fill: "hsl(var(--primary))" },
];

// Component Scores
const componentScores = [
    { name: "Access Control", score: 85, icon: Lock, trend: "up", change: "+3%" },
    { name: "Vulnerability Mgmt", score: 72, icon: AlertTriangle, trend: "up", change: "+8%" },
    { name: "Incident Response", score: 88, icon: Shield, trend: "stable", change: "0%" },
    { name: "Compliance", score: 91, icon: CheckCircle2, trend: "up", change: "+2%" },
    { name: "Risk Management", score: 74, icon: Target, trend: "down", change: "-1%" },
    { name: "Data Protection", score: 82, icon: Shield, trend: "up", change: "+5%" },
];

// Historical Trend
const historicalData = [
    { month: "Jan", score: 68 },
    { month: "Feb", score: 70 },
    { month: "Mar", score: 69 },
    { month: "Apr", score: 72 },
    { month: "May", score: 74 },
    { month: "Jun", score: 73 },
    { month: "Jul", score: 75 },
    { month: "Aug", score: 76 },
    { month: "Sep", score: 74 },
    { month: "Oct", score: 77 },
    { month: "Nov", score: 76 },
    { month: "Dec", score: 78 },
];

// Benchmark Data
const benchmarkData = [
    { category: "Your Score", score: 78 },
    { category: "Industry Avg", score: 71 },
    { category: "Top Quartile", score: 89 },
];

const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-info";
    if (score >= 55) return "text-warning";
    return "text-destructive";
};

const getScoreLabel = (score: number) => {
    if (score >= 85) return { label: "Excellent", color: "bg-success" };
    if (score >= 70) return { label: "Good", color: "bg-info" };
    if (score >= 55) return { label: "Fair", color: "bg-warning" };
    return { label: "Poor", color: "bg-destructive" };
};

export const SecurityPostureScore = () => {
    const currentScore = scoreData[0].value;
    const previousScore = historicalData[historicalData.length - 2].score;
    const scoreChange = currentScore - previousScore;
    const { label, color } = getScoreLabel(currentScore);

    return (
        <div className="space-y-6">
            {/* Main Score Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="glass-card lg:col-span-1">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-lg">Security Posture Score</CardTitle>
                        <CardDescription>Overall organization security health</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <div className="relative w-48 h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="70%"
                                    outerRadius="100%"
                                    startAngle={180}
                                    endAngle={0}
                                    data={scoreData}
                                >
                                    <RadialBar
                                        background={{ fill: "hsl(var(--muted))" }}
                                        dataKey="value"
                                        cornerRadius={10}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={cn("text-5xl font-bold", getScoreColor(currentScore))}>
                                    {currentScore}
                                </span>
                                <span className="text-sm text-muted-foreground">out of 100</span>
                            </div>
                        </div>
                        <Badge className={cn("mt-4", color)}>{label}</Badge>
                        <div className="flex items-center gap-2 mt-2">
                            {scoreChange >= 0 ? (
                                <TrendingUp className="h-4 w-4 text-success" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-destructive" />
                            )}
                            <span className={cn("text-sm font-medium", scoreChange >= 0 ? "text-success" : "text-destructive")}>
                                {scoreChange >= 0 ? "+" : ""}{scoreChange} points from last month
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* Component Breakdown */}
                <Card className="glass-card lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg">Component Breakdown</CardTitle>
                        <CardDescription>Security score by control domain</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {componentScores.map((comp) => {
                                const Icon = comp.icon;
                                return (
                                    <div key={comp.name} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <div className={cn(
                                            "p-2 rounded-lg",
                                            comp.score >= 80 ? "bg-success/20" : comp.score >= 70 ? "bg-info/20" : "bg-warning/20"
                                        )}>
                                            <Icon className={cn(
                                                "h-5 w-5",
                                                comp.score >= 80 ? "text-success" : comp.score >= 70 ? "text-info" : "text-warning"
                                            )} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium">{comp.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className={cn("text-sm font-bold", getScoreColor(comp.score))}>
                                                        {comp.score}
                                                    </span>
                                                    {comp.trend === "up" && (
                                                        <span className="text-xs text-success flex items-center">
                                                            <TrendingUp className="h-3 w-3 mr-0.5" />{comp.change}
                                                        </span>
                                                    )}
                                                    {comp.trend === "down" && (
                                                        <span className="text-xs text-destructive flex items-center">
                                                            <TrendingDown className="h-3 w-3 mr-0.5" />{comp.change}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Progress value={comp.score} className="h-2" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Historical Trend */}
                <Card className="glass-card lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg">12-Month Trend</CardTitle>
                        <CardDescription>Security posture score evolution over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={historicalData}>
                                <defs>
                                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="month" />
                                <YAxis domain={[50, 100]} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        borderColor: "hsl(var(--border))",
                                        borderRadius: "8px"
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="hsl(var(--primary))"
                                    fill="url(#scoreGradient)"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Benchmark Comparison */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg">Industry Benchmark</CardTitle>
                        <CardDescription>How you compare to peers</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {benchmarkData.map((item) => (
                            <div key={item.category} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{item.category}</span>
                                    <span className={cn(
                                        "text-lg font-bold",
                                        item.category === "Your Score" ? "text-primary" : "text-muted-foreground"
                                    )}>
                                        {item.score}
                                    </span>
                                </div>
                                <Progress
                                    value={item.score}
                                    className={cn(
                                        "h-3",
                                        item.category === "Your Score" && "[&>div]:bg-primary",
                                        item.category === "Industry Avg" && "[&>div]:bg-muted-foreground",
                                        item.category === "Top Quartile" && "[&>div]:bg-success"
                                    )}
                                />
                            </div>
                        ))}
                        <div className="pt-4 border-t">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                                <span className="text-success font-medium">Above industry average</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                You're performing better than 65% of organizations in your sector
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SecurityPostureScore;
