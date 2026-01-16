import { Settings, LogOut, User, HelpCircle, Crown } from "lucide-react";

export type MenuItemVariant = "default" | "destructive";

export type MenuItem = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: MenuItemVariant;
  disabled?: boolean;
  badge?: string;
};

export const MENU_ITEM_IDS = {
  PROFILE: "profile",
  UPGRADE: "upgrade",
  SETTINGS: "settings",
  SUPPORT: "support",
  LOGOUT: "logout",
} as const;

export const createMenuItems = (
  onLogout: () => void,
  onUpgrade?: () => void
): MenuItem[] => [
  {
    id: MENU_ITEM_IDS.PROFILE,
    icon: User,
    label: "My Profile",
    href: "/dashboard/settings", // TODO: Update to /dashboard/profile when profile page is created
  },
  {
    id: MENU_ITEM_IDS.UPGRADE,
    icon: Crown,
    label: "Upgrade to Pro",
    badge: "Coming soon",
    disabled: true,
    onClick: onUpgrade,
  },
  {
    id: MENU_ITEM_IDS.SETTINGS,
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
  },
  {
    id: MENU_ITEM_IDS.SUPPORT,
    icon: HelpCircle,
    label: "Help & Support",
    href: "/dashboard/support",
  },
  {
    id: MENU_ITEM_IDS.LOGOUT,
    icon: LogOut,
    label: "Sign Out",
    variant: "destructive",
    onClick: onLogout,
  },
];
