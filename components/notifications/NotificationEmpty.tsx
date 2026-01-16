"use client";

type NotificationEmptyProps = {
  message?: string;
};

const NotificationEmpty = ({
  message = "No notifications found.",
}: NotificationEmptyProps) => {
  return (
    <div className="text-center py-12 text-off-gray text-sm">{message}</div>
  );
};

export default NotificationEmpty;
