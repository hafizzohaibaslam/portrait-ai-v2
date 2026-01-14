"use client";
import Link from "next/link";
import { useGetAllHighlights } from "@/hooks/highlights/useGetAllHighlights";
import HighlightSectionHeader from "@/components/highlights/HighlightSectionHeader";
import HighlightGrid from "@/components/highlights/HighlightGrid";
import HighlightCard from "@/components/highlights/HighlightCard";
import HighlightCardSkeleton from "@/components/highlights/HighlightCardSkeleton";
import CreateHighlightCard from "@/components/highlights/CreateHighlightCard";
import SeeAllLink from "@/components/portraits/SeeAllLink";
import { cn } from "@/lib/utils";

type HighlightsSectionProps = {
  className?: string;
};

const HighlightsSection = ({ className }: HighlightsSectionProps) => {
  const { data: highlights, isLoading } = useGetAllHighlights();

  return (
    <section className={cn("", className)}>
      <HighlightSectionHeader title="Your Highlights" />
      <HighlightGrid className="mt-6">
        <CreateHighlightCard />
        {isLoading ? (
          <>
            <HighlightCardSkeleton />
            <HighlightCardSkeleton />
            <HighlightCardSkeleton />
          </>
        ) : //  : error ? (
        //   <div className="col-span-full text-center text-red-error py-8">
        //     Failed to load highlights. Please try again.
        //   </div>
        // )
        highlights && highlights.length > 0 ? (
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
      {highlights && highlights.length > 0 && (
        <SeeAllLink href="/dashboard/highlights" className="mt-4" />
      )}
    </section>
  );
};

export default HighlightsSection;
