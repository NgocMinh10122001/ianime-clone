"use client";
import { IAnime } from "@/types/index";
import { useRouter } from "next/navigation";

interface IAnimes {
  animes: IAnime[];
}
export default function AnimeGaCha(props: IAnimes) {
  let { animes } = props;
  // console.log(animes);
  let router = useRouter();

  const handleRedirect = (item: any) => {
    // console.log(item);

    router.push(
      `/layout/movie/${item?.title}?id=${item?.id}&&firm=${item?.firmId}&&release=${item?.releaseId}&&genre=${item?.genreIds[0]}`
    );
  };

  return (
    <div className="content__container grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {animes?.length > 0 &&
        animes.map((item) => {
          return (
            <div
              key={item.id}
              className="content  bg-[color:var(--bg-footer-sun)] w-full h-fit dark:bg-[color:var(--navbar-color)] rounded-t-md rounded-b-md overflow-hidden cursor-pointer"
              title={item.title}
              onClick={() => handleRedirect(item)}
            >
              <div className="w-full h-420  sm:h-[20rem] ">
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

              <div className="content__title text-black dark:text-white flex justify-center  pt-4 pb-2 ">
                <p className="w-[17rem] sm:w-[13rem] truncate text-center">
                  {item.title}
                </p>
              </div>
              <div className="content__views flex gap-2 justify-center pb-8 items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 fill-black dark:fill-none dark:stroke-white"
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
                <p className="text-black dark:text-white flex justify-center text-sm">
                  {item.view}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
