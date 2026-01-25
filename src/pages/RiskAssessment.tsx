import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Sparkles,
  MoreVertical,
  Search,
  Plus,
  FileDown,
  ArrowUpRight,
  Shield,
  Target,
  Zap,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

// Mock risks data
const mockRisks = [
  {
    id: "RISK-001",
    description: "Unauthorized access to financial data due to weak authentication controls",
    asset: "SAP ERP Financial Module",
    impact: 5,
    likelihood: 3,
    riskScore: 75,
    controlEffectiveness: 65,
    treatment: "Mitigate",
    owner: { name: "John Smith", avatar: "" },
    status: "Open",
    details: "Critical financial data is at risk due to single-factor authentication. Current controls are not sufficient for regulatory compliance.",
    businessImpact: "Potential unauthorized transactions, regulatory fines up to $5M, reputational damage",
    relatedControls: ["AC-001", "AC-002", "IA-001"],
  },
  {
    id: "RISK-002",
    description: "Data breach risk from unpatched legacy systems",
    asset: "Legacy Mainframe",
    impact: 4,
    likelihood: 4,
    riskScore: 80,
    controlEffectiveness: 45,
    treatment: "Mitigate",
    owner: { name: "Jane Doe", avatar: "" },
    status: "In Progress",
    details: "Legacy mainframe systems running outdated OS versions with known vulnerabilities.",
    businessImpact: "Data breach affecting 100K+ customer records, estimated cost $2-10M",
    relatedControls: ["SI-002", "RA-005"],
  },
  {
    id: "RISK-003",
    description: "Business continuity risk from single point of failure in payment processing",
    asset: "Payment Gateway",
    impact: 5,
    likelihood: 2,
    riskScore: 50,
    controlEffectiveness: 80,
    treatment: "Accept",
    owner: { name: "Mike Wilson", avatar: "" },
    status: "Closed",
    details: "Payment system has limited redundancy. Compensating controls in place.",
    businessImpact: "Revenue loss of $50K/hour during downtime",
    relatedControls: ["CP-002", "CP-007"],
  },
  {
    id: "RISK-004",
    description: "Insider threat from excessive user privileges",
    asset: "All Critical Systems",
    impact: 4,
    likelihood: 3,
    riskScore: 60,
    controlEffectiveness: 55,
    treatment: "Mitigate",
    owner: { name: "Sarah Chen", avatar: "" },
    status: "Open",
    details: "Lack of least privilege principle implementation across systems.",
    businessImpact: "Potential fraud, data exfiltration, compliance violations",
    relatedControls: ["AC-006", "PS-004"],
  },
  {
    id: "RISK-005",
    description: "Compliance risk from inadequate audit logging",
    asset: "Database Servers",
    impact: 3,
    likelihood: 4,
    riskScore: 48,
    controlEffectiveness: 70,
    treatment: "Transfer",
    owner: { name: "Tom Brown", avatar: "" },
    status: "In Progress",
    details: "Audit logs insufficient for forensic investigation requirements.",
    businessImpact: "Failed audits, regulatory penalties, inability to investigate incidents",
    relatedControls: ["AU-002", "AU-003", "AU-012"],
  },
];

// AI Insights data
const aiInsights = {
  predictions: [
    { risk: "Supply chain attack via third-party vendors", confidence: 87 },
    { risk: "Ransomware targeting backup systems", confidence: 82 },
    { risk: "API security vulnerabilities in new microservices", confidence: 78 },
  ],
  trendingUp: [
    { name: "Cloud misconfiguration", change: "+23%" },
    { name: "Phishing attacks", change: "+18%" },
  ],
  correlations: [
    "RISK-001 and RISK-004 share common control gaps",
    "Legacy systems (RISK-002) compound insider threat exposure",
  ],
};

// Mini trend data
const trendData = [
  { day: "Mon", score: 65 },
  { day: "Tue", score: 68 },
  { day: "Wed", score: 72 },
  { day: "Thu", score: 70 },
  { day: "Fri", score: 75 },
];

// Heatmap cell data
const generateHeatmapData = () => {
  const data: { impact: number; likelihood: number; count: number; risks: string[] }[][] = [];
  for (let i = 5; i >= 1; i--) {
    const row: { impact: number; likelihood: number; count: number; risks: string[] }[] = [];
    for (let j = 1; j <= 5; j++) {
      const risksInCell = mockRisks.filter((r) => r.impact === i && r.likelihood === j);
      row.push({
        impact: i,
        likelihood: j,
        count: risksInCell.length,
        risks: risksInCell.map((r) => r.id),
      });
    }
    data.push(row);
  }
  return data;
};

const impactLabels = ["Very Low", "Low", "Medium", "High", "Critical"];
const likelihoodLabels = ["Rare", "Unlikely", "Possible", "Likely", "Almost Certain"];

const getCellColor = (impact: number, likelihood: number) => {
  const score = impact * likelihood;
  if (score >= 15) return "bg-destructive/80 hover:bg-destructive";
  if (score >= 10) return "bg-orange-500/80 hover:bg-orange-500";
  if (score >= 5) return "bg-warning/80 hover:bg-warning";
  return "bg-success/80 hover:bg-success";
};

const getScoreColor = (score: number) => {
  if (score >= 70) return "text-destructive";
  if (score >= 50) return "text-orange-500";
  if (score >= 30) return "text-warning";
  return "text-success";
};

const RiskAssessment = () => {
  const [selectedCell, setSelectedCell] = useState<{ impact: number; likelihood: number } | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<typeof mockRisks[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [treatmentFilter, setTreatmentFilter] = useState("all");

  const heatmapData = generateHeatmapData();

  const filteredRisks = mockRisks.filter((risk) => {
    const matchesSearch = risk.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      risk.asset.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTreatment = treatmentFilter === "all" || risk.treatment === treatmentFilter;
    const matchesCell = !selectedCell || (risk.impact === selectedCell.impact && risk.likelihood === selectedCell.likelihood);
    return matchesSearch && matchesTreatment && matchesCell;
  });

  const totalRisks = mockRisks.length;
  const acceptedRisks = mockRisks.filter((r) => r.treatment === "Accept").length;
  const actionRequired = mockRisks.filter((r) => r.status === "Open" && r.riskScore >= 60).length;
  const avgRiskScore = Math.round(mockRisks.reduce((sum, r) => sum + r.riskScore, 0) / totalRisks);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Risk Assessment</h1>
            <p className="text-muted-foreground">Interactive risk heatmap and AI-powered insights</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Risk
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Risks</CardTitle>
              <Target className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalRisks}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all systems</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Risks Accepted</CardTitle>
              <CheckCircle2 className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{acceptedRisks}</div>
              <p className="text-xs text-muted-foreground mt-1">With formal approval</p>
            </CardContent>
          </Card>

          <Card className={cn("glass-card", actionRequired > 0 && "border-destructive/50")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Requires Action</CardTitle>
              <AlertTriangle className={cn("h-5 w-5", actionRequired > 0 ? "text-destructive animate-pulse" : "text-muted-foreground")} />
            </CardHeader>
            <CardContent>
              <div className={cn("text-3xl font-bold", actionRequired > 0 && "text-destructive")}>{actionRequired}</div>
              <p className="text-xs text-muted-foreground mt-1">High priority risks</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
              <Zap className={cn("h-5 w-5", getScoreColor(avgRiskScore))} />
            </CardHeader>
            <CardContent>
              <div className={cn("text-3xl font-bold", getScoreColor(avgRiskScore))}>{avgRiskScore}</div>
              <p className="text-xs text-muted-foreground mt-1">0-100 scale</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Heatmap Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Risk Heatmap</CardTitle>
                  {selectedCell && (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCell(null)}>
                      Clear filter
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-around pr-2 text-xs text-muted-foreground">
                    {[...impactLabels].reverse().map((label) => (
                      <span key={label} className="h-14 flex items-center justify-end">{label}</span>
                    ))}
                  </div>
                  
                  {/* Heatmap Grid */}
                  <div className="flex-1">
                    <div className="grid grid-cols-5 gap-1">
                      {heatmapData.flat().map((cell, idx) => (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                            <button
                              className={cn(
                                "h-14 rounded-md flex items-center justify-center text-sm font-bold transition-all",
                                getCellColor(cell.impact, cell.likelihood),
                                cell.count > 0 && "text-white",
                                selectedCell?.impact === cell.impact && selectedCell?.likelihood === cell.likelihood && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                              )}
                              onClick={() => cell.count > 0 && setSelectedCell({ impact: cell.impact, likelihood: cell.likelihood })}
                            >
                              {cell.count > 0 ? cell.count : ""}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Impact: {impactLabels[cell.impact - 1]}</p>
                            <p>Likelihood: {likelihoodLabels[cell.likelihood - 1]}</p>
                            <p>{cell.count} risk(s)</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                    {/* X-axis labels */}
                    <div className="grid grid-cols-5 gap-1 mt-2">
                      {likelihoodLabels.map((label) => (
                        <span key={label} className="text-xs text-muted-foreground text-center">{label}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border">
                  <span className="text-sm font-medium">Legend:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-success" />
                    <span className="text-xs">Low (Accept)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-warning" />
                    <span className="text-xs">Medium (Monitor)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-orange-500" />
                    <span className="text-xs">High (Action)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-destructive" />
                    <span className="text-xs">Critical (Immediate)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search risks..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Treatment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Treatments</SelectItem>
                  <SelectItem value="Accept">Accept</SelectItem>
                  <SelectItem value="Mitigate">Mitigate</SelectItem>
                  <SelectItem value="Transfer">Transfer</SelectItem>
                  <SelectItem value="Avoid">Avoid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Risk Register Table */}
            <Card className="glass-card">
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Risk ID</TableHead>
                      <TableHead className="max-w-[200px]">Description</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead className="text-center">Impact</TableHead>
                      <TableHead className="text-center">Likelihood</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead>Treatment</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRisks.map((risk) => (
                      <TableRow
                        key={risk.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => {
                          setSelectedRisk(risk);
                          setDetailOpen(true);
                        }}
                      >
                        <TableCell className="font-mono font-medium">{risk.id}</TableCell>
                        <TableCell className="max-w-[200px]">
                          <Tooltip>
                            <TooltipTrigger className="text-left truncate block">
                              {risk.description.substring(0, 50)}...
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              {risk.description}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell>{risk.asset}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={cn(
                            risk.impact >= 4 && "border-destructive text-destructive",
                            risk.impact === 3 && "border-warning text-warning"
                          )}>
                            {risk.impact}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={cn(
                            risk.likelihood >= 4 && "border-destructive text-destructive",
                            risk.likelihood === 3 && "border-warning text-warning"
                          )}>
                            {risk.likelihood}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={cn("font-bold", getScoreColor(risk.riskScore))}>
                            {risk.riskScore}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{risk.treatment}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{risk.owner.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{risk.owner.name.split(" ")[0]}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={risk.status === "Closed" ? "default" : risk.status === "In Progress" ? "secondary" : "outline"}>
                            {risk.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Risk</DropdownMenuItem>
                              <DropdownMenuItem>Accept Risk</DropdownMenuItem>
                              <DropdownMenuItem>Create Remediation Plan</DropdownMenuItem>
                              <DropdownMenuItem>Escalate</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </Card>
          </div>

          {/* AI Insights Panel */}
          <div className="space-y-6">
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Risk Predictions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.predictions.map((pred, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-muted/30 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">{pred.risk}</p>
                      <Badge variant="outline" className="shrink-0">
                        {pred.confidence}%
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: `${pred.confidence}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-warning" />
                  Risks Trending Up
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiInsights.trendingUp.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm">{item.name}</span>
                    <div className="flex items-center gap-1 text-warning">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.change}</span>
                    </div>
                  </div>
                ))}
                <div className="h-24 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="hsl(var(--warning))"
                        fill="url(#trendGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-info/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-info" />
                  Risk Correlations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiInsights.correlations.map((corr, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-info/10 border border-info/20">
                    <p className="text-sm">{corr}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Risk Detail Dialog */}
        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedRisk?.id}
                <Badge className={cn(
                  selectedRisk?.riskScore && selectedRisk.riskScore >= 70 && "bg-destructive",
                  selectedRisk?.riskScore && selectedRisk.riskScore >= 50 && selectedRisk.riskScore < 70 && "bg-orange-500",
                  selectedRisk?.riskScore && selectedRisk.riskScore < 50 && "bg-success"
                )}>
                  Score: {selectedRisk?.riskScore}
                </Badge>
              </DialogTitle>
              <DialogDescription>{selectedRisk?.description}</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details" className="mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="controls">Controls</TabsTrigger>
                <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Asset/System</p>
                    <p className="font-medium">{selectedRisk?.asset}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Risk Owner</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{selectedRisk?.owner.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <span>{selectedRisk?.owner.name}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Control Effectiveness</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${selectedRisk?.controlEffectiveness}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{selectedRisk?.controlEffectiveness}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Treatment Strategy</p>
                    <Badge variant="secondary">{selectedRisk?.treatment}</Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Detailed Analysis</p>
                  <p className="text-sm">{selectedRisk?.details}</p>
                </div>

                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm font-medium text-destructive mb-1">Business Impact</p>
                  <p className="text-sm">{selectedRisk?.businessImpact}</p>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-4">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <AlertTriangle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Risk Identified</p>
                      <p className="text-xs text-muted-foreground">Jan 10, 2024 - System scan detected vulnerability</p>
                    </div>
                  </div>
                  <div className="ml-4 h-8 border-l-2 border-dashed border-muted" />
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-info/20 flex items-center justify-center shrink-0">
                      <Shield className="h-4 w-4 text-info" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Assessment Completed</p>
                      <p className="text-xs text-muted-foreground">Jan 12, 2024 - Risk scored and categorized</p>
                    </div>
                  </div>
                  <div className="ml-4 h-8 border-l-2 border-dashed border-muted" />
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
                      <Target className="h-4 w-4 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Mitigation Assigned</p>
                      <p className="text-xs text-muted-foreground">Jan 14, 2024 - Remediation plan created</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="controls" className="mt-4">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Related Controls</p>
                  {selectedRisk?.relatedControls.map((control) => (
                    <div key={control} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <span className="font-mono">{control}</span>
                      <Button variant="ghost" size="sm">View Control</Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="mt-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <span className="font-medium">AI Recommendation</span>
                    </div>
                    <p className="text-sm mb-3">
                      Based on similar risk patterns in your industry, we recommend implementing multi-factor
                      authentication and enhanced logging. Estimated risk reduction: 45%.
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Est. Cost:</span>
                        <span className="ml-1 font-medium">$25,000</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeline:</span>
                        <span className="ml-1 font-medium">4-6 weeks</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ROI:</span>
                        <span className="ml-1 font-medium text-success">High</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Separator />

            <div className="flex gap-2 justify-end">
              <Button variant="outline">Accept Risk</Button>
              <Button variant="outline">Create Remediation Plan</Button>
              <Button>Escalate</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default RiskAssessment;
