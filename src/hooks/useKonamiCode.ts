"use client";

import { useEffect, useState, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export function useKonamiCode(callback?: () => void) {
  const [isActivated, setIsActivated] = useState(false);
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  const reset = useCallback(() => {
    setIsActivated(false);
    setInputSequence([]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      // Backtick key shortcut - instant activation (skip when user is typing)
      if (event.code === "Backquote" && !event.ctrlKey && !event.altKey && !isTyping) {
        event.preventDefault();
        setIsActivated((prev) => !prev);
        if (callback && !isActivated) callback();
        return;
      }

      if (isTyping) return;

      // Konami code sequence
      const newSequence = [...inputSequence, event.code].slice(-KONAMI_CODE.length);
      setInputSequence(newSequence);

      // Check if the sequence matches
      if (newSequence.length === KONAMI_CODE.length) {
        const isMatch = newSequence.every(
          (key, index) => key === KONAMI_CODE[index]
        );

        if (isMatch) {
          setIsActivated(true);
          setInputSequence([]);
          if (callback) callback();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputSequence, callback, isActivated]);

  return { isActivated, setIsActivated, reset };
}
