"use client";
import Link from "next/link";
import { UserAvatar } from "@/components/shared/UserAvatar";
import type { User } from "@/types/global-types";

type UserMenuHeaderProps = {
  user: User | null;
  onItemClick?: () => void;
};

const UserMenuHeader = ({ user, onItemClick }: UserMenuHeaderProps) => {
  return (
    <Link
      href="/dashboard/settings"
      onClick={onItemClick}
      className="flex gap-3 items-center cursor-pointer w-full hover:bg-gray-03 rounded-sm transition-colors py-[11px] px-[13px]"
    >
      <UserAvatar src={user?.profile_image_url} name={user?.name} size="sm" />
      <div className="flex flex-col overflow-hidden">
        <h3 className="font-normal text-[16px] leading-[24px] tracking-[0] text-off-black">
          {user?.name || "User"}
        </h3>
        <span className="font-normal text-[16px] leading-[24px] tracking-[0] text-gray-11">
          {user?.email}
        </span>
      </div>
    </Link>
  );
};

export default UserMenuHeader;
