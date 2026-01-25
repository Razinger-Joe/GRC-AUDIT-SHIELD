
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagementTab } from "@/components/settings/users/UserManagementTab";
import { IntegrationsTab } from "@/components/settings/integrations/IntegrationsTab";
import { ComplianceSettingsTab } from "@/components/settings/compliance/ComplianceSettingsTab";
import { RiskSettingsTab } from "@/components/settings/risk/RiskSettingsTab";
import { NotificationSettingsTab } from "@/components/settings/notifications/NotificationSettingsTab";
import { SystemSettingsTab } from "@/components/settings/system/SystemSettingsTab";
import { SystemAuditLogTab } from "@/components/settings/audit/SystemAuditLogTab";
import { Users, Link, ShieldCheck, AlertTriangle, Bell, Settings, FileClock } from "lucide-react";

const SettingsPage = () => {
    return (
        <div className="container mx-auto p-6 space-y-6 animate-in fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings & Administration</h1>
                <p className="text-muted-foreground">Manage users, integrations, and system configuration.</p>
            </div>

            <Tabs defaultValue="users" className="space-y-4">
                <TabsList className="bg-muted/50 p-1">
                    <TabsTrigger value="users" className="gap-2"><Users className="w-4 h-4" /> Users</TabsTrigger>
                    <TabsTrigger value="integrations" className="gap-2"><Link className="w-4 h-4" /> Integrations</TabsTrigger>
                    <TabsTrigger value="compliance" className="gap-2"><ShieldCheck className="w-4 h-4" /> Compliance</TabsTrigger>
                    <TabsTrigger value="risk" className="gap-2"><AlertTriangle className="w-4 h-4" /> Risk</TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2"><Bell className="w-4 h-4" /> Notifications</TabsTrigger>
                    <TabsTrigger value="system" className="gap-2"><Settings className="w-4 h-4" /> System</TabsTrigger>
                    <TabsTrigger value="audit" className="gap-2"><FileClock className="w-4 h-4" /> Audit Log</TabsTrigger>
                </TabsList>

                <TabsContent value="users">
                    <UserManagementTab />
                </TabsContent>
                <TabsContent value="integrations">
                    <IntegrationsTab />
                </TabsContent>
                <TabsContent value="compliance">
                    <ComplianceSettingsTab />
                </TabsContent>
                <TabsContent value="risk">
                    <RiskSettingsTab />
                </TabsContent>
                <TabsContent value="notifications">
                    <NotificationSettingsTab />
                </TabsContent>
                <TabsContent value="system">
                    <SystemSettingsTab />
                </TabsContent>
                <TabsContent value="audit">
                    <SystemAuditLogTab />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingsPage;
