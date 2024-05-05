"use client";
import useResizeAnimeElements from "@/custom-hook/useResizeAnimeElements";
import { deleteFavoriteMovie } from "@/server-action/user";
import { IAnime } from "@/types/index";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { memo } from "react";

interface IAnimes {
  animes: IAnime[];
}
function AnimeFavorite(props: IAnimes) {
  const { data: session } = useSession();
  let { animes } = props;
  // console.log(animes);
  let router = useRouter();

  const handleRedirect = (item: any) => {
    // console.log(item);

    router.push(
      `/layout/movie/${item?.title}?id=${item?.id}&&firm=${item?.firmId}&&release=${item?.releaseId}&&genre=${item?.genreIds[0]}`
    );
  };

  const handleDeleteFavoriteMovie = (movieId: string) => {
    // console.log("check session", session?.user?.id);
    // console.log("check movieId", movieId);
    deleteFavoriteMovie(session?.user?.id ?? "", movieId);
  };
  useResizeAnimeElements();

  return (
    <div className="content__container grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
      {animes?.length > 0 &&
        animes.map((item) => {
          return (
            <div key={item.id} className="relative w-full h-fit ">
              <div
                className="absolute bg-red-400 hover:bg-red-500 shadow-sm hover:shadow-black  hover: rounded-full p-3 right-[6px] top-[6px] z-10 text-white"
                onClick={() => handleDeleteFavoriteMovie(item.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div
                id="content"
                className="content  bg-[color:var(--bg-footer-sun)]  w-full h-[26.5rem] dark:bg-[color:var(--navbar-color)] rounded-t-md rounded-b-md overflow-hidden cursor-pointer"
                title={item.title}
                onClick={() => handleRedirect(item)}
              >
                <div className="w-full  h-[77%] ">
                  <div
                    className={`hover:scale-105 duration-300 hover:cursor-pointer  rounded-t-md  bg-cover bg-center bg-no-repeat w-full  h-full   after:right-[6px]  after:bottom-[6px] relative after:text-red-500 block after:absolute after:w-9 after:flex after:justify-center after:items-center after:h-9 after:rounded-full after:bg-pink-300 `}
                    style={{ backgroundImage: `url("${item.thumbnailUrl}")` }}
                  >
                    <style jsx>{`
                      .after\:right-\[6px\]::after {
                        content: "${item.rating}";
                      }
                    `}</style>
                  </div>
                </div>

                <div className="w-full h-fit max-h-[23%] flex flex-col items-center pt-[0.75rem] p-1">
                  <p
                    id="title"
                    className="w-full truncate text-center text-neutral-900 dark:text-white text-base font-sans font-light pb-1"
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
                      className="w-5 h-5 fill-gray-700 dark:fill-none dark:stroke-[var(--text-gray-color)]"
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
                    <span className="text-gray-700 dark:text-[var(--text-gray-color)] text-sm ">
                      {item.view}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default memo(AnimeFavorite);
