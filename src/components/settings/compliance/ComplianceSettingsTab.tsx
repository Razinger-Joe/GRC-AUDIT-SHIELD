
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Shield, Settings, FileText, Info } from "lucide-react";

export const ComplianceSettingsTab = () => {
    const [frameworks, setFrameworks] = useState([
        { id: 'soc2', name: 'SOC 2 Type II', version: '2017', enabled: true, controls: 64 },
        { id: 'iso27001', name: 'ISO 27001', version: '2022', enabled: true, controls: 114 },
        { id: 'hipaa', name: 'HIPAA', version: '2013', enabled: false, controls: 42 },
        { id: 'pci', name: 'PCI DSS', version: '4.0', enabled: false, controls: 250 },
        { id: 'gdpr', name: 'GDPR', version: '2018', enabled: true, controls: 99 },
        { id: 'nist', name: 'NIST CSF', version: '2.0', enabled: false, controls: 108 },
    ]);

    const toggleFramework = (id: string) => {
        setFrameworks(frameworks.map(fw =>
            fw.id === id ? { ...fw, enabled: !fw.enabled } : fw
        ));
    };

    return (
        <TooltipProvider>
            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Active Frameworks */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Framework Library</CardTitle>
                                    <CardDescription>Manage active compliance frameworks and standards.</CardDescription>
                                </div>
                                <Button className="gap-2">
                                    <Plus className="w-4 h-4" /> Import Custom Framework
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {frameworks.map((fw) => (
                                    <div key={fw.id} className={`flex flex-col gap-3 p-4 border rounded-lg transition-colors ${fw.enabled ? 'bg-card' : 'bg-muted/30 border-dashed'}`}>
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-primary/10 rounded-md text-primary">
                                                    <Shield className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold">{fw.name}</div>
                                                    <div className="text-xs text-muted-foreground">Version {fw.version}</div>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={fw.enabled}
                                                onCheckedChange={() => toggleFramework(fw.id)}
                                            />
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-muted-foreground">{fw.controls} Controls</div>
                                            <Button variant="ghost" size="sm" className="h-7 text-xs" disabled={!fw.enabled}>
                                                <Settings className="w-3 h-3 mr-1" /> Configure
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Audit Configuration */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Audit & Testing Configuration</CardTitle>
                            <CardDescription>Set defaults for automated testing and evidence behavior.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Default Audit Frequency</Label>
                                <Select defaultValue="annual">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="continuous">Continuous (Real-time)</SelectItem>
                                        <SelectItem value="quarterly">Quarterly</SelectItem>
                                        <SelectItem value="semi">Semi-Annual</SelectItem>
                                        <SelectItem value="annual">Annual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Evidence Retention Policy</Label>
                                <Select defaultValue="7years">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1year">1 Year</SelectItem>
                                        <SelectItem value="3years">3 Years</SelectItem>
                                        <SelectItem value="7years">7 Years (Recommended)</SelectItem>
                                        <SelectItem value="indefinite">Indefinite (Legal Hold)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between space-x-2 pt-2">
                                <Label className="flex-1">Require Auditor Approval</Label>
                                <Switch defaultChecked />
                            </div>
                            <p className="text-xs text-muted-foreground">If enabled, evidence must be explicitly marked as 'Approved' by an Auditor role.</p>
                        </CardContent>
                    </Card>

                    {/* External Auditor Access */}
                    <Card>
                        <CardHeader>
                            <CardTitle>External Auditor Access</CardTitle>
                            <CardDescription>Manage guest access for 3rd party audits.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 border border-dashed rounded-lg bg-yellow-50/50 dark:bg-yellow-900/10 flex items-start gap-4">
                                <FileText className="w-5 h-5 text-yellow-600 mt-1" />
                                <div className="space-y-1">
                                    <div className="font-semibold text-sm">Active Audit Season</div>
                                    <p className="text-xs text-muted-foreground">SOC 2 Type II audit is scheduled for Feb 15, 2026.</p>
                                    <Button variant="outline" size="sm" className="mt-2 h-7">Manage Guest Accounts</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </TooltipProvider>
    );
};
