"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function NavigationProgress() {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isNavigating, setIsNavigating] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);
  
  // Reset navigation state and progress when pathname changes
  React.useEffect(() => {
    setIsNavigating(false);
    setProgress(0);
    
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [pathname, timeoutId]);
  
  // Start navigation progress when user clicks a link
  React.useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsNavigating(true);
      
      // Simulate progress increments
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 10;
        if (currentProgress > 90) {
          clearInterval(interval);
          return;
        }
        setProgress(currentProgress);
      }, 300);
      
      // Clean up interval on completion
      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, 5000); // Safeguard in case navigation takes too long
      
      setTimeoutId(timeout as unknown as NodeJS.Timeout);
    };
    
    // Attach event listener for route changes
    window.addEventListener("navigation-start", handleRouteChangeStart);
    
    return () => {
      window.removeEventListener("navigation-start", handleRouteChangeStart);
    };
  }, []);
  
  if (!isNavigating) {
    return null;
  }
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-50"
      style={{ width: `${progress}%` }}
      initial={{ width: "0%" }}
      animate={{ width: `${progress}%` }}
      transition={{ ease: "easeInOut" }}
    />
  );
} 