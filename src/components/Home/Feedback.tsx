"use client";

import { useRef, useContext } from "react";
import ClaudeContext from "@/context/claude/claude-context";
import Image from "next/image";
import ScrollToBottomButton from "../UI/ScrollToBottomButton/ScrollToBottomButton";

interface FeedbackProps {
  textAreaHeight: number;
}

export default function Feedback({ textAreaHeight }: FeedbackProps) {
  const feedbackContainerRef = useRef<HTMLDivElement>(null);
  const { currentTitle, currentChat, isLoading } = useContext(ClaudeContext);

  return (
    <>
      <div
        ref={feedbackContainerRef}
        className="flex flex-col items-center w-full h-full px-4 pt-4 pb-3 text-[15px] overflow-y-scroll sm:text-base md:px-8"
      >
        <div className="w-full max-w-[720px] h-full">
          {!currentTitle && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Image
                src="/lucra-logo.png"
                width={38}
                height={38}
                style={{ width: "auto", height: "auto" }}
                alt="Mfon.ai Logo"
              />
              <span className="text-xl font-bold md:text-2xl">
                How can I help you today?
              </span>
            </div>
          )}
          <ul className="flex flex-col">
            {currentChat.map((chat, index) => (
              <li key={index}>
                {chat.role === "user" ? (
                  <div className="flex space-x-3 p-3 mb-4 bg-black/50 rounded-2xl">
                    <div>
                      <span className="flex items-center justify-center size-[27px] text-[11px] text-black/70 bg-white/90 font-bold rounded-full">
                        MP
                      </span>
                    </div>
                    <div className="w-full">
                      <span className="block font-semibold mb-1">You</span>
                      <div className="font-light leading-[26px]">
                        {chat.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-4 p-3 mb-9 bg-[#3a4349] rounded-2xl">
                    <div className="mt-0.5">
                      <Image
                        src="/lucra-logo.png"
                        width={25}
                        height={25}
                        style={{ width: "auto", height: "auto" }}
                        alt="Mfon.ai Logo"
                      />
                    </div>
                    <div className="w-full">
                      <span className="block font-semibold mb-1">Mfon.ai</span>
                      <div className="font-light leading-[26px]">
                        {chat.content}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
            {isLoading && (
              <div className="size-3.5 bg-white rounded-full animate-bounce" />
            )}
          </ul>
        </div>
      </div>
      <ScrollToBottomButton
        feedbackContainerRef={feedbackContainerRef}
        textAreaHeight={textAreaHeight}
      />
    </>
  );
}
