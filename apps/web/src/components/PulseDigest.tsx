"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, Clock, TrendingDown, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from './ui/use-toast';
import { getLatestDigest, generateDailyDigest, generateWeeklyDigest } from '@/api/pulse.api';

interface Insight {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  source: string;
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed';
}

interface DigestMetrics {
  collaborationScore: number;
  productivityScore: number;
  moraleScore: number;
  wellnessScore: number;
  trends?: {
    collaboration: string;
    productivity: string;
    morale: string;
    wellness: string;
  };
  highlights?: string[];
  weeklyTrends?: {
    collaboration: string;
    productivity: string;
    morale: string;
    wellness: string;
  };
  keyAccomplishments?: string[];
  areasForImprovement?: string[];
}

interface PulseDigest {
  id: string;
  teamId: string;
  date: string;
  type: 'daily' | 'weekly';
  insights: {
    high: string[];
    medium: string[];
    low: string[];
  };
  metrics: DigestMetrics;
}

interface PulseDigestProps {
  teamId: string;
}

export function PulseDigest({ teamId }: PulseDigestProps) {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');
  const [digest, setDigest] = useState<PulseDigest | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const fetchLatestDigest = async (type: 'daily' | 'weekly') => {
    setLoading(true);
    try {
      const data = await getLatestDigest(teamId, type);
      if (data.digest) {
        setDigest(data.digest);
        
        // Fetch insights referenced in the digest
        if (data.digest) {
          const allInsightIds = [
            ...data.digest.insights.high,
            ...data.digest.insights.medium,
            ...data.digest.insights.low
          ];
          
          if (allInsightIds.length > 0) {
            // This would be a real API call in production
            // For now, we'll mock some insights
            const mockInsights = allInsightIds.map((id: string, index: number) => ({
              id,
              title: `Insight ${index + 1}`,
              description: `This is a mock insight description for ${id}`,
              priority: index < 2 ? 'high' : (index < 5 ? 'medium' : 'low'),
              source: ['Slack', 'GitHub', 'Linear', 'Calendar', 'HR'][index % 5],
              status: 'active'
            }));
            setInsights(mockInsights as Insight[]);
          }
        }
      } else {
        // If no digest found, set to null
        setDigest(null);
        setInsights([]);
      }
    } catch (error) {
      console.error('Error fetching digest:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch the latest digest',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateDigest = async (type: 'daily' | 'weekly') => {
    setGenerating(true);
    try {
      let data;
      if (type === 'daily') {
        data = await generateDailyDigest(teamId);
      } else {
        data = await generateWeeklyDigest(teamId);
      }
      
      if (data.digest) {
        setDigest(data.digest);
        toast({
          title: 'Success',
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} digest generated successfully`,
        });
        
        // Fetch the insights after generating
        await fetchLatestDigest(type);
      } else {
        toast({
          title: 'Error',
          description: `Failed to generate ${type} digest`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error generating digest:', error);
      toast({
        title: 'Error',
        description: `Failed to generate ${type} digest`,
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (teamId) {
      fetchLatestDigest(activeTab);
    }
  }, [teamId, activeTab]);

  const renderTrendIcon = (trend: string) => {
    if (trend === 'increasing' || trend === 'strong') {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (trend === 'decreasing' || trend === 'needs improvement') {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return <Clock className="h-4 w-4 text-yellow-500" />;
  };

  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="default">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'acknowledged':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Pulse</h2>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'daily' | 'weekly')}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : digest ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {activeTab === 'daily' ? 'Daily' : 'Weekly'} Pulse Digest
                  </CardTitle>
                  <CardDescription>
                    {format(new Date(digest.date), 'PPP')}
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => generateDigest(activeTab)}
                  disabled={generating}
                >
                  {generating ? 'Generating...' : 'Regenerate'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Collaboration</span>
                    <span className="text-sm">{digest.metrics.collaborationScore}%</span>
                  </div>
                  <Progress value={digest.metrics.collaborationScore} />
                  {digest.metrics.trends && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      {renderTrendIcon(digest.metrics.trends.collaboration)}
                      <span className="ml-1 capitalize">{digest.metrics.trends.collaboration}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Productivity</span>
                    <span className="text-sm">{digest.metrics.productivityScore}%</span>
                  </div>
                  <Progress value={digest.metrics.productivityScore} />
                  {digest.metrics.trends && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      {renderTrendIcon(digest.metrics.trends.productivity)}
                      <span className="ml-1 capitalize">{digest.metrics.trends.productivity}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Morale</span>
                    <span className="text-sm">{digest.metrics.moraleScore}%</span>
                  </div>
                  <Progress value={digest.metrics.moraleScore} />
                  {digest.metrics.trends && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      {renderTrendIcon(digest.metrics.trends.morale)}
                      <span className="ml-1 capitalize">{digest.metrics.trends.morale}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Wellness</span>
                    <span className="text-sm">{digest.metrics.wellnessScore}%</span>
                  </div>
                  <Progress value={digest.metrics.wellnessScore} />
                  {digest.metrics.trends && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      {renderTrendIcon(digest.metrics.trends.wellness)}
                      <span className="ml-1 capitalize">{digest.metrics.trends.wellness}</span>
                    </div>
                  )}
                </div>
              </div>

              {activeTab === 'daily' && digest.metrics.highlights && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Today's Highlights</h3>
                  <ul className="space-y-1">
                    {digest.metrics.highlights.map((highlight, index) => (
                      <li key={index} className="text-sm">• {highlight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'weekly' && (
                <>
                  {digest.metrics.keyAccomplishments && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Key Accomplishments</h3>
                      <ul className="space-y-1">
                        {digest.metrics.keyAccomplishments.map((item, index) => (
                          <li key={index} className="text-sm">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {digest.metrics.areasForImprovement && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Areas for Improvement</h3>
                      <ul className="space-y-1">
                        {digest.metrics.areasForImprovement.map((item, index) => (
                          <li key={index} className="text-sm">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Insights</h3>
            {insights.length > 0 ? (
              <div className="space-y-4">
                {insights.map((insight) => (
                  <Card key={insight.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-base">{insight.title}</CardTitle>
                          <div className="flex space-x-2">
                            {renderPriorityBadge(insight.priority)}
                            <Badge variant="secondary">{insight.source}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {renderStatusIcon(insight.status)}
                          <span className="ml-1 text-xs capitalize">{insight.status}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No insights available for this digest.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
            <p className="text-muted-foreground">No {activeTab} digest available for this team.</p>
            <Button onClick={() => generateDigest(activeTab)} disabled={generating}>
              {generating ? 'Generating...' : `Generate ${activeTab} digest`}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 