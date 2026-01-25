
import React from 'react';
import { SOCStatusHeader } from "@/components/soc/SOCStatusHeader";
import { AlertFeed } from "@/components/soc/AlertFeed";
import { ThreatMap } from "@/components/soc/visuals/ThreatMap";
import { ControlStatusMatrix } from "@/components/soc/visuals/ControlStatusMatrix";
import { VulnerabilityTrendChart } from "@/components/soc/visuals/VulnerabilityTrendChart";
import { RiskGauge } from "@/components/soc/visuals/RiskGauge";
import { ActiveScansPanel } from "@/components/soc/ActiveScansPanel";
import { IncidentResponsePanel } from "@/components/soc/IncidentResponsePanel";
import { PlaybookSidebar } from "@/components/soc/PlaybookSidebar";
import { StatsTicker } from "@/components/soc/StatsTicker";

export const SOCDashboard = () => {
    return (
        <div className="flex flex-col h-screen bg-slate-950 font-sans text-slate-200 overflow-hidden">
            <SOCStatusHeader />
            <div className="flex flex-1 overflow-hidden">
                <AlertFeed />

                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 overflow-y-auto">
                        <div className="aspect-[4/3] w-full max-h-[300px]">
                            <ThreatMap />
                        </div>
                        <div className="aspect-[4/3] w-full max-h-[300px]">
                            <ControlStatusMatrix />
                        </div>
                        <div className="aspect-[16/9] w-full max-h-[250px]">
                            <VulnerabilityTrendChart />
                        </div>
                        <div className="aspect-[16/9] w-full max-h-[250px]">
                            <RiskGauge />
                        </div>
                    </div>

                    {/* Bottom Panels */}
                    <div className="h-64 border-t border-slate-800 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 bg-slate-900">
                        <div className="h-full overflow-hidden">
                            <ActiveScansPanel />
                        </div>
                        <div className="h-full overflow-hidden">
                            <IncidentResponsePanel />
                        </div>
                    </div>

                    {/* Footer / Ticker */}
                    <div className="border-t border-slate-800 bg-slate-900 text-xs flex items-center text-slate-400">
                        <StatsTicker />
                    </div>
                </div>

                <PlaybookSidebar />
            </div>
        </div>
    );
};

export default SOCDashboard;
