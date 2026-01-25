
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldAlert, AlertTriangle, AlertCircle, Info, Search, Filter, CheckCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const MOCK_ALERTS = [
    { id: 1, severity: 'Critical', type: 'Vulnerability', title: 'Critical CVE-2024-1234 on Production DB', time: '2 mins ago', asset: 'prod-db-01', unread: true },
    { id: 2, severity: 'High', type: 'Control Failure', title: 'S3 Bucket Public Access Detected', time: '15 mins ago', asset: 'assets-bucket', unread: true },
    { id: 3, severity: 'Medium', type: 'Access', title: 'Multiple Failed Login Attempts', time: '1 hour ago', asset: 'vpn-gateway', unread: false },
    { id: 4, severity: 'Low', type: 'Compliance', title: 'Password Policy Deviation', time: '2 hours ago', asset: 'dev-workstation-45', unread: false },
    { id: 5, severity: 'Info', type: 'System', title: 'Scheduled Scan Completed', time: '3 hours ago', asset: 'all-assets', unread: false },
];

export const AlertFeed = () => {
    const [alerts, setAlerts] = useState(MOCK_ALERTS);
    const [expandedAlert, setExpandedAlert] = useState<number | null>(null);

    return (
        <div className="w-[400px] border-r border-slate-800 bg-slate-950 flex flex-col h-[calc(100vh-60px)]">
            <div className="p-4 border-b border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-white">Alert Feed</h2>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                        {alerts.filter(a => a.unread).length} Unread
                    </Badge>
                </div>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-slate-500" />
                        <Input
                            placeholder="Filter alerts..."
                            className="pl-8 h-8 text-xs bg-slate-900 border-slate-800 text-slate-300 placeholder:text-slate-600 focus-visible:ring-slate-700"
                        />
                    </div>
                    <Button variant="outline" size="icon" className="h-8 w-8 bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200">
                        <Filter className="w-3 h-3" />
                    </Button>
                </div>
                <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
                    {['Critical', 'High', 'Medium', 'Low', 'Info'].map(sev => (
                        <Badge key={sev} variant="outline" className={`cursor-pointer border-slate-800 hover:border-slate-700 ${sev === 'Critical' ? 'text-red-400 hover:bg-red-950/30' :
                                sev === 'High' ? 'text-orange-400 hover:bg-orange-950/30' :
                                    sev === 'Medium' ? 'text-yellow-400 hover:bg-yellow-950/30' :
                                        'text-slate-400 hover:bg-slate-900'
                            }`}>
                            {sev}
                        </Badge>
                    ))}
                </div>
            </div>

            <ScrollArea className="flex-1">
                <div className="divide-y divide-slate-800/50">
                    {alerts.map((alert) => (
                        <div key={alert.id} className={`group hover:bg-slate-900/50 transition-colors ${expandedAlert === alert.id ? 'bg-slate-900/80' : ''}`}>
                            <div
                                className="p-4 cursor-pointer relative"
                                onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                            >
                                {alert.unread && (
                                    <div className="absolute left-2 top-4 w-1.5 h-1.5 rounded-full bg-blue-500" />
                                )}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${alert.severity === 'Critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' :
                                        alert.severity === 'High' ? 'bg-orange-500' :
                                            alert.severity === 'Medium' ? 'bg-yellow-500' :
                                                'bg-blue-500'
                                    }`} />

                                <div className="pl-3 space-y-1">
                                    <div className="flex justify-between items-start gap-2">
                                        <h4 className={`text-sm font-medium leading-none ${alert.unread ? 'text-white' : 'text-slate-400'}`}>
                                            {alert.title}
                                        </h4>
                                        <Badge variant="secondary" className="text-[10px] h-5 bg-slate-800 text-slate-400 border-none shrink-0">
                                            {alert.time}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        {alert.type === 'Vulnerability' && <ShieldAlert className="w-3 h-3 text-red-400" />}
                                        {alert.type === 'Control Failure' && <AlertTriangle className="w-3 h-3 text-orange-400" />}
                                        {alert.type === 'Access' && <AlertCircle className="w-3 h-3 text-yellow-400" />}
                                        {alert.type === 'Compliance' && <CheckCircle className="w-3 h-3 text-blue-400" />}
                                        {alert.type === 'System' && <Info className="w-3 h-3 text-slate-400" />}
                                        <span>{alert.type}</span>
                                        <span>•</span>
                                        <span className="font-mono text-slate-400">{alert.asset}</span>
                                    </div>
                                </div>
                            </div>

                            <Collapsible open={expandedAlert === alert.id}>
                                <CollapsibleContent>
                                    <div className="px-4 pb-4 pt-0 pl-7 space-y-3">
                                        <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300">
                                            Unauthorized access detected on production database port 5432. Source IP matches known blacklisted range.
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <Button size="sm" variant="outline" className="h-7 text-xs border-slate-700 hover:bg-slate-800 text-slate-300">
                                                Acknowledge
                                            </Button>
                                            <Button size="sm" variant="outline" className="h-7 text-xs border-slate-700 hover:bg-slate-800 text-slate-300">
                                                Investigate
                                            </Button>
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};
