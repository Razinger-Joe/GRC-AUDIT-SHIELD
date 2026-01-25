
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const riskVelocityData = [
    { name: "High", open: 12, resolved: 8 },
    { name: "Medium", open: 25, resolved: 20 },
    { name: "Low", open: 40, resolved: 38 },
];

export const RiskVelocityChart = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Risk Velocity</CardTitle>
                <CardDescription>Open vs Resolved risks by severity</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskVelocityData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }} itemStyle={{ color: "hsl(var(--foreground))" }} />
                        <Legend />
                        <Bar dataKey="open" fill="#ef4444" name="Open Risks" />
                        <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
