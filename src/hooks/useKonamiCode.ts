"use client";

import { useEffect, useState, useCallback, useRef } from "react";

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
  const [, setInputSequence] = useState<string[]>([]);

  // Keep refs in sync so the keydown listener can read the latest values
  // without re-subscribing on every render.
  const isActivatedRef = useRef(isActivated);
  const callbackRef = useRef(callback);

  useEffect(() => {
    isActivatedRef.current = isActivated;
  }, [isActivated]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

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
        const next = !isActivatedRef.current;
        isActivatedRef.current = next;
        setIsActivated(next);
        if (next && callbackRef.current) callbackRef.current();
        return;
      }

      if (isTyping) return;

      // Konami code sequence: append the key via a functional update so the
      // listener never depends on the current sequence value.
      let matched = false;
      setInputSequence((prev) => {
        const newSequence = [...prev, event.code].slice(-KONAMI_CODE.length);

        // Check if the sequence matches
        if (newSequence.length === KONAMI_CODE.length) {
          const isMatch = newSequence.every(
            (key, index) => key === KONAMI_CODE[index]
          );

          if (isMatch) {
            matched = true;
            return [];
          }
        }

        return newSequence;
      });

      // Fire side effects outside the state updater.
      if (matched) {
        setIsActivated(true);
        isActivatedRef.current = true;
        if (callbackRef.current) callbackRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { isActivated, setIsActivated, reset };
}
