"use client";

import { useState } from "react";
import IconBurger from "./IconBurger";
import TopMenu from "../[lang]/(auth)/transaction/buy/components/TopMenu";
import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function NavbarSidebar({ children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 left-0 z-40 bg-black h-16 w-full">
        <div className="flex justify-between h-full items-center mx-3 ">
          <button
            className="cursor-hoverh-full"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            <IconBurger />
          </button>
          <TopMenu />
        </div>
      </nav>
      <Sidebar open={open} />
      <div
        className={`transition-all duration-300 ease-in-out mt-16
                ${open ? "ml-[155px]" : "ml-[50px]"}`}
      >
        {children}
      </div>
    </>
  );
}
