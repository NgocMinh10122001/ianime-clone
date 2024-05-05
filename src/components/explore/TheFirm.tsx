"use client";
import { useRouter } from "next/navigation";
import React, { memo } from "react";

interface ITheFirm {
  id: string;
  name: string;
}

interface IProps {
  firms: ITheFirm[];
}
function TheFirm(props: IProps) {
  let { firms } = props;
  //   console.log(firms);
  const router = useRouter();
  const handleRedirect = (theFirm: string) => {
    router.push(`/layout/the-firm?theFirm=${theFirm}`);
  };

  return (
    <>
      <div className="category__container pt-8 ">
        <div className="border-6 dark:border-white  border-black rounded-lg w-[16%]"></div>
        <div className="category__title  text-neutral-900 dark:text-[var(--text-white)] font-bold uppercase text-3xl sm:text-4xl tracking-wide pb-8 pt-5  ">
          Hãng Phim
        </div>
        <div className="flex flex-wrap gap-4">
          {firms?.length > 0 &&
            firms.map((item) => {
              return (
                <div
                  className="w-fit p-2 text-neutral-900 bg-pink-300 hover:bg-pink-200 dark:text-white dark:bg-[var(--navbar-color)] dark:hover:bg-[var(--navbar-hover-color)] cursor-pointer hover:shadow-sm hover:shadow-pink-300 dark:hover:shadow-white duration-200 rounded-md text-sm tracking-wider dark:hover:text-yellow-300"
                  key={item.id}
                  title={item.name}
                  onClick={() => handleRedirect(item.id)}
                >
                  {item.name}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default memo(TheFirm);
