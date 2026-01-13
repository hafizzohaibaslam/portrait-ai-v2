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
        "z-1 mt-20 lg:mt-40 relative bg-yellow-3 py-16 flex flex-col justify-end overflow-hidden",
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
    <div className="relative flex flex-col items-center text-center px-5 max-w-[690px] mx-auto">
      <Image
        src="/images/icon-padlock-aws.png"
        alt="Security"
        width={86}
        height={86}
        className="w-16 h-16 lg:w-[86px] lg:h-[86px]"
      />

      <h2 className="mt-6 lg:mt-9 text-2xl lg:text-4xl font-medium text-center">
        We value your privacy and store all memories securely.
      </h2>

      <p className="mt-4 lg:text-2xl text-black-004">
        Our{" "}
        <Link href="#" className="underline inline">
          partnership
        </Link>{" "}
        with AWS security enables us keep your data safe and inaccessible to
        uninvited parties.
      </p>

      <Link
        href="/auth/sign-up"
        className={cn(
          "mt-14 lg:mt-9 px-16!",
          "text-center px-12 py-2 lg:px-8 lg:py-3",
          "border-[1.5px] border-dominant-purple-main bg-dominant-purple-main text-white",
          "hover:bg-white hover:text-dominant-purple-main",
          "rounded-lg transition-ease"
        )}
      >
        Get Started
      </Link>
    </div>
  );
};
