"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GenieMessage } from "@/types/genie";
import GenieMessageBubble from "./messages/GenieMessageBubble";

type GenieMessageListProps = {
  messages: GenieMessage[];
  isLoading?: boolean;
  className?: string;
};

/**
 * Container component for displaying list of messages
 * Handles auto-scroll to bottom and loading states
 */
const GenieMessageList = ({
  messages,
  isLoading = false,
  className,
}: GenieMessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return null; // Let GenieWelcomeScreen handle empty state
  }

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-col space-y-4 overflow-y-auto", className)}
    >
      {/* Loading state when fetching initial messages */}
      {isLoading && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
        </div>
      )}

      {/* Messages */}
      {messages.map((message, idx) => (
        <GenieMessageBubble
          key={message.id}
          message={message}
          isLatest={idx === messages.length - 1}
        />
      ))}

      {/* Loading indicator for new messages */}
      {isLoading && messages.length > 0 && (
        <div className="flex items-center gap-2 text-gray-400 text-sm ml-12">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
          </div>
          <span>Genie is thinking...</span>
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default GenieMessageList;
