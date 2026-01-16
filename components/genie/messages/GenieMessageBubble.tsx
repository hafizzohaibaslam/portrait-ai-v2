"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GenieMessage } from "@/types/genie";

type GenieMessageBubbleProps = {
  message: GenieMessage;
  isLatest?: boolean;
};

/**
 * Individual message bubble component
 * Displays user and assistant messages with appropriate styling
 */
const GenieMessageBubble = ({
  message,
  isLatest = false,
}: GenieMessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-5 gap-3",
        isUser ? "flex-row-reverse justify-end" : "flex-row justify-start"
      )}
    >
      {/* Genie Avatar (only for assistant messages) */}
      {!isUser && (
        <div className="relative w-7 h-7 rounded-full overflow-hidden mt-2 shrink-0">
          <Image
            src="/images/woman-genie.png"
            alt="Portrait Genie"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Message Content */}
      <div className="flex-1 flex flex-col gap-2 w-full">
        {/* Text Bubble */}
        {message.content && (
          <div
            className={cn(
              "p-3 rounded-2xl w-fit whitespace-pre-wrap",
              isUser
                ? "bg-purple-100 text-purple-900 rounded-tr-sm self-end"
                : "bg-gray-100 border border-gray-200 text-gray-800 rounded-tl-sm self-start"
            )}
          >
            {message.content}
          </div>
        )}

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div
            className={cn(
              "flex flex-wrap gap-2",
              isUser ? "justify-end" : "justify-start"
            )}
          >
            {message.attachments.map((attachment, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs text-gray-600"
              >
                {attachment.name}
              </div>
            ))}
          </div>
        )}

        {/* Loading State */}
        {message.isLoading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
            </div>
            <span>Genie is thinking...</span>
          </div>
        )}

        {/* Error State */}
        {message.error && (
          <div className="text-red-500 text-sm">{message.error}</div>
        )}
      </div>
    </div>
  );
};

export default GenieMessageBubble;
