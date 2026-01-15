"use client";

import type { Portrait } from "@/types/portrait-types";
import type { Highlight } from "@/types/highlights";
import PortraitHighlightsHeader from "./PortraitHighlightsHeader";
import PortraitHighlightsGrid from "./PortraitHighlightsGrid";
import PortraitHighlightsFooter from "./PortraitHighlightsFooter";
import { cn } from "@/lib/utils";

type PortraitHighlightsSectionProps = {
  portrait: Portrait;
  highlights?: Highlight[];
  isLoading?: boolean;
  className?: string;
};

const PortraitHighlightsSection = ({
  highlights,
  isLoading,
  className,
}: PortraitHighlightsSectionProps) => {
  return (
    <div className={cn("", className)}>
      <PortraitHighlightsHeader />
      <PortraitHighlightsGrid highlights={highlights} isLoading={isLoading} />
      {highlights && highlights.length > 0 && <PortraitHighlightsFooter />}
    </div>
  );
};

export default PortraitHighlightsSection;
