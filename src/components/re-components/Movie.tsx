"use client";
import React from "react";
import DetailMovie from "../movie/relate-movie/DetailMovie";
import SubMovie from "../movie/movie/SubMovie";
import SumaryMovie from "../movie/relate-movie/SumaryMovie";
import { IAnime, IGenre, IRelease, ITheFirm } from "@/types/index";
// import { ToastContainer } from "react-toastify";

interface INewAnime extends IAnime {
  firm: ITheFirm;
  release: IRelease;
  genres: IGenre[];
}
interface IProps {
  anime: INewAnime;
}

export default function Movie(props: IProps) {
  let { anime } = props;
  // console.log(anime);

  return (
    <div className="col-span-12 lg:col-span-8 flex flex-col gap-6  h-fit py-6">
      <SubMovie
        url={anime.videoUrl || ""}
        title={anime.title || ""}
        view={anime.view || 0}
      />
      <DetailMovie
        theFirm={anime.firm || {}}
        title={anime.title || ""}
        release={anime.release || {}}
        thumbnailUrl={anime.thumbnailUrl || ""}
      />
      <SumaryMovie genres={anime.genres || []} des={anime.des || ""} />
      <div className="w-full flex justify-center">
        <div className=" w-fit h-fit px-4 py-2 rounded-md text-black bg-pink-500 hover:bg-pink-400 dark:bg-yellow-600 hover:dark:bg-yellow-500 text-sm cursor-pointer duration-200 ease-in-out">
          Tham gia nhom discord
        </div>
      </div>
    </div>
  );
}
