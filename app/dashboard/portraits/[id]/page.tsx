"use client";
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
    <div className={cn("w-full max-w-[1272px] mx-auto gap-12 flex flex-col")}>
      <PortraitHero portrait={portrait} />
      <PortraitMemoriesSection
        portrait={portrait}
        memories={portrait?.memories || []}
        isLoading={portraitLoading}
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
