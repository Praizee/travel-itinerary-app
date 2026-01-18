"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          fontFamily: "Poppins, sans-serif",
        },
        classNames: {
          toast: "bg-white border border-neutral-300",
          title: "text-black-primary text-sm font-medium",
          description: "text-neutral-700 text-sm",
          success: "border-l-4 border-l-green-500",
          error: "border-l-4 border-l-error-900",
        },
      }}
      richColors
      closeButton
    />
  );
}

