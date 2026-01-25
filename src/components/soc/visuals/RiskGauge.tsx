
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight } from "lucide-react";

export const RiskGauge = () => {
    const score = 42; // Low-Medium Risk
    const rotation = (score / 100) * 180;

    return (
        <Card className="h-full bg-slate-900 border-slate-800 text-slate-200">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold tracking-wider text-slate-400">ORGANIZATION RISK</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-4">
                <div className="relative w-40 h-20 overflow-hidden mb-4">
                    {/* Gauge Background */}
                    <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[12px] border-slate-800 border-b-0 border-l-0 border-r-0 rotate-[45deg] origin-center shadow-inner"></div>

                    {/* Gauge Arc (Colored) - Simplified implementation for demo */}
                    <svg viewBox="0 0 100 50" className="w-full h-full absolute top-0 left-0">
                        <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#334155" strokeWidth="12" />
                        <path
                            d="M10,50 A40,40 0 0,1 90,50"
                            fill="none"
                            stroke="url(#riskGradient)"
                            strokeWidth="12"
                            strokeDasharray="126"
                            strokeDashoffset={126 - (126 * (score / 100))}
                            className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                            <linearGradient id="riskGradient">
                                <stop offset="0%" stopColor="#22c55e" />
                                <stop offset="50%" stopColor="#eab308" />
                                <stop offset="100%" stopColor="#ef4444" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Needle */}
                    {/* <div 
                        className="absolute bottom-0 left-1/2 w-1 h-20 bg-white origin-bottom transition-transform duration-1000"
                        style={{ transform: `translateX(-50%) rotate(${rotation - 90}deg)` }}
                    ></div> */}
                </div>

                <div className="text-center relative -top-6">
                    <div className="text-4xl font-bold tracking-tighter text-white">{score}</div>
                    <div className="text-xs text-slate-500 font-mono">RISK SCORE (LOW)</div>
                    <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs mt-2 font-medium">
                        <ArrowDownRight className="w-3 h-3" />
                        <span>5% vs last week</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
