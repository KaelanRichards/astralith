import { db, pulseDigests, teamMetrics, eq, and, gte, lte, sql } from "@repo/db";
import type { PulseDigest, NewPulseDigest, TeamMetric, NewTeamMetric } from "@repo/db";
import { logger } from "@repo/logs";
import { insightService } from "../insights/insights.service";

type DigestType = "daily" | "weekly";

export const pulseService = {
  async createPulseDigest(digest: NewPulseDigest): Promise<PulseDigest> {
    try {
      const result = await db.insert(pulseDigests).values(digest).returning();
      const newDigest = result[0];
      if (!newDigest) throw new Error("Failed to create pulse digest");
      logger.info("Pulse digest created", { digestId: newDigest.id, type: newDigest.type });
      return newDigest;
    } catch (error) {
      logger.error("Error creating pulse digest", { error, digest });
      throw error;
    }
  },

  async getPulseDigest(digestId: string): Promise<PulseDigest | undefined> {
    try {
      const digest = await db.query.pulseDigests.findFirst({
        where: eq(pulseDigests.id, digestId),
      });
      return digest || undefined;
    } catch (error) {
      logger.error("Error getting pulse digest", { error, digestId });
      throw error;
    }
  },

  async getTeamPulseDigests(teamId: string, limit: number = 10): Promise<PulseDigest[]> {
    try {
      return await db.query.pulseDigests.findMany({
        where: eq(pulseDigests.teamId, teamId),
        orderBy: (pulseDigests, { desc }) => [desc(pulseDigests.date)],
        limit,
      });
    } catch (error) {
      logger.error("Error getting team pulse digests", { error, teamId });
      throw error;
    }
  },

  async getLatestTeamPulseDigest(teamId: string, type: DigestType): Promise<PulseDigest | undefined> {
    try {
      const digest = await db.query.pulseDigests.findFirst({
        where: and(
          eq(pulseDigests.teamId, teamId),
          eq(pulseDigests.type, type)
        ),
        orderBy: (pulseDigests, { desc }) => [desc(pulseDigests.date)],
      });
      return digest || undefined;
    } catch (error) {
      logger.error("Error getting latest team pulse digest", { error, teamId, type });
      throw error;
    }
  },

  async createTeamMetric(metric: NewTeamMetric): Promise<TeamMetric> {
    try {
      const result = await db.insert(teamMetrics).values(metric).returning();
      const newMetric = result[0];
      if (!newMetric) throw new Error("Failed to create team metric");
      logger.info("Team metric created", { metricId: newMetric.id });
      return newMetric;
    } catch (error) {
      logger.error("Error creating team metric", { error, metric });
      throw error;
    }
  },

  async getTeamMetrics(teamId: string, startDate: Date, endDate: Date): Promise<TeamMetric[]> {
    try {
      return await db.query.teamMetrics.findMany({
        where: and(
          eq(teamMetrics.teamId, teamId),
          gte(teamMetrics.date, startDate.toISOString()),
          lte(teamMetrics.date, endDate.toISOString())
        ),
        orderBy: (teamMetrics, { asc }) => [asc(teamMetrics.date)],
      });
    } catch (error) {
      logger.error("Error getting team metrics", { error, teamId });
      throw error;
    }
  },

  async generateDailyDigest(teamId: string, date: Date = new Date()): Promise<PulseDigest> {
    try {
      // Generate insights if needed
      await insightService.generateAllInsights(teamId);
      
      // Get recent insights
      const insights = await insightService.getActiveTeamInsights(teamId);
      
      // Generate team metrics for the day
      const metric = await this.createTeamMetric({
        teamId,
        date: date.toISOString(),
        collaborationScore: Math.floor(Math.random() * 30) + 70, // Mock score between 70-100
        productivityScore: Math.floor(Math.random() * 30) + 70,
        moraleScore: Math.floor(Math.random() * 30) + 70,
        wellnessScore: Math.floor(Math.random() * 30) + 70,
        data: {
          trends: {
            collaboration: "stable",
            productivity: "increasing",
            morale: "stable",
            wellness: "decreasing",
          },
          highlights: [
            "Team completed 85% of sprint tasks",
            "3 new features shipped to production",
            "Customer satisfaction rating at 92%",
          ],
        },
      });
      
      // Create the digest
      const digest = await this.createPulseDigest({
        teamId,
        date: date.toISOString(),
        type: "daily" as DigestType,
        insights: {
          high: insights.filter(i => i.priority === "high").map(i => i.id),
          medium: insights.filter(i => i.priority === "medium").map(i => i.id),
          low: insights.filter(i => i.priority === "low").map(i => i.id),
        },
        metrics: {
          collaborationScore: metric.collaborationScore,
          productivityScore: metric.productivityScore,
          moraleScore: metric.moraleScore,
          wellnessScore: metric.wellnessScore,
          trends: (metric.data as any)?.trends || {},
          highlights: (metric.data as any)?.highlights || [],
        },
      });
      
      return digest;
    } catch (error) {
      logger.error("Error generating daily digest", { error, teamId });
      throw error;
    }
  },

  async generateWeeklyDigest(teamId: string, date: Date = new Date()): Promise<PulseDigest> {
    try {
      // Generate insights if needed
      await insightService.generateAllInsights(teamId);
      
      // Get recent insights
      const insights = await insightService.getActiveTeamInsights(teamId);
      
      // Get the start of the week (Sunday)
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      
      // Get the end of the week (Saturday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      
      // Get metrics for the week
      const weeklyMetrics = await this.getTeamMetrics(teamId, startOfWeek, endOfWeek);
      
      // Calculate average scores
      const avgCollaborationScore = Math.round(
        weeklyMetrics.reduce((sum, m) => sum + (m.collaborationScore || 0), 0) / 
        (weeklyMetrics.length || 1)
      );
      
      const avgProductivityScore = Math.round(
        weeklyMetrics.reduce((sum, m) => sum + (m.productivityScore || 0), 0) / 
        (weeklyMetrics.length || 1)
      );
      
      const avgMoraleScore = Math.round(
        weeklyMetrics.reduce((sum, m) => sum + (m.moraleScore || 0), 0) / 
        (weeklyMetrics.length || 1)
      );
      
      const avgWellnessScore = Math.round(
        weeklyMetrics.reduce((sum, m) => sum + (m.wellnessScore || 0), 0) / 
        (weeklyMetrics.length || 1)
      );
      
      // Create the digest
      const digest = await this.createPulseDigest({
        teamId,
        date: date.toISOString(),
        type: "weekly" as DigestType,
        insights: {
          high: insights.filter(i => i.priority === "high").map(i => i.id),
          medium: insights.filter(i => i.priority === "medium").map(i => i.id),
          low: insights.filter(i => i.priority === "low").map(i => i.id),
        },
        metrics: {
          collaborationScore: avgCollaborationScore,
          productivityScore: avgProductivityScore,
          moraleScore: avgMoraleScore,
          wellnessScore: avgWellnessScore,
          weeklyTrends: {
            collaboration: avgCollaborationScore > 80 ? "strong" : "needs improvement",
            productivity: avgProductivityScore > 80 ? "strong" : "needs improvement",
            morale: avgMoraleScore > 80 ? "strong" : "needs improvement",
            wellness: avgWellnessScore > 80 ? "strong" : "needs improvement",
          },
          keyAccomplishments: [
            "Completed sprint with 92% of planned story points",
            "Reduced bug backlog by 15%",
            "Improved API response time by 30%",
          ],
          areasForImprovement: [
            "Meeting efficiency could be improved",
            "More cross-team collaboration needed",
            "Documentation updates lagging behind code changes",
          ],
        },
      });
      
      return digest;
    } catch (error) {
      logger.error("Error generating weekly digest", { error, teamId });
      throw error;
    }
  },
}; 