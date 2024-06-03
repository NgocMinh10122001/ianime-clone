"use client";
import React, { memo, useEffect, useState } from "react";
import DetailMovie from "../movie/relate-movie/DetailMovie";
import SubMovie from "../movie/movie/SubMovie";
import SumaryMovie from "../movie/relate-movie/SumaryMovie";
import { IAnime, IAnimeName, IGenre, IRelease, ITheFirm } from "@/types/index";
import { useSession } from "next-auth/react";
import { addViewVideo, storeMovieWatched } from "@/server-action/user";
// import { ToastContainer } from "react-toastify";

interface INewAnime extends IAnime {
  firm: ITheFirm;
  release: IRelease;
  genres: IGenre[];
  animeJA: IAnimeName;
}
interface IProps {
  anime: INewAnime;
}

function Movie(props: IProps) {
  let { anime } = props;
  // console.log(anime);

  return (
    <div className="col-span-12 lg:col-span-8 flex flex-col gap-6  h-fit py-6">
      <SubMovie
        id={anime?.id || ""}
        url={anime?.videoUrl || ""}
        title={anime?.title || ""}
        view={anime?.view || 0}
      />
      <DetailMovie
        theFirm={anime?.firm || {}}
        title={anime?.title || ""}
        release={anime?.release || {}}
        thumbnailUrl={anime?.thumbnailUrl || ""}
        otherName={
          anime?.animeJA?.name ||
          "MamaHolic ~魅惑のママと甘々カンケイ~ THE ANIMATION"
        }
      />
      <SumaryMovie genres={anime?.genres || []} des={anime?.des || ""} />
      <div className="w-full flex justify-center">
        <div className=" w-fit px-6 py-3 2xl:py-3 flex  shadow-md  hover:shadow-lg  hover:cursor-pointer  duration-200 ease-in shadow-[var(--shadow-light-mode)]  rounded-full items-center   bg-[var(--bg-purple-ligth)] hover:bg-[var(--bg-purple-ligth-2)] dark:bg-yellow-600 hover:dark:bg-yellow-500 text-base text-[var(--super-white)] font-normal cursor-pointer ">
          Tham gia nhom discord
        </div>
      </div>
    </div>
  );
}
export default memo(Movie);
