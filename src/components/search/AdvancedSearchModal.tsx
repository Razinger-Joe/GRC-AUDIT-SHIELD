
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Search, Save, Filter } from "lucide-react";

interface AdvancedSearchModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const AdvancedSearchModal = ({ open, onOpenChange }: AdvancedSearchModalProps) => {
    const [date, setDate] = useState<Date>();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Advanced Search</DialogTitle>
                    <DialogDescription>
                        Construct complex queries to find specific entities across the platform.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                    {/* Filter Sidebar */}
                    <div className="space-y-4 border-r pr-4">
                        <div className="space-y-2">
                            <Label>Entity Type</Label>
                            <div className="space-y-2">
                                {['Controls', 'Risks', 'Vulnerabilities', 'Evidence', 'Users'].map(type => (
                                    <div key={type} className="flex items-center space-x-2">
                                        <Checkbox id={type} />
                                        <Label htmlFor={type} className="font-normal cursor-pointer">{type}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Any Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active / Passing</SelectItem>
                                    <SelectItem value="warning">Warning</SelectItem>
                                    <SelectItem value="failed">Failed / Critical</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="space-y-2">
                            <Label>Keywords</Label>
                            <Input placeholder="Enter search terms..." />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Owner</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select User" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="alice">Alice Johnson</SelectItem>
                                        <SelectItem value="bob">Bob Smith</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Framework</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="All Frameworks" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="soc2">SOC 2</SelectItem>
                                        <SelectItem value="iso">ISO 27001</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Date Range (Last Modified)</Label>
                            <div className="flex items-center gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <div className="pt-4 flex items-center gap-2">
                            <Button variant="outline" className="gap-2 w-full"><Save className="w-4 h-4" /> Save Search</Button>
                            <Button className="gap-2 w-full"><Search className="w-4 h-4" /> Search</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
