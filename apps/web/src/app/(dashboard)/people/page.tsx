"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Calendar, 
  CheckCircle, 
  Clock, 
  LineChart, 
  Search,
  Tag, 
  TrendingUp, 
  UserIcon, 
  Users,
  ChevronRight,
  Loader2,
  AlertCircle,
  RefreshCcw
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { getPeopleWithMetrics } from "@/api/people.api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [apiTestResult, setApiTestResult] = useState<string | null>(null);
  
  // Test API connection on component mount
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        console.log("Testing API connection...");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
        const text = await response.text();
        console.log(`API health check response: ${text}`);
        setApiTestResult(`API health check: ${text}`);
      } catch (error) {
        console.error("API health check failed:", error);
        setApiTestResult(`API health check failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    };
    
    testApiConnection();
  }, []);
  
  // Fetch people data with metrics
  const { data: teamMembers, isLoading, error, refetch } = useQuery({
    queryKey: ["people-with-metrics"],
    queryFn: getPeopleWithMetrics
  });
  
  // Filter team members based on search query
  const filteredMembers = teamMembers?.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <Loader2 className="size-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">Loading team members...</p>
        <p className="text-sm text-muted-foreground">This might take a moment</p>
        {apiTestResult && (
          <div className="mt-4 p-2 bg-muted rounded-md">
            <p className="text-sm">{apiTestResult}</p>
          </div>
        )}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-destructive">
        <AlertCircle className="size-12 mb-4" />
        <p className="text-lg font-medium">Error loading team members</p>
        <p className="text-sm text-muted-foreground mb-4">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
        {apiTestResult && (
          <div className="mt-4 p-2 bg-muted rounded-md">
            <p className="text-sm">{apiTestResult}</p>
          </div>
        )}
        <Button onClick={() => refetch()} variant="outline" className="gap-2">
          <RefreshCcw className="size-4" />
          Try Again
        </Button>
      </div>
    );
  }
  
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
      
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, role, or department..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredMembers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <UserIcon className="size-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium">No team members found</p>
            <p className="text-sm text-muted-foreground">
              {searchQuery 
                ? `No results found for "${searchQuery}". Try a different search term.`
                : "There are no team members to display. Try refreshing the page."}
            </p>
            {searchQuery && (
              <Button 
                variant="ghost" 
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-16 bg-gradient-to-r from-primary/20 to-primary/5">
                  <Avatar className="absolute bottom-0 translate-y-1/2 left-4 size-16 border-4 border-background">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
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
      )}
      
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Team Insights</CardTitle>
          <CardDescription>
            Overview of team health, productivity, and collaboration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="growth">Growth Trajectories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Team Size
                    </CardTitle>
                    <Users className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{teamMembers?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      Active team members
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Avg. Engagement
                    </CardTitle>
                    <TrendingUp className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {teamMembers?.length 
                        ? Math.round(teamMembers.reduce((sum, member) => sum + member.engagementScore, 0) / teamMembers.length) 
                        : 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Team engagement score
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Promotion Ready
                    </CardTitle>
                    <CheckCircle className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {teamMembers?.filter(member => member.readyForPromotion).length || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Team members ready for growth
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      At Risk
                    </CardTitle>
                    <Calendar className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {teamMembers?.filter(member => member.riskOfBurnout === "High").length || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Team members at high risk
                    </p>
                  </CardContent>
                </Card>
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