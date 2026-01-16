# UserThumbDropdown Component - Detailed Analysis & Refactoring Plan

## Current Implementation Analysis

### Component Structure (`portrait-ai-v2/components/dashboard/UserThumbDropdown.tsx`)

**Current Implementation:**
- 74 lines of code
- Single component handling multiple responsibilities
- Uses Radix UI DropdownMenu primitives
- Direct integration with AuthContext and router

**What it does:**
1. Displays user avatar/initials as trigger
2. Shows dropdown menu with:
   - User info (name, email)
   - Settings link
   - Sign out button
3. Handles sign out logic directly

---

## Issues Identified

### 1. **Violation of Single Responsibility Principle (SRP)**
The component handles:
- ✅ Avatar rendering (with fallback)
- ✅ Dropdown menu structure
- ✅ User info display
- ✅ Menu items rendering
- ✅ Sign out logic
- ✅ Navigation logic

**Problem:** Too many responsibilities in one component

### 2. **Limited Functionality**
Compared to old codebase:
- ❌ Missing "My Profile" option
- ❌ Missing "Help & Support" option
- ❌ Missing "Upgrade to Pro" option (even if disabled)
- ❌ No logout confirmation modal
- ❌ User info header not clickable (should link to profile)

### 3. **Hardcoded Menu Items**
- Menu items are hardcoded in JSX
- No easy way to add/remove items
- No configuration or extensibility

### 4. **Avatar Logic Mixed**
- Avatar rendering logic is inline
- Fallback logic could be reusable
- No separate UserAvatar component

### 5. **No Error Handling**
- No handling for sign out failures
- No loading states
- No error feedback

### 6. **Accessibility Concerns**
- Missing ARIA labels
- No keyboard navigation hints
- Button trigger could be more semantic

### 7. **Type Safety**
- User type has optional fields but no null checks
- No proper fallbacks for missing data

---

## Old Codebase Comparison

### Old Implementation Structure:
```
UserThumbDropdown (wrapper)
  ├── UserThumb (avatar component)
  ├── UserThumbDropdownOptions (menu content)
  │   ├── User info header (clickable, links to profile)
  │   ├── First options group (Profile, Upgrade)
  │   ├── Second options group (Settings, Support)
  │   └── Third options group (Logout)
  └── LogoutModal (confirmation dialog)
```

### Old Implementation Features:
- ✅ Separate UserThumb component (reusable)
- ✅ Separate UserThumbDropdownOptions component
- ✅ Logout confirmation modal
- ✅ More menu options
- ✅ Clickable user info header
- ✅ Grouped menu items with dividers
- ✅ Better visual hierarchy
- ✅ Support for disabled items
- ✅ Support for tags/badges ("Coming soon")

---

## Refactoring Plan

### Architecture Overview

```
components/dashboard/user-menu/
  ├── UserMenu.tsx                    # Main container (orchestrator)
  ├── UserMenuTrigger.tsx             # Avatar trigger component
  ├── UserMenuHeader.tsx              # User info header (clickable)
  ├── UserMenuItems.tsx               # Menu items container
  ├── UserMenuItem.tsx                # Individual menu item
  └── LogoutConfirmationModal.tsx     # Logout confirmation

components/shared/
  └── UserAvatar.tsx                  # Reusable avatar component

utils/user-menu/
  └── menuItems.ts                    # Menu items configuration
```

---

## Detailed Refactoring Steps

### 1. **User Avatar Component** (`components/shared/UserAvatar.tsx`)

**Purpose:** Reusable avatar component with fallback

**Features:**
- Handles profile image display
- Fallback to initials
- Fallback to default icon
- Configurable size
- Proper alt text

```typescript
"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_CLASSES = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

export const UserAvatar = ({
  src,
  name,
  size = "sm",
  className,
}: UserAvatarProps) => {
  const initials = name?.[0]?.toUpperCase() || "U";
  const sizeClasses = SIZE_CLASSES[size];

  if (src) {
    return (
      <Image
        src={src}
        alt={name || "User"}
        width={size === "sm" ? 32 : size === "md" ? 40 : 48}
        height={size === "sm" ? 32 : size === "md" ? 40 : 48}
        className={cn(
          "rounded-full object-cover",
          sizeClasses,
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-gray-2 flex items-center justify-center",
        sizeClasses,
        className
      )}
    >
      <span className="font-medium text-gray-6">{initials}</span>
    </div>
  );
};
```

### 2. **Menu Items Configuration** (`utils/user-menu/menuItems.ts`)

**Purpose:** Centralized menu configuration

**Features:**
- Type-safe menu items
- Easy to extend
- Support for disabled items
- Support for badges/tags

```typescript
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
    href: "/dashboard/profile",
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
```

### 3. **User Menu Item Component** (`components/dashboard/user-menu/UserMenuItem.tsx`)

**Purpose:** Individual menu item rendering

**Features:**
- Handles links and buttons
- Supports variants (default, destructive)
- Supports disabled state
- Supports badges

```typescript
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { MenuItem } from "@/utils/user-menu/menuItems";

type UserMenuItemProps = {
  item: MenuItem;
  onItemClick?: () => void;
};

export const UserMenuItem = ({
  item,
  onItemClick,
}: UserMenuItemProps) => {
  const Icon = item.icon;
  const isDestructive = item.variant === "destructive";

  const content = (
    <>
      <Icon
        className={cn(
          "h-4 w-4",
          isDestructive && "text-red-error"
        )}
      />
      <span>{item.label}</span>
      {item.badge && (
        <span className="ml-auto px-2 py-0.5 rounded-full text-xs text-dominant-purple-main border border-purple-02 bg-purple-01">
          {item.badge}
        </span>
      )}
    </>
  );

  if (item.href && !item.disabled) {
    return (
      <DropdownMenuItem asChild disabled={item.disabled}>
        <Link href={item.href} onClick={onItemClick}>
          {content}
        </Link>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem
      onClick={() => {
        item.onClick?.();
        onItemClick?.();
      }}
      disabled={item.disabled}
      variant={isDestructive ? "destructive" : "default"}
    >
      {content}
    </DropdownMenuItem>
  );
};
```

### 4. **User Menu Header Component** (`components/dashboard/user-menu/UserMenuHeader.tsx`)

**Purpose:** User info header (clickable, links to profile)

**Features:**
- Displays user name and email
- Clickable to navigate to profile
- Uses UserAvatar component
- Proper truncation for long text

```typescript
"use client";

import Link from "next/link";
import { UserAvatar } from "@/components/shared/UserAvatar";
import type { User } from "@/types/global-types";

type UserMenuHeaderProps = {
  user: User | null;
  onItemClick?: () => void;
};

export const UserMenuHeader = ({
  user,
  onItemClick,
}: UserMenuHeaderProps) => {
  return (
    <Link
      href="/dashboard/profile"
      onClick={onItemClick}
      className="flex items-center gap-3 px-2 py-3 hover:bg-gray-03 rounded-sm transition-colors"
    >
      <UserAvatar
        src={user?.profile_image_url}
        name={user?.name}
        size="md"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {user?.name || "User"}
        </p>
        <p className="text-xs text-gray-5 truncate">{user?.email}</p>
      </div>
    </Link>
  );
};
```

### 5. **User Menu Items Component** (`components/dashboard/user-menu/UserMenuItems.tsx`)

**Purpose:** Groups menu items with separators

**Features:**
- Groups items logically
- Adds separators between groups
- Handles item clicks

```typescript
"use client";

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { UserMenuItem } from "./UserMenuItem";
import type { MenuItem } from "@/utils/user-menu/menuItems";

type UserMenuItemsProps = {
  items: MenuItem[];
  onItemClick?: () => void;
};

export const UserMenuItems = ({
  items,
  onItemClick,
}: UserMenuItemsProps) => {
  // Group items: profile/upgrade, settings/support, logout
  const profileGroup = items.filter(
    (item) => item.id === "profile" || item.id === "upgrade"
  );
  const settingsGroup = items.filter(
    (item) => item.id === "settings" || item.id === "support"
  );
  const logoutGroup = items.filter((item) => item.id === "logout");

  return (
    <>
      {profileGroup.length > 0 && (
        <>
          {profileGroup.map((item) => (
            <UserMenuItem
              key={item.id}
              item={item}
              onItemClick={onItemClick}
            />
          ))}
          <DropdownMenuSeparator />
        </>
      )}

      {settingsGroup.length > 0 && (
        <>
          {settingsGroup.map((item) => (
            <UserMenuItem
              key={item.id}
              item={item}
              onItemClick={onItemClick}
            />
          ))}
          <DropdownMenuSeparator />
        </>
      )}

      {logoutGroup.map((item) => (
        <UserMenuItem key={item.id} item={item} onItemClick={onItemClick} />
      ))}
    </>
  );
};
```

### 6. **Logout Confirmation Modal** (`components/dashboard/user-menu/LogoutConfirmationModal.tsx`)

**Purpose:** Confirmation dialog before logout

**Features:**
- Prevents accidental logouts
- Better UX
- Loading state

```typescript
"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ThemedButton from "@/components/shared/ThemedButton";

type LogoutConfirmationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
};

export const LogoutConfirmationModal = ({
  open,
  onOpenChange,
  onConfirm,
}: LogoutConfirmationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error("Logout failed:", error);
      // Error handling could show toast here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-2 flex items-center justify-center">
              <LogOut className="w-6 h-6 text-red-error" />
            </div>
            <DialogTitle>Log Out</DialogTitle>
          </div>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-5">
            Are you sure you want to log out? You'll need to sign in again to
            access your memories and profile.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <ThemedButton
            variant="white"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            rounded="lg"
          >
            Cancel
          </ThemedButton>
          <ThemedButton
            variant="destructive"
            onClick={handleConfirm}
            loading={isLoading}
            rounded="lg"
          >
            Log Out
          </ThemedButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

### 7. **User Menu Trigger Component** (`components/dashboard/user-menu/UserMenuTrigger.tsx`)

**Purpose:** Avatar trigger button

**Features:**
- Uses UserAvatar component
- Proper accessibility
- Semantic button

```typescript
"use client";

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/shared/UserAvatar";
import type { User } from "@/types/global-types";

type UserMenuTriggerProps = {
  user: User | null;
};

export const UserMenuTrigger = ({ user }: UserMenuTriggerProps) => {
  return (
    <DropdownMenuTrigger asChild>
      <button
        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-dominant-purple-main focus:ring-offset-2 rounded-full"
        aria-label="User menu"
        aria-haspopup="true"
      >
        <UserAvatar
          src={user?.profile_image_url}
          name={user?.name}
          size="sm"
        />
      </button>
    </DropdownMenuTrigger>
  );
};
```

### 8. **Main User Menu Component** (`components/dashboard/user-menu/UserMenu.tsx`)

**Purpose:** Main orchestrator component

**Features:**
- Coordinates all sub-components
- Manages dropdown state
- Handles logout flow

```typescript
"use client";

import { useState } from "react";
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/providers/AuthContext";
import { createMenuItems } from "@/utils/user-menu/menuItems";
import { UserMenuTrigger } from "./UserMenuTrigger";
import { UserMenuHeader } from "./UserMenuHeader";
import { UserMenuItems } from "./UserMenuItems";
import { LogoutConfirmationModal } from "./LogoutConfirmationModal";
import { cn } from "@/lib/utils";

type UserMenuProps = {
  className?: string;
};

export const UserMenu = ({ className }: UserMenuProps) => {
  const { user, signOut } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutRequest = () => {
    setIsOpen(false);
    setShowLogoutModal(true);
  };

  const handleLogout = async () => {
    await signOut();
    // Router push is handled in AuthContext
  };

  const menuItems = createMenuItems(handleLogoutRequest);

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <UserMenuTrigger user={user} />
        <DropdownMenuContent
          align="end"
          className={cn("w-56", className)}
        >
          <UserMenuHeader user={user} onItemClick={() => setIsOpen(false)} />
          <UserMenuItems items={menuItems} onItemClick={() => setIsOpen(false)} />
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutConfirmationModal
        open={showLogoutModal}
        onOpenChange={setShowLogoutModal}
        onConfirm={handleLogout}
      />
    </>
  );
};
```

---

## Benefits of Refactoring

### 1. **Single Responsibility Principle (SRP)**
- Each component has one clear purpose
- Easy to understand and maintain
- Easy to test

### 2. **Composition Over Inheritance**
- Small, reusable components
- Flexible composition
- Easy to extend

### 3. **Better Functionality**
- More menu options (Profile, Support, Upgrade)
- Logout confirmation
- Clickable user header
- Better UX

### 4. **Reusability**
- UserAvatar can be used elsewhere
- Menu items configuration is reusable
- Components are composable

### 5. **Better Error Handling**
- Loading states
- Error handling in logout
- Proper feedback

### 6. **Accessibility**
- Proper ARIA labels
- Keyboard navigation
- Focus management

### 7. **Maintainability**
- Clear file structure
- Easy to add/remove menu items
- Centralized configuration

---

## Migration Checklist

- [ ] Create UserAvatar component
- [ ] Create menu items configuration
- [ ] Create UserMenuItem component
- [ ] Create UserMenuHeader component
- [ ] Create UserMenuItems component
- [ ] Create LogoutConfirmationModal component
- [ ] Create UserMenuTrigger component
- [ ] Create main UserMenu component
- [ ] Update DashboardHeader to use new component
- [ ] Test all functionality
- [ ] Remove old component

---

## Testing Strategy

1. **Unit Tests**
   - UserAvatar rendering (with/without image)
   - Menu items rendering
   - Logout modal interaction

2. **Integration Tests**
   - Dropdown open/close
   - Menu item clicks
   - Logout flow

3. **E2E Tests**
   - Full user menu interaction
   - Logout confirmation flow
   - Navigation to different pages
