"use client";
import React, { useState } from "react";
import { Spin } from "antd";
import Anime from "@/components/re-components/Anime";
import { IAnime } from "@/types/index";
import CustomizePagination from "@/components/re-components/CustomizePagination";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  animes: IAnime[];
  total: number;
  limit: number;
  page: number;
}

export default function AnimeVietSub(props: IProps) {
  let { animes, total, limit, page } = props;
  // console.log(limit);

  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const handleChangePaginate = (page: number, pageSize: number) => {
    setLoading(true);
    setTimeout(() => {
      router.replace(`${pathname}?page=${page}&&limit=${limit}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full pb-6">
      <p className="text-black dark:text-white text-2xl  py-4">
        Tìm thấy {total || 0} phim anime
      </p>
      <div className="pt-4 pb-6 w-full flex justify-center">
        <CustomizePagination
          current={page}
          totalPage={total}
          pageSize={limit}
          onChangePage={handleChangePaginate}
        />
      </div>
      <>{loading ? <Spin size="large" fullscreen={true} /> : ""}</>
      <Anime animes={animes} commingsoon={""} />
      <div className="pt-6 w-full flex justify-center">
        <CustomizePagination
          current={page}
          totalPage={total}
          pageSize={limit}
          onChangePage={handleChangePaginate}
        />
      </div>
    </div>
  );
}
