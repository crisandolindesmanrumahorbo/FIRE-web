"use client";

import IconChatbot from "@/app/components/IconChatbot";
import IconHome from "@/app/components/IconHome";
import IconSignOut from "@/app/components/IconSignOut";
import Link from "next/link";
import { useState } from "react";
import IconBurger from "./IconBurger";
import TopMenu from "../[lang]/(auth)/transaction/buy/components/TopMenu";

type Props = {
  children: React.ReactNode;
};

export default function NavbarSidebar({ children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="sticky top-0 left-0 z-40 bg-black h-15">
        <div className="flex justify-between h-full items-center mx-3 ">
          <button
            className="cursor-hoverh-full"
            onClick={() => {
              console.log({ open });
              setOpen((prev) => !prev);
            }}
          >
            <IconBurger />
          </button>
          <TopMenu />
        </div>
      </nav>
      {open ? (
        <div
          className={`fixed left-0 top-0 pt-15 w-[150px] h-full bg-opacity-75  bg-green-950
                        z-30 overflow-y-auto`}
        >
          <div className="flex flex-col justify-between bg-black h-full">
            <div className="flex flex-col gap-6 mt-2 justify-start w-full ml-2">
              <Link href={"/"} className="flex gap-2 items-center">
                <IconHome />
                <p className="text-white">Home</p>
              </Link>
              <Link href={"/chatbot"} className="flex gap-2 items-center">
                <IconChatbot />
                <p className="text-white ">Chat</p>
              </Link>
            </div>

            <Link
              href={"/login"}
              className="mb-[20px] flex gap-2 ml-2 items-center"
            >
              <IconSignOut />
              <p className="text-white">Sign out</p>
            </Link>
          </div>
        </div>
      ) : (
        <div
          className={`fixed left-0 top-0 pt-15 w-[50px] h-full bg-opacity-75 bg-black
                        z-30 overflow-y-auto`}
        >
          <div className="flex flex-col justify-between bg-black h-full">
            <div className="flex flex-col gap-6 mt-2 justify-start w-full ml-2">
              <Link href={"/"} className="flex gap-2">
                <IconHome />
              </Link>
              <Link href={"/chatbot"} className="flex gap-2">
                <IconChatbot />
              </Link>
            </div>

            <Link
              href={"/login"}
              className="mb-[20px] flex gap-2 ml-2 items-center"
            >
              <IconSignOut />
            </Link>
          </div>
        </div>
      )}

      <div
        className={`transition-all duration-300 ease-in-out
                ${open ? "ml-[155px]" : "ml-[50px]"}`}
      >
        {children}
      </div>
    </>
  );
}
