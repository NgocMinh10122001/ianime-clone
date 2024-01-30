"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import Anime from "../re-components/Anime";
import axios from "axios";
import useResizeAnimeElements from "@/custom-hook/useResizeAnimeElements";

interface IProps {
  limit: number;
  genre: string;
  title: string;
}
const FreshLoad = (props: IProps) => {
  let { limit, genre, title } = props;
  let [animes, setAnimes] = useState([]);

  const getAnimes = useCallback(async () => {
    await axios
      .get(`/api/animes?limit=${limit}&&genre=${genre}`)
      .then((res) => {
        setAnimes(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAnimes();
  }, []);

  return (
    <div className="fresh__load__container  w-full py-4 padding-x-4">
      <div className="title flex justify-between  pb-4 w-full">
        <div className="text-black dark:text-white text-3xl tracking-normal">
          {title}
        </div>
        <button className="text-black dark:text-white text-xl font-light border border-black  rounded-md  px-4 dark:border-white tracking-widest hover:bg-[color:var(--bg-footer-sun)] dark:hover:bg-[color:var(--navbar-hover-color)]">
          Tất cả
        </button>
      </div>
      <Anime animes={animes} />
    </div>
  );
};

export default memo(FreshLoad);
