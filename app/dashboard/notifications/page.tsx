"use client";

import { useState, useMemo } from "react";
import { NotificationFilter } from "@/types/notification-types";
import {
  filterNotificationsByType,
  getUnreadCount,
} from "@/utils/notifications/filterNotifications";
import NotificationFilters from "@/components/notifications/NotificationFilters";
import NotificationSection from "@/components/notifications/NotificationSection";
import NotificationEmpty from "@/components/notifications/NotificationEmpty";
import { mockNotifications } from "@/utils/notifications/mockNotifications";

const NotificationPage = () => {
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>(
    NotificationFilter.ALL
  );
  const unreadCount = useMemo(() => getUnreadCount(mockNotifications), []);

  const filteredSections = useMemo(
    () => filterNotificationsByType(mockNotifications, activeFilter),
    [activeFilter]
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-off-black">Notifications</h1>
        <p className="mt-2 text-off-gray">
          Stay updated with notifications and interactions on portraits and
          memories
        </p>
      </div>

      <NotificationFilters
        activeFilter={activeFilter}
        unreadCount={unreadCount}
        onFilterChange={setActiveFilter}
      />

      <div className="space-y-8">
        {filteredSections.length > 0 ? (
          filteredSections.map((section, index) => (
            <NotificationSection
              key={`${section.title}-${index}`}
              section={section}
            />
          ))
        ) : (
          <NotificationEmpty />
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
