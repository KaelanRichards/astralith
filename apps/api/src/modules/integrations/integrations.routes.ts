import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { integrationService } from "./integrations.service";
import { auth, getUserId, requireAuth } from "@/pkg/middleware/clerk-auth";
import { integrationInsertSchema, integrationUpdateSchema } from "@repo/db";
import { z } from "zod";

// Schema for integration configuration
const slackConfigSchema = z.object({
  token: z.string(),
  workspace: z.string(),
});

const linearConfigSchema = z.object({
  apiKey: z.string(),
  teamId: z.string().optional(),
});

const githubConfigSchema = z.object({
  token: z.string(),
  organization: z.string().optional(),
  repositories: z.array(z.string()).optional(),
});

const calendarConfigSchema = z.object({
  provider: z.enum(["google", "outlook"]),
  token: z.string(),
});

const hrConfigSchema = z.object({
  provider: z.enum(["gusto", "bamboohr", "other"]),
  apiKey: z.string(),
  domain: z.string().optional(),
});

export const integrationRoutes = new Hono()
  .use(auth(), requireAuth)
  
  // Get all integrations for a team
  .get("/:teamId", async (c) => {
    const teamId = c.req.param("teamId");
    const integrations = await integrationService.getTeamIntegrations(teamId);
    return c.json(integrations);
  })
  
  // Get a specific integration
  .get("/:teamId/:integrationId", async (c) => {
    const integrationId = c.req.param("integrationId");
    const integration = await integrationService.getIntegration(integrationId);
    
    if (!integration) {
      return c.json({ error: "Integration not found" }, 404);
    }
    
    return c.json(integration);
  })
  
  // Delete an integration
  .delete("/:teamId/:integrationId", async (c) => {
    const integrationId = c.req.param("integrationId");
    await integrationService.deleteIntegration(integrationId);
    return c.json({ success: true });
  })
  
  // Configure Slack integration
  .post("/:teamId/slack", zValidator("json", slackConfigSchema), async (c) => {
    const teamId = c.req.param("teamId");
    const config = c.req.valid("json");
    
    const integration = await integrationService.configureSlackIntegration(teamId, config);
    return c.json(integration, 201);
  })
  
  // Configure Linear integration
  .post("/:teamId/linear", zValidator("json", linearConfigSchema), async (c) => {
    const teamId = c.req.param("teamId");
    const config = c.req.valid("json");
    
    const integration = await integrationService.configureLinearIntegration(teamId, config);
    return c.json(integration, 201);
  })
  
  // Configure GitHub integration
  .post("/:teamId/github", zValidator("json", githubConfigSchema), async (c) => {
    const teamId = c.req.param("teamId");
    const config = c.req.valid("json");
    
    const integration = await integrationService.configureGithubIntegration(teamId, config);
    return c.json(integration, 201);
  })
  
  // Configure Calendar integration
  .post("/:teamId/calendar", zValidator("json", calendarConfigSchema), async (c) => {
    const teamId = c.req.param("teamId");
    const config = c.req.valid("json");
    
    const integration = await integrationService.configureCalendarIntegration(teamId, config);
    return c.json(integration, 201);
  })
  
  // Configure HR integration
  .post("/:teamId/hr", zValidator("json", hrConfigSchema), async (c) => {
    const teamId = c.req.param("teamId");
    const config = c.req.valid("json");
    
    const integration = await integrationService.configureHrIntegration(teamId, config);
    return c.json(integration, 201);
  }); 