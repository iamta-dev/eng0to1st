"use client";

import { useSearchParams } from "next/navigation";
import { MainGameSentences } from "~/app/_components/sentences";

export const SentencesContent = () => {
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

  const searchParams = useSearchParams();

  const index = searchParams.get("index");
  if ((isNaN(Number(index)) && Number(index) < 11) || !levels[Number(index)]) {
    return <div>Not Found.</div>;
  }

  return (
    <>
      <MainGameSentences newGame={{ ...levels[Number(index)]! }} />
    </>
  );
};
