"use client";

import { useEffect, useState, useContext } from "react";
import { AppContext } from "../app-context";
import ClaudeContext, { Chat, ClaudeContextInterface } from "./claude-context";
import { toast } from "sonner";

export default function ClaudeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [message, setMessage] = useState<Chat>({ role: "", content: "" });
  const [previousChats, setPreviousChats] = useState<Chat[]>([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const { openNavHandler } = useContext(AppContext); // Using context for handling navigation

  // Function to create a new chat session
  const createNewChat = () => {
    setMessage({ role: "", content: "" });
    setPrompt("");
    setCurrentTitle("");
    openNavHandler();
  };

  // Handler for clicking on history
  const historyClickHandler = (uniqueTitle: string | undefined) => {
    if (typeof uniqueTitle === "string") {
      setCurrentTitle(uniqueTitle);
      setMessage({ role: "", content: "" });
      setPrompt("");
      openNavHandler();
    }
  };

  // Function to get the first ten words from a prompt
  const getFirstTenWords = (input: string) => {
    const words: string[] = input.split(" ");
    const firstTenWords: string[] = words.slice(0, 10);
    if (firstTenWords.length > 0) {
      firstTenWords[0] =
        firstTenWords[0].charAt(0).toUpperCase() + firstTenWords[0].slice(1);
    }
    return firstTenWords.join(" ");
  };

  // Function to fetch messages from the server
  const getMessages = async (
    event: React.FormEvent<HTMLFormElement>,
    textAreaRef: React.RefObject<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const textArea = textAreaRef.current;

    if (!textArea) return;

    setPrompt(textArea.value);
    try {
      setIsLoading(true);
      const options: RequestInit = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          message: textArea.value,
        }),
      };
      const response = await fetch("/api/claude", options);

      if (!response.ok)
        throw new Error(`Failed to fetch data: ${response.statusText}`);

      const data = await response.json();

      setMessage({ role: data.role, content: data.content[0].text });

      if (data.stop_reason === "max_tokens")
        throw new Error("Max token reached. Please simplify your prompt.");
    } catch (error) {
      toast.error(error as React.ReactNode); // Display error message using toast function
    } finally {
      textArea.value = "";
      textArea.focus();
      setIsLoading(false);
      setDisableButton(true);
    }
  };

  // Effect to update current title and add messages to previous chats
  useEffect(() => {
    const formattedPrompt = getFirstTenWords(prompt);

    if (!currentTitle && formattedPrompt && message) {
      setCurrentTitle(formattedPrompt);
    }

    if (currentTitle && prompt && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        { title: currentTitle, role: "user", content: prompt },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [currentTitle, message]);

  // Filter previous chats based on the current title
  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );

  // Extract unique titles from previous chats
  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );

  const contextValues: ClaudeContextInterface = {
    disableButton,
    isLoading,
    currentTitle,
    uniqueTitles,
    currentChat,
    previousChats,
    createNewChat,
    setDisableButton,
    historyClickHandler,
    getMessages,
  };

  return (
    <ClaudeContext.Provider value={contextValues}>
      {children}
    </ClaudeContext.Provider>
  );
}
