"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, 
  Users, 
  Bell, 
  FileText, 
  Lock, 
  CreditCard, 
  HelpCircle, 
  ExternalLink,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

// Define the navigation items
const navigationItems: NavigationGroup[] = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        href: "/settings/profile",
        icon: User,
      },
      {
        title: "Team",
        href: "/settings/team",
        icon: Users,
      },
      {
        title: "Notifications",
        href: "/settings/notifications",
        icon: Bell,
      },
    ],
  },
  {
    title: "Security",
    items: [
      {
        title: "Passwords",
        href: "/settings/passwords",
        icon: Lock,
      },
      {
        title: "API Keys",
        href: "/settings/api-keys",
        icon: FileText,
      },
    ],
  },
  {
    title: "Billing",
    items: [
      {
        title: "Plans",
        href: "/settings/plans",
        icon: CreditCard,
      },
      {
        title: "Invoices",
        href: "/settings/invoices",
        icon: FileText,
      },
    ],
  },
  {
    title: "Help",
    items: [
      {
        title: "Documentation",
        href: "https://docs.astralith.com",
        icon: ExternalLink,
        external: true,
      },
      {
        title: "Support",
        href: "https://help.astralith.com",
        icon: HelpCircle,
        external: true,
      },
    ],
  },
];

export default function SettingsLayout({ children }: { children: ReactNode }) {
  // Now that we're in a client component, we can use usePathname directly
  const pathname = usePathname();

  return (
    <div className="container py-6 space-y-6 md:py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <nav className="sticky top-20 flex flex-col space-y-6">
            {navigationItems.map((group) => (
              <div key={group.title} className="space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "w-full justify-start",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground",
                        "group flex"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                      {item.external && (
                        <ExternalLink className="ml-2 h-3 w-3 opacity-50" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
} 