"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import Image from "../../../node_modules/next/image";
import Anime from "../re-components/Anime";
import { signOut } from "next-auth/react";
import axios from "axios";

// import { cookies } from "../../../node_modules/next/dist/client/components/headers";
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
    <div className="fresh__load__container container max-w-full my-12 ">
      <>{/* {console.log("check animes", )} */}</>
      <div className="title flex justify-between  pb-4">
        <div className="text-black dark:text-white text-3xl tracking-normal">
          {title}
        </div>
        <button
          // onClick={getUser}
          className="text-black dark:text-white text-xl font-light border border-black  rounded-md  px-4 dark:border-white tracking-widest hover:bg-[color:var(--bg-footer-sun)] dark:hover:bg-[color:var(--navbar-hover-color)]"
        >
          Tất cả
        </button>
      </div>
      <Anime animes={animes} />
    </div>
  );
};

export default memo(FreshLoad);
