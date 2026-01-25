
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Settings, Zap, CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const PLAYBOOKS = [
    { id: 1, name: "Isolate Compromised Asset", trigger: "Manual / Critical Alert", successRate: 98, lastRun: "2h ago", active: true },
    { id: 2, name: "Block IP Range (Firewall)", trigger: "DDoS Detection", successRate: 100, lastRun: "15m ago", active: true },
    { id: 3, name: "Reset User Creds & MFA", trigger: "Brute Force", successRate: 95, lastRun: "1d ago", active: true },
    { id: 4, name: "Collect Forensic Snapshot", trigger: "Malware Detected", successRate: 88, lastRun: "4h ago", active: false },
];

export const PlaybookSidebar = () => {
    return (
        <div className="w-64 border-l border-slate-800 bg-slate-950 flex flex-col hidden lg:flex">
            <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-sm text-slate-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    AUTOMATION
                </h3>
                <p className="text-xs text-slate-500 mt-1">4 Active Playbooks</p>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                    {PLAYBOOKS.map((pb) => (
                        <div key={pb.id} className="group rounded-lg border border-slate-800 bg-slate-900/50 p-3 hover:border-slate-700 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className={`p-1.5 rounded bg-slate-800 ${pb.active ? 'text-blue-400' : 'text-slate-500'}`}>
                                    <Zap className="w-3 h-3" />
                                </div>
                                <Badge variant="outline" className="text-[10px] h-5 border-slate-700 text-slate-400">
                                    {pb.successRate}% Success
                                </Badge>
                            </div>

                            <h4 className="text-xs font-medium text-slate-200 mb-1">{pb.name}</h4>
                            <div className="text-[10px] text-slate-500 mb-3">Trigger: {pb.trigger}</div>

                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-slate-600">{pb.lastRun}</span>
                                <Button size="sm" variant="secondary" className="h-6 text-[10px] bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700">
                                    <Play className="w-2 h-2 mr-1" /> Run
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Button variant="outline" className="w-full border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 gap-2">
                        <Settings className="w-3 h-3" /> Configure Playbooks
                    </Button>
                </div>
            </ScrollArea>
        </div>
    );
};
