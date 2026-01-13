"use client";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import CreateSlide, { CreateSlideProps } from "./CreateSlide";
import CreateSlideShowControls from "./CreateSlideShowControls";
import { cn } from "@/lib/utils";

type CreateSlideShowProps = { className?: string };
const SLIDES: CreateSlideProps["item"][] = [
  {
    cover: { videoUrl: `/videos/create-portrait-slide.mp4` },
    title: `Quickly Archive Your Life Story`,
    description: `Step beyond ordinary albums; Portrait AI turns fleeting moments into vivid, lasting memories. Transform your life's story into a captivating, shareable legacy for generations.`,
  },
  {
    cover: { videoUrl: `/videos/create-portrait-slide.mp4` },
    title: `Capturing Memories Of a Grandparent`,
    description: `Portrait AI helps to gathers treasured photos, tales, and memories, weaving them into captivating stories. Effortlessly cherish and share your family's rich heritage involving a grand parent or family elderlies.`,
  },
  {
    cover: { videoUrl: `/videos/create-portrait-slide.mp4` },
    title: `Remembering A Loved One`,
    description: `Immortalize a loved one's journey through time. Craft a collaborative tribute, spotlighting their defining moments and unique personality. Ensure their story resonates for years to come.`,
  },
];

const CreateSlideShow = (props: CreateSlideShowProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCount(api.scrollSnapList().length || 0);
      setCurrent(api.selectedScrollSnap());
    };

    // Subscribe to events
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    // Defer initial state update using requestAnimationFrame
    // to avoid synchronous setState in effect body
    const frameId = requestAnimationFrame(() => {
      handleSelect();
    });

    return () => {
      cancelAnimationFrame(frameId);
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  return (
    <div className={cn("w-full", props.className)}>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {SLIDES.map((item, index) => (
            <CarouselItem key={`slide-${index}-${item.title}`}>
              <CreateSlide item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CreateSlideShowControls
          totalItems={count}
          currentIndex={current}
          canPrev={api?.canScrollPrev()}
          canNext={api?.canScrollNext()}
          onPrev={api?.scrollPrev}
          onNext={api?.scrollNext}
          className="mt-7"
        />
      </Carousel>
    </div>
  );
};

export default CreateSlideShow;
