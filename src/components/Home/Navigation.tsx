import { useContext } from "react";
import { AppContext } from "@/context/app-context";
import ClaudeContext from "@/context/claude/claude-context";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  const { openNav, openNavHandler } = useContext(AppContext);
  const { createNewChat } = useContext(ClaudeContext);

  return (
    <nav className="flex justify-between items-center w-full border-b border-gray-600 md:hidden">
      <div>
        <button
          onClick={openNavHandler}
          className={`flex items-center justify-between p-2 bg-transparent rounded-lg transition-colors focus:outline-none focus:border focus:border-white hover:bg-black/20 active:bg-black/20 ${
            openNav &&
            "absolute z-20 top-4 left-[325px] bg-black/30 hover:bg-black/60 active:bg-black/60"
          }`}
        >
          <Image
            src={openNav ? "/close.svg" : "/hamburger.svg"}
            width={22}
            height={22}
            alt="Open sidebar"
          />
        </button>
      </div>
      <Link
        href="/"
        className="py-2 px-3 text-lg font-bold bg-transparent rounded-lg transition-colors hover:bg-black/20 focus:outline-none focus:border-white"
      >
        Mfon.ai
      </Link>
      <button
        onClick={createNewChat}
        className="flex items-center justify-between p-2 bg-transparent rounded-lg transition-colors focus:outline-none focus:border focus:border-white hover:bg-black/20 active:bg-black/20"
      >
        <Image src="/edit.svg" width={22} height={22} alt="Start a new chat" />
      </button>
    </nav>
  );
}
