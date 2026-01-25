
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SOCDashboard } from './SOCDashboard';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock dependencies
vi.mock("@/components/soc/SOCStatusHeader", () => ({ SOCStatusHeader: () => <div data-testid="soc-header">Header</div> }));
vi.mock("@/components/soc/AlertFeed", () => ({ AlertFeed: () => <div data-testid="alert-feed">Alerts</div> }));
vi.mock("@/components/soc/visuals/ThreatMap", () => ({ ThreatMap: () => <div>ThreatMap</div> }));
vi.mock("@/components/soc/visuals/ControlStatusMatrix", () => ({ ControlStatusMatrix: () => <div>ControlMatrix</div> }));
vi.mock("@/components/soc/visuals/RiskGauge", () => ({ RiskGauge: () => <div>RiskGauge</div> }));
vi.mock("@/components/soc/visuals/VulnerabilityTrendChart", () => ({ VulnerabilityTrendChart: () => <div>VulnChart</div> }));
vi.mock("@/components/soc/ActiveScansPanel", () => ({ ActiveScansPanel: () => <div>ActiveScans</div> }));
vi.mock("@/components/soc/IncidentResponsePanel", () => ({ IncidentResponsePanel: () => <div>Incidents</div> }));
vi.mock("@/components/soc/PlaybookSidebar", () => ({ PlaybookSidebar: () => <div>Playbooks</div> }));
vi.mock("@/components/soc/StatsTicker", () => ({ StatsTicker: () => <div>Ticker</div> }));

describe('SOCDashboard', () => {
    it('renders all main components', () => {
        render(
            <BrowserRouter>
                <SOCDashboard />
            </BrowserRouter>
        );

        expect(screen.getByTestId('soc-header')).toBeInTheDocument();
        expect(screen.getByTestId('alert-feed')).toBeInTheDocument();
        expect(screen.getByText('ThreatMap')).toBeInTheDocument();
        expect(screen.getByText('ControlMatrix')).toBeInTheDocument();
        expect(screen.getByText('RiskGauge')).toBeInTheDocument();
        expect(screen.getByText('VulnChart')).toBeInTheDocument();
        expect(screen.getByText('ActiveScans')).toBeInTheDocument();
        expect(screen.getByText('Incidents')).toBeInTheDocument();
        expect(screen.getByText('Playbooks')).toBeInTheDocument();
        expect(screen.getByText('Ticker')).toBeInTheDocument();
    });
});
