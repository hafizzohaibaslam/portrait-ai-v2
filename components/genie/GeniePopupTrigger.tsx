"use client";

import { useGenieModalState } from "@/hooks/genie/useGenieModalState";
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

  const handleNewChat = () => {
    startNewChat();
    // Additional logic can be added here if needed
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
          close();
        }
      }}
      isFullscreen={isFullscreen}
      onToggleFullscreen={toggleFullscreen}
      onNewChat={handleNewChat}
    >
      <GenieChatInterface
        onNewChat={handleNewChat}
        onActionComplete={handleActionComplete}
      />
    </GenieModal>
  );
};

export default GeniePopupTrigger;
