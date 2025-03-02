"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SmartLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  activeClassName?: string;
  exactMatch?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function SmartLink({
  className,
  activeClassName,
  exactMatch = false,
  onClick,
  children,
  href,
  ...props
}: SmartLinkProps) {
  const pathname = usePathname();
  const isActive = exactMatch
    ? pathname === href
    : pathname.startsWith(href.toString());
    
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger navigation events for external links
    if (typeof href === "string" && !href.startsWith("http")) {
      // Dispatch a custom event that the NavigationProgress component listens for
      window.dispatchEvent(new Event("navigation-start"));
    }
    
    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };
  
  return (
    <Link
      className={cn(
        className,
        isActive && activeClassName
      )}
      href={href}
      onClick={handleClick}
      prefetch={true}
      {...props}
    >
      {children}
    </Link>
  );
} 