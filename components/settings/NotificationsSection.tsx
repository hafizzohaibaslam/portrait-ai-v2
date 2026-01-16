"use client";
import Switch from "@/components/ui/switch";
import type { NotificationKey, SettingsFormData } from "@/types/settings";

type NotificationsSectionProps = {
  formData: SettingsFormData;
  onToggle: (key: NotificationKey) => void;
};

const NotificationsSection = ({
  formData,
  onToggle,
}: NotificationsSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start lg:items-center justify-between">
        <div>
          <h4 className="font-medium text-sm">Email Notifications</h4>
          <p className="text-sm text-black-004">
            Receive notifications via email
          </p>
        </div>
        <Switch
          checked={formData.notifications?.email ?? false}
          onCheckedChange={() => onToggle("email")}
        />
      </div>
      <div className="w-full h-px bg-gray-1"></div>
      <div className="flex items-start lg:items-center justify-between">
        <div>
          <h4 className="font-medium text-sm">Push Notifications</h4>
          <p className="text-sm text-black-004">Receive push notifications</p>
        </div>
        <Switch
          checked={formData.notifications?.push ?? false}
          onCheckedChange={() => onToggle("push")}
        />
      </div>
    </div>
  );
};

export default NotificationsSection;
