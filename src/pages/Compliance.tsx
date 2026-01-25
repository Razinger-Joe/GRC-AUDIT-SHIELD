import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  User,
  BarChart3,
  Shield,
  AlertTriangle,
  Download,
  ExternalLink,
} from "lucide-react";
import { ComplianceRing } from "@/components/dashboard/ComplianceRing";
import { cn } from "@/lib/utils";

interface Framework {
  id: string;
  name: string;
  shortName: string;
  type: "Healthcare" | "Financial" | "Security" | "Privacy";
  score: number;
  status: "compliant" | "non-compliant" | "in-progress";
  totalControls: number;
  passed: number;
  failed: number;
  inReview: number;
  lastAssessed: string;
  nextAssessment: string;
  assignedAuditor: string;
  description: string;
  categories: { name: string; passed: number; total: number }[];
}

const frameworks: Framework[] = [
  {
    id: "1",
    name: "Health Insurance Portability and Accountability Act",
    shortName: "HIPAA",
    type: "Healthcare",
    score: 98,
    status: "compliant",
    totalControls: 164,
    passed: 161,
    failed: 1,
    inReview: 2,
    lastAssessed: "Jan 15, 2024",
    nextAssessment: "Jul 15, 2024",
    assignedAuditor: "Sarah Johnson",
    description: "Federal law that provides data privacy and security provisions for safeguarding medical information.",
    categories: [
      { name: "Access Control", passed: 42, total: 45 },
      { name: "Encryption", passed: 28, total: 28 },
      { name: "Audit Logging", passed: 35, total: 36 },
      { name: "Incident Response", passed: 22, total: 22 },
      { name: "Physical Security", passed: 34, total: 33 },
    ],
  },
  {
    id: "2",
    name: "Payment Card Industry Data Security Standard",
    shortName: "PCI-DSS",
    type: "Financial",
    score: 94,
    status: "compliant",
    totalControls: 256,
    passed: 241,
    failed: 8,
    inReview: 7,
    lastAssessed: "Dec 20, 2023",
    nextAssessment: "Jun 20, 2024",
    assignedAuditor: "Michael Chen",
    description: "Information security standard for organizations handling branded credit cards.",
    categories: [
      { name: "Network Security", passed: 52, total: 58 },
      { name: "Data Protection", passed: 45, total: 48 },
      { name: "Vulnerability Management", passed: 38, total: 40 },
      { name: "Access Control", passed: 62, total: 65 },
      { name: "Monitoring", passed: 44, total: 45 },
    ],
  },
  {
    id: "3",
    name: "Service Organization Control 2",
    shortName: "SOC 2",
    type: "Security",
    score: 96,
    status: "compliant",
    totalControls: 312,
    passed: 299,
    failed: 5,
    inReview: 8,
    lastAssessed: "Jan 10, 2024",
    nextAssessment: "Jan 10, 2025",
    assignedAuditor: "Emily Davis",
    description: "Framework for managing customer data based on five trust service principles.",
    categories: [
      { name: "Security", passed: 78, total: 82 },
      { name: "Availability", passed: 45, total: 46 },
      { name: "Processing Integrity", passed: 52, total: 54 },
      { name: "Confidentiality", passed: 68, total: 70 },
      { name: "Privacy", passed: 56, total: 60 },
    ],
  },
  {
    id: "4",
    name: "Sarbanes-Oxley Act",
    shortName: "SOX",
    type: "Financial",
    score: 100,
    status: "compliant",
    totalControls: 128,
    passed: 128,
    failed: 0,
    inReview: 0,
    lastAssessed: "Jan 5, 2024",
    nextAssessment: "Jan 5, 2025",
    assignedAuditor: "Robert Wilson",
    description: "Federal law that set enhanced standards for U.S. public company boards and accounting firms.",
    categories: [
      { name: "Financial Reporting", passed: 42, total: 42 },
      { name: "Internal Controls", passed: 38, total: 38 },
      { name: "IT General Controls", passed: 28, total: 28 },
      { name: "Change Management", passed: 20, total: 20 },
    ],
  },
  {
    id: "5",
    name: "ISO/IEC 27001",
    shortName: "ISO 27001",
    type: "Security",
    score: 88,
    status: "in-progress",
    totalControls: 114,
    passed: 100,
    failed: 6,
    inReview: 8,
    lastAssessed: "Nov 30, 2023",
    nextAssessment: "May 30, 2024",
    assignedAuditor: "Lisa Anderson",
    description: "International standard for information security management systems.",
    categories: [
      { name: "Information Security Policies", passed: 12, total: 14 },
      { name: "Asset Management", passed: 18, total: 20 },
      { name: "Cryptography", passed: 22, total: 24 },
      { name: "Operations Security", passed: 28, total: 32 },
      { name: "Communications Security", passed: 20, total: 24 },
    ],
  },
];

const typeBadgeColors = {
  Healthcare: "bg-info/10 text-info border-info/20",
  Financial: "bg-success/10 text-success border-success/20",
  Security: "bg-primary/10 text-primary border-primary/20",
  Privacy: "bg-warning/10 text-warning border-warning/20",
};

const statusConfig = {
  compliant: { label: "Compliant", class: "bg-success/10 text-success border-success/20" },
  "non-compliant": { label: "Non-Compliant", class: "bg-destructive/10 text-destructive border-destructive/20" },
  "in-progress": { label: "In Progress", class: "bg-warning/10 text-warning border-warning/20" },
};

export default function Compliance() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);

  const filteredFrameworks = frameworks.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      framework.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || framework.status === statusFilter;
    const matchesType = typeFilter === "all" || framework.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Compliance Frameworks</h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor your compliance frameworks and control status.
            </p>
          </div>
          <Button className="gradient-primary text-primary-foreground gap-2">
            <Plus className="h-4 w-4" />
            Add Framework
          </Button>
        </div>

        {/* Filter Bar */}
        <Card className="p-4 shadow-card bg-card animate-fade-up" style={{ animationDelay: "100ms" }}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search frameworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-muted/50 border-border/50"
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px] bg-muted/50 border-border/50">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="compliant">Compliant</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[160px] bg-muted/50 border-border/50">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Privacy">Privacy</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
            </div>
          </div>
        </Card>

        {/* Framework Grid */}
        {filteredFrameworks.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredFrameworks.map((framework, index) => (
              <Card
                key={framework.id}
                className="p-6 shadow-card bg-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/30 animate-fade-up cursor-pointer"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
                onClick={() => setSelectedFramework(framework)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={typeBadgeColors[framework.type]}>
                        {framework.type}
                      </Badge>
                      <Badge className={statusConfig[framework.status].class}>
                        {statusConfig[framework.status].label}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-xl">{framework.shortName}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {framework.name}
                    </p>
                  </div>
                  <ComplianceRing percentage={framework.score} size="md" />
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between py-3 border-y border-border/50 text-sm">
                  <div className="text-center">
                    <p className="font-bold">{framework.totalControls}</p>
                    <p className="text-muted-foreground text-xs">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-success">{framework.passed}</p>
                    <p className="text-muted-foreground text-xs">Passed</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-destructive">{framework.failed}</p>
                    <p className="text-muted-foreground text-xs">Failed</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-warning">{framework.inReview}</p>
                    <p className="text-muted-foreground text-xs">In Review</p>
                  </div>
                </div>

                {/* Category Mini Chart */}
                <div className="mt-4 space-y-2">
                  {framework.categories.slice(0, 3).map((category) => (
                    <div key={category.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{category.name}</span>
                        <span>{category.passed}/{category.total}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            category.passed === category.total
                              ? "bg-success"
                              : category.passed / category.total >= 0.9
                              ? "bg-primary"
                              : "bg-warning"
                          )}
                          style={{ width: `${(category.passed / category.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Last assessed: {framework.lastAssessed}
                  </p>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="p-12 shadow-card bg-card text-center animate-fade-up">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Frameworks Found</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Get started by adding your first compliance framework to begin monitoring your organization's security posture.
              </p>
              <Button className="gradient-primary text-primary-foreground gap-2">
                <Plus className="h-4 w-4" />
                Get Started
              </Button>
            </div>
          </Card>
        )}

        {/* Framework Detail Modal */}
        <Dialog open={!!selectedFramework} onOpenChange={() => setSelectedFramework(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] bg-card border-border">
            {selectedFramework && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <DialogTitle className="text-2xl">{selectedFramework.shortName}</DialogTitle>
                      <p className="text-sm text-muted-foreground">{selectedFramework.name}</p>
                    </div>
                    <Badge className={cn("ml-auto", statusConfig[selectedFramework.status].class)}>
                      {statusConfig[selectedFramework.status].label}
                    </Badge>
                  </div>
                </DialogHeader>

                <Tabs defaultValue="overview" className="mt-6">
                  <TabsList className="bg-muted/50">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="controls">Controls</TabsTrigger>
                    <TabsTrigger value="evidence">Evidence</TabsTrigger>
                    <TabsTrigger value="findings">Findings</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>

                  <ScrollArea className="h-[500px] mt-4">
                    <TabsContent value="overview" className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Description */}
                        <Card className="p-4 bg-muted/30">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            Framework Description
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedFramework.description}
                          </p>
                        </Card>

                        {/* Key Statistics */}
                        <Card className="p-4 bg-muted/30">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-primary" />
                            Key Statistics
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-2xl font-bold text-success">{selectedFramework.passed}</p>
                              <p className="text-xs text-muted-foreground">Controls Passed</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-destructive">{selectedFramework.failed}</p>
                              <p className="text-xs text-muted-foreground">Controls Failed</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-warning">{selectedFramework.inReview}</p>
                              <p className="text-xs text-muted-foreground">In Review</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold">{selectedFramework.score}%</p>
                              <p className="text-xs text-muted-foreground">Compliance Score</p>
                            </div>
                          </div>
                        </Card>

                        {/* Assigned Auditor */}
                        <Card className="p-4 bg-muted/30">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            Assigned Auditor
                          </h4>
                          <p className="text-sm">{selectedFramework.assignedAuditor}</p>
                        </Card>

                        {/* Assessment Schedule */}
                        <Card className="p-4 bg-muted/30">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            Assessment Schedule
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="text-muted-foreground">Last:</span> {selectedFramework.lastAssessed}
                            </p>
                            <p>
                              <span className="text-muted-foreground">Next:</span> {selectedFramework.nextAssessment}
                            </p>
                          </div>
                        </Card>
                      </div>

                      {/* Control Categories */}
                      <Card className="p-4 bg-muted/30">
                        <h4 className="font-medium mb-4">Control Categories</h4>
                        <div className="space-y-3">
                          {selectedFramework.categories.map((cat) => (
                            <div key={cat.name} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{cat.name}</span>
                                <span className="text-muted-foreground">
                                  {cat.passed}/{cat.total} ({Math.round((cat.passed / cat.total) * 100)}%)
                                </span>
                              </div>
                              <div className="h-2 rounded-full bg-muted overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full rounded-full",
                                    cat.passed === cat.total ? "bg-success" : "bg-primary"
                                  )}
                                  style={{ width: `${(cat.passed / cat.total) * 100}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>

                      {/* Quick Actions */}
                      <div className="flex flex-wrap gap-3">
                        <Button className="gap-2">
                          <Download className="h-4 w-4" />
                          Generate Report
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Request Evidence
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Clock className="h-4 w-4" />
                          Mark for Review
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="controls">
                      <div className="text-center py-12 text-muted-foreground">
                        <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Control details coming soon...</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="evidence">
                      <div className="text-center py-12 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Evidence library coming soon...</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="findings">
                      <div className="text-center py-12 text-muted-foreground">
                        <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Findings list coming soon...</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="history">
                      <div className="text-center py-12 text-muted-foreground">
                        <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Audit history coming soon...</p>
                      </div>
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
