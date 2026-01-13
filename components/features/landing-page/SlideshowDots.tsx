"use client";

import { useSwiper } from "swiper/react";
import { cn } from "@/lib/utils";

type SlideshowDotsProps = {
  className?: string;
  length: number;
  activeIndex: number;
};

const SlideshowDots = ({
  className,
  length,
  activeIndex,
}: SlideshowDotsProps) => {
  const swiper = useSwiper();

  return (
    <div
      className={cn(
        "flex items-center justify-between mx-auto w-fit",
        className
      )}
    >
      {Array.from({ length }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => swiper.slideTo(index)}
          className={cn(
            "mx-[3px] cursor-pointer w-0 h-0 p-1 lg:p-[6px] rounded-full transition-ease",
            activeIndex === index ? "bg-purple-2" : "bg-purple-001"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default SlideshowDots;
