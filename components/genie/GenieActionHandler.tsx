"use client";

import { useState } from "react";
import { toast } from "sonner";
import { API } from "@/lib/api";
import { createFormDataFromAction } from "@/utils/genie/api-helpers";
import ThemedButton from "@/components/shared/ThemedButton";
import type { GenieAction } from "@/types/genie";

type GenieActionHandlerProps = {
  action: GenieAction | null;
  uploadedFiles: Record<string, File>;
  onComplete: () => void;
  onError?: (error: Error) => void;
  className?: string;
};

/**
 * Component that handles action execution (create_portrait, create_memory)
 * Detects when action is ready and executes the creation endpoint
 */
const GenieActionHandler = ({
  action,
  uploadedFiles,
  onComplete,
  onError,
  className,
}: GenieActionHandlerProps) => {
  const [isExecuting, setIsExecuting] = useState(false);

  if (!action || !action.ready) {
    return null;
  }

  const handleExecute = async () => {
    if (isExecuting) return;

    setIsExecuting(true);

    try {
      // Create FormData from action data and uploaded files
      const formData = createFormDataFromAction(action, uploadedFiles);

      // Call the endpoint specified in action
      await API.post(action.endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Success
      toast.success(
        action.action === "create_portrait"
          ? "Portrait created successfully!"
          : "Memory created successfully!"
      );
      onComplete();
    } catch (error) {
      // Error handling
      let errorMessage = "Failed to create resource. Please try again.";

      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response
      ) {
        const responseData = error.response.data as
          | { error?: string; message?: string }
          | undefined;
        errorMessage =
          responseData?.error || responseData?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);

      if (onError) {
        onError(
          error instanceof Error ? error : new Error(errorMessage)
        );
      }
    } finally {
      setIsExecuting(false);
    }
  };

  // Get button text based on action type
  const getButtonText = () => {
    if (isExecuting) {
      return "Creating...";
    }
    switch (action.action) {
      case "create_portrait":
        return "Create Portrait";
      case "create_memory":
        return "Create Memory";
      default:
        return "Create";
    }
  };

  return (
    <div className={className}>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
        <div className="text-sm font-medium text-purple-900 mb-2">
          Ready to create!
        </div>
        <div className="text-xs text-purple-700">
          {action.action === "create_portrait"
            ? "All required information has been collected. Click the button below to create your portrait."
            : "All required information has been collected. Click the button below to create your memory."}
        </div>
      </div>
      <ThemedButton
        onClick={handleExecute}
        variant="purple"
        rounded="lg"
        loading={isExecuting}
        disabled={isExecuting}
        className="w-full"
      >
        {getButtonText()}
      </ThemedButton>
    </div>
  );
};

export default GenieActionHandler;
