import React from "react";
import Image from "../../../node_modules/next/image";
import Anime from "../re-components/Anime";

export default function FreshLoad() {
  return (
    <div className="fresh__load__container container max-w-full my-12 ">
      <div className="title flex justify-between  pb-4">
        <div className="text-black dark:text-white text-3xl tracking-normal">
          Mới tải lên
        </div>
        <button className="text-black dark:text-white text-xl font-light border border-black  rounded-md  px-4 dark:border-white tracking-widest hover:bg-[color:var(--bg-footer-sun)] dark:hover:bg-[color:var(--navbar-hover-color)]">
          Tất cả
        </button>
      </div>
      <Anime />
    </div>
  );
}
