/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/media-has-caption */
"use client";

import type { MemorizeSentences } from "@prisma/client";
import { DarkThemeToggle, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import GameDataJson from "~/data/game/memorize_sentences.json";

interface MainGameSentencesProps {
  newGame: {
    s: string;
    index: number;
    skip: number;
  };
}

export function MainGameSentences({ newGame }: MainGameSentencesProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [gameData, setGameData] = useState<MemorizeSentences[]>([]);

  const startGame = (startIndex: number, skip: number) => {
    const tmpMemorizeSentences: MemorizeSentences[] = GameDataJson.slice(
      startIndex,
      skip,
    ).map((v) => {
      return {
        ...v,
        createdAt: new Date(v.createdAt),
        updatedAt: new Date(v.updatedAt),
      };
    });
    setGameData(tmpMemorizeSentences);
  };

  useEffect(() => {
    startGame(newGame.index, newGame.skip);
  });

  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-[#a474f6] dark:bg-[#2e036b]">
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

      <div className="flex flex-row gap-1 text-2xl font-semibold text-gray-900 dark:text-white">
        <div className="animate-ease-out animate-pulse">{"🥳"}</div>
        <div>{newGame.s}</div>
        <div className="animate-ease-out animate-pulse">{"🤖"}</div>
      </div>
      <div className="flex flex-col gap-3">
        {gameData.map((v, index) => (
          <div
            key={index}
            className="whitespace-nowrap text-center font-normal text-gray-500 dark:text-gray-400"
          >
            <div className="text-base font-semibold text-gray-200 dark:text-[#cc66ff]">
              {index + 1} . {v.textTH}
            </div>
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              {v.textEN}
            </div>
          </div>
        ))}
      </div>

      <footer className="p-4 md:p-8 lg:p-10">
        <div className="mx-auto max-w-screen-xl text-center">
          <p className="my-6 text-gray-500 dark:text-gray-400">
            A website for memorizing English vocabulary and sentences for free.
          </p>
          <ul className="mb-6 flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
            <li>
              <a
                href="https://www.instagram.com/ta_nthw"
                className="mr-4 hover:underline md:mr-6"
                target="_blank"
                rel="noreferrer"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/ta_nthw"
                className="mr-4 hover:underline md:mr-6"
                target="_blank"
                rel="noreferrer"
              >
                Contact
              </a>
            </li>
          </ul>
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2023-2024{" "}
            <a href="#" className="hover:underline">
              imta 0to-1st™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
