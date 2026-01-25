
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play, Pause, Square, ChevronDown, ChevronUp, Radar } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const ACTIVE_SCANS = [
    { id: 1, name: "Daily Vulnerability Scan", target: "Production Environment", type: "Vuln", progress: 65, started: "10:00 AM", eta: "15 mins", status: "Running" },
    { id: 2, name: "Compliance Check - PCI", target: "Payment Gateway", type: "Compliance", progress: 30, started: "10:45 AM", eta: "45 mins", status: "Running" },
];

export const ActiveScansPanel = () => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <Card className="bg-slate-900 border-t border-slate-800 rounded-none border-x-0 border-b-0">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/50 bg-slate-950">
                    <div className="flex items-center gap-2">
                        <Radar className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <h3 className="text-sm font-semibold text-slate-300">ACTIVE SCANS ({ACTIVE_SCANS.length})</h3>
                    </div>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400 hover:text-white" aria-label="Toggle active scans">
                            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                    <div className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-900/50">
                                <TableRow className="hover:bg-transparent border-slate-800">
                                    <TableHead className="text-xs text-slate-500 h-8">SCAN NAME</TableHead>
                                    <TableHead className="text-xs text-slate-500 h-8">TARGET</TableHead>
                                    <TableHead className="text-xs text-slate-500 h-8">TYPE</TableHead>
                                    <TableHead className="text-xs text-slate-500 h-8 w-64">PROGRESS</TableHead>
                                    <TableHead className="text-xs text-slate-500 h-8">STARTED / ETA</TableHead>
                                    <TableHead className="text-xs text-slate-500 h-8 text-right">ACTIONS</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ACTIVE_SCANS.map((scan) => (
                                    <TableRow key={scan.id} className="border-slate-800/50 hover:bg-slate-800/50">
                                        <TableCell className="font-medium text-slate-300 text-xs py-2">{scan.name}</TableCell>
                                        <TableCell className="text-slate-400 text-xs py-2">{scan.target}</TableCell>
                                        <TableCell className="py-2">
                                            <Badge variant="outline" className="border-slate-700 text-slate-400 text-[10px] h-5">{scan.type}</Badge>
                                        </TableCell>
                                        <TableCell className="py-2">
                                            <div className="flex items-center gap-2">
                                                <Progress value={scan.progress} className="h-1.5 bg-slate-800" />
                                                <span className="text-xs text-slate-400 w-8 text-right">{scan.progress}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-500 text-xs py-2">{scan.started} • ETA {scan.eta}</TableCell>
                                        <TableCell className="text-right py-2">
                                            <div className="flex justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-700">
                                                    <Pause className="w-3 h-3" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-red-400 hover:bg-slate-700">
                                                    <Square className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
};
