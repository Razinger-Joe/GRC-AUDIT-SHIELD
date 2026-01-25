
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/layout/Sidebar";

const ReportingLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center px-6 py-4 border-b bg-card">
            <SidebarTrigger />
            <h1 className="text-xl font-bold ml-4">Reporting & Analytics</h1>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ReportingLayout;
