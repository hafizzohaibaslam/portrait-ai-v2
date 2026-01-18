"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LandingTestimonialsProps = {
  className?: string;
};

type Testimonial = {
  text: string;
  user: {
    name: string;
    picture: string; // Path to image
  };
};

const TESTIMONIALS: Testimonial[] = [
  {
    text: `"Since using Portrait AI, our family stays connected effortlessly. The AI-generated stories keep us engaged, and recalling shared memories has never been easier. It's truly invaluable."`,
    user: {
      name: "Elias Bouchard on X",
      picture: "/images/testimonial-pic-1.png",
    },
  },
  {
    text: `"Since using Portrait AI, our circle of friends feels closer than ever. The AI-generated summaries spark engaging conversations, and planning reunions has become a breeze. It's absolutely essential for staying connected."`,
    user: {
      name: "Jamal Crawford on IG",
      picture: "/images/testimonial-pic-2.png",
    },
  },
  {
    text: `"Since using Portrait AI, our family collaborates seamlessly on preserving our history. The AI-generated summaries keep us aligned, and creating family trees has become a joyful experience. It's become indispensable for future generations."`,
    user: {
      name: "Kira Petrova on X",
      picture: "/images/testimonial-pic-3.png",
    },
  },
] as const;

const LandingTestimonials = ({ className }: LandingTestimonialsProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, []);

  return (
    <section className={cn("mt-18 lg:mt-[96px] space-y-[37px]", className)}>
      <h2 className="font-medium text-[36px] leading-[40px] tracking-[-3%] text-off-black text-center lg:text-[40px] lg:leading-[40px] lg:tracking-[-3%]">
        What users say about us
      </h2>

      {ready && (
        <Marquee className="z-0" pauseOnHover autoFill>
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              className="mx-4"
            />
          ))}
        </Marquee>
      )}
    </section>
  );
};

export default LandingTestimonials;

// Testimonial Card Component
type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

const TestimonialCard = ({ testimonial, className }: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        "px-6 py-6 rounded-[16px] bg-purple-7 lg:text-xl flex flex-col gap-[50px] justify-between w-[400px] min-h-[240px] lg:min-h-[370px]",
        className
      )}
    >
      {/* Testimonial Text */}
      <p className="font-light text-[20px] leading-[30px] tracking-[0%] text-off-black">
        {testimonial.text}
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4 mt-auto">
        <Image
          src={testimonial.user.picture}
          alt={testimonial.user.name}
          width={56}
          height={56}
          className="w-14 h-14 rounded-full object-cover object-center"
        />
        <div className="font-normal text-[20px] leading-[27px] tracking-[0%] text-off-black">
          {testimonial.user.name}
        </div>
      </div>
    </div>
  );
};
