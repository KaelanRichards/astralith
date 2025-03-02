import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ToastProps } from "./use-toast";

const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "destructive";
    onClose?: () => void;
  } & ToastProps
>(({ className, variant = "default", onClose, title, description, action, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        variant === "default" && "border-border bg-background text-foreground",
        variant === "destructive" && "border-destructive bg-destructive text-destructive-foreground",
        className
      )}
      {...props}
    >
      <div className="grid gap-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      {action}
      {onClose && (
        <button
          onClick={onClose}
          className={cn(
            "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
            variant === "destructive" && "text-red-300 hover:text-red-50"
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
    </div>
  );
});
Toast.displayName = "Toast";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const ToastViewport = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => {
  return (
    <ol
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )}
      {...props}
    />
  );
});
ToastViewport.displayName = "ToastViewport";

export { Toast, ToastProvider, ToastViewport }; 