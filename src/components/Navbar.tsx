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
import Link from "next/link";
import DataSearchOnChange from "./re-components/DataSearchOnChange";
import { searchInputOnChange } from "@/server-action/index";
import { IDataFetching } from "@/types/index";
import { deleteAllMovieWatched } from "@/server-action/user";
import useResizeNavbar from "@/custom-hook/useResizeNavbar";
import { useRouter } from "next/navigation";

function Navbar() {
  const { data: session } = useSession();

  let { isDarkMode, toggleDarkMode } = useDarkMode();
  let [isToggleSubMenu, setToggleSubMenu] = useState(false);
  let [isToggleMenuUser, setToggleMenuUser] = useState(false);
  let [isToggleDeleteSearch, setToggleDeleteSearch] = useState(false);
  let [isResposive, setResposive] = useState<boolean>(false);
  let [isResposive2, setResposive2] = useState<boolean>(false);
  let [inputData, setInputData] = useState("");
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [dataFetching, setDataFetching] = useState<IDataFetching[]>([]);
  const [isToggleDataSearch, setToggleDataSearch] = useState(false);
  const [isFetching, startTrasition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setIsVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const handleToggleInputSearch = useCallback(() => {
    setToggleDeleteSearch(false);
    setInputData("");
    setToggleDataSearch(false);
  }, [isToggleDeleteSearch]);

  const handleChangeInput = useCallback(async (event: any) => {
    // console.log(event.target.value);
    setToggleDeleteSearch(true);
    setInputData(event.target.value);

    const res = await searchInputOnChange(event.target.value);
    if (res && res.length > 0) {
      setDataFetching(res);
      setToggleDataSearch(true);
      return;
    }
    setDataFetching([]);
    setToggleDataSearch(true);
    return;

    // startTrasition(() => {
    //   setToggleDataSearch(true);
    // });
  }, []);

  const handleFindAnime = useCallback(() => {
    setToggleDataSearch(false);
    router.replace(`/layout/search?name=${inputData}`);
  }, []);

  const handleToggleSubMenu = useCallback(() => {
    setToggleSubMenu(!isToggleSubMenu);
  }, [isToggleSubMenu]);
  const toggleMenuUser = useCallback(() => {
    setToggleMenuUser(!isToggleMenuUser);
  }, [isToggleMenuUser]);

  const handleKeyDown = useCallback((event: any) => {
    if (event.key === "Enter") {
      // console.log("do validate2", inputData);
      router.replace(`/layout/search?name=${inputData}`);
      startTrasition(() => {
        setToggleDataSearch(false);
      });
    }
  }, []);

  useResizeNavbar(setResposive, setResposive2);

  return (
    <header className="w-full font-sans">
      {isToggleSubMenu ? (
        <div
          onClick={handleToggleSubMenu}
          className="fixed top-0 bg-slate-400 dark:bg-black opacity-20   bottom-0 left-0 right-0  cursor-pointer z-30"
        ></div>
      ) : (
        ""
      )}
      {isToggleMenuUser ? (
        <div
          onClick={toggleMenuUser}
          className="fixed bg-slate-400 opacity-20 dark:bg-black top-0 bottom-0 left-0 right-0  cursor-pointer z-30"
        ></div>
      ) : (
        ""
      )}

      <nav
        className={`${
          isVisible
            ? "translate-y-0 shadow-[var(--shadow-light-mode)] shadow-md dark:shadow-md"
            : "translate-y-[-100%]"
        } w-full fixed bg-[var(--super-white)] dark:bg-[color:var(--navbar-color)]  flex justify-between items-center padding-x-4  py-3  z-40 duration-200`}
      >
        {isResposive2 ? (
          ""
        ) : (
          <div className="nav__left flex items-center gap-3">
            <div
              className="nav__left__bar cursor-pointer hover:bg-[var(--bg-light-mode)] border-none rounded-full  p-2  dark:hover:bg-[color:var(--navbar-hover-color)]  relative z-40"
              onClick={handleToggleSubMenu}
            >
              {isToggleSubMenu ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 sm:w-7 sm:h-7  stroke-black dark:stroke-white z-40"
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
                  className="w-5 h-5 sm:w-7 sm:h-7 stroke-black dark:stroke-white z-40"
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
              className="nav__left__title cursor-pointer text-black  dark:text-white font-bold text-lg sm:text-xl z-40"
            >
              iAnime
            </Link>
          </div>
        )}
        {isResposive ? (
          <div
            className={`nav-midle relative  ${
              isResposive2 ? "w-[80%]" : "w-[40%]"
            } flex items-center  ring-1 ring-[var(--navbar-hover-color2)] dark:ring-[var(--navbar-hover-color2)] rounded-sm py-2 hover:ring-black dark:hover:ring-white focus-within:ring-2 focus-within:ring-black  focus-within:dark:ring-white duration-200 ease-in-out `}
          >
            <DataSearchOnChange
              isToggleDataSearch={isToggleDataSearch}
              isClose={isToggleDeleteSearch}
              dataFetching={dataFetching}
              setToggleDataSearch={setToggleDataSearch}
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
            <div className="search__input w-85 relative pe-4 flex items-center ">
              <input
                className="bg-transparent w-full h-full  outline-0 text-black dark:text-neutral-100 placeholder:text-black placeholder:dark:text-neutral-400 text-sm font-light font-sans  py-1 "
                onChange={(event) => handleChangeInput(event)}
                type="text"
                placeholder="Tìm kiếm..."
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
        ) : (
          ""
        )}
        <div className="nav-right  flex justify-center items-center  ">
          {isResposive ? (
            <div
              className="search__icon px-5 cursor-pointer md:hidden"
              onClick={() => {
                setResposive(false);
                setResposive2(false);
              }}
            >
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          ) : (
            <div
              className="search__icon px-5 cursor-pointer md:hidden"
              onClick={() => {
                setResposive(true);
                setResposive2(true);
              }}
            >
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          )}

          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-6 h-6 sm:w-8  sm:h-8 cursor-pointer stroke-yellow-300"
              onClick={toggleDarkMode}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-6 h-6 sm:w-8 sm:h-8 stroke-[--super-white] fill-black cursor-pointer "
              onClick={toggleDarkMode}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          )}

          <div className="text-black dark:text-white  z-40 ps-5">
            {isToggleMenuUser ? (
              // <IoClose
              //   size={30}
              //   onClick={toggleMenuUser}
              //   className="hover:cursor-pointer z-40"
              // />
              <svg
                onClick={toggleMenuUser}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6  sm:h-8 hover:cursor-pointer z-40  fill-black dark:fill-none  "
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
              //   className="hover:cursor-pointer z-40"
              //   />
              <svg
                onClick={toggleMenuUser}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6  sm:h-8 hover:cursor-pointer z-40 fill-black dark:fill-[var(--super-white)]  "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            )}
          </div>
        </div>
      </nav>
      <div
        className={`fixed bg-[var(--super-white)] dark:bg-neutral-100 px-2 py-2  rounded-sm  right-0 ${
          isToggleMenuUser ? "translate-x-0" : "translate-x-[100%]"
        } duration-200 ease-in-out z-[35] flex flex-col gap-2  object-cover`}
      >
        <div className={`${isVisible ? "mt-[4.25rem]" : ""}`}>
          <span className="text-xs sm:text-sm italic text-black dark:text-black">
            Hello, {session?.user?.name || "Thomas"}
          </span>
        </div>
        <div>
          <>
            {session?.user?.role === "admin" ? (
              <Link
                href={"/admin/manage-user"}
                className="text-xs  sm:text-sm text-black dark:text-black hover:border-b-[1px] hover:border-black dark:hover:border-b-[1px] dark:hover:border-black   z-[35]"
              >
                <span>Dashboard</span>
              </Link>
            ) : (
              ""
            )}
          </>
        </div>
        <div
          className=" dark:text-black text-black text-xs sm:text-sm cursor-pointer  hover:border-b-[1px] hover:border-black dark:hover:border-b-[1px] dark:hover:border-black  z-[35]"
          onClick={() => {
            deleteAllMovieWatched();
            signOut();
          }}
        >
          Log out
        </div>
      </div>
      <NavbarSub isVisible={isVisible} isToggleSubMenu={isToggleSubMenu} />
    </header>
  );
}

export default memo(Navbar);
