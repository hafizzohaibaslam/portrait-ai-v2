"use client";
import { Lightbulb } from "lucide-react";
import HighlightCardWrapper from "./HighlightCardWrapper";
import DashedBorderWrapper from "@/components/shared/DashedBorderWrapper";

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
        className="flex flex-col items-center justify-center h-full cursor-pointer"
      >
        <div className="bg-accent-purple-001 p-4 rounded-full">
          <Lightbulb className="w-6 h-6 stroke-dominant-purple-main" />
        </div>
        <div className="font-light mt-8">Create new highlight</div>
      </DashedBorderWrapper>
    </HighlightCardWrapper>
  );
};

export default CreateHighlightCard;
