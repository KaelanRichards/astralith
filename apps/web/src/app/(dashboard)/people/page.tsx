import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Calendar, 
  CheckCircle, 
  Clock, 
  LineChart, 
  Tag, 
  TrendingUp, 
  UserIcon, 
  Users,
  ChevronRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

// Mock data for demonstration
const mockTeamMembers = [
  {
    id: "usr_1",
    name: "Jane Smith",
    role: "Lead Frontend Developer",
    email: "jane@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Jane",
    department: "Engineering",
    engagementScore: 92,
    productivityScore: 85,
    growthTrajectory: "Exceeding",
    readyForPromotion: true,
    riskOfBurnout: "Low",
    recentActivity: "Completed 14 tasks in the last 7 days",
    lastActiveHours: 4,
    projectContributions: [
      { project: "Dashboard Redesign", tasks: 23, completion: 95 },
      { project: "Mobile App", tasks: 12, completion: 78 },
    ],
    strengths: ["UI Design", "React", "Mentoring", "Documentation"],
    areasForGrowth: ["Backend Integration", "Performance Optimization"],
    tags: ["High Performer", "Mentor", "Product Champion"],
  },
  {
    id: "usr_2",
    name: "Mark Johnson",
    role: "Backend Developer",
    email: "mark@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Mark",
    department: "Engineering",
    engagementScore: 78,
    productivityScore: 90,
    growthTrajectory: "Meeting",
    readyForPromotion: false,
    riskOfBurnout: "Medium",
    recentActivity: "Completed 10 tasks in the last 7 days",
    lastActiveHours: 2,
    projectContributions: [
      { project: "API Refactoring", tasks: 18, completion: 85 },
      { project: "Database Migration", tasks: 8, completion: 100 },
    ],
    strengths: ["Node.js", "Database Design", "Problem Solving"],
    areasForGrowth: ["Documentation", "Knowledge Sharing", "Frontend Skills"],
    tags: ["Technical Expert", "Deep Focus"],
  },
  {
    id: "usr_3",
    name: "Sarah Lee",
    role: "Product Manager",
    email: "sarah@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Sarah",
    department: "Product",
    engagementScore: 95,
    productivityScore: 88,
    growthTrajectory: "Exceeding",
    readyForPromotion: true,
    riskOfBurnout: "Low",
    recentActivity: "Led 3 planning sessions in the last 7 days",
    lastActiveHours: 6,
    projectContributions: [
      { project: "Q3 Roadmap", tasks: 15, completion: 100 },
      { project: "User Research", tasks: 8, completion: 90 },
    ],
    strengths: ["Communication", "Strategic Thinking", "User Empathy", "Prioritization"],
    areasForGrowth: ["Technical Knowledge", "Data Analysis"],
    tags: ["Strategic Thinker", "Team Player", "Customer Advocate"],
  },
  {
    id: "usr_4",
    name: "Alex Wong",
    role: "QA Engineer",
    email: "alex@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=Alex",
    department: "Engineering",
    engagementScore: 72,
    productivityScore: 83,
    growthTrajectory: "Meeting",
    readyForPromotion: false,
    riskOfBurnout: "High",
    recentActivity: "Filed 25 bug reports in the last 7 days",
    lastActiveHours: 8,
    projectContributions: [
      { project: "Release Testing", tasks: 30, completion: 92 },
      { project: "Automation Framework", tasks: 5, completion: 40 },
    ],
    strengths: ["Detail Oriented", "Test Planning", "Bug Advocacy"],
    areasForGrowth: ["Test Automation", "Programming Skills", "Communication"],
    tags: ["At Risk", "Needs Support", "Quality Focused"],
  },
];

export default function PeoplePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">People</h1>
          <p className="text-muted-foreground">
            Dynamic team management and employee insights
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6">
        {mockTeamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-16 bg-gradient-to-r from-primary/20 to-primary/5">
                <Avatar className="absolute bottom-0 translate-y-1/2 left-4 size-16 border-4 border-background">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent className="pt-10 pb-4 space-y-2">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant={member.riskOfBurnout === "High" ? "destructive" : 
                      (member.riskOfBurnout === "Medium" ? "default" : "outline")}>
                  {member.riskOfBurnout} Risk
                </Badge>
                {member.readyForPromotion && (
                  <Badge variant="secondary">Ready for Growth</Badge>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Engagement</p>
                  <div className="flex items-center gap-2">
                    <Progress value={member.engagementScore} className="h-2" />
                    <span className="text-xs">{member.engagementScore}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Productivity</p>
                  <div className="flex items-center gap-2">
                    <Progress value={member.productivityScore} className="h-2" />
                    <span className="text-xs">{member.productivityScore}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <Clock className="size-3 mr-1" />
                <span>Active {member.lastActiveHours}h ago</span>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 p-2">
              <Link href={`/people/${member.id}`} className="text-xs text-center w-full text-muted-foreground hover:text-foreground flex items-center justify-center">
                View Details
                <ChevronRight className="size-3 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Team Insights</CardTitle>
          <CardDescription>
            Overview of team health, productivity, and collaboration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="growth">Growth Trajectories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Team Size</CardTitle>
                    <Users className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">
                      +3 from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
                    <TrendingUp className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">84%</div>
                    <p className="text-xs text-muted-foreground">
                      +2% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Retention Risk</CardTitle>
                    <UserIcon className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12%</div>
                    <p className="text-xs text-muted-foreground">
                      -3% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Growth Ready</CardTitle>
                    <CheckCircle className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">
                      Team members ready for promotion
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Team Highlights</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Engineering team has maintained high productivity for 3 consecutive months</li>
                  <li>Design team collaboration score increased by 15% since implementing new feedback process</li>
                  <li>3 team members showing signs of potential burnout - intervention recommended</li>
                  <li>Marketing team onboarding has been completed successfully for 2 new hires</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="departments">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Engineering</CardTitle>
                      <CardDescription>12 team members</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Engagement</span>
                          <span className="text-sm font-medium">86%</span>
                        </div>
                        <Progress value={86} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Productivity</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Burnout Risk</span>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Product</CardTitle>
                      <CardDescription>5 team members</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Engagement</span>
                          <span className="text-sm font-medium">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Productivity</span>
                          <span className="text-sm font-medium">88%</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Burnout Risk</span>
                          <span className="text-sm font-medium">8%</span>
                        </div>
                        <Progress value={8} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="growth">
              <div className="space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-green-500" />
                    <span className="text-sm">Exceeding (25%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-blue-500" />
                    <span className="text-sm">Meeting (60%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Developing (10%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-500" />
                    <span className="text-sm">Below (5%)</span>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Ready for Promotion</CardTitle>
                      <TrendingUp className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-sm">
                        <a href="/people?filter=promotion" className="text-primary underline-offset-4 hover:underline">
                          View promotion candidates
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Needs Support</CardTitle>
                      <LineChart className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm">
                        <a href="/people?filter=support" className="text-primary underline-offset-4 hover:underline">
                          View team members needing support
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Recommendations</CardTitle>
                    <CardDescription>Personalized actions to support team growth</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Jane Smith</h4>
                      <p className="text-sm">Ready for increased responsibility - consider assigning leadership of the new mobile project</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Alex Wong</h4>
                      <p className="text-sm">Showing signs of burnout - schedule a check-in and consider reducing workload for the next sprint</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Mark Johnson</h4>
                      <p className="text-sm">Would benefit from mentorship in documentation - pair with Sarah for next project</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 