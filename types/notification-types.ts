export const NotificationActionType = {
  APPROVE_DECLINE: 'approve_decline',
  VIEW_MEMORY: 'view_memory',
  VIEW_HIGHLIGHT: 'view_highlight',
  NONE: 'none',
} as const;

export type NotificationActionType =
  (typeof NotificationActionType)[keyof typeof NotificationActionType];

export const NotificationFilter = {
  ALL: 'all',
  UNREAD: 'unread',
  PERMISSIONS: 'permissions',
  CONTRIBUTIONS: 'contributions',
  VIEWS: 'views',
} as const;

export type NotificationFilter =
  (typeof NotificationFilter)[keyof typeof NotificationFilter];

export const NotificationSectionTitle = {
  TODAY: 'Today',
  YESTERDAY: 'Yesterday',
  THIS_WEEK: 'This Week',
  EARLIER: 'Earlier',
} as const;

export type NotificationSectionTitle =
  (typeof NotificationSectionTitle)[keyof typeof NotificationSectionTitle];

export type NotificationItem = {
  id: string;
  avatar: string;
  userName: string;
  actionText: string;
  targetText?: string;
  timeAgo: string;
  actionType: NotificationActionType;
  isUnread: boolean;
};

export type NotificationSection = {
  title: NotificationSectionTitle;
  items: NotificationItem[];
};
