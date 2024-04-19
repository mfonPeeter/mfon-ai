"use client";

import { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "@/context/app-context";
import ClaudeContext from "@/context/claude/claude-context";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import Feedback from "./Feedback";

export default function MainSection() {
  const [textAreaHeight, setTextAreaHeight] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [mounted, setMounted] = useState(false);

  // Contexts for sidebar and chat functionality
  const { showSideBar, showSideBarHandler } = useContext(AppContext);
  const {
    getMessages,
    createNewChat,
    isLoading,
    disableButton,
    setDisableButton,
  } = useContext(ClaudeContext);

  // Effect to handle hydration error
  useEffect(() => {
    setMounted(true); // Set component as mounted
    if (disableButton) setIsEmpty(true);
  }, [disableButton]);

  // Function to adjust textarea height based on content
  const adjustTextAreaHeight = () => {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    // Check if textarea content is empty and update state accordingly
    const trimmedValue = textArea.value.trim();
    setIsEmpty(trimmedValue === "");

    // Update textarea height based on content
    textArea.style.height = "auto";
    setTextAreaHeight(textArea.scrollHeight);

    if (
      !textArea.value.trim() ||
      textArea.scrollHeight === textArea.clientHeight
    ) {
      textArea.style.height = "52px"; // Set fixed height for empty or single-line content
    } else {
      textArea.style.height = `${Math.min(textArea.scrollHeight, 200)}px`; // Limit height to 200px
    }
  };

  // Handler function for textarea input
  const textInputHandler = () => {
    setDisableButton(false); // Enable button
    adjustTextAreaHeight();
  };

  // Check if component is mounted before rendering
  if (!mounted) return;

  return (
    <section className="relative flex flex-col justify-between h-screen w-full bg-[#242E35] overflow-hidden md:pt-4">
      <Navigation />
      {showSideBar ? (
        <Link
          href="/"
          className="hidden self-start py-2 px-4 text-xl font-bold bg-transparent rounded-lg transition-colors hover:bg-black/10 md:block"
        >
          Mfon.ai
        </Link>
      ) : (
        <div className="hidden self-start items-center space-x-2 px-4 md:flex">
          <button
            onClick={createNewChat}
            className="flex items-center justify-between p-2 border border-gray-600 bg-transparent rounded-lg transition-colors focus:outline-none focus:border-white hover:bg-gray-700"
          >
            <Image
              src="/edit.svg"
              width={19}
              height={19}
              alt="Start a new chat"
            />
          </button>
          <Link
            href="/"
            className="py-2 px-3 text-lg font-bold bg-transparent rounded-lg transition-colors hover:bg-black/10"
          >
            Mfon.ai
          </Link>
        </div>
      )}
      <Feedback textAreaHeight={textAreaHeight} />
      <div className="flex flex-col items-center justify-center w-full px-2">
        <form
          onSubmit={(event) => getMessages(event, textAreaRef)}
          className="relative w-full max-w-[750px]"
        >
          <textarea
            rows={1}
            name="prompt"
            ref={textAreaRef}
            placeholder="Reply to Mfon.ai..."
            style={{ height: "52px" }}
            onInput={textInputHandler}
            className="resize-none w-full py-3.5 pl-4 pr-14 text-sm bg-transparent border border-gray-600 rounded-2xl outline-none transition-all shadow-lg focus:border-gray-500"
          ></textarea>
          <button
            type="submit"
            disabled={isEmpty || isLoading}
            className={`absolute bottom-[18.5px] right-4 focus:outline-none`}
          >
            {isLoading ? (
              <div className="absolute bottom-1.5 right-1 size-4 bg-white rounded-full animate-pulse" />
            ) : (
              <span
                className={`flex items-center justify-center w-8 h-7 rounded-lg transition-colors ${
                  isEmpty ? "bg-gray-600" : "bg-white hover:bg-white/90"
                }`}
              >
                <Image
                  src="/up-arrow.svg"
                  width={18}
                  height={18}
                  alt="Up arrow icon"
                />
              </span>
            )}
          </button>
        </form>
        <div>
          <span className="block p-2 text-xs text-zinc-400 text-center">
            Mfon.ai can make mistakes. Consider checking important information.
          </span>
        </div>
      </div>

      {/* Sidebar Button */}
      <button
        onClick={showSideBarHandler}
        className="hidden absolute top-1/2 -translate-y-1/2 left-1 md:block"
      >
        <Image
          src={showSideBar ? "/left-arrow.svg" : "/right-arrow.svg"}
          width={18}
          height={18}
          alt={showSideBar ? "Close sidebar" : "Open sidebar"}
        />
      </button>
    </section>
  );
}
