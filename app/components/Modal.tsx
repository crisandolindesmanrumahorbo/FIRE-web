"use client";

import { useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";

type Props = {
  children?: React.ReactNode;
  open: boolean;
  onCloseAction: () => void;
  title?: string;
};

export default function Modal({ open, onCloseAction, title, children }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, () => onCloseAction());

  return (
    <>
      <div
        className={`${open ? "block" : "hidden"} fixed top-0 right-0 left-0 bottom-0 w-full z-50`}
      >
        <div className="flex w-full h-full justify-center items-center">
          <div ref={modalRef} className="w-[500px] bg-white rounded">
            <div className="flex-col w-full h-full p-4">
              <div className="flex w-full h-8">
                <div className="w-full items-center flex justify-center">
                  <p className="flex justify-center items-center text-black">
                    {title}
                  </p>
                </div>
                <button
                  className="items-center flex justify-center cursor-pointer"
                  onClick={onCloseAction}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                  </svg>
                </button>
              </div>
              <div className="flex-col w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
