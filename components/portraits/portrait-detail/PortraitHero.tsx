"use client";
import type { Portrait } from "@/types/portrait-types";
import { useAuthContext } from "@/providers/AuthContext";
import PortraitHeroImage from "./PortraitHeroImage";
import PortraitHeroInfo from "./PortraitHeroInfo";
import PortraitHeroActions from "./PortraitHeroActions";
import PortraitActionCards from "./PortraitActionCards";
import PortraitTimelineBanner from "./PortraitTimelineBanner";
import { cn } from "@/lib/utils";

type PortraitHeroProps = {
  portrait: Portrait;
  className?: string;
};

const PortraitHero = ({ portrait, className }: PortraitHeroProps) => {
  const { user } = useAuthContext();
  return (
    <div className={cn("", className)}>
      {/* Main Card */}
      <div className="bg-accent-purple-001 rounded-3xl p-6 lg:p-10 shadow-sm border border-purple-50">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Portrait Image - Left Side */}
          <PortraitHeroImage
            imageUrl={portrait.image_url}
            fallbackImageUrl={user?.profile_image_url || undefined}
            alt={portrait.name}
          />

          {/* Content - Right Side */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="pt-4">
              {/* Top Links */}
              <PortraitHeroActions
                onShare={() => {}}
                onPrivacySettings={() => {}}
              />

              {/* Name */}
              <PortraitHeroInfo portrait={portrait} />
            </div>

            {/* Action Cards Grid */}
            <PortraitActionCards
              onCreateHighlights={() => {}}
              onModifyImage={() => {}}
              onAddMemories={() => {}}
              onAskGenie={() => {}}
            />
          </div>
        </div>
      </div>
      <PortraitTimelineBanner />
    </div>
  );
};

export default PortraitHero;
