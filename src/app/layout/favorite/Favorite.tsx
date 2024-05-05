"use client";
import { deleteAllFavoriteMovie } from "@/server-action/user";
import React, { memo } from "react";

interface IProps {
  id: string;
}
function Favorite(props: IProps) {
  let { id } = props;
  const handleDeleteAllFavoriteMovie = () => {
    deleteAllFavoriteMovie(id);
  };
  return (
    <div className="flex justify-between items-center mb-8">
      <p className="uppercase font-bold text-neutral-900 dark:text-white text-2xl">
        PHIM ĐÃ LƯU
      </p>
      <button
        typeof="button"
        className="w-fit py-2 px-4 uppercase font-light text-white   text-xs bg-red-400 hover:bg-red-500   cursor-pointer duration-200 ease-in-out rounded-sm"
        onClick={handleDeleteAllFavoriteMovie}
      >
        xoá tất cả
      </button>
    </div>
  );
}

export default memo(Favorite);
