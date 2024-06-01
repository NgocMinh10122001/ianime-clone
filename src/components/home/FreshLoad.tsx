"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import Anime from "../re-components/Anime";
import axios from "axios";
import useResizeAnimeElements from "@/custom-hook/useResizeAnimeElements";
import { useRouter } from "next/navigation";

interface IProps {
  animes: any;
  title: string;
  genreId: string;
}
const FreshLoad = (props: IProps) => {
  let { animes, title, genreId } = props;
  // console.log("genre", genreId);

  const router = useRouter();
  // console.log(animes);

  // const getAnimes = useCallback(async () => {
  //   await axios
  //     .get(`/api/animes?limit=${limit}&&genre=${genre}`)
  //     .then((res) => {
  //       setAnimes(res.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   getAnimes();
  // }, []);
  const handleShowAnime = () => {
    // console.log("minhb", genreId);
    if (genreId === "new") {
      // console.log("co cc");

      router.replace(`/layout/search?orderby=${genreId}`);
      return;
    }

    router.replace(`/layout/search?genre=${genreId}`);
  };
  return (
    <div className="fresh__load__container  w-full py-4 padding-x-4 font-sans">
      <div className="title flex justify-between  pb-4 w-full">
        <h1 className="text-neutral-900 dark:text-white text-3xl tracking-wide font-bold">
          {title}
        </h1>
        <button
          className="px-6 py-2 rounded-sm border-none cursor-pointer btn hover:bg-right duration-300 ease-in-out"
          // text-neutral-900 dark:text-white text-sm font-normal  uppercase rounded-sm ease-in-out duration-150  px-6 py-2 dark:border-white tracking-widest bg-pink-300 hover:bg-pink-400 dark:bg-pink-400 dark:hover:bg-pink-300

          onClick={handleShowAnime}
        >
          <span className="text-black font-semibold dark:text-[var(--super-white)] tracking-wide  h-full w-full block ">
            Tất cả
          </span>
        </button>
      </div>
      <Anime
        animes={animes}
        commingsoon={genreId === "commingsoon" ? "Sắp Chiếu" : ""}
      />
    </div>
  );
};

export default memo(FreshLoad);
