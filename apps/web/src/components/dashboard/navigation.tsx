"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Activity, Users, Archive, Map, Heart, Settings, Plug, User, Bell, LucideIcon } from "lucide-react";
import { SmartLink } from "@/components/ui/smart-link";
import { cn } from "@/lib/utils";

interface NavigationItem {
  title: string;
  href: string;
  icon: string;
  description: string;
}

export function DashboardNavigation() {
  const pathname = usePathname();

  // Map icons to their components
  const getIcon = (iconName: string): LucideIcon => {
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

  const mainNavigation: NavigationItem[] = [
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

  const settingsNavigation: NavigationItem[] = [
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

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SmartLink href="/" className="flex items-center gap-2">
          <span className="font-semibold">Astralith</span>
        </SmartLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            {mainNavigation.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <SidebarMenuItem key={item.href}>
                  <SmartLink 
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2",
                      isActive(item.href) && "font-medium text-primary"
                    )}
                    activeClassName="font-medium text-primary"
                  >
                    <SidebarMenuButton>
                      <Icon size={18} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SmartLink>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu>
            {settingsNavigation.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <SidebarMenuItem key={item.href}>
                  <SmartLink 
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2",
                      isActive(item.href) && "font-medium text-primary"
                    )}
                    activeClassName="font-medium text-primary"
                  >
                    <SidebarMenuButton>
                      <Icon size={18} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SmartLink>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
} 