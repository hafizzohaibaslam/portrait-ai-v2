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
        "flex gap-2 items-center rounded-[6px] py-[10px] px-2",
        item.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      <div
        className={cn(
          "w-[32px] h-[32px] p-2 rounded-[10px] aspect-square",
          isDestructive
            ? "bg-red-2"
            : "bg-accent-purple-001 stroke-dominant-purple-main"
        )}
      >
        <Icon
          className={cn(
            "w-4 h-4",
            isDestructive
              ? "text-red-1 focus:text-red-1"
              : "text-dominant-purple-main"
          )}
        />
      </div>
      <div className="flex-1 flex items-center gap-2">
        <span
          className={cn(
            "font-normal text-[14px] leading-[24px] tracking-0",
            isDestructive ? "text-red-1" : "text-off-black"
          )}
        >
          {item.label}
        </span>
        {item.badge && (
          <div className=" px-2 py-1 rounded-full whitespace-nowrap text-xs text-dominant-purple-main border border-purple-02 bg-purple-01">
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
        className="block hover:bg-gray-03 rounded-sm transition-colors p-1"
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
      className="block w-full hover:bg-gray-03 rounded-sm transition-colors disabled:hover:bg-transparent p-1"
    >
      {content}
    </button>
  );
};

export default UserMenuItem;
