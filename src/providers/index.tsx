"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { ToastProvider } from "./toast-provider";
import { MotionProvider } from "./motion-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <MotionProvider>
        {children}
        <ToastProvider />
      </MotionProvider>
    </QueryProvider>
  );
}

