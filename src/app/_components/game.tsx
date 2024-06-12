/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/media-has-caption */
"use client";

import type { MemorizeSentences } from "@prisma/client";
import { DarkThemeToggle, Tooltip } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import GameDataJson from "~/data/game/memorize_sentences.json";
import type { TSettings } from "./gameSettings";
import { EditSettings } from "./gameSettings";

export function MainGame() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const [setting, setSetting] = useState<TSettings>({
    showAns: false,
    showHint: false,
    playVoice: true,
    playENVoice: true,
    playTHVoice: true,
    game: {
      s: "Level 1: 1-50",
      index: 0,
      skip: 50,
    },
  });

  const [point, setPoint] = useState({
    wrong: 0,
    correct: 0,
  });

  const handleSetting = (p: {
    showAns?: boolean;
    showHint?: boolean;
    playVoice?: boolean;
    playENVoice?: boolean;
    playTHVoice?: boolean;
  }) => {
    setSetting({
      ...setting,
      showAns: p.showAns ?? setting.showAns,
      showHint: p.showHint ?? setting.showHint,
      playVoice: p.playVoice ?? setting.playVoice,
      playENVoice: p.playENVoice ?? setting.playENVoice,
      playTHVoice: p.playTHVoice ?? setting.playTHVoice,
    });
  };

  const handleGame = (p: {
    newGame: {
      s: string;
      index: number;
      skip: number;
    };
  }) => {
    if (p.newGame) {
      setSetting((prev) => {
        return {
          ...prev,
          game: {
            ...p.newGame,
          },
        };
      });
    }
  };

  useEffect(() => {
    startGame(setting.game.index, setting.game.skip);
  }, [setting.game]);

  const [ans, setAns] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState("");

  const playAudio = (lang: "en" | "th", srcVoice?: string) => {
    if (audioRef?.current) {
      audioRef.current.pause();
      if (lang == "en" && setting.playVoice && setting.playENVoice) {
        setAudioSrc(srcVoice ?? activeGameData.active.voiceEN);
        setTimeout(() => {
          if (audioRef?.current) {
            audioRef.current.play();
          }
        }, 200);
      }
      if (lang == "th" && setting.playVoice && setting.playTHVoice) {
        setAudioSrc(srcVoice ?? activeGameData.active.voiceTH);
        setTimeout(() => {
          if (audioRef?.current) {
            audioRef.current.play();
          }
        }, 200);
      }
    }
  };

  // const pauseAudio = (lang: "en" | "th") => {
  //   if (lang == "en" && setting.playVoice && audioRef?.current) {
  //     setAudioSrc(activeGameData.active.voiceEN);
  //     audioRef.current.pause();
  //   }
  //   if (lang == "th" && setting.playVoice && audioRef?.current) {
  //     setAudioSrc(activeGameData.active.voiceTH);
  //     audioRef.current.pause();
  //   }
  // };

  const mockData: MemorizeSentences = {
    id: 1,
    textTH: "โหลดข้อมูล",
    textEN: "Loading",
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    categoryMemorizeSentenceId: 1,
    groupMemorizeSentenceId: null,
    userId: "clx685pif0000zw2b0slm7c1v",
    voiceEN: "",
    voiceTH: "",
  };

  const [gameData, setGameData] = useState<MemorizeSentences[]>([]);
  const [activeGameData, setActiveGameData] = useState<{
    game: {
      index: number;
      isWrong: boolean;
      showHint: boolean;
      isVoice: boolean;
    };
    prev: MemorizeSentences;
    active: MemorizeSentences;
    next: MemorizeSentences;
  }>({
    game: {
      index: 0,
      isWrong: false,
      showHint: false,
      isVoice: false,
    },
    prev: {
      ...mockData,
      textTH: "เริ่มเกม",
      textEN: "Start Game",
    },
    active: {
      ...mockData,
      textTH: "โหลดข้อมูล",
      textEN: "Loading",
    },
    next: {
      ...mockData,
      textTH: "จบเกม",
      textEN: "End Game",
    },
  });

  const startGame = (startIndex: number, skip: number) => {
    resetGame();
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
    console.log(tmpMemorizeSentences);
    setGameData(tmpMemorizeSentences);
    setActiveGameData({
      game: {
        index: 0,
        isWrong: false,
        showHint: false,
        isVoice: false,
      },
      prev: {
        ...mockData,
        textTH: "เริ่มเกม",
        textEN: "Start Game",
      },
      active: tmpMemorizeSentences[0]!,
      next: {
        ...mockData,
        textTH: "เริ่มเกม",
        textEN: "Start Game",
      },
    });
  };

  const resetGame = () => {
    setAns("");
    setPoint({
      wrong: 0,
      correct: 0,
    });
  };

  const nextGame = () => {
    if (activeGameData.game.index + 1 < gameData.length) {
      const nextIndex = activeGameData.game.index + 1;

      let nextGame: MemorizeSentences = {
        ...mockData,
        textTH: "จบเกม",
        textEN: "End Game",
      };

      if (nextIndex + 1 < gameData.length) {
        nextGame = gameData[nextIndex + 1]!;
      }

      playAudio("th", gameData[nextIndex]!.voiceTH);

      setActiveGameData((_prev) => {
        return {
          game: {
            ..._prev.game,
            index: nextIndex,
            isWrong: false,
            showHint: false,
          },
          prev: _prev.active,
          active: gameData[nextIndex]!,
          next: nextGame,
        };
      });
      resetGame();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* <div className="whitespace-nowrap p-4 text-center text-sm font-normal text-gray-500 dark:text-gray-400">
        <div className="text-base font-semibold text-gray-900 dark:text-white">
          {activeGameData.prev.textEN}
        </div>
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {activeGameData.prev.textTH}
        </div>
      </div> */}

      <div className="flex flex-row gap-3 text-gray-200">
        <div className="flex flex-row gap-1">
          <div>✅</div>
          <div>
            {point.correct}/{gameData.length}
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <div>❌</div>
          <div>{point.wrong}</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="whitespace-nowrap text-center font-normal text-gray-500 dark:text-gray-400">
          <div className="text-2xl font-semibold text-blue-600 dark:text-[#cc66ff]">
            {activeGameData.active.textTH}
          </div>
          {(setting.showAns || activeGameData.game.showHint) && (
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {activeGameData.active.textEN}
            </div>
          )}
        </div>
        <audio ref={audioRef} src={audioSrc} />
        <input
          type="text"
          placeholder={
            setting.showHint ? activeGameData.active.textEN : "Enter Answer"
          }
          value={ans}
          onChange={(e) => setAns(e.target.value)}
          className={twMerge(
            "w-full rounded-full px-4 py-2 text-center text-2xl",
            activeGameData.game.isWrong ? "text-red-500" : "text-black",
          )}
          onKeyUp={(e) => {
            console.log(e.key);
            if (e.key === "Enter") {
              if (activeGameData.active.textEN.trim() == ans.trim()) {
                nextGame();
                setPoint((_prev) => {
                  return {
                    ..._prev,
                    correct: point.correct + 1,
                  };
                });
              } else {
                playAudio("en");
                setPoint((_prev) => {
                  return {
                    ..._prev,
                    wrong: point.wrong + 1,
                  };
                });
                setActiveGameData((_prev) => {
                  return {
                    ..._prev,
                    game: {
                      ..._prev.game,
                      showHint: true,
                      isWrong: true,
                    },
                  };
                });
              }
            }
            if (e.key == "Escape") {
              resetGame();
            }
            if (ans.length == 1) {
              playAudio("en");
            }
          }}
        />
      </div>
      <div className="whitespace-nowrap p-4 text-center text-sm font-normal text-gray-500 dark:text-gray-400">
        <div className="text-base font-semibold text-gray-900 dark:text-white">
          {activeGameData.next.textEN}
        </div>
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {activeGameData.next.textTH}
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <EditSettings
          setting={{ ...setting }}
          handleSetting={handleSetting}
          handleGame={handleGame}
        />
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
        <button
          className="text-white hover:text-blue-600 dark:text-gray-400 dark:hover:text-[#cc66ff]"
          onClick={() => {
            router.push("/sentences");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-row gap-1 text-2xl font-semibold text-gray-900 dark:text-white">
        <div className="animate-ease-out animate-pulse">{"🥳"}</div>
        <div>{setting.game.s}</div>
        <div className="animate-ease-out animate-pulse">{"🤖"}</div>
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
