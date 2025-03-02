import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { insightService } from "./insights.service";
import { auth, getUserId, requireAuth } from "@/pkg/middleware/clerk-auth";
import { z } from "zod";

const updateInsightStatusSchema = z.object({
  status: z.enum(["active", "acknowledged", "resolved", "dismissed"]),
});

export const insightRoutes = new Hono()
  .use(auth(), requireAuth)
  
  // Get all insights for a team
  .get("/:teamId", async (c) => {
    const teamId = c.req.param("teamId");
    const insights = await insightService.getTeamInsights(teamId);
    return c.json(insights);
  })
  
  // Get a specific insight
  .get("/:teamId/:insightId", async (c) => {
    const insightId = c.req.param("insightId");
    const insight = await insightService.getInsight(insightId);
    
    if (!insight) {
      return c.json({ error: "Insight not found" }, 404);
    }
    
    return c.json(insight);
  })
  
  // Update insight status
  .patch("/:teamId/:insightId/status", zValidator("json", updateInsightStatusSchema), async (c) => {
    const insightId = c.req.param("insightId");
    const { status } = c.req.valid("json");
    
    const insight = await insightService.updateInsightStatus(insightId, status);
    
    if (!insight) {
      return c.json({ error: "Insight not found" }, 404);
    }
    
    return c.json(insight);
  })
  
  // Delete an insight
  .delete("/:teamId/:insightId", async (c) => {
    const insightId = c.req.param("insightId");
    await insightService.deleteInsight(insightId);
    return c.json({ success: true });
  })
  
  // Generate insights from all sources
  .post("/:teamId/generate", async (c) => {
    const teamId = c.req.param("teamId");
    const insights = await insightService.generateAllInsights(teamId);
    return c.json(insights, 201);
  })
  
  // Generate insights from Slack
  .post("/:teamId/generate/slack", async (c) => {
    const teamId = c.req.param("teamId");
    const insights = await insightService.generateSlackInsights(teamId);
    return c.json(insights, 201);
  })
  
  // Generate insights from Linear
  .post("/:teamId/generate/linear", async (c) => {
    const teamId = c.req.param("teamId");
    const insights = await insightService.generateLinearInsights(teamId);
    return c.json(insights, 201);
  })
  
  // Generate insights from GitHub
  .post("/:teamId/generate/github", async (c) => {
    const teamId = c.req.param("teamId");
    const insights = await insightService.generateGithubInsights(teamId);
    return c.json(insights, 201);
  })
  
  // Generate insights from Calendar
  .post("/:teamId/generate/calendar", async (c) => {
    const teamId = c.req.param("teamId");
    const insights = await insightService.generateCalendarInsights(teamId);
    return c.json(insights, 201);
  })
  
  // Generate insights from HR
  .post("/:teamId/generate/hr", async (c) => {
    const teamId = c.req.param("teamId");
    const insights = await insightService.generateHrInsights(teamId);
    return c.json(insights, 201);
  }); 