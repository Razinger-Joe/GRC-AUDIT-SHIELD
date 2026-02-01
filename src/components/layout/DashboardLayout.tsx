import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1e] to-black opacity-100 pointer-events-none"></div>

      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow animation-delay-2000" />

      <div className="relative z-10 flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto scrollbar-hide">
            <div className="container max-w-[1600px] mx-auto p-6 md:p-8 space-y-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
