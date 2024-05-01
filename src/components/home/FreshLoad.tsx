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
  console.log("genre", genreId);

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
    <div className="fresh__load__container  w-full py-4 padding-x-4">
      <div className="title flex justify-between  pb-4 w-full">
        <div className="text-black dark:text-white text-3xl tracking-normal">
          {title}
        </div>
        <button
          className="text-black dark:text-white text-sm font-normal  uppercase rounded-sm ease-in-out duration-150  px-6 py-2 dark:border-white tracking-widest bg-pink-300 hover:bg-pink-400 dark:bg-pink-400 dark:hover:bg-pink-300"
          onClick={handleShowAnime}
        >
          Tất cả
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
