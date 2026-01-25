
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export const ReportTemplates = () => {
    const templates = [
        { title: "SOC 2 Readiness", desc: "Assessment of SOC 2 Type II controls", generated: 127 },
        { title: "Executive Risk", desc: "C-level summary of risk posture", generated: 85 },
        { title: "Vulnerability Mgmt", desc: "Overview of system vulnerabilities", generated: 210 },
        { title: "ITGC Results", desc: "IT General Controls testing outcome", generated: 54 },
    ];

    return (
        <section>
            <h2 className="text-xl font-bold mb-4">Report Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {templates.map((template, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer group">
                        <CardHeader className="pb-2">
                            <div className="w-full h-24 bg-muted/50 rounded-md mb-2 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                                <FileText className="w-8 h-8 text-primary/40 group-hover:text-primary" />
                            </div>
                            <CardTitle className="text-lg">{template.title}</CardTitle>
                            <CardDescription className="text-xs">{template.desc}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                                <span>Generated {template.generated} times</span>
                                <div className="flex text-yellow-500">★★★★★</div>
                            </div>
                            <Button size="sm" className="w-full">Generate</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
