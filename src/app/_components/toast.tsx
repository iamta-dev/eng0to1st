"use client";

import { Button, Toast } from "flowbite-react";
import { useEffect, useState } from "react";

interface CustomToastProps {
  position: "topCenter" | "topRight" | "bottomCenter" | "bottomRight";
}

const positionClasses = {
  topCenter: "fixed top-4 left-1/2 transform -translate-x-1/2",
  topRight: "fixed top-4 right-4",
  bottomCenter: "fixed bottom-4 left-1/2 transform -translate-x-1/2",
  bottomRight: "fixed bottom-4 right-4",
};

export function CustomToast({ position }: CustomToastProps) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (showToast) {
      timeout = setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [showToast]);

  const handleClick = () => {
    setShowToast(true);
  };

  return (
    <div className="relative">
      <Button onClick={handleClick}>Click Me</Button>
      {showToast && (
        <div className={`${positionClasses[position]} z-50`}>
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11.414V10l3 1.5L12 15v-1.586L8.5 12l2.5-1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 text-sm font-normal">
              This is a toast message.
            </div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
    </div>
  );
}
