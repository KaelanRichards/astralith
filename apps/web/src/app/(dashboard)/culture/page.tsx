import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  AlertCircle, 
  ArrowDown, 
  ArrowUp, 
  Calendar, 
  Heart, 
  MessageSquare, 
  Smile, 
  ThumbsUp, 
  TrendingUp, 
  Users
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data for demonstration
const mockCultureData = {
  morale: {
    current: 85,
    previous: 78,
    change: 7,
    history: [78, 75, 79, 82, 85]
  },
  collaboration: {
    current: 92,
    previous: 88,
    change: 4,
    history: [88, 90, 86, 89, 92]
  },
  communication: {
    current: 79,
    previous: 82,
    change: -3,
    history: [82, 80, 78, 75, 79]
  },
  engagement: {
    current: 88,
    previous: 90,
    change: -2,
    history: [90, 91, 89, 87, 88]
  },
  workLifeBalance: {
    current: 72,
    previous: 68,
    change: 4,
    history: [68, 70, 65, 69, 72]
  }
};

const mockInsights = [
  {
    id: "cul_1",
    title: "Team morale improved significantly after project launch",
    description: "Slack activity analysis shows a 15% increase in positive sentiment after the successful mobile app launch.",
    type: "positive",
    source: "slack",
    date: "2023-06-10",
    indicators: ["celebrations", "positive feedback", "team mentions"],
    recommendedActions: [
      "Schedule a team celebration event",
      "Provide public recognition for key contributors",
      "Document successful processes for future projects"
    ]
  },
  {
    id: "cul_2",
    title: "Engineering team showing signs of burnout",
    description: "Working hours analysis indicates consistent late-night activity and weekend work among the backend team.",
    type: "negative",
    source: "calendar",
    date: "2023-06-08",
    indicators: ["after-hours activity", "weekend work", "decreased social interaction"],
    recommendedActions: [
      "Schedule 1-on-1 check-ins with affected team members",
      "Review workload and project deadlines",
      "Consider temporary resources to alleviate pressure"
    ]
  },
  {
    id: "cul_3",
    title: "Cross-department collaboration has increased",
    description: "Meeting and document analysis shows stronger collaboration between Product and Engineering teams.",
    type: "positive",
    source: "linear",
    date: "2023-06-05",
    indicators: ["cross-team meetings", "shared documents", "collaborative planning"],
    recommendedActions: [
      "Highlight successful collaboration in company update",
      "Document effective collaboration patterns",
      "Consider expanding collaborative approaches to other teams"
    ]
  },
  {
    id: "cul_4",
    title: "New onboarding process receiving positive feedback",
    description: "New team members reporting higher satisfaction with the improved onboarding process.",
    type: "positive",
    source: "hr",
    date: "2023-06-01",
    indicators: ["positive feedback", "faster productivity", "higher engagement"],
    recommendedActions: [
      "Share onboarding improvements with leadership team",
      "Collect additional feedback for further refinements",
      "Document process for company playbook"
    ]
  }
];

const mockCultureValues = [
  { name: "Innovation", score: 82, change: 5 },
  { name: "Transparency", score: 88, change: 2 },
  { name: "Collaboration", score: 90, change: 3 },
  { name: "Customer Focus", score: 85, change: -1 },
  { name: "Learning", score: 79, change: 4 },
  { name: "Work-Life Balance", score: 72, change: 6 }
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

export default function CulturePage() {
  // Function to render change indicator
  const renderChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <div className="flex items-center text-green-500">
          <ArrowUp className="size-3 mr-1" />
          <span>{change}%</span>
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center text-red-500">
          <ArrowDown className="size-3 mr-1" />
          <span>{Math.abs(change)}%</span>
        </div>
      );
    } else {
      return <span className="text-muted-foreground">No change</span>;
    }
  };
  
  // Function to get appropriate icon for culture metric
  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "morale":
        return <Smile className="size-4 text-yellow-500" />;
      case "collaboration":
        return <Users className="size-4 text-blue-500" />;
      case "communication":
        return <MessageSquare className="size-4 text-purple-500" />;
      case "engagement":
        return <Heart className="size-4 text-pink-500" />;
      case "workLifeBalance":
        return <Activity className="size-4 text-green-500" />;
      default:
        return <TrendingUp className="size-4" />;
    }
  };
  
  // Function to get badge for insight type
  const getInsightBadge = (type: string) => {
    switch (type) {
      case "positive":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Positive</Badge>;
      case "negative":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Needs Attention</Badge>;
      case "neutral":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Neutral</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Culture</h1>
          <p className="text-muted-foreground">
            Proactive monitoring of team morale and collaboration dynamics
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center">
              <Smile className="size-4 text-yellow-500 mr-2" />
              <CardTitle className="text-sm font-medium">Team Morale</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCultureData.morale.current}%</div>
            <div className="flex items-center pt-1">
              {renderChangeIndicator(mockCultureData.morale.change)}
            </div>
            <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div 
                className="h-full bg-yellow-500" 
                style={{ width: `${mockCultureData.morale.current}%` }}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center">
              <Users className="size-4 text-blue-500 mr-2" />
              <CardTitle className="text-sm font-medium">Collaboration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCultureData.collaboration.current}%</div>
            <div className="flex items-center pt-1">
              {renderChangeIndicator(mockCultureData.collaboration.change)}
            </div>
            <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${mockCultureData.collaboration.current}%` }}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center">
              <MessageSquare className="size-4 text-purple-500 mr-2" />
              <CardTitle className="text-sm font-medium">Communication</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCultureData.communication.current}%</div>
            <div className="flex items-center pt-1">
              {renderChangeIndicator(mockCultureData.communication.change)}
            </div>
            <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div 
                className="h-full bg-purple-500" 
                style={{ width: `${mockCultureData.communication.current}%` }}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center">
              <Heart className="size-4 text-pink-500 mr-2" />
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCultureData.engagement.current}%</div>
            <div className="flex items-center pt-1">
              {renderChangeIndicator(mockCultureData.engagement.change)}
            </div>
            <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div 
                className="h-full bg-pink-500" 
                style={{ width: `${mockCultureData.engagement.current}%` }}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center">
              <Activity className="size-4 text-green-500 mr-2" />
              <CardTitle className="text-sm font-medium">Work-Life Balance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCultureData.workLifeBalance.current}%</div>
            <div className="flex items-center pt-1">
              {renderChangeIndicator(mockCultureData.workLifeBalance.change)}
            </div>
            <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${mockCultureData.workLifeBalance.current}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle>Culture Insights</CardTitle>
            <CardDescription>
              Automatically detected patterns and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {mockInsights.map((insight) => (
              <div key={insight.id} className="border-b pb-5 mb-5 last:pb-0 last:mb-0 last:border-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{insight.title}</h3>
                      {getInsightBadge(insight.type)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {insight.description}
                    </p>
                    
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="size-3 mr-1" />
                        <span>{formatDate(insight.date)}</span>
                      </div>
                      <div className="capitalize">
                        Source: {insight.source}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-sm font-medium mb-2">Detected indicators:</div>
                      <div className="flex flex-wrap gap-2">
                        {insight.indicators.map((indicator, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {indicator}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Recommended actions:</div>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {insight.recommendedActions.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cultural Values Alignment</CardTitle>
              <CardDescription>
                How well the team embodies company values
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCultureValues.map((value) => (
                <div key={value.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{value.name}</span>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{value.score}%</span>
                      {renderChangeIndicator(value.change)}
                    </div>
                  </div>
                  <Progress value={value.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Team Pulse</CardTitle>
              <CardDescription>
                Recent activity analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Active Conversations</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Slack channels</span>
                  <span className="text-sm font-medium">24 active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Daily messages</span>
                  <span className="text-sm font-medium">~350</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cross-team discussions</span>
                  <span className="text-sm font-medium">35% of total</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Recognition</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Praise messages</span>
                  <span className="text-sm font-medium">28 this week</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Peer feedback</span>
                  <span className="text-sm font-medium">15 this week</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Sentiment Analysis</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-green-100 text-green-800 rounded p-2 text-center">
                    <div className="text-sm">Positive</div>
                    <div className="font-bold">68%</div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 rounded p-2 text-center">
                    <div className="text-sm">Neutral</div>
                    <div className="font-bold">25%</div>
                  </div>
                  <div className="bg-red-100 text-red-800 rounded p-2 text-center">
                    <div className="text-sm">Negative</div>
                    <div className="font-bold">7%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Culture Health Analysis</CardTitle>
          <CardDescription>
            Summary of key culture indicators and health factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary" className="space-y-4">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="departments">Departmental</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-4">
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Overall Culture Health: Strong</h3>
                  <p className="text-sm text-muted-foreground">
                    The team culture shows strong positive indicators across most metrics. Recent morale improvements and increased cross-team collaboration are particularly notable. Work-life balance requires continued monitoring, though showing recent improvements.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Key Strengths</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>High collaboration scores across teams</li>
                    <li>Strong alignment with company values</li>
                    <li>Positive response to recent initiatives</li>
                    <li>Healthy peer recognition culture</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Areas for Improvement</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Engineering team burnout risk requires attention</li>
                    <li>Communication scores have slightly decreased</li>
                    <li>Work-life balance metrics still below target despite improvement</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Recommended Strategic Actions</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Review engineering team workload and project deadlines</li>
                    <li>Implement regular company-wide celebration of achievements</li>
                    <li>Consider formalizing flexible work policy to support work-life balance</li>
                    <li>Schedule dedicated team-building activities</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="departments" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Engineering</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-amber-500 gap-1">
                      <AlertCircle className="size-4" />
                      <span className="font-medium">Needs Attention</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Signs of burnout detected. Communication and morale metrics declining over past 2 weeks. Workload analysis indicates potential overallocation.
                    </div>
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Morale</span>
                          <span className="font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Work-Life Balance</span>
                          <span className="font-medium">58%</span>
                        </div>
                        <Progress value={58} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Product</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-green-500 gap-1">
                      <ThumbsUp className="size-4" />
                      <span className="font-medium">Strong</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      High collaboration and engagement scores. Team showing strong alignment with company values. Communication metrics are excellent.
                    </div>
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Morale</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Work-Life Balance</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Marketing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-green-500 gap-1">
                      <ThumbsUp className="size-4" />
                      <span className="font-medium">Strong</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Strong engagement and high morale. Team shows excellent collaboration with other departments. Recent campaign success has boosted team satisfaction.
                    </div>
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Morale</span>
                          <span className="font-medium">90%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Work-Life Balance</span>
                          <span className="font-medium">82%</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Customer Success</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-blue-500 gap-1">
                      <ThumbsUp className="size-4" />
                      <span className="font-medium">Good</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Healthy metrics across most areas. Some indications of communication challenges with Engineering team. Overall positive culture indicators.
                    </div>
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Morale</span>
                          <span className="font-medium">84%</span>
                        </div>
                        <Progress value={84} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Work-Life Balance</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-4">
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">6-Month Culture Trend: Improving</h3>
                  <p className="text-sm text-muted-foreground">
                    Overall culture metrics show a positive trend over the past 6 months, with notable improvements following the implementation of flexible work policies and increased focus on recognition programs.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Key Trend Observations</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Team morale has increased steadily over the past quarter (+7% overall)</li>
                    <li>Work-life balance scores show improvement following flexible work policy implementation</li>
                    <li>Engineering team metrics fluctuate more than other departments</li>
                    <li>Collaboration scores peak around major project milestones</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Upcoming Culture Initiatives</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Quarterly team building and celebration event (Jul 15)</li>
                    <li>Expanded learning and development program launch (Aug 1)</li>
                    <li>Refined meeting practices rollout (Jul 10)</li>
                    <li>Updated performance review framework with emphasis on growth (Q3)</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 