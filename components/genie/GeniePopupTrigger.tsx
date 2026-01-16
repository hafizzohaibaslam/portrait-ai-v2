"use client";
import { useState } from "react";
import { useGenieModalState } from "@/hooks/genie/useGenieModalState";
import { clearConversationId } from "@/utils/genie/storage";
import GenieFloatingButton from "./GenieFloatingButton";
import GenieModal from "./GenieModal";
import GenieChatInterface from "./GenieChatInterface";

type GeniePopupTriggerProps = {
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
};

/**
 * Main trigger component that combines GenieFloatingButton and GenieModal
 * Similar to AiPopupTrigger in the old codebase
 */
const GeniePopupTrigger = ({
  className,
  containerRef,
}: GeniePopupTriggerProps) => {
  const { isOpen, isFullscreen, open, close, toggleFullscreen, startNewChat } =
    useGenieModalState();

  // Use a key to force remount of GenieChatInterface when resetting
  const [chatKey, setChatKey] = useState(0);

  const handleNewChat = () => {
    // Clear conversation ID from localStorage
    clearConversationId();
    // Force remount of GenieChatInterface to reset all state
    setChatKey((prev) => prev + 1);
    startNewChat();
  };

  const handleClose = () => {
    // Clear conversation ID from localStorage when modal closes
    clearConversationId();
    // Force remount of GenieChatInterface to reset all state
    setChatKey((prev) => prev + 1);
    close();
  };

  const handleActionComplete = () => {
    // Optionally clear conversation or handle action completion
    // This will be enhanced when we integrate with useGenieConversation
  };

  return (
    <GenieModal
      trigger={
        <GenieFloatingButton
          className={className}
          containerRef={containerRef}
          onClick={open}
        />
      }
      isOpen={isOpen}
      onOpenChange={(isDialogOpen) => {
        if (isDialogOpen) {
          open();
        } else {
          handleClose();
        }
      }}
      isFullscreen={isFullscreen}
      onToggleFullscreen={toggleFullscreen}
      onNewChat={handleNewChat}
    >
      <GenieChatInterface
        key={chatKey}
        onActionComplete={handleActionComplete}
      />
    </GenieModal>
  );
};

export default GeniePopupTrigger;
