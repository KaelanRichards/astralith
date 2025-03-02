import { db, insights, eq } from "@repo/db";
import type { Insight, NewInsight } from "@repo/db";
import { logger } from "@repo/logs";
import { integrationService } from "../integrations/integrations.service";

type InsightType = "burnout" | "bottleneck" | "celebration" | "general";
type InsightPriority = "high" | "medium" | "low";
type InsightSource = "slack" | "linear" | "github" | "calendar" | "hr" | "system";
type InsightStatus = "active" | "acknowledged" | "resolved" | "dismissed";

export const insightService = {
  async createInsight(insight: NewInsight): Promise<Insight> {
    try {
      const result = await db.insert(insights).values(insight).returning();
      const newInsight = result[0];
      if (!newInsight) throw new Error("Failed to create insight");
      logger.info("Insight created", { insightId: newInsight.id, type: newInsight.type });
      return newInsight;
    } catch (error) {
      logger.error("Error creating insight", { error, insight });
      throw error;
    }
  },

  async getInsight(insightId: string): Promise<Insight | undefined> {
    try {
      const insight = await db.query.insights.findFirst({
        where: eq(insights.id, insightId),
      });
      return insight || undefined;
    } catch (error) {
      logger.error("Error getting insight", { error, insightId });
      throw error;
    }
  },

  async updateInsight(insightId: string, data: Partial<NewInsight>): Promise<Insight | undefined> {
    try {
      const result = await db
        .update(insights)
        .set(data)
        .where(eq(insights.id, insightId))
        .returning();
      
      return result[0];
    } catch (error) {
      logger.error("Error updating insight", { error, insightId });
      throw error;
    }
  },

  async deleteInsight(insightId: string): Promise<void> {
    try {
      await db.delete(insights).where(eq(insights.id, insightId));
    } catch (error) {
      logger.error("Error deleting insight", { error, insightId });
      throw error;
    }
  },

  async getTeamInsights(teamId: string): Promise<Insight[]> {
    try {
      return await db.query.insights.findMany({
        where: eq(insights.teamId, teamId),
      });
    } catch (error) {
      logger.error("Error getting team insights", { error, teamId });
      throw error;
    }
  },

  async getActiveTeamInsights(teamId: string): Promise<Insight[]> {
    try {
      return await db.query.insights.findMany({
        where: eq(insights.teamId, teamId),
        orderBy: (insights, { desc }) => [desc(insights.createdAt)],
      });
    } catch (error) {
      logger.error("Error getting active team insights", { error, teamId });
      throw error;
    }
  },

  async updateInsightStatus(insightId: string, status: InsightStatus): Promise<Insight | undefined> {
    try {
      return await this.updateInsight(insightId, { status });
    } catch (error) {
      logger.error("Error updating insight status", { error, insightId, status });
      throw error;
    }
  },

  // Methods for generating insights from different sources
  
  // Generate insights from Slack data
  async generateSlackInsights(teamId: string): Promise<Insight[]> {
    try {
      // Get Slack integration for the team
      const slackIntegration = await integrationService.getTeamIntegrationByType(teamId, "slack");
      
      if (!slackIntegration || !slackIntegration.active) {
        logger.info("Slack integration not found or inactive", { teamId });
        return [];
      }
      
      // In a real implementation, this would call the Slack API and analyze the data
      // For now, we'll generate some mock insights
      
      const mockInsights: NewInsight[] = [
        {
          teamId,
          title: "Potential burnout risk detected",
          description: "Team member Jane Smith has worked late hours for 5 consecutive days.",
          type: "burnout" as InsightType,
          priority: "high" as InsightPriority,
          source: "slack" as InsightSource,
          status: "active" as InsightStatus,
          data: {
            user: "Jane Smith",
            lateHours: 5,
            averageResponseTime: "10 minutes",
          },
        },
        {
          teamId,
          title: "Team celebration opportunity",
          description: "The team has successfully completed the Q2 objectives ahead of schedule.",
          type: "celebration" as InsightType,
          priority: "medium" as InsightPriority,
          source: "slack" as InsightSource,
          status: "active" as InsightStatus,
          data: {
            channel: "general",
            sentiment: "positive",
            keywords: ["completed", "ahead of schedule", "great work"],
          },
        },
      ];
      
      // Create the insights in the database
      const createdInsights = await Promise.all(
        mockInsights.map(insight => this.createInsight(insight))
      );
      
      return createdInsights;
    } catch (error) {
      logger.error("Error generating Slack insights", { error, teamId });
      throw error;
    }
  },
  
  // Generate insights from Linear data
  async generateLinearInsights(teamId: string): Promise<Insight[]> {
    try {
      // Get Linear integration for the team
      const linearIntegration = await integrationService.getTeamIntegrationByType(teamId, "linear");
      
      if (!linearIntegration || !linearIntegration.active) {
        logger.info("Linear integration not found or inactive", { teamId });
        return [];
      }
      
      // In a real implementation, this would call the Linear API and analyze the data
      // For now, we'll generate some mock insights
      
      const mockInsights: NewInsight[] = [
        {
          teamId,
          title: "Project bottleneck identified",
          description: "The authentication feature has been in review for over a week with no progress.",
          type: "bottleneck" as InsightType,
          priority: "medium" as InsightPriority,
          source: "linear" as InsightSource,
          status: "active" as InsightStatus,
          data: {
            project: "Authentication",
            status: "In Review",
            daysStuck: 7,
            assignee: "Mark Johnson",
          },
        },
        {
          teamId,
          title: "Sprint completion rate declining",
          description: "The team's sprint completion rate has decreased by 15% over the last three sprints.",
          type: "general" as InsightType,
          priority: "high" as InsightPriority,
          source: "linear" as InsightSource,
          status: "active" as InsightStatus,
          data: {
            currentCompletionRate: "65%",
            previousCompletionRate: "80%",
            trend: "declining",
          },
        },
      ];
      
      // Create the insights in the database
      const createdInsights = await Promise.all(
        mockInsights.map(insight => this.createInsight(insight))
      );
      
      return createdInsights;
    } catch (error) {
      logger.error("Error generating Linear insights", { error, teamId });
      throw error;
    }
  },
  
  // Generate insights from GitHub data
  async generateGithubInsights(teamId: string): Promise<Insight[]> {
    try {
      // Get GitHub integration for the team
      const githubIntegration = await integrationService.getTeamIntegrationByType(teamId, "github");
      
      if (!githubIntegration || !githubIntegration.active) {
        logger.info("GitHub integration not found or inactive", { teamId });
        return [];
      }
      
      // In a real implementation, this would call the GitHub API and analyze the data
      // For now, we'll generate some mock insights
      
      const mockInsights: NewInsight[] = [
        {
          teamId,
          title: "Pull request review bottleneck",
          description: "Several pull requests have been waiting for review for more than 3 days.",
          type: "bottleneck" as InsightType,
          priority: "high" as InsightPriority,
          source: "github" as InsightSource,
          status: "active" as InsightStatus,
          data: {
            pendingPRs: 5,
            oldestPR: "3 days",
            repository: "main-app",
          },
        },
        {
          teamId,
          title: "Code quality improvement",
          description: "Test coverage has increased by 10% in the last month.",
          type: "celebration" as InsightType,
          priority: "medium" as InsightPriority,
          source: "github" as InsightSource,
          status: "active" as InsightStatus,
          data: {
            currentCoverage: "85%",
            previousCoverage: "75%",
            trend: "improving",
          },
        },
      ];
      
      // Create the insights in the database
      const createdInsights = await Promise.all(
        mockInsights.map(insight => this.createInsight(insight))
      );
      
      return createdInsights;
    } catch (error) {
      logger.error("Error generating GitHub insights", { error, teamId });
      throw error;
    }
  },
  
  // Generate insights from Calendar data
  async generateCalendarInsights(teamId: string): Promise<Insight[]> {
    try {
      // Get Calendar integration for the team
      const calendarIntegration = await integrationService.getTeamIntegrationByType(teamId, "calendar");
      
      if (!calendarIntegration || !calendarIntegration.active) {
        logger.info("Calendar integration not found or inactive", { teamId });
        return [];
      }
      
      // In a real implementation, this would call the Calendar API and analyze the data
      // For now, we'll generate some mock insights
      
      const mockInsights: NewInsight[] = [
        {
          teamId,
          title: "Meeting efficiency improvement needed",
          description: "Weekly planning meetings are consistently running 15 minutes over scheduled time.",
          type: "general" as InsightType,
          priority: "low" as InsightPriority,
          source: "calendar" as InsightSource,
          status: "active" as InsightStatus,
          data: {
            meetingType: "Planning",
            averageOverrun: "15 minutes",
            frequency: "weekly",
          },
        },
        {
          teamId,
          title: "Deep work time decreasing",
          description: "Team members have 20% less uninterrupted work time compared to last month.",
          type: "burnout" as InsightType,
          priority: "medium" as InsightPriority,
          source: "calendar" as InsightSource,
          status: "active" as InsightStatus,
          data: {
            currentDeepWorkHours: "12 hours/week",
            previousDeepWorkHours: "15 hours/week",
            trend: "decreasing",
          },
        },
      ];
      
      // Create the insights in the database
      const createdInsights = await Promise.all(
        mockInsights.map(insight => this.createInsight(insight))
      );
      
      return createdInsights;
    } catch (error) {
      logger.error("Error generating Calendar insights", { error, teamId });
      throw error;
    }
  },
  
  // Generate insights from HR data
  async generateHrInsights(teamId: string): Promise<Insight[]> {
    try {
      // Get HR integration for the team
      const hrIntegration = await integrationService.getTeamIntegrationByType(teamId, "hr");
      
      if (!hrIntegration || !hrIntegration.active) {
        logger.info("HR integration not found or inactive", { teamId });
        return [];
      }
      
      // In a real implementation, this would call the HR API and analyze the data
      // For now, we'll generate some mock insights
      
      const mockInsights: NewInsight[] = [
        {
          teamId,
          title: "Employee growth opportunity",
          description: "Sarah Lee has completed all required training and is ready for promotion consideration.",
          type: "celebration" as InsightType,
          priority: "medium" as InsightPriority,
          source: "hr" as InsightSource,
          status: "active" as InsightStatus,
          data: {
            employee: "Sarah Lee",
            trainingCompleted: true,
            timeInRole: "18 months",
          },
        },
        {
          teamId,
          title: "Retention risk identified",
          description: "Alex Wong has shown signs of disengagement and may be at risk of leaving.",
          type: "burnout" as InsightType,
          priority: "high" as InsightPriority,
          source: "hr" as InsightSource,
          status: "active" as InsightStatus,
          data: {
            employee: "Alex Wong",
            engagementScore: "65%",
            previousScore: "85%",
            trend: "decreasing",
          },
        },
      ];
      
      // Create the insights in the database
      const createdInsights = await Promise.all(
        mockInsights.map(insight => this.createInsight(insight))
      );
      
      return createdInsights;
    } catch (error) {
      logger.error("Error generating HR insights", { error, teamId });
      throw error;
    }
  },
  
  // Generate all insights for a team
  async generateAllInsights(teamId: string): Promise<Insight[]> {
    try {
      const allInsights = await Promise.all([
        this.generateSlackInsights(teamId),
        this.generateLinearInsights(teamId),
        this.generateGithubInsights(teamId),
        this.generateCalendarInsights(teamId),
        this.generateHrInsights(teamId),
      ]);
      
      return allInsights.flat();
    } catch (error) {
      logger.error("Error generating all insights", { error, teamId });
      throw error;
    }
  }
}; 