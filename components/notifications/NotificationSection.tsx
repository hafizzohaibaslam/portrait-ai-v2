"use client";

import type { NotificationSection as NotificationSectionType } from "@/types/notification-types";
import NotificationItem from "./NotificationItem";

type NotificationSectionProps = {
  section: NotificationSectionType;
};

const NotificationSection = ({ section }: NotificationSectionProps) => {
  if (section.items.length === 0) {
    return null;
  }

  return (
    <div className="rounded-t-2xl border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50 bg-gray-50">
        <h3 className="text-xs font-semibold text-gray-5 uppercase tracking-wider relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-dominant-purple-main">
          {section.title}
        </h3>
      </div>
      <div className="divide-y divide-gray-50">
        {section.items.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NotificationSection;
