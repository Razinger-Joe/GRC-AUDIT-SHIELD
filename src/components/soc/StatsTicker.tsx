
import React from 'react';
import { ShieldCheck, AlertOctagon, CheckCircle2, Activity } from "lucide-react";

export const StatsTicker = () => {
    return (
        <div className="h-8 bg-slate-950 border-t border-slate-800 flex items-center overflow-hidden relative font-mono text-xs text-slate-400 select-none">
            <div className="absolute left-0 bottom-0 top-0 w-8 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
            <div className="absolute right-0 bottom-0 top-0 w-8 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>

            <div className="animate-ticker flex gap-12 whitespace-nowrap pl-4">
                <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-slate-300">247</span> vulnerabilities remediated this month
                </span>
                <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-blue-500" />
                    <span className="text-slate-300">98.7%</span> control pass rate
                </span>
                <span className="flex items-center gap-2">
                    <AlertOctagon className="w-3 h-3 text-green-500" />
                    <span className="text-slate-300">0</span> critical alerts open
                </span>
                <span className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-purple-500" />
                    <span className="text-slate-300">15</span> audits completed this quarter
                </span>
                {/* Duplicate for seamless loop */}
                <span className="flex items-center gap-2 text-slate-600">|</span>
                <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-slate-300">247</span> vulnerabilities remediated this month
                </span>
                <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-blue-500" />
                    <span className="text-slate-300">98.7%</span> control pass rate
                </span>
            </div>

            {/* Simple CSS animation injection */}
            <style>{`
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-ticker {
                    animation: ticker 30s linear infinite;
                }
                .animate-ticker:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};
