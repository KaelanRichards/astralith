"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { getTeamIntegrations } from "@/api/integrations.api";
import {
  AlertCircle,
  Check,
  ChevronRight,
  ExternalLink,
  File,
  GitBranchIcon,
  Info,
  MessageSquare,
  PlusCircle,
  RefreshCw,
  Settings,
  Trash2,
  Upload,
  FileText,
  Package,
  Link as LinkIcon,
  Calendar
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Type definitions for better TypeScript support
type ConnectionInfo = {
  workspace?: string;
  connectedChannels?: string[];
  organization?: string;
  repositories?: string[];
  account?: string;
  calendars?: string[];
  connectedAt: string;
};

type Integration = {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: "connected" | "disconnected";
  connectionInfo?: ConnectionInfo;
  category: string;
};

// Available integrations that can be added
const availableIntegrations = [
  {
    id: "jira",
    name: "Jira",
    description: "Track issues and manage projects.",
    icon: "/icons/jira.svg",
    category: "development",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Connect with your team's knowledge base.",
    icon: "/icons/notion.svg",
    category: "productivity",
  },
  {
    id: "figma",
    name: "Figma",
    description: "Access design files and collaborate with designers.",
    icon: "/icons/figma.svg",
    category: "design",
  },
  {
    id: "linear",
    name: "Linear",
    description: "Project management for software teams.",
    icon: "/icons/linear.svg",
    category: "development",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect with thousands of apps and automate workflows.",
    icon: "/icons/zapier.svg",
    category: "automation",
  },
  {
    id: "asana",
    name: "Asana",
    description: "Manage team projects and tasks.",
    icon: "/icons/asana.svg",
    category: "productivity",
  },
];

// Categorize integrations
const categories = [
  { id: "all", name: "All Integrations" },
  { id: "connected", name: "Connected" },
  { id: "development", name: "Development" },
  { id: "communication", name: "Communication" },
  { id: "productivity", name: "Productivity" },
  { id: "design", name: "Design" },
  { id: "automation", name: "Automation" },
];

// Function to transform API integration data to our UI format
const transformIntegrationData = (apiIntegrations: any[]): Integration[] => {
  if (!apiIntegrations) return [];
  
  return apiIntegrations.map((integration) => {
    // Extract data from config based on integration type
    const config = integration.config || {};
    
    let mappedIntegration: Integration = {
      id: integration.id,
      name: integration.name,
      description: getDescriptionForType(integration.type),
      icon: `/icons/${integration.type}.svg`,
      status: integration.active ? "connected" : "disconnected",
      category: getCategoryForType(integration.type),
    };
    
    // Add connection info if active
    if (integration.active) {
      switch (integration.type) {
        case "slack":
          mappedIntegration.connectionInfo = {
            workspace: config.workspace || "Unknown workspace",
            connectedChannels: config.channels || [],
            connectedAt: integration.createdAt || new Date().toISOString(),
          };
          break;
        case "github":
          mappedIntegration.connectionInfo = {
            organization: config.organization || "Unknown organization",
            repositories: config.repositories || [],
            connectedAt: integration.createdAt || new Date().toISOString(),
          };
          break;
        case "calendar":
          mappedIntegration.connectionInfo = {
            account: config.account || "Unknown account",
            calendars: config.calendars || [],
            connectedAt: integration.createdAt || new Date().toISOString(),
          };
          break;
        default:
          mappedIntegration.connectionInfo = {
            connectedAt: integration.createdAt || new Date().toISOString(),
          };
      }
    }
    
    return mappedIntegration;
  });
};

// Helper functions for transforming integration data
const getDescriptionForType = (type: string): string => {
  switch (type) {
    case "slack":
      return "Send notifications and updates to Slack channels.";
    case "github":
      return "Link repositories and track code changes.";
    case "linear":
      return "Project management for software teams.";
    case "calendar":
      return "Sync events and schedule meetings.";
    case "hr":
      return "Connect with your HR system.";
    default:
      return "Connect with your team's tools.";
  }
};

const getCategoryForType = (type: string): string => {
  switch (type) {
    case "slack":
      return "communication";
    case "github":
    case "linear":
      return "development";
    case "calendar":
      return "productivity";
    case "hr":
      return "productivity";
    default:
      return "productivity";
  }
};

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  // Temporary hardcoded team ID - in a real app this would come from auth context or similar
  const teamId = "team_1";
  
  // Fetch integrations data from API
  const { data: apiIntegrations, isLoading, error } = useQuery({
    queryKey: ['integrations', teamId],
    queryFn: () => getTeamIntegrations(teamId),
  });
  
  // Transform API data to our UI format
  const integrations = apiIntegrations ? transformIntegrationData(apiIntegrations) : [];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter integrations based on selected category and search query
  const filteredIntegrations = integrations.filter((integration) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "connected" && integration.status === "connected") ||
      integration.category === selectedCategory;
    
    const matchesSearch =
      searchQuery === "" ||
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Get category-specific icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "development":
        return <GitBranchIcon className="size-4" />;
      case "communication":
        return <MessageSquare className="size-4" />;
      case "productivity":
        return <Calendar className="size-4" />;
      case "design":
        return <FileText className="size-4" />;
      case "automation":
        return <RefreshCw className="size-4" />;
      default:
        return <Package className="size-4" />;
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="size-10 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading integrations...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="size-10 mx-auto mb-4 text-destructive" />
          <p className="text-muted-foreground">Error loading integrations</p>
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
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">
          Connect Astralith with your favorite tools and services
        </p>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {getCategoryIcon(category.id)}
                    <span className="ml-2">{category.name}</span>
                    {category.id === "connected" && (
                      <Badge className="ml-auto" variant="secondary">
                        {integrations.filter(i => i.status === "connected").length}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-3/4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search integrations..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 size-4" />
                  Add Integration
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Integration</DialogTitle>
                  <DialogDescription>
                    Connect Astralith with additional third-party services
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableIntegrations.map((integration) => (
                    <Card key={integration.id} className="cursor-pointer hover:bg-accent/50">
                      <CardContent className="p-4 flex items-center">
                        <div className="w-10 h-10 rounded-md bg-accent flex items-center justify-center mr-3">
                          {/* Placeholder for integration icon */}
                          <Package className="size-5 text-primary" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <h4 className="text-sm font-medium">{integration.name}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {integration.description}
                          </p>
                        </div>
                        <ChevronRight className="size-4 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredIntegrations.length === 0 ? (
              <div className="col-span-2 flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <LinkIcon className="size-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No integrations found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery 
                    ? "No integrations match your search criteria."
                    : "No integrations in this category."}
                </p>
                <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
                  <PlusCircle className="mr-2 size-4" />
                  Add Integration
                </Button>
              </div>
            ) : (
              filteredIntegrations.map((integration) => (
                <Card key={integration.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-xl flex items-center">
                        {/* Placeholder for integration icon */}
                        <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center mr-2">
                          <Package className="size-4 text-primary" />
                        </div>
                        {integration.name}
                        {integration.status === "connected" && (
                          <Badge className="ml-2" variant="outline">
                            Connected
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {integration.status === "connected" ? (
                        <Switch defaultChecked id={`${integration.id}-toggle`} />
                      ) : (
                        <Button size="sm" variant="outline">Connect</Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {integration.status === "connected" && integration.connectionInfo && (
                      <div className="space-y-3">
                        <div className="text-sm">
                          <span className="font-medium">Connected since:</span>{" "}
                          {formatDate(integration.connectionInfo.connectedAt)}
                        </div>
                        
                        {integration.id === "slack" && integration.connectionInfo?.connectedChannels && (
                          <>
                            <div className="text-sm">
                              <span className="font-medium">Workspace:</span>{" "}
                              {integration.connectionInfo.workspace}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Channels:</span>{" "}
                              {integration.connectionInfo.connectedChannels.join(", ")}
                            </div>
                          </>
                        )}
                        
                        {integration.id === "github" && integration.connectionInfo?.repositories && (
                          <>
                            <div className="text-sm">
                              <span className="font-medium">Organization:</span>{" "}
                              {integration.connectionInfo.organization}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Repositories:</span>{" "}
                              {integration.connectionInfo.repositories.join(", ")}
                            </div>
                          </>
                        )}
                        
                        {integration.id === "google-calendar" && integration.connectionInfo?.calendars && (
                          <>
                            <div className="text-sm">
                              <span className="font-medium">Account:</span>{" "}
                              {integration.connectionInfo.account}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Calendars:</span>{" "}
                              {integration.connectionInfo.calendars.join(", ")}
                            </div>
                          </>
                        )}
                        
                        <div className="flex space-x-2 pt-1">
                          <Button size="sm" variant="ghost">
                            <Settings className="mr-1.5 size-3.5" />
                            Settings
                          </Button>
                          <Button size="sm" variant="ghost">
                            <RefreshCw className="mr-1.5 size-3.5" />
                            Reconnect
                          </Button>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="sm" variant="ghost" className="text-red-500">
                                  <Trash2 className="mr-1.5 size-3.5" />
                                  Disconnect
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>This will remove the integration</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    )}
                    
                    {integration.status !== "connected" && (
                      <div className="py-2">
                        <p className="text-sm text-muted-foreground">
                          Connect your {integration.name} account to enable integration with Astralith.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Custom Integrations</CardTitle>
              <CardDescription>
                Build custom integrations with our API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <File className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Webhooks</h3>
                  <p className="text-sm text-muted-foreground">
                    Create custom webhooks to trigger actions in your systems.
                  </p>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    Configure Webhooks <ExternalLink className="ml-1 size-3" />
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Upload className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Import/Export</h3>
                  <p className="text-sm text-muted-foreground">
                    Import data from other services or export your Astralith data.
                  </p>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    Data Import/Export Tools <ExternalLink className="ml-1 size-3" />
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Info className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Integration Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Need help with integrations? Contact our support team.
                  </p>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    Contact Support <ExternalLink className="ml-1 size-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Search icon component
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
} 