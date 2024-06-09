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
import type { FC } from "react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import GameDataJson from "~/data/game/memorize_sentences.json";

const EditSettings: FC = function () {
  const [isOpen, setOpen] = useState(false);

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
          <form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="Voice">Voice</Label>
                <Dropdown
                  label="Dropdown button"
                  color={"dark"}
                  dismissOnClick={false}
                >
                  <Dropdown.Item>1-50</Dropdown.Item>
                  <Dropdown.Item>51-100</Dropdown.Item>
                  <Dropdown.Item>101-150</Dropdown.Item>
                  <Dropdown.Item>151</Dropdown.Item>
                </Dropdown>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="Voice">Voice</Label>
                <Dropdown
                  label="Dropdown button"
                  color={"dark"}
                  dismissOnClick={false}
                >
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Earnings</Dropdown.Item>
                  <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="Voice">Voice</Label>
                <Dropdown
                  label="Dropdown button"
                  color={"dark"}
                  dismissOnClick={false}
                >
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Earnings</Dropdown.Item>
                  <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="Voice">Voice</Label>
                <Dropdown
                  label="Dropdown button"
                  color={"dark"}
                  dismissOnClick={false}
                >
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Earnings</Dropdown.Item>
                  <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Button
            className="w-40"
            color="purple"
            onClick={() => setOpen(false)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export function CreatePost() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      50,
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
      <div className="flex flex-row gap-5">
        <EditSettings />
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
    </div>
  );
}
