import IconBitcoin from "./IconBitcoin";
import IconChatbot from "@/app/components/IconChatbot";
import IconHome from "@/app/components/IconHome";
import IconSignOut from "@/app/components/IconSignOut";
import Link from "next/link";

export default function Sidebar({ open }: { open: boolean }) {
  return (
    <>
      <div
        className={`${open ? "block" : "hidden"} fixed left-0 top-0 pt-15 w-[150px] h-full bg-opacity-75  bg-green-950
                        z-30 overflow-y-auto`}
      >
        <div className="flex flex-col justify-between bg-black h-full">
          <div className="flex flex-col gap-6 mt-2 justify-start w-full ml-3">
            <Link href={"/"} className="flex gap-2 items-center">
              <IconHome />
              <p className="text-white">Home</p>
            </Link>
            <Link href={"/chatbot"} className="flex gap-2 items-center">
              <IconChatbot />
              <p className="text-white ">Chat</p>
            </Link>
            <Link
              href={"/transaction/buy/ETHUSD"}
              className="flex gap-2 items-center"
            >
              <IconBitcoin />
              <p className="text-white ">Buy</p>
            </Link>
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
            <Link href={"/"} className="flex gap-2">
              <IconHome />
            </Link>
            <Link href={"/chatbot"} className="flex gap-2">
              <IconChatbot />
            </Link>
            <Link href={"/transaction/buy/ETHUSD"} className="flex gap-2">
              <IconBitcoin />
            </Link>
          </div>

          <Link
            href={"/login"}
            className="mb-[20px] flex gap-2 ml-3 items-center"
          >
            <IconSignOut />
          </Link>
        </div>
      </div>
    </>
  );
}
