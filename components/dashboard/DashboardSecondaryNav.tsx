"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import NavChip from "./NavChip";
import CreatePortraitChip from "./CreatePortraitChip";
import CreateHighlightChip from "./CreateHighlighChip";

type DashboardSecondaryNavProps = {
  className?: string;
};

const DashboardSecondaryNav = ({ className }: DashboardSecondaryNavProps) => {
  const pathname = usePathname();

  const primaryNavs = [
    { label: "Home", href: "/dashboard" },
    { label: "My Portrait", href: "/dashboard/portraits" },
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
    <div className={cn("md:flex items-center justify-between", className)}>
      <div className="flex items-center justify-between md:justify-start space-x-2">
        {primaryNavs.map((nav, i) => (
          <NavChip key={i} href={nav.href} active={getActiveNav(nav.href, i)}>
            {nav.label}
          </NavChip>
        ))}
      </div>
      <div className="mt-7 md:mt-0 flex items-center justify-end md:justify-start">
        <CreateHighlightChip />
        {(isDashboardPage || isPortraitsPage) && (
          <CreatePortraitChip className="hidden md:flex ml-3" />
        )}
      </div>
    </div>
  );
};

export default DashboardSecondaryNav;
