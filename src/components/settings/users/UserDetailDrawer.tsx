
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, Key, History, LogOut } from "lucide-react";

interface UserDetailDrawerProps {
    user: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const UserDetailDrawer = ({ user, open, onOpenChange }: UserDetailDrawerProps) => {
    if (!user) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader className="mb-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                            <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <SheetTitle className="text-2xl">{user.name}</SheetTitle>
                            <SheetDescription>{user.email}</SheetDescription>
                            <div className="flex gap-2 mt-2">
                                <Badge variant="outline">{user.role}</Badge>
                                <Badge className={user.status === 'Active' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'}>{user.status}</Badge>
                            </div>
                        </div>
                    </div>
                </SheetHeader>

                <div className="space-y-6">
                    {/* Access & Permissions */}
                    <section>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Shield className="w-4 h-4" /> Role & Permissions
                        </h3>
                        <Card>
                            <CardContent className="p-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-muted-foreground mb-1">Role Level</div>
                                        <div className="font-medium">{user.role}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground mb-1">Access Scope</div>
                                        <div className="font-medium">Global</div>
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <div className="text-muted-foreground mb-2 text-sm">Assigned Frameworks</div>
                                    <div className="flex flex-wrap gap-2">
                                        {user.frameworks.map((fw: string) => (
                                            <Badge key={fw} variant="secondary">{fw}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Security Settings */}
                    <section>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Key className="w-4 h-4" /> Security
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label className="text-base">MFA Enabled</Label>
                                    <p className="text-sm text-muted-foreground">Require 2FA for login</p>
                                </div>
                                <Switch checked={true} />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label className="text-base">API Access</Label>
                                    <p className="text-sm text-muted-foreground">Allow generating API tokens</p>
                                </div>
                                <Switch checked={user.role !== 'Viewer'} disabled={user.role === 'Viewer'} />
                            </div>
                            <Button variant="outline" className="w-full">Reset Password</Button>
                        </div>
                    </section>

                    {/* Activity Log */}
                    <section>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <History className="w-4 h-4" /> Recent Activity
                        </h3>
                        <div className="border rounded-lg divide-y">
                            {[
                                { action: "Logged in", time: "2 hours ago", ip: "192.168.1.1" },
                                { action: "Updated SOC 2 Control", time: "5 hours ago", ip: "192.168.1.1" },
                                { action: "Exported Report", time: "Yesterday", ip: "192.168.1.1" },
                            ].map((log, i) => (
                                <div key={i} className="p-3 text-sm flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">{log.action}</div>
                                        <div className="text-xs text-muted-foreground">{log.time}</div>
                                    </div>
                                    <div className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">{log.ip}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <SheetFooter className="mt-8">
                    <Button variant="destructive" className="w-full sm:w-auto gap-2">
                        <LogOut className="w-4 h-4" /> Deactivate User
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
