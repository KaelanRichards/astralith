import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LucideIcon, Activity, Users, Archive, Map, Heart, Settings, Plug, User, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Astralith - Leadership Dashboard",
  description:
    "A central, effortless hub for startup leaders with automatic insights",
};

interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/signin");
  }

  // Map icons to their components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "activity": return Activity;
      case "users": return Users;
      case "archive": return Archive;
      case "map": return Map;
      case "heart": return Heart;
      case "settings": return Settings;
      case "plug": return Plug;
      case "user": return User;
      case "bell": return Bell;
      default: return Activity;
    }
  };

  const mainNavigation = [
    {
      title: "Pulse",
      href: "/pulse",
      icon: "activity",
      description: "Your daily leadership briefing",
    },
    {
      title: "People",
      href: "/people",
      icon: "users",
      description: "Dynamic team management",
    },
    {
      title: "Vault",
      href: "/vault",
      icon: "archive",
      description: "Instant decision context",
    },
    {
      title: "Roadmap",
      href: "/roadmap",
      icon: "map",
      description: "Clear company alignment",
    },
    {
      title: "Culture",
      href: "/culture",
      icon: "heart",
      description: "Proactive culture monitoring",
    },
  ];

  const settingsNavigation = [
    {
      title: "Team Settings",
      href: "/settings/team",
      icon: "settings",
      description: "Manage your team settings",
    },
    {
      title: "Integrations",
      href: "/settings/integrations",
      icon: "plug",
      description: "Connect your tools",
    },
    {
      title: "API Keys",
      href: "/settings/api-keys",
      icon: "key",
      description: "Manage API access",
    },
    {
      title: "Notifications",
      href: "/settings/notifications",
      icon: "bell",
      description: "Configure your notifications",
    },
    {
      title: "Profile",
      href: "/settings/profile",
      icon: "user",
      description: "Manage your profile",
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="p-4 flex items-center gap-2">
            <div className="font-bold text-xl">Astralith</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarMenu>
                {mainNavigation.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.description}
                    >
                      <a href={item.href} className="flex items-center gap-2">
                        {React.createElement(getIcon(item.icon), { className: 'size-4' })}
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarMenu>
                {settingsNavigation.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.description}
                    >
                      <a href={item.href} className="flex items-center gap-2">
                        {React.createElement(getIcon(item.icon), { className: 'size-4' })}
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
} 