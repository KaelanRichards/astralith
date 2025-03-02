import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { teamService } from "./teams.service";
import { auth, getUserId, requireAuth } from "@/pkg/middleware/clerk-auth";
import { teamInsertSchema, teamUpdateSchema } from "@repo/db";
import { z } from "zod";

const addTeamMemberSchema = z.object({
  userId: z.string(),
  role: z.enum(["admin", "member"]).default("member"),
});

export const teamRoutes = new Hono()
  .use(auth(), requireAuth)
  
  // Get all teams for the authenticated user
  .get("/", async (c) => {
    const userId = getUserId(c);
    const teams = await teamService.getUserTeams(userId);
    return c.json(teams);
  })
  
  // Create a new team
  .post("/", zValidator("json", teamInsertSchema), async (c) => {
    const userId = getUserId(c);
    const data = c.req.valid("json");
    
    const team = await teamService.createTeam({
      ...data,
      ownerId: userId,
    });
    
    // Add the creator as an admin member
    await teamService.addTeamMember({
      teamId: team.id,
      userId,
      role: "admin",
    });
    
    return c.json(team, 201);
  })
  
  // Get a specific team
  .get("/:teamId", async (c) => {
    const teamId = c.req.param("teamId");
    const team = await teamService.getTeam(teamId);
    
    if (!team) {
      return c.json({ error: "Team not found" }, 404);
    }
    
    return c.json(team);
  })
  
  // Update a team
  .patch("/:teamId", zValidator("json", teamUpdateSchema), async (c) => {
    const teamId = c.req.param("teamId");
    const data = c.req.valid("json");
    
    const team = await teamService.updateTeam(teamId, data);
    
    if (!team) {
      return c.json({ error: "Team not found" }, 404);
    }
    
    return c.json(team);
  })
  
  // Delete a team
  .delete("/:teamId", async (c) => {
    const teamId = c.req.param("teamId");
    await teamService.deleteTeam(teamId);
    return c.json({ success: true });
  })
  
  // Get team members
  .get("/:teamId/members", async (c) => {
    const teamId = c.req.param("teamId");
    const members = await teamService.getTeamMembers(teamId);
    return c.json(members);
  })
  
  // Add a team member
  .post("/:teamId/members", zValidator("json", addTeamMemberSchema), async (c) => {
    const teamId = c.req.param("teamId");
    const { userId, role } = c.req.valid("json");
    
    const member = await teamService.addTeamMember({
      teamId,
      userId,
      role,
    });
    
    return c.json(member, 201);
  })
  
  // Remove a team member
  .delete("/:teamId/members/:userId", async (c) => {
    const teamId = c.req.param("teamId");
    const userId = c.req.param("userId");
    
    await teamService.removeTeamMember(teamId, userId);
    return c.json({ success: true });
  }); 