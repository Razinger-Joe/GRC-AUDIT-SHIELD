
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Bell, Mail, MessageSquare, Plus, Trash2 } from "lucide-react";

export const NotificationSettingsTab = () => {
    const [channels, setChannels] = useState([
        { id: 'email', name: 'Email (SMTP)', type: 'email', connected: true, details: 'configured via AWS SES' },
        { id: 'slack', name: 'Slack', type: 'chat', connected: true, details: '#grc-alerts' },
        { id: 'teams', name: 'MS Teams', type: 'chat', connected: false, details: 'Not connected' },
        { id: 'pagerduty', name: 'PagerDuty', type: 'incident', connected: false, details: 'Not connected' },
    ]);

    const [rules, setRules] = useState([
        { id: 1, event: 'Critical Vulnerability Detected', severity: 'Critical', channels: ['Email', 'Slack', 'PagerDuty'], recipients: 'SecOps Team' },
        { id: 2, event: 'Control Failure', severity: 'High', channels: ['Email', 'Slack'], recipients: 'Compliance Mgr' },
        { id: 3, event: 'Risk Threshold Exceeded', severity: 'High', channels: ['Email'], recipients: 'Risk Committee' },
        { id: 4, event: 'New Audit Finding', severity: 'Medium', channels: ['Email'], recipients: 'Auditor, Admin' },
    ]);

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                {/* Channel Configuration */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notification Channels</CardTitle>
                        <CardDescription>Configure where alerts are sent.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {channels.map((channel) => (
                            <div key={channel.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-md ${channel.connected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                        {channel.type === 'email' ? <Mail className="w-4 h-4" /> :
                                            channel.type === 'chat' ? <MessageSquare className="w-4 h-4" /> :
                                                <Bell className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">{channel.name}</div>
                                        <div className="text-xs text-muted-foreground">{channel.details}</div>
                                    </div>
                                </div>
                                <Switch checked={channel.connected} />
                            </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full mt-2 gap-2">
                            <Plus className="w-4 h-4" /> Add New Channel
                        </Button>
                    </CardContent>
                </Card>

                {/* Global Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle>Global Preferences</CardTitle>
                        <CardDescription>System-wide notification defaults.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Digest Frequency</Label>
                            <Select defaultValue="daily">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="realtime">Real-time (No Digest)</SelectItem>
                                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                                    <SelectItem value="daily">Daily Summary</SelectItem>
                                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg">
                            <Label>Quiet Hours (22:00 - 08:00)</Label>
                            <Switch defaultChecked />
                        </div>
                        <div className="text-xs text-muted-foreground">
                            During quiet hours, only Critical severity alerts will be delivered. All others will be queued.
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Rules */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Notification Rules</CardTitle>
                                <CardDescription>Define who gets notified for specific events.</CardDescription>
                            </div>
                            <Button size="sm" className="gap-2"><Plus className="w-4 h-4" /> Add Rule</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Event Type</TableHead>
                                    <TableHead>Severity</TableHead>
                                    <TableHead>Channels</TableHead>
                                    <TableHead>Recipients</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rules.map((rule) => (
                                    <TableRow key={rule.id}>
                                        <TableCell className="font-medium">{rule.event}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                                                ${rule.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                                                    rule.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                                                        rule.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                                {rule.severity}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                {rule.channels.map(c => (
                                                    <span key={c} className="text-xs bg-muted px-1.5 py-0.5 rounded border">{c}</span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>{rule.recipients}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><Settings className="w-4 h-4" /></Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
