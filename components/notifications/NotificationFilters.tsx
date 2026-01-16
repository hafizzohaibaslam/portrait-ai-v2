"use client";
import { NotificationFilter } from "@/types/notification-types";
import { cn } from "@/lib/utils";

type NotificationFiltersProps = {
  activeFilter: NotificationFilter;
  unreadCount?: number;
  onFilterChange: (filter: NotificationFilter) => void;
};

const FILTER_LABELS: Record<NotificationFilter, string> = {
  [NotificationFilter.ALL]: "All Activities",
  [NotificationFilter.UNREAD]: "Unread",
  [NotificationFilter.PERMISSIONS]: "Permissions",
  [NotificationFilter.CONTRIBUTIONS]: "Contributions",
  [NotificationFilter.VIEWS]: "Views",
};

const NotificationFilters = ({
  activeFilter,
  unreadCount,
  onFilterChange,
}: NotificationFiltersProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 text-sm">
      {Object.values(NotificationFilter).map((filter) => {
        const label =
          filter === NotificationFilter.UNREAD && unreadCount !== undefined
            ? `${FILTER_LABELS[filter]} (${unreadCount})`
            : FILTER_LABELS[filter];

        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={cn(
              "px-4 py-2 rounded-full transition-colors whitespace-nowrap",
              activeFilter === filter
                ? "bg-accent-purple-001 text-dominant-purple-main font-medium"
                : "bg-gray-03 text-gray-5 hover:bg-gray-1"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default NotificationFilters;
