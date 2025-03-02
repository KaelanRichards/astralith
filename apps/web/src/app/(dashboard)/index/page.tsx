import { redirect } from "next/navigation";

// This dashboard index page redirects to the pulse page
export default function DashboardIndexPage() {
  redirect("/pulse");
} 