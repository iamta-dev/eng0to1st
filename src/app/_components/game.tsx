/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/media-has-caption */
"use client";

import type { MemorizeSentences } from "@prisma/client";
import {
  Button,
  DarkThemeToggle,
  Dropdown,
  Label,
  Modal,
  Tooltip,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import GameDataJson from "~/data/game/memorize_sentences.json";

interface SettingProps {
  setting: {
    showAns: boolean;
    playVoice: boolean;
    game: {
      s: string;
      index: number;
      skip: number;
    };
  };
  handleSetting: (p: { showAns?: boolean; playVoice?: boolean }) => void;
  handleGame: (p: {
    newGame: {
      s: string;
      index: number;
      skip: number;
    };
  }) => void;
}

const EditSettings = function ({
  setting,
  handleSetting,
  handleGame,
}: SettingProps) {
  const [isOpen, setOpen] = useState(false);

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

  return (
    <>
      <button className="text-gray-400" onClick={() => setOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19.43 12.98c.04-.32.07-.64.07-.98c0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.566.566 0 0 0-.18-.03c-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98c0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03c.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73c0 .21-.02.43-.05.73l-.14 1.13l.89.7l1.08.84l-.7 1.21l-1.27-.51l-1.04-.42l-.9.68c-.43.32-.84.56-1.25.73l-1.06.43l-.16 1.13l-.2 1.35h-1.4l-.19-1.35l-.16-1.13l-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7l-1.06.43l-1.27.51l-.7-1.21l1.08-.84l.89-.7l-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13l-.89-.7l-1.08-.84l.7-1.21l1.27.51l1.04.42l.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43l.16-1.13l.2-1.35h1.39l.19 1.35l.16 1.13l1.06.43c.43.18.83.41 1.23.71l.91.7l1.06-.43l1.27-.51l.7 1.21l-1.07.85l-.89.7l.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z"
          />
        </svg>
      </button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header>Settings</Modal.Header>
        <Modal.Body>
          <form className="flex items-center justify-center">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="Play Voice">Game Level</Label>
                <Dropdown label={setting.game.s} color={"dark"}>
                  {levels.map((level, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => {
                        handleGame({
                          newGame: {
                            ...level,
                          },
                        });
                      }}
                    >
                      {level.s}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="Show Ans input">Show Ans input</Label>
                <Dropdown label={setting.showAns ? "ON" : "OFF"} color={"dark"}>
                  <Dropdown.Item
                    onClick={() => {
                      handleSetting({ showAns: true });
                    }}
                  >
                    ON
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handleSetting({ showAns: false });
                    }}
                  >
                    OFF
                  </Dropdown.Item>
                </Dropdown>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="Play Voice">Play Voice</Label>
                <Dropdown
                  label={setting.playVoice ? "ON" : "OFF"}
                  color={"dark"}
                >
                  <Dropdown.Item
                    onClick={() => {
                      handleSetting({ playVoice: true });
                    }}
                  >
                    ON
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handleSetting({ playVoice: false });
                    }}
                  >
                    OFF
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="flex flex-col justify-center">
          <div className="flex flex-col justify-center gap-2">
            <Button
              className="w-40"
              color="purple"
              onClick={() => {
                setOpen(false);
                handleGame({
                  newGame: {
                    ...setting.game,
                  },
                });
              }}
            >
              New Game
            </Button>
            <Button
              className="w-40"
              color="gray"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export function CreatePost() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [setting, setSetting] = useState<{
    showAns: boolean;
    playVoice: boolean;
    game: {
      s: string;
      index: number;
      skip: number;
    };
  }>({
    showAns: true,
    playVoice: true,
    game: {
      s: "Level 1: 1-50",
      index: 0,
      skip: 50,
    },
  });

  const handleSetting = (p: { showAns?: boolean; playVoice?: boolean }) => {
    setSetting({
      ...setting,
      showAns: p.showAns ?? setting.showAns,
      playVoice: p.playVoice ?? setting.playVoice,
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
