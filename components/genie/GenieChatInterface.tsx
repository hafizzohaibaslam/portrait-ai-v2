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
import GenieContentInput from "./inputs/GenieContentInput";
import dynamic from "next/dynamic";
import type { GenieAction, GenieHint, GenieAttachment } from "@/types/genie";
import { getMediaTypeFromFile } from "@/utils/genie/media-helpers";

const VoiceRecorderDynamic = dynamic(
  () => import("@/components/shared/VoiceRecorder"),
  { ssr: false }
);

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
  const [selectedMemoryType, setSelectedMemoryType] = useState<
    "media" | "voice" | "content" | null
  >(null);
  const [contentTitle, setContentTitle] = useState("");
  const [contentDescription, setContentDescription] = useState("");

  const handleActionComplete = () => {
    if (actions.pendingAction && onActionComplete) {
      onActionComplete(actions.pendingAction);
    }
    // Optionally clear conversation after action completion
    // clearConversation();
  };

  // Handle hint action selection (duration, etc.)
  const handleActionSelect = async (hint: GenieHint, value: string) => {
    if (hint.action === "add_memory") {
      // Show memory type selector - handled by GenieHintRenderer
      return;
    }
    // Send the selected value as a message
    await handleSendMessage(value);
  };

  // Handle memory type selection
  const handleMemoryTypeSelect = (type: "media" | "voice" | "content") => {
    setSelectedMemoryType(type);
    if (type === "content") {
      // Content inputs will be shown below messages
    }
  };

  // Handle content submission
  const handleContentSubmit = async () => {
    if (!contentTitle.trim()) return;
    const message = `Title: ${contentTitle}${
      contentDescription ? `\nDescription: ${contentDescription}` : ""
    }`;
    await handleSendMessage(message);
    setContentTitle("");
    setContentDescription("");
    setSelectedMemoryType(null);
  };

  // Convert files to attachments for message
  const filesToAttachments = (files: File[]): GenieAttachment[] => {
    return files.map((file) => {
      const mediaType = getMediaTypeFromFile(file);
      const url = URL.createObjectURL(file);
      return {
        type: mediaType === "document" ? "file" : mediaType,
        url,
        name: file.name,
        file,
      };
    });
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

    // Convert uploaded files to attachments
    const attachments =
      fileUpload.files.length > 0
        ? filesToAttachments(fileUpload.files)
        : undefined;

    if (conversationId) {
      await continueConversation(message, attachments);
    } else {
      await startConversation(message, attachments);
    }

    // Clear uploaded files after sending
    fileUpload.clearFiles();
    setSelectedMemoryType(null);
  };

  // Handle file upload - just store files, don't send message yet
  const handleFilesUpload = (files: File[]) => {
    fileUpload.addFiles(files);
    // Files will be sent when user types a message and clicks send
  };

  // Handle audio recording - send immediately when recording completes
  const handleAudioRecordingComplete = async (file: File) => {
    // Convert audio file to attachment
    const attachments = filesToAttachments([file]);

    // Send message with audio attachment immediately
    // Use empty message - attachments will be displayed
    if (conversationId) {
      await continueConversation("", attachments);
    } else {
      await startConversation("", attachments);
    }
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

      {/* Hint Renderer - Action buttons */}
      <GenieHintRenderer
        hints={hints.activeHints}
        onActionSelect={handleActionSelect}
        onMemoryTypeSelect={handleMemoryTypeSelect}
      />

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
      {fileUpload.isVisible &&
        (selectedMemoryType === "media" || selectedMemoryType === null) && (
          <div className="mt-4 mb-4">
            <GenieFileUpload
              hint={hints.uploadHint}
              files={fileUpload.files}
              onFilesSelect={handleFilesUpload}
              onRemove={fileUpload.removeFile}
              onDragEnter={fileUpload.handleDragEnter}
              onDragLeave={fileUpload.handleDragLeave}
              onDragOver={fileUpload.handleDragOver}
              onDrop={fileUpload.handleDrop}
              isDragActive={fileUpload.isDragActive}
            />
          </div>
        )}

      {/* Voice Recorder - Below messages when voice type is selected */}
      {selectedMemoryType === "voice" && (
        <div className="mb-4 bg-white border border-gray-200 rounded-2xl p-4">
          <VoiceRecorderDynamic
            onRecordingComplete={(data) => {
              if (data.file) {
                handleAudioRecordingComplete(data.file);
              }
            }}
            className="border-none p-0 bg-transparent shadow-none"
          />
        </div>
      )}

      {/* Content Inputs - Below messages when content type is selected */}
      {selectedMemoryType === "content" && (
        <GenieContentInput
          onTitleChange={setContentTitle}
          onDescriptionChange={setContentDescription}
          onSubmit={handleContentSubmit}
          className="mb-4"
        />
      )}

      {/* Drag & Drop Overlay */}
      <GenieDragDropOverlay
        isActive={fileUpload.isDragActive}
        hintLabel={fileUpload.hintLabel}
      />

      {/* Chat Input */}
      <GenieChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
        uploadHint={hints.uploadHint}
        uploadedFiles={fileUpload.files}
        onFilesChange={handleFilesUpload}
        isRecording={isRecording}
        onRecordingToggle={() => setIsRecording(!isRecording)}
        onAudioRecordingComplete={handleAudioRecordingComplete}
        disabled={isLoading}
        isLoading={isLoading}
      />
    </div>
  );
};

export default GenieChatInterface;
