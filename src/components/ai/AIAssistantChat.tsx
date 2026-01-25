
import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Send, User, Sparkles, X, Paperclip, ThumbsUp, ThumbsDown, Mic, BarChart as ChartIcon, Table as TableIcon, Settings, MoreHorizontal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Message {
    id: number;
    role: 'user' | 'assistant' | 'system';
    type: 'text' | 'chart' | 'table' | 'action';
    content: string;
    data?: any;
    timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: 1,
        role: 'assistant',
        type: 'text',
        content: "Hello! I'm your GRC Assistant. I can analyze risk trends, summarize compliance status, or help you find specific controls. Try asking 'Show me critical vulnerabilities' or 'Analyze our risk trends'.",
        timestamp: new Date()
    }
];

export const AIAssistantChat = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleSend = (text: string = input) => {
        if (!text.trim()) return;

        const newMsg: Message = { id: Date.now(), role: 'user', type: 'text', content: text, timestamp: new Date() };
        setMessages(prev => [...prev, newMsg]);
        setInput("");
        setIsTyping(true);

        // Mock Intelligence Engine
        setTimeout(() => {
            let responseMsg: Message;
            const lowerText = text.toLowerCase();

            if (lowerText.includes("vulnerab") || lowerText.includes("critical")) {
                responseMsg = {
                    id: Date.now() + 1,
                    role: 'assistant',
                    type: 'table',
                    content: "I found 3 critical vulnerabilities that require immediate attention. Here is the summary:",
                    data: [
                        { id: "CVE-2024-1234", system: "Production DB", severity: "Critical", status: "Open" },
                        { id: "CVE-2023-9876", system: "Web Gateway", severity: "Critical", status: "Investigating" },
                        { id: "CVE-2024-5555", system: "Auth Service", severity: "Critical", status: "Open" }
                    ],
                    timestamp: new Date()
                };
            } else if (lowerText.includes("risk") || lowerText.includes("trend")) {
                responseMsg = {
                    id: Date.now() + 1,
                    role: 'assistant',
                    type: 'chart',
                    content: "Here is the risk velocity trend for the last 7 days. We see a spike on Tuesday due to the new CVE detection.",
                    data: [
                        { name: 'Mon', value: 12 }, { name: 'Tue', value: 45 }, { name: 'Wed', value: 32 },
                        { name: 'Thu', value: 28 }, { name: 'Fri', value: 25 }, { name: 'Sat', value: 20 }, { name: 'Sun', value: 18 }
                    ],
                    timestamp: new Date()
                };
            } else if (lowerText.includes("compliance") || lowerText.includes("score")) {
                responseMsg = {
                    id: Date.now() + 1,
                    role: 'assistant',
                    type: 'text',
                    content: "Your current SOC 2 compliance score is **92%**. You are passing 61/64 controls. The 3 failing controls are related to Disaster Recovery testing.",
                    timestamp: new Date()
                };
            } else {
                responseMsg = {
                    id: Date.now() + 1,
                    role: 'assistant',
                    type: 'text',
                    content: "I'm not sure specifically about that, but I can help with Risks, Controls, and Vulnerabilities. Try asking to 'Summarize failing controls'.",
                    timestamp: new Date()
                };
            }

            setIsTyping(false);
            setMessages(prev => [...prev, responseMsg]);
        }, 1500);
    };

    const handleQuickAction = (action: string) => {
        handleSend(action);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[500px] flex flex-col p-0">
                <SheetHeader className="px-6 py-4 border-b bg-muted/20 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full relative">
                            <Bot className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-950 rounded-full"></div>
                        </div>
                        <div>
                            <SheetTitle className="text-base">GRC Assistant</SheetTitle>
                            <SheetDescription className="text-xs">Online • v2.4.0</SheetDescription>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Settings className="w-4 h-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Assistant Settings</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Clear History</DropdownMenuItem>
                                <DropdownMenuItem>Response Verbosity</DropdownMenuItem>
                                <DropdownMenuItem>Export Chat</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-hidden relative bg-slate-50 dark:bg-slate-950">
                    <ScrollArea className="h-full p-4">
                        <div className="space-y-6 pb-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <Avatar className="w-8 h-8 mt-1">
                                        {msg.role === 'assistant' ? (
                                            <div className="w-full h-full bg-purple-600 flex items-center justify-center">
                                                <Bot className="w-5 h-5 text-white" />
                                            </div>
                                        ) : (
                                            <AvatarFallback className="bg-blue-600 text-white">ME</AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div className={`space-y-2 max-w-[85%]`}>
                                        <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-sm'
                                            : 'bg-white dark:bg-slate-900 border rounded-tl-sm'
                                            }`}>
                                            {/* RICH CONTENT RENDERING */}
                                            <div className="prose prose-sm dark:prose-invert max-w-none mb-2">
                                                {msg.content}
                                            </div>

                                            {msg.type === 'chart' && msg.data && (
                                                <Card className="p-2 border-none shadow-none bg-slate-50 dark:bg-slate-800">
                                                    <div className="h-[150px] w-full">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <BarChart data={msg.data}>
                                                                <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                                                                <Tooltip contentStyle={{ fontSize: '12px' }} />
                                                                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </Card>
                                            )}

                                            {msg.type === 'table' && msg.data && (
                                                <div className="rounded-md border bg-slate-50 dark:bg-slate-800 overflow-hidden text-xs">
                                                    <table className="w-full">
                                                        <thead className="bg-slate-100 dark:bg-slate-900 border-b">
                                                            <tr>
                                                                <th className="p-2 text-left font-medium">ID</th>
                                                                <th className="p-2 text-left font-medium">System</th>
                                                                <th className="p-2 text-left font-medium">Severity</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {msg.data.map((row: any, i: number) => (
                                                                <tr key={i} className="border-b last:border-0 hover:bg-black/5 dark:hover:bg-white/5">
                                                                    <td className="p-2 font-mono">{row.id}</td>
                                                                    <td className="p-2">{row.system}</td>
                                                                    <td className="p-2 text-red-500 font-medium">{row.severity}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </div>

                                        {msg.role === 'assistant' && (
                                            <div className="flex gap-2 justify-start opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400 hover:text-slate-600"><ThumbsUp className="w-3 h-3" /></Button>
                                                <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400 hover:text-slate-600"><ThumbsDown className="w-3 h-3" /></Button>
                                            </div>
                                        )}
                                        <div className="text-[10px] text-muted-foreground px-1 flex justify-between">
                                            <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 border shadow-sm p-4 rounded-2xl rounded-tl-sm w-16 flex items-center justify-center gap-1">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>
                </div>

                <div className="p-4 border-t bg-background">
                    {messages.length < 3 && (
                        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                            <Button variant="outline" size="sm" className="whitespace-nowrap text-xs rounded-full border-purple-200 hover:bg-purple-50 hover:text-purple-700" onClick={() => handleQuickAction("Show me critical vulnerabilities")}>
                                <Sparkles className="w-3 h-3 mr-1 text-purple-500" /> Critical Vulns
                            </Button>
                            <Button variant="outline" size="sm" className="whitespace-nowrap text-xs rounded-full border-purple-200 hover:bg-purple-50 hover:text-purple-700" onClick={() => handleQuickAction("Analyze risk trends")}>
                                <ChartIcon className="w-3 h-3 mr-1 text-purple-500" /> Risk Trends
                            </Button>
                            <Button variant="outline" size="sm" className="whitespace-nowrap text-xs rounded-full border-purple-200 hover:bg-purple-50 hover:text-purple-700" onClick={() => handleQuickAction("What is my compliance score?")}>
                                <Sparkles className="w-3 h-3 mr-1 text-purple-500" /> Compliance Score
                            </Button>
                        </div>
                    )}
                    <div className="flex gap-2 items-end">
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-10 w-8 text-muted-foreground hover:bg-muted" title="Upload File">
                                <Paperclip className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-10 w-8 text-muted-foreground hover:bg-muted" title="Voice Input">
                                <Mic className="w-5 h-5" />
                            </Button>
                        </div>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about risks, controls, or compliance..."
                            className="bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-purple-500 min-h-[40px]"
                        />
                        <Button size="icon" onClick={() => handleSend()} disabled={!input.trim() || isTyping} className="bg-purple-600 hover:bg-purple-700 h-10 w-10 shrink-0" aria-label="Send message">
                            <Send className="w-5 h-5" />
                        </Button>
                    </div>
                    <div className="text-[10px] text-center text-muted-foreground mt-2">
                        AI can make mistakes. Please verify critical information.
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
