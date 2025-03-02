"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, Award, Calendar, Clock, TrendingUp, RefreshCw, AlertCircle, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { getLatestDigest, getTeamDigests, getTeamMetrics } from "@/api/pulse.api";
import { PulseDigest } from "@/components/PulseDigest";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

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
  const teamId = "team_1"; // In a real app, this would come from auth context or URL
  
  // Get latest pulse digest using React Query
  const { 
    data: pulseData, 
    isLoading: isLoadingPulse, 
    isError: isPulseError,
    error: pulseError
  } = useQuery({
    queryKey: ['pulse', teamId, 'latest', 'daily'],
    queryFn: () => getLatestDigest(teamId, 'daily'),
  });
  
  // Get team metrics using React Query
  const {
    data: metricsData,
    isLoading: isLoadingMetrics,
    isError: isMetricsError
  } = useQuery({
    queryKey: ['pulse', teamId, 'metrics'],
    queryFn: () => getTeamMetrics(teamId),
  });
  
  // Extract insights and metrics from the data
  const insights = pulseData?.digest?.insights || [];
  const metrics = pulseData?.digest?.metrics || {
    collaborationScore: 0,
    productivityScore: 0,
    moraleScore: 0,
    wellnessScore: 0
  };
  
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

  // If data is loading, show loading state
  if (isLoadingPulse || isLoadingMetrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="size-10 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading pulse data...</p>
        </div>
      </div>
    );
  }

  // If there's an error, show error state
  if (isPulseError || isMetricsError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="size-10 mx-auto mb-4 text-destructive" />
          <p className="text-muted-foreground">Error loading pulse data</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pulse Dashboard</h1>
          <p className="text-muted-foreground">Team health and performance insights for {today}</p>
        </div>
      </div>

      {/* Rest of the component remains unchanged */}
      
      {/* Or you can simply use the PulseDigest component */}
      <PulseDigest teamId={teamId} />
    </div>
  );
} 