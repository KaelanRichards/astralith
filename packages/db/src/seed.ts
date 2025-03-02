import { db } from "./client";
import { events, insights, integrations, pulseDigests, teamMembers, teamMetrics, teams, users } from "./schema";
import { format, add } from "date-fns";

// Generate unique IDs for each entity type
const generateId = (prefix: string) => {
  // Generate a unique ID with the appropriate format
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 11)}`;
};

async function seed() {
  console.log("🌱 Seeding database...");
  
  // Clear existing data in reverse order of dependencies
  await db.delete(pulseDigests);
  await db.delete(teamMetrics);
  await db.delete(insights);
  await db.delete(events);
  await db.delete(integrations);
  await db.delete(teamMembers);
  await db.delete(teams);
  await db.delete(users);
  
  console.log("🧹 Cleared existing data");
  
  // Create test users
  const userIds = [
    { id: "user_2rkSWQvQL123", name: "Jane Smith", email: "jane@example.com" },
    { id: "user_3fkPLRtTM456", name: "Mark Johnson", email: "mark@example.com" },
    { id: "user_9pzXYZaBC789", name: "Sarah Lee", email: "sarah@example.com" },
    { id: "user_7mnQRStUV012", name: "Alex Wong", email: "alex@example.com" },
  ];
  
  for (const user of userIds) {
    await db.insert(users).values({
      userId: user.id,
      email: user.email,
    });
  }
  
  console.log(`✅ Created ${userIds.length} test users`);
  
  // Create a team
  const teamId = generateId("team");
  await db.insert(teams).values({
    id: teamId,
    name: "Astralith Team",
    description: "Main product development team",
    ownerId: userIds[0]!.id, // Use non-null assertion as we know this array has values
  });
  
  console.log("✅ Created team with ID:", teamId);
  
  // Add team members with different roles
  const roles: Array<"admin" | "member"> = ["admin", "member", "member", "member"];
  
  for (let i = 0; i < userIds.length; i++) {
    const role = i < roles.length ? roles[i] : "member"; // Default to member if index out of bounds
    
    await db.insert(teamMembers).values({
      id: generateId("tmem"),
      teamId: teamId,
      userId: userIds[i]!.id, // Use non-null assertion as we know this array has values
      role,
    });
  }
  
  console.log("✅ Added team members");
  
  // Create integrations
  const integrationTypes = [
    { type: "slack", name: "Slack Workspace", active: true },
    { type: "github", name: "GitHub Organization", active: true },
    { type: "linear", name: "Linear Projects", active: false },
    { type: "calendar", name: "Google Calendar", active: true },
  ];
  
  for (const integration of integrationTypes) {
    await db.insert(integrations).values({
      id: generateId("intg"),
      teamId: teamId,
      type: integration.type as "slack" | "github" | "linear" | "calendar" | "hr",
      name: integration.name,
      config: { connected: integration.active },
      active: integration.active,
    });
  }
  
  console.log("✅ Created integrations");
  
  // Create insights
  const insightTypes = [
    { 
      title: "Potential burnout risk detected", 
      description: "Team member Jane Smith has worked late hours for 5 consecutive days.",
      type: "burnout", 
      priority: "high", 
      source: "slack",
      status: "active",
    },
    { 
      title: "Project bottleneck identified", 
      description: "The authentication feature has been in review for over a week with no progress.",
      type: "bottleneck", 
      priority: "medium", 
      source: "linear",
      status: "acknowledged",
    },
    { 
      title: "Team celebration opportunity", 
      description: "Frontend team has successfully completed all Q2 objectives ahead of schedule.",
      type: "celebration", 
      priority: "medium", 
      source: "linear",
      status: "active",
    },
    { 
      title: "Meeting efficiency improvement", 
      description: "Weekly planning meetings are consistently running 15 minutes over scheduled time.",
      type: "general", 
      priority: "low", 
      source: "calendar",
      status: "resolved",
    },
  ];
  
  const insightIds: string[] = [];
  
  for (const insight of insightTypes) {
    const insightId = generateId("inst");
    insightIds.push(insightId);
    
    await db.insert(insights).values({
      id: insightId,
      teamId: teamId,
      title: insight.title,
      description: insight.description,
      type: insight.type as "burnout" | "bottleneck" | "celebration" | "general",
      priority: insight.priority as "high" | "medium" | "low",
      source: insight.source as "slack" | "linear" | "github" | "calendar" | "hr" | "system",
      status: insight.status as "active" | "acknowledged" | "resolved" | "dismissed",
      data: { createdAt: new Date().toISOString() },
    });
  }
  
  console.log("✅ Created insights");
  
  // Create events
  const today = new Date();
  const events_data = [
    { 
      type: "milestone", 
      title: "Beta Release", 
      description: "Release beta version to early adopters",
      date: add(today, { days: 14 }),
      tags: ["product", "release"],
    },
    { 
      type: "decision", 
      title: "Architecture Review", 
      description: "Team decided to adopt microservices architecture for the next phase",
      date: add(today, { days: -5 }),
      tags: ["technical", "architecture"],
    },
    { 
      type: "meeting", 
      title: "Sprint Planning", 
      description: "Plan tasks for the upcoming sprint",
      date: add(today, { days: 2 }),
      tags: ["recurring", "planning"],
    },
    { 
      type: "project", 
      title: "Mobile App Development", 
      description: "Start development of mobile applications",
      date: add(today, { days: 30 }),
      tags: ["development", "mobile"],
    },
  ];
  
  for (const event of events_data) {
    await db.insert(events).values({
      id: generateId("evnt"),
      teamId: teamId,
      type: event.type as "milestone" | "decision" | "meeting" | "project",
      title: event.title,
      description: event.description,
      date: format(event.date, 'yyyy-MM-dd'),
      tags: event.tags,
      data: { owner: userIds[0]!.id }, // Use non-null assertion as we know this array has values
    });
  }
  
  console.log("✅ Created events");
  
  // Create pulse digests
  const digestTypes = ["daily", "weekly"];
  
  for (const type of digestTypes) {
    // Make sure we have valid insight IDs for each category
    const highInsights = insightIds.length > 0 ? [insightIds[0]] : [];
    const mediumInsights = insightIds.length > 2 ? [insightIds[1], insightIds[2]] : [];
    const lowInsights = insightIds.length > 3 ? [insightIds[3]] : [];
    
    await db.insert(pulseDigests).values({
      id: generateId("plse"),
      teamId: teamId,
      date: format(today, 'yyyy-MM-dd'),
      type: type as "daily" | "weekly",
      insights: {
        high: highInsights,
        medium: mediumInsights,
        low: lowInsights,
      },
      metrics: {
        collaborationScore: 85,
        productivityScore: 72,
        moraleScore: 90,
        wellnessScore: 68,
        trends: {
          collaboration: "increasing",
          productivity: "stable",
          morale: "increasing",
          wellness: "decreasing",
        },
        highlights: [
          "Team communication has improved significantly",
          "3 critical issues resolved ahead of schedule",
          "Code quality metrics show positive trend",
        ],
        weeklyTrends: type === "weekly" ? {
          collaboration: "strong",
          productivity: "improving",
          morale: "strong",
          wellness: "needs improvement",
        } : undefined,
        keyAccomplishments: type === "weekly" ? [
          "Frontend team completed the new dashboard redesign",
          "API team shipped 3 new endpoints ahead of schedule",
          "QA completed regression testing with zero critical bugs",
        ] : undefined,
        areasForImprovement: type === "weekly" ? [
          "Mobile team is facing delays with the authentication flow",
          "Two team members showed signs of potential burnout",
          "Sprint planning meetings consistently running over time",
        ] : undefined,
      },
    });
  }
  
  console.log("✅ Created pulse digests");
  
  // Create team metrics
  const pastDays = 14;
  const today_date = new Date();
  
  for (let i = 0; i < pastDays; i++) {
    const date = add(today_date, { days: -i });
    
    await db.insert(teamMetrics).values({
      id: generateId("tmet"),
      teamId: teamId,
      date: format(date, 'yyyy-MM-dd'),
      collaborationScore: Math.floor(Math.random() * 15) + 75, // 75-90
      productivityScore: Math.floor(Math.random() * 20) + 70, // 70-90
      moraleScore: Math.floor(Math.random() * 15) + 80, // 80-95
      wellnessScore: Math.floor(Math.random() * 25) + 65, // 65-90
      data: { 
        activeMeetings: Math.floor(Math.random() * 6) + 2,
        codeCommits: Math.floor(Math.random() * 30) + 15,
        completedTasks: Math.floor(Math.random() * 12) + 8,
      },
    });
  }
  
  console.log("✅ Created team metrics history");
  console.log("✅ Seeding complete!");
}

seed()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  }); 