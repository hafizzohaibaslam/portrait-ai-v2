"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import CreatePortraitCard from "../portraits/CreatePortraitCard";

type DashboardSecondaryNavProps = {
  className?: string;
};

const DashboardSecondaryNav = ({ className }: DashboardSecondaryNavProps) => {
  const pathname = usePathname();

  const primaryNavs = [
    { label: "Home", href: "/dashboard/portraits" },
    { label: "My Portrait", href: "/dashboard/portraits/me" },
    { label: "Family Tree", href: "/dashboard/tree" },
  ];

  const isDashboardPage =
    pathname === "/dashboard" || pathname === "/dashboard/";
  const isPortraitsPage = pathname.startsWith("/dashboard/portraits");

  // Determine active nav based on closest match
  const getActiveNav = (href: string, index: number) => {
    if (index === 0) {
      // Home - exact match
      return href === pathname || pathname === "/dashboard/";
    }
    // Other navs - check if pathname starts with href
    return pathname.startsWith(href);
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {primaryNavs.map((nav, i) => (
          <Link
            key={i}
            href={nav.href}
            className={cn(
              "py-2 px-3 flex items-center gap-2 rounded-[24px] cursor-pointer bg-transparent",
              getActiveNav(nav.href, i) && "bg-accent-purple-001"
            )}
          >
            <span
              className={cn(
                "font-normal text-[16px] leading-[20px] tracking-[3%] text-off-black"
              )}
            >
              {nav.label}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          className={cn(
            "py-2 px-3 flex items-center gap-1 rounded-[24px] cursor-pointer bg-transparent border border-accent-purple-001 hover:bg-accent-purple-001 hover:text-off-black transition-all duration-300 ease-in-out"
          )}
        >
          <Image src="/icons/bulb.png" alt="bulb" width={16} height={16} />
          <span
            className={cn(
              "font-normal text-[14px] leading-[16px] tracking-[1.5%]"
            )}
          >
            Create Highlight
          </span>
        </button>

        {(isDashboardPage || isPortraitsPage) && (
          <CreatePortraitCard
            trigger={
              <button
                className={cn(
                  "py-2 px-3 flex items-center gap-1 rounded-[24px] cursor-pointer bg-black text-white hover:bg-white hover:text-black border border-transparent hover:border-black transition-all duration-300 ease-in-out"
                )}
              >
                <Plus className="w-[14px] h-[14px]" />
                <span
                  className={cn(
                    "font-normal text-[14px] leading-[16px] tracking-[1.5%]"
                  )}
                >
                  Create Portrait
                </span>
              </button>
            }
          />
        )}
      </div>
    </div>
  );
};

export default DashboardSecondaryNav;
