import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  FolderTree,
  Folder,
  FolderOpen,
  File,
  FileImage,
  FileText,
  FileCode,
  FileAudio,
  Upload,
  Download,
  Check,
  X,
  Clock,
  Shield,
  Eye,
  Trash2,
  Archive,
  Hash,
  ChevronRight,
  ChevronDown,
  Plus,
  Filter,
  CalendarIcon,
  Search,
  Link2,
  Lock,
  Sparkles,
  AlertTriangle,
  Printer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Mock evidence tree data
const evidenceTree = [
  {
    id: "hipaa",
    name: "HIPAA",
    type: "framework",
    children: [
      {
        id: "hipaa-164-312-a-1",
        name: "§164.312(a)(1) - Access Control",
        type: "control",
        completion: 85,
        lastUpdated: "2024-01-15",
        status: "In Progress",
        children: [
          { id: "ev-001", name: "Access Policy Document.pdf", type: "evidence" },
          { id: "ev-002", name: "MFA Configuration Screenshot.png", type: "evidence" },
          { id: "ev-003", name: "User Access Review Q4.xlsx", type: "evidence" },
        ],
      },
      {
        id: "hipaa-164-312-b",
        name: "§164.312(b) - Audit Controls",
        type: "control",
        completion: 100,
        lastUpdated: "2024-01-10",
        status: "Complete",
        children: [
          { id: "ev-004", name: "Audit Log Configuration.txt", type: "evidence" },
          { id: "ev-005", name: "SIEM Dashboard Screenshot.png", type: "evidence" },
        ],
      },
      {
        id: "hipaa-164-312-c",
        name: "§164.312(c) - Integrity Controls",
        type: "control",
        completion: 0,
        lastUpdated: null,
        status: "Missing",
        children: [],
      },
    ],
  },
  {
    id: "pci-dss",
    name: "PCI-DSS",
    type: "framework",
    children: [
      {
        id: "pci-req-8",
        name: "Requirement 8 - User Authentication",
        type: "control",
        completion: 75,
        lastUpdated: "2024-01-14",
        status: "In Progress",
        children: [
          { id: "ev-006", name: "Password Policy.pdf", type: "evidence" },
          { id: "ev-007", name: "MFA Enrollment Report.csv", type: "evidence" },
        ],
      },
      {
        id: "pci-req-10",
        name: "Requirement 10 - Logging & Monitoring",
        type: "control",
        completion: 100,
        lastUpdated: "2024-01-12",
        status: "Complete",
        children: [
          { id: "ev-008", name: "Log Retention Policy.pdf", type: "evidence" },
          { id: "ev-009", name: "Monitoring Architecture.png", type: "evidence" },
          { id: "ev-010", name: "Alert Configuration.json", type: "evidence" },
        ],
      },
    ],
  },
  {
    id: "soc2",
    name: "SOC 2",
    type: "framework",
    children: [
      {
        id: "soc2-cc6-1",
        name: "CC6.1 - Logical Access Controls",
        type: "control",
        completion: 60,
        lastUpdated: "2024-01-13",
        status: "In Progress",
        children: [
          { id: "ev-011", name: "Access Control Matrix.xlsx", type: "evidence" },
        ],
      },
    ],
  },
];

// Mock collected evidence
const collectedEvidence = [
  {
    id: "ev-001",
    title: "Access Policy Document",
    type: "Policy Document",
    filename: "Access_Policy_v2.3.pdf",
    collectedDate: "2024-01-15",
    collectedBy: { name: "John Smith", initials: "JS" },
    status: "Verified",
    hash: "a7b9c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    size: "245 KB",
    effectiveDate: "2024-01-01",
    tags: ["policy", "access-control", "hipaa"],
  },
  {
    id: "ev-002",
    title: "MFA Configuration Screenshot",
    type: "Screenshot",
    filename: "MFA_Config_Jan2024.png",
    collectedDate: "2024-01-14",
    collectedBy: { name: "Jane Doe", initials: "JD" },
    status: "Pending Review",
    hash: "b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3",
    size: "1.2 MB",
    effectiveDate: "2024-01-14",
    tags: ["screenshot", "mfa", "configuration"],
  },
  {
    id: "ev-003",
    title: "User Access Review Q4",
    type: "Log File",
    filename: "UAR_Q4_2023.xlsx",
    collectedDate: "2024-01-10",
    collectedBy: { name: "Mike Wilson", initials: "MW" },
    status: "Verified",
    hash: "c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4",
    size: "890 KB",
    effectiveDate: "2023-12-31",
    tags: ["review", "access", "quarterly"],
  },
  {
    id: "ev-004",
    title: "Audit Log Configuration",
    type: "Configuration",
    filename: "audit_config.txt",
    collectedDate: "2024-01-08",
    collectedBy: { name: "Sarah Chen", initials: "SC" },
    status: "Rejected",
    rejectionReason: "Configuration file is outdated, need current version",
    hash: "d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5",
    size: "12 KB",
    effectiveDate: "2023-06-01",
    tags: ["config", "audit", "logging"],
  },
];

// Evidence requirements for selected control
const evidenceRequirements = [
  { id: "req-1", description: "Access Control Policy Document", provider: "Security Team", collected: true },
  { id: "req-2", description: "MFA Configuration Evidence", provider: "IT Operations", collected: true },
  { id: "req-3", description: "Quarterly Access Review Report", provider: "Compliance Team", collected: true },
  { id: "req-4", description: "User Provisioning Workflow", provider: "HR/IT", collected: false },
  { id: "req-5", description: "Access Termination Evidence", provider: "HR", collected: false },
];

// Audit trail entries
const auditTrail = [
  { timestamp: "2024-01-15 14:32:00", user: "John Smith", action: "Uploaded", item: "Access_Policy_v2.3.pdf", ip: "10.0.1.45", details: "New version uploaded" },
  { timestamp: "2024-01-15 14:35:00", user: "Jane Doe", action: "Verified", item: "Access_Policy_v2.3.pdf", ip: "10.0.1.52", details: "Hash verified, approved" },
  { timestamp: "2024-01-14 10:22:00", user: "Jane Doe", action: "Uploaded", item: "MFA_Config_Jan2024.png", ip: "10.0.1.52", details: "Screenshot captured" },
  { timestamp: "2024-01-14 16:45:00", user: "Mike Wilson", action: "Downloaded", item: "UAR_Q4_2023.xlsx", ip: "10.0.1.78", details: "Downloaded for review" },
  { timestamp: "2024-01-10 09:15:00", user: "Mike Wilson", action: "Uploaded", item: "UAR_Q4_2023.xlsx", ip: "10.0.1.78", details: "Q4 review complete" },
];

const statusConfig = {
  "Verified": { icon: Check, color: "text-success", bg: "bg-success/10" },
  "Pending Review": { icon: Clock, color: "text-warning", bg: "bg-warning/10" },
  "Rejected": { icon: X, color: "text-destructive", bg: "bg-destructive/10" },
};

const typeIcons = {
  "Screenshot": FileImage,
  "Policy Document": FileText,
  "Log File": FileCode,
  "Configuration": FileCode,
  "Interview Notes": FileAudio,
};

const EvidenceManagement = () => {
  const [expandedNodes, setExpandedNodes] = useState<string[]>(["hipaa", "hipaa-164-312-a-1"]);
  const [selectedControl, setSelectedControl] = useState<string>("hipaa-164-312-a-1");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [viewerDialogOpen, setViewerDialogOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<typeof collectedEvidence[0] | null>(null);
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [date, setDate] = useState<Date>();

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]
    );
  };

  const getControlData = () => {
    for (const framework of evidenceTree) {
      for (const control of framework.children) {
        if (control.id === selectedControl) {
          return control;
        }
      }
    }
    return null;
  };

  const selectedControlData = getControlData();

  const renderTreeNode = (node: any, level: number = 0) => {
    const isExpanded = expandedNodes.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = node.id === selectedControl;
    const isControl = node.type === "control";

    return (
      <div key={node.id}>
        <div
          className={cn(
            "flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer transition-colors",
            isSelected && "bg-primary/20 text-primary",
            !isSelected && "hover:bg-muted/50"
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            if (hasChildren) toggleNode(node.id);
            if (isControl) setSelectedControl(node.id);
          }}
        >
          {hasChildren && (
            <span className="shrink-0">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
          )}
          {!hasChildren && <span className="w-4" />}
          
          {node.type === "framework" && (
            isExpanded ? <FolderOpen className="h-4 w-4 text-primary shrink-0" /> : <Folder className="h-4 w-4 text-primary shrink-0" />
          )}
          {node.type === "control" && <FolderTree className="h-4 w-4 text-muted-foreground shrink-0" />}
          {node.type === "evidence" && <File className="h-4 w-4 text-muted-foreground shrink-0" />}
          
          <span className="text-sm truncate flex-1">{node.name}</span>
          
          {isControl && (
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant={
                node.status === "Complete" ? "default" :
                node.status === "In Progress" ? "secondary" : "destructive"
              } className="text-xs">
                {node.completion}%
              </Badge>
            </div>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child: any) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Evidence Management</h1>
            <p className="text-muted-foreground">Collect, organize, and verify audit evidence</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAuditTrail(!showAuditTrail)}>
              <Shield className="mr-2 h-4 w-4" />
              Audit Trail
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print View
            </Button>
          </div>
        </div>

        {/* AI Gap Analysis Alert */}
        <Card className="glass-card border-warning/30">
          <CardContent className="py-3">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-warning" />
              <div className="flex-1">
                <p className="text-sm font-medium">AI Evidence Gap Analysis</p>
                <p className="text-xs text-muted-foreground">
                  Missing evidence for 3 controls across HIPAA and SOC 2 frameworks
                </p>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Two-Panel Layout */}
        <ResizablePanelGroup direction="horizontal" className="flex-1 rounded-lg border border-border">
          {/* Left Panel - Evidence Library Tree */}
          <ResizablePanel defaultSize={30} minSize={20}>
            <Card className="h-full rounded-none border-0">
              <CardHeader className="py-3 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Evidence Library</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <ScrollArea className="h-[calc(100%-60px)]">
                <div className="px-2 pb-4">
                  {evidenceTree.map((node) => renderTreeNode(node))}
                </div>
              </ScrollArea>
            </Card>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Evidence Details */}
          <ResizablePanel defaultSize={70}>
            <Card className="h-full rounded-none border-0">
              <CardHeader className="py-3 px-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{selectedControlData?.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last updated: {selectedControlData?.lastUpdated || "Never"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Completion</p>
                      <div className="flex items-center gap-2">
                        <Progress value={selectedControlData?.completion || 0} className="w-24 h-2" />
                        <span className="text-sm font-medium">{selectedControlData?.completion || 0}%</span>
                      </div>
                    </div>
                    <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Evidence
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Upload Evidence</DialogTitle>
                          <DialogDescription>
                            Upload and categorize evidence for this control.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Drag and drop files here, or click to browse
                            </p>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label>Title</Label>
                              <Input placeholder="Evidence title" />
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Textarea placeholder="Describe the evidence..." />
                            </div>
                            <div>
                              <Label>Evidence Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="screenshot">Screenshot</SelectItem>
                                  <SelectItem value="policy">Policy Document</SelectItem>
                                  <SelectItem value="log">Log File</SelectItem>
                                  <SelectItem value="config">Configuration</SelectItem>
                                  <SelectItem value="interview">Interview Notes</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Effective Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    className="pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div>
                              <Label>Tags</Label>
                              <Input placeholder="Enter tags, comma separated" />
                            </div>
                          </div>
                          <Button className="w-full">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload & Verify
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>

              <ScrollArea className="h-[calc(100%-80px)]">
                <div className="p-4 space-y-6">
                  {/* Evidence Requirements Checklist */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Evidence Requirements</h4>
                    <div className="space-y-2">
                      {evidenceRequirements.map((req) => (
                        <div
                          key={req.id}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-lg border",
                            req.collected ? "bg-success/5 border-success/20" : "bg-muted/30 border-border"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox checked={req.collected} />
                            <div>
                              <p className="text-sm font-medium">{req.description}</p>
                              <p className="text-xs text-muted-foreground">Provider: {req.provider}</p>
                            </div>
                          </div>
                          {!req.collected && (
                            <Button size="sm" variant="outline">
                              <Plus className="mr-1 h-3 w-3" />
                              Collect
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Collected Evidence Grid */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Collected Evidence</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      {collectedEvidence.map((evidence) => {
                        const StatusIcon = statusConfig[evidence.status as keyof typeof statusConfig]?.icon || Clock;
                        const statusColor = statusConfig[evidence.status as keyof typeof statusConfig]?.color;
                        const statusBg = statusConfig[evidence.status as keyof typeof statusConfig]?.bg;
                        const TypeIcon = typeIcons[evidence.type as keyof typeof typeIcons] || File;

                        return (
                          <Card
                            key={evidence.id}
                            className={cn(
                              "glass-card cursor-pointer hover:shadow-card-hover transition-shadow",
                              evidence.status === "Rejected" && "border-destructive/30"
                            )}
                            onClick={() => {
                              setSelectedEvidence(evidence);
                              setViewerDialogOpen(true);
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className={cn("p-2 rounded-lg", statusBg)}>
                                  <TypeIcon className={cn("h-5 w-5", statusColor)} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <p className="font-medium text-sm truncate">{evidence.title}</p>
                                      <Badge variant="outline" className="mt-1 text-xs">
                                        {evidence.type}
                                      </Badge>
                                    </div>
                                    <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-xs", statusBg)}>
                                      <StatusIcon className={cn("h-3 w-3", statusColor)} />
                                      <span className={statusColor}>{evidence.status}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-5 w-5">
                                        <AvatarFallback className="text-[10px]">
                                          {evidence.collectedBy.initials}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span>{evidence.collectedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Lock className="h-3 w-3" />
                                      <Hash className="h-3 w-3" />
                                    </div>
                                  </div>

                                  {evidence.status === "Rejected" && (
                                    <div className="mt-2 p-2 rounded bg-destructive/10 text-xs text-destructive">
                                      {evidence.rejectionReason}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Audit Trail Panel (Bottom) */}
        {showAuditTrail && (
          <Card className="glass-card">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Immutable Audit Trail
                </CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input placeholder="Search..." className="h-7 pl-7 text-xs w-40" />
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-48">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs">Timestamp</TableHead>
                      <TableHead className="text-xs">User</TableHead>
                      <TableHead className="text-xs">Action</TableHead>
                      <TableHead className="text-xs">Evidence Item</TableHead>
                      <TableHead className="text-xs">IP Address</TableHead>
                      <TableHead className="text-xs">Details</TableHead>
                      <TableHead className="text-xs w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditTrail.map((entry, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-mono text-xs">{entry.timestamp}</TableCell>
                        <TableCell className="text-xs">{entry.user}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {entry.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs font-medium">{entry.item}</TableCell>
                        <TableCell className="font-mono text-xs">{entry.ip}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{entry.details}</TableCell>
                        <TableCell>
                          <Check className="h-3 w-3 text-success" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Evidence Viewer Dialog */}
        <Dialog open={viewerDialogOpen} onOpenChange={setViewerDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedEvidence?.title}
                <Badge variant={selectedEvidence?.status === "Verified" ? "default" : "secondary"}>
                  {selectedEvidence?.status}
                </Badge>
              </DialogTitle>
              <DialogDescription>{selectedEvidence?.filename}</DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-auto space-y-4">
              {/* Preview Area */}
              <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center">
                <FileImage className="h-16 w-16 text-muted-foreground" />
              </div>

              {/* Verification Details */}
              <Card className="glass-card">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    Verification Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">SHA-256 Hash</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                      {selectedEvidence?.hash}
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Upload Timestamp</span>
                    <span className="text-sm">{selectedEvidence?.collectedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Uploaded By</span>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[10px]">
                          {selectedEvidence?.collectedBy.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{selectedEvidence?.collectedBy.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">File Size</span>
                    <span className="text-sm">{selectedEvidence?.size}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <div>
                <p className="text-sm font-medium mb-2">Tags</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedEvidence?.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex gap-2 justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Link2 className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </Button>
                {selectedEvidence?.status === "Pending Review" && (
                  <Button size="sm">
                    <Check className="mr-2 h-4 w-4" />
                    Approve as Evidence
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EvidenceManagement;
