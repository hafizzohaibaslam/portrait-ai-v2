import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LandingPreHeroProps = {
  className?: string;
};

type LandingPreHeroFeatureCard = {
  icon: string;
  title: string;
  description: string;
};

const FEATURE_CARDS: LandingPreHeroFeatureCard[] = [
  {
    icon: "/images/icon-pre-hero-1.png",
    title: "What is Portrait AI?",
    description:
      "Portrait AI transforms life's journey into an immortal, shareable archive that inspires, reminds and stays highly explorable",
  },
  {
    icon: "/images/icon-pre-hero-2.png",
    title: "Getting Started",
    description:
      "Upload images, videos, documents, and more into Portrait AI. Let your portrait genie get to work for you.",
  },
  {
    icon: "/images/icon-pre-hero-3.png",
    title: "Share your portrait",
    description:
      "Portrait AI enables sharing your portrait with friends and family to contribute to your archive towards an even richer database.",
  },
  {
    icon: "/images/icon-pre-hero-4.png",
    title: "The magic begins",
    description:
      "Portrait AI makes it easy to organize, search and create custom life highlights.",
  },
];

const LandingPreHero = ({ className }: LandingPreHeroProps) => {
  return (
    <section
      className={cn(
        "mt-5 lg:mt-[98px] px-5 w-full lg:flex max-w-[1201px] mx-auto",
        className
      )}
    >
      {/* Left Side - Video */}
      <div className="lg:mr-4 lg:w-[58%] lg:max-h-[calc(100vh-91px)] lg:top-26 lg:sticky">
        <video
          className="w-full h-full rounded-[8px] lg:rounded-[12px] overflow-hidden object-cover object-top bg-gray-1"
          src="/videos/pre-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Right Side - Feature Cards + CTA */}
      <div className="mt-4 lg:mt-0 lg:ml-4 flex flex-1 flex-col h-full">
        {/* Feature Cards */}
        <div>
          {FEATURE_CARDS.map((card, index) => (
            <FeatureCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              isFirst={index === 0}
            />
          ))}
        </div>

        {/* CTA Card */}
        <CTACard />
      </div>
    </section>
  );
};

// Feature Card Component
type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  isFirst: boolean;
};

const FeatureCard = ({
  icon,
  title,
  description,
  isFirst,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "lg:sticky lg:top-26 px-6 py-8 lg:p-12 bg-purple-7 rounded-t-[8px] lg:rounded-t-[12px] space-y-[48px]",
        !isFirst && "mt-4"
      )}
    >
      <Image
        src={icon}
        alt={title}
        width={60}
        height={60}
        className="w-12 h-12 lg:w-[60px] lg:h-[60px]"
      />
      <div className="flex flex-col gap-[10px]">
        <h3 className="font-normal text-[24px] leading-[28px] tracking-[0%] text-off-black">
          {title}
        </h3>
        <p className="font-light text-[20px] leading-[28px] tracking-[0%] text-off-black">
          {description}
        </p>
      </div>
    </div>
  );
};

// CTA Card Component
const CTACard = () => {
  return (
    <div className="mt-4 lg:sticky lg:top-26 flex-1 rounded-[8px] lg:rounded-b-[12px] px-6 py-8 lg:p-12 bg-yellow-2 flex flex-col justify-between">
      <div className="space-y-3">
        <h1 className="uppercase font-medium text-[13px] leading-[17px] tracking-[.5px] text-off-black">
          portrait ai
        </h1>
        <h2 className="font-normal text-[48px] leading-[53px] tracking-[0] text-off-black">
          Let&apos;s preserve
          <br />
          your memories
          <br />
          together.
        </h2>
      </div>
      <Link
        href="/auth/sign-up"
        className={cn("mt-16 lg:mt-24 black-button max-w-[150px] px-4")}
      >
        Try for Free
      </Link>
    </div>
  );
};

export default LandingPreHero;
