"use client";

import type { MemorizeSentences } from "@prisma/client";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import GameDataJson from "~/data/game/memorize_sentences.json";

export function CreatePost() {
  const [setting, setSetting] = useState({ showAns: true });
  const [ans, setAns] = useState("");

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
  };

  const [gameData, setGameData] = useState<MemorizeSentences[]>([]);
  const [activeGameData, setActiveGameData] = useState<{
    game: {
      index: number;
      isWrong: boolean;
      showHint: boolean;
    };
    prev: MemorizeSentences;
    active: MemorizeSentences;
    next: MemorizeSentences;
  }>({
    game: {
      index: 0,
      isWrong: false,
      showHint: false,
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

  useEffect(() => {
    const tmpMemorizeSentences: MemorizeSentences[] = GameDataJson.slice(
      0,
      10,
    ).map((v) => {
      return {
        ...v,
        createdAt: new Date(v.createdAt),
        updatedAt: new Date(v.updatedAt),
      };
    });
    setGameData(tmpMemorizeSentences);
    setActiveGameData((_prev) => {
      return {
        ..._prev,
        game: { ..._prev.game, index: 0 },
        active: tmpMemorizeSentences[0]!,
      };
    });
  }, []);

  const resetGame = () => {
    setAns("");
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
    </div>
  );
}
