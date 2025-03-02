import { db, teams, teamMembers, users, eq, and } from "@repo/db";
import type { NewTeam, Team, TeamMember, NewTeamMember } from "@repo/db";
import { logger } from "@repo/logs";

export const teamService = {
  async createTeam(team: NewTeam): Promise<Team> {
    try {
      const result = await db.insert(teams).values(team).returning();
      const newTeam = result[0];
      if (!newTeam) throw new Error("Failed to create team");
      logger.info("Team created", { teamId: newTeam.id });
      return newTeam;
    } catch (error) {
      logger.error("Error creating team", { error });
      throw error;
    }
  },

  async getTeam(teamId: string): Promise<Team | undefined> {
    try {
      const team = await db.query.teams.findFirst({
        where: eq(teams.id, teamId),
      });
      return team || undefined;
    } catch (error) {
      logger.error("Error getting team", { error, teamId });
      throw error;
    }
  },

  async updateTeam(teamId: string, teamData: Partial<NewTeam>): Promise<Team | undefined> {
    try {
      const result = await db
        .update(teams)
        .set(teamData)
        .where(eq(teams.id, teamId))
        .returning();
      
      return result[0];
    } catch (error) {
      logger.error("Error updating team", { error, teamId });
      throw error;
    }
  },

  async deleteTeam(teamId: string): Promise<void> {
    try {
      await db.delete(teams).where(eq(teams.id, teamId));
    } catch (error) {
      logger.error("Error deleting team", { error, teamId });
      throw error;
    }
  },

  async addTeamMember(member: NewTeamMember): Promise<TeamMember> {
    try {
      const result = await db.insert(teamMembers).values(member).returning();
      const newMember = result[0];
      if (!newMember) throw new Error("Failed to add team member");
      return newMember;
    } catch (error) {
      logger.error("Error adding team member", { error, member });
      throw error;
    }
  },

  async removeTeamMember(teamId: string, userId: string): Promise<void> {
    try {
      await db
        .delete(teamMembers)
        .where(and(eq(teamMembers.teamId, teamId), eq(teamMembers.userId, userId)));
    } catch (error) {
      logger.error("Error removing team member", { error, teamId, userId });
      throw error;
    }
  },

  async getTeamMembers(teamId: string): Promise<TeamMember[]> {
    try {
      return await db.query.teamMembers.findMany({
        where: eq(teamMembers.teamId, teamId),
        with: {
          user: true,
        },
      });
    } catch (error) {
      logger.error("Error getting team members", { error, teamId });
      throw error;
    }
  },

  async getUserTeams(userId: string): Promise<Team[]> {
    try {
      const memberEntries = await db.query.teamMembers.findMany({
        where: eq(teamMembers.userId, userId),
        with: {
          team: true,
        },
      });
      
      return memberEntries.map(entry => entry.team);
    } catch (error) {
      logger.error("Error getting user teams", { error, userId });
      throw error;
    }
  }
}; 