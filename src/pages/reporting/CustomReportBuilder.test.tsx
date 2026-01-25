
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomReportBuilder from './CustomReportBuilder';
import { vi } from 'vitest';

// Mock ReportCanvas to avoid dnd context issues or deep rendering
vi.mock("@/components/reporting/ReportCanvas", () => ({
    ReportCanvas: ({ reportTitle }: { reportTitle: string }) => <div data-testid="report-canvas">{reportTitle}</div>
}));

describe('CustomReportBuilder', () => {
    it('renders builder tools sidebar', () => {
        render(<CustomReportBuilder />);
        expect(screen.getByText('Builder Tools')).toBeInTheDocument();
        expect(screen.getByText('Charts')).toBeInTheDocument();
        expect(screen.getByText('Data')).toBeInTheDocument();
    });

    it('renders available widgets', () => {
        render(<CustomReportBuilder />);
        // Charts tab is default
        expect(screen.getByText('Compliance Score Chart')).toBeInTheDocument();
        expect(screen.getByText('Risk Heatmap')).toBeInTheDocument();
    });

    it('displays report canvas with title', () => {
        render(<CustomReportBuilder />);
        expect(screen.getByTestId('report-canvas')).toHaveTextContent('New Custom Report');
    });
});
