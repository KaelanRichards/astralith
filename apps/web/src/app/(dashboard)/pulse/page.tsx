import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, Award, Calendar, Clock, TrendingUp, Users } from "lucide-react";

// Mock data for demonstration
const mockInsights = [
  {
    id: "ins_1",
    title: "Potential burnout risk detected",
    description: "Team member Jane Smith has worked late hours for 5 consecutive days.",
    type: "burnout",
    priority: "high",
    source: "slack",
    createdAt: "2023-06-15T12:30:00Z",
  },
  {
    id: "ins_2",
    title: "Project bottleneck identified",
    description: "The authentication feature has been in review for over a week with no progress.",
    type: "bottleneck",
    priority: "medium",
    source: "linear",
    createdAt: "2023-06-14T10:15:00Z",
  },
  {
    id: "ins_3",
    title: "Team celebration opportunity",
    description: "Frontend team has successfully completed all Q2 objectives ahead of schedule.",
    type: "celebration",
    priority: "medium",
    source: "linear",
    createdAt: "2023-06-13T16:45:00Z",
  },
  {
    id: "ins_4",
    title: "Meeting efficiency improvement",
    description: "Weekly planning meetings are consistently running 15 minutes over scheduled time.",
    type: "general",
    priority: "low",
    source: "calendar",
    createdAt: "2023-06-12T09:20:00Z",
  },
];

const mockMetrics = {
  collaboration: 85,
  productivity: 72,
  morale: 90,
  wellness: 68,
};

// Format date for display
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export default function PulsePage() {
  const today = formatDate(new Date().toISOString());
  
  // Get icon based on insight type
  const getInsightIcon = (type: string) => {
    switch (type) {
      case "burnout":
        return <AlertTriangle className="size-4 text-red-500" />;
      case "bottleneck":
        return <AlertTriangle className="size-4 text-amber-500" />;
      case "celebration":
        return <Award className="size-4 text-green-500" />;
      case "general":
        return <Activity className="size-4 text-blue-500" />;
      default:
        return <Activity className="size-4" />;
    }
  };
  
  // Get badge styling based on priority
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge variant="default">Medium Priority</Badge>;
      case "low":
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pulse</h1>
          <p className="text-muted-foreground">
            Your daily leadership briefing for {today}
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="metrics">Team Metrics</TabsTrigger>
          <TabsTrigger value="summary">Weekly Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="insights" className="space-y-4">
          {mockInsights.map((insight) => (
            <Alert key={insight.id} className="flex items-start gap-4">
              <div className="mt-1">{getInsightIcon(insight.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <AlertTitle>{insight.title}</AlertTitle>
                  {getPriorityBadge(insight.priority)}
                </div>
                <AlertDescription className="mt-2">
                  {insight.description}
                </AlertDescription>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <div className="flex items-center mr-3">
                    <Clock className="mr-1 size-3" />
                    {new Date(insight.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="capitalize">
                    Source: {insight.source}
                  </div>
                </div>
              </div>
            </Alert>
          ))}
        </TabsContent>
        
        <TabsContent value="metrics" className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Collaboration</CardTitle>
              <Users className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.collaboration}%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last week
              </p>
              <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${mockMetrics.collaboration}%` }}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Productivity</CardTitle>
              <TrendingUp className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.productivity}%</div>
              <p className="text-xs text-muted-foreground">
                -3% from last week
              </p>
              <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${mockMetrics.productivity}%` }}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Team Morale</CardTitle>
              <Award className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.morale}%</div>
              <p className="text-xs text-muted-foreground">
                +8% from last week
              </p>
              <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${mockMetrics.morale}%` }}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Team Wellness</CardTitle>
              <Activity className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.wellness}%</div>
              <p className="text-xs text-muted-foreground">
                -2% from last week
              </p>
              <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${mockMetrics.wellness}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Summary</CardTitle>
              <CardDescription>
                A review of your team's performance and health over the past week
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Key Accomplishments</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Frontend team completed the new dashboard redesign</li>
                  <li>API team shipped 3 new endpoints ahead of schedule</li>
                  <li>QA completed regression testing with zero critical bugs</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Areas of Attention</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Mobile team is facing delays with the authentication flow</li>
                  <li>Two team members showed signs of potential burnout</li>
                  <li>Sprint planning meetings consistently running over time</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Upcoming Milestones</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="size-4 mr-2 text-muted-foreground" />
                    <span>Beta release scheduled for June 20th</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="size-4 mr-2 text-muted-foreground" />
                    <span>Quarterly review meeting on June 30th</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 