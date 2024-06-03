"use client";
import useResizeCategory from "@/custom-hook/useResizeCategory";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
interface IArray {
  thumbnailUrl: string;
}
interface ICategory {
  id: string;
  genre: string;
  des: string;
  thumbnail: string;
  animes: IArray[];
}

interface IProps {
  genre: ICategory[];
}
function Category(props: IProps) {
  let { genre } = props;

  const router = useRouter();
  const handleRedirect = (genre: string) => {
    router.push(`/layout/category?category=${genre}`);
  };
  useResizeCategory();
  // console.log("check render");

  return (
    <>
      <div className="category__container  ">
        <div className="border-6 dark:border-white  border-black rounded-lg w-[16%]"></div>
        <div className="category__title  text-black dark:text-[var(--super-white)] font-bold uppercase text-3xl sm:text-4xl tracking-wide pb-8 pt-3  ">
          Thể loại
        </div>
        <div className="category__content grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-4">
          {genre?.length > 0 &&
            genre.map((item, index: number) => {
              return (
                <div
                  className="w-full  h-[230px] sm:h-[182px] md:h-[246px] lg:h-[230px] xl:h-[222px] 2xl:h-[183px]"
                  id="category"
                  key={item.id}
                  title={item.genre}
                  onClick={() => handleRedirect(item.id)}
                >
                  <div
                    className="cate__img  bg-cover bg-top bg-no-repeat w-full h-full relative rounded-md sm:hover:scale-105 sm:hover:cursor-pointer duration-300"
                    style={{
                      backgroundImage: `url("${
                        genre[index] && genre[index].thumbnail
                          ? genre[index].thumbnail
                          : ""
                      }")`,
                    }}
                  >
                    <div className=" bg-gradient-to-b from-transparent to-black opacity-95 absolute top-0 bottom-0 left-0 right-0 rounded-md"></div>
                    <div className="cate__title absolute left-2 bottom-2">
                      <div
                        id="titleCate"
                        className="title text-base md:text-lg  font-bold text-[var(--text-white)] uppercase"
                      >
                        {item.genre}
                      </div>
                      <div
                        id="desCate"
                        className="des text-xs text-[var(--text-white)]"
                      >
                        {item.des}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default memo(Category);
