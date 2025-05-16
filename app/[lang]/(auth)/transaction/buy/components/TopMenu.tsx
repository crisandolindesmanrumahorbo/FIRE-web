"use client";
import { useMarket, WebSocketReadyState } from "@/app/store/market";
import { useWsOrder } from "@/app/store/order";
import Avatar from "./Avatar";
import { deleteToken } from "@/app/utils/cookies";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/app/theme/ThemeToggle";
import { useRef, useState } from "react";
import useClickOutside from "@/app/hooks/useClickOutside";
import { useProfile } from "@/app/store/profile";
import LangToggle from "@/app/components/LangToggle";
import AccountNavbar from "@/app/components/AccountNavbar";
import { Account } from "../../../layout";

const Menu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const profile = useProfile((state) => state.profile);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative group">
      <button ref={buttonRef} onClick={handleClick} className="w-full h-full">
        <div className="mt-2">
          <Avatar path="/fire.png" />
        </div>
      </button>
      <div
        ref={dropdownRef}
        className={`absolute ${isOpen ? "block" : "hidden"} 
            dark:bg-[var(--foreground)] bg-[var(--background)] right-0 left-auto w-54 sm:w-64 min-w-max 
            rounded shadow-2xl border border-gray-800 dark:border-gray-400 z-30
            max-h-[350px] overflow-y-auto`}
      >
        <div className="flex flex-col w-full py-2 gap-2">
          <div className="border border-gray-800 dark:border-gray-400 rounded mx-2">
            <div className="flex p-2 gap-4 items-center">
              <Avatar path="/fire.png" />
              <p>{profile?.name}</p>
            </div>
          </div>
          <div className="flex py-2 px-4 gap-2">
            <ThemeToggle />
            <LangToggle />
          </div>
          <p
            onClick={async () => {
              await deleteToken();
              router.push("/login");
            }}
            className="flex cursor-pointer px-4 py-2 dark:hover:bg-gray-400 hover:bg-gray-200 hover:text-black font-medium text-sm font-inter"
          >
            Sign out
          </p>
        </div>
      </div>
    </div>
  );
};

const IconWifi = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 19.5H12.01M22.8064 8.70076C19.9595 6.09199 16.1656 4.5 11.9999 4.5C7.83414 4.5 4.04023 6.09199 1.19336 8.70076M4.73193 12.243C6.67006 10.5357 9.21407 9.5 12 9.5C14.7859 9.5 17.3299 10.5357 19.268 12.243M15.6983 15.7751C14.6792 14.9763 13.3952 14.5 11.9999 14.5C10.5835 14.5 9.28172 14.9908 8.25537 15.8116"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

type Props = {
  account: Account;
};

export default function TopMenu({ account }: Props) {
  const readyOrder = useWsOrder((state) => state.readyState);
  const readyMarket = useMarket((state) => state.readyState);
  return (
    <div className="sticky top-0 h-[60px]">
      <div className="flex justify-end mx-4 h-full items-center gap-2">
        <AccountNavbar account={account} />

        <div className="flex items-center border border-gray-800 rounded-xl p-2 gap-2">
          <IconWifi />
          <div className="flex flex-col ">
            <p
              className={`rounded-full ${
                readyOrder === WebSocketReadyState.OPEN
                  ? "text-green-500"
                  : "text-red-500"
              } w-3 h-3 flex items-center justify-center text-xs font-bold`}
            >
              O
            </p>
            <p
              className={`rounded-full ${
                readyMarket === WebSocketReadyState.OPEN
                  ? "text-green-500"
                  : "text-red-500"
              } w-3 h-3 flex items-center justify-center text-xs font-bold`}
            >
              M
            </p>
          </div>
        </div>

        <Menu />
      </div>
    </div>
  );
}
