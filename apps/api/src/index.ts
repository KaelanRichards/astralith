import { Hono } from "hono";
import { cors } from "hono/cors";

import { teamRoutes } from "@/modules/teams/teams.routes";
import { integrationRoutes } from "@/modules/integrations/integrations.routes";
import { insightRoutes } from "@/modules/insights/insights.routes";
import { pulseRoutes } from "@/modules/pulse/pulse.routes";

import { logger } from "hono/logger";
import { errorHandler } from "@/pkg/middleware/error";
import { webhookRoutes } from "@/modules/webhooks/webhook.routes";

const app = new Hono();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.get("/health", (c) => {
  return c.text("OK");
});

const routes = app
  .basePath("/api")
  .use("*", errorHandler())
  .route("/webhooks", webhookRoutes)
  .route("/teams", teamRoutes)
  .route("/integrations", integrationRoutes)
  .route("/insights", insightRoutes)
  .route("/pulse", pulseRoutes);

export type AppType = typeof routes;

export default {
  port: 3004,
  fetch: app.fetch,
  idleTimeout: 30,
};
