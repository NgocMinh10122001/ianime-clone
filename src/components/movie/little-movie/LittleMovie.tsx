"use client";
import { IAnime, IRelease, ITheFirm } from "@/types/index";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
interface INewAnime extends IAnime {
  firm: ITheFirm;
}
interface IProps {
  animeRelate: INewAnime[];
  relate: string;
  theFirm: any;
  release: any;
}
function LittleMovie(props: IProps) {
  let { animeRelate, relate, theFirm, release } = props;
  let router = useRouter();
  const handleRedirect = (item: any) => {
    // console.log(item);

    router.push(
      `/layout/movie/${item?.title}?id=${item?.id}&&firm=${item?.firmId}&&release=${item?.releaseId}&&genre=${item?.genreIds[0]}`
    );
  };
  const handlePush = (theFirm: any, release: any) => {
    if (theFirm && theFirm.id) {
      router.push(`/layout/the-firm?theFirm=${theFirm.id}`);
    } else if (release && release.id) {
      router.push(`/layout/release?release=${release.id}`);
    }
    return;
  };
  return (
    <>
      <div className="py-2 w-full h-fit">
        <p className=" text-black dark:text-white h-fit text-base font-normal pb-2">
          {relate}{" "}
          <span
            className="text-pink-600 dark:text-yellow-500 hover:text-pink-400 dark:hover:text-yellow-600 cursor-pointer uppercase"
            onClick={() => handlePush(theFirm, release)}
          >
            {theFirm?.name || release?.year || ""}
          </span>
        </p>
        <div className="flex flex-col gap-4">
          {(animeRelate &&
            animeRelate.length > 0 &&
            animeRelate.map((item) => {
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-x-4 h-[137px] sm:h-[130px] md:h-[136px] lg:h-[90px] xl:h-[106px]  w-full cursor-pointer"
                  onClick={() => handleRedirect(item)}
                >
                  <div className="h-full col-span-5 sm:col-span-4 md:col-span-3 lg:col-span-5 2xl:col-span-4 relative   after:right-[6px]  after:bottom-[6px]  after:text-red-500 block after:absolute after:w-8 after:flex after:justify-center after:items-center after:h-8 after:rounded-full after:bg-pink-300">
                    <div
                      className={`    rounded-md bg-cover bg-top bg-no-repeat w-full  h-full   opacity-80 dark:opacity-40 absolute top-0 left-0 right-0 bottom-0 z-0`}
                      style={{
                        backgroundImage: `url("${item.thumbnailUrl}")`,
                      }}
                    >
                      {/* <style jsx>{`
                        .after\:right-\[6px\]::after {
                          content: ${1});
                        }
                      `}</style> */}
                    </div>
                    <div
                      className={` w-[40%]  bg-[url('https://upload.wikimedia.org/wikipedia/vi/0/00/B%C3%ACa_t%E1%BA%ADp_10_manga_Zon_100.jpg')]  bg-cover bg-top bg-no-repeat  h-full  absolute left-[30%] right-[30%] top-0 bottom-0   z-10`}
                      style={{
                        backgroundImage: `url("${item.thumbnailUrl}")`,
                      }}
                    ></div>
                    <style jsx>{`
                      .after\:right-\[6px\]::after {
                        content: "${item.rating}";
                      }
                    `}</style>
                  </div>
                  <div className="col-span-7 sm:col-span-8 md:col-span-9 lg:col-span-7 2xl:col-span-8">
                    <p className="text-black dark:text-white">{item.title}</p>
                    <p className="text-slate-700 dark:text-slate-400  text-sm tracking-wider">
                      {item.firm?.name}
                    </p>
                    <p className="text-slate-700 dark:text-slate-400 text-sm tracking-wider">
                      {item.view} luot xem
                    </p>
                  </div>
                </div>
              );
            })) || (
            <p className="text-slate-700 dark:text-slate-400  text-sm tracking-wider">
              Không có anime!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default memo(LittleMovie);
