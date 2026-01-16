"use client";

import { Check, Eye, X } from "lucide-react";
import type { NotificationItem as NotificationItemType } from "@/types/notification-types";
import { NotificationActionType } from "@/types/notification-types";
import { cn } from "@/lib/utils";
import Image from "next/image";

type NotificationItemProps = {
  item: NotificationItemType;
  onApprove?: (id: string) => void;
  onDecline?: (id: string) => void;
  onViewMemory?: (id: string) => void;
  onViewHighlight?: (id: string) => void;
};

const NotificationItem = ({
  item,
  onApprove,
  onDecline,
  onViewMemory,
  onViewHighlight,
}: NotificationItemProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 transition-colors",
        item.isUnread &&
          "bg-accent-purple-001/24 border-l-4 border-l-dominant-purple-main"
      )}
    >
      <Image
        width={40}
        height={40}
        src={item.avatar}
        alt={item.userName}
        className="w-10 h-10 rounded-full object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-off-black">
            <span className="font-semibold">{item.userName}</span>{" "}
            <span className="text-gray-5">{item.actionText}</span>
            {item.targetText && (
              <>
                {" "}
                <span className="text-off-black">{item.targetText}</span>
              </>
            )}
          </p>
          <p className="text-xs text-off-gray">{item.timeAgo}</p>
        </div>

        <div className="mt-3 flex items-center gap-3">
          {item.actionType === NotificationActionType.APPROVE_DECLINE && (
            <>
              <button
                onClick={() => onApprove?.(item.id)}
                className="px-4 py-2 bg-dominant-purple-main text-white rounded-full text-xs flex items-center gap-1 hover:bg-dominant-purple-main/90 transition-colors"
              >
                <Check size={16} />
                <span>Approve</span>
              </button>
              <button
                onClick={() => onDecline?.(item.id)}
                className="px-4 py-2 bg-white border border-gray-3 text-gray-7 rounded-full text-xs flex items-center gap-1 hover:bg-red-2 hover:border-red-1 transition-colors"
              >
                <X size={16} />
                <span>Decline</span>
              </button>
            </>
          )}

          {item.actionType === NotificationActionType.VIEW_MEMORY && (
            <button
              onClick={() => onViewMemory?.(item.id)}
              className="px-4 py-2 bg-white border border-gray-3 text-gray-7 rounded-full text-xs flex items-center gap-1 hover:bg-gray-03 transition-colors"
            >
              <Eye size={16} />
              <span>View Memory</span>
            </button>
          )}

          {item.actionType === NotificationActionType.VIEW_HIGHLIGHT && (
            <button
              onClick={() => onViewHighlight?.(item.id)}
              className="px-4 py-2 bg-white border border-gray-3 text-gray-7 rounded-full text-xs flex items-center gap-1 hover:bg-gray-03 transition-colors"
            >
              <Eye size={16} />
              <span>View Highlight</span>
            </button>
          )}
        </div>
      </div>
      {item.isUnread && (
        <div
          className="w-2 h-2 rounded-full bg-dominant-purple-main shrink-0 mt-2"
          aria-label="Unread notification"
        />
      )}
    </div>
  );
};

export default NotificationItem;
