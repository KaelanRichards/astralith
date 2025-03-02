import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const user = await currentUser();
  
  // If user is authenticated, redirect to pulse page
  if (user) {
    redirect("/pulse");
  }
  
  // If user is not authenticated, redirect to the sign-in page
  redirect("/signin");
} 