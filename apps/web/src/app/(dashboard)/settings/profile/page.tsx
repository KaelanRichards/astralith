import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Moon, 
  Sun, 
  BellRing, 
  Lock, 
  Mail, 
  Key, 
  AlertCircle, 
  Languages, 
  LogOut, 
  Monitor, 
  FileEdit,
  Clock 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// Mock user data
const mockUser = {
  id: "user1",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Alex",
  role: "Product Manager",
  department: "Product",
  bio: "Product manager with 5+ years of experience in SaaS products. Passionate about user experience and data-driven decisions.",
  location: "San Francisco, CA",
  timeZone: "America/Los_Angeles",
  language: "English",
  theme: "system",
  notificationPreferences: {
    emailDigest: true,
    mentionsAndComments: true,
    teamUpdates: true,
    productUpdates: false,
  },
  securityInfo: {
    lastPasswordChange: "2023-08-15",
    twoFactorEnabled: true,
    recoveryEmailConfigured: true,
    activeDevices: 2,
    lastLogin: "2023-09-28T14:30:00Z",
  }
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                    <AvatarFallback className="text-xl">{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute -right-2 bottom-0 h-8 w-8 rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                  >
                    <Camera className="size-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">{mockUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{mockUser.role} - {mockUser.department}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Badge variant="outline">Product</Badge>
                    <Badge variant="outline">Strategy</Badge>
                    <Badge variant="outline">UX</Badge>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue={mockUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={mockUser.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue={mockUser.role} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue={mockUser.department}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    defaultValue={mockUser.bio}
                    placeholder="Tell us about yourself" 
                    className="h-20 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue={mockUser.location} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-zone">Time Zone</Label>
                  <Select defaultValue={mockUser.timeZone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Paris">Paris</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interface Preferences</CardTitle>
              <CardDescription>
                Customize your interface and display settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-base">Appearance</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Choose how Astralith looks to you
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-1 p-3 hover:border-primary">
                    <Sun className="size-5" />
                    <span>Light</span>
                  </Button>
                  <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-1 p-3 hover:border-primary">
                    <Moon className="size-5" />
                    <span>Dark</span>
                  </Button>
                  <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-1 border-primary p-3 bg-accent">
                    <Monitor className="size-5" />
                    <span>System</span>
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label className="text-base">Language</Label>
                <div className="flex items-center gap-3">
                  <Languages className="size-5 text-muted-foreground" />
                  <Select defaultValue={mockUser.language}>
                    <SelectTrigger className="w-[240px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label className="text-base">Notification Preferences</Label>
                <p className="text-sm text-muted-foreground">
                  Configure when and how you receive notifications
                </p>
                
                <div className="space-y-3 mt-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-digest" className="flex flex-col gap-1">
                      <span>Email Digest</span>
                      <span className="font-normal text-muted-foreground text-sm">Receive a daily summary of important updates</span>
                    </Label>
                    <Switch id="email-digest" defaultChecked={mockUser.notificationPreferences.emailDigest} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mentions-comments" className="flex flex-col gap-1">
                      <span>Mentions & Comments</span>
                      <span className="font-normal text-muted-foreground text-sm">Get notified when you're mentioned or someone comments on your work</span>
                    </Label>
                    <Switch id="mentions-comments" defaultChecked={mockUser.notificationPreferences.mentionsAndComments} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="team-updates" className="flex flex-col gap-1">
                      <span>Team Updates</span>
                      <span className="font-normal text-muted-foreground text-sm">Receive notifications about team activities and changes</span>
                    </Label>
                    <Switch id="team-updates" defaultChecked={mockUser.notificationPreferences.teamUpdates} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="product-updates" className="flex flex-col gap-1">
                      <span>Product Updates</span>
                      <span className="font-normal text-muted-foreground text-sm">Get notified about new features and improvements</span>
                    </Label>
                    <Switch id="product-updates" defaultChecked={mockUser.notificationPreferences.productUpdates} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Lock className="size-4 text-muted-foreground" />
                      <Label className="text-base">Password</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Last changed {new Date(mockUser.securityInfo.lastPasswordChange).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Key className="size-4 mr-2" />
                    <span>Change Password</span>
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="size-4 text-muted-foreground" />
                      <Label className="text-base">Two-Factor Authentication</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {mockUser.securityInfo.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                  {mockUser.securityInfo.twoFactorEnabled ? (
                    <Button variant="outline" size="sm">
                      <span>Manage 2FA</span>
                    </Button>
                  ) : (
                    <Button size="sm">
                      <span>Enable 2FA</span>
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Mail className="size-4 text-muted-foreground" />
                      <Label className="text-base">Recovery Email</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {mockUser.securityInfo.recoveryEmailConfigured ? "Configured" : "Not configured"}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileEdit className="size-4 mr-2" />
                    <span>Update</span>
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Login Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-muted-foreground" />
                        <span className="font-medium">Last Login</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(mockUser.securityInfo.lastLogin).toLocaleString()} (Chrome on macOS)
                      </p>
                    </div>
                    <Badge variant="outline">This Device</Badge>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Active Sessions</span>
                      <Badge>{mockUser.securityInfo.activeDevices}</Badge>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      View and manage devices
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium text-red-600 mb-1">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Permanently delete your account and all associated data
                </p>
                <Button variant="destructive" size="sm">
                  <LogOut className="size-4 mr-2" />
                  <span>Delete Account</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 