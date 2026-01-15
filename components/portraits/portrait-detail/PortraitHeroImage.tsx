"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type PortraitHeroImageProps = {
  imageUrl?: string;
  fallbackImageUrl?: string;
  alt: string;
  className?: string;
};

const PortraitHeroImage = ({
  imageUrl,
  fallbackImageUrl,
  alt,
  className,
}: PortraitHeroImageProps) => {
  const displayImage = imageUrl || fallbackImageUrl;

  return (
    <div className={cn("shrink-0 w-full lg:w-[400px]", className)}>
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md bg-gray-200 min-h-[300px] lg:min-h-[400px]">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={alt}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-300 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default PortraitHeroImage;
