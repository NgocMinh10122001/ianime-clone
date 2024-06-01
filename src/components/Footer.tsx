"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Link from "../../node_modules/next/link";
import { Ianime, partner, toy, contract } from "./constant/index";
import { FaCat } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[var(--super-white)] font-sans dark:bg-[color:var(--navbar-color)] gap-10 px-[112px] py-10 w-full h-fit grid  grid-cols-5 ">
      <div className="w-full flex justify-center col-span-5 sm:col-span-1">
        <Link href={"/layout/home"}>
          <FaCat
            size={40}
            className="text-black dark:text-[var(--super-white)]"
          />
        </Link>
      </div>
      <div className="col-span-5 sm:col-span-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 flex flex-col items-center sm:block md:col-span-1">
            <p className="text-black dark:text-[var(--super-white)] text-md font-sans font-bold">
              iAnime
            </p>
            <ul className="flex flex-col items-center sm:block">
              {Ianime &&
                Ianime.length > 0 &&
                Ianime.map((item, index) => (
                  <li
                    key={index}
                    className="mt-3 flex justify-center-center sm:block"
                  >
                    <Link
                      href={item.link}
                      className="hover:text-[var(--bg-purple-ligth)] duration-200 ease-in text-black dark:text-[var(--super-white)] text-sm font-sans font-light text-center sm:text-left"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-span-2 flex flex-col items-center sm:block md:col-span-1">
            <p className="text-black dark:text-[var(--super-white)] text-md font-sans font-bold">
              Đối tác
            </p>
            <ul className="flex flex-col items-center sm:block">
              {partner &&
                partner.length > 0 &&
                partner.map((item, index) => (
                  <li
                    key={index}
                    className="mt-3 flex  justify-center-center sm:block"
                  >
                    <Link
                      href={item.link}
                      className="hover:text-[var(--bg-purple-ligth)] duration-200 ease-in text-black dark:text-[var(--super-white)] text-sm font-sans font-light text-center sm:text-left"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-span-2 flex flex-col items-center sm:block md:col-span-1">
            <p className="text-black dark:text-[var(--super-white)] text-md font-sans font-bold">
              Đồ chơi
            </p>
            <ul className="flex flex-col items-center sm:block">
              {toy &&
                toy.length > 0 &&
                toy.map((item, index) => (
                  <li
                    key={index}
                    className="mt-3 flex  justify-center-center sm:block"
                  >
                    <Link
                      href={item.link}
                      className="hover:text-[var(--bg-purple-ligth)] duration-200 ease-in text-black dark:text-[var(--super-white)] text-sm font-sans font-light text-center sm:text-left"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-span-2 flex flex-col items-center sm:block md:col-span-1">
            <p className="text-black dark:text-[var(--super-white)] text-md font-sans font-bold">
              Liên hệ
            </p>
            <ul className="flex flex-col items-center sm:block">
              {contract &&
                contract.length > 0 &&
                contract.map((item, index) => (
                  <li
                    key={index}
                    className="mt-3 flex justify-center-center sm:block"
                  >
                    <Link
                      href={item.link}
                      className="hover:text-[var(--bg-purple-ligth)] duration-200 ease-in text-black dark:text-[var(--super-white)] text-sm font-sans font-light text-center sm:text-left"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
