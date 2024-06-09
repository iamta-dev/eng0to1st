"use client";

import type { CustomFlowbiteTheme } from "flowbite-react";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

const customTheme: CustomFlowbiteTheme["spinner"] = {
  color: {
    failure: "fill-red-600",
    gray: "fill-gray-600",
    info: "fill-cyan-600",
    pink: "fill-pink-600",
    purple: "fill-purple-600",
    success: "fill-green-500",
    warning: "fill-yellow-400",
    blue: "fill-blue-500",
  },
  size: {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-10 w-10",
    "10xl": "h-[100px] w-[100px]",
  },
};

export function CustomLoading() {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (showSpinner) {
      timeout = setTimeout(() => {
        setShowSpinner(false);
      }, 2000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [showSpinner]);

  const handleClick = () => {
    setShowSpinner(true);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Click me
      </button>

      {showSpinner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <Spinner
            color={"blue"}
            theme={customTheme}
            size="10xl"
            aria-label="Loading"
          />
        </div>
      )}
    </div>
  );
}
