import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type AppBrandProps = {
  className?: string;
  href?: string;
};

const AppBrand = ({ className, href = "/" }: AppBrandProps) => {
  return (
    <Link href={href} className={cn("flex items-center gap-[10px]", className)}>
      <Image
        src="/images/icon-app-icon.png"
        alt="Portrait AI"
        width={32}
        height={32}
        className="w-6 h-6 lg:w-9 lg:h-9"
        priority
      />
      <span className="text-off-black font-semibold text-[26px] leading-[30px] tracking-[1.5%]">
        Portrait AI
      </span>
    </Link>
  );
};

export default AppBrand;
