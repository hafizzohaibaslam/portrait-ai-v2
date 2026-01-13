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
      className={cn("mt-12 lg:mt-32 px-4 md:px-24 2xl:px-[170px]", className)}
    >
      <div className="mt-12 lg:mt-18 xl:grid grid-cols-3 gap-6">
        {USE_CASES.map((useCase, index) => {
          const number = index + 1;
          return (
            <div
              key={index}
              className="bg-purple-7 p-6 pt-3 xl:pt-5 xl:px-9 xl:py-10 mt-6 xl:mt-0 rounded-md"
            >
              {/* Numbered Badge */}
              <div className="w-fit h-fit px-5 py-2 rounded-xl box-content bg-purple-6 flex items-center justify-center text-3xl font-semibold">
                {number}
              </div>

              {/* Title */}
              <h3 className="mt-3 text-xl lg:text-3xl">{useCase.title}</h3>

              {/* Description */}
              <p className="mt-3 lg:mt-6 lg:text-xl font-light">
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
