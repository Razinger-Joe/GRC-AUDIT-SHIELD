
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface IntegrationConfigDialogProps {
    integration: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (config: any) => void;
}

export const IntegrationConfigDialog = ({ integration, open, onOpenChange, onSave }: IntegrationConfigDialogProps) => {
    const [isTesting, setIsTesting] = useState(false);
    const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [activeTab, setActiveTab] = useState("auth");

    if (!integration) return null;

    const handleTestConnection = () => {
        setIsTesting(true);
        setTestStatus('idle');
        // Mock connection test
        setTimeout(() => {
            setIsTesting(false);
            setTestStatus('success');
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-muted rounded-md border">
                            {/* Placeholder for logo - using first letter */}
                            <span className="text-lg font-bold">{integration.name.substring(0, 2)}</span>
                        </div>
                        <div>
                            <DialogTitle>Configure {integration.name}</DialogTitle>
                            <DialogDescription>Setup connection and sync preferences.</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="w-full justify-start">
                            <TabsTrigger value="auth">Authentication</TabsTrigger>
                            <TabsTrigger value="scope">Scope & Sync</TabsTrigger>
                            <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
                        </TabsList>

                        <TabsContent value="auth" className="space-y-4 mt-4">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label>Authentication Method</Label>
                                    <Select defaultValue="api_key">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="oauth">OAuth 2.0</SelectItem>
                                            <SelectItem value="api_key">API Key</SelectItem>
                                            <SelectItem value="service_account">Service Account (JSON)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>API Key / Client ID</Label>
                                    <Input type="text" placeholder="Enter API Key" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Secret / Token</Label>
                                    <Input type="password" placeholder="••••••••••••••••" />
                                </div>

                                <div className="space-y-2">
                                    <Label>API Endpoint (Optional)</Label>
                                    <Input placeholder={`https://api.${integration.name.toLowerCase()}.com/v1`} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg mt-4 border">
                                <div className="flex items-center gap-2">
                                    {isTesting ? <Loader2 className="w-4 h-4 animate-spin" /> :
                                        testStatus === 'success' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                                            testStatus === 'error' ? <XCircle className="w-4 h-4 text-destructive" /> : null}
                                    <span className="text-sm font-medium">
                                        {isTesting ? "Testing connection..." :
                                            testStatus === 'success' ? "Connection Successful" :
                                                testStatus === 'error' ? "Connection Failed" : "Verify credentials before saving"}
                                    </span>
                                </div>
                                <Button variant="outline" size="sm" onClick={handleTestConnection} disabled={isTesting}>
                                    Test Connection
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="scope" className="space-y-4 mt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Data Sync Scope</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="users" defaultChecked />
                                            <Label htmlFor="users">Users & Groups</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="assets" defaultChecked />
                                            <Label htmlFor="assets">Assets / Instace</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="logs" />
                                            <Label htmlFor="logs">Audit Logs</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="vulns" defaultChecked />
                                            <Label htmlFor="vulns">Vulnerabilities</Label>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Sync Frequency</Label>
                                    <Select defaultValue="hourly">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="realtime">Real-time (Webhooks)</SelectItem>
                                            <SelectItem value="hourly">Hourly</SelectItem>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="manual">Manual Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="mapping" className="space-y-4 mt-4">
                            <div className="text-sm text-muted-foreground mb-4">
                                Map external fields to internal GRC schema.
                            </div>
                            <div className="grid gap-2 text-sm">
                                <div className="grid grid-cols-2 gap-4 font-medium sticky top-0 bg-background py-2">
                                    <div>Source Field ({integration.name})</div>
                                    <div>Target Field (GRC)</div>
                                </div>
                                {['id', 'email', 'name', 'role', 'created_at'].map(field => (
                                    <div key={field} className="grid grid-cols-2 gap-4 items-center">
                                        <div className="p-2 border rounded bg-muted/20 font-mono text-xs">{field}</div>
                                        <Badge variant="outline" className="justify-start font-mono text-xs cursor-pointer hover:bg-muted">
                                            user.{field}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={() => { onSave({}); onOpenChange(false); }}>Save & Sync</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
