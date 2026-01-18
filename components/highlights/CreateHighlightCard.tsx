"use client";
import HighlightCardWrapper from "./HighlightCardWrapper";
import DashedBorderWrapper from "@/components/shared/DashedBorderWrapper";
import Image from "next/image";

type CreateHighlightCardProps = {
  className?: string;
  onClick?: () => void;
};

const CreateHighlightCard = ({
  className,
  onClick,
}: CreateHighlightCardProps) => {
  return (
    <HighlightCardWrapper className={className}>
      <DashedBorderWrapper
        borderColorTheme="primary"
        divProps={{
          onClick,
        }}
        className="flex flex-col gap-10 items-center justify-center min-h-[240px] cursor-pointer w-full"
      >
        <div className="bg-accent-purple-001 p-4 rounded-full w-14 h-14 flex items-center justify-center">
          <Image
            src="/icons/bulb.png"
            alt="bulb"
            width={24}
            height={24}
            className="w-6 h-6 stroke-dominant-purple-main"
          />
        </div>
        <h1 className="font-light text-[16px] leading-[24px] tracking-[3%] text-off-black">
          Create new highlight
        </h1>
      </DashedBorderWrapper>
    </HighlightCardWrapper>
  );
};

export default CreateHighlightCard;
