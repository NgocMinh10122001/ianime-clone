"use client";
import React, { useEffect } from "react";
import Link from "../../node_modules/next/link";
import { Ianime, partner, toy, contract } from "./constant/index";

export default function Footer() {
  return (
    <footer className="bg-[color:var(--bg-footer-sun)] dark:bg-[color:var(--navbar-color)] px-20 sm:px-32">
      <div className="container__footer grid grid-cols-3  pt-14 pb-14 sm:pb-10  sm:grid-cols-5 sm:grid-rows-1">
        <div className="footer__logo grid col-start-2 col-span-1 justify-center sm:col-span-1  sm:pt-0 sm:col-start-1 ">
          <img src="/favicon.ico" alt="ko co hinh" className="w-12 h-12" />
        </div>
        <div className="footer__ianime grid justify-center pt-8 col-start-1 col-span-1 sm:col-span-1  sm:pt-0 sm:col-start-2 gap-y-3 ">
          <span className="pb-2 flex justify-center text-black dark:text-white sm:justify-normal items-center text-sm font-bold">
            iAnime
          </span>
          {Ianime &&
            Ianime.length > 0 &&
            Ianime.map((item, index) => {
              return (
                <Link
                  href={item.link}
                  key={index}
                  className="text-xs py-1 flex justify-center text-black dark:text-white sm:justify-normal "
                >
                  {item.title}
                </Link>
              );
            })}
        </div>
        <div className="footer__partner grid justify-center pt-8  col-start-3 col-span-1 sm:col-span-1  sm:pt-0 sm:col-start-3">
          <span className=" grid justify-center text-black dark:text-white sm:justify-normal text-sm font-bold">
            Đối tác
          </span>
          {partner &&
            partner.length > 0 &&
            partner.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="text-xs  grid justify-center text-black dark:text-white sm:justify-normal"
              >
                {item.title}
              </Link>
            ))}
        </div>
        <div className="footer__toy grid justify-center pt-8  col-start-1 col-span-1 sm:col-span-1  sm:pt-0 sm:col-start-4">
          <span className="flex justify-center text-black dark:text-white sm:justify-normal text-sm font-bold pb-5 sm:pb-0">
            Đồ chơi
          </span>
          {toy &&
            toy.length > 0 &&
            toy.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="text-xs  flex justify-center text-black dark:text-white sm:justify-normal"
              >
                {item.title}
              </Link>
            ))}
        </div>
        <div className="footer__contract grid justify-center pt-8  col-start-3 col-span-1 sm:col-span-1   sm:pt-0 sm:col-start-5">
          <span className=" flex justify-center text-black dark:text-white sm:justify-normal text-sm font-bold pb-5 sm:pb-0">
            Liên hệ
          </span>
          {contract &&
            contract.length > 0 &&
            contract.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="text-xs  flex justify-center text-black dark:text-white sm:justify-normal"
              >
                {item.title}
              </Link>
            ))}
        </div>
      </div>
    </footer>
  );
}
