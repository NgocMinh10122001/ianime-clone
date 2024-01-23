"use client";
import { signOut, useSession } from "next-auth/react";
import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import NavbarSub from "./NavbarSub";
import useDarkMode from "./useDarkMode";
import { FaUserEdit } from "react-icons/fa";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import DataSearchOnChange from "./re-components/DataSearchOnChange";
import { searchInputOnChange } from "@/server-action/index";
import { IDataFetching } from "@/types/index";

function Navbar() {
  const { data: session } = useSession();
  let { isDarkMode, toggleDarkMode } = useDarkMode();
  let [isToggleSubMenu, setToggleSubMenu] = useState(false);
  let [isToggleMenuUser, setToggleMenuUser] = useState(false);
  let [isToggleDeleteSearch, setToggleDeleteSearch] = useState(false);
  let [inputData, setInputData] = useState("");
  const [dataFetching, setDataFetching] = useState<IDataFetching[]>([]);
  const [isToggleDataSearch, setToggleDataSearch] = useState(false);
  const [isFetching, startTrasition] = useTransition();
  let toggleMenuUser = useCallback(() => {
    setToggleMenuUser(!isToggleMenuUser);
  }, [isToggleMenuUser]);
  // console.log("check session", session);

  let handleToggleSubMenu = useCallback(() => {
    setToggleSubMenu(!isToggleSubMenu);
  }, [isToggleSubMenu]);

  const handleToggleInputSearch = useCallback(() => {
    setToggleDeleteSearch(false);
    setInputData("");
    setToggleDataSearch(false);
  }, [isToggleDeleteSearch]);

  const handleChangeInput = useCallback(
    (event: any) => {
      // console.log(event.target.value);
      setToggleDeleteSearch(true);
      setInputData(event.target.value);

      startTrasition(async () => {
        let res = await searchInputOnChange(event.target.value);
        // console.log(res);
        if (res && res.length > 0) setDataFetching(res);
        return;
      });

      startTrasition(() => {
        setToggleDataSearch(true);
      });
    },
    [inputData]
  );

  const handleFindAnime = useCallback(() => {
    console.log("do validate1", inputData);
  }, [inputData]);

  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        console.log("do validate2", inputData);
      }
    },
    [inputData]
  );

  return (
    <header className="w-full z-20 padding-x-4  bg-pink-100 dark:bg-[color:var(--navbar-color)]">
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

      <nav className="w-full  flex justify-between items-center  py-3 border-b border-white dark:border-black ">
        <div className="nav__left flex items-center gap-3">
          <div
            className="nav__left__bar cursor-pointer hover:bg-pink-300 border-none rounded-full  p-2  dark:hover:bg-[color:var(--navbar-hover-color)]  relative z-10"
            onClick={handleToggleSubMenu}
          >
            {isToggleSubMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-7 sm:h-7  stroke-black dark:stroke-white z-0"
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
                className="w-5 h-5 sm:w-7 sm:h-7 stroke-black dark:stroke-white z-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </div>
          <Link
            href={"/layout/home"}
            className="nav__left__title cursor-pointer text-black dark:text-white font-bold sm:text-lg"
          >
            iAnime
          </Link>
        </div>
        <div className="nav-midle relative  w-[40%] flex items-center  ring-1 ring-pink-600 dark:ring-slate-600 rounded-sm py-2  focus-within:ring-2 focus-within:ring-pink-400  focus-within:dark:ring-slate-400 duration-150 ease-in-out">
          <DataSearchOnChange
            isToggleDataSearch={isToggleDataSearch}
            dataFetching={dataFetching}
          />

          <div
            className="search__icon px-3 cursor-pointer"
            onClick={handleFindAnime}
          >
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
          <div className="search__input w-85 relative pe-4 flex items-center">
            <input
              onChange={(event) => handleChangeInput(event)}
              type="text"
              placeholder="Tim kiem"
              className="  bg-transparent w-full h-full  outline-0  text-black dark:text-white  py-1"
              value={inputData}
              onKeyDown={(event) => handleKeyDown(event)}
            />

            {isToggleDeleteSearch ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-black dark:stroke-white cursor-pointer"
                onClick={handleToggleInputSearch}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="nav-right  flex justify-center items-center  ">
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 sm:w-8 sm:h-8 fill-black cursor-pointer "
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
              className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer "
              onClick={toggleDarkMode}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          )}

          <div className="text-black dark:text-white relative z-10 ps-5">
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
                className="w-6 h-6  sm:h-8 hover:cursor-pointer z-0  fill-black dark:fill-none "
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
                className="w-6 h-6  sm:h-8 hover:cursor-pointer z-0 fill-black  dark:fill-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            )}
            <>
              {isToggleMenuUser ? (
                <div className="absolute bg-pink-200 dark:bg-white ps-2 py-2  sm:py-4 w-24 h-fit top-[48px] sm:top-[54px] -left-[76px] right-0 bottom-0  z-10">
                  <>
                    {session?.user?.role === "admin" ? (
                      <Link
                        href={"/admin/manage-user"}
                        className="text-xs text-black dark:text-black hover:border-b-[1px] hover:border-black dark:hover:border-b-[1px] dark:hover:border-black sm:text-base sm:py-2"
                      >
                        <span>Dashboard</span>
                      </Link>
                    ) : (
                      ""
                    )}
                  </>
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
            </>
          </div>
        </div>
      </nav>
      {isToggleSubMenu ? <NavbarSub /> : ""}
    </header>
  );
}

export default memo(Navbar);
