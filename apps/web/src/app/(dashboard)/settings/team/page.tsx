"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getTeamMembers, transformTeamMemberData } from "@/api/teams.api";
import { 
  AlertCircle,
  Mail, 
  Plus, 
  RefreshCw,
  Search, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Sliders, 
  Trash2, 
  UserCog, 
  UserPlus 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for team roles - this would also be replaced with real data in a full implementation
const mockRoles = [
  {
    id: "role1",
    name: "Admin",
    description: "Full access to all settings and features",
    permissions: ["manage_team", "manage_settings", "manage_data", "view_data"],
    memberCount: 1,
  },
  {
    id: "role2",
    name: "Member",
    description: "Can view and interact with all data",
    permissions: ["view_data", "interact_data"],
    memberCount: 2,
  },
  {
    id: "role3",
    name: "Viewer",
    description: "Read-only access to dashboards",
    permissions: ["view_data"],
    memberCount: 1,
  },
];

// Function to get role icon
function getRoleIcon(role: string) {
  switch (role.toLowerCase()) {
    case "admin":
      return <ShieldAlert className="size-4 text-red-500" />;
    case "member":
      return <Shield className="size-4 text-blue-500" />;
    case "viewer":
      return <ShieldCheck className="size-4 text-green-500" />;
    default:
      return <Shield className="size-4" />;
  }
}

export default function TeamSettingsPage() {
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Temporary hardcoded team ID - in a real app this would come from auth context or similar
  const teamId = "team_1";
  
  // Fetch team members from API
  const { data: apiTeamMembers, isLoading, error } = useQuery({
    queryKey: ['team-members', teamId],
    queryFn: () => getTeamMembers(teamId),
  });
  
  // Transform API data to our UI format
  const teamMembers = apiTeamMembers ? transformTeamMemberData(apiTeamMembers) : [];
  
  // Filter team members based on search query and role filter
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      searchQuery === "" || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesRole = 
      roleFilter === "all" || 
      member.role.toLowerCase() === roleFilter.toLowerCase();
      
    return matchesSearch && matchesRole;
  });
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="size-10 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading team members...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="size-10 mx-auto mb-4 text-destructive" />
          <p className="text-muted-foreground">Error loading team members</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Settings</h1>
        <p className="text-muted-foreground">
          Manage team members, roles, and permissions
        </p>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="settings">Team Settings</TabsTrigger>
        </TabsList>

        {/* Team Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                <Button size="sm">
                  <UserPlus className="size-4 mr-2" />
                  <span>Invite Member</span>
                </Button>
              </div>
              <CardDescription>
                Manage who has access to Astralith and what role they have
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search members..." 
                    className="pl-9" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select 
                  value={roleFilter}
                  onValueChange={setRoleFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        {teamMembers.length === 0 
                          ? "No team members found." 
                          : "No results match your search criteria."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={member.avatarUrl} alt={member.name} />
                              <AvatarFallback>
                                {member.name
                                  .split(' ')
                                  .slice(0, 2)
                                  .map((part: string) => part.charAt(0))
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">{member.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getRoleIcon(member.role)}
                            <span>{member.role}</span>
                          </div>
                        </TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>
                          {member.status === "active" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">Invited</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Mail className="size-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <UserCog className="size-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions Tab */}
        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Roles & Permissions</CardTitle>
                <Button size="sm">
                  <Plus className="size-4 mr-2" />
                  <span>Create Role</span>
                </Button>
              </div>
              <CardDescription>
                Configure access levels and permissions for team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockRoles.map((role) => (
                  <Card key={role.id} className="border shadow-none">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {getRoleIcon(role.name)}
                            <CardTitle className="text-base">{role.name}</CardTitle>
                          </div>
                          <CardDescription>{role.description}</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium mb-2">Permissions</div>
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map((permission) => (
                              <Badge key={permission} variant="secondary">
                                {permission.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">{role.memberCount} {role.memberCount === 1 ? 'member' : 'members'} with this role</span>
                          {role.name !== "Admin" && (
                            <Button variant="ghost" size="sm" className="h-8 text-red-500">
                              Delete Role
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure your team's general settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="team-name">Team Name</Label>
                <Input id="team-name" defaultValue="Astralith Team" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Notification Settings</Label>
                    <p className="text-sm text-muted-foreground">Configure when and how team members receive notifications</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Sliders className="size-4 mr-2" />
                    <span>Advanced</span>
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="daily-digest" className="flex flex-col gap-1">
                      <span>Daily Digest</span>
                      <span className="font-normal text-muted-foreground text-sm">Send a daily summary of team activity</span>
                    </Label>
                    <Switch id="daily-digest" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weekly-report" className="flex flex-col gap-1">
                      <span>Weekly Report</span>
                      <span className="font-normal text-muted-foreground text-sm">Send a comprehensive weekly team report</span>
                    </Label>
                    <Switch id="weekly-report" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mention-notifications" className="flex flex-col gap-1">
                      <span>Mention Notifications</span>
                      <span className="font-normal text-muted-foreground text-sm">Notify team members when they are mentioned</span>
                    </Label>
                    <Switch id="mention-notifications" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 