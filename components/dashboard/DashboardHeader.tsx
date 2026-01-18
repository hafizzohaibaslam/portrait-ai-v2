"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import AppBrand from "@/components/shared/AppBrand";
import SearchModal from "./SearchModal";
import Link from "next/link";
import Image from "next/image";
import UserMenu from "./user-menu/UserMenu";

type DashboardHeaderProps = {
  className?: string;
};

const DashboardHeader = ({ className }: DashboardHeaderProps) => {
  const pathname = usePathname();
  return (
    <>
      <header
        className={cn(
          "flex flex-wrap items-center justify-between gap-4",
          className
        )}
      >
        <AppBrand href="/dashboard" />
        <div className="flex flex-wrap items-center gap-3 bg-white">
          <SearchModal />
          <Link
            href="/dashboard/notifications"
            className={cn(
              "group py-2 px-3 flex items-center gap-2 rounded-[24px] shadow cursor-pointer bg-transparent hover:bg-dominant-purple-main text-dominant-purple-main hover:text-white transition-all duration-300 ease-in-out",
              pathname === "/dashboard/notifications" &&
                "bg-dominant-purple-main hover:bg-dominant-purple-main"
            )}
          >
            <Image
              src="/icons/bell.png"
              alt="Notifications"
              width={14}
              height={14}
              className={cn(
                "w-[14px] h-[14px] group-hover:filter group-hover:invert group-hover:brightness-0",
                pathname === "/dashboard/notifications" &&
                  "stroke-white filter invert brightness-0"
              )}
            />
            <span
              className={cn(
                "font-normal text-[14px] leading-[16px] tracking-[1.5%]",
                pathname === "/dashboard/notifications" && "text-white"
              )}
            >
              Notifications
            </span>
          </Link>
          <Link
            href="/dashboard/support"
            className={cn(
              "group py-2 px-3 flex items-center gap-2 rounded-[24px] shadow cursor-pointer bg-transparent hover:bg-dominant-purple-main text-dominant-purple-main hover:text-white transition-all duration-300 ease-in-out",
              pathname === "/dashboard/support" &&
                "bg-dominant-purple-main hover:bg-dominant-purple-main"
            )}
          >
            <Image
              src="/icons/info.png"
              alt="Help"
              width={14}
              height={14}
              className={cn(
                "w-[14px] h-[14px] group-hover:filter group-hover:invert group-hover:brightness-0",
                pathname === "/dashboard/support" &&
                  "stroke-white filter invert brightness-0"
              )}
            />
            <span
              className={cn(
                "font-normal text-[14px] leading-[16px] tracking-[1.5%]",
                pathname === "/dashboard/support" && "text-white"
              )}
            >
              Help
            </span>
          </Link>
          <UserMenu />
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
