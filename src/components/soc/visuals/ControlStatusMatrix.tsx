
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const ControlStatusMatrix = () => {
    // Generate 100 cells
    const cells = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        status: Math.random() > 0.9 ? 'fail' : Math.random() > 0.7 ? 'warn' : 'pass',
        name: `Control-${100 + i}`
    }));

    return (
        <Card className="h-full bg-slate-900 border-slate-800 text-slate-200">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold tracking-wider text-slate-400 flex justify-between">
                    <span>CONTROL GRID</span>
                    <span className="text-emerald-400">92% PASS</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-10 gap-1 h-[180px]">
                    {cells.map((cell) => (
                        <Tooltip key={cell.id}>
                            <TooltipTrigger asChild>
                                <div
                                    className={`w-full h-full rounded-sm transition-colors cursor-pointer hover:opacity-80
                                        ${cell.status === 'pass' ? 'bg-emerald-500/20 hover:bg-emerald-500/40' :
                                            cell.status === 'warn' ? 'bg-yellow-500/40 hover:bg-yellow-500/60' :
                                                'bg-red-500/60 hover:bg-red-500/80 animate-pulse'}
                                    `}
                                />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-slate-900 border-slate-800 text-xs">
                                <p className="font-bold">{cell.name}</p>
                                <p>{cell.status.toUpperCase()} - Last tested 2m ago</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
