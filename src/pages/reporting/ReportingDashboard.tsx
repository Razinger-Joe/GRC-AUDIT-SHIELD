
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, BarChart3, PieChart, Download } from "lucide-react";



import AIInsightsPanel from "@/components/reporting/AIInsightsPanel";
import { QuickActions } from "@/components/reporting/QuickActions";
import { ReportTemplates } from "@/components/reporting/ReportTemplates";



const ReportingDashboard = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex-1 space-y-8">
                {/* Top Section: Quick Actions */}
                <QuickActions />

                {/* Report Templates Gallery */}
                <ReportTemplates />

                {/* Analytics Dashboard */}
                <section>
                    <Tabs defaultValue="compliance" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="compliance">Compliance Trends</TabsTrigger>
                            <TabsTrigger value="risk">Risk Analytics</TabsTrigger>
                            <TabsTrigger value="vuln">Vulnerability Metrics</TabsTrigger>
                            <TabsTrigger value="controls">Control Effectiveness</TabsTrigger>
                        </TabsList>

                        <TabsContent value="compliance" className="space-y-4">
                            <ComplianceTrendsChart />
                        </TabsContent>

                        <TabsContent value="risk" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <RiskVelocityChart />
                                {/* Placeholder for Risk Aging or other charts */}
                                <Card className="flex items-center justify-center bg-muted/20">
                                    <div className="text-center p-8">
                                        <PieChart className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                                        <h3 className="text-lg font-medium text-muted-foreground">Risk Aging Analysis</h3>
                                        <p className="text-sm text-muted-foreground">Chart loading...</p>
                                    </div>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Additional tabs (vuln, controls) would go here similarly */}
                        <TabsContent value="vuln">
                            <div className="p-12 text-center border rounded-lg border-dashed">
                                <h3 className="text-lg font-medium">Vulnerability Metrics</h3>
                                <p className="text-muted-foreground">MTTR and Severity distribution charts will appear here.</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="controls">
                            <div className="p-12 text-center border rounded-lg border-dashed">
                                <h3 className="text-lg font-medium">Control Effectiveness</h3>
                                <p className="text-muted-foreground">Heatmap and pass/fail rates will appear here.</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </section>
            </div>
            <div className="w-full lg:w-80">
                <AIInsightsPanel />
            </div>
        </div>
    );
};

export default ReportingDashboard;
