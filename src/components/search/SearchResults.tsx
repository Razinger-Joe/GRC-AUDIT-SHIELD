
import React from 'react';
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Bug, FileText, User, ChevronRight } from "lucide-react";

interface SearchResultsProps {
    query: string;
    onSelect: (value: string) => void;
}

// Mock Search Data
const MOCK_RESULTS = [
    { id: 'c1', type: 'Control', title: 'Access Control Policy', path: 'SOC 2 > CC6.1', status: 'Pass' },
    { id: 'c2', type: 'Control', title: 'Data Encryption Standard', path: 'ISO 27001 > A.10', status: 'Fail' },
    { id: 'r1', type: 'Risk', title: 'Cloud Data Leakage', path: 'Risk Register > Operational', score: 'High' },
    { id: 'v1', type: 'Vuln', title: 'CVE-2023-4863', path: 'Heap buffer overflow in libwebp', severity: 'Critical' },
    { id: 'p1', type: 'Person', title: 'Alice Johnson', path: 'Compliance Manager', status: 'Online' },
    { id: 'd1', type: 'Report', title: 'Q3 Security Audit', path: 'Generated Oct 15', format: 'PDF' },
];

export const SearchResults = ({ query, onSelect }: SearchResultsProps) => {
    // Simple filter for mock
    const results = MOCK_RESULTS.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.path.toLowerCase().includes(query.toLowerCase())
    );

    const controls = results.filter(r => r.type === 'Control');
    const risks = results.filter(r => r.type === 'Risk');
    const vulns = results.filter(r => r.type === 'Vuln');
    const people = results.filter(r => r.type === 'Person');
    const others = results.filter(r => !['Control', 'Risk', 'Vuln', 'Person'].includes(r.type));

    return (
        <>
            {controls.length > 0 && (
                <CommandGroup heading="Controls">
                    {controls.map(item => (
                        <CommandItem key={item.id} onSelect={() => onSelect(item.id)} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Shield className="mr-2 h-4 w-4 text-emerald-500" />
                                <div className="flex flex-col">
                                    <span>{item.title}</span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        {item.path}
                                    </span>
                                </div>
                            </div>
                            <Badge variant={item.status === 'Pass' ? 'outline' : 'destructive'} className="ml-2 text-[10px] h-5">
                                {item.status}
                            </Badge>
                        </CommandItem>
                    ))}
                </CommandGroup>
            )}

            {risks.length > 0 && (
                <CommandGroup heading="Risks">
                    {risks.map(item => (
                        <CommandItem key={item.id} onSelect={() => onSelect(item.id)} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" />
                                <div className="flex flex-col">
                                    <span>{item.title}</span>
                                    <span className="text-xs text-muted-foreground">{item.path}</span>
                                </div>
                            </div>
                            <Badge variant="secondary" className="ml-2 text-[10px] h-5 bg-orange-100 text-orange-700 hover:bg-orange-200">
                                {item.score}
                            </Badge>
                        </CommandItem>
                    ))}
                </CommandGroup>
            )}

            {vulns.length > 0 && (
                <CommandGroup heading="Vulnerabilities">
                    {vulns.map(item => (
                        <CommandItem key={item.id} onSelect={() => onSelect(item.id)} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Bug className="mr-2 h-4 w-4 text-red-500" />
                                <div className="flex flex-col">
                                    <span>{item.title}</span>
                                    <span className="text-xs text-muted-foreground">{item.path}</span>
                                </div>
                            </div>
                            <Badge variant="destructive" className="ml-2 text-[10px] h-5">
                                {item.severity}
                            </Badge>
                        </CommandItem>
                    ))}
                </CommandGroup>
            )}

            {people.length > 0 && (
                <CommandGroup heading="People">
                    {people.map(item => (
                        <CommandItem key={item.id} onSelect={() => onSelect(item.id)} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <User className="mr-2 h-4 w-4 text-blue-500" />
                                <div className="flex flex-col">
                                    <span>{item.title}</span>
                                    <span className="text-xs text-muted-foreground">{item.path}</span>
                                </div>
                            </div>
                            {item.status === 'Online' && (
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                            )}
                        </CommandItem>
                    ))}
                </CommandGroup>
            )}

            {others.length > 0 && (
                <CommandGroup heading="Other">
                    {others.map(item => (
                        <CommandItem key={item.id} onSelect={() => onSelect(item.id)}>
                            <FileText className="mr-2 h-4 w-4 text-slate-500" />
                            <span>{item.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            )}
        </>
    );
};
