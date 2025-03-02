import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { NavigationProgress } from "@/components/ui/navigation-progress";
import { DashboardNavigation } from "@/components/dashboard/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <ClerkProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <NavigationProgress />
          <DashboardNavigation />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-6">{children}</main>
          </div>
          <Toaster />
        </div>
      </SidebarProvider>
    </ClerkProvider>
  );
} 