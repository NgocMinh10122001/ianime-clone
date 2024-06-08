"use client";
import useResizeAnimeElements from "@/custom-hook/useResizeAnimeElements";
import { storeMovieWatched } from "@/server-action/user";
import { IAnime } from "@/types/index";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";

interface IAnimes {
  animes: IAnime[];
  commingsoon: string;
}
function Anime(props: IAnimes) {
  let { animes, commingsoon } = props;
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string>(session?.user?.id || "");
  // console.log(animes);
  let router = useRouter();
  const handleStoreMovie = async (id: string) => {
    await storeMovieWatched(id);
  };

  const numberWithCommas = (number: number): string => {
    return number.toLocaleString();
  };
  useResizeAnimeElements();
  return (
    <div className="w-full grid grid-cols-2 gap-2 sm:gap-2 lg:gap-4 xl:gap-4 2xl:gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6   min-[1921px]:gap-2  font-sans">
      {animes?.length > 0 &&
        animes.map((item) => {
          return (
            <Link
              href={`/layout/movie?id=${item?.id}`}
              key={item.id}
              id="content"
              className="content  bg-[var(--super-white)] w-full h-[26.5rem]  dark:bg-[color:var(--navbar-color)] font-sans rounded-t-md rounded-b-md overflow-hidden cursor-pointer shadow-[var(--shadow-light-mode)] dark:ring-0 dark:hover:ring-0   ring-1 ring-[var(--super-white)] hover:ring-2 shadow-md hover:shadow-2xl duration-200 ease-in "
              title={item.title}
              onClick={() => handleStoreMovie(item?.id)}
            >
              <div className="w-full h-[77%] relative">
                <div
                  className={`hover:scale-105  min-[2000px]:after:text-xl min-[2500px]:after:text-2xl duration-300 hover:cursor-pointer  rounded-t-md  bg-cover bg-center bg-no-repeat w-full  h-full   after:right-[6px]  after:bottom-[6px] min-[2000px]:after:right-[8px] min-[2000px]:after:bottom-[8px] min-[2500px]:after:right-[10px] min-[2500px]:after:bottom-[10px]  relative after:text-[var(--super-white)] block after:absolute after:w-9 after:h-9 min-[2000px]:after:w-12 min-[2000px]:after:h-12 min-[2500px]:after:w-14 min-[2500px]:after:h-14 after:flex after:justify-center after:items-center  after:rounded-full after:bg-[var(--bg-purple-ligth)]`}
                  style={{ backgroundImage: `url("${item.thumbnailUrl}")` }}
                >
                  <style jsx>{`
                    .after\:right-\[6px\]::after {
                      content: "${item.rating}";
                    }
                  `}</style>
                </div>
                {commingsoon !== "" ? (
                  <p className="absolute h-fit w-full py-1  bottom-0 text-center bg-red-600 text-white font-sans font-medium text-xl uppercase">
                    {commingsoon}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="w-full h-fit max-h-[23%] flex flex-col  items-center max-[420px]:pt-[12px]  max-[375px]:pt-[10px]  p-4 pt-5 sm:pt-5 2xl:pt-6  min-[2000px]:pt-7 min-[2200px]:pt-8  min-[2500px]:pt-9 min-[2690px]:pt-10 min-[2500px]:gap-[4px] min-[2690px]:gap-[4px]">
                <span
                  id="title"
                  className="w-full leading-5 truncate  text-center text-black font-bold  dark:text-neutral-100  text-sm sm:text-sm md:text-sm lg:text-base xl:text-sm 2xl:text-base tracking-wide  pb-[0.375rem] min-[1920px]:text-lg min-[2500px]:text-2xl"
                >
                  {item.title}
                </span>

                <div className=" flex justify-center items-center gap-x-1 min-[2500px]:gap-[6px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 2xl:w-6 2xl:h-6  min-[1920px]:w-7 min-[1920px]:h-7 min-[2500px]:w-8 min-[2500px]:h-8 fill-black stroke-[var(--super-white)] dark:fill-neutral-100 dark:stroke-[color:var(--navbar-color)]"
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
                  <span className="text-[var(--text-color-light)] dark:text-[var(--text-gray-color)] text-xs 2xl:text-sm min-[1920px]:text-base min-[2500px]:text-xl ">
                    {numberWithCommas((item?.view as number) || 1)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default memo(Anime);
