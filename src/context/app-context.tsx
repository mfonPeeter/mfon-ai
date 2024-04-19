"use client";

import { createContext, useState } from "react";

// Define the shape of the context data
interface AppContextInterface {
  showSideBar: boolean;
  openNav: boolean;
  showSideBarHandler: () => void;
  openNavHandler: () => void;
}

// Create the AppContext with default values
export const AppContext = createContext<AppContextInterface>({
  showSideBar: true,
  openNav: false,
  showSideBarHandler: () => {},
  openNavHandler: () => {},
});

// AppProvider component to provide context to its children
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // State variables for sidebar and nav visibility
  const [showSideBar, setShowSideBar] = useState(true);
  const [openNav, setOpenNav] = useState(false);

  // Handler function to toggle sidebar visibility
  const showSideBarHandler = () => {
    setShowSideBar((preVal) => !preVal);
  };

  // Handler function to toggle nav visibility
  const openNavHandler = () => {
    setOpenNav((preVal) => !preVal);
  };

  // Construct the context value object
  const contextValue: AppContextInterface = {
    showSideBar,
    openNav,
    showSideBarHandler,
    openNavHandler,
  };

  // Provide the context value to its children
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
