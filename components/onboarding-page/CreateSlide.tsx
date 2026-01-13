"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

type itemProps = {
  cover: {
    imageName?: string;
    videoUrl?: string;
  };
  title: string;
  description: string;
};
export type CreateSlideProps = {
  item: itemProps;
  className?: string;
};

const CreateSlide = (props: CreateSlideProps) => {
  return (
    <div className={cn("w-full", props.className)}>
      <div className="h-[320px] rounded-2xl overflow-hidden">
        {props.item.cover.imageName ? (
          <Image
            src={props.item.cover.imageName}
            alt={props.item.title}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        ) : props.item.cover.videoUrl ? (
          <video
            src={props.item.cover.videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
          />
        ) : undefined}
      </div>
      <div className="mt-5 bg-white rounded-xl p-8 flex">
        <div className="text-2xl w-[220px]">{props.item.title}</div>
        <div className="flex-1 ">{props.item.description}</div>
      </div>
    </div>
  );
};

export default CreateSlide;
