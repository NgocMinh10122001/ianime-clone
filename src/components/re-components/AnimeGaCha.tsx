"use client";
import useResizeAnimeElements from "@/custom-hook/useResizeAnimeElements";
import { IAnime } from "@/types/index";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IAnimes {
  animes: IAnime[];
}
export default function AnimeGaCha(props: IAnimes) {
  let { animes } = props;
  // console.log(animes);
  let router = useRouter();

  useResizeAnimeElements();

  return (
    <div className="content__container w-full grid grid-cols-1 gap-2 xl:gap-4 2xl:gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 font-sans">
      {animes?.length > 0 &&
        animes.map((item) => {
          return (
            <Link
              href={`/layout/movie/${item?.title}?id=${item?.id}&&firm=${item?.firmId}&&release=${item?.releaseId}&&genre=${item?.genreIds[0]}`}
              key={item.id}
              id="content"
              className="content  bg-[var(--super-white)] w-full h-[26.5rem]  dark:bg-[color:var(--navbar-color)] font-sans rounded-t-md rounded-b-md overflow-hidden cursor-pointer shadow-[var(--shadow-light-mode)] dark:ring-0 dark:hover:ring-0   ring-1 ring-[var(--super-white)] hover:ring-2 shadow-md hover:shadow-2xl duration-200 ease-in"
              title={item.title}
            >
              <div className="w-full h-[77%]">
                <div
                  className={`hover:scale-105 duration-300 hover:cursor-pointer  rounded-t-md  bg-cover bg-center bg-no-repeat w-full  h-full   after:right-[6px]  after:bottom-[6px] relative after:text-[var(--super-white)] block after:absolute after:w-9 after:flex after:justify-center after:items-center after:h-9 after:rounded-full after:bg-[var(--bg-purple-ligth)]`}
                  style={{ backgroundImage: `url("${item.thumbnailUrl}")` }}
                >
                  <style jsx>{`
                    .after\:right-\[6px\]::after {
                      content: "${item.rating}";
                    }
                  `}</style>
                </div>
              </div>

              <div className="w-full h-fit max-h-[23%] flex flex-col items-center  p-4 pt-5 2xl:pt-6">
                <p
                  id="title"
                  className="w-full leading-5 truncate  text-center text-black font-bold  dark:text-neutral-100  text-sm sm:text-sm md:text-sm lg:text-base xl:text-sm 2xl:text-base tracking-wide  pb-[0.375rem]"
                >
                  {item.title}
                </p>

                <p className=" flex justify-center items-center gap-x-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 2xl:w-6 2xl:h-6 fill-black stroke-[var(--super-white)] dark:fill-neutral-100 dark:stroke-[color:var(--navbar-color)]"
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
                  <span className="text-[var(--text-color-light)] dark:text-[var(--text-gray-color)] text-xs 2xl:text-sm  ">
                    {item.view}
                  </span>
                </p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
