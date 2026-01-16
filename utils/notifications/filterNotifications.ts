import type { NotificationSection } from "@/types/notification-types";
import {
  NotificationFilter,
  NotificationActionType,
} from "@/types/notification-types";

export const filterNotificationsByType = (
  sections: NotificationSection[],
  filter: NotificationFilter
): NotificationSection[] => {
  if (filter === NotificationFilter.ALL) {
    return sections;
  }

  return sections
    .map((section) => {
      let filteredItems = section.items;

      switch (filter) {
        case NotificationFilter.UNREAD:
          filteredItems = section.items.filter((item) => item.isUnread);
          break;
        case NotificationFilter.PERMISSIONS:
          filteredItems = section.items.filter(
            (item) => item.actionType === NotificationActionType.APPROVE_DECLINE
          );
          break;
        case NotificationFilter.CONTRIBUTIONS:
          filteredItems = section.items.filter(
            (item) => item.actionType === NotificationActionType.VIEW_MEMORY
          );
          break;
        case NotificationFilter.VIEWS:
          filteredItems = section.items.filter(
            (item) => item.actionType === NotificationActionType.NONE
          );
          break;
        default:
          filteredItems = section.items;
      }

      return {
        ...section,
        items: filteredItems,
      };
    })
    .filter((section) => section.items.length > 0);
};

export const getUnreadCount = (sections: NotificationSection[]): number => {
  return sections.reduce(
    (count, section) =>
      count + section.items.filter((item) => item.isUnread).length,
    0
  );
};
