"use client";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import NavbarSub from "./NavbarSub";
import useDarkMode from "./useDarkMode";
import { FaUserEdit } from "react-icons/fa";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

export default function Navbar() {
  let { isDarkMode, toggleDarkMode } = useDarkMode();
  let [isToggleSubMenu, setToggleSubMenu] = useState(false);
  let [isToggleMenuUser, setToggleMenuUser] = useState(false);
  let handleToggleSubMenu = () => {
    setToggleSubMenu(!isToggleSubMenu);
  };
  let toggleMenuUser = () => {
    setToggleMenuUser(!isToggleMenuUser);
  };
  return (
    <header className=" z-10 ">
      {isToggleSubMenu ? (
        <div
          onClick={handleToggleSubMenu}
          className="absolute bg-slate-400 opacity-20  top-0 bottom-0 left-0 right-0  cursor-pointer z-10"
        ></div>
      ) : (
        ""
      )}
      {isToggleMenuUser ? (
        <div
          onClick={toggleMenuUser}
          className="absolute bg-slate-400 opacity-20  top-0 bottom-0 left-0 right-0  cursor-pointer z-10"
        ></div>
      ) : (
        ""
      )}

      <nav className="max-w-[1440px] mx-auto flex justify-between items-center container py-3 bg-pink-100 dark:bg-[color:var(--navbar-color)] border-b border-white dark:border-black ">
        <div className="nav__left flex items-center ">
          <div
            className="nav__left__bar cursor-pointer hover:bg-pink-300 border-none rounded-full  p-3 ms-0 dark:hover:bg-[color:var(--navbar-hover-color)] me-3 sm:me-8 relative z-10"
            onClick={handleToggleSubMenu}
          >
            {isToggleSubMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 sm:w-8 sm:h-8  stroke-black dark:stroke-white z-0"
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
                className="w-6 h-6 sm:w-8 sm:h-8 stroke-black dark:stroke-white z-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </div>
          <div className="nav__left__title cursor-pointer text-black dark:text-white font-bold sm:text-lg">
            iAnime
          </div>
        </div>
        <div className="nav-midle flex items-center gap-2 border border-slate-600 dark:border-slate-400 rounded hover:border-black dark:hover:border-black hover:border-1 hover:transition-all duration-600 object-cover">
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
        <div className="nav-right  flex justify-center items-center gap-4 sm:gap-11">
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 sm:w-8 sm:h-8 fill-black cursor-pointer"
              onClick={toggleDarkMode}
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
              className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
              onClick={toggleDarkMode}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          )}

          <div className="text-black dark:text-white relative z-10">
            {isToggleMenuUser ? (
              // <IoClose
              //   size={30}
              //   onClick={toggleMenuUser}
              //   className="hover:cursor-pointer z-0"
              // />
              <svg
                onClick={toggleMenuUser}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 sm:w-8 sm:h-8 hover:cursor-pointer z-0 fill-black dark:fill-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // <FaUserEdit
              //   size={30}
              //   onClick={toggleMenuUser}
              //   className="hover:cursor-pointer z-0"
              //   />
              <svg
                onClick={toggleMenuUser}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 sm:w-8 sm:h-8 hover:cursor-pointer z-0 fill-black dark:fill-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            )}
            {isToggleMenuUser ? (
              <div className="absolute bg-pink-200 dark:bg-white ps-2 py-2  sm:py-4 w-fit h-fit top-[51px] sm:top-[54px] -left-[76px] right-0 bottom-0  z-10">
                <Link
                  href={"/admin"}
                  className="text-xs text-black dark:text-black hover:border-b-[1px] hover:border-black dark:hover:border-b-[1px] dark:hover:border-black sm:text-base sm:py-2"
                >
                  <span>Dashboard</span>
                </Link>
                <button
                  className=" dark:text-black text-black text-xs cursor-pointer sm:text-base hover:border-b-[1px] hover:border-black dark:hover:border-b-[1px] dark:hover:border-black sm:py-2"
                  type="button"
                  onClick={() => signOut()}
                >
                  Log out
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
      {isToggleSubMenu ? <NavbarSub /> : ""}
    </header>
  );
}
