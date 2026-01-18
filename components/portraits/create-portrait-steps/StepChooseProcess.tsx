"use client";

import { cn } from "@/lib/utils";
import { Stars, Upload } from "lucide-react";

type StepChooseProcessProps = {
  onSelect: (option: "ai" | "manual") => void;
};

const StepChooseProcess = ({ onSelect }: StepChooseProcessProps) => {
  const cards = [
    {
      iconNode: <Stars />,
      title: "Let AI Interview You",
      tag: "RECOMMENDED",
      description: (
        <>
          Portrait Genie will guide you through a personalized conversation,
          asking thoughtful questions to create your portrait.
        </>
      ),
      optionType: "ai" as const,
      theme: "primary" as const,
    },
    {
      iconNode: <Upload />,
      title: (
        <>
          Get Started
          <br />
          Yourself
        </>
      ),
      description: (
        <>
          Jump right in and start building your portrait. Upload photos, videos
          and more, or create content right here on Portrait AI.
        </>
      ),
      optionType: "manual" as const,
      theme: "secondary" as const,
    },
  ];

  return (
    <div className="flex-1 flex flex-col gap-[47px]">
      <div className="space-y-4 w-full max-w-[486px]">
        <h1 className="font-normal text-[28px] leading-[40px] tracking-[-3%] text-off-black">
          Create a new Portrait
        </h1>
        <p className="font-light text-[16px] leading-[28px] tracking-[-3%] text-off-black">
          Every person is unique and their story matters. Get started now by
          adding context to the Portrait.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => {
              if (card.optionType === "manual") {
                onSelect(card.optionType);
              }
              // AI option is not functional for now
            }}
            className={cn(
              "transition-ease cursor-pointer rounded-[20px] flex flex-col gap-[24px] items-center justify-between p-[34px] border-2 border-purple-03",
              card.theme === "secondary"
                ? "hover:bg-purple-04"
                : "bg-linear-to-t from-purple-04 to-accent-purple-001/64 hover:bg-accent-purple-001"
            )}
          >
            <div className="w-full max-w-[417px] mx-auto flex flex-col items-center">
              <div
                className={cn(
                  "p-4 w-fit h-fit *:w-[32px] *:h-[32px] rounded-[16px]",
                  card.theme === "secondary"
                    ? "bg-accent-purple-001 *:stroke-dominant-purple-main"
                    : "bg-dominant-purple-main *:stroke-white"
                )}
              >
                {card.iconNode}
              </div>
              <h1 className="text-center font-normal text-[22px] leading-[33px] tracking-[-0.66px] mt-6 mb-3">
                {card.title}
              </h1>
              {card.tag ? (
                <div
                  className={cn(
                    "px-[10px] py-1  bg-dominant-purple-main rounded-full font-normal text-[11px] leading-[16.5px] tracking-0 text-white uppercase"
                  )}
                >
                  {card.tag || "RECOMMENDED"}
                </div>
              ) : undefined}
            </div>
            <p className="font-light text-[16px] leading-[24px] tracking-0 text-gray-7 text-center">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepChooseProcess;
