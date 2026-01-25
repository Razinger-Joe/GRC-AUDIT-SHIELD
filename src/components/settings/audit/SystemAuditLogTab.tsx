
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Filter, ChevronDown, ChevronRight, FileJson } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Mock Data
const AUDIT_LOGS = [
    { id: 'LOG-001', timestamp: '2026-01-25 09:12:45', user: 'Alice Johnson', ip: '192.168.1.15', action: 'UPDATE', resource: 'Policy: Access Control', status: 'Success', details: { field: "MFA", oldValue: "Optional", newValue: "Required" } },
    { id: 'LOG-002', timestamp: '2026-01-25 08:30:22', user: 'Bob Smith', ip: '10.0.0.52', action: 'LOGIN', resource: 'Auth System', status: 'Success', details: { method: "SAML", provider: "Okta" } },
    { id: 'LOG-003', timestamp: '2026-01-24 16:45:10', user: 'Charlie Brown', ip: '192.168.1.20', action: 'DELETE', resource: 'Evidence: INV-203', status: 'Warning', details: { reason: "Duplicate upload", deletedBy: "admin" } },
    { id: 'LOG-004', timestamp: '2026-01-24 14:20:05', user: 'System', ip: 'localhost', action: 'EXECUTE', resource: 'Job: Daily Scan', status: 'Failed', details: { error: "Timeout waiting for scanner agent", attempt: 3 } },
    { id: 'LOG-005', timestamp: '2026-01-24 11:15:00', user: 'Diana Prince', ip: '172.16.0.10', action: 'CREATE', resource: 'User: Evan Wright', status: 'Success', details: { role: "Viewer", assignedFrameworks: [] } },
    { id: 'LOG-006', timestamp: '2026-01-24 09:00:00', user: 'Alice Johnson', ip: '192.168.1.15', action: 'EXPORT', resource: 'Report: SOC2 Type II', status: 'Success', details: { format: "PDF", pages: 45 } },
];

export const SystemAuditLogTab = () => {
    const [logs, setLogs] = useState(AUDIT_LOGS);
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    const toggleRow = (id: string) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedRows(newExpanded);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex gap-2 w-full md:w-auto flex-1">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search logs..." className="pl-8" />
                    </div>
                    <Select defaultValue="all_actions">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Action Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all_actions">All Actions</SelectItem>
                            <SelectItem value="login">Login</SelectItem>
                            <SelectItem value="create">Create</SelectItem>
                            <SelectItem value="update">Update</SelectItem>
                            <SelectItem value="delete">Delete</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export CSV</Button>
                    <Button variant="outline" className="gap-2"><FileJson className="w-4 h-4" /> Export JSON</Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Immutable System Audit Trail</CardTitle>
                    <CardDescription>Complete record of all system activities and security events.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[30px]"></TableHead>
                                    <TableHead>Timestamp</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Resource</TableHead>
                                    <TableHead>IP Address</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.map((log) => (
                                    <React.Fragment key={log.id}>
                                        <TableRow
                                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                                            onClick={() => toggleRow(log.id)}
                                        >
                                            <TableCell>
                                                {expandedRows.has(log.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                            </TableCell>
                                            <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-sm">{log.user}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={
                                                    log.action === 'DELETE' ? 'border-red-200 text-red-700 bg-red-50' :
                                                        log.action === 'UPDATE' ? 'border-blue-200 text-blue-700 bg-blue-50' :
                                                            log.action === 'CREATE' ? 'border-green-200 text-green-700 bg-green-50' : ''
                                                }>{log.action}</Badge>
                                            </TableCell>
                                            <TableCell className="text-sm">{log.resource}</TableCell>
                                            <TableCell className="font-mono text-xs text-muted-foreground">{log.ip}</TableCell>
                                            <TableCell>
                                                <Badge className={
                                                    log.status === 'Success' ? 'bg-green-600' :
                                                        log.status === 'Failed' ? 'bg-red-600' : 'bg-yellow-600'
                                                }>{log.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                        {expandedRows.has(log.id) && (
                                            <TableRow className="bg-muted/30 hover:bg-muted/30">
                                                <TableCell colSpan={7} className="p-4">
                                                    <div className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono text-xs overflow-x-auto">
                                                        <div className="flex justify-between items-center mb-2 border-b border-slate-800 pb-2">
                                                            <span className="text-slate-400">Event Details (JSON)</span>
                                                            <span className="text-slate-500">ID: {log.id}</span>
                                                        </div>
                                                        <pre>{JSON.stringify({
                                                            ...log,
                                                            meta: {
                                                                userAgent: "Mozilla/5.0...",
                                                                sessionId: "sess_8923jks"
                                                            }
                                                        }, null, 2)}</pre>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
