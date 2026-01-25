
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface InviteUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onInvite: (user: any) => void;
}

export const InviteUserDialog = ({ open, onOpenChange, onInvite }: InviteUserDialogProps) => {
    const [formData, setFormData] = useState({
        email: "",
        role: "Viewer",
        frameworks: [] as string[],
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Extract name from email for mock
        const name = formData.email.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase());

        onInvite({
            name,
            email: formData.email,
            role: formData.role,
            frameworks: formData.frameworks.length > 0 ? formData.frameworks : ["None"],
        });

        setFormData({ email: "", role: "Viewer", frameworks: [], message: "" });
    };

    const toggleFramework = (fw: string) => {
        setFormData(prev => ({
            ...prev,
            frameworks: prev.frameworks.includes(fw)
                ? prev.frameworks.filter(f => f !== fw)
                : [...prev.frameworks, fw]
        }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Invite New User</DialogTitle>
                    <DialogDescription>
                        Send an invitation to join the platform. They will receive an email with setup instructions.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address(es)</Label>
                        <Input
                            id="email"
                            placeholder="colleague@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={formData.role} onValueChange={(val) => setFormData({ ...formData, role: val })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Super Admin">Super Admin</SelectItem>
                                <SelectItem value="Compliance Manager">Compliance Manager</SelectItem>
                                <SelectItem value="Auditor">Auditor</SelectItem>
                                <SelectItem value="Risk Manager">Risk Manager</SelectItem>
                                <SelectItem value="Security Analyst">Security Analyst</SelectItem>
                                <SelectItem value="Viewer">Viewer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Assign Frameworks</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "NIST CSF"].map(fw => (
                                <div key={fw} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={fw}
                                        checked={formData.frameworks.includes(fw)}
                                        onCheckedChange={() => toggleFramework(fw)}
                                    />
                                    <Label htmlFor={fw} className="font-normal cursor-pointer">{fw}</Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Welcome Message (Optional)</Label>
                        <Textarea
                            id="message"
                            placeholder="Welcome to the team!"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit">Send Invitation</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
