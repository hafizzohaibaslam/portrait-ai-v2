"use client";
// import { usePortraitHighlightsQuery } from "@/hooks/highlights/usePortraitHighlightsQuery";
import { useGetPortraitById } from "@/hooks/portraits/useGetPortraitById";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import PortraitHero from "@/components/portraits/portrait-detail/PortraitHero";
import PortraitMemoriesSection from "@/components/portraits/portrait-detail/PortraitMemoriesSection";
import PortraitHighlightsSection from "@/components/portraits/portrait-detail/PortraitHighlightsSection";

const PortraitsDetailPage = () => {
  const { id } = useParams();
  const { data: portrait, isLoading: portraitLoading } = useGetPortraitById(
    id as string
  );
  // const { data: highlights, isLoading: highlightsLoading } =
  //   usePortraitHighlightsQuery(id as string);

  if (portraitLoading) {
    return (
      <div className={cn("mt-24 space-y-24")}>
        <div className="animate-pulse">
          <div className="bg-gray-2 rounded-3xl h-64" />
        </div>
      </div>
    );
  }

  if (!portrait) {
    return (
      <div className={cn("mt-24 text-center")}>
        <p className="text-lg text-gray-6">Portrait not found</p>
      </div>
    );
  }

  return (
    <div className={cn("mt-24 space-y-24")}>
      <PortraitHero portrait={portrait} />
      <PortraitMemoriesSection
        portrait={portrait}
        memories={portrait?.memories || []}
      />
      <PortraitHighlightsSection
        portrait={portrait}
        // highlights={highlights}
        // isLoading={highlightsLoading}
      />
    </div>
  );
};

export default PortraitsDetailPage;
