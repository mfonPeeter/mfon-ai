"use client";

import { useContext } from "react";
import ClaudeContext from "@/context/claude/claude-context";
import Image from "next/image";
import SidebarContainer from "./SidebarContainer";

export default function Sidebar() {
  const { createNewChat, uniqueTitles, historyClickHandler } =
    useContext(ClaudeContext);

  return (
    <SidebarContainer>
      <button
        onClick={createNewChat}
        className="flex items-center justify-between p-2 bg-transparent rounded-lg transition-colors focus:outline-none focus:ring hover:bg-black/20"
      >
        <span className="flex items-center space-x-1.5">
          <Image
            src="/lucra-logo.png"
            width={30}
            height={30}
            style={{ width: "auto", height: "auto" }}
            alt="Mfon.ai Logo"
          />
          <span className="text-sm font-bold">New chat</span>
        </span>
        <Image src="/edit.svg" width={19} height={19} alt="Start a new chat" />
      </button>
      <ul className="flex flex-col space-y-1 h-full pt-4">
        {uniqueTitles.map((uniqueTitle, index) => (
          <li
            key={index}
            onClick={() => historyClickHandler(uniqueTitle)}
            className="p-2 text-[15px] font-light bg-transparent rounded-lg transition-colors cursor-pointer whitespace-nowrap overflow-hidden hover:bg-black/20"
          >
            {uniqueTitle}
          </li>
        ))}
      </ul>
      <a
        rel="noreferrer"
        target="_blank"
        href="https://www.linkedin.com/in/mfonpeeter/"
        className="flex items-center space-x-2 p-2 font-bold bg-transparent rounded-lg transition-colors hover:bg-black/20"
      >
        <span className="flex items-center justify-center size-9 text-sm text-black/70 bg-white/90 font-bold rounded-full">
          MP
        </span>
        <span className="text-sm">Mfonobong Peter</span>
      </a>
    </SidebarContainer>
  );
}
