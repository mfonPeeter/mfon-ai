"use client";

import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/context/app-context";

// Component responsible for rendering the navbar based on window width
export default function SidebarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [windowWidth, setWindowWidth] = useState(0);
  const { showSideBar, openNav, openNavHandler } = useContext(AppContext);

  // Function to update window width state
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // Event listener for window resize
  const handleResize = () => {
    updateWindowWidth();
  };

  useEffect(() => {
    // Initial call to set initial window width state
    updateWindowWidth();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderSidebar = () => {
    if (windowWidth <= 768) {
      return (
        <>
          <div
            onClick={openNavHandler}
            className={`fixed z-10 w-full h-screen bg-gray-900/10 transition-all duration-500 ${
              openNav ? "-translate-x-0" : "-translate-x-full"
            }`}
          />
          <nav
            className={`absolute z-20 top-0 left-0 flex flex-col justify-between h-screen w-full max-w-xs px-3 py-4 bg-[#202930] overflow-hidden transition-all duration-500  ${
              openNav ? "-translate-x-0" : "-translate-x-full"
            }`}
          >
            {children}
          </nav>
        </>
      );
    } else {
      return (
        <nav
          className={`flex flex-col justify-between h-screen w-[310px] px-3 py-4 bg-[#202930] overflow-hidden ${
            !showSideBar && "hidden"
          }`}
        >
          {children}
        </nav>
      );
    }
  };

  return renderSidebar();
}
