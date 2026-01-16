"use client";

import { useRef, useEffect } from "react";
import { Mic, Paperclip, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { GENIE_TEXTAREA_LIMITS } from "@/utils/genie/constants";
import type { GenieHint } from "@/types/genie";

// Dynamically import VoiceRecorder to avoid SSR issues
const VoiceRecorderDynamic = dynamic(
  () => import("@/components/shared/VoiceRecorder"),
  { ssr: false }
);

type GenieChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  // File upload props (hint-based)
  uploadHint?: GenieHint | null;
  uploadedFiles: File[];
  onFilesChange: (files: File[]) => void;
  // Voice recording
  isRecording: boolean;
  onRecordingToggle: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
};

/**
 * Input area component for chat messages
 * Supports text input, file uploads (hint-based), and voice recording
 */
const GenieChatInput = ({
  value,
  onChange,
  onSend,
  uploadHint,
  uploadedFiles,
  onFilesChange,
  isRecording,
  onRecordingToggle,
  disabled = false,
  isLoading = false,
  className,
}: GenieChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(
        textareaRef.current.scrollHeight,
        GENIE_TEXTAREA_LIMITS.maxHeight
      );
      textareaRef.current.style.height = `${Math.max(
        newHeight,
        GENIE_TEXTAREA_LIMITS.minHeight
      )}px`;
    }
  }, [value]);

  const handleSend = () => {
    if ((value.trim() || uploadedFiles.length > 0) && !disabled && !isLoading) {
      onSend(value.trim());
      onChange(""); // Clear input after sending
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesChange([...uploadedFiles, ...files]);
    }
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    onFilesChange(uploadedFiles.filter((_, i) => i !== index));
  };

  const canSend = value.trim().length > 0 || uploadedFiles.length > 0;
  const showUploadButton = uploadHint?.action === "show_upload";

  return (
    <div className={cn("sticky bottom-0 bg-white pt-4", className)}>
      {/* File Attachment Previews */}
      {uploadedFiles.length > 0 && (
        <div className="flex gap-2 mb-2 overflow-x-auto px-2">
          {uploadedFiles.map((file, idx) => (
            <div
              key={idx}
              className="relative flex items-center bg-gray-100 rounded-lg p-2 border border-gray-200 shrink-0"
            >
              <div className="text-xs truncate max-w-[150px] text-gray-700">
                {file.name}
              </div>
              <button
                type="button"
                className="ml-2 hover:bg-gray-200 rounded-full p-1 transition-colors"
                onClick={() => removeFile(idx)}
                aria-label="Remove file"
              >
                <X className="w-3 h-3 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Voice Recording UI */}
      {isRecording ? (
        <div className="relative border rounded-3xl p-4 shadow-sm bg-gray-50">
          <div className="absolute top-2 right-2 z-10">
            <button
              type="button"
              onClick={onRecordingToggle}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Cancel recording"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <VoiceRecorderDynamic
            onRecordingComplete={(data) => {
              if (data.file) {
                onFilesChange([...uploadedFiles, data.file]);
                onRecordingToggle();
              }
            }}
            className="border-none p-0 bg-transparent shadow-none"
          />
        </div>
      ) : (
        /* Text Input Area */
        <div className="relative flex items-end gap-2 border rounded-[26px] px-2 py-2 shadow-sm focus-within:ring-2 focus-within:ring-purple-100 transition-all bg-white">
          {/* File Upload Button (only shown when hint is active) */}
          {showUploadButton && (
            <label className="cursor-pointer p-2 transition-colors hover:bg-gray-100 rounded-full mb-px">
              <Paperclip className="w-5 h-5" />
              <input
                type="file"
                className="hidden"
                multiple
                accept={
                  uploadHint.field === "profile_image" ? "image/*" : "*/*"
                }
                onChange={handleFileSelect}
              />
            </label>
          )}

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400 text-sm resize-none py-2 max-h-[200px] overflow-y-auto"
            placeholder="Ask me anything about preserving memories!"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled || isLoading}
          />

          {/* Send Button or Mic Button */}
          {canSend ? (
            <button
              type="button"
              onClick={handleSend}
              disabled={disabled || isLoading}
              className="cursor-pointer p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors mb-px disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onRecordingToggle}
              className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 transition-colors mb-px"
              aria-label="Start voice recording"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* Footer Text */}
      <div className="text-center text-xs text-gray-400 mt-4">
        Portrait Genie can make mistakes. Check important info.
      </div>
    </div>
  );
};

export default GenieChatInput;
