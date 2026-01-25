
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Shield, Mail, Search, Filter } from "lucide-react";
import { InviteUserDialog } from "./InviteUserDialog";
import { UserDetailDrawer } from "./UserDetailDrawer";

// Mock Data
const INITAL_USERS = [
    { id: 1, name: "Alice Johnson", email: "alice@company.com", role: "Super Admin", frameworks: ["All"], lastActive: "2 min ago", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@company.com", role: "Compliance Manager", frameworks: ["SOC 2", "ISO 27001"], lastActive: "1 hour ago", status: "Active" },
    { id: 3, name: "Charlie Brown", email: "charlie@auditor.com", role: "Auditor", frameworks: ["SOC 2"], lastActive: "2 days ago", status: "Invited" },
    { id: 4, name: "Diana Prince", email: "diana@company.com", role: "Risk Manager", frameworks: ["NIST CSF"], lastActive: "5 hours ago", status: "Active" },
    { id: 5, name: "Evan Wright", email: "evan@company.com", role: "Viewer", frameworks: ["None"], lastActive: "Never", status: "Inactive" },
];

export const UserManagementTab = () => {
    const [users, setUsers] = useState(INITAL_USERS);
    const [searchTerm, setSearchTerm] = useState("");
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInvite = (newUser: any) => {
        setUsers([...users, { ...newUser, id: users.length + 1, lastActive: "Just now", status: "Invited" }]);
        setIsInviteOpen(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 flex-1 max-w-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
                </div>
                <Button className="gap-2" onClick={() => setIsInviteOpen(true)}>
                    <Plus className="w-4 h-4" /> Invite User
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Users & Permissions</CardTitle>
                    <CardDescription>Manage user access, roles, and assigned frameworks.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Assigned Frameworks</TableHead>
                                <TableHead>Last Active</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedUser(user)}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-xs text-muted-foreground">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="gap-1">
                                            <Shield className="w-3 h-3" />
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {user.frameworks.map((fw, i) => (
                                                <Badge key={i} variant="secondary" className="text-xs">{fw}</Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">{user.lastActive}</TableCell>
                                    <TableCell>
                                        <Badge className={
                                            user.status === 'Active' ? 'bg-green-500/15 text-green-700 hover:bg-green-500/25' :
                                                user.status === 'Invited' ? 'bg-blue-500/15 text-blue-700 hover:bg-blue-500/25' :
                                                    'bg-gray-500/15 text-gray-700 hover:bg-gray-500/25'
                                        }>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => setSelectedUser(user)}>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Edit Role</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <InviteUserDialog open={isInviteOpen} onOpenChange={setIsInviteOpen} onInvite={handleInvite} />

            {selectedUser && (
                <UserDetailDrawer
                    user={selectedUser}
                    open={!!selectedUser}
                    onOpenChange={(open) => !open && setSelectedUser(null)}
                />
            )}
        </div>
    );
};
