"use client";

import { useEffect, useState } from "react";
import styles from "./loading-animation.module.css";

export function LoadingAnimation() {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (showSpinner) {
      timeout = setTimeout(() => {
        setShowSpinner(false);
      }, 10000);
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
          <div className={styles.loader} aria-label="Loading" />
        </div>
      )}
    </div>
  );
}
