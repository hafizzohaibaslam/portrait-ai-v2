"use client";

import { useState } from "react";
import { useGenieConversation } from "@/hooks/genie/useGenieConversation";
import GenieHintRenderer from "./GenieHintRenderer";
import GenieActionHandler from "./GenieActionHandler";
import GenieProgressIndicator from "./GenieProgressIndicator";
import type { GenieAction } from "@/types/genie";

type GenieChatInterfaceProps = {
  onNewChat?: () => void;
  onActionComplete?: (action: GenieAction) => void;
};

/**
 * Main orchestrator component for Genie chat functionality
 * Integrates conversation API, hints, actions, and file uploads
 */
const GenieChatInterface = ({
  onNewChat,
  onActionComplete,
}: GenieChatInterfaceProps) => {
  const {
    messages,
    collectedData,
    activeHints,
    pendingAction,
    isLoading,
    error,
    startConversation,
    continueConversation,
    clearConversation,
    retryLastMessage,
    hasActiveHints,
    isActionReady,
  } = useGenieConversation();

  // File upload state (will be managed by GenieFileUpload component in Phase 4)
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  const handleActionComplete = () => {
    if (pendingAction && onActionComplete) {
      onActionComplete(pendingAction);
    }
    // Optionally clear conversation after action completion
    // clearConversation();
  };

  const handleNewChat = () => {
    clearConversation();
    setUploadedFiles({});
    if (onNewChat) {
      onNewChat();
    }
  };

  // Show welcome screen when no messages
  const showWelcomeScreen = messages.length === 0 && !isLoading;

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
          uploadedFiles={uploadedFiles}
          onComplete={handleActionComplete}
          className="mb-4"
        />
      )}

      {/* Welcome Screen or Chat Content */}
      {showWelcomeScreen ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium mb-2">
              Hey! It&apos;s your portrait genie here.
            </p>
            <p className="text-sm">I can help you get started!</p>
            {/* GenieWelcomeScreen will be implemented in Phase 4 */}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {/* GenieMessageList will be implemented in Phase 4 */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-purple-100 text-purple-900"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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

      {/* GenieChatInput will be implemented in Phase 4 */}
      <div className="mt-4 p-4 border-t">
        <p className="text-xs text-gray-500 text-center">
          Chat input component will be implemented in Phase 4
        </p>
      </div>
    </div>
  );
};

export default GenieChatInterface;
