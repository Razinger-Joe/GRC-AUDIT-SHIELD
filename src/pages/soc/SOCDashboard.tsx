
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
        <div className="flex flex-col h-full overflow-hidden">
            <SOCStatusHeader />
            <div className="flex flex-1 overflow-hidden">
                <AlertFeed />

                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 overflow-y-auto custom-scrollbar">
                        <div className="aspect-[4/3] w-full max-h-[300px] glass-card rounded-xl p-4">
                            <ThreatMap />
                        </div>
                        <div className="aspect-[4/3] w-full max-h-[300px] glass-card rounded-xl p-4">
                            <ControlStatusMatrix />
                        </div>
                        <div className="aspect-[16/9] w-full max-h-[250px] glass-card rounded-xl p-4">
                            <VulnerabilityTrendChart />
                        </div>
                        <div className="aspect-[16/9] w-full max-h-[250px] glass-card rounded-xl p-4">
                            <RiskGauge />
                        </div>
                    </div>

                    {/* Bottom Panels */}
                    <div className="h-64 border-t border-white/5 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/5 bg-black/20 backdrop-blur-sm">
                        <div className="h-full overflow-hidden">
                            <ActiveScansPanel />
                        </div>
                        <div className="h-full overflow-hidden">
                            <IncidentResponsePanel />
                        </div>
                    </div>

                    {/* Footer / Ticker */}
                    <div className="border-t border-white/5 bg-black/40 text-xs flex items-center text-muted-foreground backdrop-blur-md">
                        <StatsTicker />
                    </div>
                </div>

                <PlaybookSidebar />
            </div>
        </div>
    );
};

export default SOCDashboard;
