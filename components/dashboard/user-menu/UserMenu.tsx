"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/providers/AuthContext";
import { createMenuItems } from "@/utils/user-menu/menuItems";
import UserMenuTrigger from "./UserMenuTrigger";
import UserMenuHeader from "./UserMenuHeader";
import UserMenuItems from "./UserMenuItems";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import { cn } from "@/lib/utils";

type UserMenuProps = {
  className?: string;
};

const UserMenu = ({ className }: UserMenuProps) => {
  const { user, signOut } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutRequest = () => {
    setIsOpen(false);
    setShowLogoutModal(true);
  };

  const handleLogout = async () => {
    await signOut();
    // Router push is handled in AuthContext
  };

  const menuItems = createMenuItems(handleLogoutRequest);
  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <UserMenuTrigger user={user} />
        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className={cn(
            "w-[300px] p-0! border border-[#EAEAEA] rounded-[8px] shadow",
            className
          )}
        >
          <div className="flex flex-col">
            <UserMenuHeader user={user} onItemClick={() => setIsOpen(false)} />
            <div className="w-full h-px bg-[#00000014]" />
            <UserMenuItems
              items={menuItems}
              onItemClick={() => setIsOpen(false)}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutConfirmationModal
        open={showLogoutModal}
        onOpenChange={setShowLogoutModal}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default UserMenu;
