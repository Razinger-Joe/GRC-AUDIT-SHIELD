
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Line
} from "recharts";

const complianceData = [
    { name: "Jan", compliance: 85, target: 90 },
    { name: "Feb", compliance: 88, target: 90 },
    { name: "Mar", compliance: 92, target: 90 },
    { name: "Apr", compliance: 91, target: 90 },
    { name: "May", compliance: 94, target: 90 },
    { name: "Jun", compliance: 96, target: 90 },
];

export const ComplianceTrendsChart = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Overall Compliance Score Trend</CardTitle>
                <CardDescription>Tracking compliance adherence across all active frameworks over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={complianceData}>
                        <defs>
                            <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }} itemStyle={{ color: "hsl(var(--foreground))" }} />
                        <Area type="monotone" dataKey="compliance" stroke="#10b981" fillOpacity={1} fill="url(#colorCompliance)" />
                        <Line type="dashed" dataKey="target" stroke="#ef4444" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
