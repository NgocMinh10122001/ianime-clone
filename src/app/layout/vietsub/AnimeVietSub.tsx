"use client";
import React from "react";
import { Pagination } from "antd";
import Anime from "@/components/re-components/Anime";
import { IAnime } from "@/types/index";

interface IProps {
  animes: IAnime[];
  total: number;
  limit: number;
  page: number;
}

export default function AnimeVietSub(props: IProps) {
  let { animes, total, limit, page } = props;
  return (
    <div className="w-full pb-6">
      <p className="text-black dark:text-white text-2xl  py-4">
        Tìm thấy {total || 0} phim anime
      </p>
      <div className="pt-4 pb-6 w-full flex justify-center">
        <Pagination
          defaultCurrent={page}
          total={total}
          pageSize={limit}
          // onChange={(page, pageSize) => handleChangePaginate(page, pageSize)}
        />
      </div>
      <Anime animes={animes} />
      <div className="pt-6 w-full flex justify-center">
        <Pagination
          defaultCurrent={page}
          total={total}
          pageSize={limit}
          // onChange={(page, pageSize) => handleChangePaginate(page, pageSize)}
        />
      </div>
    </div>
  );
}
