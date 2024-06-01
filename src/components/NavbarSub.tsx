"use client";
import { usePathname } from "next/navigation";
// import { usePathname } from "next/navigation";
import React, { memo, useCallback, useEffect, useState } from "react";
import Link from "../../node_modules/next/link";
import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { BsFire } from "react-icons/bs";
import { FaLanguage } from "react-icons/fa6";
import { BsBadge3D } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { IoStarHalfOutline } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";

// import { usePathname } from "../../node_modules/next/navigation";

interface INavbarSub {
  svg: any;
  link: string;
  title: string;
}
interface IProps {
  isToggleSubMenu: boolean;
  isVisible: boolean;
}
function NavbarSub(props: IProps) {
  let { isToggleSubMenu, isVisible } = props;
  let pathname = usePathname();
  const navbarSubs: INavbarSub[] = [
    {
      svg: (
        // (
        // <svg
        //   xmlns="http://www.w3.org/2000/svg"
        //   fill="none"
        //   viewBox="0 0 24 24"
        //   strokeWidth={1.5}
        //   stroke="currentColor"
        //   className="w-6 h-6 fill-black  dark:fill-[var(--super-white)] dark:stroke-[color:var(--navbar-color)]"
        // >
        //   <path
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //     d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        //   />
        // </svg>
        // )
        <FaHome
          size={24}
          className="text-black dark:text-[var(--super-white)]"
        />
      ),
      link: "/layout/home",
      title: "Trang chủ",
    },
    {
      svg: (
        <MdExplore
          size={24}
          className="text-black dark:text-[var(--super-white)]"
        />
      ),
      link: "/layout/explore",
      title: "Khám phá",
    },
    {
      svg: (
        <BsFire
          size={24}
          className="text-black dark:text-[var(--super-white)]"
        />
      ),
      link: "/layout/search",
      title: "Tốp lượt xem",
    },
    {
      svg: (
        <FaLanguage
          size={24}
          className="text-black dark:text-[var(--super-white)]"
        />
      ),
      link: "/layout/vietsub",
      title: "Anime Vietsub",
    },
    {
      svg: (
        <BsBadge3D
          size={24}
          className="text-black dark:text-[var(--super-white)]"
        />
      ),
      link: "/layout/3D",
      title: "Anime 3D",
    },
    {
      svg: (
        <FaEye
          size={24}
          className="text-black dark:text-[var(--super-white)]"
        />
      ),
      link: "/layout/18",
      title: "18+",
    },
    {
      svg: (
        <GoClockFill
          size={24}
          className="text-black dark:text-[var(--super-white)]"
        />
      ),
      link: "/layout/watched",
      title: "Phim đã xem",
    },
    {
      svg: (
        <IoStarHalfOutline
          size={24}
          className="text-black dark:text-[var(--super-white)]"
        />
      ),
      link: "/layout/favorite",
      title: "Phim đã lưu",
    },
    {
      svg: (
        <IoMdPhotos
          size={24}
          className="text-black dark:text-[var(--super-white)]"
        />
      ),
      link: "https://www.shutterstock.com/vi/search/cosplay",
      title: "Saucemoe",
    },
  ];

  return (
    <div
      className={`navbar_sub fixed   left-0 h-full  bg-[var(--super-white)] dark:bg-[color:var(--navbar-color)] object-cover z-[35]  ${
        isToggleSubMenu ? "translate-x-0" : "translate-x-[-100%]"
      } duration-200 ease-in-out font-sans`}
    >
      <div
        className={`navbar__sub__items ${
          isVisible ? "mt-[86px]" : ""
        } px-3 z-[35]`}
      >
        {navbarSubs.map((item, index) => {
          return (
            <Link href={`${item.link}`} key={index}>
              <div
                className={`item hover:bg-[var(--bg-light-mode)]  
            dark:hover:bg-[color:var(--navbar-hover-color)] duration-150 ease-in ${
              pathname === item.link
                ? " dark:bg-[color:var(--active-dark)] bg-[var(--bg-active-light-submenu)]"
                : "dark:bg-[color:var(--navbar-color)] bg-[var(--super-white)]"
            }
            my-3  ps-4 pe-[5rem] py-3   rounded-md duration-150  z-[35]`}
              >
                <div className="flex items-center">
                  {item.svg}
                  <label className="cursor-pointer text-sm ms-6 text-black font-normal dark:text-white">
                    {item.title}
                  </label>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default memo(NavbarSub);
