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
    <section
      className={cn(
        "mt-16 lg:mt-[120px] w-full max-w-[1106px] mx-auto space-y-[55px]",
        className
      )}
    >
      <h2 className="font-medium text-[36px] leading-[40px] tracking-[-3%] text-off-black w-full max-w-[707px] mx-auto text-center">
        Moments, Memories, & Highlights that richly capture a life story.
      </h2>
      <HeroSlideshow images={HERO_IMAGES} className="mt-8  lg:mt-14 w-full" />
    </section>
  );
};
export default LandingHero;
