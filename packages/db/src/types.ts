import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import * as schema from "./schema";

export type Post = InferSelectModel<typeof schema.posts>;
export type NewPost = InferInsertModel<typeof schema.posts>;

export const postInsertSchema = createInsertSchema(schema.posts, {}).omit({ userId: true });
export const postSelectSchema = createSelectSchema(schema.posts);

// Astralith types
export type Team = InferSelectModel<typeof schema.teams>;
export type NewTeam = InferInsertModel<typeof schema.teams>;
export const teamInsertSchema = createInsertSchema(schema.teams, {}).omit({ ownerId: true });
export const teamSelectSchema = createSelectSchema(schema.teams);

export type TeamMember = InferSelectModel<typeof schema.teamMembers>;
export type NewTeamMember = InferInsertModel<typeof schema.teamMembers>;
export const teamMemberInsertSchema = createInsertSchema(schema.teamMembers, {}).omit({ userId: true });
export const teamMemberSelectSchema = createSelectSchema(schema.teamMembers);

export type Integration = InferSelectModel<typeof schema.integrations>;
export type NewIntegration = InferInsertModel<typeof schema.integrations>;
export const integrationInsertSchema: z.ZodSchema = createInsertSchema(schema.integrations, {});
export const integrationSelectSchema = createSelectSchema(schema.integrations);

export type Insight = InferSelectModel<typeof schema.insights>;
export type NewInsight = InferInsertModel<typeof schema.insights>;
export const insightInsertSchema: z.ZodSchema = createInsertSchema(schema.insights, {});
export const insightSelectSchema = createSelectSchema(schema.insights);

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
