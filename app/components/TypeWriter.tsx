"use client";

import { useEffect, useState } from "react";
import { useLingui } from "@lingui/react/macro";

function Typewriter() {
  const { t } = useLingui();
  const MESSAGES = [
    t`Got fired from ur job 🤡`,
    t`Know about FIRE 👀`,
    t`Fire up ur porto 🫦`,
  ];
  const [currentText, setCurrentText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentMessage = MESSAGES[messageIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentMessage.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setCurrentText(currentMessage.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      // Switch to deleting mode
      if (!isDeleting && charIndex === currentMessage.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      }

      // Switch to next message
      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, messageIndex]);

  return (
    <h2 className="text-md sm:text-4xl font-bold  min-h-[2.5rem]">
      <span>{currentText}</span>
      <span className="border-r-2 border-green-800 animate-pulse ml-1" />
    </h2>
  );
}

export default Typewriter;
