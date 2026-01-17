"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GenieMessage } from "@/types/genie";
import { getMediaTypeFromUrl } from "@/utils/genie/media-helpers";
import GenieMediaGrid from "../media/GenieMediaGrid";
import GenieHighlightPlayer from "../media/GenieHighlightPlayer";
import GenieAudioPlayer from "../media/GenieAudioPlayer";
import GeniePortraitCard from "../cards/GeniePortraitCard";
import GenieHighlightCard from "../cards/GenieHighlightCard";

type GenieMessageBubbleProps = {
  message: GenieMessage;
  isLatest?: boolean;
};

/**
 * Individual message bubble component
 * Displays user and assistant messages with appropriate styling
 * Handles media display logic: single video → HighlightPlayer, multiple → MediaGrid, single audio → AudioPlayer
 */
const GenieMessageBubble = ({
  message,
  isLatest = false,
}: GenieMessageBubbleProps) => {
  const isUser = message.role === "user";

  // Separate attachments by type - use attachment.type instead of URL detection
  const attachments = message.attachments || [];
  const audioAttachments = attachments.filter((att) => att.type === "audio");
  const visualAttachments = attachments.filter(
    (att) => att.type === "image" || att.type === "video"
  );
  const allMediaAttachments = attachments.filter((att) => att.type !== "file");

  // Determine display logic
  const hasSingleAudio = audioAttachments.length === 1 && attachments.length === 1;
  const hasSingleVideo =
    visualAttachments.length === 1 && visualAttachments[0]?.type === "video";
  const hasMultipleMedia = allMediaAttachments.length > 1;

  return (
    <div
      className={cn(
        "flex w-full mb-5 gap-3",
        isUser ? "flex-row-reverse justify-end" : "flex-row justify-start"
      )}
    >
      {/* Genie Avatar (only for assistant messages) */}
      {!isUser && (
        <div className="relative w-7 h-7 rounded-full overflow-hidden mt-2 shrink-0">
          <Image
            src="/images/woman-genie.png"
            alt="Portrait Genie"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Message Content */}
      <div className="flex-1 flex flex-col gap-2 w-full">
        {/* Text Bubble */}
        {message.content && (
          <div
            className={cn(
              "p-3 rounded-2xl w-fit whitespace-pre-wrap",
              isUser
                ? "bg-purple-100 text-purple-900 rounded-tr-sm self-end"
                : "bg-gray-100 border border-gray-200 text-gray-800 rounded-tl-sm self-start"
            )}
          >
            {message.content}
          </div>
        )}

        {/* Portrait Card */}
        {message.portraitCard && (
          <GeniePortraitCard
            portraitId={message.portraitCard.portrait_id}
            imageUrl={message.portraitCard.image_url}
            name={message.portraitCard.name}
            className={cn(isUser && "ml-auto")}
          />
        )}

        {/* Highlight Card */}
        {message.highlightCard && (
          <GenieHighlightCard
            highlightId={message.highlightCard.highlight_id}
            videoUrl={message.highlightCard.video_url}
            title={message.highlightCard.title}
            className={cn(isUser && "ml-auto")}
          />
        )}

        {/* Media Display Logic */}
        {hasSingleAudio ? (
          <GenieAudioPlayer
            src={audioAttachments[0]?.url}
            title={audioAttachments[0]?.name}
            isUser={isUser}
          />
        ) : hasSingleVideo && !hasMultipleMedia ? (
          <GenieHighlightPlayer
            src={visualAttachments[0]?.url}
            isUser={isUser}
          />
        ) : allMediaAttachments.length > 0 ? (
          <GenieMediaGrid
            attachments={allMediaAttachments}
            isUser={isUser}
          />
        ) : null}

        {/* Loading State - Only show for assistant messages */}
        {message.isLoading && message.role === "assistant" && (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
            </div>
            <span>Genie is thinking...</span>
          </div>
        )}

        {/* Error State */}
        {message.error && (
          <div className="text-red-500 text-sm">{message.error}</div>
        )}
      </div>
    </div>
  );
};

export default GenieMessageBubble;
