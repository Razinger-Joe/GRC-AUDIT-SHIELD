
import React, { useEffect, useState } from 'react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { SearchResults } from "./SearchResults";
import { AdvancedSearchModal } from "./AdvancedSearchModal";
import { AIAssistantChat } from "../ai/AIAssistantChat";
import { Calculator, Calendar, CreditCard, Settings, Smile, User, Search, FileText, Shield, AlertTriangle, Bug, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const GlobalSearch = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const handleSelect = (value: string) => {
        console.log("Selected:", value);
        setOpen(false);
        // Navigate or perform action
    };

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <div className="flex items-center border-b px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <CommandInput
                    placeholder="Search controls, risks, vulnerabilities... or ask a question"
                    value={query}
                    onValueChange={setQuery}
                    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <CommandList className="max-h-[500px]">
                <CommandEmpty>No results found.</CommandEmpty>

                {!query && (
                    <>
                        <CommandGroup heading="Recent Searches">
                            <CommandItem onSelect={() => handleSelect("report-q4")}>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Q4 Compliance Report</span>
                                <CommandShortcut>2m ago</CommandShortcut>
                            </CommandItem>
                            <CommandItem onSelect={() => handleSelect("vuln-log4j")}>
                                <Bug className="mr-2 h-4 w-4" />
                                <span>Log4j Vulnerabilities</span>
                                <CommandShortcut>1h ago</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Suggestions">
                            <CommandItem onSelect={() => handleSelect("settings")}>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>System Settings</span>
                            </CommandItem>
                            <CommandItem onSelect={() => handleSelect("users")}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Manage Users</span>
                            </CommandItem>
                        </CommandGroup>
                    </>
                )}

                {query && (
                    <SearchResults query={query} onSelect={handleSelect} />
                )}

                <CommandSeparator />

                <CommandGroup heading="Advanced">
                    <CommandItem onSelect={() => handleSelect("advanced-search")} className="text-primary">
                        <Search className="mr-2 h-4 w-4" />
                        <span>Advanced Search...</span>
                        <CommandShortcut>Shift+Enter</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => handleSelect("ask-ai")} className="text-purple-500">
                        <SparklesIcon className="mr-2 h-4 w-4" />
                        <span>Ask AI Assistant</span>
                        <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700 border-purple-200">New</Badge>
                    </CommandItem>
                </CommandGroup>
            </CommandList>

            <div className="border-t p-2 text-xs text-muted-foreground flex justify-between px-4 bg-muted/20">
                <div className="flex gap-2">
                    <span><strong>↑↓</strong> to navigate</span>
                    <span><strong>↵</strong> to select</span>
                    <span><strong>esc</strong> to close</span>
                </div>
                <div>
                    <strong>Cmd+K</strong>
                </div>
            </div>
        </CommandDialog>
    );
};

const SparklesIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
);
