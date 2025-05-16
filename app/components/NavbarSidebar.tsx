"use client";

import { useEffect, useState } from "react";
import IconBurger from "./IconBurger";
import TopMenu from "../[lang]/(auth)/transaction/buy/components/TopMenu";
import Sidebar from "./Sidebar";
import { Account } from "../[lang]/(auth)/layout";
import { IProfile, useProfile } from "../store/profile";

type Props = {
  children: React.ReactNode;
  account: Account;
  user: IProfile;
};

export default function NavbarSidebar({ children, account, user }: Props) {
  const setProfile = useProfile((state) => state.setProfile);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setProfile(user);
  }, [setProfile, user]);
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
          <TopMenu account={account} />
        </div>
      </nav>
      <Sidebar open={open} />
      <div
        className={`transition-all duration-300 ease-in-out mt-20
                ${open ? "sm:ml-[205px] ml-[50px]" : "ml-[50px]"}`}
      >
        {children}
      </div>
    </>
  );
}
