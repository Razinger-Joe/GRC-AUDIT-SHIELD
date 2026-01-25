
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Save, RotateCcw, Activity } from "lucide-react";

export const SystemSettingsTab = () => {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                {/* General Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>Company identity and localization.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Company Name</Label>
                            <Input defaultValue="Acme Corp" />
                        </div>
                        <div className="space-y-2">
                            <Label>Timezone</Label>
                            <Select defaultValue="utc">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="utc">UTC</SelectItem>
                                    <SelectItem value="est">EST (UTC-5)</SelectItem>
                                    <SelectItem value="pst">PST (UTC-8)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Security Policies */}
                <Card className="row-span-2">
                    <CardHeader>
                        <CardTitle>Security Policies</CardTitle>
                        <CardDescription>Authentication and session management defaults.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Minimum Password Length</Label>
                                <span className="font-mono text-sm">12 chars</span>
                            </div>
                            <Slider defaultValue={[12]} min={8} max={32} step={1} />
                        </div>

                        <div className="space-y-3">
                            <Label>Password Complexity</Label>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between border p-2 rounded">
                                    <span>Require Special Characters</span>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between border p-2 rounded">
                                    <span>Prevent Password Reuse (Last 5)</span>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Session Timeout</Label>
                                <span className="font-mono text-sm">30 mins</span>
                            </div>
                            <Slider defaultValue={[30]} min={15} max={240} step={15} />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-muted/30 border rounded-lg">
                            <div>
                                <div className="font-medium text-sm">Enforce MFA</div>
                                <div className="text-xs text-muted-foreground">Require 2FA for all users</div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                {/* Data Retention */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Retention</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Audit Log Retention</Label>
                            <Select defaultValue="1year">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="90days">90 Days</SelectItem>
                                    <SelectItem value="1year">1 Year</SelectItem>
                                    <SelectItem value="7years">7 Years</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Vulnerability Scan History</Label>
                            <Select defaultValue="6months">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="3months">3 Months</SelectItem>
                                    <SelectItem value="6months">6 Months</SelectItem>
                                    <SelectItem value="1year">1 Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* System Health */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>System Health</CardTitle>
                        <CardDescription>Current status of platform services.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 border rounded-lg flex flex-col gap-2">
                                <div className="text-xs text-muted-foreground">API Status</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="font-medium">Operational</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Latency: 45ms</div>
                            </div>
                            <div className="p-4 border rounded-lg flex flex-col gap-2">
                                <div className="text-xs text-muted-foreground">Database</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="font-medium">Operational</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Conn: 12/100</div>
                            </div>
                            <div className="p-4 border rounded-lg flex flex-col gap-2">
                                <div className="text-xs text-muted-foreground">Job Scheduler</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="font-medium">Running</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Queue: 0 jobs</div>
                            </div>
                            <div className="p-4 border rounded-lg flex flex-col gap-2">
                                <div className="text-xs text-muted-foreground">Scanning Engine</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <span className="font-medium">Degraded</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">High Load</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="md:col-span-2 flex justify-end gap-2">
                    <Button variant="outline" className="gap-2"><RotateCcw className="w-4 h-4" /> Reset Defaults</Button>
                    <Button className="gap-2"><Save className="w-4 h-4" /> Save Configuration</Button>
                </div>
            </div>
        </div>
    );
};
