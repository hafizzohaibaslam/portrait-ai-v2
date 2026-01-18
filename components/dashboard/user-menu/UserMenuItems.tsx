"use client";
import UserMenuItem from "./UserMenuItem";
import type { MenuItem } from "@/utils/user-menu/menuItems";
import { MENU_ITEM_IDS } from "@/utils/user-menu/menuItems";

type UserMenuItemsProps = {
  items: MenuItem[];
  onItemClick?: () => void;
};

const UserMenuItems = ({ items, onItemClick }: UserMenuItemsProps) => {
  const firstOptions = items.filter(
    (item) =>
      item.id === MENU_ITEM_IDS.PROFILE || item.id === MENU_ITEM_IDS.UPGRADE
  );
  const secondOptions = items.filter(
    (item) =>
      item.id === MENU_ITEM_IDS.SETTINGS || item.id === MENU_ITEM_IDS.SUPPORT
  );
  const thirdOptions = items.filter((item) => item.id === MENU_ITEM_IDS.LOGOUT);

  return (
    <div>
      {[firstOptions, secondOptions, thirdOptions].map((options, index) => {
        return (
          <div key={index} className="last:pb-0">
            {options.map((option) => (
              <UserMenuItem
                key={option.id}
                item={option}
                onItemClick={onItemClick}
              />
            ))}
            <div className="w-full h-px bg-[#00000014]" />
          </div>
        );
      })}
    </div>
  );
};

export default UserMenuItems;
