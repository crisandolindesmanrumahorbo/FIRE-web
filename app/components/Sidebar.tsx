"use client";

import IconBitcoin from "./IconBitcoin";
import IconChat from "@/app/components/IconChat";
import IconHome from "@/app/components/IconHome";
import IconSignOut from "@/app/components/IconSignOut";
import Link from "next/link";
import IconChatbot from "./IconChatbot";
import IconCart from "./IconCart";
import { usePathname } from "next/navigation";
import IconPieChart from "./IconPieChart";

export default function Sidebar({ open }: { open: boolean }) {
  const pathname = usePathname();
  const lastPath = pathname.split("/").reverse()[0];
  const menus = [
    {
      name: "Home",
      url: "/",
      icon: <IconHome isActive={lastPath === "en" || lastPath === "id"} />,
    },
    {
      name: "Portfolio",
      url: "/portfolio",
      icon: <IconPieChart isActive={lastPath === "portfolio"} />,
    },
    {
      name: "Buy",
      url: "/transaction/buy/ETHUSD",
      icon: (
        <IconBitcoin
          isActive={
            pathname.split("/").length > 2
              ? pathname.split("/").reverse()[2] === "transaction"
              : false
          }
        />
      ),
    },
    {
      name: "Order",
      url: "/order",
      icon: <IconCart isActive={lastPath === "order"} />,
    },
    {
      name: "Chatbot",
      url: "/chatbot",
      icon: <IconChatbot isActive={lastPath === "chatbot"} />,
    },
    {
      name: "Community",
      url: "/community",
      icon: <IconChat isActive={lastPath === "community"} />,
    },
  ];
  return (
    <>
      <div
        className={`${open ? "block" : "hidden"} fixed left-0 top-0 pt-15 w-[200px] h-full bg-opacity-75  bg-green-950
                        z-30 overflow-y-auto`}
      >
        <div className="flex flex-col justify-between bg-black h-full">
          <div className="flex flex-col gap-6 mt-2 justify-start w-full ml-3">
            {menus.map((menu, idx) => (
              <Link
                key={idx}
                href={menu.url}
                className="flex gap-2 items-center"
              >
                {menu.icon}
                <p className="text-white ">{menu.name}</p>
              </Link>
            ))}
          </div>

          <Link
            href={"/login"}
            className="mb-[20px] flex gap-2 ml-3 items-center"
          >
            <IconSignOut />
            <p className="text-white">Sign out</p>
          </Link>
        </div>
      </div>
      <div
        className={`${open ? "hidden" : "block"} fixed left-0 top-0 pt-15 w-[50px] h-full bg-opacity-75 bg-black
                        z-30 overflow-y-auto`}
      >
        <div className="flex flex-col justify-between bg-black h-full">
          <div className="flex flex-col gap-6 mt-2 justify-start w-full ml-3">
            {menus.map((menu, idx) => (
              <Link
                key={idx}
                href={menu.url}
                className="flex gap-2 has-tooltip"
              >
                <span className="tooltip py-1 px-2 rounded bg-black text-sm text-white">
                  {menu.name}
                </span>
                {menu.icon}
              </Link>
            ))}
          </div>

          <Link
            href={"/login"}
            className="mb-[20px] flex gap-2 ml-3 items-center has-tooltip"
          >
            <span className="tooltip py-1 px-2 rounded bg-black text-sm text-white">
              Log out
            </span>

            <IconSignOut />
          </Link>
        </div>
      </div>
    </>
  );
}
