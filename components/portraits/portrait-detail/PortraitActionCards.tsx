"use client";

import { Heart, Sparkles, Lightbulb, Image as ImageIcon } from "lucide-react";
import PortraitActionCard from "./PortraitActionCard";
import { cn } from "@/lib/utils";

type PortraitActionCardsProps = {
  onCreateHighlights: () => void;
  onModifyImage: () => void;
  onAddMemories: () => void;
  onAskGenie: () => void;
  className?: string;
};

const PortraitActionCards = ({
  onCreateHighlights,
  onModifyImage,
  onAddMemories,
  onAskGenie,
  className,
}: PortraitActionCardsProps) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}>
      <PortraitActionCard
        icon={<Lightbulb />}
        title="Create Highlights"
        description="Generate AI-curated videos"
        onClick={onCreateHighlights}
      />
      <PortraitActionCard
        icon={<ImageIcon />}
        title="Modify Image"
        description="Transform pictures with AI"
        onClick={onModifyImage}
      />
      <PortraitActionCard
        icon={<Heart />}
        title="Add Memories"
        description="Upload life moments"
        onClick={onAddMemories}
      />
      <PortraitActionCard
        icon={<Sparkles />}
        title="Ask Portrait Genie"
        description="Discover more from your portrait"
        onClick={onAskGenie}
      />
    </div>
  );
};

export default PortraitActionCards;
