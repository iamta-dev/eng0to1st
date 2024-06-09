import { DarkThemeToggle, Tooltip } from "flowbite-react";
import { CreatePost } from "~/app/_components/game";
import { LogoBrand } from "~/app/_components/logo-brand";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex flex-row items-center justify-between gap-10 sm:gap-40">
          <LogoBrand size={50} isShowText isAnimate />
        </div>

        <CreatePost />

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
    </main>
  );
}
