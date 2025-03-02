import { pgTable, text, timestamp, varchar, json, boolean, integer, date } from "drizzle-orm/pg-core";
import { lifecycleDates } from "./util/lifecycle-dates";

export const users = pgTable("users", {
  userId: varchar("user_id", { length: 128 }).primaryKey(),
  // Add more clerk fields you want to sync here
  email: text("email").notNull(),
  ...lifecycleDates,
});

export const posts = pgTable("posts", {
  id: varchar("id", { length: 255 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => users.userId),
  ...lifecycleDates,
});

// Helper function to generate IDs with the appropriate prefix
function generateId(prefix: string) {
  // Generate a unique ID with the appropriate format
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 11)}`;
}

// Astralith specific tables
export const teams = pgTable("teams", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => generateId("team")),
  name: text("name").notNull(),
  description: text("description"),
  ownerId: varchar("owner_id", { length: 128 })
    .notNull()
    .references(() => users.userId),
  ...lifecycleDates,
});

export const teamMembers = pgTable("team_members", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => generateId("tmem")),
  teamId: varchar("team_id", { length: 255 })
    .notNull()
    .references(() => teams.id),
  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => users.userId),
  role: text("role").$type<"admin" | "member">().notNull().default("member"),
  ...lifecycleDates,
});

export const integrations = pgTable("integrations", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => generateId("intg")),
  teamId: varchar("team_id", { length: 255 })
    .notNull()
    .references(() => teams.id),
  type: text("type").$type<"slack" | "linear" | "github" | "calendar" | "hr">().notNull(),
  name: text("name").notNull(),
  config: json("config"),
  active: boolean("active").notNull().default(true),
  ...lifecycleDates,
});

export const insights = pgTable("insights", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => generateId("inst")),
  teamId: varchar("team_id", { length: 255 })
    .notNull()
    .references(() => teams.id),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").$type<"burnout" | "bottleneck" | "celebration" | "general">().notNull(),
  priority: text("priority").$type<"high" | "medium" | "low">().notNull().default("medium"),
  source: text("source").$type<"slack" | "linear" | "github" | "calendar" | "hr" | "system">().notNull(),
  status: text("status").$type<"active" | "acknowledged" | "resolved" | "dismissed">().notNull().default("active"),
  data: json("data"),
  ...lifecycleDates,
});

export const events = pgTable("events", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => generateId("evnt")),
  teamId: varchar("team_id", { length: 255 })
    .notNull()
    .references(() => teams.id),
  type: text("type").$type<"milestone" | "decision" | "meeting" | "project">().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  date: date("date").notNull(),
  tags: text("tags").array(),
  data: json("data"),
  ...lifecycleDates,
});

export const pulseDigests = pgTable("pulse_digests", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => generateId("plse")),
  teamId: varchar("team_id", { length: 255 })
    .notNull()
    .references(() => teams.id),
  date: date("date").notNull(),
  type: text("type").$type<"daily" | "weekly">().notNull(),
  insights: json("insights"),
  metrics: json("metrics"),
  ...lifecycleDates,
});

export const teamMetrics = pgTable("team_metrics", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => generateId("tmet")),
  teamId: varchar("team_id", { length: 255 })
    .notNull()
    .references(() => teams.id),
  date: date("date").notNull(),
  collaborationScore: integer("collaboration_score"),
  productivityScore: integer("productivity_score"),
  moraleScore: integer("morale_score"),
  wellnessScore: integer("wellness_score"),
  data: json("data"),
  ...lifecycleDates,
});
