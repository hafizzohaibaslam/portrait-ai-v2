import { cn } from "@/lib/utils";
import HeroSlideshow from "./HeroSlideshow";

type LandingHeroProps = {
  className?: string;
};

const HERO_IMAGES = [
  "/images/hero-image.png",
  "/images/hero-image-1.png",
  "/images/hero-image-2.png",
] as const;

const LandingHero = ({ className }: LandingHeroProps) => {
  return (
    <section className={cn("mt-16 lg:mt-[186px]", className)}>
      <h2 className="text-2xl lg:text-4xl font-medium text-center max-w-[314px] lg:max-w-[580px] mx-auto">
        Moments, Memories, & Highlights that richly capture a life story.
      </h2>
      <HeroSlideshow images={HERO_IMAGES} className="mt-8  lg:mt-14 w-full" />
    </section>
  );
};
export default LandingHero;
