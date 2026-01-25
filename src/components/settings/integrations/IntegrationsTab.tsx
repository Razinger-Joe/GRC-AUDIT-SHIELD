
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, ExternalLink, RefreshCw, Key } from "lucide-react";
import { IntegrationConfigDialog } from "./IntegrationConfigDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock Data
const INTEGRATIONS_DATA = {
    cloud: [
        { id: 'aws', name: 'AWS', status: 'Connected', synced: '2 mins ago', assets: 1240, logo: 'AWS' },
        { id: 'azure', name: 'Microsoft Azure', status: 'Disconnected', synced: '2 days ago', assets: 0, logo: 'AZ' },
        { id: 'gcp', name: 'Google Cloud', status: 'Not Configured', synced: '-', assets: 0, logo: 'GC' },
    ],
    scanners: [
        { id: 'qualys', name: 'Qualys', status: 'Connected', synced: '1 hour ago', assets: 850, logo: 'Q' },
        { id: 'tenable', name: 'Tenable.io', status: 'Not Configured', synced: '-', assets: 0, logo: 'T' },
    ],
    identity: [
        { id: 'okta', name: 'Okta', status: 'Connected', synced: 'Real-time', assets: 450, logo: 'O' },
        { id: 'aad', name: 'Azure AD', status: 'Not Configured', synced: '-', assets: 0, logo: 'AD' },
    ],
    ticketing: [
        { id: 'jira', name: 'Jira', status: 'Connected', synced: '5 mins ago', assets: 120, logo: 'J' },
    ]
};

const API_KEYS = [
    { id: 1, name: "CI/CD Pipeline", prefix: "sk_live_...", created: "2024-01-15", lastUsed: "2 mins ago" },
    { id: 2, name: "External Monitor", prefix: "sk_live_...", created: "2023-11-20", lastUsed: "1 day ago" },
];

export const IntegrationsTab = () => {
    const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search integrations..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-6">
                {/* Cloud Providers */}
                <Section title="Cloud Infrastructure" data={INTEGRATIONS_DATA.cloud} onConfigure={setSelectedIntegration} />

                {/* Vulnerability Scanners */}
                <Section title="Vulnerability Scanners" data={INTEGRATIONS_DATA.scanners} onConfigure={setSelectedIntegration} />

                {/* Identity Providers */}
                <Section title="Identity & Access" data={INTEGRATIONS_DATA.identity} onConfigure={setSelectedIntegration} />

                {/* Workflow */}
                <Section title="Ticketing & Workflow" data={INTEGRATIONS_DATA.ticketing} onConfigure={setSelectedIntegration} />

                {/* API Management Section */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>API Management</CardTitle>
                                <CardDescription>Manage API keys for external access.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Plus className="w-4 h-4" /> Generate New Key
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Key Name</TableHead>
                                    <TableHead>Token Prefix</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Last Used</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {API_KEYS.map((key) => (
                                    <TableRow key={key.id}>
                                        <TableCell className="font-medium">{key.name}</TableCell>
                                        <TableCell><code className="bg-muted px-1 py-0.5 rounded">{key.prefix}</code></TableCell>
                                        <TableCell>{key.created}</TableCell>
                                        <TableCell>{key.lastUsed}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="h-8 text-destructive">Revoke</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <IntegrationConfigDialog
                integration={selectedIntegration}
                open={!!selectedIntegration}
                onOpenChange={(open) => !open && setSelectedIntegration(null)}
                onSave={() => console.log("Saved")}
            />
        </div>
    );
};

const Section = ({ title, data, onConfigure }: { title: string, data: any[], onConfigure: (i: any) => void }) => (
    <div className="space-y-3">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                            {item.logo}
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-semibold">{item.name}</h4>
                                <Badge variant={item.status === 'Connected' ? 'default' : 'secondary'} className={item.status === 'Connected' ? 'bg-green-600' : ''}>
                                    {item.status}
                                </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <RefreshCw className="w-3 h-3" />
                                {item.status === 'Connected' ? `Synced ${item.synced}` : 'Unknown'}
                            </div>
                            <div className="text-sm text-muted-foreground pt-1">
                                {item.assets} assets monitored
                            </div>
                            <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => onConfigure(item)}>
                                {item.status === 'Connected' ? 'Configure' : 'Connect'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);
