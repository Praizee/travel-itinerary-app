"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, ChevronDown, LogOut, User } from "lucide-react";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  CartsIcon,
  CommissionIcon,
  CreateIcon,
  DashboardIcon,
  HomeIcon,
  NotificationIcon,
  PlanIcon,
  SettingsIcon,
  WalletIcon,
} from "../icons";

const centerNavItems = [
  { label: "Home", href: "/", icon: <HomeIcon className="size-6" /> },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIcon className="size-6" />,
  },
  { label: "Wallet", href: "/wallet", icon: <WalletIcon className="size-6" /> },
  {
    label: "Plan a trip",
    href: "/plan",
    icon: <PlanIcon className="size-6" />,
  },
  {
    label: "Commission for life",
    href: "/commission",
    icon: <CommissionIcon className="size-6" />,
  },
];

const rightNavItems = [
  { label: "Notification", icon: <NotificationIcon className="size-6" /> },
  { label: "Carts", icon: <CartsIcon className="size-6" /> },
  { label: "Create", icon: <CreateIcon className="size-6" /> },
];

export function TopNav() {
  const pathname = usePathname();
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-20 md:h-22 w-full items-center justify-between gap-6 border-b border-neutral-200 bg-white px-4 md:px-8">
      {/* left: logo & search */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
          className="rounded-sm p-2 text-neutral-600 hover:bg-neutral-100 2xl:hidden"
        >
          <Menu className="size-6" />
        </button>

        <Link href="/" className="flex shrink-0 items-center">
          <div className="flex size-11 md:size-14 items-center justify-center rounded-sm bg-primary-alt">
            <Image
              src="/gopaddi-logo.svg"
              alt="Gopaddi Logo"
              className="size-7 md:size-10"
              width={42}
              height={40}
            />
          </div>
        </Link>

        <div className="relative hidden md:block">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-700" />
          <input
            type="text"
            placeholder="Search"
            className="h-14 max-w-80 2xl:w-100 rounded-sm bg-neutral-300 pl-12 pr-4 text-base text-neutral-900 outline-none transition-all placeholder:text-black-secondary focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Navigation */}
        <nav className="hidden 2xl:flex items-center gap-6">
          {centerNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-2 text-base text-center transition-colors hover:text-primary-600 font-medium",
                  isActive ? "text-neutral-900" : "text-neutral-700",
                )}
              >
                {item.icon}
                <span
                  className={cn(
                    "text-sm",
                    isActive ? "text-black-primary" : "text-black-secondary",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden h-12 w-px bg-neutral-600 2xl:block" />

        {/* actions & profile */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="hidden 2xl:block rounded-sm bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 cursor-pointer"
          >
            Subscribe
          </button>

          <div className="hidden 2xl:flex items-center gap-6">
            {rightNavItems.map((item) => (
              <button
                type="button"
                key={item.label}
                className="flex flex-col items-center gap-1 text-neutral-500 transition-colors hover:text-primary-600 cursor-pointer"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* profile dropdown */}
          <div className="relative">
            <button
              aria-label="User Profile"
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-4 pl-2 focus:outline-none cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100"
                alt="Profile"
                width={52}
                height={52}
                className="size-11 sm:size-13 rounded-full object-cover border border-neutral-200"
              />
              <ChevronDown className="size-4 text-neutral-500" />
            </button>

            {isProfileOpen && (
              <>
                {/* backdrop to close menu when clicking outside */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-56 rounded-sm bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-3 py-2 border-b border-neutral-100 mb-2">
                    <p className="text-sm font-semibold text-neutral-900">
                      Personal Account
                    </p>
                    <p className="text-xs text-neutral-500">user@example.com</p>
                  </div>

                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    <User className="size-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    <SettingsIcon className="size-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="size-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

