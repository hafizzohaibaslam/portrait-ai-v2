import { cn } from "@/lib/utils";

type LandingUseCasesProps = {
  className?: string;
};

const USE_CASES = [
  {
    title: "Quickly Archive Your Life Story",
    description:
      "Step beyond ordinary albums; Portrait AI turns fleeting moments into vivid, lasting memories. Transform your life's story into a captivating, shareable legacy for generations.",
  },
  {
    title: "Capturing Memories Of a Grandparent",
    description:
      "Portrait AI helps to gathers treasured photos, tales, and memories, weaving them into captivating stories. Effortlessly cherish and share your family's rich heritage involving a grand parent or family elderlies.",
  },
  {
    title: "Remembering A Loved One",
    description:
      "Immortalize a loved one's journey through time. Craft a collaborative tribute, spotlighting their defining moments and unique personality. Ensure their story resonates for years to come.",
  },
] as const;

const LandingUseCases = ({ className }: LandingUseCasesProps) => {
  return (
    <section
      className={cn(
        "mt-[122px] px-5 w-full max-w-[1201px] mx-auto flex flex-col gap-[72px]",
        className
      )}
    >
      <h1 className="text-center font-medium text-[32px] leading-[36px] tracking-[-3%] lg:text-[40px] lg:leading-[40px] lg:tracking-[-3%] text-off-black">
        Most Popular Use Cases For Portrait AI
      </h1>
      <div className="grid lg:grid-cols-3 gap-10">
        {USE_CASES.map((useCase, index) => {
          const number = index + 1;
          return (
            <div
              key={index}
              className="bg-purple-7 py-10 px-9 rounded-[12px] space-y-6"
            >
              <span className="w-fit h-fit px-5 py-2 rounded-xl box-content bg-purple-6 flex items-center justify-center text-3xl font-semibold">
                {number}
              </span>

              {/* Title */}
              <h3 className="font-normal text-[28px] leading-[34px] tracking-[0%] text-off-black">
                {useCase.title}
              </h3>

              {/* Description */}
              <p className="font-light text-[20px] leading-[29px] tracking-[0%] text-off-black">
                {useCase.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LandingUseCases;
