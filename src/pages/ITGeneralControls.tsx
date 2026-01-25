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
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Computer Operations Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Settings className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  Monitor batch job schedules, backup operations, and system availability metrics.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Development Tab */}
          <TabsContent value="system-development" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>System Development Lifecycle</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Code className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  Track SDLC compliance, code review requirements, and testing documentation.
                </p>
              </CardContent>
            </Card>
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
