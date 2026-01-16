"use client";

import { Maximize, MessageSquarePlus, Minimize, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ThemedButton from "@/components/shared/ThemedButton";

type GenieModalHeaderProps = {
  onClose: () => void;
  onNewChat: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  className?: string;
};

const GenieModalHeader = ({
  onClose,
  onNewChat,
  onToggleFullscreen,
  isFullscreen,
  className,
}: GenieModalHeaderProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-2xl bg-white",
        className
      )}
    >
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src="/images/woman-genie.png"
            alt="Portrait Genie"
            fill
            className="object-cover"
          />
        </div>
        <span className="pl-4 text-xl font-medium">Portrait Genie</span>
      </div>
      <div className="flex items-center gap-4">
        {/* New Chat Button */}
        <div>
          <ThemedButton
            onClick={onNewChat}
            variant="black"
            rounded="lg"
            className="hidden md:flex !px-6 !py-2"
          >
            New Chat
          </ThemedButton>
          <button
            onClick={onNewChat}
            className="block md:hidden w-fit h-fit box-content p-2 cursor-pointer justify-center items-center rounded-full bg-gray-6 hover:bg-gray-5 transition-colors"
            aria-label="New Chat"
          >
            <MessageSquarePlus className="w-5 h-5" />
          </button>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className="w-fit h-fit box-content p-2 cursor-pointer justify-center items-center rounded-full bg-gray-6 hover:bg-gray-5 transition-colors"
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5" />
          ) : (
            <Maximize className="w-5 h-5" />
          )}
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-fit h-fit box-content p-2 cursor-pointer justify-center items-center rounded-full bg-gray-6 hover:bg-gray-5 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GenieModalHeader;
