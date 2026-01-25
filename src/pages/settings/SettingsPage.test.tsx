
import React from 'react';
import { render, screen } from '@testing-library/react';
import SettingsPage from './SettingsPage';
import { vi } from 'vitest';

// Mock child components
vi.mock("@/components/settings/users/UserManagementTab", () => ({ UserManagementTab: () => <div>MockUserManagementTab</div> }));
vi.mock("@/components/settings/integrations/IntegrationsTab", () => ({ IntegrationsTab: () => <div>MockIntegrationsTab</div> }));
vi.mock("@/components/settings/compliance/ComplianceSettingsTab", () => ({ ComplianceSettingsTab: () => <div>MockComplianceSettingsTab</div> }));
vi.mock("@/components/settings/risk/RiskSettingsTab", () => ({ RiskSettingsTab: () => <div>MockRiskSettingsTab</div> }));
vi.mock("@/components/settings/notifications/NotificationSettingsTab", () => ({ NotificationSettingsTab: () => <div>MockNotificationSettingsTab</div> }));
vi.mock("@/components/settings/system/SystemSettingsTab", () => ({ SystemSettingsTab: () => <div>MockSystemSettingsTab</div> }));
vi.mock("@/components/settings/audit/SystemAuditLogTab", () => ({ SystemAuditLogTab: () => <div>MockSystemAuditLogTab</div> }));

describe('SettingsPage', () => {
    it('renders page header', () => {
        render(<SettingsPage />);
        expect(screen.getByText('Settings & Administration')).toBeInTheDocument();
        expect(screen.getByText('Manage users, integrations, and system configuration.')).toBeInTheDocument();
    });

    it('renders all tab triggers', () => {
        render(<SettingsPage />);
        expect(screen.getByRole('tab', { name: /users/i })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: /integrations/i })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: /compliance/i })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: /risk/i })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: /notifications/i })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: /system/i })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: /audit log/i })).toBeInTheDocument();
    });
});
