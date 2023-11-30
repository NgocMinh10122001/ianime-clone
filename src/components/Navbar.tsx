"use client";
import React, { useEffect, useState } from "react";
import NavbarSub from "./NavbarSub";
import useDarkMode from "./useDarkMode";

export default function Navbar() {
  let { isDarkMode, toggleDarkMode } = useDarkMode();
  let [isToggleSubMenu, setToggleSubMenu] = useState(false);
  let handleToggleSubMenu = () => {
    setToggleSubMenu(!isToggleSubMenu);
  };
  return (
    <header className="  z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center container py-3 bg-pink-100 dark:bg-[color:var(--navbar-color)] border-b border-white dark:border-black">
        <div className="nav__left flex items-center  ">
          <div
            className="nav__left__bar cursor-pointer hover:bg-pink-300 border-none rounded-full  p-3 ms-0 dark:hover:bg-[color:var(--navbar-hover-color)] me-3"
            onClick={handleToggleSubMenu}
          >
            {isToggleSubMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6  stroke-black dark:stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-black dark:stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </div>
          <div className="nav__left__title cursor-pointer text-black dark:text-white font-bold">
            iAnime
          </div>
        </div>
        <div className="nav-midle flex items-center gap-2 border border-slate-600 dark:border-slate-400 rounded hover:border-black dark:hover:border-white hover:border-1 hover:transition-all duration-600 object-cover">
          <div className="search__icon ps-3 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 stroke-black dark:stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <div className="search__input">
            <input
              type="text"
              placeholder="Tim kiem"
              className="bg-transparent  outline-0  sm:pe-72 text-black dark:text-white "
            />
          </div>
        </div>
        <div className="nav-right cursor-pointer" onClick={toggleDarkMode}>
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          )}
        </div>
      </nav>
      {isToggleSubMenu ? <NavbarSub /> : ""}
    </header>
  );
}
