import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import * as schema from "./schema";

// Users
export type User = InferSelectModel<typeof schema.users>;
export type NewUser = InferInsertModel<typeof schema.users>;

export const userInsertSchema = createInsertSchema(schema.users);
export const userSelectSchema = createSelectSchema(schema.users);

// Teams
export type Team = InferSelectModel<typeof schema.teams>;
export type NewTeam = InferInsertModel<typeof schema.teams>;

export const teamInsertSchema = createInsertSchema(schema.teams).omit({ 
  id: true, 
  ownerId: true,
  createdAt: true,
  updatedAt: true 
});
export const teamUpdateSchema = createInsertSchema(schema.teams).omit({ 
  id: true, 
  ownerId: true,
  createdAt: true,
  updatedAt: true 
}).partial();

// Team Members
export type TeamMember = InferSelectModel<typeof schema.teamMembers>;
export type NewTeamMember = InferInsertModel<typeof schema.teamMembers>;

export const teamMemberInsertSchema = createInsertSchema(schema.teamMembers).omit({ 
  id: true,
  createdAt: true,
  updatedAt: true 
});
export const teamMemberUpdateSchema = createInsertSchema(schema.teamMembers).omit({ 
  id: true,
  teamId: true,
  userId: true,
  createdAt: true,
  updatedAt: true 
});

// Integrations
export type Integration = InferSelectModel<typeof schema.integrations>;
export type NewIntegration = InferInsertModel<typeof schema.integrations>;

export const integrationInsertSchema: z.ZodSchema = createInsertSchema(schema.integrations).omit({ 
  id: true,
  createdAt: true,
  updatedAt: true 
});
export const integrationUpdateSchema: z.ZodSchema = createInsertSchema(schema.integrations).omit({ 
  id: true,
  teamId: true,
  createdAt: true,
  updatedAt: true 
}).partial();

// Insights
export type Insight = InferSelectModel<typeof schema.insights>;
export type NewInsight = InferInsertModel<typeof schema.insights>;

export const insightInsertSchema: z.ZodSchema = createInsertSchema(schema.insights).omit({ 
  id: true,
  createdAt: true,
  updatedAt: true 
});
export const insightUpdateSchema: z.ZodSchema = createInsertSchema(schema.insights).omit({ 
  id: true,
  teamId: true,
  createdAt: true,
  updatedAt: true 
}).partial();

export type Event = InferSelectModel<typeof schema.events>;
export type NewEvent = InferInsertModel<typeof schema.events>;
export const eventInsertSchema: z.ZodSchema = createInsertSchema(schema.events, {});
export const eventSelectSchema = createSelectSchema(schema.events);

export type PulseDigest = InferSelectModel<typeof schema.pulseDigests>;
export type NewPulseDigest = InferInsertModel<typeof schema.pulseDigests>;
export const pulseDigestInsertSchema: z.ZodSchema = createInsertSchema(schema.pulseDigests, {});
export const pulseDigestSelectSchema = createSelectSchema(schema.pulseDigests);

export type TeamMetric = InferSelectModel<typeof schema.teamMetrics>;
export type NewTeamMetric = InferInsertModel<typeof schema.teamMetrics>;
export const teamMetricInsertSchema: z.ZodSchema = createInsertSchema(schema.teamMetrics, {});
export const teamMetricSelectSchema = createSelectSchema(schema.teamMetrics);
