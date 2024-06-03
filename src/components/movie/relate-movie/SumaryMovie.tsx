"use client";
import { IGenre } from "@/types/index";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
interface IProps {
  genres: IGenre[];
  des: string;
}
function SumaryMovie(props: IProps) {
  let { genres, des } = props;
  const router = useRouter();
  return (
    <div className="w-full h-fit p-4 grid gap-4 bg-[var(--super-white)]  dark:bg-[var(--navbar-color)] rounded-md">
      <div className="category flex flex-wrap gap-2 ">
        {genres &&
          genres.length > 0 &&
          genres.map((item, index) => {
            return (
              <div
                key={index}
                className="text-black bg-[#a29bfe] hover:bg-[var(--bg-purple-ligth)] hover:text-[var(--super-white)] ease-in duration-200  rounded-md dark:text-white dark:bg-[var(--active-dark)] dark:hover:bg-[var(--navbar-hover-color2)] cursor-pointer w-fit h-fit px-4 py-2 text-base font-normal"
                onClick={() =>
                  router.push(`/layout/category?category=${item.id}`)
                }
              >
                {item.genre || ""}
              </div>
            );
          })}
      </div>
      <p className="text-black dark:text-[var(--super-white)] text-base tracking-wide">
        {des}
      </p>
    </div>
  );
}

export default memo(SumaryMovie);
