"use client";

import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  ArrowLeft,
  Award,
  Calendar,
  Check,
  ChevronUp,
  Clock,
  FileText,
  GitFork,
  GitPullRequest,
  Heart,
  LineChart,
  Mail,
  MailPlus,
  MessageSquare,
  Phone,
  Star,
  ThumbsUp,
  Timer,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";

// Mock team members data (same as in the people page)
const teamMembers = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Senior Product Manager",
    email: "sarah.chen@astralith.com",
    avatarUrl: "/avatars/sarah-chen.jpg",
    department: "Product",
    engagementScore: 92,
    productivityScore: 88,
    growthTrajectory: "rising",
    readyForPromotion: true,
    riskOfBurnout: "low",
    recentActivity: "Launched feature X",
    lastActiveHours: 2,
    projectContributions: [
      { project: "Mobile App Redesign", contribution: "Product Requirements" },
      { project: "Enterprise Tier", contribution: "Market Research" }
    ],
    strengths: ["Strategic thinking", "Cross-functional leadership", "Technical acumen"],
    areasForGrowth: ["Delegation", "Giving difficult feedback"],
    tags: ["Product Vision", "Customer Advocate", "Data-Driven"],
    // Additional details for profile page
    phone: "555-123-4567",
    location: "San Francisco, CA",
    timeZone: "PST (GMT-8)",
    joinDate: "2021-03-15",
    manager: "Alex Rivera",
    directReports: ["Jordan Patel", "Miguel Rodriguez"],
    skills: [
      { name: "Product Strategy", level: 95 },
      { name: "User Research", level: 87 },
      { name: "Roadmap Planning", level: 92 },
      { name: "Cross-functional Coordination", level: 89 },
      { name: "Technical Knowledge", level: 75 },
    ],
    recentFeedback: [
      {
        date: "2023-10-15",
        from: "Alex Rivera",
        content: "Great job leading the product launch. Your attention to detail and coordination across teams was exceptional.",
        type: "positive"
      },
      {
        date: "2023-09-28",
        from: "Dev Team",
        content: "The requirements documentation was incredibly helpful and clear. Made our job much easier.",
        type: "positive"
      },
      {
        date: "2023-09-10",
        from: "Marketing Team",
        content: "Could use more advance notice for feature announcements to better prepare marketing materials.",
        type: "improvement"
      }
    ],
    careerGoals: "Transition to Director of Product within the next 18 months, focusing on enterprise solutions.",
    meetingStats: {
      weeklyAverage: 22.5,
      changeFromLastMonth: -2.3,
      focusTimePercentage: 38,
      collaboration: 42,
      administrative: 20,
    },
    performanceReviews: [
      {
        period: "H1 2023",
        overallRating: 4.7,
        highestAreas: ["Product Strategy", "Cross-functional Leadership"],
        developmentAreas: ["Team Mentorship", "Process Documentation"],
      },
      {
        period: "H2 2022",
        overallRating: 4.5,
        highestAreas: ["Product Vision", "Customer Empathy"],
        developmentAreas: ["Delegation", "Technical Documentation"],
      }
    ]
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Lead Developer",
    email: "marcus.johnson@astralith.com",
    avatarUrl: "/avatars/marcus-johnson.jpg",
    department: "Engineering",
    engagementScore: 78,
    productivityScore: 95,
    growthTrajectory: "steady",
    readyForPromotion: false,
    riskOfBurnout: "medium",
    recentActivity: "Refactored authentication system",
    lastActiveHours: 1,
    projectContributions: [
      { project: "Authentication System", contribution: "Lead Developer" },
      { project: "API Optimization", contribution: "Technical Design" }
    ],
    strengths: ["Code quality", "System architecture", "Technical documentation"],
    areasForGrowth: ["Mentoring junior devs", "Cross-team communication"],
    tags: ["Technical Leader", "Code Quality", "Backend Expert"],
    // Additional details for profile page
    phone: "555-987-6543",
    location: "Seattle, WA",
    timeZone: "PST (GMT-8)",
    joinDate: "2020-08-10",
    manager: "Priya Sharma",
    directReports: ["Chris Williams", "Latasha Brown", "Kai Nagata"],
    skills: [
      { name: "Backend Development", level: 96 },
      { name: "System Architecture", level: 94 },
      { name: "Code Review", level: 90 },
      { name: "API Design", level: 92 },
      { name: "DevOps", level: 75 },
    ],
    recentFeedback: [
      {
        date: "2023-10-12",
        from: "Priya Sharma",
        content: "Your authentication system refactoring was excellent. Clean code and perfect documentation.",
        type: "positive"
      },
      {
        date: "2023-09-20",
        from: "Junior Dev Team",
        content: "Marcus could provide more context when rejecting PRs. Sometimes it's hard to understand what needs to be fixed.",
        type: "improvement"
      },
      {
        date: "2023-09-05",
        from: "Product Team",
        content: "Thanks for helping us understand the technical constraints so clearly in the planning meeting.",
        type: "positive"
      }
    ],
    careerGoals: "Move into a Tech Lead or Architect role with broader system responsibilities.",
    meetingStats: {
      weeklyAverage: 14.2,
      changeFromLastMonth: 1.5,
      focusTimePercentage: 65,
      collaboration: 25,
      administrative: 10,
    },
    performanceReviews: [
      {
        period: "H1 2023",
        overallRating: 4.8,
        highestAreas: ["Technical Excellence", "Problem Solving"],
        developmentAreas: ["Team Management", "Knowledge Sharing"],
      },
      {
        period: "H2 2022",
        overallRating: 4.6,
        highestAreas: ["Code Quality", "System Design"],
        developmentAreas: ["Cross-team Communication", "Mentorship"],
      }
    ]
  },
  {
    id: "3",
    name: "Aisha Patel",
    role: "UI/UX Designer",
    email: "aisha.patel@astralith.com",
    avatarUrl: "/avatars/aisha-patel.jpg",
    department: "Design",
    engagementScore: 85,
    productivityScore: 82,
    growthTrajectory: "rising",
    readyForPromotion: false,
    riskOfBurnout: "low",
    recentActivity: "Created design system",
    lastActiveHours: 4,
    projectContributions: [
      { project: "Design System", contribution: "Lead Designer" },
      { project: "Mobile App Redesign", contribution: "UI Mockups" }
    ],
    strengths: ["Visual design", "User research", "Design systems"],
    areasForGrowth: ["Interaction design", "Design leadership"],
    tags: ["Creative", "User Advocate", "Design Systems"],
    // Additional details for profile page
    phone: "555-234-5678",
    location: "New York, NY",
    timeZone: "EST (GMT-5)",
    joinDate: "2021-10-05",
    manager: "David Kim",
    directReports: [],
    skills: [
      { name: "UI Design", level: 92 },
      { name: "Design Systems", level: 90 },
      { name: "User Research", level: 85 },
      { name: "Prototyping", level: 88 },
      { name: "Visual Communication", level: 94 },
    ],
    recentFeedback: [
      {
        date: "2023-10-18",
        from: "David Kim",
        content: "The design system you created has dramatically improved our consistency and development speed.",
        type: "positive"
      },
      {
        date: "2023-10-02",
        from: "Dev Team",
        content: "Designs are beautiful but sometimes challenging to implement in the timeframe. More technical consultation would help.",
        type: "improvement"
      },
      {
        date: "2023-09-15",
        from: "Product Team",
        content: "Your user research insights were invaluable for our feature prioritization.",
        type: "positive"
      }
    ],
    careerGoals: "Grow into a Design Lead role and expand our design system into a comprehensive brand language.",
    meetingStats: {
      weeklyAverage: 18.3,
      changeFromLastMonth: -1.2,
      focusTimePercentage: 45,
      collaboration: 40,
      administrative: 15,
    },
    performanceReviews: [
      {
        period: "H1 2023",
        overallRating: 4.5,
        highestAreas: ["Visual Design", "Design Systems"],
        developmentAreas: ["Technical Feasibility", "Leadership"],
      },
      {
        period: "H2 2022",
        overallRating: 4.3,
        highestAreas: ["Creativity", "User Empathy"],
        developmentAreas: ["Documentation", "Cross-functional Communication"],
      }
    ]
  }
];

export default function PersonProfilePage() {
  const params = useParams();
  const personId = params.id as string;
  
  // Find the person with the matching ID
  const person = teamMembers.find(member => member.id === personId);
  
  // If person not found, show error
  if (!person) {
    return (
      <div className="container mx-auto py-10">
        <Link href="/people" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="mr-2 size-4" />
          Back to team
        </Link>
        <div className="flex flex-col items-center justify-center py-20">
          <XCircle className="size-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold">Person Not Found</h1>
          <p className="text-muted-foreground mt-2">The team member you're looking for doesn't exist or has been removed.</p>
          <div className="mt-6">
            <Link href="/people" className="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium shadow-xs hover:bg-primary/90">
              View All Team Members
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Function to render rating stars
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const maxStars = 5;
    
    return (
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="size-4 fill-primary text-primary" />
        ))}
        {hasHalfStar && (
          <Star className="size-4 text-primary" />
        )}
        {Array.from({ length: maxStars - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
          <Star key={`empty-${i}`} className="size-4 text-muted-foreground" />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Link href="/people" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-2 size-4" />
        Back to team
      </Link>
      
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="size-24 border-4 border-background shadow-lg">
          <AvatarImage src={person.avatarUrl} alt={person.name} />
          <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h1 className="text-3xl font-bold">{person.name}</h1>
            <Badge variant="outline" className="w-fit">{person.department}</Badge>
          </div>
          
          <div className="text-xl text-muted-foreground">{person.role}</div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {person.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center text-sm">
              <Mail className="mr-2 size-4 text-muted-foreground" />
              <a href={`mailto:${person.email}`} className="hover:underline">{person.email}</a>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="mr-2 size-4 text-muted-foreground" />
              <span>{person.phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 size-4 text-muted-foreground" />
              <span>{person.timeZone}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 size-4 text-muted-foreground" />
              <span>Joined {formatDate(person.joinDate)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 self-start">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 size-4" />
            Schedule Meeting
          </Button>
          <Button size="sm">
            <MailPlus className="mr-2 size-4" />
            Message
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="bg-background border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="skills">Skills & Development</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Engagement & Productivity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Engagement</div>
                      <div className="text-sm text-muted-foreground">{person.engagementScore}%</div>
                    </div>
                    <Progress value={person.engagementScore} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Productivity</div>
                      <div className="text-sm text-muted-foreground">{person.productivityScore}%</div>
                    </div>
                    <Progress value={person.productivityScore} className="h-2" />
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`p-1 rounded-full ${person.riskOfBurnout === 'high' ? 'bg-red-100 text-red-600' : person.riskOfBurnout === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                        {person.riskOfBurnout === 'high' ? (
                          <Activity className="size-3" />
                        ) : person.riskOfBurnout === 'medium' ? (
                          <Activity className="size-3" />
                        ) : (
                          <Heart className="size-3" />
                        )}
                      </div>
                      <span>
                        {person.riskOfBurnout === 'high' 
                          ? 'High risk of burnout' 
                          : person.riskOfBurnout === 'medium' 
                            ? 'Medium risk of burnout' 
                            : 'Low risk of burnout'}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      {person.growthTrajectory === 'rising' ? (
                        <>
                          <div className="p-1 rounded-full bg-green-100 text-green-600">
                            <TrendingUp className="size-3" />
                          </div>
                          <span>Rising trajectory</span>
                        </>
                      ) : person.growthTrajectory === 'declining' ? (
                        <>
                          <div className="p-1 rounded-full bg-red-100 text-red-600">
                            <TrendingUp className="size-3 rotate-180" />
                          </div>
                          <span>Declining trajectory</span>
                        </>
                      ) : (
                        <>
                          <div className="p-1 rounded-full bg-blue-100 text-blue-600">
                            <ChevronUp className="size-3 rotate-90" />
                          </div>
                          <span>Steady trajectory</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {person.readyForPromotion && (
                    <div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="p-1 rounded-full bg-purple-100 text-purple-600">
                          <Award className="size-3" />
                        </div>
                        <span>Ready for promotion</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Team & Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Reports to</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-8">
                        <AvatarFallback>{person.manager.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{person.manager}</div>
                      </div>
                    </div>
                  </div>
                  
                  {person.directReports.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-1">Direct Reports ({person.directReports.length})</div>
                      <div className="space-y-2">
                        {person.directReports.map(report => (
                          <div key={report} className="flex items-center gap-2">
                            <Avatar className="size-6">
                              <AvatarFallback>{report.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">{report}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <div className="text-sm font-medium mb-1">Project Contributions</div>
                    <div className="space-y-2">
                      {person.projectContributions.map((contribution, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="p-1 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                            <GitFork className="size-3" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">{contribution.project}</div>
                            <div className="text-xs text-muted-foreground">{contribution.contribution}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Meeting & Focus Time Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-2xl font-bold">{person.meetingStats.weeklyAverage}</div>
                      <div className="text-sm text-muted-foreground">Weekly meetings</div>
                    </div>
                    <div className={`text-sm ${person.meetingStats.changeFromLastMonth < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {person.meetingStats.changeFromLastMonth < 0 ? '↓' : '↑'} {Math.abs(person.meetingStats.changeFromLastMonth)} from last month
                    </div>
                  </div>
                  
                  <div className="pt-1">
                    <div className="text-sm font-medium mb-1">Time allocation</div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs">Focus time</div>
                          <div className="text-xs text-muted-foreground">{person.meetingStats.focusTimePercentage}%</div>
                        </div>
                        <Progress 
                          value={person.meetingStats.focusTimePercentage} 
                          className="h-1 bg-green-100" 
                          style={{ '--progress-fill': 'var(--green-600)' } as React.CSSProperties}
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs">Collaboration</div>
                          <div className="text-xs text-muted-foreground">{person.meetingStats.collaboration}%</div>
                        </div>
                        <Progress 
                          value={person.meetingStats.collaboration} 
                          className="h-1 bg-blue-100" 
                          style={{ '--progress-fill': 'var(--blue-600)' } as React.CSSProperties}
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs">Administrative</div>
                          <div className="text-xs text-muted-foreground">{person.meetingStats.administrative}%</div>
                        </div>
                        <Progress 
                          value={person.meetingStats.administrative} 
                          className="h-1 bg-purple-100" 
                          style={{ '--progress-fill': 'var(--purple-600)' } as React.CSSProperties}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Timer className="size-3.5" />
                      Last active {person.lastActiveHours} {person.lastActiveHours === 1 ? 'hour' : 'hours'} ago
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Strengths & Growth Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Key strengths</div>
                    <div className="space-y-1.5">
                      {person.strengths.map((strength, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="p-1 rounded-full bg-green-100 text-green-600">
                            <Check className="size-3" />
                          </div>
                          <div className="text-sm">{strength}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Areas for growth</div>
                    <div className="space-y-1.5">
                      {person.areasForGrowth.map((area, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="p-1 rounded-full bg-blue-100 text-blue-600">
                            <TrendingUp className="size-3" />
                          </div>
                          <div className="text-sm">{area}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-1">
                    <div className="text-sm font-medium mb-1">Career goals</div>
                    <div className="text-sm bg-muted p-2 rounded-md">
                      {person.careerGoals}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {person.performanceReviews.map((review, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{review.period} Performance</CardTitle>
                    {renderRatingStars(review.overallRating)}
                  </div>
                  <CardDescription>
                    Overall rating: {review.overallRating} / 5
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Highest rated areas</div>
                    <div className="space-y-1">
                      {review.highestAreas.map((area, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="p-1 rounded-full bg-green-100 text-green-600">
                            <ThumbsUp className="size-3" />
                          </div>
                          <div className="text-sm">{area}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Development areas</div>
                    <div className="space-y-1">
                      {review.developmentAreas.map((area, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="p-1 rounded-full bg-amber-100 text-amber-600">
                            <LineChart className="size-3" />
                          </div>
                          <div className="text-sm">{area}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Key performance indicators over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center bg-muted/40 rounded-md border border-dashed">
                  <div className="text-center">
                    <FileText className="size-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Performance chart visualization would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>
                  Feedback received in the last 90 days
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {person.recentFeedback.map((feedback, i) => (
                  <div key={i} className="border-b pb-5 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-full mt-0.5 ${feedback.type === 'positive' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                        {feedback.type === 'positive' ? (
                          <ThumbsUp className="size-4" />
                        ) : (
                          <LineChart className="size-4" />
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{feedback.from}</span>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(feedback.date)}
                          </span>
                          <Badge variant={feedback.type === 'positive' ? 'outline' : 'secondary'} className="ml-auto text-xs">
                            {feedback.type === 'positive' ? 'Positive' : 'Growth Area'}
                          </Badge>
                        </div>
                        <p className="text-sm">{feedback.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Peer Recognition</CardTitle>
                <CardDescription>
                  Recognition from colleagues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 w-full flex items-center justify-center bg-muted/40 rounded-md border border-dashed">
                  <div className="text-center">
                    <Users className="size-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Peer recognition would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
                <CardDescription>
                  Technical and soft skills evaluation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {person.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">{skill.name}</div>
                      <div className="text-sm text-muted-foreground">{skill.level}%</div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Development Plan</CardTitle>
                <CardDescription>
                  Growth and learning opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Award className="size-4 text-purple-600" />
                      <div className="font-medium">Leadership Skills</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {person.areasForGrowth.includes("Leadership") ? 
                        `Focus on developing leadership capabilities through mentoring juniors and leading small projects.` :
                        `Continue to cultivate leadership skills through cross-team initiatives.`}
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center gap-2 mb-1.5">
                      <GitPullRequest className="size-4 text-blue-600" />
                      <div className="font-medium">Technical Growth</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Deepen expertise in {person.department === "Engineering" ? "system architecture and emerging technologies" : 
                        person.department === "Design" ? "interaction design and user research methodologies" : 
                        "strategic planning and market analysis"}
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center gap-2 mb-1.5">
                      <MessageSquare className="size-4 text-amber-600" />
                      <div className="font-medium">Communication</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {person.areasForGrowth.includes("Cross-team communication") || person.areasForGrowth.includes("Cross-functional communication") ? 
                        `Improve cross-functional communication by participating in more collaborative projects.` :
                        `Enhance communication skills through presentations and documentation.`}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Learning & Certifications</CardTitle>
              <CardDescription>
                Completed and in-progress learning resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 w-full flex items-center justify-center bg-muted/40 rounded-md border border-dashed">
                <div className="text-center">
                  <FileText className="size-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Learning and certification data would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 