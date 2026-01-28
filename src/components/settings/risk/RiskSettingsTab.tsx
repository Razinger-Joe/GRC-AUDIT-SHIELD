
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, ArrowRight, Info } from "lucide-react";



export const RiskSettingsTab = () => {
    return (
        <TooltipProvider>
            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Risk Matrix Configuration */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Risk Scoring Matrix</CardTitle>
                            <CardDescription>Define how risk levels are calculated (Likelihood x Impact).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Visual Matrix */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <h4 className="font-medium text-sm">Impact</h4>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="w-3 h-3 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-[200px]">Severity of the consequence if the risk materializes.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <div className="grid grid-cols-6 gap-1 text-xs">
                                        <div className="col-span-1 row-span-5 flex items-center justify-center font-medium rotate-[-90deg]">Likelihood</div>

                                        {/* Header Row */}
                                        <div className="text-center font-mono text-muted-foreground"></div>
                                        <div className="text-center font-mono bg-muted py-1">1 (Neg)</div>
                                        <div className="text-center font-mono bg-muted py-1">2 (Min)</div>
                                        <div className="text-center font-mono bg-muted py-1">3 (Mod)</div>
                                        <div className="text-center font-mono bg-muted py-1">4 (Maj)</div>
                                        <div className="text-center font-mono bg-muted py-1">5 (Cat)</div>

                                        {/* Row 5 */}
                                        <div className="flex items-center justify-end px-2 font-mono bg-muted">5 (Certain)</div>
                                        <div className="bg-yellow-400/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">Medium</div>
                                        <div className="bg-orange-500/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">High</div>
                                        <div className="bg-red-500/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer font-bold text-white">Critical</div>
                                        <div className="bg-red-600/90 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer font-bold text-white">Critical</div>
                                        <div className="bg-red-700 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer font-bold text-white">Critical</div>

                                        {/* Row 4 */}
                                        <div className="flex items-center justify-end px-2 font-mono bg-muted">4 (Likely)</div>
                                        <div className="bg-green-300/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">Low</div>
                                        <div className="bg-yellow-400/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">Medium</div>
                                        <div className="bg-orange-500/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">High</div>
                                        <div className="bg-red-500/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer font-bold text-white">Critical</div>
                                        <div className="bg-red-600/90 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer font-bold text-white">Critical</div>

                                        {/* Row 3 */}
                                        <div className="flex items-center justify-end px-2 font-mono bg-muted">3 (Poss)</div>
                                        <div className="bg-green-300/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">Low</div>
                                        <div className="bg-yellow-400/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">Medium</div>
                                        <div className="bg-orange-500/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">High</div>
                                        <div className="bg-orange-600/90 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">High</div>
                                        <div className="bg-red-500/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer font-bold text-white">Critical</div>

                                        {/* Row 2 */}
                                        <div className="flex items-center justify-end px-2 font-mono bg-muted">2 (Unlikely)</div>
                                        <div className="bg-green-400/60 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">Very Low</div>
                                        <div className="bg-green-300/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">Low</div>
                                        <div className="bg-yellow-400/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">Medium</div>
                                        <div className="bg-orange-500/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">High</div>
                                        <div className="bg-orange-600/90 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">High</div>

                                        {/* Row 1 */}
                                        <div className="flex items-center justify-end px-2 font-mono bg-muted">1 (Rare)</div>
                                        <div className="bg-green-400/60 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">Very Low</div>
                                        <div className="bg-green-300/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">Low</div>
                                        <div className="bg-green-300/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">Low</div>
                                        <div className="bg-yellow-400/80 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">Medium</div>
                                        <div className="bg-yellow-500/90 h-10 flex items-center justify-center border hover:ring-2 cursor-pointer">Medium</div>
                                    </div>
                                    <div className="text-center text-xs text-muted-foreground mt-2">
                                        Click any cell to override its Risk Level classification
                                    </div>
                                </div>

                                {/* Scale Definitions */}
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <h4 className="font-medium mb-2">Likelihood Scale Definitions</h4>
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="h-8"><TableHead>Level</TableHead><TableHead>Probability</TableHead></TableRow>
                                            </TableHeader>
                                            <TableBody className="text-sm">
                                                <TableRow className="h-8"><TableCell>5 - Almost Certain</TableCell><TableCell>&gt; 90% in 12 months</TableCell></TableRow>
                                                <TableRow className="h-8"><TableCell>4 - Likely</TableCell><TableCell>50-90% in 12 months</TableCell></TableRow>
                                                <TableRow className="h-8"><TableCell>3 - Possible</TableCell><TableCell>10-50% in 12 months</TableCell></TableRow>
                                                <TableRow className="h-8"><TableCell>2 - Unlikely</TableCell><TableCell>3-10% in 12 months</TableCell></TableRow>
                                                <TableRow className="h-8"><TableCell>1 - Rare</TableCell><TableCell>&lt; 3% in 12 months</TableCell></TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Risk Tolerance & Workflow */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Risk Acceptance & Tolerance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label>Maximum Acceptable Risk Score</Label>
                                    <span className="text-sm font-medium">12 (Medium)</span>
                                </div>
                                <Slider defaultValue={[12]} max={25} step={1} className="py-2" />
                                <p className="text-xs text-muted-foreground">Risks above this score cannot be Accepted without Executive approval.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Treatment Workflows</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Auto-Escalation</Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">Escalate Critical risks if not treated within</span>
                                    <Input type="number" defaultValue={7} className="w-16 h-8" />
                                    <span className="text-sm">days.</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Executive Reporting</Label>
                                <Select defaultValue="monthly">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="quarterly">Quarterly</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">Frequency of automated Risk Posture reports sent to Board/Execs.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </TooltipProvider>
    );
};
