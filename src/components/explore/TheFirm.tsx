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
        <div className="category__title  text-black dark:text-[var(--super-white)] font-bold uppercase text-3xl sm:text-4xl tracking-wide pb-8 pt-3  ">
          Hãng Phim
        </div>
        <div className="flex flex-wrap gap-4">
          {firms?.length > 0 &&
            firms.map((item) => {
              return (
                <div
                  className="w-fit p-2 text-black bg-[var(--super-white)]   dark:text-white dark:bg-[var(--navbar-color)] dark:hover:bg-[var(--navbar-hover-color)] cursor-pointer  shadow-[var(--shadow-light-mode)] dark:ring-0 dark:hover:ring-0  shadow-md ring-1 ring-[var(--super-white)] hover:ring-2 hover:shadow-lg  duration-200 ease-in  hover:shadow-[var(--shadow-light-mode)] rounded-md text-sm tracking-wider dark:hover:text-yellow-300 hover:text-[var(--bg-purple-ligth)]"
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
