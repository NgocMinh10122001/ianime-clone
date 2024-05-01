"use client";
import React, { memo, useState } from "react";
import Anime from "../re-components/Anime";
import { IAnime } from "@/types/index";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Spin } from "antd";
import CustomizePagination from "../re-components/CustomizePagination";

interface IProps {
  animes: IAnime[] | any[];
  totalPage: number;
  page: number;
  // orderBy: string;
}

function TopAnime(props: IProps) {
  let { animes, totalPage, page } = props;
  //
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  // console.log(loading);

  let handleChangePaginate = (page: any, pageSize: any) => {
    setLoading(true);
    setTimeout(() => {
      router.replace(
        `${pathname}?orderby=${searchParams.get(
          "orderby"
        )}&&order=desc&&page=${page}`
      );
      setLoading(false);
    }, 1000);
  };
  // console.log(searchParams.get("orderby"));
  return (
    <div className="top__anime__container ">
      <div className="pb-4 w-full flex justify-center">
        <CustomizePagination
          current={page}
          totalPage={totalPage}
          pageSize={24}
          onChangePage={handleChangePaginate}
        />
      </div>
      {loading ? <Spin size="large" fullscreen={true} /> : ""}

      <Anime animes={animes} commingsoon={""} />
      <div className="pt-4 w-full flex justify-center">
        <CustomizePagination
          current={page}
          totalPage={totalPage}
          pageSize={24}
          onChangePage={handleChangePaginate}
        />
      </div>
    </div>
  );
}

export default memo(TopAnime);
