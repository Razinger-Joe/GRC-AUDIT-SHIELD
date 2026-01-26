import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
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
    FileDown,
    FileText,
    Shield,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Building2,
    Lock,
    Eye,
    Clock,
    TrendingUp,
    Calendar,
    Download,
    Send,
    Printer,
} from "lucide-react";
import { cn } from "@/lib/utils";

// SOC 2 Trust Services Criteria Data
const soc2Data = {
    overall: 94,
    criteria: [
        {
            id: "CC",
            name: "Common Criteria",
            compliance: 96,
            controls: [
                { id: "CC1.1", name: "Control Environment", status: "Pass", lastTested: "2026-01-15" },
                { id: "CC1.2", name: "Board Independence", status: "Pass", lastTested: "2026-01-14" },
                { id: "CC2.1", name: "Information and Communication", status: "Pass", lastTested: "2026-01-12" },
                { id: "CC3.1", name: "Risk Assessment", status: "Pass", lastTested: "2026-01-10" },
                { id: "CC4.1", name: "Monitoring Activities", status: "Exception", lastTested: "2026-01-08" },
            ]
        },
        {
            id: "A",
            name: "Availability",
            compliance: 92,
            controls: [
                { id: "A1.1", name: "System Availability", status: "Pass", lastTested: "2026-01-15" },
                { id: "A1.2", name: "Recovery Objectives", status: "Pass", lastTested: "2026-01-14" },
                { id: "A1.3", name: "Disaster Recovery", status: "Exception", lastTested: "2026-01-13" },
            ]
        },
        {
            id: "C",
            name: "Confidentiality",
            compliance: 98,
            controls: [
                { id: "C1.1", name: "Data Classification", status: "Pass", lastTested: "2026-01-15" },
                { id: "C1.2", name: "Data Encryption", status: "Pass", lastTested: "2026-01-14" },
            ]
        },
        {
            id: "PI",
            name: "Processing Integrity",
            compliance: 95,
            controls: [
                { id: "PI1.1", name: "Processing Accuracy", status: "Pass", lastTested: "2026-01-15" },
                { id: "PI1.2", name: "Input Validation", status: "Pass", lastTested: "2026-01-14" },
                { id: "PI1.3", name: "Error Handling", status: "Exception", lastTested: "2026-01-12" },
            ]
        },
        {
            id: "P",
            name: "Privacy",
            compliance: 91,
            controls: [
                { id: "P1.1", name: "Privacy Notice", status: "Pass", lastTested: "2026-01-15" },
                { id: "P2.1", name: "Choice and Consent", status: "Pass", lastTested: "2026-01-14" },
                { id: "P3.1", name: "Data Collection", status: "Pass", lastTested: "2026-01-13" },
                { id: "P4.1", name: "Data Retention", status: "Exception", lastTested: "2026-01-10" },
            ]
        },
    ],
    exceptions: [
        { id: "EXC-001", control: "CC4.1", description: "Delayed security metrics review", status: "In Remediation", dueDate: "2026-02-15" },
        { id: "EXC-002", control: "A1.3", description: "DR test not completed within SLA", status: "Open", dueDate: "2026-02-01" },
        { id: "EXC-003", control: "PI1.3", description: "Error logging gap identified", status: "In Remediation", dueDate: "2026-02-10" },
        { id: "EXC-004", control: "P4.1", description: "Data retention policy review pending", status: "Open", dueDate: "2026-01-30" },
    ]
};

// ISO 27001 Annex A Controls
const iso27001Data = {
    overall: 89,
    domains: [
        { id: "A.5", name: "Information Security Policies", controls: 2, compliant: 2, compliance: 100 },
        { id: "A.6", name: "Organization of Information Security", controls: 7, compliant: 7, compliance: 100 },
        { id: "A.7", name: "Human Resource Security", controls: 6, compliant: 5, compliance: 83 },
        { id: "A.8", name: "Asset Management", controls: 10, compliant: 9, compliance: 90 },
        { id: "A.9", name: "Access Control", controls: 14, compliant: 13, compliance: 93 },
        { id: "A.10", name: "Cryptography", controls: 2, compliant: 2, compliance: 100 },
        { id: "A.11", name: "Physical Security", controls: 15, compliant: 14, compliance: 93 },
        { id: "A.12", name: "Operations Security", controls: 14, compliant: 12, compliance: 86 },
        { id: "A.13", name: "Communications Security", controls: 7, compliant: 6, compliance: 86 },
        { id: "A.14", name: "System Acquisition & Development", controls: 13, compliant: 11, compliance: 85 },
        { id: "A.15", name: "Supplier Relationships", controls: 5, compliant: 4, compliance: 80 },
        { id: "A.16", name: "Incident Management", controls: 7, compliant: 7, compliance: 100 },
        { id: "A.17", name: "Business Continuity", controls: 4, compliant: 3, compliance: 75 },
        { id: "A.18", name: "Compliance", controls: 8, compliant: 7, compliance: 88 },
    ]
};

// NIST CSF Data
const nistData = {
    overall: 3.8,
    maxScore: 5,
    functions: [
        { id: "ID", name: "Identify", score: 4.2, color: "#3b82f6" },
        { id: "PR", name: "Protect", score: 3.8, color: "#22c55e" },
        { id: "DE", name: "Detect", score: 3.5, color: "#eab308" },
        { id: "RS", name: "Respond", score: 4.0, color: "#f97316" },
        { id: "RC", name: "Recover", score: 3.2, color: "#ef4444" },
    ]
};

// PCI-DSS Requirements
const pciData = {
    overall: 91,
    requirements: [
        { id: "1", name: "Install and maintain network security controls", compliance: 95 },
        { id: "2", name: "Apply secure configurations", compliance: 88 },
        { id: "3", name: "Protect stored account data", compliance: 100 },
        { id: "4", name: "Protect cardholder data with strong cryptography", compliance: 100 },
        { id: "5", name: "Protect from malicious software", compliance: 92 },
        { id: "6", name: "Develop and maintain secure systems", compliance: 85 },
        { id: "7", name: "Restrict access to system components", compliance: 90 },
        { id: "8", name: "Identify users and authenticate access", compliance: 88 },
        { id: "9", name: "Restrict physical access", compliance: 95 },
        { id: "10", name: "Log and monitor access", compliance: 82 },
        { id: "11", name: "Test security of systems and networks", compliance: 90 },
        { id: "12", name: "Support information security with policies", compliance: 92 },
    ]
};

const getComplianceColor = (value: number) => {
    if (value >= 90) return "text-success";
    if (value >= 75) return "text-warning";
    return "text-destructive";
};

const SecurityReportsPage = () => {
    const [selectedReport, setSelectedReport] = useState("soc2");
    const [reportPeriod, setReportPeriod] = useState("q4-2025");

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Security Reports</h1>
                        <p className="text-muted-foreground">
                            Industry-standard compliance and security assessment reports
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Select value={reportPeriod} onValueChange={setReportPeriod}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="q4-2025">Q4 2025</SelectItem>
                                <SelectItem value="q3-2025">Q3 2025</SelectItem>
                                <SelectItem value="q2-2025">Q2 2025</SelectItem>
                                <SelectItem value="annual-2025">Annual 2025</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Report Type Selection */}
                <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1">
                        <TabsTrigger value="soc2" className="gap-2 py-3">
                            <Shield className="h-4 w-4" />
                            <span className="hidden sm:inline">SOC 2</span>
                        </TabsTrigger>
                        <TabsTrigger value="iso27001" className="gap-2 py-3">
                            <Lock className="h-4 w-4" />
                            <span className="hidden sm:inline">ISO 27001</span>
                        </TabsTrigger>
                        <TabsTrigger value="nist" className="gap-2 py-3">
                            <Building2 className="h-4 w-4" />
                            <span className="hidden sm:inline">NIST CSF</span>
                        </TabsTrigger>
                        <TabsTrigger value="pci" className="gap-2 py-3">
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">PCI-DSS</span>
                        </TabsTrigger>
                        <TabsTrigger value="executive" className="gap-2 py-3">
                            <TrendingUp className="h-4 w-4" />
                            <span className="hidden sm:inline">Executive</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* SOC 2 Report */}
                    <TabsContent value="soc2" className="space-y-6">
                        {/* Report Header Card */}
                        <Card className="glass-card">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-lg bg-primary/10">
                                            <Shield className="h-8 w-8 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">SOC 2 Type II Report</CardTitle>
                                            <CardDescription>
                                                Trust Services Criteria Compliance Assessment
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <Printer className="mr-2 h-4 w-4" />
                                            Print
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Export PDF
                                        </Button>
                                        <Button size="sm">
                                            <Send className="mr-2 h-4 w-4" />
                                            Share
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="text-center p-4 rounded-lg bg-muted/30">
                                        <p className="text-sm text-muted-foreground mb-1">Overall Compliance</p>
                                        <p className={cn("text-4xl font-bold", getComplianceColor(soc2Data.overall))}>
                                            {soc2Data.overall}%
                                        </p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-muted/30">
                                        <p className="text-sm text-muted-foreground mb-1">Controls Tested</p>
                                        <p className="text-4xl font-bold">87</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-muted/30">
                                        <p className="text-sm text-muted-foreground mb-1">Open Exceptions</p>
                                        <p className="text-4xl font-bold text-warning">{soc2Data.exceptions.length}</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-muted/30">
                                        <p className="text-sm text-muted-foreground mb-1">Audit Period</p>
                                        <p className="text-lg font-bold">Oct 1 - Dec 31, 2025</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Trust Services Criteria */}
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle>Trust Services Criteria</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    {soc2Data.criteria.map((criterion) => (
                                        <AccordionItem key={criterion.id} value={criterion.id}>
                                            <AccordionTrigger className="hover:no-underline">
                                                <div className="flex items-center justify-between w-full pr-4">
                                                    <div className="flex items-center gap-3">
                                                        <Badge variant="outline">{criterion.id}</Badge>
                                                        <span className="font-medium">{criterion.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <Progress value={criterion.compliance} className="w-24 h-2" />
                                                        <span className={cn("font-bold", getComplianceColor(criterion.compliance))}>
                                                            {criterion.compliance}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Control ID</TableHead>
                                                            <TableHead>Control Name</TableHead>
                                                            <TableHead>Status</TableHead>
                                                            <TableHead>Last Tested</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {criterion.controls.map((control) => (
                                                            <TableRow key={control.id}>
                                                                <TableCell className="font-mono">{control.id}</TableCell>
                                                                <TableCell>{control.name}</TableCell>
                                                                <TableCell>
                                                                    {control.status === "Pass" ? (
                                                                        <Badge className="bg-success">
                                                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                                                            Pass
                                                                        </Badge>
                                                                    ) : (
                                                                        <Badge variant="outline" className="text-warning border-warning">
                                                                            <AlertTriangle className="h-3 w-3 mr-1" />
                                                                            Exception
                                                                        </Badge>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell className="text-muted-foreground">
                                                                    {control.lastTested}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>

                        {/* Exceptions */}
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-warning" />
                                    Open Exceptions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Exception ID</TableHead>
                                            <TableHead>Control</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Due Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {soc2Data.exceptions.map((exc) => (
                                            <TableRow key={exc.id}>
                                                <TableCell className="font-mono">{exc.id}</TableCell>
                                                <TableCell className="font-mono">{exc.control}</TableCell>
                                                <TableCell>{exc.description}</TableCell>
                                                <TableCell>
                                                    <Badge variant={exc.status === "Open" ? "destructive" : "secondary"}>
                                                        {exc.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{exc.dueDate}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* ISO 27001 Report */}
                    <TabsContent value="iso27001" className="space-y-6">
                        <Card className="glass-card">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-info/10">
                                        <Lock className="h-8 w-8 text-info" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">ISO 27001 Compliance Report</CardTitle>
                                        <CardDescription>
                                            Annex A Controls Assessment - Information Security Management System
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div className="text-center p-4 rounded-lg bg-muted/30">
                                        <p className="text-sm text-muted-foreground mb-1">Overall Compliance</p>
                                        <p className={cn("text-4xl font-bold", getComplianceColor(iso27001Data.overall))}>
                                            {iso27001Data.overall}%
                                        </p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-muted/30">
                                        <p className="text-sm text-muted-foreground mb-1">Total Controls</p>
                                        <p className="text-4xl font-bold">114</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-muted/30">
                                        <p className="text-sm text-muted-foreground mb-1">Compliant Controls</p>
                                        <p className="text-4xl font-bold text-success">102</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {iso27001Data.domains.map((domain) => (
                                        <div key={domain.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                                            <Badge variant="outline" className="w-16 justify-center">{domain.id}</Badge>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium">{domain.name}</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {domain.compliant}/{domain.controls} controls
                                                    </span>
                                                </div>
                                                <Progress value={domain.compliance} className="h-2" />
                                            </div>
                                            <span className={cn("font-bold w-16 text-right", getComplianceColor(domain.compliance))}>
                                                {domain.compliance}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* NIST CSF Report */}
                    <TabsContent value="nist" className="space-y-6">
                        <Card className="glass-card">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-warning/10">
                                        <Building2 className="h-8 w-8 text-warning" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">NIST Cybersecurity Framework</CardTitle>
                                        <CardDescription>
                                            Framework Core Assessment - Implementation Tier Analysis
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="text-center p-6 rounded-lg bg-muted/30">
                                        <p className="text-sm text-muted-foreground mb-2">Overall Maturity Score</p>
                                        <p className="text-5xl font-bold text-primary">{nistData.overall}</p>
                                        <p className="text-lg text-muted-foreground">out of {nistData.maxScore}</p>
                                        <Badge className="mt-2 bg-info">Tier 4: Adaptive</Badge>
                                    </div>
                                    <div className="space-y-4">
                                        {nistData.functions.map((func) => (
                                            <div key={func.id} className="flex items-center gap-4">
                                                <Badge
                                                    variant="outline"
                                                    className="w-10 justify-center"
                                                    style={{ borderColor: func.color, color: func.color }}
                                                >
                                                    {func.id}
                                                </Badge>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm font-medium">{func.name}</span>
                                                        <span className="font-bold">{func.score}</span>
                                                    </div>
                                                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full transition-all"
                                                            style={{
                                                                width: `${(func.score / nistData.maxScore) * 100}%`,
                                                                backgroundColor: func.color
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* PCI-DSS Report */}
                    <TabsContent value="pci" className="space-y-6">
                        <Card className="glass-card">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-success/10">
                                        <FileText className="h-8 w-8 text-success" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">PCI-DSS Compliance Summary</CardTitle>
                                        <CardDescription>
                                            Payment Card Industry Data Security Standard v4.0
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center p-6 rounded-lg bg-muted/30 mb-6">
                                    <p className="text-sm text-muted-foreground mb-1">Overall PCI-DSS Compliance</p>
                                    <p className={cn("text-5xl font-bold", getComplianceColor(pciData.overall))}>
                                        {pciData.overall}%
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {pciData.requirements.map((req) => (
                                        <div key={req.id} className="p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge variant="outline">Req {req.id}</Badge>
                                                <span className={cn("font-bold", getComplianceColor(req.compliance))}>
                                                    {req.compliance}%
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">{req.name}</p>
                                            <Progress value={req.compliance} className="h-1.5 mt-2" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Executive Summary */}
                    <TabsContent value="executive" className="space-y-6">
                        <Card className="glass-card">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10">
                                        <TrendingUp className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">Executive Security Summary</CardTitle>
                                        <CardDescription>
                                            High-level security posture and compliance overview for leadership
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                                        <Shield className="h-10 w-10 mx-auto mb-3 text-primary" />
                                        <p className="text-sm text-muted-foreground mb-1">Security Posture</p>
                                        <p className="text-4xl font-bold text-primary">Strong</p>
                                        <p className="text-sm text-success mt-1">↑ Improved from Q3</p>
                                    </div>
                                    <div className="text-center p-6 rounded-lg bg-muted/30">
                                        <CheckCircle2 className="h-10 w-10 mx-auto mb-3 text-success" />
                                        <p className="text-sm text-muted-foreground mb-1">Compliance Rate</p>
                                        <p className="text-4xl font-bold text-success">92%</p>
                                        <p className="text-sm text-muted-foreground mt-1">Across all frameworks</p>
                                    </div>
                                    <div className="text-center p-6 rounded-lg bg-muted/30">
                                        <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-warning" />
                                        <p className="text-sm text-muted-foreground mb-1">Open Risks</p>
                                        <p className="text-4xl font-bold text-warning">12</p>
                                        <p className="text-sm text-muted-foreground mt-1">3 critical, 9 high</p>
                                    </div>
                                    <div className="text-center p-6 rounded-lg bg-muted/30">
                                        <Clock className="h-10 w-10 mx-auto mb-3 text-info" />
                                        <p className="text-sm text-muted-foreground mb-1">Avg Resolution Time</p>
                                        <p className="text-4xl font-bold">4.2d</p>
                                        <p className="text-sm text-success mt-1">↓ 18% faster</p>
                                    </div>
                                </div>

                                <Separator className="my-6" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold mb-4">Key Accomplishments</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                                                <span className="text-sm">Successfully passed SOC 2 Type II audit with no major findings</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                                                <span className="text-sm">Reduced vulnerability remediation time by 35%</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                                                <span className="text-sm">Implemented zero-trust architecture across cloud infrastructure</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                                                <span className="text-sm">Achieved ISO 27001 certification renewal</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-4">Areas Requiring Attention</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-2">
                                                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                                                <span className="text-sm">Third-party vendor risk assessments pending for 3 critical vendors</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                                                <span className="text-sm">Business continuity plan requires annual review update</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                                                <span className="text-sm">Legacy system migration timeline at risk - resource constraints</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default SecurityReportsPage;
