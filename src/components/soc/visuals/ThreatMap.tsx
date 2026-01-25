
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock threats
const MOCK_THREATS = [
    { id: 1, x: 20, y: 30, type: 'ddos', origin: 'North America' },
    { id: 2, x: 70, y: 40, type: 'malware', origin: 'Asia' },
    { id: 3, x: 50, y: 20, type: 'scan', origin: 'Europe' },
    { id: 4, x: 30, y: 70, type: 'auth', origin: 'South America' },
];

export const ThreatMap = () => {
    const [activeThreats, setActiveThreats] = useState(MOCK_THREATS);

    // Simulate animated threats
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveThreats(prev => prev.map(t => ({
                ...t,
                x: t.x + (Math.random() - 0.5) * 5,
                y: t.y + (Math.random() - 0.5) * 5
            })));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="h-full bg-slate-900 border-slate-800 text-slate-200 overflow-hidden relative">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-semibold tracking-wider text-slate-400">GLOBAL THREAT MAP</CardTitle>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 text-[10px]">DDoS</Badge>
                        <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[10px]">Malware</Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="h-[200px] relative p-0">
                {/* Stylized World Map Background (SVG) */}
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 pointer-events-none">
                    <path d="M20,30 Q40,10 60,30 T90,30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M10,50 Q30,60 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M20,70 Q40,90 60,70 T80,70" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    {/* Add more abstract paths or a real world map path data if available */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeDasharray="4 4" opacity="0.5" />
                </svg>

                {/* Threat Points */}
                {activeThreats.map((threat) => (
                    <div
                        key={threat.id}
                        className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full"
                        style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
                    >
                        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                        <div className="absolute inset-0 bg-red-500 rounded-full border border-black"></div>

                        {/* Connecting Line to Center (Target) */}
                        <svg className="absolute top-1/2 left-1/2 w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                            <line
                                x1="50%" y1="50%"
                                x2={`${50 + (50 - threat.x)}%`}
                                y2={`${50 + (50 - threat.y)}%`}
                                stroke="#ef4444"
                                strokeWidth="1"
                            />
                        </svg>
                    </div>
                ))}

                {/* Target (Center) */}
                <div className="absolute top-1/2 left-1/2 w-4 h-4 -ml-2 -mt-2 border-2 border-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                </div>
            </CardContent>
        </Card>
    );
};
