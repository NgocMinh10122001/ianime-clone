"use client";
import { deleteAllMovieWatched } from "@/server-action/user";
import React, { memo } from "react";

function Watched() {
  const handleDeleteAllMovieWatched = () => {
    deleteAllMovieWatched();
  };
  return (
    <div className="flex justify-between items-center mb-8">
      <p className="uppercase font-bold text-black dark:text-white text-2xl">
        PHIM ĐÃ XEM
      </p>
      <button
        typeof="button"
        className="w-fit py-2 px-4 uppercase font-light text-white   text-xs bg-red-400 hover:bg-red-500   cursor-pointer duration-200 ease-in-out rounded-sm"
        onClick={handleDeleteAllMovieWatched}
      >
        xoá tất cả
      </button>
    </div>
  );
}

export default memo(Watched);
