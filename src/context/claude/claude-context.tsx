"use client";

import { createContext } from "react";

export interface Chat {
  role: string;
  content: string;
  title?: string;
}

export interface ClaudeContextInterface {
  disableButton: boolean;
  isLoading: boolean;
  currentTitle: string;
  uniqueTitles: ReadonlyArray<string | undefined>;
  currentChat: ReadonlyArray<Chat>;
  previousChats: ReadonlyArray<Chat>;
  setDisableButton: React.Dispatch<React.SetStateAction<boolean>>;
  createNewChat: () => void;
  historyClickHandler: (uniqueTitle: string | undefined) => void;
  getMessages: (
    event: React.FormEvent<HTMLFormElement>,
    prompt: React.RefObject<HTMLTextAreaElement>
  ) => void;
}

const ClaudeContext = createContext<ClaudeContextInterface>({
  disableButton: false,
  isLoading: false,
  currentTitle: "",
  uniqueTitles: [],
  currentChat: [],
  previousChats: [],
  createNewChat: () => {},
  setDisableButton: () => {},
  historyClickHandler: (uniqueTitle) => {},
  getMessages: (event, prompt) => {},
});

export default ClaudeContext;
