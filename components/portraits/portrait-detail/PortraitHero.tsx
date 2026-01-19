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
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="bg-accent-purple-001 p-12 rounded-[20px] flex flex-col gap-11 lg:flex-row lg:justify-between">
          <PortraitHeroImage
            imageUrl={portrait.image_url}
            fallbackImageUrl={user?.profile_image_url || undefined}
            alt={portrait.name}
          />

          
          <div className="flex-1 flex flex-col gap-[22px] justify-between">
              <PortraitHeroActions
                onShare={() => {}}
                onPrivacySettings={() => {}}
              />
              <PortraitHeroInfo portrait={portrait} />
            
            <PortraitActionCards
              onCreateHighlights={() => {}}
              onModifyImage={() => {}}
              onAddMemories={() => {}}
              onAskGenie={() => {}}
            />
          </div>
      </div>
      <PortraitTimelineBanner />
    </div>
  );
};

export default PortraitHero;
