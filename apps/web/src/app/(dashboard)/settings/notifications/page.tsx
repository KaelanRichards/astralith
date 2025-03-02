import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { BellRing, Clock, Mail, MessageSquare, Users, FileText, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for notification settings
const mockNotificationSettings = {
  emailNotifications: {
    dailyDigest: true,
    weeklyReport: true,
    teamUpdates: true,
    mentionsAndComments: true,
    marketingEmails: false,
  },
  inAppNotifications: {
    teamActivity: true,
    mentions: true,
    directMessages: true,
    importantAlerts: true,
    pulseSummaries: true,
  },
  notificationSchedule: {
    workHours: "9am-5pm",
    timezone: "America/Los_Angeles",
    doNotDisturb: false,
    doNotDisturbHours: "10pm-7am",
    weekendNotifications: "important",
  },
};

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          Manage how you receive notifications and updates
        </p>
      </div>

      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="in-app">In-App</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        {/* Email Notifications Tab */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Email Notifications</CardTitle>
              </div>
              <CardDescription>
                Configure which emails you receive from Astralith
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="daily-digest" className="text-base">Daily Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a daily summary of your team's activity
                    </p>
                  </div>
                  <Switch
                    id="daily-digest"
                    defaultChecked={mockNotificationSettings.emailNotifications.dailyDigest}
                  />
                </div>
                
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-report" className="text-base">Weekly Report</Label>
                    <p className="text-sm text-muted-foreground">
                      Get a comprehensive summary of team performance every week
                    </p>
                  </div>
                  <Switch
                    id="weekly-report"
                    defaultChecked={mockNotificationSettings.emailNotifications.weeklyReport}
                  />
                </div>
                
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="team-updates" className="text-base">Team Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about team member changes and updates
                    </p>
                  </div>
                  <Switch
                    id="team-updates"
                    defaultChecked={mockNotificationSettings.emailNotifications.teamUpdates}
                  />
                </div>
                
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mentions-comments" className="text-base">Mentions & Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Get emails when you're mentioned or receive comments
                    </p>
                  </div>
                  <Switch
                    id="mentions-comments"
                    defaultChecked={mockNotificationSettings.emailNotifications.mentionsAndComments}
                  />
                </div>
                
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails" className="text-base">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive news about product updates and features
                    </p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    defaultChecked={mockNotificationSettings.emailNotifications.marketingEmails}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* In-App Notifications Tab */}
        <TabsContent value="in-app" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-muted-foreground" />
                <CardTitle>In-App Notifications</CardTitle>
              </div>
              <CardDescription>
                Configure which notifications appear in your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="team-activity" className="text-base">Team Activity</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications about team member status changes
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="team-activity"
                    defaultChecked={mockNotificationSettings.inAppNotifications.teamActivity}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="mentions" className="text-base">Mentions</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications when someone mentions you
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="mentions"
                    defaultChecked={mockNotificationSettings.inAppNotifications.mentions}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="direct-messages" className="text-base">Direct Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications for direct messages from team members
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="direct-messages"
                    defaultChecked={mockNotificationSettings.inAppNotifications.directMessages}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="important-alerts" className="text-base">Important Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Critical notifications that require your attention
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="important-alerts"
                    defaultChecked={mockNotificationSettings.inAppNotifications.importantAlerts}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="pulse-summaries" className="text-base">Pulse Summaries</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications for new team pulse insights
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="pulse-summaries"
                    defaultChecked={mockNotificationSettings.inAppNotifications.pulseSummaries}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Notification Schedule</CardTitle>
              </div>
              <CardDescription>
                Configure when you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-base">Working Hours</Label>
                  <p className="text-sm text-muted-foreground">
                    Specify your typical working hours for notification timing
                  </p>
                  <div className="flex items-center gap-2">
                    <Select defaultValue={mockNotificationSettings.notificationSchedule.workHours}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9am-5pm">9:00 AM - 5:00 PM</SelectItem>
                        <SelectItem value="8am-4pm">8:00 AM - 4:00 PM</SelectItem>
                        <SelectItem value="10am-6pm">10:00 AM - 6:00 PM</SelectItem>
                        <SelectItem value="custom">Custom Hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue={mockNotificationSettings.notificationSchedule.timezone}>
                      <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="Select timezone" />
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
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="do-not-disturb" className="text-base">Do Not Disturb</Label>
                      <p className="text-sm text-muted-foreground">
                        Pause notifications during specific hours
                      </p>
                    </div>
                    <Switch
                      id="do-not-disturb"
                      defaultChecked={mockNotificationSettings.notificationSchedule.doNotDisturb}
                    />
                  </div>
                  
                  <div className="pl-7 pt-2">
                    <Select defaultValue={mockNotificationSettings.notificationSchedule.doNotDisturbHours}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10pm-7am">10:00 PM - 7:00 AM</SelectItem>
                        <SelectItem value="11pm-8am">11:00 PM - 8:00 AM</SelectItem>
                        <SelectItem value="9pm-6am">9:00 PM - 6:00 AM</SelectItem>
                        <SelectItem value="custom">Custom Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label className="text-base">Weekend Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Configure which notifications you want to receive on weekends
                  </p>
                  <RadioGroup defaultValue={mockNotificationSettings.notificationSchedule.weekendNotifications}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="weekend-all" />
                      <Label htmlFor="weekend-all">All notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="important" id="weekend-important" />
                      <Label htmlFor="weekend-important">Important only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="weekend-none" />
                      <Label htmlFor="weekend-none">None</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 