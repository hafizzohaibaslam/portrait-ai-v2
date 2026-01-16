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
      className="flex items-center cursor-pointer w-full hover:bg-gray-03 rounded-sm transition-colors"
    >
      <UserAvatar src={user?.profile_image_url} name={user?.name} size="md" />
      <div className="pl-3 flex-1 overflow-hidden">
        <div className="text-lg line-clamp-1 font-semibold">
          {user?.name || "User"}
        </div>
        <div className="text-black-004 line-clamp-1 text-sm">{user?.email}</div>
      </div>
    </Link>
  );
};

export default UserMenuHeader;
