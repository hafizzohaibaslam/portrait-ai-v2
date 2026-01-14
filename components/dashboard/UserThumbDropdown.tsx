"use client";

import { useAuthContext } from "@/providers/AuthContext";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type UserThumbDropdownProps = {
  className?: string;
};

const UserThumbDropdown = ({ className }: UserThumbDropdownProps) => {
  const { user, signOut } = useAuthContext();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer">
          {user?.profile_image_url ? (
            <Image
              src={user.profile_image_url}
              alt={user.name || "User"}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-2 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-6">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("w-56", className)}>
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{user?.name || "User"}</p>
          <p className="text-xs text-gray-6">{user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserThumbDropdown;
