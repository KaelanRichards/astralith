import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArchiveIcon, 
  Calendar, 
  Clock, 
  FileText, 
  Filter, 
  Info, 
  LightbulbIcon, 
  Search, 
  Tag, 
  Target, 
  Users 
} from "lucide-react";

// Mock data for demonstration
const mockEvents = [
  {
    id: "evt_1",
    type: "decision",
    title: "Shift to microservices architecture",
    description: "The team decided to migrate from monolith to microservices to improve scalability.",
    date: "2023-06-15",
    participants: ["Jane Smith", "Mark Johnson", "Sarah Lee"],
    tags: ["Architecture", "Engineering", "Strategic"],
    outcomes: [
      "Improved scalability for high-traffic features",
      "Easier deployment and testing",
      "Better team ownership of code"
    ],
    context: "Customer complaints about slow performance during peak hours. Engineering team proposed microservices as a solution after research.",
    createdAt: "2023-06-15T12:30:00Z",
  },
  {
    id: "evt_2",
    type: "milestone",
    title: "1,000 paying customers",
    description: "The company reached 1,000 paying customers, a key growth milestone.",
    date: "2023-05-22",
    participants: ["Entire company"],
    tags: ["Growth", "Revenue", "Celebration"],
    outcomes: [
      "Achieved sustainable monthly revenue",
      "Validated product-market fit",
      "Enabled hiring plan activation"
    ],
    context: "Growth accelerated after the launch of the premium tier pricing model in April.",
    createdAt: "2023-05-22T10:15:00Z",
  },
  {
    id: "evt_3",
    type: "meeting",
    title: "Q2 Strategy Alignment",
    description: "Quarterly strategic planning meeting with all department heads.",
    date: "2023-04-03",
    participants: ["Executive team", "Department heads"],
    tags: ["Strategy", "Planning", "Quarterly"],
    outcomes: [
      "Defined Q2 OKRs for all departments",
      "Aligned on resource allocation",
      "Identified key risks and mitigation plans"
    ],
    context: "Following strong Q1 results, focus shifted to expansion and customer retention initiatives.",
    createdAt: "2023-04-03T09:00:00Z",
  },
  {
    id: "evt_4",
    type: "project",
    title: "Mobile App Launch",
    description: "Official launch of the company's first mobile application.",
    date: "2023-03-15",
    participants: ["Product team", "Engineering team", "Marketing team"],
    tags: ["Product", "Mobile", "Launch"],
    outcomes: [
      "5,000 downloads in first week",
      "4.6/5 average rating",
      "15% increase in user engagement"
    ],
    context: "User research indicated strong demand for mobile access. Project was prioritized in Q4 of previous year.",
    createdAt: "2023-03-15T16:45:00Z",
  },
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

export default function VaultPage() {
  // Get icon based on event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case "decision":
        return <LightbulbIcon className="size-4 text-amber-500" />;
      case "milestone":
        return <Target className="size-4 text-green-500" />;
      case "meeting":
        return <Users className="size-4 text-blue-500" />;
      case "project":
        return <FileText className="size-4 text-purple-500" />;
      default:
        return <Info className="size-4" />;
    }
  };
  
  // Get badge styling based on event type
  const getEventBadge = (type: string) => {
    switch (type) {
      case "decision":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">Decision</Badge>;
      case "milestone":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Milestone</Badge>;
      case "meeting":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Meeting</Badge>;
      case "project":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">Project</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vault</h1>
          <p className="text-muted-foreground">
            Searchable historical context for faster, more informed decisions
          </p>
        </div>
      </div>
      
      <div className="grid gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search decisions, milestones, meetings or keywords..." 
                className="pl-9 w-full" 
              />
            </div>
            
            <div className="flex items-center gap-2 flex-wrap mt-4">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="size-3" />
                <span>Filters</span>
              </Button>
              <Badge variant="secondary" className="gap-1 cursor-pointer">
                <span>Type: Decision</span>
                <span className="opacity-70">×</span>
              </Badge>
              <Badge variant="secondary" className="gap-1 cursor-pointer">
                <span>Date: Last 6 months</span>
                <span className="opacity-70">×</span>
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-4 md:grid-cols-1">
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="decisions">Decisions</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {mockEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className="mt-1">{getEventIcon(event.type)}</div>
                        <div>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {event.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div>
                        {getEventBadge(event.type)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="size-3" />
                          <span>{formatDate(event.date)}</span>
                          
                          <Clock className="size-3 ml-2" />
                          <span>{new Date(event.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          {event.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Context</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.context}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Outcomes</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {event.outcomes.map((outcome, index) => (
                            <li key={index}>{outcome}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="text-sm">
                        <span className="text-muted-foreground">Participants: </span> 
                        <span>{event.participants.join(", ")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 p-2 flex justify-end">
                    <Button variant="link" size="sm" className="h-8 text-xs">
                      View Full Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="decisions" className="space-y-4">
              {mockEvents.filter(event => event.type === "decision").map((event) => (
                <Card key={event.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className="mt-1">{getEventIcon(event.type)}</div>
                        <div>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {event.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div>
                        {getEventBadge(event.type)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="size-3" />
                          <span>{formatDate(event.date)}</span>
                          
                          <Clock className="size-3 ml-2" />
                          <span>{new Date(event.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          {event.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Context</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.context}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Outcomes</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {event.outcomes.map((outcome, index) => (
                            <li key={index}>{outcome}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="text-sm">
                        <span className="text-muted-foreground">Participants: </span> 
                        <span>{event.participants.join(", ")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 p-2 flex justify-end">
                    <Button variant="link" size="sm" className="h-8 text-xs">
                      View Full Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="milestones" className="space-y-4">
              {mockEvents.filter(event => event.type === "milestone").map((event) => (
                <Card key={event.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className="mt-1">{getEventIcon(event.type)}</div>
                        <div>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {event.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div>
                        {getEventBadge(event.type)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="size-3" />
                          <span>{formatDate(event.date)}</span>
                          
                          <Clock className="size-3 ml-2" />
                          <span>{new Date(event.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          {event.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Context</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.context}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Outcomes</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {event.outcomes.map((outcome, index) => (
                            <li key={index}>{outcome}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="text-sm">
                        <span className="text-muted-foreground">Participants: </span> 
                        <span>{event.participants.join(", ")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 p-2 flex justify-end">
                    <Button variant="link" size="sm" className="h-8 text-xs">
                      View Full Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="meetings" className="space-y-4">
              {mockEvents.filter(event => event.type === "meeting").map((event) => (
                <Card key={event.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className="mt-1">{getEventIcon(event.type)}</div>
                        <div>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {event.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div>
                        {getEventBadge(event.type)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="size-3" />
                          <span>{formatDate(event.date)}</span>
                          
                          <Clock className="size-3 ml-2" />
                          <span>{new Date(event.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          {event.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Context</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.context}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Outcomes</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {event.outcomes.map((outcome, index) => (
                            <li key={index}>{outcome}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="text-sm">
                        <span className="text-muted-foreground">Participants: </span> 
                        <span>{event.participants.join(", ")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 p-2 flex justify-end">
                    <Button variant="link" size="sm" className="h-8 text-xs">
                      View Full Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 