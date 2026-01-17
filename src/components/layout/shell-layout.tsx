"use client";

import { useEffect } from "react";
import { type ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";

interface ShellLayoutProps {
  children: ReactNode;
}

export function ShellLayout({ children }: ShellLayoutProps) {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);

  // close sidebar on mobile, but open on Desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <TopNav />

      <Sidebar />

      <main
        className={cn(
          "min-h-[calc(100vh-88px)] pt-20 md:pt-22 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "lg:ml-77" : "lg:ml-0",
        )}
      >
        <div className="container mx-auto max-w-369.5 p-4 lg:p-10">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
        />
      )}
    </div>
  );
}

