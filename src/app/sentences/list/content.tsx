"use client";

import { useSearchParams } from "next/navigation";
import { MainGameSentences } from "~/app/_components/sentences";

export const SentencesContent = () => {
  const levels = [
    {
      s: "Level 1: 1-50",
      index: 0,
      skip: 49,
    },
    {
      s: "Level 2: 51-100",
      index: 50,
      skip: 99,
    },
    {
      s: "Level 3: 101-150",
      index: 100,
      skip: 149,
    },
    {
      s: "Level 4: 151-200",
      index: 150,
      skip: 199,
    },
    {
      s: "Level 5: 201-250",
      index: 200,
      skip: 249,
    },
    {
      s: "Level 6: 251-300",
      index: 250,
      skip: 299,
    },
    {
      s: "Level 7: 301-350",
      index: 300,
      skip: 249,
    },
    {
      s: "Level 8: 351-400",
      index: 350,
      skip: 399,
    },
    {
      s: "Level 9: 401-450",
      index: 400,
      skip: 449,
    },
    {
      s: "Level 10: 451-500",
      index: 450,
      skip: 499,
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
