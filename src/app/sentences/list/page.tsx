import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { LogoBrand } from "~/app/_components/logo-brand";
import { SentencesContent } from "./content";

export default async function SentencesListPage() {
  const searchParams = useSearchParams();

  const index = searchParams.get("index");
  if (isNaN(Number(index)) && Number(index) < 11) {
    return <div>Not Found.</div>;
  }

  return (
    <main
      className={twMerge(
        "flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#7E3AF2] to-[#ffff] text-[#0000]",
        "dark:from-[#2e026d] dark:to-[#15162c] dark:text-white",
      )}
    >
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex flex-row items-center justify-between gap-10 sm:gap-40">
          <LogoBrand size={50} isShowText isAnimate />
        </div>
        <SentencesContent index={Number(index)} />
      </div>
    </main>
  );
}
