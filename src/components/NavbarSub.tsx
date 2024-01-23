"use client";
import React, { memo } from "react";
import Link from "../../node_modules/next/link";
// import { usePathname } from "../../node_modules/next/navigation";

function NavbarSub() {
  // let pathname = usePathname();
  // console.log("check", pathname);

  return (
    <div className="navbar__sub absolute bg-pink-50 dark:bg-[color:var(--navbar-color)] object-cover z-20">
      {/* <div className="navbar__sub__items border-b border-slate-600 dark:border-slate-700 mb-4 ps-7 pe-10"></div> */}
      <div className="navbar__sub__items   object-cover">
        {/* <div className="item dark:hover:bg-[color:var(--navbar-hover-color)] border-b border-white dark:border-slate-400 mb-4"></div> */}
        <div className="item hover:bg-pink-100  dark:hover:bg-[color:var(--navbar-hover-color)] py-3 flex items-center ps-7 pe-10 pt-4 bg-pink-300 dark:bg-[color:var(--active-dark)]">
          <Link className="flex items-center" href="/layout/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-black dark:fill-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <label className="cursor-pointer text-sm ms-6 text-black dark:text-white">
              Trang chu
            </label>
          </Link>
        </div>
        <div className="item hover:bg-pink-200  dark:hover:bg-[color:var(--navbar-hover-color)] py-3 flex items-center ps-7 pe-10 border-b border-pink-200 dark:border-slate-700">
          <Link className="flex items-center " href="/layout/explore">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-black dark:fill-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
              />
            </svg>
            <label className="cursor-pointer text-sm ms-6 text-black dark:text-white">
              Kham pha
            </label>
          </Link>
        </div>
        <div className="item hover:bg-pink-200  dark:hover:bg-[color:var(--navbar-hover-color)] py-3 flex items-center ps-7 pe-10">
          <Link className="flex items-center " href={"/layout/search"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-black dark:fill-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
              />
            </svg>
            <label
              // htmlFor=""
              className="cursor-pointer text-sm ms-6 text-black dark:text-white"
            >
              Top luot xem
            </label>
          </Link>
        </div>
        <div className="item hover:bg-pink-200  dark:hover:bg-[color:var(--navbar-hover-color)] py-3 flex items-center ps-7 pe-10">
          <Link className="flex items-center " href={"/layout/vietsub"}>
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
                d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
              />
            </svg>
            <label className="cursor-pointer text-sm ms-6 text-black dark:text-white">
              Anime Vietsub
            </label>
          </Link>
        </div>
        <div className="item hover:bg-pink-200  dark:hover:bg-[color:var(--navbar-hover-color)] py-3 flex items-center ps-7 pe-10">
          <Link className="flex items-center " href={"/layout/3D"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-black dark:fill-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
              />
            </svg>
            <label className="cursor-pointer text-sm ms-6 text-black dark:text-white">
              Anime 3D
            </label>
          </Link>
        </div>
        <div className="item hover:bg-pink-200  dark:hover:bg-[color:var(--navbar-hover-color)] py-3 flex items-center ps-7 pe-10 border-b border-pink-200 dark:border-slate-700">
          <Link className="flex items-center " href={"/layout/18+"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-black dark:stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <label
              // htmlFor=""
              className="cursor-pointer text-sm ms-6 text-black dark:text-white"
            >
              18+
            </label>
          </Link>
        </div>
        <div className="item hover:bg-pink-200  dark:hover:bg-[color:var(--navbar-hover-color)] py-3 flex items-center ps-7 pe-10">
          <Link className="flex items-center " href={""}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-black dark:fill-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <label
              // htmlFor=""
              className="cursor-pointer text-sm ms-6 text-black dark:text-white"
            >
              Phim da xem
            </label>
          </Link>
        </div>
        <div className="item hover:bg-pink-200  dark:hover:bg-[color:var(--navbar-hover-color)] py-3 flex items-center ps-7 pe-10 border-b border-pink-200 dark:border-slate-700">
          <Link className="flex items-center " href={"/layout/favorite"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-black dark:fill-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>

            <label
              // htmlFor=""
              className="cursor-pointer text-sm ms-6 text-black dark:text-white"
            >
              Phim da luu
            </label>
          </Link>
        </div>
        <div className="item hover:bg-pink-200  dark:hover:bg-[color:var(--navbar-hover-color)] py-3 flex items-center ps-7 pe-10 ">
          <Link
            className="flex items-center "
            href={"https://www.shutterstock.com/vi/search/cosplay"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-black dark:fill-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <label
              // htmlFor=""
              className="cursor-pointer text-sm ms-6 text-black dark:text-white"
            >
              Saucemoe
            </label>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(NavbarSub);
