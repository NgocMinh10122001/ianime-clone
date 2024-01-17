"use client";
import { IRelease, ITheFirm } from "@/types/index";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { memo } from "react";

interface IProps {
  theFirm: ITheFirm;
  title: string;
  release: IRelease;
  thumbnailUrl: string;
}

function DetailMovie(props: IProps) {
  let { theFirm, title, release, thumbnailUrl } = props;
  const router = useRouter();

  const dispatch1 = (id: string) => {
    router.push(`/layout/the-firm?theFirm=${id}`);
  };
  const dispatch2 = (id: string) => {
    router.push(`/layout/release?release=${id}`);
  };
  return (
    <div className="w-full h-full grid grid-cols-12 gap-4 pt-4 border-t border-pink-600 dark:border-slate-400">
      <div
        className="col-span-5 sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3   w-full h-[340px] bg-no-repeat bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url("${thumbnailUrl}")` }}
      >
        {" "}
      </div>
      <div className="col-span-7 sm:col-span-8 md:col-span-9 lg:col-span-9 xl:col-span-9 2xl:col-span-9 flex flex-col gap-6">
        <div className="">
          <p className="text-black dark:text-slate-400 text-sm pb-1">Hãng</p>
          <span
            className="text-pink-600 dark:text-yellow-500 hover:text-pink-400 dark:hover:text-yellow-600 cursor-pointer"
            onClick={() => dispatch1(theFirm.id)}
          >
            {theFirm.name || ""}
          </span>
        </div>
        <div>
          <p className="text-black dark:text-slate-400 text-sm pb-1">
            Tên Anime
          </p>
          <span className="text-pink-600 dark:text-yellow-500 hover:text-pink-400 dark:hover:text-yellow-600 cursor-pointer">
            {title || ""}
          </span>
        </div>
        <div>
          <p className="text-black dark:text-slate-400 text-sm pb-1">
            Năm phát hành
          </p>
          <span
            className="text-pink-600 dark:text-yellow-500 hover:text-pink-400 dark:hover:text-yellow-600 cursor-pointer"
            onClick={() => dispatch2(release.id)}
          >
            {release.year || ""}
          </span>
        </div>
        <div>
          <p className="text-black dark:text-slate-400 text-sm pb-1">
            Tên khác
          </p>
          <span className="text-pink-600 dark:text-yellow-500 hover:text-pink-400 dark:hover:text-yellow-600 cursor-pointer">
            MamaHolic ~魅惑のママと甘々カンケイ~ THE ANIMATION
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(DetailMovie);
