import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  FileDown,
  RefreshCw,
  Search,
  TrendingUp,
  Users,
  Settings,
  Code,
  Shield,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  FileText,
  Play,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for changes
const mockChanges = [
  {
    id: "CHG-001",
    timestamp: "2024-01-15 14:32:00",
    system: "SAP ERP",
    changeType: "Configuration",
    requestedBy: "John Smith",
    approvedBy: "Jane Doe",
    ticketId: "INC-4521",
    status: "Approved",
    riskLevel: "Medium",
    description: "Updated financial posting rules for Q1 2024",
    beforeConfig: `{
  "posting_rules": {
    "auto_post": false,
    "require_approval": true,
    "max_amount": 10000
  }
}`,
    afterConfig: `{
  "posting_rules": {
    "auto_post": true,
    "require_approval": true,
    "max_amount": 25000
  }
}`,
  },
  {
    id: "CHG-002",
    timestamp: "2024-01-15 12:15:00",
    system: "Oracle DB",
    changeType: "Access Modification",
    requestedBy: "Mike Johnson",
    approvedBy: null,
    ticketId: "INC-4518",
    status: "Pending",
    riskLevel: "High",
    description: "Requesting elevated database privileges for migration",
    beforeConfig: `GRANT SELECT ON financial_data TO dev_user;`,
    afterConfig: `GRANT SELECT, INSERT, UPDATE, DELETE ON financial_data TO dev_user;`,
  },
  {
    id: "CHG-003",
    timestamp: "2024-01-15 09:45:00",
    system: "Windows AD",
    changeType: "User Access",
    requestedBy: "Unknown",
    approvedBy: null,
    ticketId: null,
    status: "Unauthorized",
    riskLevel: "Critical",
    description: "Unauthorized privilege escalation detected",
    beforeConfig: `user: jsmith
groups: [Domain Users, Sales]`,
    afterConfig: `user: jsmith
groups: [Domain Users, Sales, Domain Admins]`,
  },
  {
    id: "CHG-004",
    timestamp: "2024-01-14 16:22:00",
    system: "AWS Infrastructure",
    changeType: "Infrastructure",
    requestedBy: "Sarah Wilson",
    approvedBy: "Tom Brown",
    ticketId: "INC-4510",
    status: "Approved",
    riskLevel: "Low",
    description: "Added new EC2 instance for development environment",
    beforeConfig: `instances: []`,
    afterConfig: `instances: [
  {
    "id": "i-0abc123",
    "type": "t3.medium",
    "env": "development"
  }
]`,
  },
  {
    id: "CHG-005",
    timestamp: "2024-01-14 11:00:00",
    system: "SAP ERP",
    changeType: "Code Deployment",
    requestedBy: "Alice Chen",
    approvedBy: null,
    ticketId: "INC-4505",
    status: "Rejected",
    riskLevel: "High",
    description: "Attempted deployment without proper testing documentation",
    beforeConfig: `version: 2.3.1`,
    afterConfig: `version: 2.4.0-beta`,
  },
];

// Mock SoD conflicts
const mockSodConflicts = [
  {
    id: "SOD-001",
    user: "Robert Martinez",
    conflictingRoles: ["AP Clerk", "Check Signer"],
    system: "SAP ERP",
    detectedDate: "2024-01-14",
    businessImpact: "High",
    status: "Open",
    toxicCombinations: [
      "Can create vendor invoices AND approve payments",
      "Can modify payment amounts AND release funds",
    ],
  },
  {
    id: "SOD-002",
    user: "Emily Davis",
    conflictingRoles: ["System Admin", "Security Auditor"],
    system: "Oracle DB",
    detectedDate: "2024-01-13",
    businessImpact: "Critical",
    status: "Under Review",
    toxicCombinations: [
      "Can modify audit logs AND review security events",
      "Can create users AND review access reports",
    ],
  },
  {
    id: "SOD-003",
    user: "David Kim",
    conflictingRoles: ["Order Entry", "Shipping"],
    system: "Inventory Management",
    detectedDate: "2024-01-10",
    businessImpact: "Medium",
    status: "Resolved",
    toxicCombinations: [
      "Can enter orders AND confirm shipments",
    ],
  },
];

const statusConfig = {
  Approved: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  Pending: { icon: Clock, color: "text-warning", bg: "bg-warning/10" },
  Rejected: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
  Unauthorized: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10 animate-pulse" },
};

const riskColors = {
  Critical: "bg-destructive text-destructive-foreground",
  High: "bg-orange-500/80 text-white",
  Medium: "bg-warning text-warning-foreground",
  Low: "bg-success text-success-foreground",
};

const ITGeneralControls = () => {
  const [activeTab, setActiveTab] = useState("change-management");
  const [selectedChange, setSelectedChange] = useState<typeof mockChanges[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedSod, setExpandedSod] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [systemFilter, setSystemFilter] = useState("all");

  const handleRunSodAnalysis = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const filteredChanges = mockChanges.filter((change) => {
    const matchesSearch =
      change.system.toLowerCase().includes(searchQuery.toLowerCase()) ||
      change.requestedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      change.ticketId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || change.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredSodConflicts = mockSodConflicts.filter((conflict) => {
    const matchesSystem = systemFilter === "all" || conflict.system === systemFilter;
    return matchesSystem;
  });

  const unauthorizedCount = mockChanges.filter((c) => c.status === "Unauthorized").length;
  const pendingCount = mockChanges.filter((c) => c.status === "Pending").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">IT General Controls</h1>
            <p className="text-muted-foreground">SOX Compliance Monitoring for Financial Systems</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Domain Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1">
            <TabsTrigger value="change-management" className="gap-2 py-3">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Change Management</span>
              <span className="sm:hidden">Changes</span>
            </TabsTrigger>
            <TabsTrigger value="access-controls" className="gap-2 py-3">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Access Controls</span>
              <span className="sm:hidden">Access</span>
            </TabsTrigger>
            <TabsTrigger value="computer-operations" className="gap-2 py-3">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Computer Operations</span>
              <span className="sm:hidden">Operations</span>
            </TabsTrigger>
            <TabsTrigger value="system-development" className="gap-2 py-3">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">System Development</span>
              <span className="sm:hidden">Development</span>
            </TabsTrigger>
          </TabsList>

          {/* Change Management Tab */}
          <TabsContent value="change-management" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className={cn("glass-card", unauthorizedCount > 0 && "border-destructive/50 glow-danger")}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Unauthorized Changes</CardTitle>
                  {unauthorizedCount > 0 && <AlertTriangle className="h-5 w-5 text-destructive animate-pulse" />}
                </CardHeader>
                <CardContent>
                  <div className={cn("text-3xl font-bold", unauthorizedCount > 0 ? "text-destructive" : "text-success")}>
                    {unauthorizedCount}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <Clock className="h-5 w-5 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">{pendingCount}</div>
                  <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Avg Approval Time</CardTitle>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2.4h</div>
                  <p className="text-xs text-success mt-1">↓ 15% from last month</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Changes This Month</CardTitle>
                  <RefreshCw className="h-5 w-5 text-info" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground mt-1">↑ 12% vs last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by system, user, or ticket..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Unauthorized">Unauthorized</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Changes Table */}
            <Card className="glass-card">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Timestamp</TableHead>
                      <TableHead>System</TableHead>
                      <TableHead>Change Type</TableHead>
                      <TableHead>Requested By</TableHead>
                      <TableHead>Approved By</TableHead>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredChanges.map((change) => {
                      const StatusIcon = statusConfig[change.status as keyof typeof statusConfig]?.icon || Clock;
                      const statusColor = statusConfig[change.status as keyof typeof statusConfig]?.color || "text-muted";
                      const statusBg = statusConfig[change.status as keyof typeof statusConfig]?.bg || "bg-muted";

                      return (
                        <TableRow
                          key={change.id}
                          className="cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => {
                            setSelectedChange(change);
                            setDrawerOpen(true);
                          }}
                        >
                          <TableCell className="font-mono text-sm">{change.timestamp}</TableCell>
                          <TableCell className="font-medium">{change.system}</TableCell>
                          <TableCell>{change.changeType}</TableCell>
                          <TableCell>{change.requestedBy}</TableCell>
                          <TableCell>{change.approvedBy || "-"}</TableCell>
                          <TableCell>
                            {change.ticketId ? (
                              <Badge variant="outline">{change.ticketId}</Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-full", statusBg)}>
                              <StatusIcon className={cn("h-3.5 w-3.5", statusColor)} />
                              <span className={cn("text-xs font-medium", statusColor)}>{change.status}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={riskColors[change.riskLevel as keyof typeof riskColors]}>
                              {change.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </Card>
          </TabsContent>

          {/* Access Controls Tab */}
          <TabsContent value="access-controls" className="space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Select value={systemFilter} onValueChange={setSystemFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by System" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Systems</SelectItem>
                    <SelectItem value="SAP ERP">SAP ERP</SelectItem>
                    <SelectItem value="Oracle DB">Oracle DB</SelectItem>
                    <SelectItem value="Inventory Management">Inventory Management</SelectItem>
                  </SelectContent>
                </Select>
                {isScanning && (
                  <div className="flex items-center gap-2 text-primary">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm">Analyzing...</span>
                  </div>
                )}
              </div>
              <Button onClick={handleRunSodAnalysis} disabled={isScanning}>
                {isScanning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running Analysis...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run SoD Analysis
                  </>
                )}
              </Button>
            </div>

            {/* SoD Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="glass-card border-destructive/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Critical Conflicts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-destructive">
                    {mockSodConflicts.filter((c) => c.businessImpact === "Critical").length}
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Conflicts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{mockSodConflicts.length}</div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Resolved This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">
                    {mockSodConflicts.filter((c) => c.status === "Resolved").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* SoD Conflicts Table */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Segregation of Duties Conflicts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredSodConflicts.map((conflict) => (
                    <Collapsible
                      key={conflict.id}
                      open={expandedSod === conflict.id}
                      onOpenChange={() => setExpandedSod(expandedSod === conflict.id ? null : conflict.id)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            {expandedSod === conflict.id ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                            <div className="text-left">
                              <p className="font-medium">{conflict.user}</p>
                              <p className="text-sm text-muted-foreground">
                                {conflict.conflictingRoles.join(" + ")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">{conflict.system}</Badge>
                            <Badge className={cn(
                              conflict.businessImpact === "Critical" && "bg-destructive",
                              conflict.businessImpact === "High" && "bg-orange-500",
                              conflict.businessImpact === "Medium" && "bg-warning text-warning-foreground"
                            )}>
                              {conflict.businessImpact}
                            </Badge>
                            <Badge variant={conflict.status === "Resolved" ? "default" : "secondary"}>
                              {conflict.status}
                            </Badge>
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-2 ml-8 p-4 rounded-lg bg-muted/20 space-y-3">
                          <p className="text-sm font-medium text-muted-foreground">Toxic Combinations:</p>
                          <ul className="space-y-2">
                            {conflict.toxicCombinations.map((combo, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                                {combo}
                              </li>
                            ))}
                          </ul>
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline">Create Exception</Button>
                            <Button size="sm" variant="outline">Assign Remediation</Button>
                            <Button size="sm">View Full Report</Button>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Computer Operations Tab */}
          <TabsContent value="computer-operations" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                  <TrendingUp className="h-5 w-5 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">99.97%</div>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Batch Jobs Today</CardTitle>
                  <Settings className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">142</div>
                  <p className="text-xs text-success mt-1">138 successful, 4 failed</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2h ago</div>
                  <p className="text-xs text-muted-foreground mt-1">Full backup completed</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-warning/30">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending Jobs</CardTitle>
                  <Clock className="h-5 w-5 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">7</div>
                  <p className="text-xs text-muted-foreground mt-1">Scheduled for today</p>
                </CardContent>
              </Card>
            </div>

            {/* Batch Job Status Table */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Batch Job Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Job Name</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Last Run</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Next Run</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Financial Data Sync</TableCell>
                        <TableCell>Every 4 hours</TableCell>
                        <TableCell className="font-mono text-sm">02:00 AM</TableCell>
                        <TableCell>12 min</TableCell>
                        <TableCell>
                          <Badge className="bg-success">Completed</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">06:00 AM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Database Backup - Production</TableCell>
                        <TableCell>Daily 2:00 AM</TableCell>
                        <TableCell className="font-mono text-sm">02:00 AM</TableCell>
                        <TableCell>45 min</TableCell>
                        <TableCell>
                          <Badge className="bg-success">Completed</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Tomorrow 02:00 AM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Log Rotation</TableCell>
                        <TableCell>Weekly Sunday</TableCell>
                        <TableCell className="font-mono text-sm">Jan 19, 03:00 AM</TableCell>
                        <TableCell>8 min</TableCell>
                        <TableCell>
                          <Badge className="bg-success">Completed</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Jan 26, 03:00 AM</TableCell>
                      </TableRow>
                      <TableRow className="bg-destructive/5">
                        <TableCell className="font-medium">Report Generation</TableCell>
                        <TableCell>Daily 5:00 AM</TableCell>
                        <TableCell className="font-mono text-sm">05:00 AM</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>
                          <Badge variant="destructive">Failed</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Tomorrow 05:00 AM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Security Scan</TableCell>
                        <TableCell>Daily 1:00 AM</TableCell>
                        <TableCell className="font-mono text-sm">01:00 AM</TableCell>
                        <TableCell>32 min</TableCell>
                        <TableCell>
                          <Badge className="bg-success">Completed</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Tomorrow 01:00 AM</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* System Availability & Backup Status */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Backup Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Production Database</p>
                        <p className="text-sm text-muted-foreground">Full backup - 24.5 GB</p>
                      </div>
                    </div>
                    <span className="text-sm text-success">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Application Files</p>
                        <p className="text-sm text-muted-foreground">Incremental - 1.2 GB</p>
                      </div>
                    </div>
                    <span className="text-sm text-success">4 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Configuration Backup</p>
                        <p className="text-sm text-muted-foreground">Daily - 156 MB</p>
                      </div>
                    </div>
                    <span className="text-sm text-success">6 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      <div>
                        <p className="font-medium">DR Site Replication</p>
                        <p className="text-sm text-muted-foreground">Sync in progress - 78%</p>
                      </div>
                    </div>
                    <span className="text-sm text-warning">In Progress</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>System Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium">SAP ERP</p>
                      <p className="text-sm text-muted-foreground">Production</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span className="text-success font-medium">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium">Oracle Database</p>
                      <p className="text-sm text-muted-foreground">Primary Node</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span className="text-success font-medium">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium">AWS Infrastructure</p>
                      <p className="text-sm text-muted-foreground">All regions</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span className="text-success font-medium">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <div>
                      <p className="font-medium">Legacy Mainframe</p>
                      <p className="text-sm text-muted-foreground">Scheduled maintenance</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-warning" />
                      <span className="text-warning font-medium">Maintenance</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Development Tab */}
          <TabsContent value="system-development" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Code className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground mt-1">In development</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Code Reviews</CardTitle>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">98%</div>
                  <p className="text-xs text-muted-foreground mt-1">Compliance rate</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Test Coverage</CardTitle>
                  <Shield className="h-5 w-5 text-info" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">82%</div>
                  <p className="text-xs text-success mt-1">↑ 5% from last month</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending Deployments</CardTitle>
                  <Clock className="h-5 w-5 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">5</div>
                  <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
                </CardContent>
              </Card>
            </div>

            {/* SDLC Phase Tracking */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  SDLC Phase Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Project</TableHead>
                        <TableHead>Phase</TableHead>
                        <TableHead>Code Review</TableHead>
                        <TableHead>Security Scan</TableHead>
                        <TableHead>Test Status</TableHead>
                        <TableHead>UAT</TableHead>
                        <TableHead>Deployment</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Payment Gateway v2.1</TableCell>
                        <TableCell><Badge variant="outline" className="bg-info/10 text-info border-info/30">Testing</Badge></TableCell>
                        <TableCell><CheckCircle2 className="h-4 w-4 text-success" /></TableCell>
                        <TableCell><CheckCircle2 className="h-4 w-4 text-success" /></TableCell>
                        <TableCell><Badge className="bg-success">Passed</Badge></TableCell>
                        <TableCell><Clock className="h-4 w-4 text-warning" /></TableCell>
                        <TableCell><span className="text-muted-foreground">Pending</span></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Customer Portal Redesign</TableCell>
                        <TableCell><Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">Development</Badge></TableCell>
                        <TableCell><Clock className="h-4 w-4 text-warning" /></TableCell>
                        <TableCell><span className="text-muted-foreground">-</span></TableCell>
                        <TableCell><span className="text-muted-foreground">-</span></TableCell>
                        <TableCell><span className="text-muted-foreground">-</span></TableCell>
                        <TableCell><span className="text-muted-foreground">Q2 2026</span></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">API Security Enhancement</TableCell>
                        <TableCell><Badge variant="outline" className="bg-success/10 text-success border-success/30">Production</Badge></TableCell>
                        <TableCell><CheckCircle2 className="h-4 w-4 text-success" /></TableCell>
                        <TableCell><CheckCircle2 className="h-4 w-4 text-success" /></TableCell>
                        <TableCell><Badge className="bg-success">Passed</Badge></TableCell>
                        <TableCell><CheckCircle2 className="h-4 w-4 text-success" /></TableCell>
                        <TableCell><Badge className="bg-success">Deployed</Badge></TableCell>
                      </TableRow>
                      <TableRow className="bg-warning/5">
                        <TableCell className="font-medium">Data Migration Tool</TableCell>
                        <TableCell><Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">UAT</Badge></TableCell>
                        <TableCell><CheckCircle2 className="h-4 w-4 text-success" /></TableCell>
                        <TableCell><AlertTriangle className="h-4 w-4 text-warning" /></TableCell>
                        <TableCell><Badge className="bg-warning text-warning-foreground">Issues</Badge></TableCell>
                        <TableCell><Clock className="h-4 w-4 text-warning" /></TableCell>
                        <TableCell><span className="text-muted-foreground">Delayed</span></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Reporting Dashboard</TableCell>
                        <TableCell><Badge variant="outline" className="bg-info/10 text-info border-info/30">Testing</Badge></TableCell>
                        <TableCell><CheckCircle2 className="h-4 w-4 text-success" /></TableCell>
                        <TableCell><CheckCircle2 className="h-4 w-4 text-success" /></TableCell>
                        <TableCell><Badge className="bg-success">Passed</Badge></TableCell>
                        <TableCell><Clock className="h-4 w-4 text-warning" /></TableCell>
                        <TableCell><span className="text-muted-foreground">Feb 2026</span></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Code Review & Deployment Pipeline */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Code Review Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium">Reviews Completed</p>
                      <p className="text-sm text-muted-foreground">This month</p>
                    </div>
                    <span className="text-2xl font-bold">156</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium">Avg Review Time</p>
                      <p className="text-sm text-muted-foreground">From submission</p>
                    </div>
                    <span className="text-2xl font-bold">4.2h</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium">First-Pass Approval Rate</p>
                      <p className="text-sm text-muted-foreground">No revisions needed</p>
                    </div>
                    <span className="text-2xl font-bold text-success">78%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div>
                      <p className="font-medium">Security Findings</p>
                      <p className="text-sm text-muted-foreground">Identified in reviews</p>
                    </div>
                    <span className="text-2xl font-bold text-destructive">12</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Deployment Pipeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Production</p>
                        <p className="text-sm text-muted-foreground">API Security v1.4.2</p>
                      </div>
                    </div>
                    <Badge className="bg-success">Live</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-info/10 border border-info/20">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-info" />
                      <div>
                        <p className="font-medium">Staging</p>
                        <p className="text-sm text-muted-foreground">Payment Gateway v2.1.0</p>
                      </div>
                    </div>
                    <Badge variant="secondary">UAT</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      <div>
                        <p className="font-medium">QA Environment</p>
                        <p className="text-sm text-muted-foreground">Data Migration Tool v3.0</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-warning border-warning">Issues</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Code className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Development</p>
                        <p className="text-sm text-muted-foreground">5 active branches</p>
                      </div>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Change Detail Drawer */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader>
              <DrawerTitle className="flex items-center gap-2">
                Change Details - {selectedChange?.id}
                {selectedChange && (
                  <Badge className={riskColors[selectedChange.riskLevel as keyof typeof riskColors]}>
                    {selectedChange.riskLevel} Risk
                  </Badge>
                )}
              </DrawerTitle>
              <DrawerDescription>{selectedChange?.description}</DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-6 pb-6">
                {/* Approval Timeline */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Approval Workflow</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Request Submitted</p>
                        <p className="text-xs text-muted-foreground">by {selectedChange?.requestedBy}</p>
                      </div>
                    </div>
                    <div className="ml-4 h-6 border-l-2 border-dashed border-muted" />
                    <div className="flex items-center gap-3">
                      {selectedChange?.status === "Approved" ? (
                        <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        </div>
                      ) : selectedChange?.status === "Pending" ? (
                        <div className="h-8 w-8 rounded-full bg-warning/20 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-warning" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center">
                          <XCircle className="h-4 w-4 text-destructive" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{selectedChange?.status}</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedChange?.approvedBy ? `by ${selectedChange.approvedBy}` : "Awaiting review"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Configuration Diff */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Configuration Changes</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Before</p>
                      <pre className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-xs overflow-auto">
                        <code>{selectedChange?.beforeConfig}</code>
                      </pre>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">After</p>
                      <pre className="p-3 rounded-lg bg-success/10 border border-success/20 text-xs overflow-auto">
                        <code>{selectedChange?.afterConfig}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Comments Section */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Comments
                  </h4>
                  <div className="p-4 rounded-lg bg-muted/30 text-sm text-muted-foreground">
                    No comments yet.
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DrawerFooter className="flex-row gap-2">
              {selectedChange?.status === "Pending" && (
                <>
                  <Button className="flex-1" variant="destructive">Reject</Button>
                  <Button className="flex-1" variant="outline">Request More Info</Button>
                  <Button className="flex-1">Approve</Button>
                </>
              )}
              {selectedChange?.status === "Unauthorized" && (
                <Button className="flex-1" variant="destructive">Generate Finding</Button>
              )}
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default ITGeneralControls;
