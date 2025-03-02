import { db } from "./client";
import { posts, users } from "./schema";
import { newId, newIdWithoutPrefix } from "@repo/id";

async function seed() {
  console.log("🌱 Seeding database...");
  
  // Clear existing data
  await db.delete(posts);
  await db.delete(users);
  
  // Create a test user
  const userId = "user_" + newIdWithoutPrefix(12);
  await db.insert(users).values({
    userId,
    email: "test@example.com",
  });
  
  console.log("✅ Created test user with ID:", userId);
  
  // Create a sample post
  const postId = newId("post");
  await db.insert(posts).values({
    id: postId,
    title: "Welcome to Astralith",
    content: "This is a sample post created by the seed script.",
    userId,
  });
  
  console.log("✅ Created sample post with ID:", postId);
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