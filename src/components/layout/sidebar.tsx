"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store";
import {
  ActivitiesIcon,
  ArrowUpDownIcon,
  CommissionIcon,
  DashboardIcon,
  FlightsIcon,
  HomeIcon,
  Hotel2Icon,
  ImmigrationIcon,
  MedicalIcon,
  PackageIcon,
  PlanIcon,
  StudyIcon,
  VisaIcon,
  WalletIcon,
} from "../icons";

const mobileNavItems = [
  { label: "Home", href: "/", icon: <HomeIcon className="size-4 sm:size-6" /> },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIcon className="size-4 sm:size-6" />,
  },
  {
    label: "Wallet",
    href: "/wallet",
    icon: <WalletIcon className="size-4 sm:size-6" />,
  },
  {
    label: "Plan a trip",
    href: "/plan",
    icon: <PlanIcon className="size-4 sm:size-6" />,
  },
  {
    label: "Commission for life",
    href: "/commission",
    icon: <CommissionIcon className="size-4 sm:size-6" />,
  },
];

const navItems = [
  {
    label: "Activities",
    href: "/",
    icon: <ActivitiesIcon className="size-4 sm:size-6" />,
  },
  {
    label: "Hotels",
    href: "/hotels",
    icon: <Hotel2Icon className="size-4 sm:size-6" />,
  },
  {
    label: "Flights",
    href: "/flights",
    icon: <FlightsIcon className="size-4 sm:size-6" />,
  },
  {
    label: "Study",
    href: "/study",
    icon: <StudyIcon className="size-4 sm:size-6" />,
  },
  {
    label: "Visa",
    href: "/visa",
    icon: <VisaIcon className="size-4 sm:size-6" />,
  },
  {
    label: "Immigration",
    href: "/immigration",
    icon: <ImmigrationIcon className="size-4 sm:size-6" />,
  },
  {
    label: "Medical",
    href: "/medical",
    icon: <MedicalIcon className="size-4 sm:size-6" />,
  },
  {
    label: "Vacation Packages",
    href: "/vacation-packages",
    icon: <PackageIcon className="size-4 sm:size-6" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);

  const handleMobileClose = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={cn(
        "fixed z-40 flex flex-col bg-white transition-all duration-300 ease-in-out border-r border-neutral-200",
        // Mobile Position
        "top-20 md:top-22 left-0 h-[calc(100vh-80px)] w-70 overflow-y-auto",
        // Desktop Position
        "2xl:top-28 2xl:bottom-6 2xl:left-6 2xl:h-auto 2xl:w-75",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col p-6 overflow-y-auto scrollbar-thin">
        {/* mobile nav  */}
        <nav className="space-y-1 2xl:hidden mb-4">
          {mobileNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleMobileClose} // Close on click
                className={cn(
                  "flex items-center gap-3 rounded-sm px-2.5 py-3 text-sm sm:text-base font-medium transition-colors",
                  isActive
                    ? "bg-neutral-100 text-black-primary"
                    : "text-black-secondary hover:bg-neutral-50 hover:text-neutral-900",
                )}
              >
                <span
                  className={isActive ? "text-neutral-900" : "text-neutral-700"}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* separator line (mobile only) */}
        <div className="w-full h-px bg-neutral-200 mb-4 2xl:hidden" />

        {/* main sidebar nav */}
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleMobileClose} // Close on click
                className={cn(
                  "flex items-center gap-3 rounded-sm px-2.5 py-3 text-sm sm:text-base font-medium transition-colors",
                  isActive
                    ? "bg-neutral-100 text-black-primary"
                    : "text-black-secondary hover:bg-neutral-50 hover:text-neutral-900",
                )}
              >
                <span
                  className={isActive ? "text-neutral-900" : "text-neutral-400"}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Account Section */}
        <div>
          <button
            type="button"
            className="flex items-center justify-center w-full gap-5 rounded-sm h-21.5 py-4.5 pl-3.5 pr-5.5 bg-neutral-300 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="flex size-10 shrink-0 items-center justify-center rounded bg-primary-600 text-white font-bold shadow-sm">
                GO
              </div>

              <span className="truncate text-sm font-medium text-black-secondary group-hover:text-primary-600 transition-colors">
                Personal Account
              </span>
            </div>

            <div className="shrink-0">
              <ArrowUpDownIcon className="text-neutral-700 size-5" />
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}

