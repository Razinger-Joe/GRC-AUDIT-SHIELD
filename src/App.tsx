import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Compliance from "./pages/Compliance";
import ITGeneralControls from "./pages/ITGeneralControls";
import RiskAssessment from "./pages/RiskAssessment";
import VulnerabilityManagement from "./pages/VulnerabilityManagement";
import EvidenceManagement from "./pages/EvidenceManagement";
import AuditTrail from "./pages/AuditTrail";
import NotFound from "./pages/NotFound";
import ReportingLayout from "./pages/reporting/ReportingLayout";
import ReportingDashboard from "./pages/reporting/ReportingDashboard";
import CustomReportBuilder from "./pages/reporting/CustomReportBuilder";
import ScheduledReports from "./pages/reporting/ScheduledReports";
import ReportHistory from "./pages/reporting/ReportHistory";
import SecurityReportsPage from "./pages/reporting/SecurityReportsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import SOCDashboard from "./pages/soc/SOCDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GlobalSearch />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/itgc" element={<ITGeneralControls />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/vulnerabilities" element={<VulnerabilityManagement />} />
          <Route path="/evidence" element={<EvidenceManagement />} />
          <Route path="/audit-trail" element={<AuditTrail />} />
          <Route path="/reporting" element={<ReportingLayout />}>
            <Route index element={<ReportingDashboard />} />
            <Route path="custom" element={<CustomReportBuilder />} />
            <Route path="scheduled" element={<ScheduledReports />} />
            <Route path="history" element={<ReportHistory />} />
            <Route path="security-reports" element={<SecurityReportsPage />} />
          </Route>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/soc" element={<SOCDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

