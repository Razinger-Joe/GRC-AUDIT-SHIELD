
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, ShieldCheck, Database, Zap, RefreshCw, PauseCircle } from "lucide-react";

export const SOCStatusHeader = () => {
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 30));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-slate-950 text-white p-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    <span>GRC AUDIT SHIELD <span className="text-muted-foreground font-normal text-sm ml-2">SOC MONITOR</span></span>
                </div>

                <div className="h-6 w-px bg-slate-800" />

                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <StatusIndicator status="healthy" label="API" />
                    </div>
                    <div className="flex items-center gap-2">
                        <StatusIndicator status="healthy" label="Scanner Engine" />
                    </div>
                    <div className="flex items-center gap-2">
                        <StatusIndicator status="healthy" label="Database" />
                    </div>
                    <div className="flex items-center gap-2">
                        <StatusIndicator status="warning" label="Integrations" />
                    </div>
                </div>

                <div className="h-6 w-px bg-slate-800" />

                <div className="text-sm text-slate-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 animate-pulse text-blue-400" />
                    Monitoring <span className="text-white font-mono">1,247</span> assets across <span className="text-white font-mono">5</span> frameworks
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                    <RefreshCw className={`w-3 h-3 ${timeLeft === 30 ? 'animate-spin' : ''}`} />
                    Refresh in {timeLeft}s
                </div>
                <Button variant="destructive" size="sm" className="h-8 gap-2 bg-red-600 hover:bg-red-700 text-white border-none">
                    <PauseCircle className="w-4 h-4" /> EMERGENCY STOP
                </Button>
            </div>
        </div>
    );
};

const StatusIndicator = ({ status, label }: { status: 'healthy' | 'warning' | 'critical', label: string }) => (
    <div className="flex items-center gap-1.5 container">
        <div className={`w-2 h-2 rounded-full ${status === 'healthy' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                status === 'warning' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' :
                    'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
            }`} />
        <span className={status === 'critical' ? 'text-red-400' : 'text-slate-300'}>{label}</span>
    </div>
);
