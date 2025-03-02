import { db, integrations, eq, and } from "@repo/db";
import type { Integration, NewIntegration } from "@repo/db";
import { logger } from "@repo/logs";

type IntegrationType = "slack" | "linear" | "github" | "calendar" | "hr";

export const integrationService = {
  async createIntegration(integration: NewIntegration): Promise<Integration> {
    try {
      const result = await db.insert(integrations).values(integration).returning();
      const newIntegration = result[0];
      if (!newIntegration) throw new Error("Failed to create integration");
      logger.info("Integration created", { integrationId: newIntegration.id, type: newIntegration.type });
      return newIntegration;
    } catch (error) {
      logger.error("Error creating integration", { error, integration });
      throw error;
    }
  },

  async getIntegration(integrationId: string): Promise<Integration | undefined> {
    try {
      const integration = await db.query.integrations.findFirst({
        where: eq(integrations.id, integrationId),
      });
      return integration || undefined;
    } catch (error) {
      logger.error("Error getting integration", { error, integrationId });
      throw error;
    }
  },

  async updateIntegration(integrationId: string, data: Partial<NewIntegration>): Promise<Integration | undefined> {
    try {
      const result = await db
        .update(integrations)
        .set(data)
        .where(eq(integrations.id, integrationId))
        .returning();
      
      return result[0];
    } catch (error) {
      logger.error("Error updating integration", { error, integrationId });
      throw error;
    }
  },

  async deleteIntegration(integrationId: string): Promise<void> {
    try {
      await db.delete(integrations).where(eq(integrations.id, integrationId));
    } catch (error) {
      logger.error("Error deleting integration", { error, integrationId });
      throw error;
    }
  },

  async getTeamIntegrations(teamId: string): Promise<Integration[]> {
    try {
      return await db.query.integrations.findMany({
        where: eq(integrations.teamId, teamId),
      });
    } catch (error) {
      logger.error("Error getting team integrations", { error, teamId });
      throw error;
    }
  },

  async getTeamIntegrationByType(teamId: string, type: IntegrationType): Promise<Integration | undefined> {
    try {
      const integration = await db.query.integrations.findFirst({
        where: and(
          eq(integrations.teamId, teamId),
          eq(integrations.type, type)
        ),
      });
      return integration || undefined;
    } catch (error) {
      logger.error("Error getting team integration by type", { error, teamId, type });
      throw error;
    }
  },

  // Methods for specific integration types
  
  // Slack integration
  async configureSlackIntegration(teamId: string, config: any): Promise<Integration> {
    try {
      // Check if integration already exists
      const existing = await this.getTeamIntegrationByType(teamId, "slack");
      
      if (existing) {
        // Update existing integration
        const updated = await this.updateIntegration(existing.id, {
          config,
          active: true,
        });
        if (!updated) throw new Error("Failed to update Slack integration");
        return updated;
      } else {
        // Create new integration
        return await this.createIntegration({
          teamId,
          type: "slack" as IntegrationType,
          name: "Slack",
          config,
          active: true,
        });
      }
    } catch (error) {
      logger.error("Error configuring Slack integration", { error, teamId });
      throw error;
    }
  },
  
  // Linear integration
  async configureLinearIntegration(teamId: string, config: any): Promise<Integration> {
    try {
      // Check if integration already exists
      const existing = await this.getTeamIntegrationByType(teamId, "linear");
      
      if (existing) {
        // Update existing integration
        const updated = await this.updateIntegration(existing.id, {
          config,
          active: true,
        });
        if (!updated) throw new Error("Failed to update Linear integration");
        return updated;
      } else {
        // Create new integration
        return await this.createIntegration({
          teamId,
          type: "linear" as IntegrationType,
          name: "Linear",
          config,
          active: true,
        });
      }
    } catch (error) {
      logger.error("Error configuring Linear integration", { error, teamId });
      throw error;
    }
  },
  
  // GitHub integration
  async configureGithubIntegration(teamId: string, config: any): Promise<Integration> {
    try {
      // Check if integration already exists
      const existing = await this.getTeamIntegrationByType(teamId, "github");
      
      if (existing) {
        // Update existing integration
        const updated = await this.updateIntegration(existing.id, {
          config,
          active: true,
        });
        if (!updated) throw new Error("Failed to update GitHub integration");
        return updated;
      } else {
        // Create new integration
        return await this.createIntegration({
          teamId,
          type: "github" as IntegrationType,
          name: "GitHub",
          config,
          active: true,
        });
      }
    } catch (error) {
      logger.error("Error configuring GitHub integration", { error, teamId });
      throw error;
    }
  },
  
  // Calendar integration
  async configureCalendarIntegration(teamId: string, config: any): Promise<Integration> {
    try {
      // Check if integration already exists
      const existing = await this.getTeamIntegrationByType(teamId, "calendar");
      
      if (existing) {
        // Update existing integration
        const updated = await this.updateIntegration(existing.id, {
          config,
          active: true,
        });
        if (!updated) throw new Error("Failed to update Calendar integration");
        return updated;
      } else {
        // Create new integration
        return await this.createIntegration({
          teamId,
          type: "calendar" as IntegrationType,
          name: "Calendar",
          config,
          active: true,
        });
      }
    } catch (error) {
      logger.error("Error configuring Calendar integration", { error, teamId });
      throw error;
    }
  },
  
  // HR integration
  async configureHrIntegration(teamId: string, config: any): Promise<Integration> {
    try {
      // Check if integration already exists
      const existing = await this.getTeamIntegrationByType(teamId, "hr");
      
      if (existing) {
        // Update existing integration
        const updated = await this.updateIntegration(existing.id, {
          config,
          active: true,
        });
        if (!updated) throw new Error("Failed to update HR integration");
        return updated;
      } else {
        // Create new integration
        return await this.createIntegration({
          teamId,
          type: "hr" as IntegrationType,
          name: "HR",
          config,
          active: true,
        });
      }
    } catch (error) {
      logger.error("Error configuring HR integration", { error, teamId });
      throw error;
    }
  }
}; 