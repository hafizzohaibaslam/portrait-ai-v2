"use client";
import { Bell } from "lucide-react";
import ResponsiveChip from "./ResponsiveChip";

type NotificationChipProps = {
  href?: string;
  onClick?: () => void;
  className?: string;
};

const NotificationChip = ({
  href = "/dashboard/notifications",
  onClick,
  className,
}: NotificationChipProps) => {
  // TODO: Get unread count from API when available
  const totalUnread = 0;

  return (
    <ResponsiveChip
      href={href}
      onClick={onClick}
      leadingNode={
        <div className="relative">
          <Bell className="w-5 h-5 stroke-dominant-purple-main" />
          {totalUnread > 0 && (
            <div className="absolute -right-1.5 -top-2 w-4 h-4 bg-dominant-purple-main text-white rounded-full flex items-center justify-center text-[10px]">
              {totalUnread}
            </div>
          )}
        </div>
      }
      text={<span>Notifications</span>}
      className={className}
    />
  );
};

export default NotificationChip;
