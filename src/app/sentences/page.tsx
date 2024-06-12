import { DarkThemeToggle } from "flowbite-react/components/DarkThemeToggle";
import { Tooltip } from "flowbite-react/components/Tooltip";
import { twMerge } from "tailwind-merge";
import { LogoBrand } from "~/app/_components/logo-brand";

export default async function SentencesPage() {
  const levels = [
    {
      s: "Level 1: 1-50",
      index: 0,
      skip: 50,
    },
    {
      s: "Level 2: 51-100",
      index: 50,
      skip: 100,
    },
    {
      s: "Level 3: 101-150",
      index: 100,
      skip: 150,
    },
    {
      s: "Level 4: 151-200",
      index: 150,
      skip: 200,
    },
    {
      s: "Level 5: 201-250",
      index: 200,
      skip: 250,
    },
    {
      s: "Level 6: 251-300",
      index: 250,
      skip: 300,
    },
    {
      s: "Level 7: 301-350",
      index: 300,
      skip: 350,
    },
    {
      s: "Level 8: 351-400",
      index: 350,
      skip: 400,
    },
    {
      s: "Level 9: 401-450",
      index: 400,
      skip: 450,
    },
    {
      s: "Level 10: 451-500",
      index: 450,
      skip: 500,
    },
  ];
  return (
    <main
      className={twMerge(
        "flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#7E3AF2] to-[#ffff] text-[#0000]",
        "dark:from-[#2e026d] dark:to-[#15162c] dark:text-white",
      )}
    >
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex flex-row items-center justify-between gap-10 sm:gap-40">
          <LogoBrand size={50} isShowText isAnimate />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-center gap-5">
            <a
              href="/"
              className="text-white hover:text-blue-600 dark:hover:text-[#cc66ff]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"
                />
              </svg>
            </a>
            <div className="hidden dark:block">
              <Tooltip content="Toggle light mode">
                <DarkThemeToggle />
              </Tooltip>
            </div>
            <div className="dark:hidden">
              <Tooltip content="Toggle dark mode">
                <DarkThemeToggle />
              </Tooltip>
            </div>
          </div>
          {levels.map((level, index) => (
            <a
              key={index}
              className="text-xl text-gray-700 hover:text-blue-500 dark:text-white dark:hover:text-[#cc66ff]"
              href={`/sentences/list?index=${index}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="mr-2">🤖</span>
              {level.s}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
