"use client";

import { useState, useEffect } from "react";
import { useGenieConversation } from "@/hooks/genie/useGenieConversation";
import { useGenieHints } from "@/hooks/genie/useGenieHints";
import { useGenieActions } from "@/hooks/genie/useGenieActions";
import { useGenieFileUpload } from "@/hooks/genie/useGenieFileUpload";
import GenieHintRenderer from "./GenieHintRenderer";
import GenieActionHandler from "./GenieActionHandler";
import GenieProgressIndicator from "./GenieProgressIndicator";
import GenieWelcomeScreen from "./GenieWelcomeScreen";
import GenieMessageList from "./GenieMessageList";
import GenieChatInput from "./GenieChatInput";
import GenieFileUpload from "./attachments/GenieFileUpload";
import GenieDragDropOverlay from "./attachments/GenieDragDropOverlay";
import type { GenieAction } from "@/types/genie";

type GenieChatInterfaceProps = {
  onActionComplete?: (action: GenieAction) => void;
};

/**
 * Main orchestrator component for Genie chat functionality
 * Integrates conversation API, hints, actions, and file uploads
 */
const GenieChatInterface = ({ onActionComplete }: GenieChatInterfaceProps) => {
  const {
    conversationId,
    messages,
    collectedData,
    activeHints: conversationHints,
    pendingAction: conversationAction,
    isLoading,
    error,
    startConversation,
    continueConversation,
    retryLastMessage,
    isActionReady: conversationIsActionReady,
  } = useGenieConversation();

  // Use separate hooks for hints and actions
  const hints = useGenieHints(conversationHints);
  const actions = useGenieActions(conversationAction);

  // Sync hints and actions with conversation state
  useEffect(() => {
    hints.updateHints(conversationHints);
  }, [conversationHints, hints]);

  useEffect(() => {
    actions.updateAction(conversationAction);
  }, [conversationAction, actions]);

  // File upload hook
  const fileUpload = useGenieFileUpload();

  // Show file upload when upload hint is present
  useEffect(() => {
    if (hints.uploadHint) {
      fileUpload.showForHint(hints.uploadHint);
    } else {
      fileUpload.hideUpload();
    }
  }, [hints.uploadHint, fileUpload]);

  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleActionComplete = () => {
    if (actions.pendingAction && onActionComplete) {
      onActionComplete(actions.pendingAction);
    }
    // Optionally clear conversation after action completion
    // clearConversation();
  };

  // Clear local state when conversation is cleared
  // This happens when GeniePopupTrigger calls clearConversation
  // We'll reset local state when messages become empty and conversationId is null
  useEffect(() => {
    if (
      messages.length === 0 &&
      conversationId === null &&
      fileUpload.files.length > 0
    ) {
      // Reset local state when conversation is cleared
      // Use setTimeout to avoid synchronous setState in effect
      const timeoutId = setTimeout(() => {
        fileUpload.clearFiles();
        setInputValue("");
        setIsRecording(false);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [messages.length, conversationId, fileUpload]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() && fileUpload.files.length === 0) return;

    if (conversationId) {
      await continueConversation(message);
    } else {
      await startConversation(message);
    }

    // Clear uploaded files after sending
    fileUpload.clearFiles();
  };

  const handleSuggestionSelect = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // Show welcome screen when no messages
  const showWelcomeScreen = messages.length === 0 && !isLoading;

  return (
    <div className="flex flex-col h-full">
      {/* Progress Indicator */}
      {Object.keys(collectedData).length > 0 && (
        <GenieProgressIndicator
          collectedData={collectedData}
          actionType={actions.pendingAction?.action}
          className="mb-4"
        />
      )}

      {/* Hint Renderer (for future hint-based UI) */}
      <GenieHintRenderer hints={hints.activeHints} />

      {/* Action Handler */}
      {conversationIsActionReady && actions.pendingAction && (
        <GenieActionHandler
          action={actions.pendingAction}
          uploadedFiles={
            fileUpload.hintField === "profile_image"
              ? { profile_image: fileUpload.files[0] }
              : fileUpload.hintField === "media_file"
              ? { media_file: fileUpload.files[0] }
              : {}
          }
          onComplete={handleActionComplete}
          className="mb-4"
        />
      )}

      {/* Welcome Screen or Chat Content */}
      {showWelcomeScreen ? (
        <GenieWelcomeScreen
          onSuggestionSelect={handleSuggestionSelect}
          className="flex-1"
        />
      ) : (
        <GenieMessageList
          messages={messages}
          isLoading={isLoading}
          className="flex-1"
        />
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <div className="text-sm text-red-800">{error.message}</div>
          <button
            onClick={retryLastMessage}
            className="text-xs text-red-600 underline mt-2"
          >
            Retry
          </button>
        </div>
      )}

      {/* File Upload Component - Below messages, above input */}
      {fileUpload.isVisible && (
        <GenieFileUpload
          hint={hints.uploadHint}
          files={fileUpload.files}
          onFilesSelect={fileUpload.addFiles}
          onRemove={fileUpload.removeFile}
          className="mt-4"
        />
      )}

      {/* Drag & Drop Overlay */}
      <GenieDragDropOverlay
        isActive={fileUpload.isDragActive}
        hintLabel={fileUpload.hintLabel}
      />

      {/* Chat Input */}
      <div
        onDragEnter={fileUpload.handleDragEnter}
        onDragLeave={fileUpload.handleDragLeave}
        onDragOver={fileUpload.handleDragOver}
        onDrop={fileUpload.handleDrop}
      >
        <GenieChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          uploadHint={hints.uploadHint}
          uploadedFiles={fileUpload.files}
          onFilesChange={fileUpload.addFiles}
          isRecording={isRecording}
          onRecordingToggle={() => setIsRecording(!isRecording)}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default GenieChatInterface;
