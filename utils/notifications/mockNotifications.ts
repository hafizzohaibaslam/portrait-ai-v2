import type { NotificationSection } from "@/types/notification-types";
import {
  NotificationActionType,
  NotificationSectionTitle,
} from "@/types/notification-types";

export const mockNotifications: NotificationSection[] = [
  {
    title: NotificationSectionTitle.TODAY,
    items: [
      {
        id: "1",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        userName: "Sarah Mitchell",
        actionText: "requested permission to view your portrait",
        timeAgo: "2 hours ago",
        actionType: NotificationActionType.APPROVE_DECLINE,
        isUnread: true,
      },
      {
        id: "2",
        avatar: "https://i.pravatar.cc/150?u=marcus",
        userName: "Marcus Chen",
        actionText: "contributed to",
        targetText: '"Portrait Name"',
        timeAgo: "5 hours ago",
        actionType: NotificationActionType.VIEW_MEMORY,
        isUnread: true,
      },
      {
        id: "3",
        avatar: "https://i.pravatar.cc/150?u=emma",
        userName: "Emma Rodriguez",
        actionText: "viewed your portrait",
        timeAgo: "8 hours ago",
        actionType: NotificationActionType.NONE,
        isUnread: false,
      },
    ],
  },
  {
    title: NotificationSectionTitle.YESTERDAY,
    items: [
      {
        id: "4",
        avatar: "https://i.pravatar.cc/150?u=james",
        userName: "James Wilson",
        actionText: "added a new memory to your shared portrait",
        timeAgo: "Yesterday at 4:30 PM",
        actionType: NotificationActionType.VIEW_MEMORY,
        isUnread: false,
      },
      {
        id: "5",
        avatar: "https://i.pravatar.cc/150?u=olivia",
        userName: "Olivia Parker",
        actionText: "requested to collaborate on your portrait",
        timeAgo: "Yesterday at 10:15 AM",
        actionType: NotificationActionType.APPROVE_DECLINE,
        isUnread: false,
      },
    ],
  },
  {
    title: NotificationSectionTitle.THIS_WEEK,
    items: [
      {
        id: "6",
        avatar: "https://i.pravatar.cc/150?u=daniel",
        userName: "Daniel Kim",
        actionText: "viewed your",
        targetText: '"Happy days" highlights',
        timeAgo: "3 days ago",
        actionType: NotificationActionType.NONE,
        isUnread: false,
      },
      {
        id: "7",
        avatar: "https://i.pravatar.cc/150?u=sophia",
        userName: "Sophia Anderson",
        actionText: "created 'Morning Meditation' highlight from your portrait",
        timeAgo: "5 days ago",
        actionType: NotificationActionType.VIEW_HIGHLIGHT,
        isUnread: false,
      },
    ],
  },
  {
    title: NotificationSectionTitle.EARLIER,
    items: [
      {
        id: "8",
        avatar: "https://i.pravatar.cc/150?u=alex",
        userName: "Alex Thompson",
        actionText: "interacted with your portrait",
        timeAgo: "2 weeks ago",
        actionType: NotificationActionType.NONE,
        isUnread: false,
      },
    ],
  },
];
