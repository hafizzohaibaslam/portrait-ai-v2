"use client";

import { useState, useEffect } from "react";
import { useGenieConversation } from "@/hooks/genie/useGenieConversation";
import GenieHintRenderer from "./GenieHintRenderer";
import GenieActionHandler from "./GenieActionHandler";
import GenieProgressIndicator from "./GenieProgressIndicator";
import GenieWelcomeScreen from "./GenieWelcomeScreen";
import GenieMessageList from "./GenieMessageList";
import GenieChatInput from "./GenieChatInput";
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
    activeHints,
    pendingAction,
    isLoading,
    error,
    startConversation,
    continueConversation,
    retryLastMessage,
    isActionReady,
  } = useGenieConversation();

  // File upload state (hint-based)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleActionComplete = () => {
    if (pendingAction && onActionComplete) {
      onActionComplete(pendingAction);
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
      uploadedFiles.length > 0
    ) {
      // Reset local state when conversation is cleared
      // Use setTimeout to avoid synchronous setState in effect
      const timeoutId = setTimeout(() => {
        setUploadedFiles([]);
        setInputValue("");
        setIsRecording(false);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [messages.length, conversationId, uploadedFiles.length]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() && uploadedFiles.length === 0) return;

    if (conversationId) {
      await continueConversation(message);
    } else {
      await startConversation(message);
    }

    // Clear uploaded files after sending
    setUploadedFiles([]);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // Show welcome screen when no messages
  const showWelcomeScreen = messages.length === 0 && !isLoading;

  // Get upload hint if present
  const uploadHint = activeHints.find((hint) => hint.action === "show_upload");

  return (
    <div className="flex flex-col h-full">
      {/* Progress Indicator */}
      {Object.keys(collectedData).length > 0 && (
        <GenieProgressIndicator
          collectedData={collectedData}
          actionType={pendingAction?.action}
          className="mb-4"
        />
      )}

      {/* Hint Renderer (for future hint-based UI) */}
      <GenieHintRenderer hints={activeHints} />

      {/* Action Handler */}
      {isActionReady && pendingAction && (
        <GenieActionHandler
          action={pendingAction}
          uploadedFiles={
            uploadHint?.field === "profile_image"
              ? { profile_image: uploadedFiles[0] }
              : uploadHint?.field === "media_file"
              ? { media_file: uploadedFiles[0] }
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

      {/* Chat Input */}
      <GenieChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
        uploadHint={uploadHint || null}
        uploadedFiles={uploadedFiles}
        onFilesChange={setUploadedFiles}
        isRecording={isRecording}
        onRecordingToggle={() => setIsRecording(!isRecording)}
        disabled={isLoading}
        isLoading={isLoading}
      />
    </div>
  );
};

export default GenieChatInterface;
