import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type AppBrandProps = {
  className?: string;
  href?: string;
};

export const AppBrand = ({ className, href = "/" }: AppBrandProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center font-semibold text-lg lg:text-2xl",
        className
      )}
    >
      <Image
        src="/images/icon-app-icon.png"
        alt="Portrait AI"
        width={32}
        height={32}
        className="w-6 h-6 lg:w-8 lg:h-8"
        priority
      />
      <span className="pl-1 lg:pl-2">Portrait AI</span>
    </Link>
  );
};
