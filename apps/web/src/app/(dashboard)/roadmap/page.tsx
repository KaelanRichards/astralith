import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity,
  Calendar, 
  CheckCircle2,
  CircleDashed,
  Clock, 
  ListTodo,
  Map, 
  Milestone,
  Play,
  User,
  AlertCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data for demonstration
const mockProjects = [
  {
    id: "prj_1",
    name: "Mobile App Redesign",
    description: "Redesign the mobile app to improve user experience and engagement",
    status: "in-progress",
    progress: 65,
    startDate: "2023-05-01",
    targetDate: "2023-07-15",
    owner: "Sarah Lee",
    team: "Product & Design",
    priority: "high",
    objectives: [
      "Increase user engagement by 20%",
      "Reduce bounce rate by 15%",
      "Improve conversion rate by 10%"
    ],
    milestones: [
      { id: "ml_1", name: "Research & planning", status: "completed", date: "2023-05-15" },
      { id: "ml_2", name: "Design phase", status: "completed", date: "2023-06-01" },
      { id: "ml_3", name: "Development", status: "in-progress", date: "2023-06-30" },
      { id: "ml_4", name: "Testing & QA", status: "not-started", date: "2023-07-10" },
      { id: "ml_5", name: "Launch", status: "not-started", date: "2023-07-15" }
    ],
    risks: [
      { id: "risk_1", description: "Development team capacity constraints", severity: "medium", mitigation: "Prioritize core features and plan phased rollout" },
      { id: "risk_2", description: "User testing feedback may require significant changes", severity: "high", mitigation: "Early user testing throughout design phase" }
    ]
  },
  {
    id: "prj_2",
    name: "Enterprise Subscription Tier",
    description: "Launch enterprise subscription tier with advanced features and integrations",
    status: "planned",
    progress: 15,
    startDate: "2023-07-01",
    targetDate: "2023-09-30",
    owner: "Mark Johnson",
    team: "Sales & Engineering",
    priority: "high",
    objectives: [
      "Secure 10 enterprise customers by Q4",
      "Achieve $200K ARR from enterprise tier",
      "Maintain 95% customer satisfaction"
    ],
    milestones: [
      { id: "ml_6", name: "Market research", status: "completed", date: "2023-05-30" },
      { id: "ml_7", name: "Feature specification", status: "in-progress", date: "2023-07-15" },
      { id: "ml_8", name: "Development", status: "not-started", date: "2023-08-15" },
      { id: "ml_9", name: "Beta testing", status: "not-started", date: "2023-09-15" },
      { id: "ml_10", name: "Launch", status: "not-started", date: "2023-09-30" }
    ],
    risks: [
      { id: "risk_3", description: "Competition may launch similar offering", severity: "high", mitigation: "Accelerate timeline and focus on unique value propositions" },
      { id: "risk_4", description: "Integration complexity with customer systems", severity: "medium", mitigation: "Build flexible API connectors and thorough documentation" }
    ]
  },
  {
    id: "prj_3",
    name: "Data Analytics Platform",
    description: "Build advanced analytics dashboard for customer insights",
    status: "completed",
    progress: 100,
    startDate: "2023-03-01",
    targetDate: "2023-05-31",
    owner: "Alex Wong",
    team: "Data & Engineering",
    priority: "medium",
    objectives: [
      "Provide actionable insights on user behavior",
      "Enable customer success team to identify at-risk customers",
      "Improve retention by 10%"
    ],
    milestones: [
      { id: "ml_11", name: "Requirements gathering", status: "completed", date: "2023-03-15" },
      { id: "ml_12", name: "Data architecture", status: "completed", date: "2023-04-01" },
      { id: "ml_13", name: "Development", status: "completed", date: "2023-05-01" },
      { id: "ml_14", name: "Testing", status: "completed", date: "2023-05-15" },
      { id: "ml_15", name: "Release", status: "completed", date: "2023-05-31" }
    ],
    risks: []
  },
  {
    id: "prj_4",
    name: "Automated Onboarding Flow",
    description: "Create streamlined onboarding process with automated setup",
    status: "at-risk",
    progress: 45,
    startDate: "2023-04-15",
    targetDate: "2023-06-30",
    owner: "Jane Smith",
    team: "Engineering & Product",
    priority: "medium",
    objectives: [
      "Reduce onboarding time by 50%",
      "Increase activation rate to 85%",
      "Decrease support tickets during onboarding by 30%"
    ],
    milestones: [
      { id: "ml_16", name: "User journey mapping", status: "completed", date: "2023-04-30" },
      { id: "ml_17", name: "Design mockups", status: "completed", date: "2023-05-15" },
      { id: "ml_18", name: "Development", status: "in-progress", date: "2023-06-15" },
      { id: "ml_19", name: "Testing", status: "not-started", date: "2023-06-25" },
      { id: "ml_20", name: "Launch", status: "not-started", date: "2023-06-30" }
    ],
    risks: [
      { id: "risk_5", description: "Integration with third-party services delayed", severity: "high", mitigation: "Focus on core flow first, add integrations incrementally" },
      { id: "risk_6", description: "Technical debt in existing systems", severity: "medium", mitigation: "Allocate time for refactoring as part of the project" }
    ]
  }
];

// Format date for display
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export default function RoadmapPage() {
  // Function to get the badge for project status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Completed</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">In Progress</Badge>;
      case "planned":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">Planned</Badge>;
      case "at-risk":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">At Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Function to get the icon for milestone status
  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="size-4 text-green-500" />;
      case "in-progress":
        return <Play className="size-4 text-blue-500" />;
      case "not-started":
        return <CircleDashed className="size-4 text-muted-foreground" />;
      default:
        return <CircleDashed className="size-4" />;
    }
  };
  
  // Function to get the color for risk severity
  const getRiskColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "";
    }
  };
  
  // Get current quarter
  const getCurrentQuarter = () => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const quarter = Math.floor(month / 3) + 1;
    return `Q${quarter} ${year}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roadmap</h1>
          <p className="text-muted-foreground">
            Company-wide priorities and product direction
          </p>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="size-3.5" />
            <span>Timeline View</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <ListTodo className="size-3.5" />
            <span>Kanban View</span>
          </Button>
          <Button className="gap-1">
            <Map className="size-3.5" />
            <span>Strategic View</span>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Strategic Overview</CardTitle>
          <CardDescription>Current quarter: {getCurrentQuarter()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Company Focus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>User Growth</span>
                    <span className="font-medium">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Revenue Growth</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Product Development</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Team Growth</span>
                    <span className="font-medium">5%</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <div className="text-xl font-bold">$480K</div>
                  <div className="text-sm text-muted-foreground">Q2 Revenue Target</div>
                  <div className="text-xs text-green-600">+18% from previous quarter</div>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-xl font-bold">15K</div>
                  <div className="text-sm text-muted-foreground">Active Users Target</div>
                  <div className="text-xs text-green-600">+25% from previous quarter</div>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-xl font-bold">95%</div>
                  <div className="text-sm text-muted-foreground">Customer Retention Goal</div>
                  <div className="text-xs text-green-600">+2% from previous quarter</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Projects Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: "25%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>In Progress</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: "50%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Planned</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: "25%" }} />
                  </div>
                </div>
                <div className="space-y-2 text-center mt-3">
                  <span className="text-sm font-medium">4 Total Projects</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="planned">Planned</TabsTrigger>
            <TabsTrigger value="at-risk">At Risk</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {mockProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {project.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">{project.progress}%</div>
                      {getStatusBadge(project.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                      <div 
                        className={`h-full ${project.status === 'at-risk' ? 'bg-red-500' : 'bg-primary'}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    
                    <div className="grid gap-3 grid-cols-1 md:grid-cols-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Owner</div>
                        <div className="font-medium flex items-center gap-1 mt-1">
                          <User className="size-3.5" />
                          {project.owner}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Team</div>
                        <div className="font-medium mt-1">{project.team}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Timeline</div>
                        <div className="font-medium mt-1">
                          {formatDate(project.startDate)} - {formatDate(project.targetDate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Priority</div>
                        <div className="font-medium mt-1 capitalize">{project.priority}</div>
                      </div>
                    </div>
                    
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-2">
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Objectives</h4>
                        <ul className="space-y-2">
                          {project.objectives.map((objective, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <CheckCircle2 className="size-3.5 text-primary mt-0.5" />
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Key Milestones</h4>
                        <ul className="space-y-2">
                          {project.milestones.map((milestone) => (
                            <li key={milestone.id} className="text-sm flex items-start gap-2">
                              <div className="mt-0.5">{getMilestoneIcon(milestone.status)}</div>
                              <div className="flex-1 flex flex-col">
                                <div className="flex items-center justify-between">
                                  <span>{milestone.name}</span>
                                  <span className="text-xs text-muted-foreground">{formatDate(milestone.date)}</span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {project.risks.length > 0 && (
                      <div className="space-y-3 mt-2">
                        <h4 className="text-sm font-medium">Risks & Mitigations</h4>
                        <ul className="space-y-3">
                          {project.risks.map((risk) => (
                            <li key={risk.id} className="text-sm bg-muted/50 p-3 rounded-md">
                              <div className="flex items-start gap-2">
                                <AlertCircle className={`size-4 mt-0.5 ${getRiskColor(risk.severity)}`} />
                                <div className="space-y-1">
                                  <div className="font-medium">{risk.description}</div>
                                  <div className="text-muted-foreground">
                                    <span className="font-medium">Mitigation:</span> {risk.mitigation}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="in-progress" className="space-y-4">
            {mockProjects.filter(p => p.status === 'in-progress').map((project) => (
              <Card key={project.id} className="overflow-hidden">
                {/* Same project card content as above */}
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {project.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">{project.progress}%</div>
                      {getStatusBadge(project.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    
                    <div className="grid gap-3 grid-cols-1 md:grid-cols-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Owner</div>
                        <div className="font-medium flex items-center gap-1 mt-1">
                          <User className="size-3.5" />
                          {project.owner}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Team</div>
                        <div className="font-medium mt-1">{project.team}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Timeline</div>
                        <div className="font-medium mt-1">
                          {formatDate(project.startDate)} - {formatDate(project.targetDate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Priority</div>
                        <div className="font-medium mt-1 capitalize">{project.priority}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="planned" className="space-y-4">
            {mockProjects.filter(p => p.status === 'planned').map((project) => (
              <Card key={project.id} className="overflow-hidden">
                {/* Same project card content as above */}
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {project.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">{project.progress}%</div>
                      {getStatusBadge(project.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    
                    <div className="grid gap-3 grid-cols-1 md:grid-cols-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Owner</div>
                        <div className="font-medium flex items-center gap-1 mt-1">
                          <User className="size-3.5" />
                          {project.owner}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Team</div>
                        <div className="font-medium mt-1">{project.team}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Timeline</div>
                        <div className="font-medium mt-1">
                          {formatDate(project.startDate)} - {formatDate(project.targetDate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Priority</div>
                        <div className="font-medium mt-1 capitalize">{project.priority}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="at-risk" className="space-y-4">
            {mockProjects.filter(p => p.status === 'at-risk').map((project) => (
              <Card key={project.id} className="overflow-hidden">
                {/* Same project card content as above */}
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {project.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">{project.progress}%</div>
                      {getStatusBadge(project.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                      <div 
                        className="h-full bg-red-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    
                    <div className="grid gap-3 grid-cols-1 md:grid-cols-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Owner</div>
                        <div className="font-medium flex items-center gap-1 mt-1">
                          <User className="size-3.5" />
                          {project.owner}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Team</div>
                        <div className="font-medium mt-1">{project.team}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Timeline</div>
                        <div className="font-medium mt-1">
                          {formatDate(project.startDate)} - {formatDate(project.targetDate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Priority</div>
                        <div className="font-medium mt-1 capitalize">{project.priority}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mt-2">
                      <h4 className="text-sm font-medium">Risks & Mitigations</h4>
                      <ul className="space-y-3">
                        {project.risks.map((risk) => (
                          <li key={risk.id} className="text-sm bg-muted/50 p-3 rounded-md">
                            <div className="flex items-start gap-2">
                              <AlertCircle className={`size-4 mt-0.5 ${getRiskColor(risk.severity)}`} />
                              <div className="space-y-1">
                                <div className="font-medium">{risk.description}</div>
                                <div className="text-muted-foreground">
                                  <span className="font-medium">Mitigation:</span> {risk.mitigation}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 