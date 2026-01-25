
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Clock, Play, Pause, MoreHorizontal, Edit, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ScheduledReports = () => {
    const schedules = [
        { id: 1, name: "Weekly Executive Summary", frequency: "Weekly", nextRun: "2026-01-26 09:00 AM", status: "Active", recipients: 3 },
        { id: 2, name: "Monthly Compliance Check", frequency: "Monthly", nextRun: "2026-02-01 08:00 AM", status: "Active", recipients: 5 },
        { id: 3, name: "Daily Risk Digest", frequency: "Daily", nextRun: "2026-01-25 07:00 AM", status: "Paused", recipients: 1 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Scheduled Reports</h2>
                    <p className="text-muted-foreground">Manage your automated reporting schedules.</p>
                </div>
                <Button className="gap-2"><Plus className="w-4 h-4" /> Create Schedule</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Active Schedules</CardTitle>
                    <CardDescription>Reports that are currently configured to run automatically.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Report Name</TableHead>
                                <TableHead>Frequency</TableHead>
                                <TableHead>Next Run</TableHead>
                                <TableHead>Recipients</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {schedules.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-muted-foreground" />
                                            {job.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{job.frequency}</TableCell>
                                    <TableCell>{job.nextRun}</TableCell>
                                    <TableCell>
                                        <div className="flex -space-x-2">
                                            {[...Array(job.recipients)].map((_, i) => (
                                                <Avatar key={i} className="w-6 h-6 border-2 border-background">
                                                    <AvatarFallback className="text-[10px] bg-primary/10">U{i}</AvatarFallback>
                                                </Avatar>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                                            {job.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                {job.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                                                    <DropdownMenuItem><Play className="w-4 h-4 mr-2" /> Run Now</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive"><Trash className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ScheduledReports;
