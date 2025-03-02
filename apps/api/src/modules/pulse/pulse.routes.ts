import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { pulseService } from "./pulse.service";
import { logger } from "@repo/logs";

const pulseRoutes = new Hono();

// Get all pulse digests for a team
pulseRoutes.get(
  "/teams/:teamId/digests",
  zValidator(
    "param",
    z.object({
      teamId: z.string().uuid(),
    })
  ),
  zValidator(
    "query",
    z.object({
      limit: z.string().transform(Number).optional(),
    }).optional()
  ),
  async (c) => {
    try {
      const { teamId } = c.req.valid("param");
      const query = c.req.valid("query") || {};
      const limit = query.limit || 10;

      const digests = await pulseService.getTeamPulseDigests(teamId, limit);
      return c.json({ digests });
    } catch (error) {
      logger.error("Error getting team pulse digests", { error });
      return c.json({ error: "Failed to get team pulse digests" }, 500);
    }
  }
);

// Get a specific pulse digest
pulseRoutes.get(
  "/digests/:digestId",
  zValidator(
    "param",
    z.object({
      digestId: z.string().uuid(),
    })
  ),
  async (c) => {
    try {
      const { digestId } = c.req.valid("param");
      const digest = await pulseService.getPulseDigest(digestId);
      
      if (!digest) {
        return c.json({ error: "Pulse digest not found" }, 404);
      }
      
      return c.json({ digest });
    } catch (error) {
      logger.error("Error getting pulse digest", { error });
      return c.json({ error: "Failed to get pulse digest" }, 500);
    }
  }
);

// Get the latest pulse digest for a team
pulseRoutes.get(
  "/teams/:teamId/digests/latest",
  zValidator(
    "param",
    z.object({
      teamId: z.string().uuid(),
    })
  ),
  zValidator(
    "query",
    z.object({
      type: z.enum(["daily", "weekly"]),
    })
  ),
  async (c) => {
    try {
      const { teamId } = c.req.valid("param");
      const { type } = c.req.valid("query");
      
      const digest = await pulseService.getLatestTeamPulseDigest(teamId, type);
      
      if (!digest) {
        return c.json({ error: "No pulse digest found" }, 404);
      }
      
      return c.json({ digest });
    } catch (error) {
      logger.error("Error getting latest team pulse digest", { error });
      return c.json({ error: "Failed to get latest team pulse digest" }, 500);
    }
  }
);

// Generate a daily digest for a team
pulseRoutes.post(
  "/teams/:teamId/digests/daily",
  zValidator(
    "param",
    z.object({
      teamId: z.string().uuid(),
    })
  ),
  async (c) => {
    try {
      const { teamId } = c.req.valid("param");
      const digest = await pulseService.generateDailyDigest(teamId);
      return c.json({ digest }, 201);
    } catch (error) {
      logger.error("Error generating daily digest", { error });
      return c.json({ error: "Failed to generate daily digest" }, 500);
    }
  }
);

// Generate a weekly digest for a team
pulseRoutes.post(
  "/teams/:teamId/digests/weekly",
  zValidator(
    "param",
    z.object({
      teamId: z.string().uuid(),
    })
  ),
  async (c) => {
    try {
      const { teamId } = c.req.valid("param");
      const digest = await pulseService.generateWeeklyDigest(teamId);
      return c.json({ digest }, 201);
    } catch (error) {
      logger.error("Error generating weekly digest", { error });
      return c.json({ error: "Failed to generate weekly digest" }, 500);
    }
  }
);

export { pulseRoutes }; 