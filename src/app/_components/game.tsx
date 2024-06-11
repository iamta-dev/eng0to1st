/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/media-has-caption */
"use client";

import type { MemorizeSentences } from "@prisma/client";
import { DarkThemeToggle, Tooltip } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import GameDataJson from "~/data/game/memorize_sentences.json";
import type { TSettings } from "./gameSettings";
import { EditSettings } from "./gameSettings";

export function MainGame() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [setting, setSetting] = useState<TSettings>({
    showAns: false,
    showHint: true,
    playVoice: true,
    playENVoice: true,
    playTHVoice: true,
    game: {
      s: "Level 1: 1-50",
      index: 0,
      skip: 50,
    },
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

  const playAudio = () => {
    if (setting.playVoice && audioRef?.current) {
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    if (setting.playVoice && audioRef?.current) {
      audioRef.current.pause();
    }
  };

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
        textTH: "จบเกม",
        textEN: "End Game",
      },
    });
  };

  const resetGame = () => {
    setAns("");
  };

  const nextGame = () => {
    if (activeGameData.game.index + 1 < gameData.length) {
      pauseAudio();
      const nextIndex = activeGameData.game.index + 1;

      let nextGame: MemorizeSentences = {
        ...mockData,
        textTH: "จบเกม",
        textEN: "End Game",
      };

      if (nextIndex + 1 < gameData.length) {
        nextGame = gameData[nextIndex + 1]!;
      }

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
      <div className="whitespace-nowrap p-4 text-center text-sm font-normal text-gray-500 dark:text-gray-400">
        <div className="text-base font-semibold text-gray-900 dark:text-white">
          {activeGameData.prev.textEN}
        </div>
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {activeGameData.prev.textTH}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="whitespace-nowrap text-center font-normal text-gray-500 dark:text-gray-400">
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {activeGameData.active.textTH}
          </div>
          {activeGameData.game.showHint && (
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {activeGameData.active.textEN}
            </div>
          )}
        </div>
        <audio ref={audioRef} src={activeGameData.active.voiceEN} />
        <input
          type="text"
          placeholder={
            setting.showAns ? activeGameData.active.textEN : "Enter Answer"
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
              } else {
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
              playAudio();
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
        {/* <button
          onClick={() => {
            handleClickVoicePlay();
          }}
          className="text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-2.5-3.5l7-4.5l-7-4.5v9z"
            />
          </svg>
        </button> */}
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
        <div>{setting.game.s}</div>
        <div className="animate-ease-out animate-pulse">{"🤖"}</div>
      </div>
    </div>
  );
}
