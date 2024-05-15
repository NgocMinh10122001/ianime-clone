"use client";
import React, { memo, useState } from "react";
import { Spin } from "antd";
import Anime from "@/components/re-components/Anime";
import { IAnime } from "@/types/index";
import CustomizePagination from "@/components/re-components/CustomizePagination";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  animes: IAnime[];
  total: number;
  limit: number;
  title: string;
  page: number;
}

function AnimeVietSub(props: IProps) {
  let { animes, total, limit, page, title } = props;
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
      <p className="text-neutral-900 dark:text-white text-2xl  py-4">
        {animes && animes.length > 0
          ? `Tìm thấy ${animes?.length || 0} phim anime ${title}`
          : `Không tìm thấy phim anime ${title} nào`}
      </p>
      {animes && animes.length > 0 ? (
        <div className="pt-4 pb-6 w-full flex justify-center">
          <CustomizePagination
            current={page}
            totalPage={total}
            pageSize={limit}
            onChangePage={handleChangePaginate}
          />
        </div>
      ) : (
        ""
      )}
      <>{loading ? <Spin size="large" fullscreen={true} /> : ""}</>
      <Anime animes={animes} commingsoon={""} />
      {animes && animes.length > 0 ? (
        <div className="pt-6 w-full flex justify-center">
          <CustomizePagination
            current={page}
            totalPage={total}
            pageSize={limit}
            onChangePage={handleChangePaginate}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(AnimeVietSub);
