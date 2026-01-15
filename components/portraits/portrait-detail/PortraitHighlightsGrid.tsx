"use client";

import Link from "next/link";
import type { Highlight } from "@/types/highlights";
import HighlightCard from "@/components/highlights/HighlightCard";
import CreateHighlightCard from "@/components/highlights/CreateHighlightCard";
import HighlightCardSkeleton from "@/components/highlights/HighlightCardSkeleton";
import HighlightGrid from "@/components/highlights/HighlightGrid";
import { cn } from "@/lib/utils";

type PortraitHighlightsGridProps = {
  highlights?: Highlight[];
  isLoading?: boolean;
  className?: string;
};

const PortraitHighlightsGrid = ({
  highlights,
  isLoading,
  className,
}: PortraitHighlightsGridProps) => {
  return (
    <HighlightGrid className={cn("mt-6", className)}>
      <CreateHighlightCard />
      {isLoading ? (
        <>
          <HighlightCardSkeleton />
          <HighlightCardSkeleton />
          <HighlightCardSkeleton />
        </>
      ) : highlights && highlights.length > 0 ? (
        highlights.map((highlight) => (
          <Link
            key={highlight.highlight_id}
            href={`/dashboard/highlights/${highlight.highlight_id}`}
          >
            <HighlightCard highlight={highlight} />
          </Link>
        ))
      ) : null}
    </HighlightGrid>
  );
};

export default PortraitHighlightsGrid;
