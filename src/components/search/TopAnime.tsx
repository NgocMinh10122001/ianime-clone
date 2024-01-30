"use client";
import React, { memo, useState } from "react";
import Anime from "../re-components/Anime";
import { IAnime } from "@/types/index";
import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useResizeAnimeElements from "@/custom-hook/useResizeAnimeElements";

interface IProps {
  animes: IAnime[] | any[];
  totalPage: number;
  page: number;
}

function TopAnime(props: IProps) {
  let { animes, totalPage, page } = props;
  // console.log(animes);
  //
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  let handleChangePaginate = (page: any, pageSize: any) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.replace(`${pathname}?orderby=max&&order=asc&&${params.toString()}`);
  };
  // console.log(searchParams.get("orderby"));
  return (
    <div className="top__anime__container ">
      <div className="pb-4 w-full flex justify-center">
        <Pagination
          defaultCurrent={page}
          total={totalPage}
          pageSize={24}
          onChange={(page, pageSize) => handleChangePaginate(page, pageSize)}
        />
      </div>
      <Anime animes={animes} />
      <div className="pt-4 w-full flex justify-center">
        <Pagination
          defaultCurrent={page}
          total={totalPage}
          pageSize={24}
          onChange={(page, pageSize) => handleChangePaginate(page, pageSize)}
        />
      </div>
    </div>
  );
}

export default memo(TopAnime);
