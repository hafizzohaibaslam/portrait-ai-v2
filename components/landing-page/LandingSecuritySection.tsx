// src/components/landing-page/security.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  useSecurityLayout,
  LayoutState,
} from "@/hooks/landing-page/useSecurityLayout";

type LandingSecuritySectionProps = {
  className?: string;
};

const CIRCULAR_IMAGES = [
  "/images/square-petal-1.jpg",
  "/images/square-petal-2.png",
  "/images/square-petal-3.jpg",
  "/images/square-petal-4.jpg",
  "/images/square-petal-5.png",
  "/images/square-petal-6.jpg",
  "/images/square-petal-7.jpg",
  "/images/square-petal-8.jpg",
  "/images/square-petal-9.jpg",
  "/images/square-petal-10.jpg",
  "/images/square-petal-11.jpg",
] as const;

const TOTAL_ARC = 160;

const LandingSecuritySection = ({ className }: LandingSecuritySectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const layout = useSecurityLayout(
    containerRef as React.RefObject<HTMLDivElement>
  );

  const angleStep = TOTAL_ARC / (CIRCULAR_IMAGES.length - 1);

  return (
    <section
      ref={containerRef}
      style={{ minHeight: layout.containerMinHeight }}
      className={cn(
        "z-1 mt-[90px] lg:mt-[120px] relative bg-yellow-3 py-16 flex flex-col justify-end overflow-hidden",
        className
      )}
    >
      <CircularImageArrangement
        images={CIRCULAR_IMAGES}
        layout={layout}
        angleStep={angleStep}
        totalArc={TOTAL_ARC}
        containerRef={imagesContainerRef as React.RefObject<HTMLDivElement>}
      />

      <SecurityContent />
    </section>
  );
};

export default LandingSecuritySection;

// Circular Image Arrangement Component
type CircularImageArrangementProps = {
  images: readonly string[];
  layout: LayoutState;
  angleStep: number;
  totalArc: number;
  containerRef: React.RefObject<HTMLDivElement>;
};

const CircularImageArrangement = ({
  images,
  layout,
  angleStep,
  totalArc,
  containerRef,
}: CircularImageArrangementProps) => {
  return (
    <div
      ref={containerRef}
      style={{
        transform: `rotate(${(180 - totalArc) / 2}deg)${
          layout.imagesContainer.fixed ? " translate(-50%, 0)" : ""
        }`,
        left: layout.imagesContainer.left,
        top: layout.imagesContainer.top,
        minWidth: layout.imagesContainer.fixed ? 1340 : undefined,
      }}
      className="absolute w-full h-full"
    >
      {images.map((imagePath, index) => {
        const angle = -90 + index * angleStep;

        return (
          <div
            key={index}
            style={{
              width: layout.imageSize * 1.4,
              height: layout.imageSize * 1.4,
              left: "50%",
              top: "50%",
              marginLeft: -layout.imageSize / 2,
              marginTop: -layout.imageSize / 2,
              transform: `
                translate(-50%, -50%)
                rotate(${angle}deg)
                translateY(-${layout.radius}px)
              `,
              transformOrigin: "center",
            }}
            className="absolute"
          >
            <Image
              src={imagePath}
              alt={`Security feature ${index + 1}`}
              width={layout.imageSize * 1.4}
              height={layout.imageSize * 1.4}
              className="w-full h-full rounded-4xl object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

// Content Section Component
const SecurityContent = () => {
  return (
    <div className="relative flex flex-col gap-9 items-center text-center px-5 max-w-[700px] mx-auto">
      <Image
        src="/images/icon-padlock-aws.png"
        alt="Security"
        width={96}
        height={96}
        className="w-16 h-16 lg:w-[96px] lg:h-[96px]"
      />

      <div className="space-y-4">
        <h2 className="font-medium text-[36px] leading-[40px] tracking-[-3%] text-off-black">
          We value your privacy and store all memories securely.
        </h2>

        <p className="font-light text-[24px] leading-[28px] tracking-[-3%] text-off-black">
          Our{" "}
          <Link href="#" className="underline inline">
            partnership
          </Link>{" "}
          with AWS security enables us keep your data safe and inaccessible to
          uninvited parties.
        </p>
      </div>

      <Link
        href="/auth/sign-up"
        className={cn(
          "p-[7px] rounded-[8px] bg-dominant-purple-main text-white hover:bg-transparent hover:text-dominant-purple-main border border-transparent hover:border-dominant-purple-main transition-all duration-200 cursor-pointer",
          "font-medium text-[18px] leading-[32px] tracking-[-3%] text-center w-full max-w-[200px]"
        )}
      >
        Get Started
      </Link>
    </div>
  );
};
