"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { GenieHint } from "@/types/genie";
import { GENIE_FILE_LIMITS } from "@/utils/genie/constants";

/**
 * Hook for managing file uploads with hint awareness
 * Handles file selection, drag & drop, and hint-based visibility
 */
export const useGenieFileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [hintField, setHintField] = useState<
    "profile_image" | "media_file" | undefined
  >();
  const [hintLabel, setHintLabel] = useState<string | undefined>();
  const [isVisible, setIsVisible] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Show upload UI for specific hint
  const showForHint = useCallback((hint: GenieHint) => {
    if (hint.action === "show_upload") {
      setIsVisible(true);
      setHintField(hint.field);
      setHintLabel(hint.label);
    }
  }, []);

  // Hide upload UI
  const hideUpload = useCallback(() => {
    setIsVisible(false);
    setHintField(undefined);
    setHintLabel(undefined);
  }, []);

  // Validate file
  const validateFile = useCallback(
    (file: File): { valid: boolean; error?: string } => {
      // Check file size
      if (file.size > GENIE_FILE_LIMITS.maxSize) {
        return {
          valid: false,
          error: `File size exceeds ${
            GENIE_FILE_LIMITS.maxSize / (1024 * 1024)
          }MB limit`,
        };
      }

      // Check file type (basic check)
      const fileType = file.type;
      const isImage = fileType.startsWith("image/");
      const isVideo = fileType.startsWith("video/");
      const isAudio = fileType.startsWith("audio/");

      if (!isImage && !isVideo && !isAudio && fileType !== "") {
        // Allow other file types but warn
        return { valid: true };
      }

      return { valid: true };
    },
    []
  );

  // Add files
  const addFiles = useCallback(
    (newFiles: File[]) => {
      const validFiles: File[] = [];
      const errors: string[] = [];

      newFiles.forEach((file) => {
        const validation = validateFile(file);
        if (validation.valid) {
          validFiles.push(file);
        } else if (validation.error) {
          errors.push(`${file.name}: ${validation.error}`);
        }
      });

      if (errors.length > 0) {
        console.warn("File validation errors:", errors);
        // Could show toast notifications here
      }

      if (validFiles.length > 0) {
        setFiles((prev) => {
          const combined = [...prev, ...validFiles];
          // Limit total files
          return combined.slice(0, GENIE_FILE_LIMITS.maxFiles);
        });
      }
    },
    [validateFile]
  );

  // Remove file
  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Clear all files
  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  // Open file dialog
  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Handle drag events
  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isVisible) {
        setIsDragActive(true);
      }
    },
    [isVisible]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (!isVisible) return;

      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length > 0) {
        addFiles(droppedFiles);
      }
    },
    [isVisible, addFiles]
  );

  // Auto-hide when hint is cleared
  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => {
        setIsDragActive(false);
      }, 0);
    }
  }, [isVisible]);

  return {
    files,
    hintField,
    hintLabel,
    isVisible,
    isDragActive,
    fileInputRef,
    addFiles,
    removeFile,
    clearFiles,
    openFileDialog,
    showForHint,
    hideUpload,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
};
