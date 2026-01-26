import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    FileDown,
    Search,
    Filter,
    Calendar as CalendarIcon,
    User,
    Activity,
    Clock,
    Eye,
    Edit,
    Trash2,
    LogIn,
    LogOut,
    Download,
    Upload,
    Settings,
    Shield,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Mock Audit Trail Data
const mockAuditLogs = [
    {
        id: "AUD-001",
        timestamp: "2026-01-26T03:45:22Z",
        user: "john.smith@company.com",
        userRole: "Security Admin",
        action: "LOGIN",
        resource: "System",
        resourceType: "Authentication",
        ipAddress: "192.168.1.105",
        status: "Success",
        severity: "Info",
        details: {
            method: "SSO",
            mfaUsed: true,
            location: "New York, US"
        },
        complianceMapping: ["SOC 2 CC6.1", "ISO 27001 A.9.4"],
    },
    {
        id: "AUD-002",
        timestamp: "2026-01-26T03:42:15Z",
        user: "jane.doe@company.com",
        userRole: "Compliance Officer",
        action: "EXPORT",
        resource: "Risk Assessment Report Q4",
        resourceType: "Report",
        ipAddress: "192.168.1.112",
        status: "Success",
        severity: "Medium",
        details: {
            format: "PDF",
            pages: 45,
            includes: ["Risk Register", "Mitigation Plans"]
        },
        complianceMapping: ["SOC 2 CC7.2", "ISO 27001 A.18.1"],
    },
    {
        id: "AUD-003",
        timestamp: "2026-01-26T03:38:50Z",
        user: "admin@company.com",
        userRole: "System Administrator",
        action: "MODIFY",
        resource: "User Permissions - Mike Wilson",
        resourceType: "Access Control",
        ipAddress: "192.168.1.100",
        status: "Success",
        severity: "High",
        details: {
            before: { roles: ["Analyst", "Viewer"] },
            after: { roles: ["Analyst", "Viewer", "Editor"] },
            reason: "Role expansion for project needs"
        },
        complianceMapping: ["SOC 2 CC6.2", "ISO 27001 A.9.2"],
    },
    {
        id: "AUD-004",
        timestamp: "2026-01-26T03:35:10Z",
        user: "unknown",
        userRole: "N/A",
        action: "LOGIN_FAILED",
        resource: "System",
        resourceType: "Authentication",
        ipAddress: "45.33.32.156",
        status: "Failed",
        severity: "Critical",
        details: {
            reason: "Invalid credentials",
            attempts: 5,
            blocked: true,
            geoLocation: "Unknown Location"
        },
        complianceMapping: ["SOC 2 CC6.1", "ISO 27001 A.9.4", "NIST AC-7"],
    },
    {
        id: "AUD-005",
        timestamp: "2026-01-26T03:30:00Z",
        user: "sarah.chen@company.com",
        userRole: "Risk Manager",
        action: "CREATE",
        resource: "Risk Entry RISK-089",
        resourceType: "Risk Register",
        ipAddress: "192.168.1.118",
        status: "Success",
        severity: "Medium",
        details: {
            riskTitle: "Third-party vendor data exposure",
            riskScore: 72,
            category: "Third Party Risk"
        },
        complianceMapping: ["SOC 2 CC3.2", "ISO 27001 A.15.2"],
    },
    {
        id: "AUD-006",
        timestamp: "2026-01-26T03:25:30Z",
        user: "mike.wilson@company.com",
        userRole: "IT Operations",
        action: "DELETE",
        resource: "Backup Log - Server-DB-01",
        resourceType: "System Configuration",
        ipAddress: "192.168.1.125",
        status: "Success",
        severity: "High",
        details: {
            reason: "Scheduled cleanup",
            approvedBy: "admin@company.com",
            retentionMet: true
        },
        complianceMapping: ["SOC 2 CC7.3", "ISO 27001 A.12.3"],
    },
    {
        id: "AUD-007",
        timestamp: "2026-01-26T03:20:45Z",
        user: "system",
        userRole: "Automated Process",
        action: "SCAN",
        resource: "Vulnerability Scan - Production Environment",
        resourceType: "Security Assessment",
        ipAddress: "10.0.0.1",
        status: "Success",
        severity: "Info",
        details: {
            scanType: "Full",
            duration: "45 minutes",
            findingsCount: 23
        },
        complianceMapping: ["SOC 2 CC7.1", "ISO 27001 A.12.6", "NIST RA-5"],
    },
    {
        id: "AUD-008",
        timestamp: "2026-01-26T03:15:00Z",
        user: "tom.brown@company.com",
        userRole: "Compliance Officer",
        action: "VIEW",
        resource: "SOC 2 Evidence Package",
        resourceType: "Compliance Evidence",
        ipAddress: "192.168.1.130",
        status: "Success",
        severity: "Low",
        details: {
            evidenceType: "Access Control Logs",
            period: "Q4 2025"
        },
        complianceMapping: ["SOC 2 CC1.1"],
    },
];

const actionIcons: Record<string, typeof Activity> = {
    LOGIN: LogIn,
    LOGOUT: LogOut,
    LOGIN_FAILED: XCircle,
    EXPORT: Download,
    IMPORT: Upload,
    CREATE: Edit,
    MODIFY: Settings,
    DELETE: Trash2,
    VIEW: Eye,
    SCAN: Shield,
};

const severityConfig: Record<string, { color: string; bg: string }> = {
    Critical: { color: "text-destructive", bg: "bg-destructive/10" },
    High: { color: "text-orange-500", bg: "bg-orange-500/10" },
    Medium: { color: "text-warning", bg: "bg-warning/10" },
    Low: { color: "text-info", bg: "bg-info/10" },
    Info: { color: "text-muted-foreground", bg: "bg-muted" },
};

const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string }> = {
    Success: { icon: CheckCircle2, color: "text-success" },
    Failed: { icon: XCircle, color: "text-destructive" },
    Pending: { icon: Clock, color: "text-warning" },
};

const AuditTrail = () => {
    const [selectedLog, setSelectedLog] = useState<typeof mockAuditLogs[0] | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [severityFilter, setSeverityFilter] = useState("all");
    const [actionFilter, setActionFilter] = useState("all");
    const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
    const [activeView, setActiveView] = useState("table");

    const filteredLogs = mockAuditLogs.filter((log) => {
        const matchesSearch =
            log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
        const matchesAction = actionFilter === "all" || log.action === actionFilter;
        return matchesSearch && matchesSeverity && matchesAction;
    });

    const criticalEvents = mockAuditLogs.filter((l) => l.severity === "Critical").length;
    const failedEvents = mockAuditLogs.filter((l) => l.status === "Failed").length;
    const totalEvents = mockAuditLogs.length;

    const handleExport = (format: string) => {
        // Simulated export functionality
        console.log(`Exporting to ${format}`);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Audit Trail</h1>
                        <p className="text-muted-foreground">
                            Comprehensive activity logging and compliance tracking
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <FileDown className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-40" align="end">
                                <div className="space-y-1">
                                    <Button variant="ghost" className="w-full justify-start" onClick={() => handleExport("csv")}>
                                        Export CSV
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start" onClick={() => handleExport("pdf")}>
                                        Export PDF
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start" onClick={() => handleExport("json")}>
                                        Export JSON
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Button variant="outline" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="glass-card">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                            <Activity className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalEvents}</div>
                            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
                        </CardContent>
                    </Card>

                    <Card className={cn("glass-card", criticalEvents > 0 && "border-destructive/50")}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
                            <AlertTriangle className={cn("h-5 w-5", criticalEvents > 0 ? "text-destructive animate-pulse" : "text-muted-foreground")} />
                        </CardHeader>
                        <CardContent>
                            <div className={cn("text-3xl font-bold", criticalEvents > 0 && "text-destructive")}>
                                {criticalEvents}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Failed Operations</CardTitle>
                            <XCircle className="h-5 w-5 text-warning" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-warning">{failedEvents}</div>
                            <p className="text-xs text-muted-foreground mt-1">Authentication & operations</p>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Compliance Coverage</CardTitle>
                            <Shield className="h-5 w-5 text-success" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-success">98%</div>
                            <p className="text-xs text-muted-foreground mt-1">SOC 2, ISO 27001, NIST</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="glass-card">
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by user, resource, or ID..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <Select value={severityFilter} onValueChange={setSeverityFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Severity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Severities</SelectItem>
                                    <SelectItem value="Critical">Critical</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Info">Info</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={actionFilter} onValueChange={setActionFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Action Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Actions</SelectItem>
                                    <SelectItem value="LOGIN">Login</SelectItem>
                                    <SelectItem value="LOGIN_FAILED">Login Failed</SelectItem>
                                    <SelectItem value="CREATE">Create</SelectItem>
                                    <SelectItem value="MODIFY">Modify</SelectItem>
                                    <SelectItem value="DELETE">Delete</SelectItem>
                                    <SelectItem value="EXPORT">Export</SelectItem>
                                    <SelectItem value="VIEW">View</SelectItem>
                                </SelectContent>
                            </Select>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-auto">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        Date Range
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="end">
                                    <Calendar
                                        mode="range"
                                        selected={{ from: dateRange.from, to: dateRange.to }}
                                        onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                                    />
                                </PopoverContent>
                            </Popover>

                            <Button variant="ghost" size="sm" onClick={() => {
                                setSearchQuery("");
                                setSeverityFilter("all");
                                setActionFilter("all");
                                setDateRange({});
                            }}>
                                Clear Filters
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Audit Log Table */}
                <Card className="glass-card">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Activity Logs</CardTitle>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="animate-pulse">
                                    <span className="w-2 h-2 rounded-full bg-success mr-2" />
                                    Live
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <ScrollArea className="h-[500px]">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[180px]">Timestamp</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Resource</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Severity</TableHead>
                                    <TableHead>IP Address</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLogs.map((log) => {
                                    const ActionIcon = actionIcons[log.action] || Activity;
                                    const StatusIcon = statusConfig[log.status]?.icon || Clock;
                                    const severityStyle = severityConfig[log.severity] || severityConfig.Info;

                                    return (
                                        <TableRow
                                            key={log.id}
                                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                                            onClick={() => {
                                                setSelectedLog(log);
                                                setDrawerOpen(true);
                                            }}
                                        >
                                            <TableCell className="font-mono text-sm">
                                                {format(new Date(log.timestamp), "MMM dd, HH:mm:ss")}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                                        <User className="h-3 w-3 text-primary" />
                                                    </div>
                                                    <span className="text-sm truncate max-w-[150px]">{log.user}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <ActionIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm">{log.action.replace("_", " ")}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-[200px] truncate">
                                                {log.resource}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <StatusIcon className={cn("h-4 w-4", statusConfig[log.status]?.color)} />
                                                    <span className={cn("text-sm", statusConfig[log.status]?.color)}>
                                                        {log.status}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={cn(severityStyle.bg, severityStyle.color, "border-0")}>
                                                    {log.severity}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-mono text-sm text-muted-foreground">
                                                {log.ipAddress}
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

                {/* Event Detail Drawer */}
                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerContent className="max-h-[90vh]">
                        <DrawerHeader>
                            <DrawerTitle className="flex items-center gap-2">
                                Event Details - {selectedLog?.id}
                                {selectedLog && (
                                    <Badge className={cn(
                                        severityConfig[selectedLog.severity]?.bg,
                                        severityConfig[selectedLog.severity]?.color,
                                        "border-0"
                                    )}>
                                        {selectedLog.severity}
                                    </Badge>
                                )}
                            </DrawerTitle>
                            <DrawerDescription>
                                {selectedLog && format(new Date(selectedLog.timestamp), "PPpp")}
                            </DrawerDescription>
                        </DrawerHeader>
                        <ScrollArea className="flex-1 px-4">
                            <div className="space-y-6 pb-6">
                                {/* Basic Info */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">User</p>
                                        <p className="font-medium">{selectedLog?.user}</p>
                                        <p className="text-sm text-muted-foreground">{selectedLog?.userRole}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">IP Address</p>
                                        <p className="font-mono">{selectedLog?.ipAddress}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Action</p>
                                        <p className="font-medium">{selectedLog?.action.replace("_", " ")}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Resource Type</p>
                                        <p>{selectedLog?.resourceType}</p>
                                    </div>
                                </div>

                                <Separator />

                                {/* Resource */}
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Resource</p>
                                    <p className="p-3 rounded-lg bg-muted/30">{selectedLog?.resource}</p>
                                </div>

                                {/* Details */}
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Event Details</p>
                                    <pre className="p-3 rounded-lg bg-muted/30 text-sm overflow-auto">
                                        <code>{JSON.stringify(selectedLog?.details, null, 2)}</code>
                                    </pre>
                                </div>

                                <Separator />

                                {/* Compliance Mapping */}
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Compliance Mapping</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedLog?.complianceMapping.map((mapping) => (
                                            <Badge key={mapping} variant="outline">
                                                {mapping}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                        <DrawerFooter className="flex-row gap-2">
                            <Button variant="outline" className="flex-1">
                                <FileDown className="mr-2 h-4 w-4" />
                                Export Event
                            </Button>
                            {selectedLog?.severity === "Critical" && (
                                <Button variant="destructive" className="flex-1">
                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                    Create Incident
                                </Button>
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

export default AuditTrail;
