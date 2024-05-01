"use client";
import { useTheme } from "@/Context/AppContext";
import React from "react";

function Overlay() {
  const {
    isToggleSubMenu,
    isToggleMenuUser,
    setToggleMenuUser,
    setToggleSubMenu,
    handleToggleSubMenu,
    toggleMenuUser,
  } = useTheme();
  return (
    <div className="">
      {isToggleSubMenu ? (
        <div
          onClick={handleToggleSubMenu}
          className="fixed h-full left-0 right-0  bg-slate-400 dark:bg-black opacity-20     cursor-pointer z-30"
        ></div>
      ) : (
        ""
      )}
      {isToggleMenuUser ? (
        <div
          onClick={toggleMenuUser}
          className="fixed h-full left-0 bg-slate-400 opacity-20 dark:bg-black   cursor-pointer z-30"
        ></div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Overlay;
