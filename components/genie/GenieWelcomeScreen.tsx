"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { GENIE_SUGGESTIONS } from "@/utils/genie/constants";

type GenieWelcomeScreenProps = {
  suggestions?: string[];
  onSuggestionSelect: (suggestion: string) => void;
  className?: string;
};

/**
 * Welcome/empty state component displayed when there are no messages
 */
const GenieWelcomeScreen = ({
  suggestions = GENIE_SUGGESTIONS,
  onSuggestionSelect,
  className,
}: GenieWelcomeScreenProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-full space-y-6",
        className
      )}
    >
      {/* Genie Avatar */}
      <div className="w-fit h-fit rounded-full box-content p-[6px] bg-white shadow-xl shadow-black/15">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image
            src="/images/woman-genie.png"
            alt="Portrait Genie"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="mt-2 text-center space-y-1">
        <h2 className="text-2xl font-medium">
          Hey! It&apos;s your portrait genie here.
        </h2>
        <p className="text-lg text-gray-600">I can help you get started!</p>
      </div>

      {/* Suggestions */}
      <div className="pt-8">
        <div className="text-sm text-gray-500 mb-4">Need ideas? Try these</div>
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
          {suggestions.map((text, index) => (
            <button
              key={index}
              onClick={() => onSuggestionSelect(text)}
              className={cn(
                "px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-sm text-gray-700",
                "hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200",
                "text-center max-w-[250px] cursor-pointer"
              )}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenieWelcomeScreen;
