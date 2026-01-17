"use client";

import Image from "next/image";
import { Eye, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type GeniePortraitCardProps = {
  portraitId: string;
  imageUrl: string;
  name: string;
  onViewPortrait?: () => void;
  onCreateHighlight?: () => void;
  className?: string;
};

const GeniePortraitCard = ({
  imageUrl,
  name,
  onViewPortrait,
  onCreateHighlight,
  className,
}: GeniePortraitCardProps) => {
  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm",
        className
      )}
    >
      {/* Image */}
      <div className="relative w-full aspect-4/3 bg-gray-100">
        {imageUrl.startsWith("blob:") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{name}</h3>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {onViewPortrait && (
            <button
              onClick={onViewPortrait}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              View Portrait
            </button>
          )}
          {onCreateHighlight && (
            <button
              onClick={onCreateHighlight}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              Create Highlight
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeniePortraitCard;
