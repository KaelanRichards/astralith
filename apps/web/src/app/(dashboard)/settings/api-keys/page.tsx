import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Check,
  Copy,
  FileText,
  Key,
  RefreshCw,
  Trash2,
  Clock,
  Shield,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

// Mock API keys data
const mockApiKeys = [
  {
    id: "key_1",
    name: "Development API Key",
    prefix: "astl_dev_",
    suffix: "cPQ78R",
    createdAt: "2023-07-15T09:30:00Z",
    lastUsed: "2023-09-28T14:22:35Z",
    permissions: ["read:data", "write:data"],
    status: "active",
  },
  {
    id: "key_2",
    name: "Production API Key",
    prefix: "astl_prod_",
    suffix: "kLM56T",
    createdAt: "2023-08-02T11:45:00Z",
    lastUsed: "2023-09-29T09:15:22Z",
    permissions: ["read:data"],
    status: "active",
  },
  {
    id: "key_3",
    name: "Test Environment",
    prefix: "astl_test_",
    suffix: "jN34Px",
    createdAt: "2023-09-10T16:20:00Z",
    lastUsed: null,
    permissions: ["read:data", "write:data", "delete:data"],
    status: "inactive",
  },
];

export default function ApiKeysPage() {
  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
        <p className="text-muted-foreground">
          Manage API keys for accessing Astralith programmatically
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create API Key</CardTitle>
          <CardDescription>
            Generate a new API key for programmatic access to Astralith
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="api-key-name">API Key Name</Label>
              <Input id="api-key-name" placeholder="E.g., Development API Key" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key-type">API Key Type</Label>
              <Select defaultValue="development">
                <SelectTrigger id="api-key-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="test">Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="read-permission" className="text-base">Read Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Allows fetching data from the API
                  </p>
                </div>
                <Switch id="read-permission" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="write-permission" className="text-base">Write Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Allows creating and updating data
                  </p>
                </div>
                <Switch id="write-permission" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="delete-permission" className="text-base">Delete Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Allows deleting data from the API
                  </p>
                </div>
                <Switch id="delete-permission" />
              </div>
              <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="admin-permission" className="text-base">Admin Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Allows performing administrative operations
                  </p>
                </div>
                <Switch id="admin-permission" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button>
              <Key className="mr-2 size-4" />
              Generate API Key
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            Manage your existing API keys and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockApiKeys.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Key className="size-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No API Keys</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You haven't created any API keys yet. Generate your first API key above.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApiKeys.map((apiKey) => (
                    <TableRow key={apiKey.id}>
                      <TableCell>
                        <div className="font-medium">{apiKey.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Created {formatDate(apiKey.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                          {apiKey.prefix}•••••••{apiKey.suffix}
                        </code>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                                <Copy className="size-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy API key</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        {apiKey.status === "active" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-100 text-slate-500 hover:bg-slate-100">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {apiKey.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {apiKey.lastUsed ? (
                          <div className="flex items-center text-sm">
                            <Clock className="mr-1 size-3 text-muted-foreground" />
                            <span>
                              {formatDate(apiKey.lastUsed)}
                              <span className="text-xs text-muted-foreground"> at {formatTime(apiKey.lastUsed)}</span>
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Never used</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <RefreshCw className="size-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Regenerate key</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Shield className="size-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit permissions</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                  <Trash2 className="size-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Revoke key</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            Learn how to use the Astralith API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <FileText className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-medium">API Reference</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive documentation of all available API endpoints and parameters.
              </p>
              <Button variant="link" className="h-auto p-0 text-sm">
                View API Reference
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <AlertCircle className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-medium">Security Best Practices</h3>
              <p className="text-sm text-muted-foreground">
                Learn how to securely use API keys and protect your Astralith data.
              </p>
              <Button variant="link" className="h-auto p-0 text-sm">
                Read Security Guide
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Check className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-medium">Code Examples</h3>
              <p className="text-sm text-muted-foreground">
                Sample code in various languages to help you get started quickly.
              </p>
              <Button variant="link" className="h-auto p-0 text-sm">
                Browse Examples
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 