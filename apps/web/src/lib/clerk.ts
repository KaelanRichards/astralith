import { Clerk } from "@clerk/clerk-js";

export const clerk = new Clerk(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "");

export async function getToken() {
  if (typeof document === "undefined") {
    console.log("getToken called in server context, returning null");
    return null;
  }

  console.log("Loading Clerk...");
  try {
    await clerk.load();
    console.log("Clerk loaded successfully");
    
    if (!clerk.session) {
      console.warn("No Clerk session available");
      return null;
    }
    
    const token = await clerk.session.getToken();
    console.log("Auth token retrieved:", token ? "Token available" : "No token");
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
}
