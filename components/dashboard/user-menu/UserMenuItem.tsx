"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/utils/user-menu/menuItems";

type UserMenuItemProps = {
  item: MenuItem;
  onItemClick?: () => void;
  className?: string;
};

const UserMenuItem = ({ item, onItemClick, className }: UserMenuItemProps) => {
  const Icon = item.icon;
  const isDestructive = item.variant === "destructive";

  const content = (
    <div
      className={cn(
        "flex items-center w-full text-base font-normal",
        isDestructive
          ? "text-red-1 fill-red-1 focus:text-red-1 focus:fill-red-1"
          : "fill-dominant-purple-main",
        item.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      <div
        className={cn(
          "*:w-[20px] *:h-[20px] md:*:w-[24px] md:*:h-[24px] rounded-xl p-2 md:p-3 aspect-square",
          isDestructive
            ? "bg-red-2"
            : "bg-accent-purple-001 *:stroke-dominant-purple-main"
        )}
      >
        <Icon />
      </div>
      <div className="pl-3 flex items-center">
        <div>{item.label}</div>
        {item.badge && (
          <div className="ml-2 px-2 py-1 rounded-full whitespace-nowrap text-xs text-dominant-purple-main border border-purple-02 bg-purple-01">
            {item.badge}
          </div>
        )}
      </div>
    </div>
  );

  if (item.href && !item.disabled) {
    return (
      <Link
        href={item.href}
        onClick={onItemClick}
        className="block hover:bg-gray-03 rounded-sm transition-colors"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={() => {
        if (!item.disabled) {
          item.onClick?.();
          onItemClick?.();
        }
      }}
      disabled={item.disabled}
      className="block w-full hover:bg-gray-03 rounded-sm transition-colors disabled:hover:bg-transparent"
    >
      {content}
    </button>
  );
};

export default UserMenuItem;
