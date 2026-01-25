
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export const QuickActions = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
                <Button className="gap-2"><FileText className="w-4 h-4" /> Generate Compliance Report</Button>
                <Button variant="outline" className="gap-2"><Shield className="w-4 h-4" /> Executive Summary</Button>
                <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /> Custom Report</Button>
            </div>
            <div className="flex gap-2 items-center">
                <Select defaultValue="30days">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7days">Last 7 Days</SelectItem>
                        <SelectItem value="30days">Last 30 Days</SelectItem>
                        <SelectItem value="quarter">Last Quarter</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Frameworks" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Frameworks</SelectItem>
                        <SelectItem value="soc2">SOC 2</SelectItem>
                        <SelectItem value="iso27001">ISO 27001</SelectItem>
                        <SelectItem value="pci">PCI DSS</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
