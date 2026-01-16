"use client";
import UserMenuItem from "./UserMenuItem";
import type { MenuItem } from "@/utils/user-menu/menuItems";
import { MENU_ITEM_IDS } from "@/utils/user-menu/menuItems";

type UserMenuItemsProps = {
  items: MenuItem[];
  onItemClick?: () => void;
};

const RenderOptions = ({
  options,
  onOptionClick,
  className,
}: {
  options: MenuItem[];
  onOptionClick?: () => void;
  className?: string;
}) => (
  <div className={className}>
    {options.map((option, i) => (
      <UserMenuItem
        key={option.id}
        item={option}
        onItemClick={onOptionClick}
        className={i > 0 ? "mt-4" : ""}
      />
    ))}
  </div>
);

const UserMenuItems = ({ items, onItemClick }: UserMenuItemsProps) => {
  // Group items: profile/upgrade, settings/support, logout
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
    <>
      {[
        firstOptions,
        secondOptions,
        thirdOptions,
      ].map((options, i) => (
        <RenderOptions
          key={i}
          options={options}
          onOptionClick={onItemClick}
          className="last:pb-0"
        />
      ))}
    </>
  );
};

export default UserMenuItems;
