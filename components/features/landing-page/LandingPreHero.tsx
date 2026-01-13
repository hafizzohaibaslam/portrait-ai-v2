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
        "mt-5 lg:mt-[98px] px-5 lg:px-[156px] lg:flex items-stretch",
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
        "lg:sticky lg:top-26 px-6 py-8 lg:p-12 bg-purple-7 rounded-t-[8px] lg:rounded-t-[12px]",
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
      <h3 className="mt-8 lg:mt-12 text-xl lg:text-2xl">{title}</h3>
      <p className="mt-2 font-light lg:text-xl">{description}</p>
    </div>
  );
};

// CTA Card Component
const CTACard = () => {
  return (
    <div className="mt-4 lg:sticky lg:top-26 flex-1 rounded-[8px] lg:rounded-b-[12px] px-6 py-8 lg:p-12 bg-yellow-2 flex flex-col justify-between">
      <div>
        <div className="uppercase text-xs lg:text-sm font-medium">
          portrait ai
        </div>
        <h2 className="mt-3 text-4xl lg:text-5xl">
          Let&apos;s preserve
          <br />
          your memories
          <br />
          together.
        </h2>
      </div>
      <Link
        href="/auth/sign-up"
        className={cn(
          "w-fit mt-16 lg:mt-24",
          "text-center px-12 py-2 lg:px-8 lg:py-3",
          "border-[1.5px] border-off-black bg-off-black text-white",
          "hover:bg-white hover:text-off-black",
          "rounded-lg transition-ease"
        )}
      >
        Try for Free
      </Link>
    </div>
  );
};

export default LandingPreHero;
