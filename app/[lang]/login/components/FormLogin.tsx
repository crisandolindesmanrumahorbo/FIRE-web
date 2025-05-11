"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "../../../components/Input";
import { initCookies } from "../../../utils/cookies";
import { login } from "../service";
import { Trans, useLingui } from "@lingui/react/macro";

const MESSAGES = [
  "Got fired from ur job",
  "Know about FIRE",
  "Fire up ur porto",
];

function Typewriter() {
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
    <h2 className="text-4xl font-bold text-center min-h-[2.5rem]">
      <span>{currentText}</span>
      <span className="border-r-2 border-white animate-pulse ml-1" />
    </h2>
  );
}

export default function FormLogin() {
  const { t } = useLingui();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onLogin = async () => {
    if (!username || !password) {
      setMessage("Username and password are required");
      return;
    }
    const { data, error } = await login(username, password);
    if (error) {
      setMessage(error);
      return;
    }
    await initCookies({ token: data.token });
    router.push("/");
  };

  return (
    <>
      <div className="flex items-center mb-[60px]">
        <Typewriter />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}
      >
        <div className="md:w-[60vh] flex flex-col gap-1">
          <Input
            inputMode="text"
            value={username}
            onChange={(value: string) => {
              setUsername(value?.trim());
              setMessage("");
            }}
            isError={message.length > 0}
            label={t`Username`}
          />
          <Input
            inputMode="password"
            value={password}
            onChange={(value: string) => {
              setPassword(value);
              setMessage("");
            }}
            isError={message.length > 0}
            label={t`Password`}
          />
        </div>
        <p className="text-red-400">{message}</p>

        <button
          className="font-semibold bg-green-800 px-2 py-2 w-full rounded mt-4 cursor-pointer hover:bg-white hover:text-green-800 border border-green-800  hover:outline-white text-white"
          type="submit"
        >
          <Trans>Login</Trans>
        </button>
      </form>
    </>
  );
}
