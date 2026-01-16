"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { GENIE_MODAL_SIZES } from "@/utils/genie/constants";
import GenieModalHeader from "./GenieModalHeader";

type GenieModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onNewChat: () => void;
  className?: string;
  title?: string;
  description?: string;
};

const GenieModal = ({
  trigger,
  children,
  isOpen,
  onOpenChange,
  isFullscreen,
  onToggleFullscreen,
  onNewChat,
  className,
  title = "Portrait Genie",
  description = "AI assistant for creating portraits and memories",
}: GenieModalProps) => {
  const modalSizes = isFullscreen
    ? GENIE_MODAL_SIZES.fullscreen
    : GENIE_MODAL_SIZES.default;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* Trigger is handled externally via onClick */}
      {trigger}
      <DialogContent
        className={cn(
          "bg-transparent",
          "bottom-4 top-[unset] translate-y-0",
          "md:bottom-[unset] md:top-[50%] md:translate-y-[-50%]",
          "flex flex-col p-0 outline-0",
          "rounded-xl md:rounded-2xl overflow-hidden",
          "border-none",
          className
        )}
        style={{
          width: modalSizes.width,
          maxWidth: modalSizes.maxWidth,
          height: modalSizes.height,
        }}
        showCloseButton={false}
      >
        {/* Invisible but accessible title + description */}
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>

        {/* Header */}
        <GenieModalHeader
          onClose={() => onOpenChange(false)}
          onNewChat={onNewChat}
          onToggleFullscreen={onToggleFullscreen}
          isFullscreen={isFullscreen}
        />

        {/* Content */}
        <div
          className={cn(
            "flex-1 bg-white rounded-xl md:rounded-2xl p-4 pr-2 overflow-hidden"
          )}
        >
          <div className="w-full h-full overflow-y-auto pr-2">
            <div
              className={cn(
                "w-full h-full flex flex-col",
                isFullscreen && "max-w-[900px] mx-auto"
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GenieModal;
