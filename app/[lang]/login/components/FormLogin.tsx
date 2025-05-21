"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Input from "../../../components/Input";
import { initCookies } from "../../../utils/cookies";
import { login } from "../service";
import { Trans, useLingui } from "@lingui/react/macro";
import Modal from "@/app/components/Modal";
import Typewriter from "@/app/components/TypeWriter";

export default function FormLogin() {
  const { t } = useLingui();
  const router = useRouter();
  const searchParams = useSearchParams();
  const myParam = searchParams.get("message");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const isSessionExpired = myParam === "session-expired";
  const [open, setOpen] = useState(isSessionExpired);

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
      <Modal
        open={open}
        onCloseAction={() => {
          setOpen(false);
        }}
        title="Session Expired"
      />
      <div className="flex sm:justify-start justify-center items-center sm:mb-[60px] mb-[10px] sm:w-full w-[200px]">
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
