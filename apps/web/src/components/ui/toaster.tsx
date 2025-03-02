"use client";

import { useToast } from "@/components/ui/use-toast";
import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast
          key={id}
          title={title}
          description={description}
          action={action}
          onClose={() => dismiss(id)}
          {...props}
        />
      ))}
      <ToastViewport />
    </ToastProvider>
  );
} 