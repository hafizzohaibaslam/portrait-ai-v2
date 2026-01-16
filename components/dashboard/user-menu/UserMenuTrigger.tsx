"use client";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/shared/UserAvatar";
import type { User } from "@/types/global-types";

type UserMenuTriggerProps = {
  user: User | null;
};

const UserMenuTrigger = ({ user }: UserMenuTriggerProps) => {
  return (
    <DropdownMenuTrigger asChild>
      <button
        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-dominant-purple-main focus:ring-offset-2 rounded-full"
        aria-label="User menu"
        aria-haspopup="true"
      >
        <UserAvatar src={user?.profile_image_url} name={user?.name} size="sm" />
      </button>
    </DropdownMenuTrigger>
  );
};

export default UserMenuTrigger;
