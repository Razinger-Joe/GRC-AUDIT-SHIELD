
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock, Users, ArrowRight, MessageSquare, Shield, CheckCircle } from "lucide-react";

const INCIDENTS = [
    { id: 'INC-2024-001', title: 'Potential Data Exfiltration', severity: 'High', status: 'Investigating', created: '2h ago', assignee: 'Sarah J.' },
    { id: 'INC-2024-002', title: 'Ransomware IOC Detected', severity: 'Critical', status: 'Contained', created: '5h ago', assignee: 'Mike R.' },
];

export const IncidentResponsePanel = () => {
    const [selectedIncident, setSelectedIncident] = useState<any>(null);

    return (
        <div className="h-full border-t border-slate-800 bg-slate-950">
            <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-orange-400" />
                    <h3 className="font-semibold text-sm text-slate-200">ACTIVE INCIDENTS ({INCIDENTS.length})</h3>
                </div>
                <Button size="sm" variant="outline" className="h-7 text-xs border-slate-700 bg-slate-800 text-slate-300 hover:text-white">
                    View All
                </Button>
            </div>

            <ScrollArea className="h-48">
                <div className="divide-y divide-slate-800">
                    {INCIDENTS.map(inc => (
                        <div key={inc.id} className="p-3 hover:bg-slate-900 cursor-pointer flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className={`
                                    ${inc.severity === 'Critical' ? 'text-red-400 border-red-500/20 bg-red-500/10' :
                                        'text-orange-400 border-orange-500/20 bg-orange-500/10'}
                                `}>
                                    {inc.severity}
                                </Badge>
                                <div>
                                    <div className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors">
                                        {inc.title} <span className="text-slate-500 font-mono text-xs ml-1">#{inc.id}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                        <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {inc.created}</div>
                                        <div className="flex items-center gap-1"><Users className="w-3 h-3" /> {inc.assignee}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="bg-slate-800 text-slate-400 hover:bg-slate-700">{inc.status}</Badge>
                                <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-500 hover:text-white">
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};
