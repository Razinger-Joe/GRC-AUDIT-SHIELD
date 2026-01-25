
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

const AIInsightsPanel = () => {
    return (
        <Card className="bg-gradient-to-b from-primary/5 to-transparent border-primary/20">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                    <CardTitle className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Intelligence Briefing</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        Predicted Trends
                    </h4>
                    <p className="text-xs text-muted-foreground">
                        Compliance score projected to reach 98% by next month based on current remediation velocity.
                    </p>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        Anomaly Detection
                    </h4>
                    <p className="text-xs text-muted-foreground">
                        Unusual spike in failed login attempts detected in the Finance module (240% increase).
                    </p>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-blue-500" />
                        Recommended Actions
                    </h4>
                    <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                        <li>Review access controls for Finance module.</li>
                        <li>Schedule ISO 27001 internal audit.</li>
                        <li>Update vulnerability patch policy.</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default AIInsightsPanel;
