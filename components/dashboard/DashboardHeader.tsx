"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import AppBrand from "@/components/shared/AppBrand";
import SearchChip from "./SearchChip";
import NotificationChip from "./NotificationChip";
import HelpChip from "./HelpChip";
import UserMenu from "./user-menu/UserMenu";
import SearchModal from "./SearchModal";

type DashboardHeaderProps = {
  className?: string;
};

const DashboardHeader = ({ className }: DashboardHeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-2 bg-white",
          "p-5 lg:px-12 lg:py-6",
          "flex items-center justify-between",
          "border-b-2 border-b-gray-1 lg:border-none",
          className
        )}
      >
        <AppBrand href="/dashboard" />
        <div className="flex items-center gap-3">
          <SearchChip onClick={() => setIsSearchOpen(true)} />
          <NotificationChip />
          <HelpChip />
          <UserMenu />
        </div>
      </header>
      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};

export default DashboardHeader;
