// src/components/landing-page/hero-slideshow.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { cn } from "@/lib/utils";
import SlideshowDots from "./SlideshowDots";

type HeroSlideshowProps = {
  images: readonly string[];
  className?: string;
};

const HeroSlideshow = ({ images, className }: HeroSlideshowProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={cn("relative pb-6", className)}>
      <Swiper
        slidesPerView={1}
        centeredSlides
        centerInsufficientSlides
        autoplay
        modules={[Autoplay, A11y]}
        onSlideChange={(swiper: SwiperType) => {
          setActiveIndex(swiper.activeIndex);
        }}
        className="h-full! [&>.swiper-wrapper]:items-stretch rounded-xl overflow-hidden [&>.swiper-wrapper]:max-h-[660px]"
      >
        {images.map((imagePath, index) => (
          <SwiperSlide key={index} className="w-full! h-auto! mr-0!">
            <div className="w-full h-full p-8">
              <Image
                src={imagePath}
                alt={`Hero image ${index + 1}`}
                width={1200}
                height={660}
                className="w-auto h-full mx-auto object-contain shadow-[0_0_10px_12px_rgba(179,152,163,0.1)] rounded-md"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots */}
      {images.length > 1 && (
        <SlideshowDots
          className="absolute bottom-0 left-[50%] translate-x-[-50%] z-1 transition-ease"
          length={images.length}
          activeIndex={activeIndex}
        />
      )}
    </div>
  );
};

export default HeroSlideshow;
