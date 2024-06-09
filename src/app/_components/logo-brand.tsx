import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
  isShowText?: boolean;
  size?: 20 | 30 | 50 | 100 | 350 | 400 | 500;
  isAnimate?: boolean;
  animateClass?: string;
}

export async function LogoBrand({
  isShowText,
  size,
  isAnimate,
  animateClass,
}: Props) {
  return (
    <Link
      href="/"
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={twMerge(
        "mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse",
        isAnimate &&
          (animateClass ??
            "animate-duration-[3000ms] animate-delay-[2000ms] animate-ease-linear animate-bounce"),
      )}
    >
      <Image
        src="/logo.png"
        width={size ?? 50}
        height={size ?? 50}
        alt="MyApp Logo"
      />
      {isShowText && (
        // <span className="self-center whitespace-nowrap bg-gradient-to-r from-blue-600 to-red-300 bg-clip-text text-center text-xl font-semibold text-transparent">
        //   Eng <br /> <span className="text-gray-300">0</span>
        //   {"->"}
        //   <span className="text-green-400">1st</span>
        // </span>
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="text-[hsl(280,100%,70%)]">Eng</span>
        </h1>
      )}
    </Link>
  );
}
