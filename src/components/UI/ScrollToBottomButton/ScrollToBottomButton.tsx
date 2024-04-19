"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ScrollToBottomButtonProps {
  feedbackContainerRef: React.RefObject<HTMLDivElement>;
  textAreaHeight: number;
}

export default function ScrollToBottomButton({
  feedbackContainerRef,
  textAreaHeight,
}: ScrollToBottomButtonProps) {
  // State to control the visibility of the scroll-to-bottom button
  const [showButton, setShowButton] = useState(false);

  // Effect to listen for scroll events on the feedbackContainer
  useEffect(() => {
    const feedbackContainer = feedbackContainerRef.current;

    // Handler function to check if container has overflowed content
    const scrollHandler = () => {
      if (feedbackContainer) {
        setShowButton(
          feedbackContainer.scrollTop + feedbackContainer.clientHeight <
            feedbackContainer.scrollHeight
        );
      }
    };

    // Add scroll event listener and scroll to bottom when component mounts
    if (feedbackContainer) {
      feedbackContainer.addEventListener("scroll", scrollHandler);
      feedbackContainer.scrollTop = feedbackContainer.scrollHeight;
    }

    // Remove scroll event listener when component unmounts
    return () => {
      feedbackContainer?.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // Function to scroll to the bottom of the container
  const scrollToBottom = () => {
    const feedbackContainer = feedbackContainerRef.current;
    feedbackContainer?.scrollTo({
      top: feedbackContainer.scrollHeight,
      behavior: "smooth",
    });
  };

  // Calculate the new height for the scroll-to-bottom button
  let newHeight: number;

  // If the text area height is 0, set the new height to 112
  if (textAreaHeight === 0) {
    newHeight = 112; // Set a default height to ensure the button is not overlaying the textarea
  } else {
    // Otherwise, set the new height to the sum of the text area height and 60 pixels
    // Adding 60 pixels ensures some spacing between the textarea and the button
    newHeight = textAreaHeight + 60;
  }

  // Calculate button position based on textarea height, ensuring it doesn't exceed 260
  const buttonBottom = Math.min(newHeight, 260);

  return (
    <button
      style={{ bottom: `${buttonBottom}px` }}
      className={`absolute right-1/2 z-10 flex items-center justify-center size-8 bg-gray-800 border border-gray-600 rounded-full cursor-pointer shadow-2xl focus:outline-none ${
        showButton ? "block" : "hidden"
      }`}
      onClick={scrollToBottom}
    >
      <Image
        src="/down-arrow.svg"
        width={18}
        height={18}
        alt="Down arrow icon"
      />
    </button>
  );
}
