
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, TrendingUp } from "lucide-react";

import AIInsightsPanel from "@/components/reporting/AIInsightsPanel";
import { QuickActions } from "@/components/reporting/QuickActions";
import { ReportTemplates } from "@/components/reporting/ReportTemplates";
import { ComplianceTrendsChart } from "@/components/reporting/ComplianceTrendsChart";
import { RiskVelocityChart } from "@/components/reporting/RiskVelocityChart";
import { VulnerabilityMetricsChart } from "@/components/reporting/VulnerabilityMetricsChart";
import { ControlEffectivenessChart } from "@/components/reporting/ControlEffectivenessChart";
import { RiskAgingChart } from "@/components/reporting/RiskAgingChart";
import { SecurityPostureScore } from "@/components/reporting/SecurityPostureScore";

const ReportingDashboard = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex-1 space-y-8">
                {/* Top Section: Quick Actions */}
                <QuickActions />

                {/* Security Reports Quick Access */}
                <Card className="glass-card border-primary/20">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Shield className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">Security & Compliance Reports</CardTitle>
                            </div>
                            <Link to="/reporting/security-reports">
                                <Button variant="outline" size="sm">
                                    <FileText className="mr-2 h-4 w-4" />
                                    View All Reports
                                </Button>
                            </Link>
                        </div>
                        <CardDescription>
                            Industry-standard reports: SOC 2, ISO 27001, NIST CSF, PCI-DSS
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* Report Templates Gallery */}
                <ReportTemplates />

                {/* Analytics Dashboard */}
                <section>
                    <Tabs defaultValue="posture" className="w-full">
                        <TabsList className="mb-4 grid grid-cols-3 lg:grid-cols-6 h-auto">
                            <TabsTrigger value="posture" className="py-2">Security Posture</TabsTrigger>
                            <TabsTrigger value="compliance" className="py-2">Compliance</TabsTrigger>
                            <TabsTrigger value="risk" className="py-2">Risk Analytics</TabsTrigger>
                            <TabsTrigger value="aging" className="py-2">Risk Aging</TabsTrigger>
                            <TabsTrigger value="vuln" className="py-2">Vulnerabilities</TabsTrigger>
                            <TabsTrigger value="controls" className="py-2">Controls</TabsTrigger>
                        </TabsList>

                        <TabsContent value="posture" className="space-y-4">
                            <SecurityPostureScore />
                        </TabsContent>

                        <TabsContent value="compliance" className="space-y-4">
                            <ComplianceTrendsChart />
                        </TabsContent>

                        <TabsContent value="risk" className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <RiskVelocityChart />
                            </div>
                        </TabsContent>

                        <TabsContent value="aging" className="space-y-4">
                            <RiskAgingChart />
                        </TabsContent>

                        <TabsContent value="vuln" className="space-y-4">
                            <VulnerabilityMetricsChart />
                        </TabsContent>

                        <TabsContent value="controls" className="space-y-4">
                            <ControlEffectivenessChart />
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
